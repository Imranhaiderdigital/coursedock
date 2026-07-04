import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe, BookOpen, UserCheck } from "lucide-react";
import { Twitter, Youtube, Github, Linkedin } from "@/components/brand-icons";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CourseCard } from "@/components/cards/CourseCard";
import { getCreatorBySlug, getCreators, getCourses, getCategories } from "@/lib/contentLoader";

interface CreatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const creators = getCreators();
  return creators.map((creator) => ({
    slug: creator.slug,
  }));
}

export default async function CreatorProfilePage({ params }: CreatorPageProps) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    notFound();
  }

  const allCourses = getCourses();
  const creatorCourses = allCourses.filter((course) => course.creatorId === creator.id);
  const categories = getCategories();

  const getCategoryTitle = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.title : "General";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Creator Banner */}
        <section className="relative h-48 md:h-64 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/15 border-b border-border/40 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          <div className="mx-auto max-w-[1440px] px-4 md:px-8 h-full flex items-end pb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-muted-foreground hover:text-primary transition-colors bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border shadow-soft"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </section>

        {/* Creator Profile Section */}
        <section className="mx-auto max-w-[1440px] px-4 md:px-8 -mt-16 md:-mt-24 relative z-10 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Card: Profile & Stats */}
            <div className="w-full lg:w-80 shrink-0 border border-border bg-card rounded-xl p-6 shadow-soft text-center lg:text-left">
              {/* Photo */}
              <div className="relative mx-auto lg:mx-0 h-28 w-28 overflow-hidden rounded-full border-2 border-primary bg-muted">
                <div className="h-full w-full bg-primary/10 flex items-center justify-center font-sans text-4xl font-bold text-primary">
                  {creator.name[0]}
                </div>
              </div>

              {/* Title Info */}
              <h1 className="font-sans text-xl font-bold text-foreground mt-4">
                {creator.name}
              </h1>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                {creator.specialization}
              </p>

              {/* Social Channels */}
              {creator.socialLinks && (
                <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                  {creator.website && (
                    <Link
                      href={creator.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Website"
                    >
                      <Globe className="h-4 w-4" />
                    </Link>
                  )}
                  {creator.socialLinks.twitter && (
                    <Link
                      href={creator.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="Twitter"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  )}
                  {creator.socialLinks.youtube && (
                    <Link
                      href={creator.socialLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="YouTube"
                    >
                      <Youtube className="h-4 w-4" />
                    </Link>
                  )}
                  {creator.socialLinks.github && (
                    <Link
                      href={creator.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {creator.socialLinks.linkedin && (
                    <Link
                      href={creator.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-4 mt-6 border-t border-border/60 pt-6">
                <div className="space-y-1">
                  <div className="font-sans text-xl font-bold text-foreground">
                    {creatorCourses.length}
                  </div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Courses
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-sans text-xl font-bold text-foreground flex items-center justify-center lg:justify-start gap-1">
                    <UserCheck className="h-4 w-4 text-emerald-500" />
                    <span>Verified</span>
                  </div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Status
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Biography & Courses Grid */}
            <div className="flex-grow space-y-8 w-full">
              {/* Bio Block */}
              <div className="border border-border bg-card rounded-xl p-6 shadow-soft space-y-3">
                <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground">
                  Biography
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {creator.bio}
                </p>
                {creator.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {creator.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 font-sans text-[10px] font-semibold text-secondary-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="font-sans text-lg font-bold text-foreground">
                    Courses by {creator.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {creatorCourses.map((course) => (
                    <CourseCard
                      key={course.courseId}
                      course={course}
                      creatorName={creator.name}
                      creatorPhoto={creator.photo}
                      categoryTitle={getCategoryTitle(course.categoryId)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
