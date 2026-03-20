"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { portfolioData, netWorthHistory, summaryData } from "@/lib/data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DashboardPreview() {
  return (
    <section id="preview" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            See your dashboard in action
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into how AuraWealth helps you visualize and manage your investments.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none h-full rounded-3xl" />
          
          <div className="bg-muted/30 rounded-3xl p-4 md:p-8 border border-border/50 shadow-xl">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Net Worth
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    {formatCurrency(summaryData.totalNetWorth)}
                  </div>
                  <p className="text-xs text-primary mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{summaryData.percentageGain}% all time
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Invested
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    {formatCurrency(summaryData.totalInvested)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across 7 holdings
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Gain/Loss
                  </CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    +{formatCurrency(summaryData.totalGainLoss)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Unrealized gains
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Net Worth Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={netWorthHistory}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}K`
                        }
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        formatter={(value: number) => [
                          formatCurrency(value),
                          "Net Worth",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: "var(--primary)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Portfolio Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-muted-foreground">Asset</TableHead>
                        <TableHead className="text-muted-foreground">Type</TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          Invested
                        </TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          Current Value
                        </TableHead>
                        <TableHead className="text-right text-muted-foreground">
                          Returns
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioData.slice(0, 5).map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium text-card-foreground">
                            <div>
                              <div>{asset.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {asset.symbol}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="font-normal"
                            >
                              {asset.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-card-foreground">
                            {formatCurrency(asset.invested)}
                          </TableCell>
                          <TableCell className="text-right text-card-foreground">
                            {formatCurrency(asset.currentValue)}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="text-primary font-medium">
                              +{asset.returns.toFixed(2)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
