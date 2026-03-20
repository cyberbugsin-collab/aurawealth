"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
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

export function NetWorthChart() {
  const { user } = useAuth();
  const userData = user?.uid ? usersData[user.uid] : null;
  const netWorthHistory = userData?.netWorthHistory || [];

  return (
    <Card className="border border-slate-200/60 dark:border-slate-800/60 shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl rounded-2xl overflow-hidden relative">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Portfolio Growth Trajectory
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={netWorthHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lineColor" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--border)"
                vertical={false}
                opacity={0.5}
              />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${(value / 10000000).toFixed(2)} Cr`}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}
                itemStyle={{ color: "#fff", fontWeight: 600 }}
                formatter={(value: number) => [`${formatCurrency(value)}`, "Net Worth"]}
                labelStyle={{ color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="url(#lineColor)"
                strokeWidth={3}
                fill="url(#netWorthGradient)"
                activeDot={{ r: 8, fill: "#4f46e5", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function NetWorthChartSkeleton() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[320px] w-full" />
      </CardContent>
    </Card>
  );
}
