export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const titre = formData.get("titre") as string;
  const eventType = formData.get("eventType") as string;
  const description = formData.get("description") as string;

  if (!file || !titre || !eventType) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const blob = await put(`realisations/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const realisation = await prisma.realisation.create({
    data: {
      titre,
      eventType,
      description: description || null,
      imageUrl: blob.url,
    },
  });

  return NextResponse.json(realisation);
}
