import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
    {
        name: "Jo H.",
        rating: 5,
        date: "3 days ago",
        content: "I highly recommend this company for your appliance repair needs. My dryer went out and the service was rendered the same day. I give them 5 stars!",
    },
    {
        name: "Delores H.",
        rating: 5,
        date: "2 days ago",
        content: "I had a choice, but I picked FixMate, and I'm so glad I did. They called in a timely manner, came right away, they told me not to worry, listened to the problem and answered very professionally! My Kenmore hadn't worked in 2 mos., I told them F21 code was showing, they said no problem and they fixed it! This is what got me, they called that evening and the next morning to make sure everything was OK, well by that time, I had washed 3 loads! I truly recommend these guys and have told my neighbors! I trust these guys, because they didn't try to overcharge me! I'm very pleased! Thank you so much!",
    },
    {
        name: "David J.",
        rating: 5,
        date: "Dec 1, 2025",
        content: "My washers drum was not working and sitting for a while , he came and fixed it quickly and for a reasonable amount , explained the problem and what caused it. Overall my experience was very good and would definitely call them again for repair",
    },
]

export function Reviews() {
    return (
        <section className="py-20 section-alt">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">What Our Customers Say</h2>
                    <p className="text-muted-foreground/70 text-lg">
                        Verified 5-star reviews from our{" "}
                        <a
                            href="https://www.thumbtack.com/il/chicago/handyman/fixmate/service/565466106144251909"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Thumbtack profile
                        </a>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <Card key={index} className="bg-background border-none shadow-card hover-lift flex flex-col h-full">
                            <CardContent className="pt-6 flex flex-col h-full">
                                <div className="flex mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                    ))}
                                </div>
                                <blockquote className="text-muted-foreground leading-relaxed flex-grow italic mb-6">
                                    &quot;{review.content}&quot;
                                </blockquote>
                                <div className="mt-auto border-t pt-4">
                                    <div className="font-bold text-foreground">{review.name}</div>
                                    <div className="text-sm text-muted-foreground">{review.date}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a
                        href="https://www.thumbtack.com/il/chicago/handyman/fixmate/service/565466106144251909"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-semibold hover:underline"
                    >
                        Read more reviews on Thumbtack
                    </a>
                </div>
            </div>
        </section>
    )
}
