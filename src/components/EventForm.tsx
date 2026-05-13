"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, ChevronRight, ChevronLeft, Check,
  Heart, Briefcase, Gift, PartyPopper,
  Volume2, Sparkles, Landmark, UtensilsCrossed,
  Armchair, UserCheck, Flame, Music2, Zap, MonitorPlay, Bell,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  nom: z.string().min(2, "Nom requis (min 2 caractères)"),
  prenom: z.string().min(2, "Prénom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone requis"),
  eventType: z.string().min(1, "Sélectionnez un type d'événement"),
  services: z.array(z.string()).min(1, "Sélectionnez au moins un service"),
});

type FormData = z.infer<typeof formSchema>;

const EVENT_TYPES = [
  { id: "mariage", label: "Mariage", icon: Heart, desc: "Le plus beau jour de votre vie", color: "from-rose-900/30 to-rose-800/10 border-rose-800/40 hover:border-rose-500/60" },
  { id: "corporatif", label: "Corporatif", icon: Briefcase, desc: "Séminaires & galas d'entreprise", color: "from-blue-900/30 to-blue-800/10 border-blue-800/40 hover:border-blue-500/60" },
  { id: "anniversaire", label: "Anniversaire", icon: Gift, desc: "Célébrez en grand style", color: "from-purple-900/30 to-purple-800/10 border-purple-800/40 hover:border-purple-500/60" },
  { id: "fete-privee", label: "Fête Privée", icon: PartyPopper, desc: "Soirées exclusives & privées", color: "from-amber-900/30 to-amber-800/10 border-amber-800/40 hover:border-amber-500/60" },
];

const SERVICES = [
  { id: "son-lumiere", label: "Son & Lumière", icon: Volume2 },
  { id: "decoration", label: "Décoration", icon: Sparkles },
  { id: "arches", label: "Arches de Bienvenue", icon: Landmark },
  { id: "traiteur", label: "Traiteur", icon: UtensilsCrossed },
  { id: "mobilier", label: "Mobilier", icon: Armchair },
  { id: "hotesse", label: "Hôtesse d'Accueil", icon: UserCheck },
  { id: "feu-artifice", label: "Feu d'Artifice", icon: Flame },
  { id: "piste-danse", label: "Piste de Danse", icon: Music2 },
  { id: "laser-show", label: "Laser Show", icon: Zap },
  { id: "mapping", label: "Mapping", icon: MonitorPlay },
  { id: "service", label: "Service", icon: Bell },
];

const STEPS = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Événement" },
  { id: 3, label: "Services" },
  { id: 4, label: "Récapitulatif" },
];

