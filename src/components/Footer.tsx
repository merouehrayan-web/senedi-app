import { Mail, Phone, Share2 } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink-card mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Image src="/logo.png" alt="SENEDI SM" width={120} height={40} className="h-9 w-auto object-contain" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Agence événementielle spécialisée dans l&apos;organisation
              d&apos;événements haut de gamme. Mariages, galas, soirées
              d&apos;entreprise.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@senedi-sm.com"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                contact@senedi-sm.com
              </a>
              <a
                href="tel:+33600000000"
                className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +33 6 00 00 00 00
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-ink-hover border border-ink-border flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-ink-hover border border-ink-border flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ink-border pt-6 text-center">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} SENEDI SM — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
