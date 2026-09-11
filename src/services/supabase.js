import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hfzdeurrdixkgabtbuzd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_AGjBs3F-HNf6f1w_duLdog_dnyU_GG1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);