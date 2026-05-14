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

  const name = data.full_name;
  const cardUrl = data.card_image_url;

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #dde1e8;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'Segoe UI', sans-serif;
          gap: 20px;
        }
        .name {
          color: #1b3a6b;
          font-size: 15px;
          font-weight: 600;
          text-align: center;
        }
        .card-wrap {
          width: 100%;
          max-width: 860px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.12);
        }
        .card-wrap img {
          width: 100%;
          height: auto;
          display: block;
        }
        .btn {
          background: #1b3a6b;
          color: white;
          border: none;
          padding: 13px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Segoe UI', sans-serif;
        }
      `}</style>

      <p className="name">Carte de membre — {name}</p>

      <div className="card-wrap">
        <img src={cardUrl} alt={`Carte ${name}`} />
      </div>

      {/* Bouton téléchargement direct sans ouvrir d'onglet */}
      <button
        className="btn"
        onClick={async () => {
          const res = await fetch(cardUrl);
          const blob = await res.blob();
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `carte-AEMM-${name}.png`;
          a.click();
          URL.revokeObjectURL(a.href);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Télécharger ma carte
      </button>
    </>
  );
}