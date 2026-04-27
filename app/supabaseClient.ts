import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mnevjsmexwgotqzecfcb.supabase.co';
const supabaseKey = 'sb_publishable_WpIlZdCOwCAbzR7bOKeNHA_dAuzPNzY';

export const supabase = createClient(supabaseUrl, supabaseKey);