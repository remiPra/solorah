import { useState } from 'react';
import AuthProvider, { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';

interface HeaderAuthProps {
  lang: string;
  translations: Record<string, string>;
  myReadingsPath: string;
}

function t(translations: Record<string, string>) {
  return (key: string) => translations[key] || key;
}

function HeaderAuthInner({ lang, translations, myReadingsPath }: HeaderAuthProps) {
  const { user, loading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const translate = t(translations);

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-sol-gold/10 border border-sol-gold/20 animate-pulse" />
    );
  }

  if (user) {
    return <UserMenu lang={lang} t={translate} myReadingsPath={myReadingsPath} />;
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="font-ui text-xs tracking-wider uppercase text-sol-ash hover:text-sol-gold border border-sol-gold/20 hover:border-sol-gold/50 rounded-full px-3 py-1.5 transition-all"
      >
        {translate('auth.login')}
      </button>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} t={translate} />
    </>
  );
}

export default function HeaderAuth(props: HeaderAuthProps) {
  return (
    <AuthProvider>
      <HeaderAuthInner {...props} />
    </AuthProvider>
  );
}
