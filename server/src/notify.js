// Notification stub — fires after an appointment request is persisted.
//
// TODO: wire a real notification to the clinic here. Options:
//   1. Nodemailer email to CLINIC_NOTIFY_EMAIL using SMTP_* vars from .env
//      (npm i nodemailer, then transporter.sendMail({ ... })).
//   2. WhatsApp Business API template message to the clinic number.
// Do NOT commit real credentials; read them from process.env only.
export async function notifyClinic(appointment) {
  console.log(
    `[notify] New appointment request #${appointment._id}: ` +
      `${appointment.name} (${appointment.phone}) — ${appointment.consultationType}` +
      (appointment.preferredDate ? ` on ${appointment.preferredDate}` : '')
  );
}
