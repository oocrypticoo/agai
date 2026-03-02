"use client";
import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Overview from "./sections/Overview";
import WhyAGIMatters from "./sections/WhyAGIMatters";
import Founder from "./sections/Founder";
import AGIDiagram from "./sections/AGIFlowchart";
import Jobs from "./sections/Jobs";
import Footer from "./sections/Footer";
import StarfieldPage from "./components/Stars";
import { useTheme } from "next-themes";
import GithubContributions from "./sections/GithubContributions";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      {theme !== "light" && (
        <StarfieldPage color="white" size={0.003} count={700} />
      )}
      <div className="bg-[url('/mountains.jpg')] bg-no-repeat bg-cover">
        <Hero />
        <Overview />
      </div>
      <Founder />
      <GithubContributions />
      <Jobs />
      <WhyAGIMatters />
      <AGIDiagram />
      <Footer />
    </div>
  );
}
