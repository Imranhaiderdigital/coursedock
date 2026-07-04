import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { getCreators } from "@/lib/contentLoader";

export const metadata = {
  title: "Instructors — CourseDock",
  description: "Learn from industry-leading instructors and subject specialists on CourseDock.",
};

export default function CreatorsPage() {
  const creators = getCreators();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow mx-auto max-w-[1440px] w-full px-4 md:px-8 py-12 space-y-10">
        <div className="text-center md:text-left space-y-2">
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
            Our Certified Instructors
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-xl leading-relaxed">
            CourseDock features content exclusively built by active industry practitioners. Gain knowledge that has been validated in the real world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
