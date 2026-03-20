import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Card } from '../../types/card';

interface CardFlipProps {
  card: Card;
  onFlipComplete: () => void;
}

export default function CardFlip({ card, onFlipComplete }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // Duck ambient audio during flip
    window.dispatchEvent(new CustomEvent('solorah:audio-duck'));

    const flipTimer = setTimeout(() => {
      setIsFlipped(true);
    }, 600);

    const flashTimer = setTimeout(() => {
      setShowFlash(true);
    }, 1100);

    const flashEndTimer = setTimeout(() => {
      setShowFlash(false);
    }, 1400);

    const completeTimer = setTimeout(() => {
      // Restore ambient audio
      window.dispatchEvent(new CustomEvent('solorah:audio-unduck'));
      onFlipComplete();
    }, 2000);

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(flashTimer);
      clearTimeout(flashEndTimer);
      clearTimeout(completeTimer);
    };
  }, [onFlipComplete]);

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
      {/* Golden flash during flip */}
      {showFlash && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.5] }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4) 0%, rgba(var(--glow-r),var(--glow-g),var(--glow-b),0.15) 40%, transparent 70%)',
          }}
        />
      )}

      {/* Card container with 3D flip */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          width: 'clamp(220px, 40vw, 350px)',
          height: 'clamp(330px, 60vw, 525px)',
        }}
        className="relative"
      >
        {/* Back face (card back — visible initially) */}
        <div
          className="absolute inset-0 card-back-design rounded-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="absolute inset-3 rounded border flex items-center justify-center"
            style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.2)' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="absolute w-16 h-16 border rotate-45"
                style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.12)' }}
              />
              <div
                className="absolute w-24 h-24 border rotate-45"
                style={{ borderColor: 'rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.06)' }}
              />
            </div>
          </div>
        </div>

        {/* Front face (card image — visible after flip) */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={card.image}
            alt={card.name.fr}
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
          />
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ border: '2px solid rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.4)' }}
          />
        </div>
      </motion.div>

      {/* Post-flip particle burst */}
      {isFlipped && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.8, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1,
                x: Math.cos((i * Math.PI * 2) / 12) * 120,
                y: Math.sin((i * Math.PI * 2) / 12) * 120,
              }}
              transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: '4px',
                height: '4px',
                backgroundColor: 'var(--color-sol-gold)',
                marginTop: '-2px',
                marginLeft: '-2px',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
