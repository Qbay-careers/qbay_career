import ServiceLayout from '@/components/ServiceLayout';
import { services } from '@/data/services';

export default function Page() {
  const service = services.find(s => s.slug === 'humanized-sop-guidance')!;
  return <ServiceLayout service={service} />;
}
