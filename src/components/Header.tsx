"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type Tab = "accueil" | "planifier" | "services" | "realisations" | "confiance" | "materiel";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "accueil", label: "Accueil" },
  { id: "planifier", label: "Planifier" },
  { id: "services", label: "Nos Services" },
  { id: "realisations", label: "Réalisations" },
  { id: "confiance", label: "Références" },
  { id: "materiel", label: "Matériel" },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md border-b border-ink-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setActiveTab("accueil")} className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="SENEDI SM" width={120} height={40} className="h-9 w-auto object-contain" />
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id ? "text-gold" : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
