export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const partenaires = await prisma.partner.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(partenaires);
}
