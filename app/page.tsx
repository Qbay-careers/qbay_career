import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

export const revalidate = 300; // Cache for 5 minutes — reduces serverless invocations significantly

export default async function HomePage() {
  // Define relevant keys for the home page to avoid over-fetching
  const relevantKeys = [
    'home', 'hero', 'services', 'servicesSection', 'framework', 'frameworkSection',
    'consultation', 'results', 'audioReviews', 'trustpilotReviews', 'testimonials',
    'clientLove', 'negativeReviews', 'finalCTA', 'founderLetter', 'faq', 'whatsapp_popup'
  ];

  const { data, error } = await supabase
    .from('cms_content')
    .select('key, content')
    .in('key', relevantKeys);

  if (error) {
    console.error('Error fetching home data on server:', error);
  }

  // Build initialData: 'home' key is the base, others extend/overwrite
  const cmsMap = (data || []).reduce((acc: any, item: any) => ({
    ...acc,
    [item.key]: item.content
  }), {});

  const initialData = {
    ...(cmsMap.home || {}),
    ...cmsMap
  };

  console.log('Server: initialData prepared with keys:', Object.keys(initialData));

  return <HomeClient initialData={initialData} />;
}

