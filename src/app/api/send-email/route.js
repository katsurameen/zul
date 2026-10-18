function getSecretKey() {
  return (
    process.env.RECAPTCHA_SECRET_KEY ||
    process.env.SECRET_KEY ||
    process.env.RECAPTCHA_SECRET
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Field limits keep a hostile client from sending megabytes downstream.
const LIMITS = { name: 100, email: 200, message: 5000 };

// Best-effort in-memory rate limit. On a single instance this stops casual
// form spam; behind multiple serverless instances use a shared store instead.
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now - entry.start > RATE_LIMIT.windowMs) {
    hits.set(key, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (now - v.start > RATE_LIMIT.windowMs) hits.delete(k);
    }
  }
  return entry.count > RATE_LIMIT.max;
}

function clientIp(req) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Escape values that end up inside the notification email's HTML body.
function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]
  );
}

// Strip CR/LF so a crafted name cannot inject extra mail headers.
function stripNewlines(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

async function verifyRecaptcha(token) {
  const secret = getSecretKey();
  if (!secret) {
    throw new Error("reCAPTCHA secret key is not configured.");
  }
  if (!token) {
    throw new Error("reCAPTCHA token is missing.");
  }

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error("Failed to verify reCAPTCHA.");
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(
      `reCAPTCHA verification failed: ${(data["error-codes"] || []).join(", ") || "unknown error"}`
    );
  }
  return data;
}

async function sendWithBrevo({ name, email, message }) {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "Portfolio Contact Form";
  const recipient =
    process.env.BREVO_RECIPIENT?.trim() ||
    process.env.SMTPXPRESS_RECIPIENT?.trim();

  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");
  if (!senderEmail) {
    throw new Error(
      "BREVO_SENDER_EMAIL is not configured. Set it to a verified sender in Brevo."
    );
  }
  if (!recipient) throw new Error("Recipient email is not configured.");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: recipient }],
      replyTo: { email, name },
      subject: `New Message from ${stripNewlines(name)}`,
      textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      htmlContent: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong></p><p>${safeMessage}</p>`,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Brevo error (${res.status}): ${errText}`);
  }
  return res.json();
}

export async function POST(req) {
  try {
    if (isRateLimited(clientIp(req))) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again in a minute.",
        }),
        { status: 429 }
      );
    }

    const { name, email, message, captchaToken } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Name, email, and message are required." }),
        { status: 400 }
      );
    }

    if (
      String(name).length > LIMITS.name ||
      String(email).length > LIMITS.email ||
      String(message).length > LIMITS.message
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Submitted content is too long." }),
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(String(email).trim())) {
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address." }),
        { status: 400 }
      );
    }

    await verifyRecaptcha(captchaToken);

    const response = await sendWithBrevo({
      name: stripNewlines(name),
      email: String(email).trim(),
      message: String(message),
    });

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
    });
  } catch (error) {
    console.error("Send email error:", error);
    const status = error.message?.includes("reCAPTCHA") ? 400 : 500;
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status,
    });
  }
}
