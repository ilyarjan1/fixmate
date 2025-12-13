"use client"

import { UseFormReturn } from "react-hook-form"
import { ServiceRequestFormValues } from "@/lib/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface StepProps {
    form: UseFormReturn<ServiceRequestFormValues>
}

const methods = ["Call", "Text", "Email"]

export function Step3Contact({ form }: StepProps) {
    const { register, watch, setValue, formState: { errors } } = form
    const preferredContact = watch("preferredContact")

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" {...register("phone")} />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="space-y-3">
                <Label htmlFor="email">Email Address <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-3">
                <Label htmlFor="address">Service Address <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                <Input id="address" placeholder="123 Main St, Detroit, MI" {...register("address")} />
            </div>

            <div className="space-y-3">
                <Label>Preferred Contact Method</Label>
                <div className="flex gap-4">
                    {methods.map((m) => (
                        <label key={m} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value={m}
                                {...register("preferredContact")}
                                className="accent-primary h-4 w-4"
                            />
                            <span className="text-sm font-medium">{m}</span>
                        </label>
                    ))}
                </div>
                {errors.preferredContact && <p className="text-sm text-destructive">{errors.preferredContact.message}</p>}
            </div>
        </div>
    )
}
