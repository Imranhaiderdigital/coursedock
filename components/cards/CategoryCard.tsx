"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Category } from "@/types";
import LucideIcon from "@/components/lucide-icon";

interface CategoryCardProps {
  category: Category;
  courseCount: number;
}

export function CategoryCard({ category, courseCount }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="block focus-visible:outline-none">
      <motion.div
        whileHover={{ y: -4, border: "1px solid var(--color-primary)" }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-5 hover:bg-card/90 shadow-soft hover:shadow-medium transition-all h-full"
      >
        <div>
          {/* Category Icon Container */}
          <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-350">
            <LucideIcon name={category.icon} className="h-6 w-6" />
          </div>

          {/* Title and Description */}
          <h3 className="font-sans text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {category.title}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Stats Footer Row */}
        <div className="mt-5 border-t border-border/40 pt-4 flex items-center justify-between">
          <span className="font-sans text-xs font-semibold text-muted-foreground">
            {courseCount} {courseCount === 1 ? "Course" : "Courses"}
          </span>
          <span className="flex items-center gap-1 font-sans text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span>Explore</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
