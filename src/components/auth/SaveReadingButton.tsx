import { useState, useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { db } from '../../lib/firebase';
import type { SaveReadingPayload } from '../../types/reading';

interface SaveReadingButtonProps {
  payload: SaveReadingPayload;
  t: (key: string) => string;
  onLoginRequest: () => void;
}

export default function SaveReadingButton({ payload, t, onLoginRequest }: SaveReadingButtonProps) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const handleSave = useCallback(async () => {
    if (!user) {
      onLoginRequest();
      return;
    }
    if (saving || saved) return;

    setSaving(true);
    try {
      await addDoc(collection(db, 'saved_readings'), {
        user_id: user.uid,
        deck: payload.deck,
        spread_type: payload.spread_type,
        cards: payload.cards,
        question: payload.question || null,
        lang: payload.lang,
        created_at: serverTimestamp(),
      });
      setSaved(true);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }, [user, payload, saving, saved, onLoginRequest]);

  if (error) {
    return (
      <button
        onClick={() => { setError(false); handleSave(); }}
        className="flex items-center gap-2 font-ui text-sm text-red-400 hover:text-red-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        {t('auth.saveError')}
      </button>
    );
  }

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
