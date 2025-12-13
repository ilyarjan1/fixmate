"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateRequestStatus(id: string, status: string) {
    try {
        await prisma.serviceRequest.update({
            where: { id },
            data: { status },
        })
        revalidatePath("/admin/dashboard")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to update status" }
    }
}
