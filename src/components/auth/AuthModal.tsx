import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthProvider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export default function AuthModal({ isOpen, onClose, t }: AuthModalProps) {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setSent(false);
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setError('');
    const result = await signInWithMagicLink(email.trim());
    setLoading(false);
    if (result.error) {
      setError(t('auth.error'));
    } else {
      setSent(true);
    }
  }, [email, loading, signInWithMagicLink, t]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-sol-deep/90 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md bg-sol-charcoal border border-sol-gold/20 rounded-sm p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-sol-ash hover:text-sol-gold transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!sent ? (
              <>
                {/* Title */}
                <div className="text-center mb-8">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-sol-gold/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-sol-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl text-sol-gold mb-2">
                    {t('auth.loginTitle')}
                  </h2>
                  <p className="font-body text-sm text-sol-ash">
                    {t('auth.loginSubtitle')}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('auth.emailPlaceholder')}
                      required
                      autoFocus
                      className="w-full bg-sol-deep border border-sol-gold/20 rounded-sm px-4 py-3 font-body text-sol-cream placeholder-sol-ash/40 focus:border-sol-gold/50 focus:outline-none focus:ring-1 focus:ring-sol-gold/30 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm font-body text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-ui tracking-wider uppercase bg-sol-gold text-sol-deep hover:bg-sol-gold-light font-semibold px-6 py-3 text-sm rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '...' : t('auth.sendMagicLink')}
                  </button>
                </form>

                <p className="text-center mt-4 font-body text-xs text-sol-ash/60">
                  {t('auth.noPassword')}
                </p>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-sol-gold/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-sol-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl text-sol-gold mb-3">
                  {t('auth.magicLinkSent')}
                </h2>
                <p className="font-body text-sm text-sol-ash">
                  {t('auth.magicLinkDesc')}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
