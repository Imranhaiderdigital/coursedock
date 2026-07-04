import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CourseList } from "@/components/course/CourseList";
import { getCourses, getCreators, getCategories } from "@/lib/contentLoader";

export const metadata = {
  title: "Browse Courses — CourseDock",
  description: "Browse the complete CourseDock learning library containing digital assets, masterclasses, and roadmap tracks.",
};

export default function CoursesPage() {
  const courses = getCourses();
  const creators = getCreators();
  const categories = getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow mx-auto max-w-[1440px] w-full px-4 md:px-8 py-12 space-y-10">
        <div className="text-center md:text-left space-y-2">
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
            Explore Learning Library
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
            Discover structured, modular content packs taught by verified specialists. Filter by categories, level, or keywords.
          </p>
        </div>

        <CourseList
          initialCourses={courses}
          creators={creators}
          categories={categories}
        />
      </main>

      <Footer />
    </div>
  );
}
