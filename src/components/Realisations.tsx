"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Briefcase, Gift, PartyPopper, ImageOff } from "lucide-react";

const FILTERS = [
  { id: "all", label: "Tout voir", icon: null },
  { id: "mariage", label: "Mariage", icon: Heart },
  { id: "corporatif", label: "Corporatif", icon: Briefcase },
  { id: "anniversaire", label: "Anniversaire", icon: Gift },
  { id: "fete-privee", label: "Fête Privée", icon: PartyPopper },
];

type Realisation = {
  id: string;
  titre: string;
  description: string | null;
  imageUrl: string;
  eventType: string;
  createdAt: string;
};

export default function Realisations() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/realisations")
      .then((r) => r.json())
      .then((data) => setRealisations(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === "all"
      ? realisations
      : realisations.filter((r) => r.eventType === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Portfolio</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Nos <span className="gold-text">Réalisations</span>
            </h1>
            <p className="text-white/40 text-lg">Chaque événement est une œuvre unique</p>
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
                    : "bg-ink-card border border-ink-border text-white/60 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-ink-card border border-ink-border animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <ImageOff className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>Aucune réalisation pour le moment</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-border"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.titre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold">{item.titre}</p>
                    <p className="text-gold text-xs capitalize mt-0.5">
                      {FILTERS.find((f) => f.id === item.eventType)?.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
