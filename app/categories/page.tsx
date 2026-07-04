import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { getCategories, getCourses } from "@/lib/contentLoader";

export const metadata = {
  title: "Categories — CourseDock",
  description: "Browse educational materials structured by major categories, domains, and business structures.",
};

export default function CategoriesPage() {
  const categories = getCategories();
  const courses = getCourses();

  const getCourseCountForCategory = (categoryId: string) => {
    return courses.filter((c) => c.categoryId === categoryId).length;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow mx-auto max-w-[1440px] w-full px-4 md:px-8 py-12 space-y-10">
        <div className="text-center md:text-left space-y-2">
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
            Browse by Categories
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
            Content packages carefully sorted into target categories to facilitate linear progress and deep domain specialization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              courseCount={getCourseCountForCategory(cat.id)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
