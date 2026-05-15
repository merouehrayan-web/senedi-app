export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const partenaires = await prisma.partner.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(partenaires);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const nom = formData.get("nom") as string;

  if (!file || !nom) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  const blob = await put(`partenaires/${Date.now()}-${file.name}`, file, { access: "public" });
  const partner = await prisma.partner.create({ data: { nom, logoUrl: blob.url } });
  return NextResponse.json(partner);
}
