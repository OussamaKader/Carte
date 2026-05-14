import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mnevjsmexwgotqzecfcb.supabase.co',
  'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY'
);

export default async function CartePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { data } = await supabase
    .from('card_requests')
    .select('full_name, card_image_url')
    .eq('id', params.id)
    .single();

  if (!data?.card_image_url) {
    return (
      <div style={{ 
        display: 'flex', alignItems: 'center', 
        justifyContent: 'center', height: '100vh',
        fontFamily: 'sans-serif', color: '#1b3a6b'
      }}>
        Carte introuvable
      </div>
    );
  }

  return (
    <div style={{
      background: '#dde1e8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'sans-serif',
      gap: '20px',
    }}>
      <p style={{ color: '#1b3a6b', fontWeight: 600, fontSize: 16, margin: 0 }}>
        Carte de membre AEMM — {data.full_name}
      </p>

      <img
        src={data.card_image_url}
        alt={`Carte ${data.full_name}`}
        style={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
        }}
      />

      <a
        href={data.card_image_url}
        download={`carte-AEMM-${data.full_name}.png`}
        target="_blank"
        rel="noreferrer"
        style={{
          background: '#1b3a6b',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        ⬇ Télécharger ma carte
      </a>
    </div>
  );
}