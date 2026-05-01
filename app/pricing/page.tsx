import { supabase } from '@/lib/supabase';
import PricingClient from './PricingClient';
import { Metadata } from 'next';

export const revalidate = 300; // Cache for 5 minutes — reduces serverless invocations significantly

export const metadata: Metadata = {
  title: 'Pricing - QBay Careers',
  description: 'Choose the best plan for your career advancement. Transparent pricing for our job application services.',
};

export default async function PricingPage() {
  const [pricingRes, homeRes, trustpilotRes, audioRes, testimonialsRes] = await Promise.all([
    supabase.from('cms_content').select('content').eq('key', 'pricing').single(),
    supabase.from('cms_content').select('content').eq('key', 'home').single(),
    supabase.from('cms_content').select('content').eq('key', 'trustpilotReviews').single(),
    supabase.from('cms_content').select('content').eq('key', 'audioReviews').single(),
    supabase.from('cms_content').select('content').eq('key', 'testimonials').single()
  ]);

  const initialPricingData = pricingRes.data?.content || {};
  const initialHomeData = homeRes.data?.content || {};
  const trustpilotData = trustpilotRes.data?.content || null;
  const audioData = audioRes.data?.content || null;
  const testimonialsData = testimonialsRes.data?.content || null;

  return (
    <PricingClient 
      initialPricingData={initialPricingData} 
      initialHomeData={initialHomeData}
      initialTrustpilotData={trustpilotData}
      initialAudioData={audioData}
      initialTestimonialsData={testimonialsData}
    />
  );
}
