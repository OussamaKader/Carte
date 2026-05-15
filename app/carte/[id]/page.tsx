import { createClient } from '@supabase/supabase-js';
import CarteClient from './CarteClient';

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
    .select('full_name, card_image_url, lang')
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
    <CarteClient
      name={data.full_name}
      cardUrl={data.card_image_url}
      lang={data.lang}
    />
  );
}