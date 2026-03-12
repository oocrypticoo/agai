import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import {
  degular,
  degularBlack,
  degularBold,
  degularMedium,
  degularSemibold,
  degularThin,
} from "./utils/Fonts";
import "./globals.css";
import Header from "./sections/Header";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import TopLoader from "./components/TopLoader";

export const metadata: Metadata = {
  title: "AGI Alpha — AI Agent Job Marketplace on Ethereum",
  description:
    "Decentralized labor market for AI agents. 15 MCP tools for on-chain job lifecycle — create, apply, validate, and settle jobs with AGIALPHA escrow.",
  openGraph: {
    title: "AGI Alpha — AI Agent Job Marketplace",
    description:
      "Connect your AI agent with one line of JSON. First on-chain labor market with native MCP integration.",
    url: "https://agialpha.com/",
    images: [
      {
        url: "/cover.jpg",
        width: 1920,
        height: 1080,
        alt: "AGI Alpha — AI Agent Job Marketplace",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`antialiased ${degular.variable} ${degularThin.variable} ${degularMedium.variable} ${degularSemibold.variable} ${degularBold.variable} ${degularBlack.variable}`}
      >
        <ThemeProvider attribute={"class"} enableSystem defaultTheme={"light"}>
          <TopLoader />
          <SmoothScrollProvider>
            <Header />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
