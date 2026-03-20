"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { usersData, type AdminRequest } from "@/lib/data";
import { RequestModal } from "@/components/dashboard/request-modal";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UserRequestsPage() {
  const { user } = useAuth();
  const userData = user?.uid ? usersData[user.uid] : null;
  const requests = userData?.requests || [];

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

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            My Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Track the status of your portfolio update requests
          </p>
        </div>
        <RequestModal
          trigger={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          }
        />
      </div>

      {/* Requests List */}
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {getTypeBadge(request.type)}
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                  <p className="text-foreground">{request.message}</p>
                  {request.assetName && (
                    <p className="text-sm text-muted-foreground">
                      Asset: <span className="font-medium">{request.assetName}</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No requests yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              When you need to update your portfolio, submit a request and our admin team will process it.
            </p>
            <RequestModal
              trigger={
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Submit Your First Request
                </Button>
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
