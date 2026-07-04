"use client";

import React, { useState, useTransition } from "react";
import { Search, Sparkles, SlidersHorizontal, BookOpen } from "lucide-react";
import { Course, Creator, Category } from "@/types";
import { CourseCard } from "@/components/cards/CourseCard";

interface CourseListProps {
  initialCourses: Course[];
  creators: Creator[];
  categories: Category[];
}

export function CourseList({ initialCourses, creators, categories }: CourseListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const getCreatorDetails = (creatorId: string) => {
    const creator = creators.find((c) => c.id === creatorId);
    return {
      name: creator ? creator.name : "Unknown Creator",
      photo: creator ? creator.photo : "",
    };
  };

  const getCategoryTitle = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.title : "General";
  };

  // Perform filtering
  const filteredCourses = initialCourses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.categoryId === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;
    
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Filtering Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-card border rounded-xl p-4 shadow-soft">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter courses by name, tags..."
            value={searchQuery}
            onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-2 font-sans text-xs border bg-background rounded-lg outline-none placeholder:text-muted-foreground/60 text-foreground focus:border-primary"
          />
        </div>

        {/* Filters Dropdown/Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[10px] font-bold text-muted-foreground uppercase">Category</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border bg-background px-3 py-1.5 font-sans text-xs outline-none text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[10px] font-bold text-muted-foreground uppercase">Level</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border bg-background px-3 py-1.5 font-sans text-xs outline-none text-foreground"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
          <div className="rounded-full bg-muted p-4 mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-sans text-base font-bold text-foreground">No matches found</h3>
          <p className="font-sans text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
            We couldn't find any courses matching your selected filter criteria. Try clearing search filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}
            className="mt-6 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const creator = getCreatorDetails(course.creatorId);
            return (
              <CourseCard
                key={course.courseId}
                course={course}
                creatorName={creator.name}
                creatorPhoto={creator.photo}
                categoryTitle={getCategoryTitle(course.categoryId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
