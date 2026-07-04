"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { Github } from "@/components/brand-icons";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/search/SearchModal";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Monitor scroll height to trigger glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to Cmd+K / Ctrl+K keyboard shortcut
  useKeyboardShortcuts([
    {
      key: "k",
      metaKey: true,
      callback: () => setIsSearchOpen(true),
    },
    {
      key: "k",
      ctrlKey: true,
      callback: () => setIsSearchOpen(true),
    },
  ]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "glass shadow-soft py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.mainNav.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`font-sans text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 font-sans text-xs text-muted-foreground hover:text-foreground shadow-soft transition-all hover:border-primary/50"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-flex h-4 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[9px] font-medium opacity-100">
                <span className="text-[8px]">⌘</span>K
              </kbd>
            </button>

            <ThemeToggle />

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Open Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[60px] z-30 h-[calc(100vh-60px)] w-full border-t border-border/80 bg-background/95 backdrop-blur-lg px-6 py-8 flex flex-col justify-between transition-transform duration-300">
            <div className="flex flex-col gap-6">
              {siteConfig.mainNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`font-sans text-lg font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex flex-col gap-6 border-t border-border/80 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm text-muted-foreground">Select Theme</span>
                <ThemeToggle />
              </div>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span>GitHub Repository</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
