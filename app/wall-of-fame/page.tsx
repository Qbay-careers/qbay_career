'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Star,
  Play,
  Pause,
  Quote,
  Award,
  Maximize,
  X,
  ArrowRight,
  Info,
  ChevronDown,
  BadgeCheck,
  Globe,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { supabase } from '@/lib/supabase';

// Reuse constants and helpers from HomeClient (normally these should be in a shared utils/constants file)
const defaultClientTestimonials = [
  {
    name: 'Sophia Martinez',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'Balancing work and job applications was exhausting. Each application felt repetitive and draining. I almost gave up after weeks of no responses. But once I got structured support and a smarter strategy, everything changed. Within weeks, interviews started lining up. The clarity and consistency made all the difference. I finally felt confident and supported throughout the process.',
    rating: 5,
  },
  {
    name: 'Daniel Brooks',
    role: 'Marketing Analyst',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'Moving to a new country meant starting from scratch. I didn\'t understand how the hiring process worked here. Applications went unanswered and I felt stuck. After getting guidance and optimizing my approach, I started seeing real traction. Recruiters began reaching out. In just one month, I secured multiple offers and negotiated a better package than I expected.',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Software Developer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'After facing a sudden layoff, I had limited time to secure a new role. The pressure was intense. Instead of applying randomly, I followed a focused and aggressive strategy. The results were unbelievable. Within four weeks, I received three strong offers and increased my salary significantly. The support system kept me motivated and organized.',
    rating: 5,
  },
];

const defaultTrustpilotReviews = [
  { name: 'James W.', title: 'Outstanding support from start to finish', content: 'They guided me through every step of the process. I landed a senior role faster than I expected.', rating: 5, time: '4 days ago' },
  { name: 'Emily C.', title: 'Best career investment', content: 'Worth every penny. The 1:1 coaching gave me the confidence I lacked during technical interviews.', rating: 5, time: '2 weeks ago' },
  { name: 'Rahul M.', title: 'Highly professional and effective', content: 'Their market insights are brilliant. I secured two competing offers thanks to their negotiation coaching.', rating: 5, time: '1 month ago' },
  { name: 'Anna K.', title: 'Life-changing career guidance', content: 'I transitioned to a completely new industry with their help. The support system is unmatched.', rating: 5, time: '2 months ago' },
  { name: 'Sophie L.', title: 'Incredible resume overhaul', content: 'My callback rate jumped from 0% to 40% after they rewrote my CV and LinkedIn profile.', rating: 5, time: '3 months ago' },
  { name: 'Daniel P.', title: 'Helped me relocate smoothly', content: 'Got a sponsored job in the UK. Their guidance on visa processes and international interviews was vital.', rating: 5, time: '3 months ago' }
];

