import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = process.env.EMAIL_VERIFICATION_URL + `?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmation de votre e-mail",
    html: `<p>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre e-mail.</p>`
  })
}