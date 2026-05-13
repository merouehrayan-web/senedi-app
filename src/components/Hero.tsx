"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Volume2, Sparkles, Landmark, UtensilsCrossed,
  Armchair, UserCheck, Flame, Music2, Zap, MonitorPlay, Bell,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  { label: "Son & Lumière", icon: Volume2 },
  { label: "Décoration", icon: Sparkles },
  { label: "Arches de Bienvenue", icon: Landmark },
  { label: "Traiteur", icon: UtensilsCrossed },
  { label: "Mobilier", icon: Armchair },
  { label: "Hôtesse d'Accueil", icon: UserCheck },
  { label: "Feu d'Artifice", icon: Flame },
  { label: "Piste de Danse", icon: Music2 },
  { label: "Laser Show", icon: Zap },
  { label: "Mapping", icon: MonitorPlay },
  { label: "Service", icon: Bell },
];

interface HeroProps {
  onPlanifier: () => void;
}

export default function Hero({ onPlanifier }: HeroProps) {
  return (
    <div className="pt-16 min-h-screen flex flex-col">

      {/* ── HERO CINÉMATIQUE ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">

        {/* Halo doré centré */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(212,175,55,0.07) 0%, transparent 70%)",
        }} />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Image src="/logo.png" alt="SENEDI SM" width={200} height={66} className="h-14 w-auto object-contain" />
        </motion.div>

        {/* Ligne dorée décorative */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-10"
        />

        {/* Titre éditorial */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center font-bold leading-none mb-6"
        >
          <span className="block text-4xl sm:text-6xl md:text-8xl text-white tracking-tight">
            L'art de
          </span>
          <span className="block text-4xl sm:text-6xl md:text-8xl gold-text tracking-tight">
            l'événement.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-white/40 text-base sm:text-lg text-center max-w-md mb-12"
        >
          Mariage · Corporatif · Anniversaire · Fête privée
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onPlanifier}
          className="group flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold px-10 py-4 rounded-full text-base shadow-2xl shadow-gold/20 hover:shadow-gold/40 transition-all"
        >
          Planifier mon événement
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </section>

      {/* ── BANDE DE SERVICES ── */}
      <section className="border-t border-ink-border py-8 px-4 overflow-hidden">
        <div className="flex gap-6 overflow-x-auto scrollbar-none pb-1 max-w-6xl mx-auto">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2.5 flex-shrink-0 px-4 py-2.5 bg-ink-card rounded-full border border-ink-border"
              >
                <Icon className="w-4 h-4 text-gold/60 flex-shrink-0" />
                <span className="text-white/50 text-sm whitespace-nowrap">{service.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
