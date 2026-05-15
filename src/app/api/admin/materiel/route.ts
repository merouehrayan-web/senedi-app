export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const materiel = await prisma.materiel.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(materiel);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const nom = formData.get("nom") as string;
  const description = formData.get("description") as string;

  if (!file || !nom) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  const blob = await put(`materiel/${Date.now()}-${file.name}`, file, { access: "public" });
  const item = await prisma.materiel.create({ data: { nom, description: description || null, imageUrl: blob.url } });
  return NextResponse.json(item);
}
