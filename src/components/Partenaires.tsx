"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Partner = { id: string; nom: string; logoUrl: string };

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partenaires").then(r => r.json()).then(setPartenaires).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Références</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Ils nous ont fait <span className="gold-text">confiance</span>
            </h1>
            <p className="text-white/40 text-lg">Des entreprises et particuliers qui nous ont accordé leur confiance</p>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/2] rounded-2xl bg-ink-card border border-ink-border animate-pulse" />
            ))}
          </div>
        ) : partenaires.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p>Aucun partenaire pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {partenaires.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 p-6 bg-ink-card border border-ink-border rounded-2xl hover:border-gold/30 transition-colors"
              >
                <div className="relative w-full aspect-[3/2]">
                  <Image src={p.logoUrl} alt={p.nom} fill className="object-contain" />
                </div>
                <p className="text-white/60 text-sm text-center font-medium">{p.nom}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
