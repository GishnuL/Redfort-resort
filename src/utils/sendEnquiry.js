import emailjs from '@emailjs/browser';
import { RESORT } from './constants';

export async function sendEnquiry(form) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Email is not configured. Please contact us via WhatsApp.');
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: form.name,
      reply_to: form.email,
      phone: form.phone,
      message: form.message,
      to_email: RESORT.email,
      resort_name: RESORT.name,
    },
    { publicKey }
  );
}
