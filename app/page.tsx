import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export const revalidate = 0; // Disable caching to fetch updated data instantly

export default async function HomePage() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('key, content');

  if (error) {
    console.error('Error fetching home data on server:', error);
  }

  // Separate home data from other keys
  const homeItem = (data || []).find(item => item.key === 'home');
  const otherItems = (data || []).filter(item => item.key !== 'home');

  // Build initialData: Home content is base, others overwrite
  const initialData = {
    ...(homeItem?.content || {}),
    ...otherItems.reduce((acc: any, item: any) => ({
      ...acc,
      [item.key]: item.content
    }), {})
  };

  console.log('Server: initialData prepared with keys:', Object.keys(initialData));

  return <HomeClient initialData={initialData} />;
}

