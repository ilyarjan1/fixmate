import NextAuth from "next-auth"
import { auth } from "@/auth"

export default auth((req) => {
    // logic handled in callbacks.authorized
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
