"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InteractiveHero } from "@/components/InteractiveHero";
import { UpdatesGrid } from "@/components/UpdatesGrid";
import { EcosystemBento } from "@/components/EcosystemBento";
import { EngineeringMosaic } from "@/components/EngineeringMosaic";
import { InsightsAndMission } from "@/components/InsightsAndMission";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <ScrollProgress />
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="w-full bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <InteractiveHero />
          <EcosystemBento searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <EngineeringMosaic />
          <UpdatesGrid />
          <InsightsAndMission />
        </div>
      </main>
      <Footer />
    </>
  );
}
