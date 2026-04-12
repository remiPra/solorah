export const prerender = false;

import type { APIRoute } from 'astro';
import { getAdminFirestore } from '../../../../lib/firebase-admin';
import { getResend, FROM_EMAIL } from '../../../../lib/resend';
import { isValidAdminToken } from '../../../../lib/admin-auth';

export const GET: APIRoute = async ({ params, cookies }) => {
  if (!isValidAdminToken(cookies.get('solorah-admin')?.value)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const firestore = getAdminFirestore();
  const { id } = params;

  const docRef = firestore.collection('contact_messages').doc(id!);
  const doc = await docRef.get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  const data = { id: doc.id, ...doc.data() };

  // Mark as read if unread
  if (doc.data()?.status === 'unread') {
    await docRef.update({ status: 'read' });
  }

  return new Response(JSON.stringify(data));
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  if (!isValidAdminToken(cookies.get('solorah-admin')?.value)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const firestore = getAdminFirestore();
  const { id } = params;
  const body = await request.json();
  const { reply } = body;

  if (!reply?.trim()) {
    return new Response(JSON.stringify({ error: 'Reply is required' }), { status: 400 });
  }

  // Get the original message
  const docRef = firestore.collection('contact_messages').doc(id!);
  const doc = await docRef.get();

  if (!doc.exists) {
    return new Response(JSON.stringify({ error: 'Message not found' }), { status: 404 });
  }

  const msg = doc.data()!;

  // Update the message
  await docRef.update({
    admin_reply: reply.trim(),
    status: 'replied',
    replied_at: new Date().toISOString(),
  });

  // Send reply email
  const resend = getResend();
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: msg.email,
      subject: 'Solorah — Réponse à votre message',
      html: `
        <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; padding: 40px 20px; color: #e8e0d0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d4a853; font-size: 28px; letter-spacing: 0.2em; margin: 0;">SOLORAH</h1>
            <div style="width: 60px; height: 1px; background: #d4a853; margin: 15px auto;"></div>
          </div>
          <p>Bonjour ${msg.name},</p>
          <p>Voici notre réponse à votre message :</p>
          <blockquote style="border-left: 3px solid #d4a853; padding-left: 15px; margin: 20px 0; color: #ccc; font-style: italic;">
            ${msg.message.replace(/\n/g, '<br>')}
          </blockquote>
          <div style="background: #1a1a1a; border: 1px solid #d4a853; padding: 20px; margin: 20px 0;">
            ${reply.trim().replace(/\n/g, '<br>')}
          </div>
          <p style="color: #999; font-style: italic; font-size: 14px;">— L'équipe Solorah</p>
        </div>
      `,
    });
  } catch {
    // Email send failure is non-blocking
  }

  return new Response(JSON.stringify({ ok: true }));
};
