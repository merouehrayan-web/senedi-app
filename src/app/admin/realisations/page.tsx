import { prisma } from "@/lib/prisma";
import RealisationsAdmin from "./RealisationsAdmin";

export const dynamic = "force-dynamic";

export default async function RealisationsPage() {
  const realisations = await prisma.realisation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Réalisations</h1>
        <p className="text-white/40 text-sm mt-1">{realisations.length} photo{realisations.length > 1 ? "s" : ""}</p>
      </div>
      <RealisationsAdmin realisations={realisations} />
    </div>
  );
}
