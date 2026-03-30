export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

function getSupabaseFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { authorization: authHeader } },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const supabase = getSupabaseFromRequest(request);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await request.json();
  const { deck, spread_type, cards, question, lang } = body;

  if (!deck || !spread_type || !cards) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('saved_readings')
    .insert({ user_id: user.id, deck, spread_type, cards, question, lang })
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};

export const GET: APIRoute = async ({ request }) => {
  const supabase = getSupabaseFromRequest(request);
  if (!supabase) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const { data, error } = await supabase
    .from('saved_readings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data));
};
