'use client';

import './page.css';
import { supabase } from './supabaseClient';
import Header from './Header';
import Footer from './Footer';
import { useState, useRef } from 'react';
import { translations, cities } from './CardContent';

type Lang = 'fr' | 'ar';

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [name, setName] = useState('');
  const [city, setCity] = useState(cities.fr[0]);
  const [whatsapp, setWhatsapp] = useState('');
  const [dialCode, setDialCode] = useState<'+222' | '+212'>('+222');

  // Photo profil
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Capture paiement
  const [payment, setPayment] = useState<string | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const paymentInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Erreurs inline ──────────────────────────────────────────
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];

  const switchLang = (newLang: Lang) => {
    setLang(newLang);
    setCity(cities[newLang][0]);
    setErrors({});
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, photo: '' }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPaymentFile(file);
    const reader = new FileReader();
    reader.onload = () => setPayment(reader.result as string);
    reader.readAsDataURL(file);
    setErrors((prev) => ({ ...prev, payment: '' }));
  };

  // ── Validation ──────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const isFr = lang === 'fr';

    if (!photoFile) {
      errs.photo = isFr ? 'La photo est requise.' : 'الصورة مطلوبة.';
    }

    if (!name.trim()) {
      errs.name = isFr ? 'Le nom est requis.' : 'الاسم مطلوب.';
    } else if (/\d/.test(name)) {
      errs.name = isFr ? 'Le nom ne doit pas contenir de chiffres.' : 'لا يجب أن يحتوي الاسم على أرقام.';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = isFr ? 'Le numéro WhatsApp est requis.' : 'رقم واتساب مطلوب.';
    } else if (!/^[\d\s]+$/.test(whatsapp)) {
      errs.whatsapp = isFr ? 'Numéro invalide (chiffres uniquement).' : 'رقم غير صالح (أرقام فقط).';
    }

    if (!paymentFile) {
      errs.payment = isFr ? 'La capture de paiement est requise.' : 'صورة الدفع مطلوبة.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Upload ──────────────────────────────────────────────────
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { error } = await supabase.storage
      .from('card-requests')
      .upload(path, file, { contentType: file.type, upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from('card-requests').getPublicUrl(path);
    return data.publicUrl;
  };

  // ── Submit ──────────────────────────────────────────────────
  const submitRequest = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const [profileUrl, paymentUrl] = await Promise.all([
        uploadFile(photoFile!, `profiles/${uid}-${photoFile!.name}`),
        uploadFile(paymentFile!, `payments/${uid}-${paymentFile!.name}`),
      ]);

      const { error } = await supabase.from('card_requests').insert([
        {
          full_name: name.trim(),
          city,
          lang,
          whatsapp_number: `${dialCode}${whatsapp.trim().replace(/\s/g, '')}`,
          profile_image_url: profileUrl,
          payment_screenshot_url: paymentUrl,
        },
      ]);

      if (error) throw error;

      // Reset
      setName('');
      setCity(cities[lang][0]);
      setWhatsapp('');
      setPhoto(null);
      setPhotoFile(null);
      setPayment(null);
      setPaymentFile(null);
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (paymentInputRef.current) paymentInputRef.current.value = '';

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Style partagé pour les messages d'erreur ────────────────
  const errStyle: React.CSSProperties = {
    color: '#c8102e',
    fontSize: 11,
    fontWeight: 600,
    marginTop: -6,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  // ── Style partagé pour le bouton X ──────────────────────────
  const xBtnStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    top: -8,
    [side]: -8,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: '#c8102e',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
    zIndex: 10,
  });

  return (
    <div className="app-container" dir={t.dir}>
      <Header lang={lang} onSwitchLang={switchLang} />

      {/* ===== HERO ===== */}
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-section" id="how">
        <h2 className="section-title">{t.howTitle}</h2>
        <div className="steps-grid">
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
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <h3>{t.step3Title}</h3>
            <p>{t.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-section" id="about">
        <h2 className="section-title">{t.aboutTitle}</h2>
        <div className="about-content">
          <p>{t.aboutDesc1}</p>
          <p>{t.aboutDesc2}</p>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="form-section" id="form">
        <div className="form">
          <h2>{t.title}</h2>
          <p className="subtitle">{t.subtitle}</p>

          {/* ── Photo profil ────────────────────────────────── */}
          <label>{t.photoLabel}</label>
          <div
            className="photo-upload"
            style={{ borderColor: errors.photo ? '#c8102e' : undefined }}
            onClick={() => !photo && fileInputRef.current?.click()}
          >
            {photo ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={photo} className="photo-preview" alt="preview" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhoto(null);
                    setPhotoFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = ''; // ← ajouter
                  }}


                  style={xBtnStyle(lang === 'ar' ? 'left' : 'right')}
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
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
          {errors.photo && <span style={errStyle}>⚠ {errors.photo}</span>}

          {/* ── Nom ─────────────────────────────────────────── */}
          <label>{t.nameLabel}</label>
          <input
            placeholder={t.namePlaceholder}
            value={name}
            style={{ borderColor: errors.name ? '#c8102e' : undefined }}
            onChange={(e) => {
              // Interdit les chiffres dans le nom
              const val = e.target.value.replace(/[0-9]/g, '');
              setName(val);
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
          />
          {errors.name && <span style={errStyle}>⚠ {errors.name}</span>}

          {/* ── Ville ───────────────────────────────────────── */}
          <label>{t.cityLabel}</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities[lang].map((c) => <option key={c}>{c}</option>)}
          </select>

          {/* ── WhatsApp avec indicatif ──────────────────────── */}
          <label>{t.whatsappLabel}</label>
          <div style={{ display: 'flex', gap: 8, direction: 'ltr' }}>
            <select
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value as '+222' | '+212')}
              style={{ width: 'auto', flexShrink: 0, fontWeight: 700, direction: 'ltr' }}
            >
              <option value="+222">🇲🇷 +222</option>
              <option value="+212">🇲🇦 +212</option>
            </select>
            <input
              placeholder="36 42 71 79"
              value={whatsapp}
              style={{
                flex: 1,
                borderColor: errors.whatsapp ? '#c8102e' : undefined,
                textAlign: 'left',
              }}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9\s]/g, '');
                setWhatsapp(val);
                setErrors((prev) => ({ ...prev, whatsapp: '' }));
              }}
              type="tel"
              dir="ltr"
            />
          </div>
          {errors.whatsapp && <span style={errStyle}>⚠ {errors.whatsapp}</span>}

          {/* ── Capture paiement ─────────────────────────────── */}
          <label>{t.paymentLabel}</label>
          <div
            className="photo-upload"
            onClick={() => !payment && paymentInputRef.current?.click()}
            style={{
              borderColor: errors.payment ? '#c8102e' : payment ? '#00713a' : undefined,
            }}
          >
            {payment ? (
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <img
                  src={payment}
                  alt="payment"
                  style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8, objectFit: 'contain', display: 'block', margin: '0 auto' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPayment(null);
                    setPaymentFile(null);
                    if (paymentInputRef.current) paymentInputRef.current.value = ''; // ← ajouter
                  }}
                  style={xBtnStyle(lang === 'ar' ? 'left' : 'right')}
                  title="Supprimer"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <span className="photo-upload-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#8899bb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </span>
                <span className="photo-upload-text">{t.paymentText}</span>
              </>
            )}
          </div>
          <input
            ref={paymentInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePaymentChange}
          />
          {errors.payment && <span style={errStyle}>⚠ {errors.payment}</span>}

          {/* ── Bouton submit ────────────────────────────────── */}
          <button
            onClick={submitRequest}
            disabled={isSubmitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isSubmitting ? 0.85 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <span>{lang === 'fr' ? 'Envoi en cours...' : 'جارٍ الإرسال...'}</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>{t.download}</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* ── Toast fixe en bas (visible sans scroller) ──────── */}
      {success && (
        <div className="toast-fixed">
          <span>{t.success}</span>
          <span style={{ fontSize: 12, opacity: 0.85 }}>{t.successDesc}</span>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}