"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Play, BookOpen } from "lucide-react";

interface ContinueLearningState {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  lessonTitle: string;
  lessonSlug: string;
  progressPercent: number;
}

export function ContinueLearning() {
  const [progress, setProgress] = useState<ContinueLearningState | null>(null);

  useEffect(() => {
    // Read user progress from localStorage
    const saved = localStorage.getItem("user-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure it contains required fields
        if (parsed.courseSlug && parsed.lessonSlug) {
          setProgress({
            courseId: parsed.courseId || "",
            courseTitle: parsed.courseTitle || "Active Course",
            courseSlug: parsed.courseSlug,
            lessonTitle: parsed.lessonTitle || "Next Lesson",
            lessonSlug: parsed.lessonSlug,
            progressPercent: parsed.progressPercent || 0,
          });
        }
      } catch (e) {
        console.error("Failed to parse user progress", e);
      }
    }
  }, []);

  if (!progress) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-8">
      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 text-primary p-3">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <span className="font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
              Continue Learning
            </span>
            <h3 className="font-sans text-lg font-bold text-foreground mt-0.5">
              {progress.courseTitle}
            </h3>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Resume from: <span className="font-semibold text-foreground">{progress.lessonTitle}</span>
            </p>
            {progress.progressPercent > 0 && (
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${progress.progressPercent}%` }}
                  />
                </div>
                <span className="font-sans text-[10px] font-semibold text-muted-foreground">
                  {Math.round(progress.progressPercent)}% complete
                </span>
              </div>
            )}
          </div>
        </div>

        <Link
          href={`/courses/${progress.courseSlug}/${progress.lessonSlug}`}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-sans text-xs font-bold text-primary-foreground hover:bg-primary/95 shadow-soft transition-all"
        >
          <Play className="h-4 w-4 fill-current" />
          <span>Resume Learning</span>
        </Link>
      </div>
    </section>
  );
}
