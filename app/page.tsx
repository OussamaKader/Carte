'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import './page.css';
import { supabase } from './supabaseClient';
import Header from './Header';
import Footer from './Footer';

type Lang = 'fr' | 'ar';

const translations = {
  fr: {
    heroTitle: 'Créez votre carte de membre AEM',
    heroSubtitle: 'Rejoignez une communauté dynamique d\'étudiants mauritaniens au Maroc. Obtenez votre carte officielle en quelques minutes.',
    heroCta: 'Créer ma carte',
    howTitle: 'Comment créer votre carte',
    step1Title: 'Remplissez vos informations',
    step1Desc: 'Entrez votre nom, numéro de membre et ville',
    step2Title: 'Ajoutez votre photo',
    step2Desc: 'Téléchargez une photo d\'identité claire',
    step3Title: 'Téléchargez votre carte',
    step3Desc: 'Générez et téléchargez votre carte officielle',
    aboutTitle: 'À propos de l\'AEM',
    aboutDesc1: 'L\'Association des Étudiants Mauritaniens au Maroc (AEM) est une organisation dédiée à l\'accueil, l\'accompagnement et la réussite des étudiants mauritaniens au Maroc.',
    aboutDesc2: 'Nous créons un réseau solide de solidarité, d\'entraide académique et de développement professionnel pour tous nos membres.',
    title: 'Carte AEM',
    subtitle: 'Remplissez les informations pour générer votre carte officielle',
    photoLabel: 'Photo du membre',
    photoText: 'Cliquez pour ajouter une photo',
    removePhoto: ' Supprimer la photo',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Ex : Oussama Med lemine',
    numberLabel: 'Numéro membre',
    numberPlaceholder: 'Ex : 47185763',
    cityLabel: 'Ville',
    download: 'Télécharger ma carte',
    success: ' Carte créée avec succès !',
    error: 'Erreur enregistrement',
    cardBadge: 'CARTE OFFICIELLE',
    cardTitle1: 'Association des Étudiants',
    cardTitle2: 'Mauritaniens au Maroc',
    cardDesc: "Une communauté dédiée à l'accueil, l'accompagnement et la réussite des étudiants mauritaniens au Maroc, au sein d'un réseau solidaire, académique et professionnel.",
    cardTag: 'Solidarité · Réussite · Excellence',
    perk1: 'Accès privilégié aux événements, conférences et ateliers',
    perk2: 'Mise en relation avec des étudiants, diplômés et professionnels',
    perk3: 'Accompagnement académique, mentorat et soutien personnalisé',
    labelName: 'NOM DU MEMBRE',
    labelNumber: 'N° MEMBRE',
    labelCity: 'VILLE',
    labelContact: 'RÉSEAUX & CONTACT',
    issued: 'Émise le',
    expires: "Valable jusqu'au",
    sgLabel: 'SG ',
    dir: 'ltr' as const,
  },
  ar: {
    heroTitle: 'أنشئ بطاقتك العضوية AEM',
    heroSubtitle: 'انضم إلى مجتمع دينامي من الطلاب الموريتانيين في المغرب. احصل على بطاقتك الرسمية في دقائق.',
    heroCta: 'إنشاء بطاقتي',
    howTitle: 'كيفية إنشاء بطاقتك',
    step1Title: 'أدخل معلوماتك',
    step1Desc: 'أدخل اسمك ورقم العضوية والمدينة',
    step2Title: 'أضف صورتك',
    step2Desc: 'حمّل صورة هوية واضحة',
    step3Title: 'حمل بطاقتك',
    step3Desc: 'أنشئ وحمّل بطاقتك الرسمية',
    aboutTitle: 'عن الجمعية',
    aboutDesc1: 'جمعية الطلاب الموريتانيين في المغرب (AEM) هي منظمة مكرّسة لاستقبال ومرافقة ودعم نجاح الطلاب الموريتانيين في المغرب.',
    aboutDesc2: 'نخلق شبكة متينة من التضامن والمساعدة الأكاديمية والتطوير المهني لجميع أعضائنا.',
    title: 'بطاقة AEM',
    subtitle: 'أدخل معلوماتك لإنشاء بطاقتك الرسمية',
    photoLabel: 'صورة العضو',
    photoText: 'انقر لإضافة صورة',
    removePhoto: ' حذف الصورة',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'مثال: أسامة محمد الأمين',
    numberLabel: 'رقم العضو',
    numberPlaceholder: 'مثال: 47185763',
    cityLabel: 'المدينة',
    download: 'تحميل البطاقة  ',
    success: ' تم إنشاء البطاقة بنجاح!',
    error: 'خطأ في التسجيل',
    cardBadge: 'البطاقة الرسمية',
    cardTitle1: 'جمعية الطلاب الموريتانيين',
    cardTitle2: 'في المغرب',
    cardDesc: 'مجتمع مكرّس لاستقبال الطلاب الموريتانيين ومرافقتهم ودعم نجاحهم في المغرب، في إطار شبكة تضامنية أكاديمية ومهنية.',
    cardTag: 'تضامن · نجاح · تميّز',
    perk1: 'وصول مميز إلى الفعاليات والمؤتمرات وورش العمل',
    perk2: 'التواصل مع الطلاب والخريجين والمهنيين',
    perk3: 'الدعم الأكاديمي والإرشاد والمساندة الشخصية',
    labelName: 'اسم العضو',
    labelNumber: 'رقم العضو',
    labelCity: 'المدينة',
    labelContact: 'التواصل والشبكات',
    issued: 'تاريخ الإصدار',
    expires: 'صالحة إلى غاية',
    sgLabel: 'SG',
    dir: 'rtl' as const,
  },
};

