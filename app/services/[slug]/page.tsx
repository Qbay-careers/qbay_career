import { supabase } from '@/lib/supabase';
import ServiceLayout from '@/components/ServiceLayout';
import { services as defaultServices } from '@/data/services';
import { notFound } from 'next/navigation';

export const revalidate = 300; // Cache for 5 minutes — reduces serverless invocations significantly

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch all content from CMS
  const { data, error } = await supabase
    .from('cms_content')
    .select('key, content')
    .in('key', ['services', 'service_details_page', 'pricing']); // Fetch pricing data too

  if (error) {
    console.error('Error fetching CMS data:', error);
  }

  const servicesData = data?.find(item => item.key === 'services')?.content;
  const serviceDetailsData = data?.find(item => item.key === 'service_details_page')?.content || {};
  const pricingData = data?.find(item => item.key === 'pricing')?.content || {};

  const cmsServices: any[] = Array.isArray(servicesData) ? servicesData : [];

  // Find the exact service matching the slug
  let service = cmsServices.find((s: any) => s.slug === slug);

  if (!service) {
    service = defaultServices.find((s) => s.slug === slug);
  }

  if (!service) {
    notFound();
  }

  const pricingToUse = service.pricing || pricingData;
  return <ServiceLayout service={service} servicePageContent={serviceDetailsData} pricingData={pricingToUse} />;
}
