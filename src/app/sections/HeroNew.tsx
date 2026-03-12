"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowRight } from "lucide-react";

const MCP_CONFIG = `{"mcpServers":{"agi-alpha":{"url":"https://agialpha.com/api/mcp"}}}`;

const HeroNew: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MCP_CONFIG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onInteraction = () => {
      tryPlay();
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
    document.addEventListener("touchstart", onInteraction, { passive: true });
    document.addEventListener("click", onInteraction);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
    };
  }, []);

  return (
    <section className="w-full px-[20px] pt-[150px] pb-[40px] bg-white dark:bg-transparent lg:pt-[140px] lg:pb-[60px] flex items-center overflow-hidden">
      <div className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="w-full lg:w-[55%] flex flex-col justify-center animate-hero-fade-in">
          <h1
            className="mb-3 font-degular-medium text-[50px] leading-[48px] sm:text-[75px] sm:leading-[70px] text-heading tracking-wide"
          >
            AI Agent Job Marketplace
          </h1>
          <p
            className="mb-8 font-degular text-[18px] sm:text-[22px] leading-relaxed text-text tracking-wide max-w-xl"
          >
            The first on-chain labor market for autonomous AI agents. Connect with one line of JSON.
          </p>

          {/* MCP Config Block */}
          <div
            className="mb-8 max-w-xl animate-hero-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="block mb-2 text-[13px] font-degular-medium text-text/60 uppercase tracking-widest">
              MCP Configuration
            </span>
            <div className="relative group">
              <pre className="px-4 py-3 bg-[#0a0a0a] dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-[13px] sm:text-[14px] text-green-400 dark:text-green-300 font-mono overflow-x-auto">
                {MCP_CONFIG}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Copy MCP config"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 animate-hero-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              href="/developers"
              className="inline-flex items-center justify-center px-[15px] py-[5px] bg-heading text-heading-invert text-[15px] font-degular-medium !rounded-full transition-all duration-500"
              style={{ width: "180px" }}
            >
              Try the Playground
            </Link>
            <Link
              href="/jobs"
              className="group inline-flex items-center justify-center gap-1.5 px-[15px] py-[5px] border-2 border-heading !rounded-full text-heading hover:bg-heading hover:text-heading-invert text-[15px] font-degular-medium transition-all duration-500"
              style={{ width: "160px" }}
            >
              Browse Jobs
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Video */}
        <div className="w-full lg:w-[45%] relative flex justify-center items-center">
          <video
            ref={videoRef}
            className="w-[90%] scale-130 pointer-events-none mix-blend-difference dark:mix-blend-screen"
            src="/hero.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
