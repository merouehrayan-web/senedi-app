import { prisma } from "@/lib/prisma";
import MaterielAdmin from "./MaterielAdmin";

export const dynamic = "force-dynamic";

export default async function MaterielPage() {
  const items = await prisma.materiel.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Notre Matériel</h1>
      <MaterielAdmin items={items} />
    </div>
  );
}
