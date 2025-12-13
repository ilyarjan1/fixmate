import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DryerIcon, WasherIcon, RefrigeratorIcon, OvenIcon, StoveIcon, getApplianceIcon } from "@/components/ui/appliance-icons";

const services = [
    {
        id: "dryer",
        title: "Dryer Repair",
        description: "Not heating, not spinning, making noise, or not starting.",
        commonIssues: ["No heat or low heat", "Drum not spinning", "Loud squeaking or banging", "Will not start"],
        icon: DryerIcon,
    },
    {
        id: "washer",
        title: "Washer Repair",
        description: "Leaking, not draining, off-balance, or error codes.",
        commonIssues: ["Leaking water", "Not draining", "Violent shaking/off-balance", "Error codes display"],
        icon: WasherIcon,
    },
    {
        id: "refrigerator",
        title: "Refrigerator Repair",
        description: "Not cooling, ice maker broken, leaking, or weird noises.",
        commonIssues: ["Warm fridge/freezer", "Ice maker malfunction", "Water leaking on floor", "Loud compressor noise"],
        icon: RefrigeratorIcon,
    },
    {
        id: "oven",
        title: "Oven Repair",
        description: "Uneven baking, door issues, or self-clean failure.",
        commonIssues: ["Temperature inaccurate", "Door won't close/lock", "Element not heating", "Self-clean broken"],
        icon: OvenIcon,
    },
    {
        id: "stove",
        title: "Stove/Range Repair",
        description: "Burners not lighting, clicking noise, or electric element issues.",
        commonIssues: ["Burner won't light", "Constant clicking sound", "Element sparks", "Knob broken"],
        icon: StoveIcon,
    },
];

export default function ServicesPage() {
    return (
        <div className="container py-12 md:py-20 px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    Our Services
                </h1>
                <p className="text-xl text-muted-foreground/80">
                    We repair all major brands and models. If it's broken, we can fix it.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <Card key={service.id} className="overflow-hidden shadow-card hover-lift" id={service.id}>
                            <div className="md:flex">
                                <div className="md:w-1/3 section-alt p-8 flex flex-col items-center justify-center text-center">
                                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground/70">{service.description}</p>
                                </div>
                                <div className="md:w-2/3 p-6 md:p-8">
                                    <h4 className="font-semibold mb-4 text-lg">Common Issues We Fix:</h4>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {service.commonIssues.map((issue) => (
                                            <Badge
                                                key={issue}
                                                variant="outline"
                                                className="px-3 py-1.5 text-sm hover:bg-primary/10 transition-colors cursor-default"
                                            >
                                                {issue}
                                            </Badge>
                                        ))}
                                        <Badge
                                            variant="secondary"
                                            className="px-3 py-1.5 text-sm cursor-default"
                                        >
                                            + More issues
                                        </Badge>
                                    </div>
                                    <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                                        <Link href={`/book?type=${service.id}`}>Book {service.title}</Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Not Listed Section */}
            <div className="mt-12 text-center p-8 section-alt rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Don't see your issue listed?</h3>
                <p className="text-muted-foreground/70 mb-4">We handle all types of appliance repairs. Describe your problem and we'll help.</p>
                <Button asChild variant="outline" size="lg">
                    <Link href="/book">Describe Your Issue</Link>
                </Button>
            </div>
        </div>
    );
}
