const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => envFile.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim();

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function checkPricing() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'pricing')
    .single();

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log('Type of content:', typeof data.content);
  console.log('Is Array?', Array.isArray(data.content));
  console.log('Keys:', Object.keys(data.content));
  console.log('Content snippet:', JSON.stringify(data.content, null, 2));
}

checkPricing();
