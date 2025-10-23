const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, html, templateId, dynamicTemplateData, from = process.env.SENDGRID_FROM || "no-reply@tusitio.com" }) {
  try {
    const msg = { to, from };
    if (templateId) {
      msg.templateId = templateId;
      if (dynamicTemplateData) msg.dynamicTemplateData = dynamicTemplateData;
    } else {
      msg.subject = subject || "Notificación";
      msg.html = html || "<p>Sin contenido.</p>";
    }
    await sendgrid.send(msg);
    console.log(`📧 Email enviado a ${to}`);
  } catch (error) {
    console.error("❌ Error al enviar email:", error.response?.body || error);
    throw new Error("Error al enviar correo electrónico.");
  }
}

module.exports = sendEmail;
