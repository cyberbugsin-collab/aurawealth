import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground text-balance">
            Ready to take control of your wealth?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
            Join thousands of investors who are already tracking their portfolios smarter. Get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-base px-8 h-14 rounded-full bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/login">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60">
            No credit card required. Free for personal use.
          </p>
        </div>
      </div>
    </section>
  );
}
