import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-primary" /> Phone
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-medium">(313) 919-3223</p>
                                <p className="text-sm text-muted-foreground">Call or Text anytime</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5 text-primary" /> Email
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-medium">support@fixmate.com</p>
                                <p className="text-sm text-muted-foreground">Typical response time: 2 hours</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" /> Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">Mon-Fri: 8:00 AM - 6:00 PM</p>
                                <p className="text-sm">Sat: 9:00 AM - 4:00 PM</p>
                                <p className="text-sm text-muted-foreground mt-1">Closed Sundays</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" /> Service Area
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-medium">Metro Detroit & Suburbs</p>
                                <p className="text-sm text-muted-foreground">Wayne, Oakland, and Macomb Counties</p>
                                <div className="h-40 bg-muted mt-4 rounded-md flex items-center justify-center">
                                    <span className="text-muted-foreground">Map Placeholder</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Simple Contact Form */}
                    <div className="bg-card border rounded-lg p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input id="name" className="w-full rounded-md border p-2 text-sm bg-background" placeholder="Your name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                    <input id="phone" className="w-full rounded-md border p-2 text-sm bg-background" placeholder="(555) 123-4567" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input id="email" type="email" className="w-full rounded-md border p-2 text-sm bg-background" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea id="message" className="w-full rounded-md border p-2 text-sm bg-background min-h-[120px]" placeholder="How can we help?" />
                            </div>
                            <Button type="button" className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
