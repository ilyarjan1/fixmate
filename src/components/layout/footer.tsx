import Link from "next/link"
import { Wrench, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-muted/40 border-t">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <Wrench className="h-5 w-5" />
                            </div>
                            FixMate
                        </Link>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed italic">
                            Appliance repair done right.
                        </p>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed">
                            Fast, reliable service for Metro Detroit and surrounding areas.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-base">Services</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/70">
                            <li><Link href="/services" className="hover:text-primary transition-colors tap-target inline-block">Dryer Repair</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors tap-target inline-block">Washer Repair</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors tap-target inline-block">Refrigerator Repair</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors tap-target inline-block">Oven & Stove Repair</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-base">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/70">
                            <li><Link href="/contact" className="hover:text-primary transition-colors tap-target inline-block">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors tap-target inline-block">Contact</Link></li>
                            <li><Link href="/book" className="hover:text-primary transition-colors tap-target inline-block">Book Online</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-base">Contact</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground/70">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary shrink-0" />
                                <a href="tel:+13139193223" className="hover:text-primary transition-colors">(313) 919-3223</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                <a href="mailto:iamilyarjan@gmail.com" className="hover:text-primary transition-colors">iamilyarjan@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                <span>Metro Detroit, MI</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground/60">
                    <p>© {new Date().getFullYear()} FixMate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
