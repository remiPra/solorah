import { useState, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import type { SaveReadingPayload } from '../../types/reading';

interface SaveReadingButtonProps {
  payload: SaveReadingPayload;
  t: (key: string) => string;
  onLoginRequest: () => void;
}

export default function SaveReadingButton({ payload, t, onLoginRequest }: SaveReadingButtonProps) {
  const { user, session } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!user || !session) {
      onLoginRequest();
      return;
    }
    if (saving || saved) return;

    setSaving(true);
    try {
      const res = await fetch('/api/readings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaved(true);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }, [user, session, payload, saving, saved, onLoginRequest]);

  if (saved) {
    return (
      <div className="flex items-center gap-2 text-sol-gold font-ui text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {t('auth.saved')}
      </div>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="flex items-center gap-2 font-ui text-sm text-sol-ash hover:text-sol-gold transition-colors disabled:opacity-50"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
      {user ? t('auth.save') : t('auth.loginToSave')}
    </button>
  );
}
