import { prisma } from "@/lib/prisma";
import DemandesClient from "./DemandesClient";

export const dynamic = "force-dynamic";

export default async function DemandesPage() {
  const demandes = await prisma.eventRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Demandes</h1>
        <p className="text-white/40 text-sm mt-1">{demandes.length} demande{demandes.length > 1 ? "s" : ""} reçue{demandes.length > 1 ? "s" : ""}</p>
      </div>
      <DemandesClient demandes={demandes} />
    </div>
  );
}
