import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdate() {
  console.log("Testing update to global settings...");
  const { data: readData, error: readError } = await supabase.from('cms_content').select('content').eq('key', 'global').single();
  
  if (readError) {
    console.error("Read Error:", readError);
    return;
  }
  
  let content = readData.content;
  content.test_field = "Test " + Date.now();
  
  const { data, error } = await supabase.from('cms_content').update({ content }).eq('key', 'global').select();
  
  if (error) {
    console.error("Update Error:", error);
  } else {
    console.log("Update Success:", data);
  }
}

testUpdate();
