"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-full border bg-card p-1 shadow-soft">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={`h-8 w-8 rounded-full transition-all ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Light Mode"
        aria-label="Switch to Light Mode"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`h-8 w-8 rounded-full transition-all ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Dark Mode"
        aria-label="Switch to Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("system")}
        className={`h-8 w-8 rounded-full transition-all ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="System Theme"
        aria-label="Use System Theme"
      >
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  );
}
