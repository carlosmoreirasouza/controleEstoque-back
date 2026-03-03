type NotificationPayload = {
  email: string;
  telefone: string;
  nomeItem: string;
};

function buildMessage(nomeItem: string) {
  return `Seu item encontra em estoque: ${nomeItem}`;
}

export async function sendEmail({ email, nomeItem }: NotificationPayload) {
  const message = buildMessage(nomeItem);
  if (!process.env.SMTP_HOST) {
    console.log(`[EMAIL-MOCK] para=${email} mensagem="${message}"`);
    return;
  }

  // Integração real pode ser adicionada com nodemailer.
  console.log(`[EMAIL] para=${email} mensagem="${message}"`);
}

export async function sendWhatsApp({ telefone, nomeItem }: NotificationPayload) {
  const message = buildMessage(nomeItem);
  if (!process.env.WHATSAPP_PROVIDER_TOKEN) {
    console.log(`[WHATSAPP-MOCK] para=${telefone} mensagem="${message}"`);
    return;
  }

  // Integração real pode ser adicionada aqui (Twilio/Meta).
  console.log(`[WHATSAPP] para=${telefone} mensagem="${message}"`);
}

export async function notifyItemInStock(payload: NotificationPayload) {
  await Promise.all([sendEmail(payload), sendWhatsApp(payload)]);
}