export default function EventForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { services: [], eventType: "" },
  });

  const values = watch();
  const selectedServices = values.services || [];

  const toggleService = (id: string) => {
    const current = selectedServices;
    setValue(
      "services",
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id],
      { shouldValidate: true }
    );
  };

  const nextStep = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["nom", "prenom", "email", "telephone"]);
    if (step === 2) valid = await trigger(["eventType"]);
    if (step === 3) valid = await trigger(["services"]);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      setSubmitted(true);
      toast.success("Demande envoyée !");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceLabel = (id: string) =>
    SERVICES.find((s) => s.id === id)?.label ?? id;

  const getEventLabel = (id: string) =>
    EVENT_TYPES.find((e) => e.id === id)?.label ?? id;

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Demande envoyée !
          </h2>
          <p className="text-white/50 mb-6">
            L&apos;équipe SENEDI SM vous recontacte très prochainement.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Planifiez votre{" "}
            <span className="gold-text">événement</span>
          </h1>
          <p className="text-white/40">Quelques minutes suffisent pour lancer votre projet</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step > s.id
                      ? "bg-gold text-ink"
                      : step === s.id
                      ? "bg-gold/20 text-gold border-2 border-gold"
                      : "bg-ink-hover text-white/30 border border-ink-border"
                  }`}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    step >= s.id ? "text-gold" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-px mx-2 mb-4 transition-all duration-500 ${
                    step > s.id
                      ? "bg-gradient-to-r from-gold to-gold-dark"
                      : "bg-ink-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-ink-card rounded-3xl border border-ink-border overflow-hidden shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* Step 1 — Contact */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Vos coordonnées</h2>
                      <p className="text-white/40 text-sm">Pour vous recontacter</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Prénom *</label>
                      <input
                        {...register("prenom")}
                        placeholder="Votre prénom"
                        className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.prenom && (
                        <p className="text-red-400 text-xs mt-1">{errors.prenom.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">Nom *</label>
                      <input
                        {...register("nom")}
                        placeholder="Votre nom"
                        className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.nom && (
                        <p className="text-red-400 text-xs mt-1">{errors.nom.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">
                        <Mail className="w-3.5 h-3.5 inline mr-1" />
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1.5">
                        <Phone className="w-3.5 h-3.5 inline mr-1" />
                        Téléphone *
                      </label>
                      <input
                        {...register("telephone")}
                        type="tel"
                        placeholder="+33 6 00 00 00 00"
                        className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                      {errors.telephone && (
                        <p className="text-red-400 text-xs mt-1">{errors.telephone.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — Event Type */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <PartyPopper className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Type d&apos;événement</h2>
                      <p className="text-white/40 text-sm">Sélectionnez une option</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EVENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = values.eventType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setValue("eventType", type.id, { shouldValidate: true })}
                          className={`relative flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-br transition-all duration-200 text-left ${
                            isSelected
                              ? "border-gold/60 bg-gold/5 shadow-md shadow-gold/10"
                              : `${type.color} border-ink-border`
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-gold/20" : "bg-white/5"}`}>
                            <Icon className={`w-5 h-5 ${isSelected ? "text-gold" : "text-white/60"}`} />
                          </div>
                          <div>
                            <span className={`font-semibold block ${isSelected ? "text-gold" : "text-white"}`}>
                              {type.label}
                            </span>
                            <span className="text-white/40 text-xs">{type.desc}</span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                              <Check className="w-3 h-3 text-ink" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.eventType && (
                    <p className="text-red-400 text-xs mt-3">{errors.eventType.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 3 — Services */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Vos besoins</h2>
                      <p className="text-white/40 text-sm">Sélectionnez un ou plusieurs services</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SERVICES.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                            isSelected
                              ? "border-gold/60 bg-gold/10 shadow-md shadow-gold/10"
                              : "border-ink-border bg-ink-hover hover:border-ink-muted"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-gold/20" : "bg-white/5"}`}>
                            <Icon className={`w-5 h-5 ${isSelected ? "text-gold" : "text-white/50"}`} />
                          </div>
                          <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-gold" : "text-white/60"}`}>
                            {service.label}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-ink" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedServices.length > 0 && (
                    <p className="text-gold/70 text-xs mt-3">
                      {selectedServices.length} service{selectedServices.length > 1 ? "s" : ""} sélectionné{selectedServices.length > 1 ? "s" : ""}
                    </p>
                  )}
                  {errors.services && (
                    <p className="text-red-400 text-xs mt-1">{errors.services.message}</p>
                  )}
                </motion.div>
              )}

              {/* Step 4 — Recap */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Check className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Récapitulatif</h2>
                      <p className="text-white/40 text-sm">Vérifiez avant d&apos;envoyer</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Contact */}
                    <div className="p-4 bg-ink-hover rounded-2xl border border-ink-border">
                      <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">Contact</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-white/40 text-xs">Nom</span>
                          <p className="text-white font-medium">{values.prenom} {values.nom}</p>
                        </div>
                        <div>
                          <span className="text-white/40 text-xs">Téléphone</span>
                          <p className="text-white font-medium">{values.telephone}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-white/40 text-xs">Email</span>
                          <p className="text-white font-medium">{values.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Event Type */}
                    <div className="p-4 bg-ink-hover rounded-2xl border border-ink-border">
                      <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">Type d&apos;événement</h3>
                      <p className="text-white font-medium">{getEventLabel(values.eventType)}</p>
                    </div>

                    {/* Services */}
                    <div className="p-4 bg-ink-hover rounded-2xl border border-ink-border">
                      <h3 className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
                        Services ({selectedServices.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((id) => (
                          <span
                            key={id}
                            className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs font-medium"
                          >
                            {getServiceLabel(id)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Send info */}
                    <div className="flex items-center gap-3 p-3 bg-gold/5 border border-gold/20 rounded-xl">
                      <Send className="w-4 h-4 text-gold flex-shrink-0" />
                      <p className="text-white/60 text-xs">
                        Votre demande sera enregistrée et l&apos;équipe{" "}
                        <span className="text-gold">SENEDI SM</span> vous recontactera rapidement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-ink-hover"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  Continuer
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Valider & Envoyer
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
