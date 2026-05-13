export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const updated = await prisma.eventRequest.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json(updated);
}
