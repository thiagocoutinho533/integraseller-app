import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // ex: "smtp.gmail.com"
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,                    // tls STARTTLS no 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// helper
export async function sendResetCode(toEmail, code) {
  const info = await mailer.sendMail({
    from: `"IntegraSeller" <${process.env.SMTP_FROM}>`,
    to: toEmail,
    subject: "Recuperação de senha - IntegraSeller",
    text: `Seu código de verificação é: ${code}`,
    html: `
      <p>Você solicitou recuperar sua senha.</p>
      <p>Seu código de verificação é: <b>${code}</b></p>
      <p>Ele expira em 10 minutos.</p>
    `,
  });

  console.log("E-mail enviado:", info.messageId);
}
