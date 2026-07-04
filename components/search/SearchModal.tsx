"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, X, ChevronRight, BookOpen, User, Folder, Route, FileText } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SearchResult } from "@/types";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search index on mount
  useEffect(() => {
    if (isOpen) {
      fetch("/search-index.json")
        .then((res) => res.json())
        .then((data) => setIndex(data))
        .catch((err) => console.error("Failed to load search index:", err));
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filter index based on query
  useEffect(() => {
    if (!query.trim()) {
      // Suggest featured/recent content when query is empty
      const defaultSuggestions = index.filter(
        (item) => item.type === "course" || item.type === "category"
      ).slice(0, 5);
      setFilteredResults(defaultSuggestions);
      setSelectedIndex(0);
      return;
    }

    const cleanQuery = query.toLowerCase().trim();
    const matches = index.filter((item) => {
      return (
        item.title.toLowerCase().includes(cleanQuery) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(cleanQuery)) ||
        item.type.toLowerCase().includes(cleanQuery)
      );
    });

    setFilteredResults(matches.slice(0, 10)); // Cap results to top 10
    setSelectedIndex(0);
  }, [query, index]);

  // Focus input automatically
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Navigate to selected result
  const handleSelect = (item: SearchResult) => {
    onClose();
    let url = "/";
    switch (item.type) {
      case "course":
        url = `/courses/${item.slug}`;
        break;
      case "creator":
        url = `/creators/${item.slug}`;
        break;
      case "category":
        url = `/categories/${item.slug}`;
        break;
      case "collection":
        url = `/collections/${item.slug}`;
        break;
      case "lesson":
        url = `/courses/${item.courseSlug}/${item.slug}`;
        break;
    }
    
    startTransition(() => {
      router.push(url);
    });
  };

  // Keyboard Navigation inside Search Results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Helper icon for search result types
  const getIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "creator":
        return <User className="h-4 w-4 text-emerald-500" />;
      case "category":
        return <Folder className="h-4 w-4 text-amber-500" />;
      case "collection":
        return <Route className="h-4 w-4 text-purple-500" />;
      case "lesson":
        return <FileText className="h-4 w-4 text-cyan-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 border-border/80 shadow-medium glass bg-background/90">
        <div className="flex items-center border-b border-border/80 px-4" onKeyDown={handleKeyDown}>
          <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search courses, creators, categories, roadmaps..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex h-12 w-full bg-transparent font-sans text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full p-1 hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label="Clear Search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2" onKeyDown={handleKeyDown}>
          {filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-sans text-sm font-semibold text-foreground">No results found</p>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                We couldn't find anything matching "{query}". Try checking your spelling or search for categories instead.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                {query ? "Search Results" : "Popular Suggestions"}
              </div>
              {filteredResults.map((item, idx) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 ${
                    idx === selectedIndex
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-md p-1.5 ${idx === selectedIndex ? "bg-white/20 text-white" : "bg-muted text-foreground"}`}>
                      {getIcon(item.type)}
                    </div>
                    <div>
                      <div className="font-sans text-sm font-medium leading-none">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className={`font-sans text-xs mt-1 truncate max-w-sm ${idx === selectedIndex ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-sans text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                      idx === selectedIndex
                        ? "bg-white/25 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {item.type}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-border/80 bg-muted/30 px-4 py-2.5 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Navigate:</span>
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[9px] shadow-sm">↑↓</kbd>
            <span>Select:</span>
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[9px] shadow-sm">Enter</kbd>
          </div>
          <div className="flex items-center gap-2">
            <span>Close:</span>
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[9px] shadow-sm">ESC</kbd>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
