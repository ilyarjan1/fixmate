"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function Step4Success() {
    return (
        <Card className="text-center py-10">
            <CardHeader>
                <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Booking Submitted!</h2>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    Thank you for choosing FixMate. We have received your request and will contact you shortly to confirm the appointment.
                </p>
                <div className="bg-muted p-4 rounded-md inline-block">
                    <p className="text-sm font-medium">Confirmation # {Math.floor(Math.random() * 10000) + 1000}</p>
                </div>
            </CardContent>
            <CardFooter className="justify-center gap-4">
                <Button asChild>
                    <Link href="/">Back Home</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/contact">Contact Support</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
