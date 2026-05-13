export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const realisation = await prisma.realisation.findUnique({ where: { id: params.id } });
  if (!realisation) return NextResponse.json({ error: "Introuvable" }, { status: 404 });

  // Delete file
  try {
    const filepath = path.join(process.cwd(), "public", realisation.imageUrl);
    await unlink(filepath);
  } catch {
    // file may already be missing
  }

  await prisma.realisation.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
