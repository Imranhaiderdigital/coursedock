"use client";

import React from "react";
import Markdown from "markdown-to-jsx";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown
        options={{
          overrides: {
            pre: ({ children }: any) => {
              if (children && children.type === "code") {
                return (
                  <CodeBlock className={children.props.className}>
                    {children.props.children}
                  </CodeBlock>
                );
              }
              return <pre>{children}</pre>;
            },
            blockquote: ({ children }: any) => {
              const paragraph = Array.isArray(children) ? children[0] : children;
              const text = paragraph?.props?.children;
              
              if (typeof text === "string") {
                const match = text.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\r?\n?([\s\S]*)$/i);
                if (match) {
                  const type = match[1].toLowerCase() as any;
                  const content = match[2];
                  return <Callout type={type}>{content}</Callout>;
                }
              }
              
              if (Array.isArray(text)) {
                const firstChild = text[0];
                if (typeof firstChild === "string" && firstChild.startsWith("[!")) {
                  const closeBracketIdx = firstChild.indexOf("]");
                  if (closeBracketIdx > -1) {
                    const type = firstChild.slice(2, closeBracketIdx).toLowerCase() as any;
                    const remainingString = firstChild.slice(closeBracketIdx + 1).trim();
                    
                    const content = [remainingString, ...text.slice(1)];
                    return <Callout type={type}>{content}</Callout>;
                  }
                }
              }

              return (
                <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground my-6">
                  {children}
                </blockquote>
              );
            },
            h1: ({ children }: any) => (
              <h1 className="font-sans text-2xl font-extrabold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }: any) => (
              <h2 className="font-sans text-xl font-bold tracking-tight text-foreground mt-6 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }: any) => (
              <h3 className="font-sans text-lg font-bold tracking-tight text-foreground mt-5 mb-2">
                {children}
              </h3>
            ),
            table: ({ children }: any) => (
              <div className="overflow-x-auto my-6 border border-border/80 rounded-lg shadow-soft">
                <table className="w-full text-left font-sans text-sm divide-y divide-border/60">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }: any) => (
              <thead className="bg-muted/40 font-semibold text-foreground">
                {children}
              </thead>
            ),
            tbody: ({ children }: any) => (
              <tbody className="divide-y divide-border/40 bg-card">
                {children}
              </tbody>
            ),
            tr: ({ children }: any) => (
              <tr className="hover:bg-muted/20 transition-colors">
                {children}
              </tr>
            ),
            th: ({ children }: any) => (
              <th className="px-4 py-2.5 font-sans font-bold">
                {children}
              </th>
            ),
            td: ({ children }: any) => (
              <td className="px-4 py-3 text-muted-foreground font-sans">
                {children}
              </td>
            ),
            ul: ({ children }: any) => (
              <ul className="list-disc pl-6 space-y-2 my-4 font-sans text-sm text-muted-foreground">
                {children}
              </ul>
            ),
            ol: ({ children }: any) => (
              <ol className="list-decimal pl-6 space-y-2 my-4 font-sans text-sm text-muted-foreground">
                {children}
              </ol>
            ),
            li: ({ children }: any) => (
              <li className="leading-relaxed font-sans">
                {children}
              </li>
            ),
            a: ({ href, children }: any) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-semibold text-primary hover:underline"
              >
                {children}
              </a>
            ),
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
