function getSecretKey() {
  return (
    process.env.RECAPTCHA_SECRET_KEY ||
    process.env.SECRET_KEY ||
    process.env.RECAPTCHA_SECRET
  );
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
      subject: `New Message from ${name}`,
      textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      htmlContent: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
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
    const { name, email, message, captchaToken } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Name, email, and message are required." }),
        { status: 400 }
      );
    }

    await verifyRecaptcha(captchaToken);

    const response = await sendWithBrevo({ name, email, message });

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
