"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Briefcase, Gift, PartyPopper,
  ImageOff, Upload,
} from "lucide-react";

const FILTERS = [
  { id: "all", label: "Tout voir", icon: null },
  { id: "mariage", label: "Mariage", icon: Heart },
  { id: "corporatif", label: "Corporatif", icon: Briefcase },
  { id: "anniversaire", label: "Anniversaire", icon: Gift },
  { id: "fete-privee", label: "Fête Privée", icon: PartyPopper },
];

// Placeholder items — replace with real DB images when available
const PLACEHOLDER_ITEMS = [
  { id: "1", titre: "Mariage Élégance", eventType: "mariage", gradient: "from-rose-900 to-rose-700" },
  { id: "2", titre: "Gala d'Entreprise", eventType: "corporatif", gradient: "from-blue-900 to-blue-700" },
  { id: "3", titre: "Anniversaire VIP", eventType: "anniversaire", gradient: "from-purple-900 to-purple-700" },
  { id: "4", titre: "Soirée Privée", eventType: "fete-privee", gradient: "from-amber-900 to-amber-700" },
  { id: "5", titre: "Mariage Luxe", eventType: "mariage", gradient: "from-pink-900 to-rose-800" },
  { id: "6", titre: "Séminaire Prestige", eventType: "corporatif", gradient: "from-indigo-900 to-blue-800" },
  { id: "7", titre: "Fête 40 ans", eventType: "anniversaire", gradient: "from-violet-900 to-purple-700" },
  { id: "8", titre: "Soirée d'Exception", eventType: "fete-privee", gradient: "from-orange-900 to-amber-700" },
  { id: "9", titre: "Mariage Royal", eventType: "mariage", gradient: "from-red-900 to-rose-700" },
];

export default function Realisations() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PLACEHOLDER_ITEMS
      : PLACEHOLDER_ITEMS.filter((item) => item.eventType === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Portfolio</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Nos <span className="gold-text">Réalisations</span>
            </h1>
            <p className="text-white/40 text-lg">
              Chaque événement est une œuvre unique
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
          {FILTERS.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? "bg-gold text-ink shadow-md shadow-gold/20"
                    : "bg-ink-card border border-ink-border text-white/60 hover:text-white hover:border-ink-muted"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-border cursor-pointer"
              >
                {/* Gradient placeholder — will be replaced by real <Image> */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Icon placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                  <ImageOff className="w-12 h-12 text-white" />
                </div>

                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/60 to-transparent" />
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold">{item.titre}</p>
                  <p className="text-gold text-xs capitalize mt-0.5">
                    {FILTERS.find((f) => f.id === item.eventType)?.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Add photos CTA (admin hint) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 px-5 py-3 bg-ink-card border border-ink-border rounded-2xl text-white/30 text-sm">
            <Upload className="w-4 h-4 text-gold/40" />
            <span>Vos photos seront ajoutées depuis l&apos;interface d&apos;administration</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
