"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Phone, Wrench, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <Wrench className="h-5 w-5" />
                            </div>
                            FixMate
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link
                            href="/"
                            className="relative hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            Home
                        </Link>
                        <Link
                            href="/services"
                            className="relative hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className="relative hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="tel:+13139193223"
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            <span>(313) 919-3223</span>
                        </a>
                        <Button asChild size="default" className="shadow-md hover:shadow-lg transition-shadow font-semibold">
                            <Link href="/book">Book a Repair</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                            className="tap-target"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2">
                        <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-sm font-medium hover:text-primary transition-colors tap-target py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/services"
                                className="text-sm font-medium hover:text-primary transition-colors tap-target py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm font-medium hover:text-primary transition-colors tap-target py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                            <a
                                href="tel:+13139193223"
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground pt-2 border-t tap-target py-2"
                            >
                                <Phone className="h-4 w-4" />
                                <span>(313) 919-3223</span>
                            </a>
                            <Button asChild className="w-full tap-target">
                                <Link href="/book" onClick={() => setIsOpen(false)}>Book a Repair</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Floating Action Button */}
            <div className="md:hidden fixed bottom-6 right-6 z-40">
                <Button
                    asChild
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                >
                    <a href="tel:+13139193223" aria-label="Call us">
                        <Phone className="h-6 w-6" />
                    </a>
                </Button>
            </div>
        </>
    )
}
