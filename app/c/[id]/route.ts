import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mnevjsmexwgotqzecfcb.supabase.co',
  'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY'
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabase
    .from('card_requests')
    .select('id')
    .eq('short_code', id)
    .single();

  if (!data) {
    return NextResponse.redirect('https://oussamakader.best');
  }

  return NextResponse.redirect(`https://oussamakader.best/carte/${data.id}`);
}