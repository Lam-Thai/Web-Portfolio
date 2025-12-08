import React from "react";
import MyHero from "@/components/MyHeroSection";
import ProjectPreviewCard from "@/components/ProjectCards";
import GitHubCalendar from "@/components/github-calendar";

export const revalidate = 0; // Make page dynamic

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <MyHero />
        <ProjectPreviewCard count={3} />
        <div className="container mx-auto px-4 py-12">
          <GitHubCalendar username="Lam-Thai" />
        </div>
      </main>
    </div>
  );
}
