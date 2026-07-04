"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (e.g. "lang-typescript" or "language-js")
  const language = className ? className.replace(/(lang-|language-)/, "") : "code";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = children.trim().split("\n");

  return (
    <div className="relative border border-border/80 bg-card rounded-lg overflow-hidden my-6 group shadow-soft">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/30 font-sans text-xs">
        <span className="font-mono text-muted-foreground uppercase text-[10px] font-bold">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-foreground text-muted-foreground transition-colors p-1 rounded"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="flex overflow-x-auto font-mono text-xs leading-relaxed py-4 px-3 bg-muted/10">
        {/* Line Numbers */}
        <div className="select-none text-muted-foreground/40 text-right pr-4 border-r border-border/40 shrink-0">
          {codeLines.map((_, idx) => (
            <div key={idx} className="h-5">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 pr-2 overflow-x-auto w-full text-foreground whitespace-pre">
          <code>
            {codeLines.map((line, idx) => (
              <div key={idx} className="h-5">
                {line || " "}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
