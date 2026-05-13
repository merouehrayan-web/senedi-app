import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filepath = path.join(process.cwd(), "public", "realisations", filename);

  await writeFile(filepath, buffer);

  const realisation = await prisma.realisation.create({
    data: {
      titre,
      eventType,
      description: description || null,
      imageUrl: `/realisations/${filename}`,
    },
  });

  return NextResponse.json(realisation);
}
