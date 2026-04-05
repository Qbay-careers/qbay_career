import { supabase } from '@/lib/supabase';
import ServiceLayout from '@/components/ServiceLayout';
import { services as defaultServices } from '@/data/services';
import { notFound } from 'next/navigation';

export const revalidate = 0; // Disable caching to fetch updated data instantly

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch all services from CMS
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'services')
    .single();

  if (error) {
    console.error('Error fetching services CMS data:', error);
  }

  const cmsServices = Array.isArray(data?.content) ? data?.content : [];

  // Find the exact service matching the slug
  // Try CMS data first, fall back to static data
  let service = cmsServices.find((s: any) => s.slug === slug);

  if (!service) {
    service = defaultServices.find((s) => s.slug === slug);
  }

  if (!service) {
    notFound();
  }

  return <ServiceLayout service={service} />;
}
