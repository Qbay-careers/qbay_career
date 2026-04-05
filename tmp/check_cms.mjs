import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkContent() {
  const { data, error } = await supabase.from('cms_content').select('key, content');
  if (error) {
    console.error(error);
  } else {
    data.forEach(item => {
      console.log(`Key: ${item.key}`);
      if (typeof item.content === 'object' && item.content !== null) {
        console.log(`Content keys: ${Object.keys(item.content).join(', ')}`);
      } else {
        console.log(`Content type: ${typeof item.content}`);
      }
    });
  }
}

checkContent();
