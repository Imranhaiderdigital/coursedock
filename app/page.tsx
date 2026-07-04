import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Rocket, Heart, BookOpen, User, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CourseCard } from "@/components/cards/CourseCard";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { AnimatedCounter } from "@/components/animated-counter";
import { ContinueLearning } from "@/components/continue-learning";
import { Newsletter } from "@/components/newsletter";
import { getCourses, getCreators, getCategories, getCollections } from "@/lib/contentLoader";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const courses = getCourses();
  const creators = getCreators();
  const categories = getCategories();
  const collections = getCollections();

  // Helper resolver functions
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

  const getCourseCountForCategory = (categoryId: string) => {
    return courses.filter((c) => c.categoryId === categoryId).length;
  };

  // Sort courses by updatedDate desc for "Recently Added"
  const recentlyAdded = [...courses]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 3);

  // Filter featured courses
  const featuredCourses = courses.filter((c) => c.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />
        
        {/* Floating Ambient Lights */}
        <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] dark:bg-primary/5" />
        <div className="absolute top-12 right-1/4 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-[100px] dark:bg-accent/5" />

        <div className="mx-auto max-w-[1440px] px-4 md:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
            <Sparkles className="h-3 w-3 fill-current" />
            <span>Digital Learning Redefined</span>
          </div>

          {/* Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
            Learn Smarter. <br className="sm:hidden" />
            Build Faster. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Grow Without Limits.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover thousands of carefully organized learning resources from multiple categories including Amazon, AI, Programming, Design, Marketing and more.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="#courses"
              className="w-full sm:w-auto text-center rounded-lg bg-primary px-8 py-3.5 font-sans text-sm font-bold text-primary-foreground hover:bg-primary/95 shadow-soft transition-all"
            >
              Browse Courses
            </Link>
            <Link
              href="#creators"
              className="w-full sm:w-auto text-center rounded-lg bg-secondary px-8 py-3.5 font-sans text-sm font-bold text-secondary-foreground hover:bg-muted transition-all border"
            >
              Explore Creators
            </Link>
          </div>
        </div>
      </section>

      {/* Continue Learning block (Only mounts client-side if data exists) */}
      <ContinueLearning />

      {/* Featured Categories Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Featured Categories
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1.5">
            Structured content bundles grouped by major industries and domains.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              courseCount={getCourseCountForCategory(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section id="courses" className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 border-t border-border/40 scroll-mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Featured Courses
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-1.5">
              Premium content packs curated for highest impact and clarity.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 font-sans text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredCourses.slice(0, 4).map((course) => {
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
      </section>

      {/* Collections Roadmaps Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 border-t border-border/40">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Curated roadmaps
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1.5">
            Step-by-step master tracks containing multiple related courses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.slice(0, 2).map((coll) => (
            <CollectionCard key={coll.id} collection={coll} />
          ))}
        </div>
      </section>

      {/* Popular Creators Section */}
      <section id="creators" className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 border-t border-border/40 scroll-mt-20">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Meet the Creators
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1.5">
            Learn directly from active market operators and trainers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.slice(0, 3).map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 border-t border-border/40">
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Recently Added
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1.5">
            The latest updates and releases inside the learning registry.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentlyAdded.map((course) => {
            const creator = getCreatorDetails(course.creatorId);
            return (
              <div key={course.courseId} className="border border-border/60 bg-card/50 rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all group">
                <div className="p-4 space-y-3">
                  <span className="font-sans text-[10px] font-bold text-primary uppercase tracking-wider">
                    {getCategoryTitle(course.categoryId)}
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <h4 className="font-sans text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                  </Link>
                  <p className="font-sans text-xs text-muted-foreground line-clamp-2">
                    {course.subtitle}
                  </p>
                  <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-4 text-[10px] text-muted-foreground font-sans">
                    <span>By {creator.name}</span>
                    <span>Added {new Date(course.publishedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 border-t border-border/40">
        <div className="mb-12 text-center">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Why Choose CourseDock?
          </h2>
          <p className="font-sans text-sm text-muted-foreground mt-1.5 max-w-xl mx-auto">
            Engineered for elite learning efficiency. Fully static architecture delivers instantaneous speeds.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex gap-4 p-5 rounded-xl border border-border/40 bg-card/40">
            <div className="rounded-lg bg-primary/10 text-primary p-2.5 h-10 w-10 flex items-center justify-center shrink-0">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-foreground">Ultrafast Performance</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Zero server-side database latency. Statically precompiled routes load instantly anywhere in the world.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-border/40 bg-card/40">
            <div className="rounded-lg bg-emerald-500/10 text-emerald-500 p-2.5 h-10 w-10 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-foreground">Organized Modules</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Clear modular sequences. No infinite scroll, just targeted tracks optimized for quick assimilation.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-xl border border-border/40 bg-card/40">
            <div className="rounded-lg bg-purple-500/10 text-purple-500 p-2.5 h-10 w-10 flex items-center justify-center shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold text-foreground">Top Field Specialists</h3>
              <p className="font-sans text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Learn from actual business practitioners. Content built by developers, designers, and e-commerce leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics counters Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight">
              <AnimatedCounter value={siteConfig.stats.courses} />
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-primary-foreground/80">
              Courses
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight">
              <AnimatedCounter value={siteConfig.stats.creators} />
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-primary-foreground/80">
              Creators
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight">
              <AnimatedCounter value={siteConfig.stats.lessons} />
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-primary-foreground/80">
              Lessons
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight">
              <AnimatedCounter value={siteConfig.stats.categories} />
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-primary-foreground/80">
              Categories
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter subscription Section */}
      <Newsletter />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
