"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usersData } from "@/lib/data";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const users = Object.values(usersData).filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Users
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage user portfolios and data
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((userData) => (
          <Card key={userData.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle className="text-base">{userData.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Net Worth</p>
                  <p className="font-semibold text-foreground">
                    {formatCurrency(userData.summary.totalNetWorth)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Returns</p>
                  <p className="font-semibold text-primary">
                    +{userData.summary.percentageGain.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Holdings</p>
                  <p className="font-semibold text-foreground">
                    {userData.portfolio.length} assets
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Requests</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">
                      {userData.requests.filter((r) => r.status === "pending").length}
                    </p>
                    {userData.requests.filter((r) => r.status === "pending").length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button asChild className="w-full" variant="outline">
                <Link href={`/admin/users/${userData.id}`}>
                  View & Edit Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
