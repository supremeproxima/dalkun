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
  GMAIL_SMTP_HOST, // If not set, will try smtp.zoho.com and smtppro.zoho.com
  GMAIL_SMTP_PORT = "587",
  GMAIL_SMTP_USER,
  GMAIL_SMTP_PASS,
  FROM_DISPLAY_NAME = "Site Support",
} = process.env;

// For custom domains, always try both smtppro.zoho.com and smtp.zoho.com
// Custom domains (not @zoho.com) often need smtppro.zoho.com
const isCustomDomain = GMAIL_SMTP_USER && !GMAIL_SMTP_USER.endsWith("@zoho.com");
const SMTP_HOSTS = GMAIL_SMTP_HOST 
  ? (isCustomDomain ? ["smtppro.zoho.com", GMAIL_SMTP_HOST, "smtp.zoho.com"] : [GMAIL_SMTP_HOST, "smtppro.zoho.com", "smtp.zoho.com"])
  : (isCustomDomain ? ["smtppro.zoho.com", "smtp.zoho.com"] : ["smtp.zoho.com", "smtppro.zoho.com"]);

if (!GMAIL_SMTP_USER || !GMAIL_SMTP_PASS) {
  // We don't throw here because Next may import this file during build.
  console.warn("GMAIL_SMTP_USER or GMAIL_SMTP_PASS not set in env.");
}

// Create transporter function with specific configuration
function createTransporter(host: string, port: number, secure: boolean) {
  // Ensure username is the full email address (Zoho requirement)
  // Remove any whitespace including newlines
  const username = GMAIL_SMTP_USER?.trim().replace(/\s+/g, '') || "";
  
  // Remove any whitespace, newlines, or quotes from password
  // App passwords are often displayed with spaces (e.g., "abcd efgh ijkl") but must be used without spaces
  let password = GMAIL_SMTP_PASS?.trim() || "";
  // Remove quotes if they wrap the password
  if ((password.startsWith('"') && password.endsWith('"')) || 
      (password.startsWith("'") && password.endsWith("'"))) {
    password = password.slice(1, -1).trim();
  }
  // Remove ALL spaces, newlines, and carriage returns
  // This is critical - app passwords must not have spaces even if displayed with them
  password = password.replace(/\s+/g, ''); // Remove all whitespace including spaces
  
  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: username, // Must be full email address for Zoho (e.g., vsvn@d-alkun.com)
      pass: password,
    },
    tls: {
      rejectUnauthorized: true,
    },
    // Add connection timeout
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

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

    if (!GMAIL_SMTP_USER || !GMAIL_SMTP_PASS) {
      return NextResponse.json({ 
        error: "Mail sender not configured. Please check GMAIL_SMTP_USER and GMAIL_SMTP_PASS environment variables." 
      }, { status: 500 });
    }

    // Verify transporter connection before sending
    // Try different SMTP hosts and ports until one works
    let verified = false;
    let lastError: unknown = null;
    let workingTransporter = null;
    
    // Log configuration (without exposing password)
    // Check for hidden characters in password (show first and last char, mask middle)
    const passPreview = GMAIL_SMTP_PASS 
      ? (GMAIL_SMTP_PASS.length > 2 
          ? `${GMAIL_SMTP_PASS[0]}${'*'.repeat(GMAIL_SMTP_PASS.length - 2)}${GMAIL_SMTP_PASS[GMAIL_SMTP_PASS.length - 1]}`
          : '**')
      : 'not set';
    
    // Calculate cleaned password length (after removing spaces)
    const cleanedPassLength = GMAIL_SMTP_PASS ? GMAIL_SMTP_PASS.replace(/\s+/g, '').length : 0;
    
    console.log("SMTP Config:", {
      hosts: SMTP_HOSTS,
      port: GMAIL_SMTP_PORT,
      user: GMAIL_SMTP_USER,
      userLength: GMAIL_SMTP_USER?.length || 0,
      passLength: GMAIL_SMTP_PASS?.length || 0,
      cleanedPassLength: cleanedPassLength,
      passPreview: passPreview,
      isCustomDomain: isCustomDomain,
      userHasAt: GMAIL_SMTP_USER?.includes('@') || false,
      passHasSpaces: GMAIL_SMTP_PASS?.includes(' ') || false,
      passHasNewlines: GMAIL_SMTP_PASS?.includes('\n') || GMAIL_SMTP_PASS?.includes('\r') || false,
      note: "App passwords are displayed with spaces but must be used without spaces",
    });
    
    // Try each SMTP host with both ports (465 and 587)
    for (const host of SMTP_HOSTS) {
      for (const portConfig of [
        { port: 465, secure: true },
        { port: 587, secure: false },
      ]) {
        try {
          console.log(`Trying ${host}:${portConfig.port} (${portConfig.secure ? 'SSL' : 'TLS'})...`);
          const testTransporter = createTransporter(host, portConfig.port, portConfig.secure);
          await testTransporter.verify();
          verified = true;
          workingTransporter = testTransporter;
          console.log(`✓ SMTP verification successful with ${host}:${portConfig.port}`);
          break;
        } catch (verifyErr: unknown) {
          lastError = verifyErr;
          const error = verifyErr as { code?: string; response?: string; responseCode?: number };
          console.error(`✗ SMTP verification failed with ${host}:${portConfig.port}:`, error.response || error.code);
          // Continue to next configuration
        }
      }
      if (verified) break;
    }
    
    if (!verified) {
      const error = lastError as { code?: string; response?: string; responseCode?: number };
      
      // Provide helpful error messages based on error code
      if (error.code === "EAUTH" || error.responseCode === 535) {
        return NextResponse.json({ 
          error: "SMTP authentication failed (535). Please verify:\n1. GMAIL_SMTP_USER is your full email address (e.g., vsvn@d-alkun.com)\n2. GMAIL_SMTP_PASS is the app password (not your regular password)\n3. The app password was generated correctly from Zoho Account > Security > App Passwords\n4. There are no extra spaces in the environment variables\n5. For custom domains, try setting GMAIL_SMTP_HOST=smtppro.zoho.com" 
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: `SMTP connection failed: ${error.response || String(lastError) || "Unknown error"}. Please check your SMTP settings.` 
      }, { status: 500 });
    }
    
    // Use the working transporter
    const transporter = workingTransporter!;

    // owner email (your Zoho)
    const ownerMail = {
      from: `"${FROM_DISPLAY_NAME}" <${GMAIL_SMTP_USER}>`,
      to: GMAIL_SMTP_USER,
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
    const error = err as { code?: string; response?: string; responseCode?: number; message?: string };
    console.error("Contact API error:", err);
    
    // Provide more specific error messages
    if (error.code === "EAUTH") {
      return NextResponse.json({ 
        error: "Email authentication failed. Please verify your SMTP credentials. If 2FA is enabled, use an app-specific password." 
      }, { status: 500 });
    }
    
    if (error.responseCode === 535) {
      return NextResponse.json({ 
        error: "SMTP authentication failed (535). Please check: 1) Your email and password are correct, 2) If 2FA is enabled, use an app-specific password, 3) Your Zoho account allows SMTP access." 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: `Failed to send email: ${error.message || "Unknown error"}` 
    }, { status: 500 });
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
