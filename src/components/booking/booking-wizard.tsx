"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { serviceRequestSchema, type ServiceRequestFormValues } from "@/lib/schemas"

// Steps Components
import { Step1Appliance } from "./step-1-appliance"
import { Step2Details } from "./step-2-details"
import { Step3Contact } from "./step-3-contact"
import { Step4Success } from "./step-4-success"

const steps = [
    { id: 1, name: "Appliance" },
    { id: 2, name: "Details" },
    { id: 3, name: "Contact" },
]

export function BookingWizard() {
    const [currentStep, setCurrentStep] = React.useState(1)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false) // Or use a 4th step

    const form = useForm<ServiceRequestFormValues>({
        resolver: zodResolver(serviceRequestSchema),
        mode: "onChange",
        defaultValues: {
            urgency: "This week",
            preferredContact: "Call",
        },
    })

    // Determine validity for Next button
    const { formState, trigger, getValues } = form
    const { isValid } = formState

    // Helper to validate current step fields before moving
    const validateStep = async (step: number) => {
        let fieldsToValidate: (keyof ServiceRequestFormValues)[] = []

        if (step === 1) fieldsToValidate = ["applianceType"]
        if (step === 2) fieldsToValidate = ["issueType", "description", "urgency"]
        if (step === 3) fieldsToValidate = ["name", "phone", "email", "address", "preferredContact"]

        const result = await trigger(fieldsToValidate)
        return result
    }

    const handleNext = async () => {
        const isStepValid = await validateStep(currentStep)
        if (isStepValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 3))
        }
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = async (data: ServiceRequestFormValues) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error("Submission failed")

            const result = await response.json()
            setIsSuccess(true)
        } catch (error) {
            console.error("Submission error", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return <Step4Success />
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 
                ${step.id === currentStep ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                                        step.id < currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                            >
                                {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${step.id === currentStep ? "text-primary" : "text-muted-foreground"}`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Background */}
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-muted -z-0 hidden md:block" />
                    {/* Need better positioning for bar, skipping for now to keep simple */}
                </div>
            </div>

            <Card>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>{steps[currentStep - 1].name}</CardTitle>
                        <CardDescription>
                            {currentStep === 1 && "What appliance needs repair?"}
                            {currentStep === 2 && "Describe the problem in detail."}
                            {currentStep === 3 && "How can we reach you?"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentStep === 1 && <Step1Appliance form={form} />}
                                {currentStep === 2 && <Step2Details form={form} />}
                                {currentStep === 3 && <Step3Contact form={form} />}
                            </motion.div>
                        </AnimatePresence>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 1 || isSubmitting}
                        >
                            Back
                        </Button>

                        {currentStep < 3 ? (
                            <Button type="button" onClick={handleNext}>
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Book Repair"}
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
