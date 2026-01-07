import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactMessageSchema } from "@/lib/schemas"
import { sendTelegramNotification } from "@/lib/telegram"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate
        const validation = contactMessageSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 })
        }

        const data = validation.data

        // Save to DB
        const messageRecord = await prisma.contactMessage.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email,
                message: data.message,
                status: "unread",
            },
        })

        // Send Telegram Notification
        const telegramMessage = `
<b>📩 New Contact Message!</b>
<b>Name:</b> ${messageRecord.name}
<b>Phone:</b> ${messageRecord.phone}
<b>Email:</b> ${messageRecord.email}
<b>Message:</b>
${messageRecord.message}
`.trim()

        // Attempt to send notification, but don't fail the whole request if it fails
        try {
            await sendTelegramNotification(telegramMessage)
        } catch (error) {
            console.error("Telegram notification failed:", error)
        }

        return NextResponse.json({ success: true, id: messageRecord.id })

    } catch (error: any) {
        console.error("Contact submission failed with full details:", {
            message: error.message,
            stack: error.stack,
            code: error.code,
            meta: error.meta,
            clientVersion: error.clientVersion
        })

        return NextResponse.json({
            error: "Internal Server Error",
            message: error.message,
            details: process.env.NODE_ENV === "development" ? error.message : "Check server logs for details"
        }, { status: 500 })
    }
}

