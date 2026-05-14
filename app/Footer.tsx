'use client';

import { usePathname } from 'next/navigation';

type Lang = 'fr' | 'ar';

type FooterProps = {
  lang?: Lang;
};

const footerContent = {
  fr: {
    description:
      "Association des Étudiants Mauritaniens au Maroc — une communauté dédiée à l'accueil, l'accompagnement et la réussite des étudiants mauritaniens au Maroc.",
    quickLinksTitle: 'Liens rapides',
    quickLinks: [
      { label: 'Accueil', href: '/#hero' },
      { label: 'Créer ma carte', href: '/#form' },
      { label: 'À propos', href: '/#about' },
    ],
    contact: {
      title: 'Contactez-nous',
      email: 'aemmourimaroc@gmail.com',
      phone: '+222 36 42 71 79',
    },
    copyright: '© 2026 AEMM — Association des Étudiants Mauritaniens au Maroc. Tous droits réservés.',
  },
  ar: {
    description:
      'رابطة الطلاب الموريتانيين في المغرب — مجتمع مكرّس لاستقبال الطلاب الموريتانيين ومرافقتهم ودعم نجاحهم في المغرب.',
    quickLinksTitle: 'روابط سريعة',
    quickLinks: [
      { label: 'الرئيسية', href: '/#hero' },
      { label: 'إنشاء بطاقتي', href: '/#form' },
      { label: 'من نحن', href: '/#about' },
    ],
    contact: {
      title: 'اتصل بنا',
      email: 'aemmourimaroc@gmail.com',
      phone: '+222 36 42 71 79',
    },
    copyright: '© 2026 AEMM — رابطة الطلاب الموريتانيين في المغرب. جميع الحقوق محفوظة.',
  },
};

export default function Footer({ lang = 'fr' }: FooterProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const content = footerContent[lang];
  const isRtl = lang === 'ar';

  /* ── Same footer for both user and admin ── */
  return (
    <footer className="app-footer" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="footer-container">

        {/* About */}
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <img src="/logo-aem.png" alt="AEMM" />
            <span className="footer-logo-text">AEMM</span>
          </div>

          {/* Mauritanian tricolor bar */}
          <div className="footer-tricolor" aria-hidden="true">
            <span /><span /><span />
          </div>

          <p className="footer-description">{content.description}</p>

          {/* Admin badge in footer when on admin page */}
          {isAdminPage && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '14px',
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(200,16,46,0.8)',
              background: 'rgba(200,16,46,0.08)',
              border: '1px solid rgba(200,16,46,0.18)',
              borderRadius: '6px',
              padding: '4px 10px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Espace Admin
            </span>
          )}
        </div>

        {/* Quick links */}
        <div className="footer-section footer-links">
          <h4>{content.quickLinksTitle}</h4>
          <ul>
            {content.quickLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section footer-contact">
          <h4>{content.contact.title}</h4>
          <ul>
            <li>
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
              <a href={`mailto:${content.contact.email}`} style={{ wordBreak: 'break-all', fontSize: '13px' }}>
                {content.contact.email}
              </a>
            </li>
            <li>
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2a1 1 0 011.05-.24 11.5 11.5 0 003.6.72 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.52 3.6a1 1 0 01-.24 1.04L6.6 10.8z" />
                </svg>
              </span>
              <a href={`tel:${content.contact.phone}`} style={{ direction: 'ltr', display: 'inline-block' }}>
                {content.contact.phone}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>{content.copyright}</p>
        <div className="footer-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>
    </footer>
  );
}