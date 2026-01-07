"use client"

import { UseFormReturn } from "react-hook-form"
import { Check, Info, MapPin } from "lucide-react"
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
    const selectedCity = watch("city")

    const handleSelect = (id: any) => {
        setValue("applianceType", id, { shouldValidate: true })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/80">Select Service Area</label>
                <div className="flex gap-4">
                    <label className={cn(
                        "flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                        selectedCity === "Detroit" ? "border-primary bg-primary/5 text-primary" : "border-muted bg-card text-muted-foreground hover:border-primary/30"
                    )}>
                        <input type="radio" value="Detroit" {...register("city")} className="sr-only" />
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Detroit</span>
                    </label>
                    <label className={cn(
                        "flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                        selectedCity === "Chicago" ? "border-primary bg-primary/5 text-primary" : "border-muted bg-card text-muted-foreground hover:border-primary/30"
                    )}>
                        <input type="radio" value="Chicago" {...register("city")} className="sr-only" />
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Chicago</span>
                    </label>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/80">Select Appliance</label>
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
