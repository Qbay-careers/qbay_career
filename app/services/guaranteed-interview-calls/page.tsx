import ServiceLayout from '@/components/ServiceLayout';
import { services } from '@/data/services';

export default function Page() {
  const service = services.find(s => s.slug === 'guaranteed-interview-calls')!;
  return <ServiceLayout service={service} />;
}
