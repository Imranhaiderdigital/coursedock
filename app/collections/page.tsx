import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { getCollections } from "@/lib/contentLoader";

export const metadata = {
  title: "Learning Paths — CourseDock",
  description: "Accelerate your mastery with structured, linear learning paths containing multiple related courses.",
};

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow mx-auto max-w-[1440px] w-full px-4 md:px-8 py-12 space-y-10">
        <div className="text-center md:text-left space-y-2">
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
            Curated Learning Paths
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
            Don't guess what to study next. Follow our step-by-step roadmaps compiling multiple related courses in recommended order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((coll) => (
            <CollectionCard key={coll.id} collection={coll} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
