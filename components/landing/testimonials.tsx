"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Tech Executive",
    content: "AuraWealth has completely transformed how I manage my investments. The clean interface makes it easy to track everything in one place.",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Business Owner",
    content: "Finally, a platform that doesn't overwhelm me with complexity. I can see my entire portfolio at a glance and make informed decisions.",
    avatar: "RV",
  },
  {
    name: "Anita Desai",
    role: "Financial Analyst",
    content: "As someone who works in finance, I'm impressed by the accuracy and real-time updates. This is exactly what modern investors need.",
    avatar: "AD",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium mb-6">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
            Loved by investors
            <br />
            <span className="text-primary">everywhere</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 bg-muted/30 shadow-none">
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-6">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
