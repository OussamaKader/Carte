import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mnevjsmexwgotqzecfcb.supabase.co',
  'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY'
);

export default async function CartePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const { data } = await supabase
    .from('card_requests')
    .select('full_name, card_image_url')
    .eq('id', id)
    .single();

  if (!data?.card_image_url) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', height: '100vh',
        fontFamily: 'sans-serif', color: '#1b3a6b',
        background: '#dde1e8',
      }}>
        Carte introuvable
      </div>
    );
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: linear-gradient(135deg, #1b3a6b 0%, #0d2a5e 50%, #1b3a6b 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          font-family: 'Segoe UI', sans-serif;
        }

        .wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          width: 100%;
          max-width: 960px;
        }

        .header {
          text-align: center;
        }

        .header .badge {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.9);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 12px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .header h1 {
          color: white;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .header p {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
        }

        .card-wrap {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
        }

        .card-wrap img {
          width: 100%;
          height: auto;
          display: block;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        .btn-download {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: white;
          padding: 14px 32px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(37,211,102,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .btn-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,211,102,0.45);
        }

        .footer-text {
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          text-align: center;
        }
      `}</style>

      <div className="wrap">
        <div className="header">
          <div className="badge">AEMM — Carte Officielle</div>
          <h1>{data.full_name}</h1>
          <p>Association des Étudiants Mauritaniens au Maroc</p>
        </div>

        <div className="card-wrap">
          <img
            src={`${data.card_image_url}?quality=100`}
            alt={`Carte ${data.full_name}`}
          />
        </div>

        <a
          href={data.card_image_url}
          download={`carte-AEMM-${data.full_name}.png`}
          target="_blank"
          rel="noreferrer"
          className="btn-download"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Télécharger ma carte
        </a>

        <p className="footer-text">
          Cette carte est officielle et générée par l'AEMM
        </p>
      </div>
    </>
  );
}