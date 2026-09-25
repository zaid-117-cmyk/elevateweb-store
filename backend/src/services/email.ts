import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendDownloadEmail = async (toEmail: string, productName: string, downloadUrl: string) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: `"ElevateWeb" <${process.env.FROM_EMAIL || "hello@elevateweb.me"}>`,
    to: toEmail,
    subject: `⚡ Your Download is Ready: ${productName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #1e293b;">
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin-bottom: 12px; text-align: center;">ElevateWeb</h1>
        <div style="background-color: #1e293b; padding: 24px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #38bdf8; font-size: 18px; margin-top: 0;">Payment Successful! 🎉</h2>
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">Thank you for your purchase. Your digital product <strong>${productName}</strong> is ready for instant download.</p>
          <div style="text-align: center; margin: 28px 0;">
            <a href="${downloadUrl}" style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);">Download Product</a>
          </div>
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 0;">⏱️ For your security, this download link will remain active for <strong>24 hours</strong>.</p>
        </div>
        <p style="font-size: 12px; color: #64748b; text-align: center; margin-top: 24px;">Need help with your download? Reply directly to this email at <a href="mailto:hello@elevateweb.me" style="color: #38bdf8;">hello@elevateweb.me</a></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
