import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export default function LucideIcon({ name, className, strokeWidth = 2 }: LucideIconProps) {
  // Get icon by string key, fall back to Sparkles if not found
  const IconComponent = (Icons as any)[name] || Icons.Sparkles;
  
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
