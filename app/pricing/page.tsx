import { supabase } from '@/lib/supabase';
import PricingClient from './PricingClient';
import { Metadata } from 'next';

export const revalidate = 0; // Disable caching to fetch updated data instantly

export const metadata: Metadata = {
  title: 'Pricing - QBay Careers',
  description: 'Choose the best plan for your career advancement. Transparent pricing for our job application services.',
};

export default async function PricingPage() {
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'pricing')
    .single();

  if (error) {
    console.error('Error fetching pricing data on server:', error);
  }

  const initialData = data?.content || {};

  return <PricingClient initialData={initialData} />;
}
