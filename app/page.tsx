import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
