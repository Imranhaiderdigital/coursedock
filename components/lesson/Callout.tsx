import React from "react";
import { Lightbulb, AlertTriangle, Info, CheckCircle2, ShieldAlert } from "lucide-react";

export type CalloutType = "note" | "tip" | "warning" | "important" | "caution";

interface CalloutProps {
  type: CalloutType;
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  // Map types to styles
  const getStyles = () => {
    switch (type) {
      case "tip":
        return {
          bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
          border: "border-l-4 border-emerald-500",
          text: "text-emerald-800 dark:text-emerald-200",
          title: "Tip",
          icon: <Lightbulb className="h-4.5 w-4.5 text-emerald-500" />,
        };
      case "warning":
        return {
          bg: "bg-amber-500/5 dark:bg-amber-500/10",
          border: "border-l-4 border-amber-500",
          text: "text-amber-800 dark:text-amber-200",
          title: "Warning",
          icon: <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />,
        };
      case "important":
        return {
          bg: "bg-purple-500/5 dark:bg-purple-500/10",
          border: "border-l-4 border-purple-500",
          text: "text-purple-800 dark:text-purple-200",
          title: "Important",
          icon: <ShieldAlert className="h-4.5 w-4.5 text-purple-500" />,
        };
      case "caution":
        return {
          bg: "bg-red-500/5 dark:bg-red-500/10",
          border: "border-l-4 border-red-500",
          text: "text-red-800 dark:text-red-200",
          title: "Caution",
          icon: <ShieldAlert className="h-4.5 w-4.5 text-red-500" />,
        };
      case "note":
      default:
        return {
          bg: "bg-blue-500/5 dark:bg-blue-500/10",
          border: "border-l-4 border-blue-500",
          text: "text-blue-800 dark:text-blue-200",
          title: "Note",
          icon: <Info className="h-4.5 w-4.5 text-blue-500" />,
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`my-6 flex gap-3 rounded-r-lg border ${styles.bg} ${styles.border} p-4`}>
      <div className="shrink-0 mt-0.5">{styles.icon}</div>
      <div className="space-y-1 text-left">
        <div className="font-sans text-xs font-bold uppercase tracking-wider text-foreground leading-none">
          {styles.title}
        </div>
        <div className={`font-sans text-sm leading-relaxed ${styles.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
