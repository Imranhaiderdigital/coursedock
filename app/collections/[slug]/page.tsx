import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCollectionBySlug, getCollections, getCourses, getCreators, getCategories } from "@/lib/contentLoader";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = getCollections();
  return collections.map((coll) => ({
    slug: coll.slug,
  }));
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const allCourses = getCourses();
  const creators = getCreators();
  const categories = getCategories();

  // Resolve courses in recommended order
  const collectionCourses = collection.recommendedOrder
    .map((courseSlug) => allCourses.find((c) => c.slug === courseSlug))
    .filter((course) => !!course);

  const getCreatorName = (creatorId: string) => {
    const c = creators.find((cr) => cr.id === creatorId);
    return c ? c.name : "Unknown Creator";
  };

  const getCategoryTitle = (categoryId: string) => {
    const cat = categories.find((ct) => ct.id === categoryId);
    return cat ? cat.title : "General";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Collection Hero */}
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

            <div className="pt-4 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
                Roadmap Path
              </span>
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
                {collection.title}
              </h1>
              <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
                {collection.description}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              <div className="bg-card border rounded-lg px-4 py-2.5 shadow-soft flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-sans text-xs text-muted-foreground">Courses</div>
                  <div className="font-sans text-sm font-bold text-foreground">
                    {collectionCourses.length}
                  </div>
                </div>
              </div>
              <div className="bg-card border rounded-lg px-4 py-2.5 shadow-soft flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <div>
                  <div className="font-sans text-xs text-muted-foreground">Estimated Time</div>
                  <div className="font-sans text-sm font-bold text-foreground">
                    {collection.estimatedTime}
                  </div>
                </div>
              </div>
              <div className="bg-card border rounded-lg px-4 py-2.5 shadow-soft flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-500" />
                <div>
                  <div className="font-sans text-xs text-muted-foreground">Difficulty</div>
                  <div className="font-sans text-sm font-bold text-foreground">
                    {collection.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Steps */}
        <section className="mx-auto max-w-[3xl] max-w-[1440px] px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Requirements & Info */}
            <div className="space-y-6">
              {collection.requiredSkills && (
                <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-3">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                    Required Skills
                  </h3>
                  <ul className="space-y-2">
                    {collection.requiredSkills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2 font-sans text-xs text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-3">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                  About this Pathway
                </h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Roadmaps are structured sequences of individual courses. Taught in recommended order, they ensure a smooth, logical learning curve without missing core conceptual dependencies.
                </p>
              </div>
            </div>

            {/* Right Column: Step Sequence Checklist */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-b border-border/40 pb-3">
                <h2 className="font-sans text-lg font-bold text-foreground">
                  Recommended Learning Path ({collectionCourses.length} Steps)
                </h2>
              </div>

              <div className="relative border-l border-border/80 pl-6 ml-4 space-y-8">
                {collectionCourses.map((course, idx) => {
                  const stepNumber = idx + 1;
                  return (
                    <div key={course.courseId} className="relative group">
                      {/* Step Circle Pin */}
                      <span className="absolute -left-10 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-sans text-xs font-bold text-white shadow-soft transition-transform group-hover:scale-110">
                        {stepNumber}
                      </span>

                      {/* Step Content Card */}
                      <div className="border border-border bg-card hover:bg-card/90 rounded-xl p-5 shadow-soft hover:shadow-medium transition-all space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
                            {getCategoryTitle(course.categoryId)}
                          </span>
                          <span className="font-sans text-[10px] font-semibold text-muted-foreground">
                            {course.duration} • {course.lessonsCount} lessons
                          </span>
                        </div>

                        <div>
                          <h3 className="font-sans text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="font-sans text-xs text-muted-foreground mt-1 line-clamp-2">
                            {course.subtitle}
                          </p>
                        </div>

                        <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                          <span className="font-sans text-xs text-muted-foreground">
                            By {getCreatorName(course.creatorId)}
                          </span>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-1 font-sans text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            <span>Start Course</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
