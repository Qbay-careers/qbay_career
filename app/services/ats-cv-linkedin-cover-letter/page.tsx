import ServiceLayout from '@/components/ServiceLayout';
import { services } from '@/data/services';

export default function Page() {
  const service = services.find(s => s.slug === 'ats-cv-linkedin-cover-letter')!;
  return <ServiceLayout service={service} />;
}
