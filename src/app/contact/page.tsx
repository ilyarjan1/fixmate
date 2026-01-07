"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactMessageSchema, type ContactMessageFormValues } from "@/lib/schemas";
import { useState } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactMessageFormValues>({
        resolver: zodResolver(contactMessageSchema),
    });

    const onSubmit = async (data: ContactMessageFormValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Failed to send message");
            }

            setIsSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                <p className="text-lg font-medium">iamilyarjan@gmail.com</p>
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
                                <p className="text-lg font-medium">21000 W 10 Mile Rd</p>
                                <p className="text-sm text-muted-foreground">Southfield, MI 48075</p>
                                <p className="text-sm text-muted-foreground mt-1">Serving Metro Detroit & Suburbs</p>
                                <div className="mt-4 rounded-md overflow-hidden border">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.8!2d-83.2644!3d42.4789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c8e6c8c8c8c8%3A0x1234567890abcdef!2s21000%20W%2010%20Mile%20Rd%2C%20Southfield%2C%20MI%2048075!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="FixMate Location - 21000 W 10 Mile Rd, Southfield, MI"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-card border rounded-lg p-6 shadow-sm">
                        {isSuccess ? (
                            <div className="text-center py-12">
                                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                                <p className="text-muted-foreground mb-6">
                                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                                </p>
                                <Button onClick={() => setIsSuccess(false)} variant="outline">
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                                            <input
                                                id="name"
                                                {...register("name")}
                                                className={`w-full rounded-md border p-2 text-sm bg-background ${errors.name ? 'border-destructive' : 'border-input'}`}
                                                placeholder="Michael Jordan"
                                            />
                                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                            <input
                                                id="phone"
                                                {...register("phone")}
                                                className={`w-full rounded-md border p-2 text-sm bg-background ${errors.phone ? 'border-destructive' : 'border-input'}`}
                                                placeholder="(555) 123-4567"
                                            />
                                            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className={`w-full rounded-md border p-2 text-sm bg-background ${errors.email ? 'border-destructive' : 'border-input'}`}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            {...register("message")}
                                            className={`w-full rounded-md border p-2 text-sm bg-background min-h-[120px] ${errors.message ? 'border-destructive' : 'border-input'}`}
                                            placeholder="How can we help?"
                                        />
                                        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                                    </div>
                                    {error && <p className="text-sm text-destructive text-center">{error}</p>}
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
