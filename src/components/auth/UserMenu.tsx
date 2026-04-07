import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';

interface UserMenuProps {
  lang: string;
  t: (key: string) => string;
  myReadingsPath: string;
}

export default function UserMenu({ lang, t, myReadingsPath }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = user?.displayName || user?.email || '?';
  const initial = displayName.charAt(0).toUpperCase();
  const photoURL = user?.photoURL;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSignOut = useCallback(async () => {
    setOpen(false);
    await signOut();
  }, [signOut]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full overflow-hidden border border-sol-gold/40 hover:border-sol-gold/60 transition-all"
        aria-label="User menu"
      >
        {photoURL ? (
          <img src={photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full bg-sol-gold/20 flex items-center justify-center text-sol-gold font-ui text-sm font-semibold">
            {initial}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-sol-charcoal border border-sol-gold/20 rounded-sm shadow-2xl overflow-hidden z-[70]">
          <div className="px-4 py-3 border-b border-sol-gold/10">
            <p className="font-body text-xs text-sol-cream truncate">{displayName}</p>
            {user?.email && user.email !== displayName && (
              <p className="font-body text-xs text-sol-ash/60 truncate mt-0.5">{user.email}</p>
            )}
          </div>
          <a
            href={myReadingsPath}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 font-ui text-sm text-sol-cream hover:bg-sol-gold/10 hover:text-sol-gold transition-colors"
          >
            {t('auth.myReadings')}
          </a>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-3 font-ui text-sm text-sol-ash hover:bg-sol-gold/10 hover:text-red-400 transition-colors"
          >
            {t('auth.logout')}
          </button>
        </div>
      )}
    </div>
  );
}
