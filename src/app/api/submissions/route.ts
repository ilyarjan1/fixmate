import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceRequestSchema } from "@/lib/schemas"

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

        return NextResponse.json({ success: true, id: submission.id })

    } catch (error) {
        console.error("Submission failed", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
