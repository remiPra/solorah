import { useState, useCallback } from 'react';

interface ContactFormProps {
  lang: string;
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    success: string;
    error: string;
    consent?: string;
  };
}

export default function ContactForm({ lang, labels }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || !consent || status === 'sending') return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), lang }),
      });
      if (res.ok) {
        setStatus('sent');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, [name, email, message, lang, status]);

  if (status === 'sent') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-sol-gold/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-sol-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="font-display text-xl text-sol-gold">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="block font-ui text-sm text-sol-ash mb-2 uppercase tracking-wider">
          {labels.name}
        </label>
        <input
          type="text"
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-sol-charcoal border border-sol-gold/20 rounded-sm px-4 py-3 font-body text-sol-cream placeholder-sol-ash/40 focus:border-sol-gold/50 focus:outline-none focus:ring-1 focus:ring-sol-gold/30 transition-colors"
          placeholder={labels.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block font-ui text-sm text-sol-ash mb-2 uppercase tracking-wider">
          {labels.email}
        </label>
        <input
          type="email"
          id="contact-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-sol-charcoal border border-sol-gold/20 rounded-sm px-4 py-3 font-body text-sol-cream placeholder-sol-ash/40 focus:border-sol-gold/50 focus:outline-none focus:ring-1 focus:ring-sol-gold/30 transition-colors"
          placeholder={labels.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-ui text-sm text-sol-ash mb-2 uppercase tracking-wider">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className="w-full bg-sol-charcoal border border-sol-gold/20 rounded-sm px-4 py-3 font-body text-sol-cream placeholder-sol-ash/40 focus:border-sol-gold/50 focus:outline-none focus:ring-1 focus:ring-sol-gold/30 transition-colors resize-none"
          placeholder={labels.messagePlaceholder}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="contact-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 w-4 h-4 accent-sol-gold bg-sol-charcoal border-sol-gold/20 rounded-sm"
        />
        <label htmlFor="contact-consent" className="font-ui text-sm text-sol-ash leading-relaxed">
          {labels.consent || "J'accepte que mes données soient traitées pour répondre à ma demande, conformément à la politique de confidentialité."}
        </label>
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm font-body text-center">{labels.error}</p>
      )}

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center font-ui tracking-wider uppercase bg-sol-gold text-sol-deep hover:bg-sol-gold-light hover:shadow-[0_0_30px_rgba(var(--accent-r),var(--accent-g),var(--accent-b),0.3)] font-semibold px-8 py-4 text-sm rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? '...' : labels.send}
        </button>
      </div>
    </form>
  );
}
