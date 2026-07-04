"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { Creator } from "@/types";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-5 hover:bg-card/90 shadow-soft hover:shadow-medium transition-all"
    >
      <div className="flex items-center gap-4">
        {/* Profile Picture */}
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border/80 bg-muted shrink-0">
          <div className="h-full w-full bg-primary/10 flex items-center justify-center font-sans text-lg font-bold text-primary">
            {creator.name[0]}
          </div>
        </div>

        {/* Details */}
        <div>
          <h3 className="font-sans text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {creator.name}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-0.5">
            {creator.specialization}
          </p>
        </div>
      </div>

      {/* Short Bio */}
      <p className="font-sans text-xs text-muted-foreground mt-4 line-clamp-2 leading-relaxed">
        {creator.bio}
      </p>

      {/* Stats and Button */}
      <div className="mt-5 border-t border-border/40 pt-4 flex items-center justify-between">
        <span className="font-sans text-xs font-semibold text-muted-foreground">
          {creator.totalCourses} {creator.totalCourses === 1 ? "Course" : "Courses"}
        </span>
        <Link
          href={`/creators/${creator.slug}`}
          className="flex items-center gap-1.5 font-sans text-xs font-bold text-primary hover:text-primary/80 transition-colors focus-visible:outline-none"
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
