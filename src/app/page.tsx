import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle, Clock, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DryerIcon, WasherIcon, RefrigeratorIcon, OvenIcon, StoveIcon } from "@/components/ui/appliance-icons";
import { Reviews } from "@/components/layout/reviews";

const appliances = [
  { name: "Dryer", icon: DryerIcon },
  { name: "Washer", icon: WasherIcon },
  { name: "Refrigerator", icon: RefrigeratorIcon },
  { name: "Oven", icon: OvenIcon },
  { name: "Stove", icon: StoveIcon },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-28 section-gradient overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
              Expert <span className="text-primary">Appliance Repair</span> in Southfield & Metro Detroit
            </h1>
            <p className="text-xl text-muted-foreground/80 max-w-[600px] leading-relaxed">
              Expert repair for dryers, washers, refrigerators, ovens & stoves. We get your home running smoothly again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/book">
                  Book a Repair <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-10 text-lg tap-target">
                <Link href="/contact">Call / Text Us</Link>
              </Button>
            </div>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <Badge variant="success" className="gap-1.5 px-3 py-1.5">
                <CheckCircle className="h-3.5 w-3.5" /> Same-day service
              </Badge>
              <Badge variant="info" className="gap-1.5 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5" /> Metro Detroit & Chicago
              </Badge>
              <Badge variant="info" className="gap-1.5 px-3 py-1.5">
                <Shield className="h-3.5 w-3.5" /> Licensed & insured
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 section-alt">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Professional Appliance Repair Services</h2>
            <p className="text-muted-foreground/70 text-lg">Trusted by homeowners in Southfield, MI and surrounding areas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-card hover-lift cursor-default">
              <CardHeader>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Easy Scheduling</CardTitle>
                <CardDescription className="text-base">
                  Book online in 60 seconds. Choose a time that works for you.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-card hover-lift cursor-default">
              <CardHeader>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Transparent Pricing</CardTitle>
                <CardDescription className="text-base">
                  Flat rate diagnostics and clear quotes before we start work.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background border-none shadow-card hover-lift cursor-default">
              <CardHeader>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Fast Turnaround</CardTitle>
                <CardDescription className="text-base">
                  Most repairs completed on the first visit with stocked trucks.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Services Grid */}
      <section className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">What We Fix</h2>
            <p className="text-muted-foreground/70 text-lg">Comprehensive repair for all major household appliances</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {appliances.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} href={`/services?type=${item.name.toLowerCase()}`} className="group">
                  <Card className="h-full border-2 shadow-card hover-lift transition-smooth cursor-pointer group-hover:border-primary/50">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-base">{item.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
