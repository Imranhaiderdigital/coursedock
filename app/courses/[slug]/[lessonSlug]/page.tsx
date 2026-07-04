import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ArrowRight, Play, BookOpen, FileText, Download } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { VideoPlayer } from "@/components/lesson/VideoPlayer";
import { MarkdownRenderer } from "@/components/lesson/MarkdownRenderer";
import { LessonTracker } from "@/components/lesson/LessonTracker";
import { getCourseBySlug, getCourses, getLessonsForCourse, getLessonBySlug } from "@/lib/contentLoader";

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  const courses = getCourses();
  const paths: { slug: string; lessonSlug: string }[] = [];

  courses.forEach((course) => {
    const lessons = getLessonsForCourse(course.slug);
    lessons.forEach((lesson) => {
      paths.push({
        slug: course.slug,
        lessonSlug: lesson.slug,
      });
    });
  });

  return paths;
}

export default async function LessonViewerPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = await params;
  
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const lessons = getLessonsForCourse(slug);
  const lesson = lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  // Find index and next/prev lessons
  const currentIdx = lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;

  // Group lessons by module
  const modules: Record<string, typeof lessons> = {};
  lessons.forEach((l) => {
    const mod = l.moduleName || "General Curriculum";
    if (!modules[mod]) {
      modules[mod] = [];
    }
    modules[mod].push(l);
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Track Lesson progress client-side */}
      <LessonTracker
        courseId={course.courseId}
        courseTitle={course.title}
        courseSlug={course.slug}
        lessonTitle={lesson.title}
        lessonSlug={lesson.slug}
        lessonsCount={course.lessonsCount}
        currentIdx={currentIdx}
      />

      <Navbar />

      <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8 gap-8 items-start">
        {/* Collapsible Left Sidebar (curriculum) */}
        <aside className="w-full lg:w-80 shrink-0 border border-border bg-card rounded-xl shadow-soft overflow-hidden sticky top-24">
          <div className="bg-muted/40 border-b border-border/40 p-4">
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Course</span>
            </Link>
            <h3 className="font-sans text-sm font-bold text-foreground truncate">
              {course.title}
            </h3>
          </div>

          <div className="max-h-[500px] overflow-y-auto p-4 space-y-6">
            {Object.entries(modules).map(([moduleName, moduleLessons]) => (
              <div key={moduleName} className="space-y-2">
                <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {moduleName}
                </h4>
                <div className="space-y-1">
                  {moduleLessons.map((l) => {
                    const isCurrent = l.slug === lesson.slug;
                    return (
                      <Link
                        key={l.lessonId}
                        href={`/courses/${course.slug}/${l.slug}`}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-2 font-sans text-xs font-medium transition-colors ${
                          isCurrent
                            ? "bg-primary text-primary-foreground font-semibold shadow-soft"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Play className={`h-3 w-3 ${isCurrent ? "fill-current" : ""}`} />
                        <span className="truncate">{l.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Right Area (Viewer) */}
        <div className="flex-grow space-y-8 w-full max-w-3xl">
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
              <span>{lesson.moduleName || "Curriculum"}</span>
              <ChevronRight className="h-3 w-3" />
              <span>Lesson {currentIdx + 1} of {lessons.length}</span>
            </div>
            <h1 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {lesson.title}
            </h1>
            <span className="inline-block font-sans text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40">
              Duration: {lesson.duration}
            </span>
          </div>

          {/* Video Player Box */}
          {lesson.videoUrl && (
            <VideoPlayer url={lesson.videoUrl} title={lesson.title} />
          )}

          {/* Reading Navigation Toolbar */}
          <div className="flex items-center justify-between border-y border-border/40 py-3 mt-4">
            {prevLesson ? (
              <Link
                href={`/courses/${course.slug}/${prevLesson.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Prev: {prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/courses/${course.slug}/${nextLesson.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-primary hover:text-primary/80 transition-colors"
              >
                <span>Next: {nextLesson.title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <span>Curriculum Finished</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Markdown Content Area */}
          <article className="prose dark:prose-invert max-w-none pt-4">
            <MarkdownRenderer content={lesson.content} />
          </article>

          {/* Resources & Notes Column */}
          {(lesson.notesUrl || lesson.resourcesUrl) && (
            <div className="border border-border bg-card rounded-xl p-5 shadow-soft space-y-4">
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                Lesson Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.notesUrl && (
                  <Link
                    href={lesson.notesUrl}
                    target="_blank"
                    className="flex items-center justify-between border border-border/60 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 rounded-lg p-3 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <div>
                        <span className="font-sans text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                          Lesson Notes
                        </span>
                        <span className="font-sans text-[10px] text-muted-foreground block uppercase">
                          PDF Cheatsheet
                        </span>
                      </div>
                    </div>
                    <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                )}

                {lesson.resourcesUrl && (
                  <Link
                    href={lesson.resourcesUrl}
                    target="_blank"
                    className="flex items-center justify-between border border-border/60 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 rounded-lg p-3 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-blue-500" />
                      <div>
                        <span className="font-sans text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                          Resource Files
                        </span>
                        <span className="font-sans text-[10px] text-muted-foreground block uppercase">
                          ZIP Package
                        </span>
                      </div>
                    </div>
                    <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
