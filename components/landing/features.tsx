"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Gem, HeartHandshake, ShieldCheck, Landmark, Users } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Private Market Access",
    description: "Unprecedented access to exclusive Alternative Investment Funds (AIFs) and highly vetted Pre-IPO opportunities.",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
    bgIcon: "bg-amber-500/10",
  },
  {
    icon: HeartHandshake,
    title: "Bespoke Portfolio Management",
    description: "Personalized asset allocation and multi-generational strategies designed to preserve and exponentially grow your capital.",
    color: "from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-500",
    bgIcon: "bg-indigo-500/10",
  },
  {
    icon: LineChart,
    title: "Institutional Grade Analytics",
    description: "Deep performance insights, stress testing, and real-time consolidated reporting across all your global asset classes.",
    color: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
    bgIcon: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Dedicated Wealth Advisors",
    description: "Direct access to our elite panel of SEBI-registered professionals who understand the nuances of high-net-worth investing.",
    color: "from-purple-500/20 to-purple-500/5",
    iconColor: "text-purple-500",
    bgIcon: "bg-purple-500/10",
  },
  {
    icon: Landmark,
    title: "Tax-Optimized Structuring",
    description: "Intelligent portfolio restructuring and dynamic tax-harvesting strategies to meticulously maximize your net post-tax returns.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
    bgIcon: "bg-emerald-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Privacy",
    description: "Bank-grade infrastructure and rigorous operational security protocols ensuring your financial blueprints remain strictly confidential.",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconColor: "text-cyan-500",
    bgIcon: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-slate-800 px-4 py-1.5 text-sm font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm">
            Wealth Redefined
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white text-balance mb-6">
            The standard for
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              Modern Family Offices
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Institutional-grade infrastructure meets deeply personalized advisory, built exclusively for India&apos;s most sophisticated investors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-slate-900/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden rounded-2xl"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="relative p-8 md:p-10">
                <div className={`h-16 w-16 rounded-2xl ${feature.bgIcon} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
