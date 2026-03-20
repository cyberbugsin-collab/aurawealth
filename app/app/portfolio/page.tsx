"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortfolioTable } from "@/components/dashboard/portfolio-table";
import { RequestModal } from "@/components/dashboard/request-modal";
import { useAuth } from "@/lib/auth-context";
import { usersData } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Plus } from "lucide-react";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PortfolioPage() {
  const { user } = useAuth();
  const userData = user?.uid ? usersData[user.uid] : null;
  const portfolio = userData?.portfolio || [];

  const typeData = portfolio.reduce(
    (acc, asset) => {
      const existing = acc.find((item) => item.name === asset.type);
      if (existing) {
        existing.value += asset.currentValue;
      } else {
        acc.push({ name: asset.type, value: asset.currentValue });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Portfolio
          </h1>
          <p className="text-muted-foreground mt-1">
            Detailed view of your investment holdings
          </p>
        </div>
        <RequestModal
          trigger={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request New Asset
            </Button>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Allocation by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {typeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend
                    formatter={(value) => (
                      <span className="text-sm text-card-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <PortfolioTable />
        </div>
      </div>
    </div>
  );
}
