import Script from "next/script";

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "FixMate",
        "image": "https://fixmate-red.vercel.app/globe.svg", // Replace with actual logo if available
        "@id": "https://fixmate-red.vercel.app",
        "url": "https://fixmate-red.vercel.app",
        "telephone": "+13139193223",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "21000 W 10 Mile Rd",
            "addressLocality": "Southfield",
            "addressRegion": "MI",
            "postalCode": "48075",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 42.4789,
            "longitude": -83.2644
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "16:00"
            }
        ],
        "sameAs": [
            // Add social links here if any
        ],
        "priceRange": "$$",
        "areaServed": [
            {
                "@type": "City",
                "name": "Southfield"
            },
            {
                "@type": "City",
                "name": "Detroit"
            },
            {
                "@type": "City",
                "name": "Oak Park"
            },
            {
                "@type": "City",
                "name": "Farmington Hills"
            }
        ]
    };

    return (
        <Script
            id="local-business-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
