import { projects } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "./_components/HeroHeader";
import { DeploymentGuide } from "./_components/DeploymentGuide";
import { RequestCTA } from "./_components/RequestCTA";
import { Footer } from "../components/Footer";
import ClientHomePage from "./_components/ClientHomePage";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />

      <div className="container mx-auto px-2 py-4 max-w-5xl">
        <HeroHeader projectCount={projects.length} />

        <ClientHomePage />

        <DeploymentGuide />

        <RequestCTA />

        <Footer />
      </div>
    </div>
  );
}
