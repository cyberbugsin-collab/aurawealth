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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth-context";
import { usersData } from "@/lib/data";
import { RequestModal } from "./request-modal";
import { MessageSquare } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getBadgeVariant(type: string) {
  switch (type) {
    case "Stock":
      return "default";
    case "Mutual Fund":
      return "secondary";
    default:
      return "outline";
  }
}

export function PortfolioTable() {
  const { user } = useAuth();
  const userData = user?.uid ? usersData[user.uid] : null;
  const portfolio = userData?.portfolio || [];

  return (
    <Card className="border border-slate-200/60 dark:border-slate-800/60 shadow-lg bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl rounded-2xl overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Portfolio Holdings
        </CardTitle>
        <RequestModal
          trigger={
            <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <MessageSquare className="h-4 w-4 text-indigo-500" />
              Request Change
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-slate-800">
                <TableHead className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Asset
                </TableHead>
                <TableHead className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Type
                </TableHead>
                <TableHead className="text-right text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Invested
                </TableHead>
                <TableHead className="text-right text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Current Value
                </TableHead>
                <TableHead className="text-right text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Returns
                </TableHead>
                <TableHead className="text-right text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase text-xs">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.map((asset) => (
                <TableRow key={asset.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shadow-sm border border-indigo-100 dark:border-indigo-800">
                        {asset.name.substring(0, 1)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {asset.name}
                        </div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {asset.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900 dark:text-slate-300">
                    {formatCurrency(asset.invested)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900 dark:text-slate-300">
                    {formatCurrency(asset.currentValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${asset.returns >= 0 ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"}`}>
                      {asset.returns >= 0 ? "+" : ""}
                      {asset.returns.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <RequestModal
                      asset={asset}
                      trigger={
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioTableSkeleton() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <Skeleton className="h-6 w-36" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 ml-auto" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
