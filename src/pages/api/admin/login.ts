export const prerender = false;

import type { APIRoute } from 'astro';
import { generateAdminToken, isRateLimited, recordFailedAttempt, clearFailedAttempts } from '../../../lib/admin-auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many attempts. Try again later.' }), { status: 429 });
  }

  const body = await request.json();
  const { password } = body;

  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response(JSON.stringify({ error: 'Admin not configured' }), { status: 500 });
  }

  if (password !== adminPassword) {
    recordFailedAttempt(ip);
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  clearFailedAttempts(ip);
  const token = generateAdminToken();

  cookies.set('solorah-admin', token, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return new Response(JSON.stringify({ ok: true }));
};
