"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Gem, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex flex-col">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <Card className="w-full max-w-md border-border/50 shadow-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Gem className="h-6 w-6 text-white" />
            </div>
            {!isSubmitted ? (
              <div>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                  Join AuraWealth
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                  Request access to your private wealth manager
                </CardDescription>
              </div>
            ) : (
              <div>
                <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-500">
                  Request Received
                </CardTitle>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isLoading}
                    className="h-11 bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                    className="h-11 bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    disabled={isLoading}
                    className="h-11 bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-md font-medium bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2 h-5 w-5" />
                      Submitting Request...
                    </>
                  ) : (
                    "Request to Join"
                  )}
                </Button>
                
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                  Already a member? <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Log in</Link>
                </p>
              </form>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-500" />
                </div>
                <Alert className="bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <AlertDescription className="text-green-800 dark:text-green-300 text-[15px] p-2 leading-relaxed font-medium">
                    Request to join sent to team for approval, you will receive details soon from our end.
                  </AlertDescription>
                </Alert>
                <Button asChild variant="outline" className="w-full mt-4 h-11 border-slate-300 dark:border-slate-700">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
