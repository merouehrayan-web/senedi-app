"use client";

import { useState } from "react";
import Header, { type Tab } from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import EventForm from "@/components/EventForm";
import Realisations from "@/components/Realisations";
import Partenaires from "@/components/Partenaires";
import Materiel from "@/components/Materiel";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("accueil");

  return (
    <main className="min-h-screen bg-ink pb-16 md:pb-0">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "accueil" && <Hero onPlanifier={() => setActiveTab("planifier")} />}
      {activeTab === "planifier" && <EventForm />}
      {activeTab === "realisations" && <Realisations />}
      {activeTab === "confiance" && <Partenaires />}
      {activeTab === "materiel" && <Materiel />}

      <Footer />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
