export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const materiel = await prisma.materiel.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(materiel);
}
