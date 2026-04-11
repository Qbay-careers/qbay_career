'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  MessageCircle,
  Clock,
  Target,
  Trophy,
  Users
} from 'lucide-react';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Service } from '@/data/services';

const iconMap: Record<string, any> = {
  'Placement Support': Target,
  'Application Management': Zap,
  'Healthcare Careers': ShieldCheck,
  'Skill Enhancement': Trophy,
  'Interview Prep': MessageCircle,
  'Personal Branding': Sparkles,
  'Documentation': Clock,
  'Experience Building': Users,
  'Stability & Growth': CheckCircle2,
};

interface ServiceLayoutProps {
  service: Service;
}

export default function ServiceLayout({ service }: ServiceLayoutProps) {
  const CategoryIcon = iconMap[service.category] || Target;

  return (
    <main className="min-h-screen selection:bg-purple-100" style={{ background: 'linear-gradient(135deg, #fefce8 0%, #fdf4ff 30%, #f0f9ff 60%, #fce7f3 100%)' }}>
      <QBayNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Aurora blob blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-200/50 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-pink-200/30 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A112B] tracking-tight leading-[1.1] max-w-4xl mb-8">
              {service.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-200 to-indigo-100 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl border border-white ring-8 ring-purple-50/30">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1A112B] mb-6">Expert Guidance. Proven Results.</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100/50 hover:bg-purple-50 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-[#2D1B4D]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 relative overflow-hidden border-y border-purple-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-purple-600 uppercase mb-4">Inside the Service</h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-[#1A112B]">Key Deliverables</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature: any, i) => {
              const title = typeof feature === 'string' ? feature : (feature?.title || `Deliverable ${i + 1}`);
              const description = typeof feature === 'string' 
                ? "Carefully tailored to ensure maximum success in your specific career path and market conditions." 
                : (feature?.description || "");
                
              return (
                <div 
                  key={i} 
                  className="group p-8 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <span className="text-lg font-bold">0{i + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#2D1B4D] mb-4">{title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-purple-200/30 blur-[100px] pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-yellow-200/40 blur-[80px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#1A112B] rounded-[2.5rem] p-8 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent pointer-events-none" />
            
            <h2 className="text-3xl sm:text-5xl font-bold mb-8 relative z-10">Ready to take the next step?</h2>
            <p className="text-lg text-purple-200/80 mb-10 max-w-2xl mx-auto relative z-10">
              Transform your career journey with expert guidance personalized just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white px-10 py-4 text-sm font-bold tracking-wide text-[#1A112B] transition-all hover:bg-purple-50 w-full sm:w-auto rounded-full"
              >
                Book your free consultancy
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="/"
                className="text-white font-bold px-10 py-4 hover:text-purple-300 transition-colors"
              >
                Back to all services
              </a>
            </div>
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
