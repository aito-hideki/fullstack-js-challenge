import * as sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendMail = (to: string, from: string, subject: string, text: string, html: string) => {
  const mail = { to, from, subject, text, html };
  sgMail.send(mail);
};
