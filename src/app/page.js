"use client";
import React from "react";
import MyNavBar from "@/components/my-navbar";
import MyHero from "@/components/MyHeroSection";
import ProjectPreviewCard from "@/components/ProjectCards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MyNavBar />
      <main className="flex-1">
        <MyHero />
        <ProjectPreviewCard count={3} />
      </main>
    </div>
  );
}
