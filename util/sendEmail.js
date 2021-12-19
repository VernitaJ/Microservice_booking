import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async (
  recipientName,
  recipientEmail,
  subject,
  message,
  messageHTML
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_SMTP_USERNAME,
        pass: process.env.MAILER_SMTP_PASSWORD,
      }
    });

    let info = await transporter.sendMail({
      from: `"Dentistimo" <${process.env.MAILER_USERNAME}>`,
      to: `${recipientName}, ${recipientEmail}`,
      subject: subject,
      text: message,
      html: messageHTML,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log("Email error: ", err);
  }
};
