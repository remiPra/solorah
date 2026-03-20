import { motion } from 'framer-motion';
import type { Card } from '../../types/card';

interface CardRevealProps {
  card: Card;
  lang: 'fr' | 'en';
  onNewReading: () => void;
}

const texts = {
  fr: {
    cta: 'Poser ta question',
    newReading: 'Nouveau tirage',
    share: 'Partager',
    cardOfDay: 'Ta carte du jour',
  },
  en: {
    cta: 'Ask your question',
    newReading: 'New reading',
    share: 'Share',
    cardOfDay: 'Your card of the day',
  },
};

export default function CardReveal({ card, lang, onNewReading }: CardRevealProps) {
  const t = texts[lang];
  const consultationHref = lang === 'fr' ? '/fr/consultation' : '/en/consultation';

  const shareText = lang === 'fr'
    ? `Ma carte du jour sur Solorah : ${card.name.fr} — "${card.message.fr}"`
    : `My card of the day on Solorah: ${card.name.en} — "${card.message.en}"`;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://solorah.com';

  const handleShare = async (platform: 'twitter' | 'facebook' | 'native') => {
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: 'Solorah', text: shareText, url: shareUrl });
      } catch { /* user cancelled */ }
      return;
    }

    const urls = {
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      native: '',
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center px-4 py-16 -mt-16">
      <div className="max-w-lg mx-auto text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-[Inter] text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: 'var(--color-sol-ash)', opacity: 0.6 }}
        >
          {t.cardOfDay}
        </motion.p>

        {/* Card image with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto mb-8"
          style={{ width: 'clamp(220px, 50vw, 350px)' }}
        >
          <motion.div
            animate={{
              boxShadow: [
                `0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)`,
                `0 0 60px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3), 0 0 100px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.15)`,
                `0 0 40px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2), 0 0 80px rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.1)`,
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src={card.image}
              alt={card.name[lang]}
              className="w-full rounded-lg"
              style={{ border: '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}
            />
          </motion.div>
        </motion.div>

        {/* Card name */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-[Cinzel_Decorative] text-2xl sm:text-3xl mb-6"
          style={{ color: 'var(--color-sol-gold)' }}
        >
          ✦ {card.name[lang]} ✦
        </motion.h2>

        {/* Card message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-[Cormorant_Garamond] text-xl sm:text-2xl italic mb-8 leading-relaxed"
          style={{ color: 'var(--color-sol-cream)' }}
        >
          &ldquo;{card.message[lang]}&rdquo;
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
          <span style={{ color: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}>✦</span>
          <div className="flex-1 max-w-24 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3))' }} />
        </motion.div>

        {/* Interpretation */}
        {card.interpretation && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="font-[Cormorant_Garamond] text-lg leading-relaxed mb-10"
            style={{ color: 'var(--color-sol-cream)' }}
          >
            {card.interpretation[lang]}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="space-y-4 mb-8"
        >
          {/* Primary CTA */}
          <a
            href={consultationHref}
            className="block w-full font-[Inter] tracking-wider uppercase text-sm font-semibold px-6 py-4 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-sol-gold)',
              color: 'var(--color-sol-deep)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-sol-gold-light)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-sol-gold)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {t.cta}
          </a>

          {/* Secondary — new reading */}
          <button
            onClick={onNewReading}
            className="block w-full font-[Inter] tracking-wider uppercase text-sm px-6 py-4 rounded-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)',
              color: 'var(--color-sol-gold)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.1)';
              e.currentTarget.style.borderColor = 'var(--color-sol-gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.5)';
            }}
          >
            ↻ {t.newReading}
          </button>
        </motion.div>

        {/* Share buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="font-[Inter] text-xs uppercase tracking-wider" style={{ color: 'var(--color-sol-ash)', opacity: 0.5 }}>
            {t.share}
          </span>
          <button
            onClick={() => handleShare('twitter')}
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--color-sol-ash)' }}
            aria-label="Share on X"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="transition-colors hover:opacity-80"
            style={{ color: 'var(--color-sol-ash)' }}
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={() => handleShare('native')}
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--color-sol-ash)' }}
              aria-label="Share"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
