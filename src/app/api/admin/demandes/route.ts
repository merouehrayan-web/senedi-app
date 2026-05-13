import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const demandes = await prisma.eventRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(demandes);
}