const cities = {
  fr: ['Rabat', 'Settat', 'Casablanca', 'Marrakech', 'Fès', 'Oujda', 'Meknès', 'Tanger', 'Kénitra', 'El Jadida', 'Tétouan'],
  ar: ['الرباط', 'سطات', 'الدار البيضاء', 'مراكش', 'فاس', 'وجدة', 'مكناس', 'طنجة', 'القنيطرة', 'الجديدة', 'تطوان'],
};

// Données des Superviseurs Généraux par ville
const superviseursGeneraux: Record<string, { nom: string; telephone: string }> = {
  'Rabat': { nom: 'Mohamed Abdelkader', telephone: '+222 36 42 71 79' },
  'Settat': { nom: 'Cheikh Mohamed Vadel', telephone: '+212 646-848691' },
  'Meknès': { nom: 'El Boukharie', telephone: '+222 27 85 27 09' },
  'Fès': { nom: 'Nouh Zoubier', telephone: '+222 49 69 27 95' },
  'Kénitra': { nom: 'Cheikhna', telephone: '+222 38 32 05 32' },
  'El Jadida': { nom: 'Ali Cheikh', telephone: '+222 48 86 01 90' },
  'Marrakech': { nom: 'Yebe Ebnou', telephone: '+212 64 28 10 31' },
  'Tétouan': { nom: 'Mohamed Salem', telephone: '+212 62 18 87 48' },
  'Tanger': { nom: 'Boubacar Diagne', telephone: '+222 48 98 41 27' },
  'Casablanca': { nom: 'Abdoullah Diallo', telephone: '+222 47 98 41 27' },
  'Oujda': { nom: 'Hassen', telephone: '+222 43 82 17 88' },
};
const cityArToFr: Record<string, string> = {
  'الرباط': 'Rabat',
  'سطات': 'Settat',
  'مكناس': 'Meknès',
  'فاس': 'Fès',
  'القنيطرة': 'Kénitra',
  'الجديدة': 'El Jadida',
  'مراكش': 'Marrakech',
  'تطوان': 'Tétouan',
  'طنجة': 'Tanger',
  'الدار البيضاء': 'Casablanca',
  'وجدة': 'Oujda',
};

// Fonction pour obtenir le SG d'une ville
function getSuperviseurGeneral(ville: string): { nom: string; telephone: string } | null {
  const villeFr = cityArToFr[ville] || ville;
  return superviseursGeneraux[villeFr] || null;
}

const Wave = () => (
  <svg viewBox="0 0 720 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,12 Q180,46 360,20 Q540,0 720,28 L720,60 L0,60 Z" fill="#0d2a5e" />
    <path d="M0,24 Q180,56 360,32 Q540,10 720,40 L720,60 L0,60 Z" fill="#c8102e" opacity="0.85" />
    <path d="M0,36 Q180,64 360,44 Q540,22 720,52 L720,60 L0,60 Z" fill="#00843D" opacity="0.8" />
  </svg>
);

