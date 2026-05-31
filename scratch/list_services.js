const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => envFile.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim();

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function listAllServices() {
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
  if (!services || services.length === 0) {
    console.log('No services found in the database.');
    return;
  }

  const result = services.map(s => ({
    title: s.title,
    description: s.description || s.desc || '',
    slug: s.slug
  }));

  console.log(JSON.stringify(result, null, 2));
}

listAllServices();
