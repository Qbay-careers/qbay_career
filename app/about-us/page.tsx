import { supabase } from '@/lib/supabase';
import AboutClient from './AboutClient';

export const revalidate = 0; // Disable caching

export default async function AboutUsPage() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'about')
    .single();

  if (error) {
    console.error('Error fetching about us data:', error);
  }

  const initialData = data?.content || {};

  return <AboutClient initialData={initialData} />;
}
