import { Resend } from 'resend';

let resendInstance: Resend | null = null;

export function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('Missing RESEND_API_KEY env var');
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export const FROM_EMAIL = 'Solorah <contact@solorah.com>';
