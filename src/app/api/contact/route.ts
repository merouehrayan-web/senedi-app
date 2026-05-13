export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const serviceList = (services as string[])
      .map((s) => SERVICE_LABELS[s] ?? s)
      .join(", ");

    const eventLabel = EVENT_LABELS[eventType] ?? eventType;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #D4AF37; font-size: 28px; letter-spacing: 4px; margin: 0;">SENEDI SM</h1>
          <p style="color: #666; margin: 4px 0 0;">Nouvelle demande d'événement</p>
        </div>

        <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <h3 style="color: #D4AF37; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Contact</h3>
          <p style="margin: 4px 0; color: #fff;"><strong style="color: #aaa;">Nom :</strong> ${prenom} ${nom}</p>
          <p style="margin: 4px 0; color: #fff;"><strong style="color: #aaa;">Email :</strong> ${email}</p>
          <p style="margin: 4px 0; color: #fff;"><strong style="color: #aaa;">Téléphone :</strong> ${telephone}</p>
        </div>

        <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <h3 style="color: #D4AF37; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Événement</h3>
          <p style="margin: 0; color: #fff; font-size: 18px; font-weight: bold;">${eventLabel}</p>
        </div>

        <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px;">
          <h3 style="color: #D4AF37; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Services demandés</h3>
          <p style="margin: 0; color: #fff;">${serviceList}</p>
        </div>

        <p style="color: #555; font-size: 12px; text-align: center; margin-top: 24px;">
          Reçu le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? "SENEDI SM <noreply@senedi-sm.com>",
      to: process.env.CONTACT_EMAIL,
      subject: `🎉 Nouvelle demande — ${eventLabel} | ${prenom} ${nom}`,
      html: htmlBody,
    });

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
