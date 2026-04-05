import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export const revalidate = 0; // Disable caching to fetch updated data instantly

export default async function HomePage() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'home')
    .single();

  if (error) {
    console.error('Error fetching home data on server:', error);
  }

  const initialData = data?.content || null;

  return <HomeClient initialData={initialData} />;
}
