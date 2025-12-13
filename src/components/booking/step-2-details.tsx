"use client"

import { UseFormReturn } from "react-hook-form"
import { ServiceRequestFormValues } from "@/lib/schemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface StepProps {
    form: UseFormReturn<ServiceRequestFormValues>
}

const urgencies = ["Today", "This week", "Flexible"]

export function Step2Details({ form }: StepProps) {
    const { register, watch, setValue, formState: { errors } } = form
    const selectedUrgency = watch("urgency")

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label htmlFor="issueType">Common Issue / Symptom</Label>
                <Input
                    id="issueType"
                    placeholder="e.g. Not heating, Leaking water..."
                    {...register("issueType")}
                />
                {errors.issueType && <p className="text-sm text-destructive">{errors.issueType.message}</p>}
            </div>

            <div className="space-y-3">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                    id="description"
                    placeholder="Please describe what's happening..."
                    className="min-h-[100px]"
                    {...register("description")}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-3">
                <Label>How urgent is this?</Label>
                <div className="flex flex-wrap gap-3">
                    {urgencies.map((u) => (
                        <div
                            key={u}
                            onClick={() => setValue("urgency", u as any, { shouldValidate: true })}
                            className={cn(
                                "cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                                selectedUrgency === u
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-muted"
                            )}
                        >
                            {u}
                        </div>
                    ))}
                </div>
                {errors.urgency && <p className="text-sm text-destructive">{errors.urgency.message}</p>}
            </div>
        </div>
    )
}
