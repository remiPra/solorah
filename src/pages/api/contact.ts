export const prerender = false;

import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getResend, FROM_EMAIL } from '../../lib/resend';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, message, lang } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Insert into contact_messages
  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert({ name, email, message, lang: lang || 'fr' });

  if (dbError) {
    return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
  }

  // Send confirmation email to user
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Solorah — Message reçu',
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; color: #e8e0d0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4a853; font-size: 28px; letter-spacing: 0.2em; margin: 0;">SOLORAH</h1>
            <div style="width: 60px; height: 1px; background: #d4a853; margin: 15px auto;"></div>
          </div>
          <p>Bonjour ${name},</p>
          <p>Nous avons bien reçu ton message et nous te répondrons dans les plus brefs délais.</p>
          <p style="color: #999; font-style: italic; font-size: 14px;">— L'équipe Solorah</p>
        </div>
      `,
    });
  } catch {
    // Email send failure is non-blocking
  }

  // Notify admin
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'contact@solorah.com',
      subject: `Nouveau message contact — ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Langue :</strong> ${lang || 'fr'}</p>
          <p><strong>Message :</strong></p>
          <blockquote style="border-left: 3px solid #d4a853; padding-left: 15px; color: #555;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      `,
    });
  } catch {
    // Admin notification failure is non-blocking
  }

  return new Response(JSON.stringify({ ok: true }), { status: 201 });
};
