

import nodemailer from "nodemailer";
import { env } from "#/config/env.js";
import { generateVerificationEmail } from "#/helpers/Email/Email-verify.helper.js";
import { Request, Response } from "express";
import { verifyEmail } from "#/models/email/email-verify.model.js";
import { generateOTP } from "#/helpers/Email/otp-generate.js";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_SECURE === "true",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

async function verifyEmailSent(touserEmail: string,userId:number) {
  const OTP = await generateOTP(userId, 6); // Generate a 6-digit OTP
  const { subject, html, text } = generateVerificationEmail(
    OTP,
    `http://localhost:${env.PORT}/api/user/sent/email/verify?token=${OTP}`,
    { logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVexxzbg3jvRGCioSPljjTfsjn7CWC45h3L40QZwXjQ&s=10" }
  );

  try {
    await transporter.verify();
    const info = await transporter.sendMail({
      from: `"FlowFLow Team" <${env.EMAIL_USER}>`,
      to: touserEmail,
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

const verifyEmailSentController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email ,userId} = req.body;
         console.log("Request Body:",req.body);
        await verifyEmailSent(email,userId);

        return res.status(200).json({
            message: "Verification email sent successfully"
        });

    } catch (error) {

        console.error("Email sending failed:", error);

        return res.status(500).json({
            error: "Failed to send verification email"
        });
    }
};


const verifyEmailController = async (req: Request, res: Response) => {
  const token = req.query.token;
  const user = req.query.user;

  console.log("Token received:", token);
  if (!token) {
    res.status(400).json({
      error: "Token is required"
    });
  }

  await verifyEmail(Number(user));
  res.status(200).json({
    message: "Email verified successfully"
  });
}

export { verifyEmailSentController };
export { verifyEmailController };
