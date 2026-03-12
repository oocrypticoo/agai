import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, ArrowUpRight, Youtube } from "lucide-react";
import XDark from "../components/svg/XDark";
import Telegram from "../components/svg/Telegram";

const Footer = () => {
  const documentation = [
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Biography", href: "/biography" },
  ];

  const agiFramework = [
    { name: "AGI Ascension", href: "/agi-ascension" },
    { name: "AGI Components", href: "/agi-components" },
    { name: "AGI Flowchart", href: "/agi-flowchart" },
    { name: "AGI Mastery", href: "/agi-mastery" },
    { name: "AGI Pipeline", href: "/agi-pipeline" },
    { name: "AGI Utility", href: "/agi-utility" },
    { name: "Neural Initialization", href: "/neural-initialization" },
    { name: "AGI Agents", href: "/forthcoming-agents" },
  ];

  const governance = [
    { name: "Governance", href: "/governance" },
    { name: "Architecture", href: "/protocol-architecture" },
    { name: "Risk Mitigation", href: "/risk-mitigation" },
  ];

  const economy = [
    { name: "Tokenomics", href: "/tokenomics" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Opportunity", href: "/opportunity" },
  ];

  const development = [
    { name: "Roadmap", href: "/roadmap" },
    { name: "Insight", href: "/insight" },
  ];

  const socialLinks = [
    { icon: XDark, href: "https://x.com/agialphaagent", label: "Twitter" },
    { icon: Telegram, href: "https://t.me/agialpha", label: "Telegram" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/montrealai",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@AGIAlpha",
      label: "Youtube",
    },
    { icon: Github, href: "https://github.com/MontrealAI", label: "GitHub" },
  ];

  return (
    <footer className="relative px-[20px] bg-[#0A0A0A] border-t border-[#888888]/20 z-10">
      <div className="max-w-7xl mx-auto pt-20 pb-7">
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-12 sm:gap-16">
          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6 sm:mb-8">
              <Image
                src={"/AGIWhite.png"}
                width={200}
                height={200}
                alt="AGAI Logo"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-5">
            <span className="block font-degular-medium text-white text-[16px] tracking-wide">
              Documentation
            </span>
            <ul className="space-y-4">
              {documentation.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[#888888] hover:text-[#F5F5F5] transition-colors duration-200 font-degular tracking-wide text-sm sm:text-base"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-4 sm:h-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <span className="block font-degular-medium text-white text-[16px] tracking-wide">
              AGI Framework
            </span>
            <ul className="space-y-4">
              {agiFramework.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[#888888] hover:text-[#F5F5F5] transition-colors duration-200 font-degular tracking-wide text-sm sm:text-base"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-4 sm:h-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <span className="block font-degular-medium text-white text-[16px] tracking-wide">
              Governance
            </span>
            <ul className="space-y-4">
              {governance.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[#888888] hover:text-[#F5F5F5] transition-colors duration-200 font-degular tracking-wide text-sm sm:text-base"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-4 sm:h-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <span className="block font-degular-medium text-white text-[16px] tracking-wide">
              Economy
            </span>
            <ul className="space-y-4">
              {economy.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[#888888] hover:text-[#F5F5F5] transition-colors duration-200 font-degular tracking-wide text-sm sm:text-base"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-4 sm:h-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <span className="block font-degular-medium text-white text-[16px] tracking-wide">
              Development
            </span>
            <ul className="space-y-4">
              {development.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[#888888] hover:text-[#F5F5F5] transition-colors duration-200 font-degular tracking-wide text-sm sm:text-base"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:w-4 sm:h-4"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#888888]/20 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-5 space-y-0">
          <p className="text-[#888888] font-degular tracking-wide text-sm sm:text-base">
            © 2025 AGI Alpha. All rights reserved.
          </p>
          <div className="flex sm:flex-row flex-col justify-center items-center gap-6">
            <div className="flex justify-center items-center gap-6">
              <a
                href="#"
                className="text-[#888888] hover:text-[#F5F5F5] font-degular tracking-wider transition-colors duration-200 text-sm sm:text-base"
              >
                Privacy Policy
              </a>
              <Link
                href="/terms-of-services"
                className="text-[#888888] hover:text-[#F5F5F5] font-degular tracking-wider transition-colors duration-200 text-sm sm:text-base"
              >
                Terms of Service
              </Link>
            </div>
            <div className="flex md:justify-end items-end gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" stroke="#000000" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
