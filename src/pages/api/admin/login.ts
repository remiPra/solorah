export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const { password } = body;

  const adminPassword = import.meta.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return new Response(JSON.stringify({ error: 'Admin not configured' }), { status: 500 });
  }

  if (password !== adminPassword) {
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  cookies.set('solorah-admin', 'true', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return new Response(JSON.stringify({ ok: true }));
};
