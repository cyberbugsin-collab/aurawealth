"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllRequests, type AdminRequest } from "@/lib/data";
import { Check, X, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<AdminRequest[]>(getAllRequests());

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const completedRequests = requests.filter((r) => r.status !== "pending");

  const handleApprove = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "approved" as const } : r
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "rejected" as const } : r
      )
    );
  };

  const getStatusBadge = (status: AdminRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: AdminRequest["type"]) => {
    const variants: Record<string, string> = {
      update: "bg-blue-500/10 text-blue-600",
      add: "bg-emerald-500/10 text-emerald-600",
      delete: "bg-red-500/10 text-red-600",
      general: "bg-amber-500/10 text-amber-600",
    };
    return (
      <Badge className={`${variants[type]} hover:${variants[type]} capitalize`}>
        {type}
      </Badge>
    );
  };

  const RequestCard = ({ request }: { request: AdminRequest }) => (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
              {request.userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Link
                  href={`/admin/users/${request.userId}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {request.userName}
                </Link>
                {getTypeBadge(request.type)}
                {getStatusBadge(request.status)}
              </div>
              <p className="text-foreground mb-2">{request.message}</p>
              {request.assetName && (
                <p className="text-sm text-muted-foreground">
                  Asset: <span className="font-medium">{request.assetName}</span>
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                {formatDate(request.createdAt)}
              </p>
            </div>
          </div>

          {request.status === "pending" && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="gap-1 text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={() => handleReject(request.id)}
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
              <Button
                size="sm"
                className="gap-1"
                onClick={() => handleApprove(request.id)}
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Requests
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage user portfolio requests
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Pending
            {pendingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 min-w-[20px]">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-1">
                  No pending requests
                </p>
                <p className="text-muted-foreground">
                  All user requests have been processed.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedRequests.length > 0 ? (
            completedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-1">
                  No completed requests
                </p>
                <p className="text-muted-foreground">
                  Completed requests will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