const defaultAudioReviews = [
  { name: 'David L.', role: 'UX Designer', title: 'Secured a role at a top agency', duration: '1:24', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'Anita P.', role: 'Marketing Lead', title: 'Got my UK visa sponsored job', duration: '0:58', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', flag: 'https://flagcdn.com/w80/ie.png' },
  { name: 'John D.', role: 'Cloud Architect', title: 'Negotiated a 30% salary bump', duration: '2:15', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', flag: 'https://flagcdn.com/w80/in.png' },
  { name: 'Rachel M.', role: 'Data Scientist', title: 'Moved from academia to tech', duration: '1:45', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'Kevin B.', role: 'Product Manager', title: 'Landed 3 offers in 2 weeks', duration: '1:10', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', flag: 'https://flagcdn.com/w80/ae.png' },
  { name: 'Linda V.', role: 'Financial Analyst', title: 'Overcame career stagnation', duration: '2:05', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', flag: 'https://flagcdn.com/w80/ie.png' }
];

const defaultNegativeReviews = [
  {
    name: 'James',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150',
    title: 'Associates are from India',
    content: 'They hire India based interns to do the applying who don\'t even speak english.',
    date: 'Dec 2025',
    reply: 'That\'s correct and we\'re very transparent about it. QBay Careers is a human assistant service... Our assistants are trained to handle the grunt and operational work.',
    rating: 1
  },
  {
    name: 'David',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150',
    title: 'Using AI for Customizing Resumes',
    content: 'They use Gemini/ChatGPT to write the cover letter and tailor resumes. Which doesn\'t make sense for all jobs.. writing the same content by just changing job title... that any free ai can.',
    date: 'Sep 2025',
    reply: 'That\'s correct and we\'re very transparent about it. We use AI to scale our workflows but every step is reviewed by human experts to ensure quality.',
    rating: 1
  },
  {
    name: 'Manoj',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150',
    title: 'Not Issuing Full Refund when canceled',
    content: 'I paid them 1055 USD. I canceled before any work was used I only received $963 USD. As a customer, their internal operating costs are irrelevant to me. When I return an...',
    date: 'Jul 2025',
    reply: 'We have a strict refund policy which accounts for payment processing fees and initial setup time. We are completely transparent about this before any payment is made.',
    rating: 1
  }
];

const mapYoutubeUrls = (urls: any[], quality: 'hqdefault' | 'maxresdefault' = 'hqdefault') => {
  if (!Array.isArray(urls)) return [];
  return urls
    .map((url) => {
      if (typeof url !== 'string') return null;
      const match = url.match(/(?:shorts\/|v=|\/)([a-zA-Z0-9_-]{11})/);
      const id = match?.[1];
      if (!id) return null;
      return { id, url, thumbnail: `https://i.ytimg.com/vi/${id}/${quality}.jpg` };
    })
    .filter((s): s is { id: string; url: string; thumbnail: string } => Boolean(s));
};

export default function WallOfFame() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('key', 'home')
          .single();
        if (data) setCmsData(data.content);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFE]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  // --- Dynamic Mappings (Mirrored from HomeClient) ---
  const clientLoveData = cmsData?.clientLove || {};
  const getClientTestimonials = () => {
    const raw = clientLoveData;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.testimonials)) return raw.testimonials;
    return defaultClientTestimonials;
  };

  const clientTestimonials = getClientTestimonials();
  const clientLoveTitle = clientLoveData.title || clientLoveData.heading || 'Love ❤️ Letters from our Clients';
  const clientLoveDescription = clientLoveData.description || clientLoveData.subtitle || clientLoveData.text || "Don't just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.";

  const trustpilotData = cmsData?.trustpilotReviews || defaultTrustpilotReviews;
  const audioReviewsData = cmsData?.audioReviews || defaultAudioReviews;
  const negativeReviewsData = cmsData?.negativeReviews || defaultNegativeReviews;
  
  const resultsData = cmsData?.results || null;
  const resultsTitle = resultsData 
    ? (resultsData.title || resultsData.heading || '') 
    : 'Success Stories That Inspire';
  const resultsSubtitle = resultsData 
    ? (resultsData.subtitle || resultsData.subHeading || '') 
    : 'Real Experiences. Real Results.';
  const resultsDescription = resultsData 
    ? (resultsData.description || resultsData.text || '') 
    : 'Don\'t just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.';

  const resultsImages = (() => {
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
    return urls.length > 0 ? urls : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => `/testimonials/whatsapp${num}.jpeg`);
  })() as string[];

  const testimonialsCms = cmsData?.testimonials || {};
  const testimonialsGridTitle = testimonialsCms.testimonialGrid?.title || 'Real Results. Real Stories.';

  const gridUrls = Array.isArray(testimonialsCms.testimonialGrid?.videoUrls) 
    ? testimonialsCms.testimonialGrid.videoUrls 
    : (Array.isArray(testimonialsCms) ? testimonialsCms : []);
  const testimonialShortsData = mapYoutubeUrls(gridUrls, 'maxresdefault');

  return (
    <main className="min-h-screen bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-purple-600 shadow-sm mb-6">
            <Award className="h-4 w-4" />
            CELEBRATING SUCCESS
          </div>
          <h1 className="text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-[#160E22] sm:text-7xl lg:text-[5rem] mb-6">
            Wall of <span className="text-purple-600 italic">Fame</span>
          </h1>
          <p className="mt-6 text-xl font-medium text-[#5D4A7A] max-w-2xl mx-auto">
            Real stories, real dreams, and the journey of thousands who transformed their careers with QBay.
          </p>
        </div>
      </section>

      {/* Love Letters (Client Testimonials) Section */}
      <section id="client-love" className="relative bg-gradient-to-b from-white via-[#F8F7FF] to-white py-24 scroll-mt-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D1B4D] tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: clientLoveTitle }}>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
              {clientLoveDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {clientTestimonials.map((testimonial: any, index: number) => (
              <div 
                key={index} 
                className="group relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_10px_40px_rgba(45,27,77,0.04)] hover:shadow-[0_20px_50px_rgba(45,27,77,0.08)] transition-all duration-500 hover:-translate-y-3"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Quote className="w-6 h-6 fill-current" />
                </div>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm" />
                    <div>
                      <h3 className="font-bold text-[#2D1B4D] text-lg leading-tight">{testimonial.name}</h3>
                      <p className="text-sm font-semibold text-purple-600/80 mt-1 uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[#4A4A68] leading-relaxed text-base italic font-medium flex-1">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-8 pt-6 border-t border-purple-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Results Section */}
      <section className="py-24 bg-[#F9F5FF] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#160E22] mb-4">{resultsTitle}</h2>
            <p className="text-slate-600 max-w-xl mx-auto">{resultsSubtitle || resultsDescription}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resultsImages.map((src, i) => (
              <div 
                key={i} 
                className="aspect-[9/16] rounded-2xl overflow-hidden border-4 border-white shadow-md hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                onClick={() => setSelectedImage(src)}
              >
                <img src={src} className="h-full w-full object-cover" alt={`Success result ${i+1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Reviews Section */}
      <section id="audio-reviews" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D1B4D] tracking-tight mb-4">Hear their success stories</h2>
            <p className="text-lg text-slate-600 leading-relaxed">Listen to real experiences from our candidates who cracked top-tier interviews and landed their dream roles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
             {audioReviewsData.map((audio: any, idx: number) => (
               <div key={idx} className="bg-white rounded-2xl p-4 border-2 border-purple-100/60 flex items-stretch gap-4 shadow-sm hover:shadow-lg transition-shadow group relative overflow-hidden">
                 <div className="w-[100px] h-[100px] flex-shrink-0">
                   <img src={audio.avatar} alt={audio.name} className="w-full h-full rounded-xl object-cover" />
                 </div>
                 <div className="flex-1 flex flex-col py-0.5 justify-between min-w-0">
                   <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-100 overflow-hidden shadow-sm bg-gray-50">
                     <img src={audio.flag} alt="Country flag" className="w-full h-full object-cover" />
                   </div>
                   <div className="pr-10 min-w-0 pt-2">
                     <h3 className="font-extrabold text-[#2D1B4D] text-lg leading-tight mb-1 truncate">{audio.name}</h3>
                     <p className="text-sm font-bold text-violet-600 truncate">{audio.role}</p>
                   </div>
                   <div className="flex items-center gap-3 mt-3">
                     <button 
                       onClick={() => toggleAudio(idx, audio.audioUrl)}
                       className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                         playingAudioIdx === idx ? 'border-purple-600 bg-purple-600 text-white shadow-md' : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'
                       }`}
                     >
                       {playingAudioIdx === idx ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
                     </button>
                     <div className="flex-1 flex items-center gap-1 h-5 overflow-hidden">
                       {[30, 60, 40, 80, 50, 90, 70, 40, 60, 100, 80, 50, 40, 60].map((h, i) => (
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

      {/* Trustpilot Reviews Section */}
      <section id="trustpilot-reviews" className="bg-[#1C1C28] py-24 scroll-mt-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Excellent on Trustpilot</h2>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#00B67A] p-1.5 rounded-sm"><Star className="w-5 h-5 fill-white text-white" /></div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustpilotData.map((review: any, idx: number) => (
              <div key={idx} className="bg-[#262635] rounded-xl p-6 border border-white/5 hover:border-[#00B67A]/50 transition-colors">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <div key={i} className="bg-[#00B67A] p-1 rounded-sm"><Star className="w-3 h-3 fill-white text-white" /></div>
                  ))}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{review.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{review.content}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-white">{review.name}</span>
                  <span className="text-gray-500">{review.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="testimonials" className="bg-[#FDFCFE] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#2D1B4D] text-center mb-16 sm:text-5xl">{testimonialsGridTitle}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {testimonialShortsData.map((video: any, idx: number) => (
              <a key={video.id + idx} href={video.url} target="_blank" rel="noreferrer" className="group relative block rounded-2xl overflow-hidden bg-gray-900 shadow-xl aspect-video">
                <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80" alt="Testimonial" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 fill-current" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Negative Reviews Section */}
      <section id="painful-reviews" className="bg-gradient-to-br from-[#F5F3FF] to-[#FAFAFA] py-24 scroll-mt-24 border-y border-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#2D1B4D] tracking-tight mb-4 flex items-center justify-center gap-3 flex-wrap">
              Our Brutally Honest 1 
              <span className="bg-red-500 text-white rounded-md px-1.5 py-1.5 shadow-sm inline-flex"><Star className="w-5 h-5 fill-white" /></span> 
              Reviews 
              <span className="text-purple-300"><Info className="w-7 h-7" /></span>
            </h2>
            <p className="text-lg text-slate-600">Proof that we don't hide anything. Transparency is our core value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {negativeReviewsData.map((review: any, idx: number) => (
              <div key={idx} className="bg-white rounded-[1.25rem] p-8 shadow-sm hover:shadow-xl transition-all border border-purple-50 flex flex-col relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                    <h3 className="font-bold text-gray-900">{review.name}</h3>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`${i < (review.rating || 1) ? 'bg-red-500' : 'bg-gray-200'} p-[2px] rounded-sm`}><Star className="w-3.5 h-3.5 fill-white" /></div>
                    ))}
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-4">{review.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-8">"{review.content}"</p>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span className="text-violet-600 flex items-center gap-1">FOUNDER REPLY <ArrowRight className="w-3 h-3" /></span>
                  <span>{review.date}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 top-[25%] bg-[#2D1B4D] p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-center">
                   <h5 className="text-violet-400 text-[10px] font-bold uppercase mb-4 tracking-widest">FOUNDER REPLY</h5>
                   <p className="text-white text-sm leading-relaxed">{review.reply}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImage} alt="Success story" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
            <button className="absolute top-2 right-2 p-2 bg-white rounded-full" onClick={() => setSelectedImage(null)}><X className="w-5 h-5 text-gray-900" /></button>
          </div>
        </div>
      )}

      <QBayFooter />
    </main>
  );
}
