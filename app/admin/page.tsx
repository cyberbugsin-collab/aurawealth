"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  getAdminStats,
  getAllRequests,
  getTopClientsByAUM,
  getTopPerformingClients,
  topFunds,
} from "@/lib/data";
import {
  Users,
  TrendingUp,
  Wallet,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
  Award,
  Crown,
  Landmark,
} from "lucide-react";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const stats = getAdminStats();
  const recentRequests = getAllRequests()
    .filter((r) => r.status === "pending")
    .slice(0, 3);
  
  const topAumClients = getTopClientsByAUM(3);
  const topPerformingClients = getTopPerformingClients(3);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.displayName || "Admin"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-primary mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Active accounts
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total AUM
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {formatCurrency(stats.totalAUM)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Assets under management
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Returns
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              +{stats.avgReturn}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all portfolios
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {stats.pendingRequests}
            </div>
            <p className="text-xs text-amber-600 mt-1">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Clients by AUM */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Top Clients (AUM)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAumClients.map((client) => (
                <div key={client.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {client.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{formatCurrency(client.summary.totalNetWorth)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Clients */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingClients.map((client) => (
                <div key={client.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/40">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                      {client.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-indigo-600">+{client.summary.percentageGain.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Funds */}
        <Card className="border-0 shadow-sm lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-500" />
              Top Funds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topFunds.slice(0, 4).map((fund, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-foreground">{fund.name}</p>
                    <p className="text-xs text-muted-foreground">{fund.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-emerald-600">+{fund.returns}%</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(fund.aum / 10000000)} Cr</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Requests */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Recent Requests
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/requests" className="flex items-center gap-1">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentRequests.length > 0 ? (
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {request.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {request.userName}
                        </span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {request.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {request.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending requests
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
