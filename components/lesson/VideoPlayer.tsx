"use client";

import React, { useState } from "react";
import { Play, Loader2, Maximize } from "lucide-react";
import { resolveEmbedUrl } from "@/utils/video";

interface VideoPlayerProps {
  url?: string;
  title: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!url) {
    return (
      <div className="relative aspect-video rounded-xl bg-muted border flex items-center justify-center">
        <span className="font-sans text-xs text-muted-foreground">
          No video preview available for this lesson.
        </span>
      </div>
    );
  }

  const embedUrl = resolveEmbedUrl(url);

  const startPlaying = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleFrameLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative aspect-video w-full rounded-xl border border-border/80 bg-slate-950 overflow-hidden shadow-soft group">
      {!isPlaying ? (
        // Custom Placeholder overlay
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-slate-900/60 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20" />
          <button
            onClick={startPlaying}
            className="rounded-full bg-primary text-white p-4 shadow-medium transition-transform group-hover:scale-105 hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Play Lesson Video"
          >
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </button>
          <span className="font-sans text-xs font-bold text-white uppercase tracking-wider mt-4">
            Watch Lesson Video
          </span>
          <span className="font-sans text-[10px] text-white/70 mt-1 max-w-xs truncate">
            {title}
          </span>
        </div>
      ) : (
        // Iframe Player
        <div className="h-full w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}
          <iframe
            src={embedUrl}
            title={title}
            onLoad={handleFrameLoad}
            className="h-full w-full border-none"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
