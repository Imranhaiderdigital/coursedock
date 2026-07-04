"use client";

import React, { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 md:py-24">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-8 md:p-12 text-center max-w-3xl mx-auto shadow-soft">
        <h2 className="font-sans text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
          Get Weekly Study Content
        </h2>
        <p className="font-sans text-xs text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
          No spam. Just newly released courses, resource ZIP packages, and PDF cheatsheets delivered directly to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 mt-6 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow rounded-lg border border-border bg-background px-4 py-2.5 font-sans text-xs outline-none placeholder:text-muted-foreground/60 text-foreground focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-6 py-2.5 font-sans text-xs font-bold text-primary-foreground hover:bg-primary/95 shadow-soft transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
