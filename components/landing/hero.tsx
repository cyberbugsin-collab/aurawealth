"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, TrendingUp, Award, Crown } from "lucide-react";

const stats = [
  { value: "₹2,500 Cr+", label: "Assets Under Management" },
  { value: "250+", label: "HNI Families" },
  { value: "18.5%", label: "Avg. Historical Returns" },
];

const features = [
  "Bespoke Investment Strategies",
  "Exclusive AIF & PMS Access",
  "SEBI Registered Advisors",
];

export function Hero() {
  const scrollToPreview = () => {
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32 bg-transparent">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-indigo-200 dark:border-slate-700 px-5 py-2 text-sm mb-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">Accepting select new mandates for Q4 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] text-balance mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Preserve & Grow <br /> Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">Legacy.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl text-pretty leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            AuraWealth provides exclusive, tailored wealth management services for High Net-Worth Individuals across India. 
          </p>

          {/* Feature List */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button asChild size="lg" className="text-lg px-10 h-16 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 dark:from-white dark:to-slate-200 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-300 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-700 dark:border-white/20">
              <Link href="/signup">
                Request an Invitation
                <Crown className="ml-2 h-5 w-5 text-amber-500" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 h-16 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              onClick={scrollToPreview}
            >
              Explore the Platform
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 pt-12 border-t border-slate-200 dark:border-slate-800 w-full max-w-4xl animate-in fade-in duration-1000 delay-1000">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center relative group">
                {i !== 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-px h-12 bg-slate-200 dark:bg-slate-800" />
                )}
                <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-900 to-indigo-500 dark:from-white dark:to-slate-400 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
