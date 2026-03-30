export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  lang: string;
  status: 'unread' | 'read' | 'replied';
  admin_reply?: string;
  replied_at?: string;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  lang: string;
}
