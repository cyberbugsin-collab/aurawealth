"use client";

import { useAuth } from "@/lib/auth-context";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { NetWorthChart } from "@/components/dashboard/net-worth-chart";
import { PortfolioTable } from "@/components/dashboard/portfolio-table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RequestModal } from "@/components/dashboard/request-modal";
import { MessageSquare, Info, Crown, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.displayName || user?.email?.split("@")[0] || "Client";

  return (
    <div className="space-y-6 md:space-y-8 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-border/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-xs font-semibold mb-3">
            <Crown className="w-3.5 h-3.5" />
            Premium Account
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
            Portfolio Overview
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, <span className="font-semibold text-foreground">{userName}</span>
          </p>
        </div>
        <RequestModal
          trigger={
            <Button className="gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-md border-0 text-md font-medium transition-all hover:-translate-y-0.5">
              <Sparkles className="h-4 w-4" />
              New Mandate / Request
            </Button>
          }
        />
      </div>

      {/* Info Banner */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50/80 to-cyan-50/80 dark:from-indigo-950/40 dark:to-cyan-950/40 border-l-4 border-l-indigo-500 rounded-xl overflow-hidden backdrop-blur-sm">
        <CardContent className="py-5 px-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0">
              <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                Your Private Wealth Dashboard
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
                This is a secure, read-only view of your consolidated assets. To adjust your holdings, deploy new capital, or request withdrawals, please submit a mandate request and your dedicated advisor will process it immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-3">
          <NetWorthChart />
        </div>
      </div>
      <PortfolioTable />
    </div>
  );
}
