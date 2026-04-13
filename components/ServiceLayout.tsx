'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Users,
  Play,
  Pause,
  Maximize,
  X
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
  servicePageContent?: any;
}

export default function ServiceLayout({ service, servicePageContent = {} }: ServiceLayoutProps) {
  const CategoryIcon = iconMap[service.category] || Target;

  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioScrollRef = useRef<HTMLDivElement>(null);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Audio Review Defaults
  const defaultAudioReviews = [
    { name: 'David L.', role: 'UX Designer', title: 'Secured a role at a top agency', duration: '1:24', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
    { name: 'Anita P.', role: 'Marketing Lead', title: 'Got my UK visa sponsored job', duration: '0:58', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', flag: 'https://flagcdn.com/w80/ie.png' },
    { name: 'John D.', role: 'Cloud Architect', title: 'Negotiated a 30% salary bump', duration: '2:15', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', flag: 'https://flagcdn.com/w80/in.png' },
    { name: 'Rachel M.', role: 'Data Scientist', title: 'Moved from academia to tech', duration: '1:45', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
  ];

  const audioReviewsData = service.audioReviews || servicePageContent?.audioReviews || defaultAudioReviews;

  // WhatsApp Defaults
  const resultsData = service.results || servicePageContent?.results || null;
  const resultsImages = (() => {
    const defaultImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
      src: `/testimonials/whatsapp${num}.jpeg`,
      flag: 'https://flagcdn.com/w80/in.png'
    }));

    if (resultsData?.images && Array.isArray(resultsData.images) && resultsData.images.length > 0) {
      return resultsData.images.map((item: any) => {
        if (typeof item === 'string') return { src: item, flag: 'https://flagcdn.com/w80/in.png' };
        return {
          src: item.src || item.image || '',
          flag: item.flag || 'https://flagcdn.com/w80/in.png'
        };
      }).filter((item: { src: string; flag: string }) => item.src);
    }

    const urls: string[] = [];
    const scan = (val: any) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        const isImagePattern = /\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)(\?.*)?$/i.test(trimmed) || 
                               (trimmed.startsWith('http') && (trimmed.includes('/photos/') || trimmed.includes('/img/')));
        if (isImagePattern) urls.push(trimmed);
      } else if (val && typeof val === 'object' && !Array.isArray(val)) {
        Object.entries(val).forEach(([k, v]) => {
          if (!['title', 'subtitle', 'heading', 'subHeading', 'description', 'text'].includes(k.toLowerCase())) scan(v);
        });
      } else if (Array.isArray(val)) val.forEach(scan);
    };
    scan(resultsData);
    
    if (urls.length > 0) {
      return urls
        .filter(src => src && !src.includes('[object'))
        .map(src => ({ src, flag: 'https://flagcdn.com/w80/in.png' }));
    }

    return defaultImages;
  })() as { src: string; flag: string }[];

  useEffect(() => {
    const scrollContainer = audioScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isAudioPaused) {
        if (
          Math.ceil(scrollContainer.scrollLeft) + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAudioPaused]);

  const toggleAudio = (idx: number, url: string) => {
    if (playingAudioIdx === idx) {
      audioRef.current?.pause();
      setPlayingAudioIdx(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      const audio = new Audio(url);
      audio.onended = () => setPlayingAudioIdx(null);
      audio.play().catch(e => console.log('Audio play failed:', e));
      audioRef.current = audio;
      setPlayingAudioIdx(idx);
    }
  };

  // Split results images into two columns
  const midPoint = Math.ceil(resultsImages.length / 2);
  const col1Images = resultsImages.slice(0, midPoint);
  const col2Images = resultsImages.slice(midPoint);

  return (
    <main className="min-h-screen selection:bg-purple-100 bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-0 lg:pt-40 lg:pb-0 overflow-hidden bg-gradient-to-br from-[#FEFCE8] via-[#FDF4FF] to-[#F0F9FF]">
        {/* Aurora blob blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-200/50 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[20%] w-[600px] h-[200px] rounded-full bg-pink-200/30 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[60vh] lg:min-h-[70vh]">
            <div className="flex flex-col items-start text-left pt-10 pb-16 lg:py-20 z-20">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A112B] tracking-tight leading-[1.1] max-w-2xl mb-8">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Right side WhatsApp Marquee */}
            <div className="relative hidden lg:block h-[600px] xl:h-[700px] w-full overflow-hidden mask-image-vertical">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FDF4FF] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F0F9FF] to-transparent z-10 pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-4 h-[200%] w-full rotate-2 transform-gpu pb-20">
                {/* Column 1: Top to Bottom */}
                <div className="flex flex-col gap-4 animate-marquee-vertical-reverse mt-[-50%] transform-gpu">
                  {[...col1Images, ...col1Images, ...col1Images].map((item, idx) => (
                    <div
                      key={`col1-${idx}`}
                      className="w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border border-purple-100 bg-white cursor-pointer group"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <div className="relative aspect-[3/4]">
                        {item.flag && (
                          <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110">
                            <img src={item.flag} alt="Country flag" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <img
                          src={item.src}
                          alt={`Student success story col 1`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                          <div className="bg-white rounded-full p-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Maximize className="w-4 h-4 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: Bottom to Top */}
                <div className="flex flex-col gap-4 animate-marquee-vertical transform-gpu">
                  {[...col2Images, ...col2Images, ...col2Images].map((item, idx) => (
                    <div
                      key={`col2-${idx}`}
                      className="w-full flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border border-purple-100 bg-white cursor-pointer group"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <div className="relative aspect-[3/4]">
                        {item.flag && (
                          <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-110">
                            <img src={item.flag} alt="Country flag" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <img
                          src={item.src}
                          alt={`Student success story col 2`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                          <div className="bg-white rounded-full p-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Maximize className="w-4 h-4 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Testimonials Section Right Below Hero */}
      <section className="bg-white py-12 lg:py-16 overflow-hidden border-b border-purple-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-left lg:text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D1B4D] tracking-tight">Hear it from our successful candidates</h2>
        </div>
        <div className="relative w-full">
          {/* Fade overlays for the edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={audioScrollRef}
            onMouseEnter={() => setIsAudioPaused(true)}
            onMouseLeave={() => setIsAudioPaused(false)}
            className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide px-4 md:px-0"
          >
            {[...audioReviewsData, ...audioReviewsData, ...audioReviewsData].map((audio: any, idx: number) => (
              <div 
                key={idx} 
                className="w-[320px] lg:w-[380px] flex-shrink-0 bg-white rounded-2xl p-4 border border-purple-100/60 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex items-stretch gap-4"
              >
                <div className="w-[80px] h-[80px] lg:w-[90px] lg:h-[90px] flex-shrink-0">
                  <img src={audio.avatar} alt={audio.name} className="w-full h-full rounded-xl object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full border border-gray-100 overflow-hidden shadow-sm bg-gray-50">
                    <img src={audio.flag} alt="Country flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="pr-8 min-w-0 pt-1">
                    <h3 className="font-extrabold text-[#2D1B4D] text-base leading-tight mb-0.5 truncate">{audio.name}</h3>
                    <p className="text-xs font-bold text-violet-600 truncate">{audio.role}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => toggleAudio(idx, audio.audioUrl)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        playingAudioIdx === idx ? 'border-purple-600 bg-purple-600 text-white shadow-md' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'
                      }`}
                    >
                      {playingAudioIdx === idx ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 ml-0.5 fill-current" />}
                    </button>
                    <div className="flex-1 flex items-center gap-1 h-3 overflow-hidden">
                      {[30, 60, 40, 80, 50, 90, 70, 40, 60, 100].map((h, i) => (
                        <div 
                          key={i} 
                          className={`w-1 rounded-full transition-all duration-300 ${playingAudioIdx === idx ? 'bg-purple-600 animate-pulse' : 'bg-violet-600 opacity-60'}`} 
                          style={{ height: playingAudioIdx === idx ? `${Math.max(20, h + (Math.sin(i) * 20))}%` : `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

      {/* WhatsApp Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImage} alt="Success story" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full transition-transform hover:scale-105" onClick={() => setSelectedImage(null)}><X className="w-5 h-5 text-gray-900" /></button>
          </div>
        </div>
      )}

      <QBayFooter />
    </main>
  );
}
