'use client';

type Lang = 'fr' | 'ar';

type FooterProps = {
  lang: Lang;
};

const footerContent = {
  fr: {
    description:
      "Association des Étudiants Mauritaniens au Maroc — une communauté dédiée à l'accueil, l'accompagnement et la réussite des étudiants mauritaniens au Maroc.",
    quickLinksTitle: 'Liens rapides',
    quickLinks: [
      { label: 'Accueil', href: '#hero' },
      { label: 'Créer ma carte', href: '#form' },
      { label: 'À propos', href: '#about' },
    ],
    contact: {
      title: 'Contactez-nous',
      email: 'aemmourimaroc@gmail.com',
      phone: '+222 36 42 71 79',
    },
    copyright:
      '© 2026 AEM — Association des Étudiants Mauritaniens au Maroc. Tous droits réservés.',
  },
  ar: {
    description:
      'جمعية الطلاب الموريتانيين في المغرب — مجتمع مكرّس لاستقبال الطلاب الموريتانيين ومرافقتهم ودعم نجاحهم في المغرب.',
    quickLinksTitle: 'روابط سريعة',
    quickLinks: [
      { label: 'الرئيسية', href: '#hero' },
      { label: 'إنشاء بطاقتي', href: '#form' },
      { label: 'من نحن', href: '#about' },
    ],
    contact: {
      title: 'اتصل بنا',
      email: 'aemmourimaroc@gmail.com',
      phone: '+222 36 42 71 79',
    },
    copyright:
      '© 2026 AEM — جمعية الطلاب الموريتانيين في المغرب. جميع الحقوق محفوظة.',
  },
};

export default function Footer({ lang }: FooterProps) {
  const content = footerContent[lang];
  const isRtl = lang === 'ar';

  return (
    <footer className="app-footer" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="footer-container">

        {/* About */}
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <img src="/logo-aem.png" alt="AEM" />
            <span className="footer-logo-text">AEM</span>
          </div>
          <p className="footer-description">{content.description}</p>
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
              <a
                href={`mailto:${content.contact.email}`}
                style={{ wordBreak: 'break-all', fontSize: '13px' }}
              >
                {content.contact.email}
              </a>
            </li>
            <li>
              <span className="footer-contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2a1 1 0 011.05-.24 11.5 11.5 0 003.6.72 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.52 3.6a1 1 0 01-.24 1.04L6.6 10.8z" />
                </svg>
              </span>
              <a
                href={`tel:${content.contact.phone}`}
                style={{ direction: 'ltr', display: 'inline-block' }}
              >
                {content.contact.phone}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright bar */}
      <div className="footer-bottom">
        <p>{content.copyright}</p>
      </div>
    </footer>
  );
}