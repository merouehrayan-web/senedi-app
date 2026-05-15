"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type MaterielItem = { id: string; nom: string; description: string | null; imageUrl: string };

export default function Materiel() {
  const [items, setItems] = useState<MaterielItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/materiel").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Équipement</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Notre <span className="gold-text">Matériel</span>
            </h1>
            <p className="text-white/40 text-lg">Un équipement professionnel pour des événements d&apos;exception</p>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-ink-card border border-ink-border animate-pulse h-64" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p>Aucun matériel pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-ink-card border border-ink-border rounded-2xl overflow-hidden hover:border-gold/30 transition-colors"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={item.imageUrl} alt={item.nom} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{item.nom}</h3>
                  {item.description && <p className="text-white/50 text-sm">{item.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
