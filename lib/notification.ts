type NotificationPayload = {
  email: string;
  telefone: string;
  nomeItem: string;
};

type WhatsAppApiPayload = {
  messaging_product: 'whatsapp';
  to: string;
  type: 'text';
  text: {
    body: string;
  };
};

function buildMessage(nomeItem: string) {
  return `Seu item encontra em estoque: ${nomeItem}`;
}

function normalizePhoneNumber(telefone: string) {
  return telefone.replace(/\D/g, '');
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
  const token = process.env.WHATSAPP_PROVIDER_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.log(`[WHATSAPP-MOCK] para=${telefone} mensagem="${message}"`);
    return;
  }

  const to = normalizePhoneNumber(telefone);
  const endpoint = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  const payload: WhatsAppApiPayload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
      body: message
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao enviar WhatsApp (${response.status}): ${errorText}`);
  }

  console.log(`[WHATSAPP] para=${to} mensagem="${message}"`);
}

export async function notifyItemInStock(payload: NotificationPayload) {
  await Promise.all([sendEmail(payload), sendWhatsApp(payload)]);
}
