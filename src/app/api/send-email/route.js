import { createClient } from "smtpexpress";

const smtpexpressClient = createClient({
  projectId: process.env.SMTPXPRESS_PROJECT_ID,
  projectSecret: process.env.SMTPXPRESS_PROJECT_SECRET,
});

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const response = await smtpexpressClient.sendApi.sendMail({
      subject: `New Message from ${name}`,
      message: `Email: ${email}\n\nMessage:\n${message}`,
      sender: {
        name: name,
        email: "smtp-personal-61a181@smtpexpress.email",
      },
      recipients: process.env.SMTPXPRESS_RECIPIENT,
    });

    return new Response(JSON.stringify({ success: true, response }), {
      status: 200,
    });
  } catch (error) {
    console.error("SMTPExpress Error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
