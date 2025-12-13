import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { DashboardClient } from "./dashboard-client"

export default async function DashboardPage() {
    const session = await auth()

    if (!session) {
        redirect("/admin/login")
    }

    const requests = await prisma.serviceRequest.findMany({
        orderBy: { createdAt: "desc" },
    })

    return <DashboardClient initialRequests={requests as any} />
}
