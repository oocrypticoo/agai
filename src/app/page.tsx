import ClientShell, { MountainsBg } from "./components/ClientShell";
import HeroNew from "./sections/HeroNew";
import LiveStats from "./sections/LiveStats";
import McpShowcase from "./sections/McpShowcase";
import AgentIdentitySection from "./sections/AgentIdentitySection";
import WhyAGIMatters from "./sections/WhyAGIMatters";
import AGIDiagram from "./sections/AGIFlowchart";
import Founder from "./sections/Founder";
import GithubContributions from "./sections/GithubContributions";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <ClientShell>
        <MountainsBg>
          <HeroNew />
          <LiveStats />
        </MountainsBg>
        <McpShowcase />
        <AgentIdentitySection />
        <GithubContributions />
        <Founder />
        <WhyAGIMatters />
        <AGIDiagram />
        <Footer />
      </ClientShell>
    </div>
  );
}
