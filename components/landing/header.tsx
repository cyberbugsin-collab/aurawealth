"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Gem } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-indigo-100 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Gem className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
              AuraWealth
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#preview"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#preview"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
            >
              Demo
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-slate-600 hover:text-indigo-600 dark:text-slate-300 transition-colors"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-indigo-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-800">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="default" className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-md border-0">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
