import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SENEDI SM — Agence Événementielle",
  description:
    "Préparez votre événement en toute sérénité. Mariage, corporatif, anniversaire, fête privée. Son & Lumière, Décoration, Traiteur et bien plus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #D4AF37",
            },
          }}
        />
      </body>
    </html>
  );
}
