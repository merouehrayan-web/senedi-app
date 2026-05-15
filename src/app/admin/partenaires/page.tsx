import { prisma } from "@/lib/prisma";
import PartenairesAdmin from "./PartenairesAdmin";

export const dynamic = "force-dynamic";

export default async function PartenairesPage() {
  const partenaires = await prisma.partner.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Ils nous font confiance</h1>
      <PartenairesAdmin partenaires={partenaires} />
    </div>
  );
}
