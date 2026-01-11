import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FixMate | Expert Appliance Repair Southfield, MI & Metro Detroit",
  description: "Trusted appliance repair services in Southfield, MI. Same-day repair for Dryers, Washers, Refrigerators, Ovens & Stoves across Metro Detroit.",
  verification: {
    google: "lqgKo7KzRkpVSWMyFpDyf7SjQQtWuz9S9nJdoQ7RsOQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <LocalBusinessSchema />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
