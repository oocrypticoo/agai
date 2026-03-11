"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import ButtonPrimary from "../components/ButtonPrimary";
import Transition from "../components/Transition";
import { ArrowRight, Menu, Moon, Rocket, Sun, X } from "lucide-react";
import ButtonSecondary from "../components/ButtonSecondary";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", link: "/" },
    { name: "Technology", link: "/technology" },
    { name: "Whitepaper", link: "/whitepaper" },
    { name: "Roadmap", link: "/roadmap" },
    { name: "Biography", link: "/biography" },
    { name: "Developers", link: "/developers" },
    { name: "Jobs", link: "/jobs" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-black/70"
      >
        <div className="max-w-7xl mx-auto">
          <div className="px-[10px] lg:px-0 flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-10">
              <Link href={"/"}>
                <img
                  src={theme === "light" ? "/AGIBlack.png" : "/AGIWhite.png"}
                  alt="AGAI Logo"
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
              <div className="w-[1.5px] h-[18px] bg-[#929292] dark:bg-[#858585] rounded-full hidden lg:block" />
              <nav className="hidden lg:flex items-center gap-8">
                {navigationItems.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="text-[16px] md:text-[17px] text-text font-degular leading-relaxed tracking-wide hover:text-[#805abe] dark:hover:text-[#805abe] transition-colors duration-300 cursor-pointer"
                      onClick={() => {
                        router.push(`${item.link}`);
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </nav>
            </div>
            {/* CTA Button - Desktop */}
            <div className="hidden xl:flex justify-center items-center gap-3">
              <ButtonSecondary
                text="$AGIALPHA"
                Icon={ArrowRight}
                width={130}
                onClick={() =>
                  window.open(
                    "https://dexscreener.com/solana/8zq3vbuoy66dur6dhra4aqnrtgg9yzyrap51btbpexj",
                    "_blank"
                  )
                }
              />
              <ButtonPrimary
                text="GitHub"
                Icon={Rocket}
                width={130}
                onClick={() =>
                  window.open("https://github.com/MontrealAI", "_blank")
                }
              />
              <button
                className="p-2.5 transition-all duration-500 cursor-pointer !outline-none"
                onClick={() => {
                  setShowTransition(true);
                }}
              >
                {theme === "dark" && <Sun className="size-5 text-white" />}
                {theme === "light" && (
                  <Moon className="size-5 text-[#060606]" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer xl:hidden p-2 text-heading hover:text-[#805abe] transition-colors duration-200 !outline-none"
            >
              {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden border-y border-black/20 dark:border-white/20 rounded-b-2xl bg-heading-invert transition-all duration-500 shadow-lg overflow-hidden ${
              isMobileMenuOpen ? "h-[350px] opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between">
              <div className="space-y-6">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="font-degular text-[14px] text-heading tracking-widest hover:text-[#805abe] dark:hover:text-[#805abe] transition-colors duration-300 cursor-pointer"
                    onClick={() => {
                      router.push(`${item.link}`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <ButtonPrimary
                  text="$AGIALPHA"
                  width={130}
                  onClick={() =>
                    window.open(
                      "https://dexscreener.com/solana/8zq3vbuoy66dur6dhra4aqnrtgg9yzyrap51btbpexj",
                      "_blank"
                    )
                  }
                />
                <ButtonPrimary
                  text="GitHub"
                  width={130}
                  onClick={() =>
                    window.open("https://github.com/MontrealAI", "_blank")
                  }
                />
                <button
                  className="p-2.5 transition-all duration-500 cursor-pointer !outline-none"
                  onClick={() => {
                    setShowTransition(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {theme === "dark" && <Sun className="size-5 text-white" />}
                  {theme === "light" && (
                    <Moon className="size-5 text-[#060606]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <Transition show={showTransition} setShow={setShowTransition} />
    </>
  );
};

export default Header;
