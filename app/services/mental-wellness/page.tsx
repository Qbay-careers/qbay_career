import ServiceLayout from '@/components/ServiceLayout';
import { services } from '@/data/services';

export default function Page() {
  const service = services.find(s => s.slug === 'mental-wellness')!;
  return <ServiceLayout service={service} />;
}
