export const prerender = false;

import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../../../lib/supabase';

function isAdmin(cookies: any): boolean {
  return cookies.get('solorah-admin')?.value === 'true';
}

export const GET: APIRoute = async ({ cookies, url }) => {
  if (!isAdmin(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const status = url.searchParams.get('status');

  let query = supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data));
};
