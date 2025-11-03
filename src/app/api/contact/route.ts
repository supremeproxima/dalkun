// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

type RequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const {
  ZOHO_SMTP_HOST = "smtp.zoho.com",
  ZOHO_SMTP_PORT = "465",
  ZOHO_SMTP_USER,
  ZOHO_SMTP_PASS,
  FROM_DISPLAY_NAME = "Site Support",
} = process.env;

if (!ZOHO_SMTP_USER || !ZOHO_SMTP_PASS) {
  // We don't throw here because Next may import this file during build.
  console.warn("ZOHO_SMTP_USER or ZOHO_SMTP_PASS not set in env.");
}

const transporter = nodemailer.createTransport({
  host: ZOHO_SMTP_HOST,
  port: Number(ZOHO_SMTP_PORT || 465),
  secure: Number(ZOHO_SMTP_PORT || 465) === 465, // true for 465, false for 587
  auth: {
    user: ZOHO_SMTP_USER,
    pass: ZOHO_SMTP_PASS,
  },
  // optional: set tls rejectUnauthorized false if you hit certificate issues in some environments
  // tls: { rejectUnauthorized: true }
});

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!ZOHO_SMTP_USER) {
      return NextResponse.json({ error: "Mail sender not configured" }, { status: 500 });
    }

    // owner email (your Zoho)
    const ownerMail = {
      from: `"${FROM_DISPLAY_NAME}" <${ZOHO_SMTP_USER}>`,
      to: ZOHO_SMTP_USER,
      subject: `Contact form: ${name} <${email}>`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong></p><div>${escapeHtml(message).replace(/\n/g, "<br/>")}</div>`,
    };

    // thank-you mail to user
    const userMail = {
      from: ownerMail.from,
      to: email,
      subject: `Thanks for contacting ${FROM_DISPLAY_NAME}`,
      text: `Hi ${name},\n\nThanks for contacting us. We received your message and will get back to you soon.\n\nRegards,\n${FROM_DISPLAY_NAME}`,
      html: `<p>Hi ${name},</p>
             <p>Thanks for contacting us. We received your message and will get back to you soon.</p>
             <p>Regards,<br/>${FROM_DISPLAY_NAME}</p>`,
    };

    // send both mails in parallel
    await Promise.all([transporter.sendMail(ownerMail), transporter.sendMail(userMail)]);

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

/** simple HTML-escape to avoid injection in generated HTML */
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
