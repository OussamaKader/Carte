import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mnevjsmexwgotqzecfcb.supabase.co',
  'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY'
);

export default async function CartePage({ params }: { params: { id: string } }) {
  const { data } = await supabase
    .from('card_requests')
    .select('full_name, card_image_url')
    .eq('id', params.id)
    .single();

  if (!data?.card_image_url) {
    return <div style={{ textAlign: 'center', padding: 40 }}>Carte introuvable</div>;
  }

  return (
    <html>
      <head>
        <title>Carte AEMM — {data.full_name}</title>
        <meta property="og:image" content={data.card_image_url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: #dde1e8;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: sans-serif;
          }
          .title {
            color: #1b3a6b;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
            text-align: center;
          }
          img {
            width: 100%;
            max-width: 900px;
            border-radius: 16px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          }
          a {
            margin-top: 20px;
            background: #1b3a6b;
            color: white;
            padding: 12px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </head>
      <body>
        <div className="title">Carte de membre AEMM — {data.full_name}</div>
        <img src={data.card_image_url} alt={`Carte ${data.full_name}`} />
        <a href={data.card_image_url} download={`carte-AEMM-${data.full_name}.png`}>
          ⬇ Télécharger ma carte
        </a>
      </body>
    </html>
  );
}