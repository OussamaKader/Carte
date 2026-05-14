'use client';

import { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { createClient } from '@supabase/supabase-js';
import CardContent from '../CardContent';
import Header from '../Header';
import Footer from '../Footer';
import '../page.css';
import './page.css';

const supabaseUrl = 'https://mnevjsmexwgotqzecfcb.supabase.co';
const supabaseKey = 'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY';
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;
const showToast = (msg: string) => {
  const el = document.createElement('div');
  el.textContent = msg;
  Object.assign(el.style, {
    position: 'fixed', bottom: '32px', left: '50%',
    transform: 'translateX(-50%)',
    background: '#1b3a6b', color: '#fff',
    padding: '12px 24px', borderRadius: '12px',
    fontSize: '14px', fontWeight: '500',
    boxShadow: '0 8px 32px rgba(0,0,0,.25)',
    zIndex: '9999', whiteSpace: 'nowrap',
    animation: 'fadeInUp 0.3s ease',
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
};

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'aem-admin-2026';

type Lang = 'fr' | 'ar';
type Status = 'pending' | 'approved' | 'rejected';

type CardRequest = {
  id: string;
  full_name: string;
  member_number: string;
  city: string;
  lang: Lang;
  whatsapp_number: string;
  profile_image_url: string;
  payment_screenshot_url: string;
  status: Status;
  card_image_url: string | null;

  created_at: string;
};

const STATUS_LABELS: Record<Status, { fr: string; color: string }> = {
  pending: { fr: 'En attente', color: '#e8a020' },
  approved: { fr: 'Approuvée', color: '#16a34a' },
  rejected: { fr: 'Rejetée', color: '#dc2626' },
};

// ─── Auth gate ────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const tryLogin = () => {
    if (!pwd.trim()) return;
    setLoading(true);
    setTimeout(() => {
      if (pwd === ADMIN_PASSWORD) {
        sessionStorage.setItem('aem_admin', '1');
        onAuth();
      } else {
        setError(true);
        setLoading(false);
        setTimeout(() => setError(false), 1800);
      }
    }, 400);
  };

  return (
    <div className="auth-gate">
      <div className="auth-card">
        <div className="auth-rings">
          <div className="auth-ring auth-ring-1" />
          <div className="auth-ring auth-ring-2" />
        </div>
        <div className="auth-logo-wrap">
          <img src="/logo-aem.png" alt="AEMM" className="auth-logo" />
        </div>
        <div className="auth-title-block">
          <h1>Espace Admin</h1>
          <p>Accès réservé aux administrateurs AEMM</p>
        </div>
        <div className={`auth-input-wrap${error ? ' auth-shake' : ''}`}>
          <svg className="auth-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <input
            type="password"
            placeholder="Mot de passe administrateur"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
            className={`auth-input${error ? ' error' : ''}`}
            autoFocus
          />
        </div>
        {error && (
          <div className="auth-error-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Mot de passe incorrect
          </div>
        )}
        <button className="auth-btn" onClick={tryLogin} disabled={loading || !pwd.trim()}>
          {loading ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Vérification...
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Se connecter
            </>
          )}
        </button>
        <div className="auth-back-link">
          <a href="/">← Retour au site</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main admin page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [requests, setRequests] = useState<CardRequest[]>([]);
  const [filter, setFilter] = useState<Status | 'all'>('pending');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<CardRequest | null>(null);

  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [renderRequest, setRenderRequest] = useState<CardRequest | null>(null);
  const [renderPhoto, setRenderPhoto] = useState<string | null>(null);
  const [logoBase64, setLogoBase64] = useState('/logo-aem.png');

  const [localCardUrls, setLocalCardUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('aem_admin') === '1';
    if (!isAuthed) return;
    setAuthed(true);
    fetchRequests();
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/logo-aem.png')
      .then((r) => r.blob())
      .then((blob) => new Promise<string>((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result as string);
        reader.onerror = rej;
        reader.readAsDataURL(blob);
      }))
      .then(setLogoBase64)
      .catch(() => { });
    fetchRequests();
  }, [authed]);

  const handleLogout = () => {
    sessionStorage.removeItem('aem_admin');
    setAuthed(false);
  };

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase!
      .from('card_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) { console.error('Erreur fetch:', error); setLoading(false); return; }
    if (data) setRequests(data as CardRequest[]);
    setLoading(false);
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase!
      .from('card_requests')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) { alert('Erreur lors du rejet. Réessayez.'); return; }

    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
    setSelected((prev) => prev && prev.id === id ? { ...prev, status: 'rejected' } : prev);
  };

  // ── Générer PDF depuis dataUrl PNG ────────────────────────────────────────
  const generatePDF = async (request: CardRequest, dataUrl: string): Promise<string> => {
    // Carte : 1560 x 940 px → ratio landscape
    // On utilise mm : 297 x 178.8mm (A4 landscape légèrement rognée)
    const pdfW = 297;
    const pdfH = Math.round((940 / 1560) * 297); // ≈ 179mm

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pdfW, pdfH],
    });

    // Image pleine page, sans marges
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfW, pdfH);

    const pdfBlob = pdf.output('blob');

    // Upload PDF sur Supabase Storage
    const pdfPath = `cards/${request.id}.pdf`;
    await supabase!.storage
      .from('card-requests')
      .upload(pdfPath, pdfBlob, { contentType: 'application/pdf', upsert: true });

    const { data: { publicUrl } } = supabase!.storage
      .from('card-requests')
      .getPublicUrl(pdfPath);

    return publicUrl;
  };

  // ── APPROVE + GENERATE ────────────────────────────────────────────────────
  const handleGenerate = async (request: CardRequest) => {
    if (request.status === 'approved' && request.card_image_url) {
      alert('Cette carte est déjà approuvée et générée.');
      return;
    }
    setGeneratingId(request.id);

    // Charger la photo en base64
    let photoB64: string | null = null;
    try {
      const res = await fetch(request.profile_image_url);
      const blob = await res.blob();
      photoB64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch { }

    setRenderPhoto(photoB64);
    setRenderRequest(request);

    await new Promise((r) => setTimeout(r, 350));

    const element = document.getElementById('admin-card-export');
    if (!element) { setGeneratingId(null); return; }

    await document.fonts.ready;

    try {
      // Premier rendu pour "chauffer" les fonts
      await toPng(element, { pixelRatio: 3, skipFonts: true });

      // Rendu final HD
      const dataUrl = await toPng(element, {
        pixelRatio: 3,
        width: 1560,
        height: 940,
        backgroundColor: '#dde1e8',
        skipFonts: true,
      });

      // Télécharger PNG localement
      const link = document.createElement('a');
      link.download = `carte-${request.full_name.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();

      let pngUrl: string | null = null;
      let pdfUrl: string | null = null;

      try {
        // Upload PNG
        const res2 = await fetch(dataUrl);
        const blob2 = await res2.blob();
        const cardPath = `cards/${request.id}.png`;
        await supabase!.storage
          .from('card-requests')
          .upload(cardPath, blob2, { contentType: 'image/png', upsert: true });
        const { data: { publicUrl: pu } } = supabase!.storage
          .from('card-requests')
          .getPublicUrl(cardPath);
        pngUrl = pu;



        // Sauvegarder dans Supabase
        await supabase!
          .from('card_requests')
          .update({
            status: 'approved',
            card_image_url: pngUrl,
          })
          .eq('id', request.id);

      } catch (uploadErr) {
        console.error('Upload error:', uploadErr);
        await supabase!
          .from('card_requests')
          .update({ status: 'approved' })
          .eq('id', request.id);
      }

      // Mise à jour locale — on stocke le PDF URL pour WhatsApp
      if (pdfUrl) {
        setLocalCardUrls((prev) => ({ ...prev, [request.id]: pdfUrl! }));
      }

      setRequests((prev) =>
        prev.map((r) =>
          r.id === request.id
            ? { ...r, status: 'approved', card_image_url: pngUrl ?? r.card_image_url, }
            : r
        )
      );
      setSelected((prev) =>
        prev && prev.id === request.id
          ? { ...prev, status: 'approved', card_image_url: pngUrl ?? prev.card_image_url, }
          : prev
      );

    } catch (err) {
      console.error('Generate error:', err);
      alert('Erreur lors de la génération. Réessayez.');
    }

    setRenderRequest(null);
    setRenderPhoto(null);
    setGeneratingId(null);
  };

  // ── WHATSAPP — envoie le lien PDF ─────────────────────────────────────────
  const openWhatsApp = (request: CardRequest) => {
    const num = request.whatsapp_number.replace(/[\s\-\(\)\+]/g, '');

    if (!request.card_image_url && !localCardUrls[request.id]) {
      alert('Générez la carte d\'abord.');
      return;
    }

    const cartePageUrl = `https://oussamakader.best/carte/${request.id}`;

    const message = `Bonjour ${request.full_name} 👋\nVoici votre carte de membre AEMM officielle ✅\n\n${cartePageUrl}`;

    window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`, '_blank');
  };
  // ─────────────────────────────────────────────────────────────────────────
  const filtered = filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  if (!isSupabaseConfigured) {
    return (
      <>
        <Header isAdminAuthed={false} />
        <div className="admin-wrap" style={{ padding: 24 }}>
          <h1>Configuration manquante</h1>
          <p>Les variables d'environnement Supabase ne sont pas définies.</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header isAdminAuthed={authed} onAdminLogout={handleLogout} />

      <div className="admin-wrap" style={{ flex: 1 }}>
        {/* Stats / filter bar */}
        <div className="admin-stats">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
            <button
              key={s}
              className={`stat-chip${filter === s ? ' active' : ''} stat-${s}`}
              onClick={() => setFilter(s)}
            >
              <span className="stat-count">{counts[s]}</span>
              <span className="stat-label">
                {s === 'all' ? 'Toutes' : STATUS_LABELS[s]?.fr}
              </span>
            </button>
          ))}
          <button className="btn-refresh" onClick={fetchRequests} title="Actualiser" style={{ marginLeft: 'auto' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </button>
        </div>

        {/* Cards grid */}
        <main className="admin-main">
          {loading ? (
            <div className="admin-loading">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1b3a6b" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbc3d4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p>Aucune demande</p>
            </div>
          ) : (
            <div className="requests-grid">
              {filtered.map((req) => (
                <div key={req.id} className="req-card" onClick={() => setSelected(req)}>
                  <div className="req-card-top">
                    <img src={req.profile_image_url} alt={req.full_name} className="req-avatar" />
                    <div className="req-info">
                      <div className="req-name">{req.full_name}</div>
                      <div className="req-meta">N° {req.member_number} · {req.city}</div>
                      <div className="req-meta">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="#25d366">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.951.996-3.624-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                        {' '}{req.whatsapp_number}
                      </div>
                    </div>
                    <span
                      className="req-status-badge"
                      style={{ background: `${STATUS_LABELS[req.status].color}18`, color: STATUS_LABELS[req.status].color }}
                    >
                      {STATUS_LABELS[req.status].fr}
                    </span>
                  </div>
                  <div className="req-date">{fmt(req.created_at)}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="modal-drawer-header">
              <img src={selected.profile_image_url} alt={selected.full_name} className="modal-avatar" />
              <div className="modal-header-info">
                <h2>{selected.full_name}</h2>
                <div className="modal-meta">N° {selected.member_number} · {selected.city} · {selected.lang.toUpperCase()}</div>
                <span
                  className="req-status-badge"
                  style={{ background: `${STATUS_LABELS[selected.status].color}22`, color: STATUS_LABELS[selected.status].color }}
                >
                  {STATUS_LABELS[selected.status].fr}
                </span>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <div className="modal-section-title">Informations</div>
                <div className="modal-section-body">
                  <div className="modal-info-row">
                    <div className="modal-info-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a6480" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div className="modal-info-label">Nom complet</div>
                      <div className="modal-info-value">{selected.full_name}</div>
                    </div>
                  </div>
                  <div className="modal-info-row">
                    <div className="modal-info-icon" style={{ background: '#f0fdf4' }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="#25d366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.951.996-3.624-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                    <div>
                      <div className="modal-info-label">WhatsApp</div>
                      <div className="modal-info-value" style={{ color: '#16a34a' }}>{selected.whatsapp_number}</div>
                    </div>
                  </div>
                  <div className="modal-info-row">
                    <div className="modal-info-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a6480" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="modal-info-label">Ville · Langue</div>
                      <div className="modal-info-value">{selected.city} · {selected.lang.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">Capture de paiement</div>
                <div className="modal-section-body">
                  <a href={selected.payment_screenshot_url} target="_blank" rel="noreferrer">
                    <img src={selected.payment_screenshot_url} alt="Paiement" className="modal-payment-img" />
                  </a>
                </div>
              </div>

              {/* Liens carte PNG + PDF */}
              {(selected.card_image_url || localCardUrls[selected.id]) && (
                <div className="modal-section">
                  <div className="modal-section-title">Carte générée</div>
                  <div className="modal-section-body">
                    <a
                      href={localCardUrls[selected.id] || selected.card_image_url!}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-card-link"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Voir la carte
                    </a>
                  </div>
                </div>
              )}

              <div className="modal-date">Soumis le {fmt(selected.created_at)}</div>
            </div>

            {/* Footer actions */}
            <div className="modal-footer">
              {selected.status === 'pending' && (
                <button className="btn-reject" onClick={() => handleReject(selected.id)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Rejeter
                </button>
              )}

              {selected.status !== 'approved' && (
                <button className="btn-generate" onClick={() => handleGenerate(selected)} disabled={generatingId === selected.id}>
                  {generatingId === selected.id ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Génération...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Approuver &amp; Générer
                    </>
                  )}
                </button>
              )}

              {selected.status === 'approved' && (
                <button className="btn-whatsapp btn-install" onClick={() => openWhatsApp(selected)}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="white" style={{ flexShrink: 0 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.951.996-3.624-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  Envoyer WhatsApp
                </button>
              )}
            </div>

          </div>
        </div >
      )
      }

      {/* Hidden card renderer */}
      <div
        id="admin-card-export-wrapper"
        style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}
      >
        <div
          id="admin-card-export"
          style={{ width: 1560, height: 940, background: '#dde1e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {renderRequest && (
            <CardContent
              name={renderRequest.full_name}
              whatsapp={renderRequest.whatsapp_number}
              city={renderRequest.city}
              photo={renderPhoto || renderRequest.profile_image_url}
              lang={renderRequest.lang}
              logoSrc={logoBase64}
            />
          )}
        </div>
      </div>

      <Footer />
    </div >
  );
}