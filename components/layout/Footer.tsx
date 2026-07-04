import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Github, Twitter, Youtube } from "@/components/brand-icons";
import Logo from "@/components/logo";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/80 bg-muted/30">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-16">
        {/* Footer Top Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Bio Column */}
          <div className="col-span-2 space-y-4">
            <Logo />
            <p className="font-sans text-sm text-muted-foreground max-w-xs leading-relaxed">
              CourseDock is a premium education library offering organized digital assets, video masterclasses, cheat sheets, and resource packages from leading creators.
            </p>
          </div>

          {/* Directory Columns */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {siteConfig.mainNav.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/api" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="border-t border-border/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 font-sans text-xs text-muted-foreground">
            <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
            <span className="hidden md:inline text-muted-foreground/30">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for learning.
            </span>
          </div>

          {/* Social Links & Version */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/60">
              v1.0.0
            </span>
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4.5 w-4.5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4.5 w-4.5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-4.5 w-4.5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
