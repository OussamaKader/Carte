'use client';

import { useState, useEffect } from 'react';

type Lang = 'fr' | 'ar';

type HeaderProps = {
  lang: Lang;
  onSwitchLang: (lang: Lang) => void;
};

const navLinks = {
  fr: [
    { label: 'Accueil', href: '#hero' },
    { label: 'Créer ma carte', href: '#form' },
    { label: 'À propos', href: '#about' },
  ],
  ar: [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'إنشاء بطاقتي', href: '#form' },
    { label: 'من نحن', href: '#about' },
  ],
};

export default function Header({ lang, onSwitchLang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`app-header${scrolled ? ' scrolled' : ''}`}
      dir="ltr"
    >
      {/* Logo */}
      <a href="#hero" className="header-logo-link">
        <img src="/logo-aem.png" className="header-logo" alt="AEM" />
      </a>

      {/* Desktop nav */}
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navLinks[lang].map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#form" className="join-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
        {lang === 'fr' ? 'Rejoindre' : 'انضم الآن'}
      </a>

      {/* Language switcher */}
      <div className="lang-btns">
        <button
          className={`lang-btn${lang === 'fr' ? ' active' : ''}`}
          onClick={() => onSwitchLang('fr')}
        >
          FR
        </button>
        <button
          className={`lang-btn${lang === 'ar' ? ' active' : ''}`}
          onClick={() => onSwitchLang('ar')}
        >
          ع
        </button>
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={menuOpen}
      >
        <span className={menuOpen ? 'bar open1' : 'bar'} />
        <span className={menuOpen ? 'bar open2' : 'bar'} />
        <span className={menuOpen ? 'bar open3' : 'bar'} />
      </button>
    </header>
  );
}