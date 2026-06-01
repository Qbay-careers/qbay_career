const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => {
  const line = envFile.split('\n').find(l => l.trim().startsWith(key));
  return line ? line.split('=')[1].trim() : null;
};

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

async function run() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'services')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  const list = data.content.map(s => ({
    title: s.title,
    slug: s.slug,
    category: s.category
  }));
  console.log(JSON.stringify(list, null, 2));
}

run();
