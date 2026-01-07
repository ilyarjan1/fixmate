/**
 * Sends a notification message to a Telegram chat.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.
 */
export async function sendTelegramNotification(message: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
        console.warn("Telegram notification skipped: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID", {
            hasToken: !!token,
            hasChatId: !!chatId,
            tokenPrefix: token ? `${token.substring(0, 5)}...` : null,
            chatId: chatId
        })
        return { success: false, error: "Missing environment variables" }
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        })

        const result = await response.json()

        if (!response.ok) {
            console.error("Telegram notification failed:", {
                status: response.status,
                statusText: response.statusText,
                result
            })
            return { success: false, error: result.description || "API Error", details: result }
        }

        console.log("Telegram notification sent successfully")
        return { success: true, result }
    } catch (error: any) {
        console.error("Error sending Telegram notification:", error)
        return { success: false, error: error.message || "Network error" }
    }
}

