export const prerender = false;

import type { APIRoute } from 'astro';
import { getAdminFirestore } from '../../../../lib/firebase-admin';
import { isValidAdminToken } from '../../../../lib/admin-auth';

export const GET: APIRoute = async ({ cookies, url }) => {
  if (!isValidAdminToken(cookies.get('solorah-admin')?.value)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const firestore = getAdminFirestore();
  const status = url.searchParams.get('status');

  let ref = firestore.collection('contact_messages').orderBy('created_at', 'desc');

  if (status) {
    ref = ref.where('status', '==', status);
  }

  const snapshot = await ref.get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return new Response(JSON.stringify(data));
};
