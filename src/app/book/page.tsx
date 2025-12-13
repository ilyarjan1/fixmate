import { BookingWizard } from "@/components/booking/booking-wizard";

export default function BookPage() {
    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Book a Repair</h1>
                    <p className="text-muted-foreground">
                        Tell us about your appliance issue and we'll get it fixed.
                    </p>
                </div>

                <BookingWizard />
            </div>
        </div>
    );
}
