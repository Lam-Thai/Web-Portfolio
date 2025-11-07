"use client";
import React from "react";
import MyHero from "@/components/MyHeroSection";
import ProjectPreviewCard from "@/components/ProjectCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <MyHero />
        <ProjectPreviewCard count={3} />
      </main>
    </div>
  );
}