function CardContent({
  name, number, city, photo, lang,
}: {
  name: string; number: string; city: string; photo: string | null; lang: Lang;
}) {
  const t = translations[lang];
  const today = new Date();
  const fmt = (d: Date) =>
    d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const issued = fmt(today);
  const next = new Date(today);
  next.setFullYear(next.getFullYear() + 1);
  const expire = fmt(next);

  // Obtenir les informations du Superviseur Général pour cette ville
  const sg = getSuperviseurGeneral(city);

  return (
    <div className="card-inner" dir={t.dir}>

      {/* ===== PANNEAU BLEU ===== */}
      <div className="left">
        <div className="photo-wrap">
          {photo ? (
            <img src={photo} className="member-photo" alt="Photo membre" />
          ) : (
            <div className="member-photo-placeholder">
              <svg viewBox="0 0 24 24" width="50" height="50" fill="rgba(255,255,255,0.4)">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}
        </div>

        <div className="label">{t.labelName}</div>
        <div className="field">{name || '—'}</div>

        <div className="label">{t.labelNumber}</div>
        <div className="field">{number || '—'}</div>

        <div className="label">{t.labelCity}</div>
        <div className="field">{city}</div>

        <div className="label">{t.labelContact}</div>
        {sg && (
          <div className="contact-row">
            <div className="contact-icon sg">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className="contact-text">{t.sgLabel}: {sg.nom}</span>
          </div>
        )}


        <div className="contact-row">
          <div className="contact-icon wa">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.951.996-3.624-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
          <span className="contact-text">{sg ? sg.telephone : '+222 36 42 71 79'}</span>
        </div>

        <div className="contact-row">
          <div className="contact-icon fb">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <span className="contact-text">AEM-MAROC</span>
        </div>


      </div>

      {/* ===== PANNEAU BLANC ===== */}
      <div className="right">
        <div className="badge">{t.cardBadge}</div>

        <div className="title-row">
          <img src="/logo-aem.png" className="logo-right" alt="AEM" />
          <h1>{t.cardTitle1}<br />{t.cardTitle2}</h1>
        </div>

        <div className="divider" />
        <div className="box">{t.cardDesc}</div>
        <div className="tag">{t.cardTag}</div>

        <ul className="perks">
          <li><span className="perk-dot red" />{t.perk1}</li>
          <li><span className="perk-dot green" />{t.perk2}</li>
          <li><span className="perk-dot blue" />{t.perk3}</li>
        </ul>

        <div className="dates">
          {t.issued} : {issued}<br />
          {t.expires} : {expire}
        </div>
      </div>

      {/* ===== WAVE FOOTER ===== */}
      <div className="wave-footer">
        <Wave />
      </div>

    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState(cities.fr[0]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[lang];

  const switchLang = (newLang: Lang) => {
    setLang(newLang);
    setCity(cities[newLang][0]);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const exportCard = async () => {
    const wrapper = document.getElementById('card-export');
    if (!wrapper) return;

    const { error } = await supabase
      .from('etudiants')
      .insert([{ nom: name, numero: number, ville: city }])
      .select();

    if (error) {
      console.error('Erreur Supabase:', error);
      alert(t.error);
      return;
    }

    await document.fonts.ready;

    try {
      const dataUrl = await toPng(wrapper, {
        pixelRatio: 3,
        width: 1560,
        height: 940,
        skipFonts: true,
      });

      // Téléchargement classique — fonctionne sur mobile ET desktop
      const link = document.createElement('a');
      link.download = 'carte-aem.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error('Erreur export:', err);
    }

    setName('');
    setNumber('');
    setCity(cities[lang][0]);
    setPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="app-container" dir={t.dir}>
      <Header lang={lang} onSwitchLang={switchLang} />

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <a href="#form" className="hero-cta">{t.heroCta}</a>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 Q360,100 720,50 Q1080,0 1440,50 L1440,100 L0,100 Z" fill="#1b3a6b" />
          </svg>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="how-section" id="how">
        <h2 className="section-title">{t.howTitle}</h2>
        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card" data-step="1">
            <div className="step-icon-wrap blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="13" y2="16" />
              </svg>
            </div>
            <h3>{t.step1Title}</h3>
            <p>{t.step1Desc}</p>
          </div>
          <div className="step-card" data-step="2">
            <div className="step-icon-wrap red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h3>{t.step2Title}</h3>
            <p>{t.step2Desc}</p>
          </div>
          <div className="step-card" data-step="3">
            <div className="step-icon-wrap green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3>{t.step3Title}</h3>
            <p>{t.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="about-section" id="about">
        <h2 className="section-title">{t.aboutTitle}</h2>
        <div className="about-content">
          <p>{t.aboutDesc1}</p>
          <p>{t.aboutDesc2}</p>
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="form-section" id="form">
        <div className="form">
          <h2>{t.title}</h2>
          <p className="subtitle">{t.subtitle}</p>

          <label>{t.photoLabel}</label>
          <div className="photo-upload" onClick={() => fileInputRef.current?.click()}>
            {photo ? (
              <img src={photo} className="photo-preview" alt="preview" />
            ) : (
              <>
                <span className="photo-upload-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#8899bb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </span>
                <span className="photo-upload-text">{t.photoText}</span>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          {photo && (
            <button className="btn-remove-photo" onClick={() => setPhoto(null)}>
              {t.removePhoto}
            </button>
          )}

          {success && <div className="toast">{t.success}</div>}

          <label>{t.nameLabel}</label>
          <input
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>{t.numberLabel}</label>
          <input
            placeholder={t.numberPlaceholder}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <label>{t.cityLabel}</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities[lang].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button onClick={exportCard} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{t.download}</span>
          </button>
        </div>
      </section>

      {/* ===== WRAPPER INVISIBLE — 0x0, overflow hidden ===== */}
      <div id="card-export-wrapper">
        <div id="card-export">
          <CardContent name={name} number={number} city={city} photo={photo} lang={lang} />
        </div>
      </div>

      <Footer lang={lang} />

    </div>
  );
}