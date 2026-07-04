import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group focus-visible:outline-none">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-soft transition-transform group-hover:scale-105">
        {/* SVG Symbol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <span className="font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
        Course<span className="text-primary">Dock</span>
      </span>
    </Link>
  );
}
