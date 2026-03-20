"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { usersData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function SummaryCards() {
  const { user } = useAuth();
  const userData = user?.uid ? usersData[user.uid] : null;
  const summary = userData?.summary || {
    totalNetWorth: 0,
    totalInvested: 0,
    totalGainLoss: 0,
    percentageGain: 0,
  };
  const holdingsCount = userData?.portfolio?.length || 0;
  const isGain = summary.totalGainLoss >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white rounded-2xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-8 translate-x-8" />
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            Total Net Worth
          </CardTitle>
          <div className="p-2 bg-white/10 rounded-lg">
            <Wallet className="h-5 w-5 text-indigo-300" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10 pt-4">
          <div className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-2 pb-1">
            {formatCurrency(summary.totalNetWorth)}
          </div>
          <div className="flex items-center text-sm font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full w-fit">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            +{summary.percentageGain}% Since Inception
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200/60 dark:border-slate-800/60 shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl rounded-2xl overflow-hidden relative">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Invested
          </CardTitle>
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <TrendingUp className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {formatCurrency(summary.totalInvested)}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Diversified across {holdingsCount} core holdings
          </p>
        </CardContent>
      </Card>

      <Card className="border border-slate-200/60 dark:border-slate-800/60 shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl rounded-2xl overflow-hidden relative">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Gain/Loss
          </CardTitle>
          <div className={`p-2 rounded-lg ${isGain ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
            {isGain ? (
              <ArrowUpRight className="h-5 w-5 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-rose-500" />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div
            className={`text-3xl lg:text-4xl font-bold mb-2 ${
              isGain ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-500"
            }`}
          >
            {isGain ? "+" : ""}
            {formatCurrency(summary.totalGainLoss)}
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Net Unrealized Gains</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
