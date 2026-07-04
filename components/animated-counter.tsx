"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "1,000+", "100+", "20+"
}

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Parse the numbers and symbols from string (e.g., "1,000+" -> target = 1000, suffix = "+")
  const numericString = value.replace(/[^0-9]/g, "");
  const targetNumber = parseInt(numericString, 10) || 0;
  const suffix = value.replace(/[0-9,]/g, "");
  const hasComma = value.includes(",");

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let startTime: number | null = null;
    const duration = 1200; // 1.2 seconds duration

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function outQuad
      const easedProgress = progress * (2 - progress);
      const currentCount = Math.floor(easedProgress * targetNumber);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetNumber]);

  const formatNumber = (num: number) => {
    if (hasComma) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? `${formatNumber(count)}${suffix}` : `0${suffix}`}
    </span>
  );
}
