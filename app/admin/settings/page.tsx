"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-context";
import { Settings, Bell, Shield, MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage admin preferences and configurations
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Admin Profile */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Admin Profile</CardTitle>
                <CardDescription>Your admin account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input value={user?.displayName || ""} disabled />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input value={user?.email || ""} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input value="Administrator" disabled />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Request Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when users submit requests
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Summary</p>
                <p className="text-sm text-muted-foreground">
                  Receive daily portfolio summary emails
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Slack Integration */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Slack Integration</CardTitle>
                <CardDescription>Connect Slack for request notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-dashed border-border">
              <p className="text-sm text-muted-foreground text-center">
                Slack integration coming soon. You will be able to receive user requests directly in Slack.
              </p>
            </div>
            <Button variant="outline" disabled className="w-full">
              Connect Slack
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
