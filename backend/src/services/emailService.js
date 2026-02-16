// Mock mailer service. In production, replace with SES/SendGrid/Mailgun integration.
export const sendEmailNotification = async ({ to, subject, text }) => {
  console.log(`📧 Email queued to ${to}\nSubject: ${subject}\n${text}`);
};
