"use client"

import { UseFormReturn } from "react-hook-form"
import { Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { ServiceRequestFormValues } from "@/lib/schemas"

interface StepProps {
    form: UseFormReturn<ServiceRequestFormValues>
}

const appliances = [
    { id: "Dryer", label: "Dryer", icon: "D" },
    { id: "Washer", label: "Washer", icon: "W" },
    { id: "Refrigerator", label: "Refrigerator", icon: "R" },
    { id: "Oven", label: "Oven", icon: "O" },
    { id: "Stove", label: "Stove", icon: "S" },
]

export function Step1Appliance({ form }: StepProps) {
    const { register, watch, setValue, formState: { errors } } = form
    const selectedAppliance = watch("applianceType")

    const handleSelect = (id: any) => {
        setValue("applianceType", id, { shouldValidate: true })
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {appliances.map((app) => (
                    <div
                        key={app.id}
                        onClick={() => handleSelect(app.id)}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all hover:border-primary/50 relative",
                            selectedAppliance === app.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-muted bg-card"
                        )}
                    >
                        {selectedAppliance === app.id && (
                            <div className="absolute top-2 right-2 text-primary">
                                <Check className="h-4 w-4" />
                            </div>
                        )}
                        <div className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold",
                            selectedAppliance === app.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                            {app.icon}
                        </div>
                        <span className="font-medium text-sm">{app.label}</span>
                    </div>
                ))}
            </div>
            {errors.applianceType && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    {errors.applianceType.message}
                </p>
            )}
        </div>
    )
}
