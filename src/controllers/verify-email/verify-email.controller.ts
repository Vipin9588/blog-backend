

import nodemailer from "nodemailer";
import { env } from "#/config/env.js";
import { generateVerificationEmail } from "#/helpers/Email/Email-verify.helper.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE === "true",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const { subject, html, text } = generateVerificationEmail(
  "",
  "https://myapp.com/verify?token=abc123",
  { logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVexxzbg3jvRGCioSPljjTfsjn7CWC45h3L40QZwXjQ&s=10" }
);

async function verifyEmailSent() {
  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: `"FlowFLow Team" <${env.EMAIL_USER}>`,
      to: "vk3440351@gmail.com",
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);

  } catch (error) {
    console.error("Email sending failed:", error);
  } finally {
    transporter.close();
  }
}

verifyEmailSent();

