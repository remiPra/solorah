import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AuthProvider, { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';
import { db } from '../../lib/firebase';
import type { SavedReading } from '../../types/reading';

interface ReadingHistoryProps {
  lang: string;
  translations: Record<string, string>;
  deckLabels: Record<string, string>;
  spreadLabels: Record<string, string>;
}

function t(translations: Record<string, string>) {
  return (key: string) => translations[key] || key;
}

function ReadingHistoryInner({ lang, translations, deckLabels, spreadLabels }: ReadingHistoryProps) {
  const { user, loading: authLoading } = useAuth();
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const translate = t(translations);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const q = query(
          collection(db, 'saved_readings'),
          where('user_id', '==', user.uid),
          orderBy('created_at', 'desc')
        );
        const snapshot = await getDocs(q);
        const data: SavedReading[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            user_id: d.user_id,
            deck: d.deck,
            spread_type: d.spread_type,
            cards: d.cards,
            question: d.question,
            lang: d.lang,
            created_at: d.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          };
        });
        setReadings(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm(translate('auth.confirmDelete'))) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'saved_readings', id));
      setReadings((prev) => prev.filter((r) => r.id !== id));
    } catch {
      // silently fail
    } finally {
      setDeletingId(null);
    }
  }, [translate]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-sol-gold/30 border-t-sol-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-sol-gold/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-sol-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <p className="font-body text-sol-ash mb-6">{translate('auth.loginToSave')}</p>
        <button
          onClick={() => setModalOpen(true)}
          className="font-ui tracking-wider uppercase bg-sol-gold text-sol-deep hover:bg-sol-gold-light font-semibold px-8 py-3 text-sm rounded-sm transition-all duration-300"
        >
          {translate('auth.login')}
        </button>
        <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} t={translate} />
      </div>
    );
  }

  if (readings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-sol-gold/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-sol-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
        </div>
        <p className="font-display text-xl text-sol-gold mb-2">{translate('auth.noReadings')}</p>
        <p className="font-body text-sm text-sol-ash">{translate('auth.noReadingsDesc')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {readings.map((reading) => (
          <motion.div
            key={reading.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-sol-charcoal border border-sol-gold/10 rounded-sm p-5 hover:border-sol-gold/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display text-sm text-sol-gold">
                    {spreadLabels[reading.spread_type] || reading.spread_type}
                  </span>
                  <span className="text-sol-ash/30">|</span>
                  <span className="font-body text-xs text-sol-ash">
                    {deckLabels[reading.deck] || reading.deck}
                  </span>
                </div>
                {reading.question && (
                  <p className="font-body text-sm text-sol-cream/80 mb-2 truncate">
                    {reading.question}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {reading.cards.map((card, i) => (
                    <span
                      key={i}
                      className="inline-block bg-sol-deep/60 border border-sol-gold/10 rounded-sm px-2 py-1 font-body text-xs text-sol-cream/70"
                    >
                      {card.name}{card.reversed ? ' \u2193' : ''}
                    </span>
                  ))}
                </div>
                <p className="font-body text-xs text-sol-ash/50">
                  {translate('auth.savedOn')} {new Date(reading.created_at).toLocaleDateString(lang)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(reading.id)}
                disabled={deletingId === reading.id}
                className="flex-shrink-0 text-sol-ash/40 hover:text-red-400 transition-colors disabled:opacity-50"
                title={translate('auth.deleteReading')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function ReadingHistory(props: ReadingHistoryProps) {
  return (
    <AuthProvider>
      <ReadingHistoryInner {...props} />
    </AuthProvider>
  );
}
