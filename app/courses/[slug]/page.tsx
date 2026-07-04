import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Layers, Globe, Calendar, FileText, Download, Play, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCourseBySlug, getCourses, getCreators, getCategories, getLessonsForCourse } from "@/lib/contentLoader";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const creators = getCreators();
  const creator = creators.find((c) => c.id === course.creatorId);
  const categories = getCategories();
  const category = categories.find((c) => c.id === course.categoryId);
  const lessons = getLessonsForCourse(course.slug);

  // Group lessons by moduleName if they exist, else group all into one module
  const modules: Record<string, typeof lessons> = {};
  lessons.forEach((lesson) => {
    const mod = lesson.moduleName || "General Curriculum";
    if (!modules[mod]) {
      modules[mod] = [];
    }
    modules[mod].push(lesson);
  });

  const formattedDate = new Date(course.updatedDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="bg-muted/10 border-b border-border/40 py-3">
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 flex items-center gap-2 font-sans text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/courses" className="hover:text-primary">Courses</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            {category && (
              <>
                <Link href={`/categories/${category.slug}`} className="hover:text-primary">
                  {category.title}
                </Link>
                <ChevronRight className="h-3 w-3 shrink-0" />
              </>
            )}
            <span className="text-foreground truncate max-w-xs">{course.title}</span>
          </div>
        </div>

        {/* Course Banner Hero */}
        <section className="relative overflow-hidden pt-12 pb-10 md:pt-16 md:pb-12 border-b border-border/40 bg-muted/20">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
                {category?.title || "Course"}
              </span>
              <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {course.title}
              </h1>
              <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                {course.subtitle}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-sans pt-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{course.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  <span>{course.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Last Updated {formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Start Course Widget */}
            {lessons.length > 0 && (
              <div className="w-full lg:w-72 shrink-0 border border-border bg-card rounded-xl p-5 shadow-soft space-y-4">
                <div className="relative aspect-video w-full rounded-lg bg-muted border overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
                  <BookOpen className="h-8 w-8 text-primary/40" />
                </div>
                <Link
                  href={`/courses/${course.slug}/${lessons[0].slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-center font-sans text-xs font-bold text-white hover:bg-primary/95 transition-all shadow-soft"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Start Curriculum</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Detailed Layout */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: About, Outcomes, Syllabus */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="space-y-3">
                <h2 className="font-sans text-lg font-bold text-foreground">
                  About this Course
                </h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* What You Will Learn */}
              {course.whatYouWillLearn && (
                <div className="space-y-4 border border-border bg-card p-6 rounded-xl shadow-soft">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                    What you will learn
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((outcome, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start font-sans text-xs text-muted-foreground">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Syllabus */}
              <div className="space-y-4">
                <h2 className="font-sans text-lg font-bold text-foreground">
                  Course Syllabus
                </h2>
                <div className="space-y-6">
                  {Object.entries(modules).map(([moduleName, moduleLessons]) => (
                    <div key={moduleName} className="border border-border/80 rounded-xl bg-card overflow-hidden shadow-soft">
                      <div className="bg-muted/30 border-b border-border/40 px-5 py-3">
                        <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground">
                          {moduleName}
                        </h4>
                      </div>
                      <div className="divide-y divide-border/40">
                        {moduleLessons.map((lesson, idx) => {
                          const indexNum = idx + 1;
                          return (
                            <Link
                              key={lesson.lessonId}
                              href={`/courses/${course.slug}/${lesson.slug}`}
                              className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-muted/40 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs text-muted-foreground w-4">
                                  {indexNum.toString().padStart(2, "0")}
                                </span>
                                <div>
                                  <span className="font-sans text-sm font-semibold text-foreground group-hover:text-primary transition-colors block">
                                    {lesson.title}
                                  </span>
                                  {lesson.isFree && (
                                    <span className="inline-flex mt-1 rounded bg-emerald-500/10 text-emerald-500 font-sans text-[9px] font-bold px-1 py-0.5">
                                      Free Preview
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground shrink-0">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{lesson.duration}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Creator details & resources */}
            <div className="space-y-6">
              {/* Creator details card */}
              {creator && (
                <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-4">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                    Instructor
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border bg-muted">
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center font-sans text-xl font-bold text-primary">
                        {creator.name[0]}
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/creators/${creator.slug}`}
                        className="font-sans text-sm font-bold text-foreground hover:text-primary transition-colors block"
                      >
                        {creator.name}
                      </Link>
                      <span className="font-sans text-xs text-muted-foreground block">
                        {creator.specialization}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {creator.bio}
                  </p>
                  <Link
                    href={`/creators/${creator.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-lg border py-2 text-center font-sans text-xs font-bold text-foreground hover:bg-muted transition-all"
                  >
                    View Instructor Profile
                  </Link>
                </div>
              )}

              {/* Sourcing / Requirements */}
              {course.requirements && (
                <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-3">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {course.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-2 items-start font-sans text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span className="leading-normal">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Downloads / Course Resources */}
              {course.resources && course.resources.length > 0 && (
                <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-4">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                    Download Resources
                  </h3>
                  <div className="space-y-2">
                    {course.resources.map((res, idx) => (
                      <Link
                        key={idx}
                        href={res.url}
                        target="_blank"
                        className="flex items-center justify-between border border-border/60 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 rounded-lg p-2.5 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          {res.type === "PDF" ? (
                            <FileText className="h-4 w-4 text-red-500" />
                          ) : (
                            <Download className="h-4 w-4 text-blue-500" />
                          )}
                          <div className="text-left">
                            <span className="font-sans text-xs font-bold text-foreground block group-hover:text-primary transition-colors truncate max-w-[150px]">
                              {res.name}
                            </span>
                            <span className="font-sans text-[10px] text-muted-foreground block uppercase">
                              {res.type} {res.size ? `• ${res.size}` : ""}
                            </span>
                          </div>
                        </div>
                        <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
