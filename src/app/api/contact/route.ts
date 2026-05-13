export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SERVICE_LABELS: Record<string, string> = {
  "son-lumiere": "Son & Lumière",
  decoration: "Décoration",
  arches: "Arches de Bienvenue",
  traiteur: "Traiteur",
  mobilier: "Mobilier",
  hotesse: "Hôtesse d'Accueil",
  "feu-artifice": "Feu d'Artifice",
  "piste-danse": "Piste de Danse",
  "laser-show": "Laser Show",
  mapping: "Mapping",
  service: "Service",
};

const EVENT_LABELS: Record<string, string> = {
  mariage: "Mariage",
  corporatif: "Corporatif",
  anniversaire: "Anniversaire",
  "fete-privee": "Fête Privée",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nom, prenom, email, telephone, eventType, services } = body;

    // Save to DB
    await prisma.eventRequest.create({
      data: { nom, prenom, email, telephone, eventType, services },
    });

    const eventLabel = EVENT_LABELS[eventType] ?? eventType;

    // WhatsApp message
    const whatsappMsg = encodeURIComponent(
      `Bonjour SENEDI SM ! 🎉\n\nNouvelle demande d'événement :\n\n` +
      `👤 *${prenom} ${nom}*\n` +
      `📧 ${email}\n` +
      `📞 ${telephone}\n\n` +
      `🎊 *Type :* ${eventLabel}\n\n` +
      `✨ *Services souhaités :*\n${(services as string[]).map((s) => `• ${SERVICE_LABELS[s] ?? s}`).join("\n")}\n\n` +
      `Merci de me recontacter rapidement 🙏`
    );

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
