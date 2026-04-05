import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export const revalidate = 0; // Disable caching to fetch updated data instantly

export default async function HomePage() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('key, content')
    .in('key', ['home', 'services']);

  if (error) {
    console.error('Error fetching home data on server:', error);
  }

  const homeData = data?.find(d => d.key === 'home')?.content || {};
  const servicesData = data?.find(d => d.key === 'services')?.content || [];

  console.log('Fetched homeData from DB:', JSON.stringify(homeData).slice(0, 500) + '...');
  
  const initialData = {
    ...homeData,
    services: servicesData
  };

  return <HomeClient initialData={initialData} />;
}

