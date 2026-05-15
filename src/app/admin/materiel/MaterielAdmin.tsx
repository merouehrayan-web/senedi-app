"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

type MaterielItem = { id: string; nom: string; description: string | null; imageUrl: string };

export default function MaterielAdmin({ items }: { items: MaterielItem[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ nom: "", description: "" });
  const [file, setFile] = useState<File | null>(null);

  const compressImage = (f: File): Promise<File> =>
    new Promise((resolve) => {
      const img = document.createElement("img");
      const url = URL.createObjectURL(f);
      img.onload = () => {
        try {
          const MAX = 1280;
          let { width, height } = img;
          if (width > MAX || height > MAX) {
            if (width > height) { height = Math.round((height / width) * MAX); width = MAX; }
            else { width = Math.round((width / height) * MAX); height = MAX; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) { URL.revokeObjectURL(url); resolve(f); return; }
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);
          canvas.toBlob((blob) => {
            if (!blob) { resolve(f); return; }
            resolve(new File([blob], f.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
          }, "image/jpeg", 0.75);
        } catch { URL.revokeObjectURL(url); resolve(f); }
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(f); };
      img.src = url;
    });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Sélectionnez une image");
    setUploading(true);
    try {
      const compressed = await compressImage(file);
      if (compressed.size > 4 * 1024 * 1024) { toast.error("Photo trop lourde (max 4MB)"); setUploading(false); return; }
      const fd = new FormData();
      fd.append("file", compressed);
      fd.append("nom", form.nom);
      fd.append("description", form.description);
      const res = await fetch("/api/admin/materiel", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      toast.success("Matériel ajouté !");
      setShowForm(false); setFile(null); setPreview(null); setForm({ nom: "", description: "" });
      router.refresh();
    } catch { toast.error("Erreur lors de l'upload"); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/materiel/${id}`, { method: "DELETE" });
      toast.success("Supprimé");
      router.refresh();
    } catch { toast.error("Erreur"); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold px-5 py-2.5 rounded-xl mb-6">
        <Plus className="w-4 h-4" /> Ajouter du matériel
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-ink-card border border-ink-border rounded-t-2xl sm:rounded-2xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] pb-24 sm:pb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg">Nouveau matériel</h2>
              <button onClick={() => { setShowForm(false); setPreview(null); setFile(null); }} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <label className="relative aspect-video rounded-xl border-2 border-dashed border-ink-border hover:border-gold/40 cursor-pointer overflow-hidden bg-ink-hover flex items-center justify-center block">
                {preview ? <Image src={preview} alt="preview" fill className="object-cover" /> : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    <p className="text-white/40 text-sm">Appuyer pour choisir une image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; setFile(f); setPreview(URL.createObjectURL(f)); }} className="hidden" />
              </label>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">Nom du matériel *</label>
                <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Sono Pioneer 2000W" required className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/50" />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1.5">Description (optionnel)</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Caractéristiques, puissance..." rows={2} className="w-full bg-ink-hover border border-ink-border rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setPreview(null); setFile(null); }} className="flex-1 py-2.5 rounded-xl border border-ink-border text-white/60">Annuler</button>
                <button type="submit" disabled={uploading} className="flex-1 bg-gradient-to-r from-gold to-gold-dark text-ink font-bold py-2.5 rounded-xl disabled:opacity-60">
                  {uploading ? "..." : "Publier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>Aucun matériel ajouté</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-ink-card border border-ink-border rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={item.imageUrl} alt={item.nom} fill className="object-cover" />
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium">{item.nom}</p>
                {item.description && <p className="text-white/40 text-xs mt-0.5 line-clamp-2">{item.description}</p>}
              </div>
              <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id} className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
