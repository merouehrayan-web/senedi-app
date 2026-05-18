"use client";

import { motion } from "framer-motion";
import {
  Volume2, Sparkles, Landmark, UtensilsCrossed,
  Armchair, UserCheck, Flame, Music2, Zap, MonitorPlay, Bell,
} from "lucide-react";

const SERVICES = [
  {
    id: "son-lumiere",
    label: "Son & Lumière",
    icon: Volume2,
    description: "Systèmes audio professionnels, éclairages scéniques et jeux de lumière pour une ambiance inoubliable.",
  },
  {
    id: "decoration",
    label: "Décoration",
    icon: Sparkles,
    description: "Décoration sur mesure adaptée à votre thème : fleurs, drapés, centres de table et bien plus.",
  },
  {
    id: "arches",
    label: "Arches de Bienvenue",
    icon: Landmark,
    description: "Arches élégantes et structures décoratives pour accueillir vos invités avec style.",
  },
  {
    id: "traiteur",
    label: "Traiteur",
    icon: UtensilsCrossed,
    description: "Service traiteur raffiné avec des mets soigneusement préparés pour ravir vos convives.",
  },
  {
    id: "mobilier",
    label: "Mobilier",
    icon: Armchair,
    description: "Location de mobilier haut de gamme : tables, chaises, lounges et podiums pour tous vos événements.",
  },
  {
    id: "hotesse",
    label: "Hôtesse d'Accueil",
    icon: UserCheck,
    description: "Personnel qualifié pour accueillir et orienter vos invités avec professionnalisme.",
  },
  {
    id: "feu-artifice",
    label: "Feu d'Artifice",
    icon: Flame,
    description: "Spectacles pyrotechniques époustouflants pour clôturer votre événement en beauté.",
  },
  {
    id: "piste-danse",
    label: "Piste de Danse",
    icon: Music2,
    description: "Pistes de danse LED et parquets de qualité pour animer vos soirées.",
  },
  {
    id: "laser-show",
    label: "Laser Show",
    icon: Zap,
    description: "Spectacles laser de dernière génération pour des effets visuels saisissants.",
  },
  {
    id: "mapping",
    label: "Mapping",
    icon: MonitorPlay,
    description: "Vidéo mapping sur façades et structures pour des projections artistiques uniques.",
  },
  {
    id: "service",
    label: "Service",
    icon: Bell,
    description: "Personnel de service expérimenté pour assurer le bon déroulement de votre événement.",
  },
  {
    id: "all-in-one",
    label: "All In One",
    icon: Sparkles,
    description: "Forfait complet tout inclus : son, lumière, décoration, traiteur et personnel — une seule prestation pour un événement clé en main.",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Prestations</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Nos <span className="gold-text">Services</span>
            </h1>
            <p className="text-white/40 text-lg">Tout ce qu&apos;il faut pour un événement d&apos;exception</p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 p-5 bg-ink-card border border-ink-border rounded-2xl hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{service.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
