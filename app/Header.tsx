'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Lang = 'fr' | 'ar';

type HeaderProps = {
  lang?: Lang;
  onSwitchLang?: (lang: Lang) => void;
  isAdminAuthed?: boolean;
  onAdminLogout?: () => void;
};

const navLinks = {
  fr: [
    { label: 'Accueil', href: '/#hero' },
    { label: 'Créer ma carte', href: '/#form' },
    { label: 'À propos', href: '/#about' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/#hero' },
    { label: 'إنشاء بطاقتي', href: '/#form' },
    { label: 'من نحن', href: '/#about' },
  ],
};

export default function Header({
  lang = 'fr',
  onSwitchLang,
  isAdminAuthed = false,
  onAdminLogout,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        .hdr {
          position: fixed;
          inset: 0 0 auto 0;
          height: 68px;
          background: rgba(10, 22, 48, 0.96);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          display: flex;
          align-items: center;
          padding: 0 28px;
          gap: 12px;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: background 0.4s, box-shadow 0.4s;
        }
        .hdr.scrolled {
          background: rgba(6,14,34,0.99);
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }

        /* Logo */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hdr-logo img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.18);
          transition: border-color 0.25s, transform 0.25s;
        }
        .hdr-logo:hover img { border-color: #e8a020; transform: scale(1.06); }
        .hdr-logo-name {
          font-size: 15px;
          font-weight: 800;
          color: white;
          letter-spacing: 0.3px;
        }
        .hdr-admin-badge {
          font-size: 10px;
          font-weight: 700;
          color: #c8102e;
          background: rgba(200,16,46,0.14);
          border: 1px solid rgba(200,16,46,0.3);
          border-radius: 5px;
          padding: 2px 7px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* Nav — user pages only */
        .hdr-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
        }
        .hdr-nav a {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          padding: 7px 15px;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          position: relative;
        }
        .hdr-nav a::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 15px; right: 15px;
          height: 2px;
          background: #e8a020;
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s;
        }
        .hdr-nav a:hover { color: white; background: rgba(255,255,255,0.07); }
        .hdr-nav a:hover::after { transform: scaleX(1); }

        /* Right zone */
        .hdr-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          /* Only push right when there's no nav (admin page) */
        }
        .hdr-right-push { margin-left: auto; }

        /* Lang toggle */
        .hdr-lang {
  display: flex;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50px;
  padding: 3px;
  gap: 3px;
  position: absolute;       /* ← ajout */
  left: 50%;                /* ← ajout */
  transform: translateX(-50%); /* ← ajout */
}
        .hdr-lang-btn {
          background: transparent;
          color: rgba(255,255,255,0.5);
          border: none;
          border-radius: 50px;
          padding: 5px 13px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.5px;
          transition: background 0.2s, color 0.2s;
        }
        .hdr-lang-btn.active { background: white; color: #0f2545; }
        .hdr-lang-btn:hover:not(.active) { color: white; background: rgba(255,255,255,0.1); }

        /* Admin CTA — red pill, desktop only */
        .hdr-admin-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #c8102e;
          color: white;
          padding: 9px 20px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.2px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 3px 14px rgba(200,16,46,0.4);
          white-space: nowrap;
        }
        .hdr-admin-cta:hover {
          background: #a20d25;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(200,16,46,0.5);
        }

        /* Logout */
        .hdr-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(220,38,38,0.12);
          border: 1px solid rgba(220,38,38,0.3);
          border-radius: 50px;
          color: #fca5a5;
          font-size: 13px;
          font-weight: 700;
          padding: 9px 18px;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .hdr-logout:hover { background: rgba(220,38,38,0.24); color: #fff; }

        /* Hamburger */
        .hdr-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          cursor: pointer;
          padding: 9px 10px;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .hdr-burger:hover { background: rgba(255,255,255,0.14); }
        .hdr-bar {
          display: block;
          width: 20px; height: 2px;
          background: white;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .hdr-bar.b1.open { transform: translateY(7px) rotate(45deg); }
        .hdr-bar.b2.open { opacity: 0; transform: scaleX(0); }
        .hdr-bar.b3.open { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hdr { padding: 0 16px; }
          .hdr-logo-name { display: none; }

          .hdr-nav {
            position: fixed;
            top: 68px; left: 0; right: 0;
            background: rgba(6,14,34,0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
            padding: 12px;
            display: none;
            border-top: 1px solid rgba(255,255,255,0.07);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4);
            margin-left: 0;
          }
          .hdr-nav.open { display: flex; }
          .hdr-nav a {
            font-size: 15px;
            padding: 13px 16px;
            border-radius: 10px;
            color: rgba(255,255,255,0.85);
          }
          .hdr-nav a::after { display: none; }

          .hdr-right {
    margin-left: auto;
  }

          /* Hide desktop admin pill on mobile */
          .hdr-admin-cta { display: none; }
          .hdr-burger { display: flex; }
        }
        @media (max-width: 420px) {
          .hdr { padding: 0 12px; }
        }
      `}</style>

      <header className={`hdr${scrolled ? ' scrolled' : ''}`} dir="ltr">

        {/* Logo */}
        <a href="/#hero" className="hdr-logo">
          <img src="/logo-aem.png" alt="AEMM" />
          <span className="hdr-logo-name">AEMM</span>
          {isAdminPage && <span className="hdr-admin-badge">Admin</span>}
        </a>

        {/* Nav links — user pages only, auto-pushes right via margin-left:auto */}
        {!isAdminPage && (
          <nav className={`hdr-nav${menuOpen ? ' open' : ''}`}>
            {navLinks[lang].map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/*
          Right zone:
          - On user pages: lang + admin pill + burger (nav already has margin-left:auto)
          - On admin pages: hdr-right-push pushes everything to the right, only logout shown
        */}
        <div className={`hdr-right${isAdminPage ? ' hdr-right-push' : ''}`}>

          {/* Lang toggle — user pages only */}
          {!isAdminPage && onSwitchLang && (
            <div className="hdr-lang">
              <button className={`hdr-lang-btn${lang === 'fr' ? ' active' : ''}`} onClick={() => onSwitchLang('fr')}>FR</button>
              <button className={`hdr-lang-btn${lang === 'ar' ? ' active' : ''}`} onClick={() => onSwitchLang('ar')}>ع</button>
            </div>
          )}

          {/* Admin CTA — user pages, desktop */}
          {!isAdminPage && (
            <button className="hdr-admin-cta" onClick={() => router.push('/admin')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {lang === 'fr' ? 'Admin' : 'إدارة'}
            </button>
          )}

          {/* Logout — admin page + authed ONLY */}
          {isAdminPage && isAdminAuthed && (
            <button className="hdr-logout" onClick={onAdminLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {lang === 'fr' ? 'Déconnexion' : 'تسجيل الخروج'}
            </button>
          )}

          {/* Hamburger — user pages only */}
          {!isAdminPage && (
            <button
              className="hdr-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className={`hdr-bar b1${menuOpen ? ' open' : ''}`} />
              <span className={`hdr-bar b2${menuOpen ? ' open' : ''}`} />
              <span className={`hdr-bar b3${menuOpen ? ' open' : ''}`} />
            </button>
          )}
        </div>
      </header>

      {/*
        68px spacer so page content starts below the fixed header.
        The admin page's own layout should NOT add additional top padding/margin.
      */}
      <div style={{ height: '68px' }} />
    </>
  );
}