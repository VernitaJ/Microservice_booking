import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async (
  from,
  recipientName,
  recipientEmail,
  subject,
  message,
  messageHTML
) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAILER_SERVER,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `"Dentistimo" <${from}>`,
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
