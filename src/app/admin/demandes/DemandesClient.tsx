"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const EVENT_LABELS: Record<string, string> = {
  mariage: "Mariage",
  corporatif: "Corporatif",
  anniversaire: "Anniversaire",
  "fete-privee": "Fête Privée",
};

const SERVICE_LABELS: Record<string, string> = {
  "son-lumiere": "Son & Lumière",
  decoration: "Décoration",
  arches: "Arches",
  traiteur: "Traiteur",
  mobilier: "Mobilier",
  hotesse: "Hôtesse",
  "feu-artifice": "Feu d'Artifice",
  "piste-danse": "Piste de Danse",
  "laser-show": "Laser Show",
  mapping: "Mapping",
  service: "Service",
};

type Demande = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  eventType: string;
  services: string[];
  status: string;
  createdAt: Date;
};

export default function DemandesClient({ demandes }: { demandes: Demande[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const markHandled = async (id: string) => {
    setLoading(id);
    try {
      const res = await fetch(`/api/admin/demandes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "handled" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Marqué comme traité");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(null);
    }
  };

  if (demandes.length === 0) {
    return (
      <div className="text-center py-20 text-white/30">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p>Aucune demande pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {demandes.map((d) => (
        <div key={d.id} className={`bg-ink-card border rounded-2xl overflow-hidden transition-all ${d.status === "handled" ? "border-ink-border opacity-60" : "border-gold/20"}`}>
          {/* Header row */}
          <div className="flex items-center gap-4 p-4">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.status === "handled" ? "bg-green-500" : "bg-gold animate-pulse"}`} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-semibold">{d.prenom} {d.nom}</span>
                <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
                  {EVENT_LABELS[d.eventType] ?? d.eventType}
                </span>
                {d.status === "handled" && (
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                    Traité
                  </span>
                )}
              </div>
              <p className="text-white/40 text-xs mt-0.5">
                {new Date(d.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {d.status !== "handled" && (
                <button
                  onClick={() => markHandled(d.id)}
                  disabled={loading === d.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-all disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  {loading === d.id ? "..." : "Traité"}
                </button>
              )}
              <button
                onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                className="p-1.5 text-white/40 hover:text-white transition-colors"
              >
                {expanded === d.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expanded details */}
          {expanded === d.id && (
            <div className="px-4 pb-4 border-t border-ink-border pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <a href={`mailto:${d.email}`} className="flex items-center gap-2 text-white/60 hover:text-gold text-sm transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {d.email}
                </a>
                <a href={`tel:${d.telephone}`} className="flex items-center gap-2 text-white/60 hover:text-gold text-sm transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  {d.telephone}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-2 uppercase tracking-wider">Services</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.services.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-ink-hover border border-ink-border text-white/70 text-xs rounded-full">
                      {SERVICE_LABELS[s] ?? s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
