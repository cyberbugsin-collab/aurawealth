"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { usersData, type PortfolioItem } from "@/lib/data";
import { MessageSquare, Send, CheckCircle } from "lucide-react";

interface RequestModalProps {
  asset?: PortfolioItem;
  trigger?: React.ReactNode;
}

export function RequestModal({ asset, trigger }: RequestModalProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState<string>(asset ? "update" : "general");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // In a real app, this would send the request to the backend
    // For now, we'll just show a success state
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setMessage("");
      setRequestType(asset ? "update" : "general");
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger || (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Request Change
            </Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <div className="py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Request Submitted
            </h3>
            <p className="text-muted-foreground">
              Your request has been sent to the admin. You will be notified once it is processed.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger || (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Request Change
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {asset ? `Request Update for ${asset.name}` : "Submit a Request"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {asset && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Asset</p>
              <p className="font-medium text-foreground">{asset.name}</p>
              <p className="text-sm text-muted-foreground">{asset.symbol}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Request Type</label>
            <Select value={requestType} onValueChange={setRequestType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="update">Update Existing Asset</SelectItem>
                <SelectItem value="add">Add New Asset</SelectItem>
                <SelectItem value="delete">Remove Asset</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Describe your request in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Your request will be sent to the admin for review. They will update your portfolio accordingly.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!message.trim()} className="gap-2">
            <Send className="h-4 w-4" />
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
