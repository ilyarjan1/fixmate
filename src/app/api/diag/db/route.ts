import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    console.log("Diagnostic: Database connection test started")

    try {
        // Test query
        const result = await prisma.$queryRaw`SELECT current_database(), version()`

        // Count records
        const contactCount = await prisma.contactMessage.count()
        const requestCount = await prisma.serviceRequest.count()

        return NextResponse.json({
            message: "Database diagnostic completed successfully",
            connectivity: "OK",
            dbInfo: result,
            stats: {
                contactMessages: contactCount,
                serviceRequests: requestCount
            },
            env: {
                NODE_ENV: process.env.NODE_ENV,
                hasDbUrl: !!process.env.DATABASE_URL,
                dbUrlPrefix: process.env.DATABASE_URL?.split(':')[0]
            }
        })
    } catch (error: any) {
        console.error("Database diagnostic failed:", error)
        return NextResponse.json({
            message: "Database diagnostic failed",
            connectivity: "FAILED",
            error: error.message,
            code: error.code,
            meta: error.meta,
            env: {
                NODE_ENV: process.env.NODE_ENV,
                hasDbUrl: !!process.env.DATABASE_URL
            }
        }, { status: 500 })
    }
}
