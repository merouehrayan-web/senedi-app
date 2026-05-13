"use client";

import { useState } from "react";
import Header, { type Tab } from "@/components/Header";
import Hero from "@/components/Hero";
import EventForm from "@/components/EventForm";
import Realisations from "@/components/Realisations";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("accueil");

  return (
    <main className="min-h-screen bg-ink">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "accueil" && (
        <Hero onPlanifier={() => setActiveTab("planifier")} />
      )}
      {activeTab === "planifier" && <EventForm />}
      {activeTab === "realisations" && <Realisations />}

      <Footer />
    </main>
  );
}
