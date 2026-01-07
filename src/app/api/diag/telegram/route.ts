import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram"

export async function GET() {
    console.log("Diagnostic: Telegram test started")

    const result = await sendTelegramNotification(
        `<b>🛠 FixMate Diagnostic</b>\nTime: ${new Date().toISOString()}\nEnvironment: ${process.env.NODE_ENV}\nStatus: Testing connection...`
    )

    return NextResponse.json({
        message: "Telegram diagnostic attempt completed",
        env: {
            NODE_ENV: process.env.NODE_ENV,
            hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
            hasChatId: !!process.env.TELEGRAM_CHAT_ID,
            tokenPrefix: process.env.TELEGRAM_BOT_TOKEN ? `${process.env.TELEGRAM_BOT_TOKEN.substring(0, 5)}...` : null,
            chatId: process.env.TELEGRAM_CHAT_ID
        },
        result
    })
}
