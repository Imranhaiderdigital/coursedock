"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight, Route } from "lucide-react";
import { Collection } from "@/types";

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card hover:bg-card/90 shadow-soft hover:shadow-medium transition-all"
    >
      <div>
        {/* Cover Graphic Container */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/20 via-primary/5 to-accent/25 flex items-center justify-center">
          <div className="rounded-full bg-background p-4 shadow-soft">
            <Route className="h-8 w-8 text-primary" />
          </div>
          <span className="absolute right-3 top-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-0.5 font-sans text-[10px] font-bold text-foreground uppercase tracking-wider">
            Learning Path
          </span>
        </div>

        {/* Details Content */}
        <div className="p-5">
          <div className="flex items-center gap-4 text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="font-sans text-[11px] font-medium">
                {collection.recommendedOrder.length} {collection.recommendedOrder.length === 1 ? "Course" : "Courses"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-sans text-[11px] font-medium">{collection.estimatedTime}</span>
            </div>
          </div>

          <h3 className="font-sans text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {collection.title}
          </h3>
          <p className="font-sans text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Button Footer Row */}
      <div className="px-5 pb-5 pt-1">
        <Link
          href={`/collections/${collection.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-center font-sans text-xs font-bold text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
        >
          <span>View Collection</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
