const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => envFile.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim();

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function checkWeApplyPricing() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'services')
    .single();

  if (error) {
    console.error('Error fetching services:', error);
    return;
  }

  const services = data.content;
  const weApply = services.find(s => s.slug === 'we-apply-for-you');
  if (!weApply) {
    console.log('we-apply-for-you not found.');
    return;
  }

  console.log('we-apply-for-you pricing:', JSON.stringify(weApply.pricing, null, 2));
}

checkWeApplyPricing();
