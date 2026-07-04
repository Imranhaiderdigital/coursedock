"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, BookOpen, Layers, Calendar, Bookmark, BookmarkCheck } from "lucide-react";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  creatorName: string;
  creatorPhoto: string;
  categoryTitle: string;
}

export function CourseCard({ course, creatorName, creatorPhoto, categoryTitle }: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Load bookmark state from local storage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]") as string[];
    setIsBookmarked(bookmarks.includes(course.courseId));
  }, [course.courseId]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]") as string[];
    let updated: string[];
    if (isBookmarked) {
      updated = bookmarks.filter((id) => id !== course.courseId);
    } else {
      updated = [...bookmarks, course.courseId];
    }
    
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  const formattedDate = new Date(course.updatedDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row overflow-hidden rounded-xl border border-border/80 bg-card hover:bg-card/90 shadow-soft hover:shadow-medium transition-all"
    >
      {/* Thumbnail Container */}
      <Link
        href={`/courses/${course.slug}`}
        className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden bg-muted"
      >
        {/* Fallback pattern if thumbnail not found */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <BookOpen className="h-10 w-10 text-primary/30" />
        </div>
        
        {/* Placeholder image loaded if none provided */}
        <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
        
        {course.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-0.5 font-sans text-[10px] font-bold text-white uppercase tracking-wider">
            Featured
          </span>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-col justify-between p-5 md:p-6 flex-grow">
        <div>
          {/* Card Top Metadata Row */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="font-sans text-[10px] font-bold tracking-wider text-primary uppercase">
              {categoryTitle}
            </span>
            <button
              onClick={toggleBookmark}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Course"}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Title and Subtitle */}
          <Link href={`/courses/${course.slug}`} className="block focus-visible:outline-none">
            <h3 className="font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-snug">
              {course.title}
            </h3>
            <p className="font-sans text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {course.subtitle}
            </p>
          </Link>
        </div>

        {/* Mid-Row Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-4 border-y border-border/40 py-2.5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-primary/75" />
            <span className="font-sans text-xs font-medium">{course.lessonsCount} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-accent/75" />
            <span className="font-sans text-xs font-medium">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-amber-500/75" />
            <span className="font-sans text-xs font-medium">{course.difficulty}</span>
          </div>
        </div>

        {/* Footer Creator Details & Date */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <Link
            href={`/creators/${course.creatorId}`}
            className="flex items-center gap-2 hover:text-primary transition-colors focus-visible:outline-none"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted border border-border/50">
              <div className="h-full w-full bg-primary/10 flex items-center justify-center font-sans text-[10px] font-bold text-primary">
                {creatorName[0]}
              </div>
            </div>
            <span className="font-sans text-xs font-semibold text-foreground hover:text-primary">
              {creatorName}
            </span>
          </Link>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-sans">
            <Calendar className="h-3 w-3" />
            <span>Updated {formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
