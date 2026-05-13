"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { InboxIcon, ImageIcon, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin/demandes", label: "Demandes", icon: InboxIcon },
  { href: "/admin/realisations", label: "Réalisations", icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-ink-card border-r border-ink-border flex flex-col z-40">
      <div className="p-5 border-b border-ink-border">
        <Image src="/logo.png" alt="SENEDI SM" width={120} height={40} className="h-8 w-auto object-contain" />
        <p className="text-white/30 text-xs mt-1 tracking-wider">ADMIN</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-white/50 hover:text-white hover:bg-ink-hover"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-ink-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
