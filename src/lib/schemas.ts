import { z } from "zod"

export const serviceRequestSchema = z.object({
    // Step 1
    applianceType: z.enum(["Dryer", "Washer", "Refrigerator", "Oven", "Stove"]),

    // Step 2
    issueType: z.string().min(1, "Please select or describe the issue."), // Can be "Other" or specific
    description: z.string().min(10, "Please provide a bit more detail (at least 10 chars)."),
    urgency: z.enum(["Today", "This week", "Flexible"]),

    // Step 3
    name: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
    address: z.string().optional(),
    preferredContact: z.enum(["Call", "Text", "Email"]),

    // Photos (Optional, URLs)
    photos: z.array(z.string()).optional(),
})

export type ServiceRequestFormValues = z.infer<typeof serviceRequestSchema>
