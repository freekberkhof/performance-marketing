import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/metadata";

// Demo-aanvragen voor Perform+. We slaan niets op: de aanvraag gaat
// alleen per mail naar de praktijk. Een fout geeft een foutstatus terug, zodat
// de bezoeker nooit "verzonden" ziet terwijl de mail niet is aangekomen.

type DemoRequest = {
  name: string;
  practice: string;
  email: string;
  phone: string | null;
  message: string | null;
  pagePath: string | null;
};

type FieldErrors = Partial<Record<keyof DemoRequest, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const text = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function parseDemoRequest(
  body: unknown
): { data: DemoRequest } | { errors: FieldErrors } {
  const input = (body ?? {}) as Record<string, unknown>;
  const data: DemoRequest = {
    name: text(input.name, 120),
    practice: text(input.practice, 160),
    email: text(input.email, 200),
    phone: text(input.phone, 40) || null,
    message: text(input.message, 4000) || null,
    pagePath: text(input.page_path, 200) || null,
  };

  const errors: FieldErrors = {};
  if (!data.name) errors.name = "Vul je naam in.";
  if (!data.practice) errors.practice = "Vul de naam van je praktijk in.";
  if (!EMAIL_PATTERN.test(data.email))
    errors.email = "Vul een geldig e-mailadres in.";

  return Object.keys(errors).length > 0 ? { errors } : { data };
}

const errorResponse = (
  status: number,
  message: string,
  extra: Record<string, unknown> = {}
) => NextResponse.json({ message, ...extra }, { status });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse(400, "Ongeldig verzoek.");
  }

  // Honeypot: een verborgen veld dat alleen bots invullen. Doe alsof het lukte.
  if (text((body as Record<string, unknown>)?.website, 200)) {
    return NextResponse.json({ message: "Je aanvraag is verstuurd." });
  }

  const parsed = parseDemoRequest(body);
  if ("errors" in parsed) {
    return errorResponse(400, "Controleer de velden van het formulier.", {
      errors: parsed.errors,
    });
  }
  const lead = parsed.data;

  const smtpHost = process.env.SMTP_HOST || "mail.mijndomein.nl";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER of SMTP_PASSWORD ontbreekt.");
    return errorResponse(500, "Je aanvraag kon niet worden verstuurd.");
  }

  const mailRecipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL || smtpUser;
  const mailSenderEmail = process.env.SMTP_SENDER_EMAIL || smtpUser;
  const mailSenderName = process.env.SMTP_SENDER_NAME || siteConfig.name;

  const safe = {
    name: escapeHtml(lead.name),
    practice: escapeHtml(lead.practice),
    email: escapeHtml(lead.email),
    phone: escapeHtml(lead.phone ?? "Niet opgegeven"),
    message: escapeHtml(lead.message ?? "Geen bericht"),
    page: escapeHtml(lead.pagePath ?? "onbekend"),
  };

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"${mailSenderName}" <${mailSenderEmail}>`,
      to: mailRecipient,
      replyTo: lead.email,
      subject: `Demo-aanvraag ${lead.practice}: ${lead.name}`,
      html: `
        <p>Nieuwe demo-aanvraag voor ${escapeHtml(siteConfig.name)}:</p>
        <hr>
        <p><strong>Naam:</strong> ${safe.name}</p>
        <p><strong>Praktijk:</strong> ${safe.practice}</p>
        <p><strong>E-mail:</strong> ${safe.email}</p>
        <p><strong>Telefoon:</strong> ${safe.phone}</p>
        <hr>
        <p><strong>Bericht:</strong></p>
        <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: sans-serif; font-size: 14px;">${safe.message}</pre>
        <hr>
        <p><small>Verzonden vanaf ${safe.page}.</small></p>
      `,
      text: [
        `Nieuwe demo-aanvraag voor ${siteConfig.name}:`,
        `Naam: ${lead.name}`,
        `Praktijk: ${lead.practice}`,
        `E-mail: ${lead.email}`,
        `Telefoon: ${lead.phone ?? "Niet opgegeven"}`,
        "",
        "Bericht:",
        lead.message ?? "Geen bericht",
        "",
        `Verzonden vanaf ${lead.pagePath ?? "onbekend"}.`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Demo-aanvraag versturen mislukt:", error);
    return errorResponse(502, "Je aanvraag kon niet worden verstuurd.");
  }

  // Bevestiging naar de aanvrager. Mag mislukken zonder de aanvraag te raken.
  try {
    await transporter.sendMail({
      from: `"${siteConfig.name}" <${mailSenderEmail}>`,
      to: lead.email,
      replyTo: mailRecipient,
      subject: "We hebben je demo-aanvraag ontvangen",
      text: [
        `Hoi ${lead.name},`,
        "",
        `Bedankt voor je aanvraag. We nemen binnen twee werkdagen contact met je op om een demo van ${siteConfig.name} in te plannen. In een half uur laten we zien hoe je een traject opbouwt en welke gegevens je na elke sessie terugkrijgt.`,
        "",
        "Heb je een vraag? Beantwoord dan deze mail.",
        "",
        "Met vriendelijke groet,",
        `Team ${siteConfig.name}`,
      ].join("\n"),
      html: `
        <p>Hoi ${safe.name},</p>
        <p>Bedankt voor je aanvraag. We nemen binnen twee werkdagen contact met je op om een demo van ${escapeHtml(siteConfig.name)} in te plannen. In een half uur laten we zien hoe je een traject opbouwt en welke gegevens je na elke sessie terugkrijgt.</p>
        <p>Heb je een vraag? Beantwoord dan deze mail.</p>
        <p>Met vriendelijke groet,<br>Team ${escapeHtml(siteConfig.name)}</p>
      `,
    });
  } catch (error) {
    console.error("Bevestigingsmail mislukt:", error);
  }

  return NextResponse.json({ message: "Je aanvraag is verstuurd." });
}
