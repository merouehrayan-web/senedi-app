"use client";

import { motion } from "framer-motion";
import { Home, CalendarPlus, Images, Star, Wrench, Sparkles } from "lucide-react";
import type { Tab } from "./Header";

const TABS = [
  { id: "accueil" as Tab, label: "Accueil", icon: Home },
  { id: "planifier" as Tab, label: "Planifier", icon: CalendarPlus },
  { id: "services" as Tab, label: "Services", icon: Sparkles },
  { id: "realisations" as Tab, label: "Photos", icon: Images },
  { id: "confiance" as Tab, label: "Refs", icon: Star },
  { id: "materiel" as Tab, label: "Matériel", icon: Wrench },
];

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-ink-card/95 backdrop-blur-md border-t border-ink-border">
      <div className="flex items-stretch h-14">
        {TABS.map(({ id, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 flex flex-col items-center justify-center relative"
            >
              {active && (
                <motion.div
                  layoutId="bottom-indicator"
                  className="absolute top-0 left-1 right-1 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-full"
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${active ? "text-gold" : "text-white/40"}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
