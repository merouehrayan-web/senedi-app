export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const realisations = await prisma.realisation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(realisations);
}
