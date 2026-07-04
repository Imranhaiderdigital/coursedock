import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CourseCard } from "@/components/cards/CourseCard";
import LucideIcon from "@/components/lucide-icon";
import { getCategoryBySlug, getCategories, getCourses, getCreators } from "@/lib/contentLoader";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allCourses = getCourses();
  const categoryCourses = allCourses.filter((course) => course.categoryId === category.id);
  const creators = getCreators();

  const getCreatorDetails = (creatorId: string) => {
    const creator = creators.find((c) => c.id === creatorId);
    return {
      name: creator ? creator.name : "Unknown Creator",
      photo: creator ? creator.photo : "",
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Category Hero Header */}
        <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16 border-b border-border/40 bg-muted/20">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-primary transition-colors bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border shadow-soft"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 text-primary p-2">
                    <LucideIcon name={category.icon} className="h-6 w-6" />
                  </div>
                  <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
                    {category.title}
                  </h1>
                </div>
                <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="shrink-0 bg-card border rounded-lg px-4 py-3 shadow-soft flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-sans text-sm font-bold text-foreground">
                    {categoryCourses.length}
                  </div>
                  <div className="font-sans text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Courses Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Courses Grid */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-12">
          {categoryCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed rounded-xl bg-card">
              <div className="rounded-full bg-muted p-4 mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-sans text-base font-bold text-foreground">No courses found</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">
                We haven't added courses to this category yet. Sign up for our newsletter to get notified of new additions!
              </p>
              <Link
                href="/"
                className="mt-6 rounded-lg bg-primary px-4 py-2 font-sans text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all"
              >
                Go back Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryCourses.map((course) => {
                const creator = getCreatorDetails(course.creatorId);
                return (
                  <CourseCard
                    key={course.courseId}
                    course={course}
                    creatorName={creator.name}
                    creatorPhoto={creator.photo}
                    categoryTitle={category.title}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
