"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Trash2, Plus, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const EVENT_TYPES = [
  { id: "mariage", label: "Mariage" },
  { id: "corporatif", label: "Corporatif" },
  { id: "anniversaire", label: "Anniversaire" },
  { id: "fete-privee", label: "Fête Privée" },
];

type Realisation = {
  id: string;
  titre: string;
  description: string | null;
  imageUrl: string;
  eventType: string;
  createdAt: Date;
};

export default function RealisationsAdmin({ realisations }: { realisations: Realisation[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ titre: "", eventType: "mariage", description: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Sélectionnez une image");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("titre", form.titre);
      fd.append("eventType", form.eventType);
      fd.append("description", form.description);

      const res = await fetch("/api/admin/realisations", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      toast.success("Photo ajoutée !");
      setShowForm(false);
      setFile(null);
      setPreview(null);
      setForm({ titre: "", eventType: "mariage", description: "" });
      router.refresh();
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/realisations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Photo supprimée");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Add button */}
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all mb-6"
      >
        <Plus className="w-4 h-4" />
        Ajouter une photo
      </button>

      {/* Upload form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-ink-card border border-ink-border rounded-2xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Nouvelle réalisation</h2>
              <button onClick={() => { setShowForm(false); setPreview(null); setFile(null); }} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              {/* Image picker */}
              <label className="relative aspect-video rounded-xl border-2 border-dashed border-ink-border hover:border-gold/40 transition-colors cursor-pointer overflow-hidden bg-ink-hover flex items-center justify-center block">
                {preview ? (
                  <Image src={preview} alt="preview" fill className="object-cover" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">Appuyer pour choisir une image</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>

              <div>
                <label className="block text-white/60 text-sm mb-1.5">Titre *</label>
                <input
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  placeholder="Ex: Mariage Dupont — Juin 2024"
                  required
                  className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1.5">Type d&apos;événement *</label>
                <select
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-gold/50"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-1.5">Description (optionnel)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Quelques mots sur cet événement..."
                  rows={2}
                  className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setPreview(null); setFile(null); }} className="flex-1 py-2.5 rounded-xl border border-ink-border text-white/60 hover:text-white transition-colors">
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold py-2.5 rounded-xl disabled:opacity-60"
                >
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                  ) : (
                    <><Upload className="w-4 h-4" /> Publier</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid */}
      {realisations.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Aucune photo ajoutée</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {realisations.map((r) => (
            <div key={r.id} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-ink-border">
              <Image src={r.imageUrl} alt={r.titre} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <button
                  onClick={() => handleDelete(r.id)}
                  disabled={deleting === r.id}
                  className="self-end w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
                <div>
                  <p className="text-white font-medium text-sm">{r.titre}</p>
                  <p className="text-white/60 text-xs capitalize">{r.eventType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
