import { supabase } from './lib/supabase';

async function checkCmsContent() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('key, content')
    .eq('key', 'home')
    .single();

  if (error) {
    console.error('Error fetching home data:', error);
    return;
  }

  console.log('CMS HOME CONTENT:', JSON.stringify(data.content, null, 2));
}

checkCmsContent();
