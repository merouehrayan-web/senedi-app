"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type Tab = "accueil" | "planifier" | "realisations";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "accueil", label: "Accueil" },
  { id: "planifier", label: "Planifier mon événement" },
  { id: "realisations", label: "Nos Réalisations" },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md border-b border-ink-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveTab("accueil")}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/logo.png"
              alt="SENEDI SM"
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-gold"
                    : "text-white/60 hover:text-white"
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

          {/* Mobile nav */}
          <nav className="flex md:hidden items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  activeTab === tab.id
                    ? "text-gold border border-gold/40 bg-gold/10"
                    : "text-white/50"
                }`}
              >
                {tab.id === "accueil"
                  ? "Accueil"
                  : tab.id === "planifier"
                  ? "Planifier"
                  : "Réalisations"}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
