import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceRequestSchema } from "@/lib/schemas"
import { sendTelegramNotification } from "@/lib/telegram"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate
        const validation = serviceRequestSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.format() }, { status: 400 })
        }

        const data = validation.data

        // Save to DB
        const submission = await prisma.serviceRequest.create({
            data: {
                applianceType: data.applianceType,
                issueType: data.issueType,
                description: data.description,
                urgency: data.urgency,
                name: data.name,
                phone: data.phone,
                email: data.email || null,
                address: data.address || null,
                preferredContact: data.preferredContact,
                status: "new",
                images: data.photos ? JSON.stringify(data.photos) : null,
            },
        })

        // Send Telegram Notification
        const message = `
<b>🚀 New Service Request!</b>
<b>Customer:</b> ${submission.name}
<b>Appliance:</b> ${submission.applianceType}
<b>Issue:</b> ${submission.issueType}
<b>Urgency:</b> ${submission.urgency}
<b>Phone:</b> ${submission.phone}
<b>Method:</b> ${submission.preferredContact}

<a href="${process.env.NEXTAUTH_URL || ''}/admin/dashboard">View in Dashboard</a>
`.trim()

        // We await this to ensure the message is sent before the response is returned
        // This is crucial for serverless environments like Vercel
        await sendTelegramNotification(message)

        return NextResponse.json({ success: true, id: submission.id })

    } catch (error: any) {
        console.error("Submission failed:", {
            message: error.message,
            stack: error.stack,
            code: error.code
        })
        return NextResponse.json({
            error: "Internal Server Error",
            details: process.env.NODE_ENV === "development" ? error.message : undefined
        }, { status: 500 })
    }
}
