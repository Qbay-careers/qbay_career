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
    content: 'They hire India based interns to do the applying who don\'t even speak english. I was expecting UK based consultants but instead got someone who didn\'t understand the nuances of the local market.', 
    date: 'Dec 2025', 
    reply: 'That\'s correct and we\'re very transparent about it. QBay Careers is a human assistant service. Our assistants are trained to handle the grunt and operational work involved in job applications i.e., sourcing roles, filling out applications, managing data, and ensuring consistency, not to perform high-level strategic judgment or subjective career decision-making.\n\nManually customizing every resume at a deep, strategic level would require a senior career coach or recruiter per customer, which would fundamentally change both the nature and cost of the service. Even then, there\'s no objective authority who can say that a specific manual tweak will definitively improve interview chances.', 
    rating: 1 
  },
  { 
    name: 'David', 
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150', 
    title: 'Using AI for Customizing Resumes', 
    content: 'They use Gemini/ChatGPT to write the cover letter and tailor resumes. Which doesn\'t make sense for all jobs.. writing the same content by just changing job title... that any free ai can do it.', 
    date: 'Sep 2025', 
    reply: 'That\'s correct and we\'re very transparent about it. At QBay Careers, we use AI where it genuinely adds value and avoid it where it doesn\'t. AI technology has improved dramatically in certain areas and resume tailoring is one of them.\n\nWe\'ve taken a measured, pragmatic approach to AI: we use it to scale our workflows but every single output is reviewed by our team of experts to ensure it meets our high standards before it reaches a recruiter.', 
    rating: 1 
  },
  { 
    name: 'Manoj', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150', 
    title: 'Not Issuing Full Refund when canceled', 
    content: 'I paid them 1055 USD. I canceled before any work was used I only received $963 USD. As a customer, their internal operating costs are irrelevant to me. When I return an item to a store I get 100% back.', 
    date: 'Jul 2025', 
    reply: 'We understand your frustration regarding the refund amount. However, we are very clear about our refund policy from the start. The difference covers non-refundable payment processing fees and the initial setup time our team spends on your profile immediately after signup.\n\nWe strive for 100% transparency so that our customers are aware of these operating costs before they commit to our service.', 
    rating: 1 
  },
  { 
    name: 'Sarah', 
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150', 
    title: 'No Guaranteed Job Placement', 
    content: 'I thought they guaranteed a job in the UK. I haven\'t secured an offer yet after 2 months. They only provided interviews and coaching which wasn\'t enough for me.', 
    date: 'Aug 2025', 
    reply: 'We strictly guarantee interview calls, not job placements. Securing a job offer is a two-way street that involves our application strategy and your personal interview performance. We provide the coaching and the opportunities, but the final decision rests with the employer.\n\nOur commitment is to keep the pipeline full of relevant opportunities until you achieve your goal.', 
    rating: 1 
  },
  { 
    name: 'Vikram', 
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=150&h=150', 
    title: 'Pricing is too high', 
    content: 'Their pricing for full career management is way too high compared to local agencies in Kerala. It feels overpriced for standard assistance that I could probably do myself if I had more time.', 
    date: 'Oct 2025', 
    reply: 'Our pricing reflects the high-touch, international consulting model we operate. Unlike local agencies, we employ experts in the UK and Ireland who understand the specific nuances of those competitive markets.\n\nThe investment covers the hundreds of manual hours our team spends on your behalf, ensuring your candidacy is presented at its absolute best.', 
    rating: 1 
  },
  { 
    name: 'Priya', 
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150', 
    title: 'Time Zone Constraints', 
    content: 'It\'s hard to schedule mentoring meetings because of the time difference between India and the UK. Sometimes I have to attend calls very late at night which is exhausting.', 
    date: 'Nov 2025', 
    reply: 'We acknowledge that time zone differences can be challenging. However, we operate in UK and Ireland hours because that is where the recruiters and companies you are targeting are located.\n\nAdapting to international business hours is a realistic and necessary part of preparing for an global career. We do our best to offer flexible slots that work for both parties.', 
    rating: 1 
  },
];

const founderData = {
  name: "Fazil Karatt",
  role: "Founder & CEO",
  avatar: "/Hizana-Web-61-768x768.webp"
};

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
  const [selectedReviewForModal, setSelectedReviewForModal] = useState<any | null>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isResultsPaused, setIsResultsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = testimonialScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isTestimonialPaused) {
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
  }, [isTestimonialPaused]);

  useEffect(() => {
    const scrollContainer = resultsScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isResultsPaused) {
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
  }, [isResultsPaused]);

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
      <section id="results" className="bg-white py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-[#1A112B] sm:text-5xl">
              {resultsTitle}
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              {resultsSubtitle}
            </p>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              {resultsDescription}
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={resultsScrollRef}
              onMouseEnter={() => setIsResultsPaused(true)}
              onMouseLeave={() => setIsResultsPaused(false)}
              className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
            >
              {resultsImages.map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[240px] w-[70vw] sm:w-[300px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border border-purple-100 bg-white cursor-pointer group"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <div className="relative">
                    {/* Country Flag Overlay */}
                    {item.flag && (
                      <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <img src={item.flag} alt="Country flag" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <img
                      src={item.src}
                      alt={`Student success story ${idx + 1}`}
                      className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <div className="bg-white rounded-full p-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent" />
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
      <section id="testimonials" className="bg-[#F9F5FF] py-24 scroll-mt-24 pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-4xl font-bold text-[#2D1B4D] text-center sm:text-5xl">
            {testimonialsGridTitle}
          </h2>
        </div>

        <div className="w-full overflow-hidden relative">
          <div 
            ref={testimonialScrollRef}
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide px-4 md:px-0"
          >
            {testimonialShortsData.map((video: any, idx: number) => (
                <a
                  key={video.id + idx}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-[220px] aspect-[9/16] flex-shrink-0 rounded-[2.2rem] overflow-hidden bg-gray-900 shadow-2xl group cursor-pointer block"
                >
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    alt="Testimonial"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 fill-current" />
                    </div>
                  </div>
                </a>
            ))}
          </div>
          
          {/* Fade overlays for the edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#F9F5FF] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#F9F5FF] to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* Negative Reviews Section */}
      <section id="negative-reviews" className="py-24 scroll-mt-24" style={{ background: 'linear-gradient(135deg, #e8f5f0 0%, #f0faf5 40%, #e8f5ee 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A112B] mb-4 flex items-center justify-center gap-3 flex-wrap">
              Our Glaringly Painful
              <span className="inline-flex items-center gap-1">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded bg-[#e8372a] text-white text-lg font-bold">★</span>
              </span>
              Reviews
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-400 text-gray-500 text-sm font-bold cursor-help" title="We show these reviews because transparency builds trust.">i</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 flex items-center justify-center gap-3 flex-wrap">
              There is a reason for this section.
              <a
                href="#consultation"
                className="inline-flex items-center gap-1 bg-[#1a9e6e] hover:bg-[#15845c] text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                Read Why?
              </a>
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negativeReviewsData.map((review: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Top row: Avatar + Name | Star Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                          onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=e8f5f0&color=1a9e6e`; }}
                        />
                        <span className="font-bold text-gray-900 text-base">{review.name}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-sm text-xs font-bold ${
                              star === 1 ? 'bg-[#e8372a] text-white' : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Review title */}
                    <h3 className="font-bold text-gray-900 text-base mb-2">{review.title}</h3>

                    {/* Review content */}
                    <div className="flex-1 mt-4 mb-4">
                      <p className={`text-base text-gray-600 leading-relaxed line-clamp-4`}>
                        {review.content}
                      </p>
                    </div>

                    {/* Footer: Read More + Date */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                      <button
                        onClick={() => setSelectedReviewForModal(review)}
                        className="text-[#1a9e6e] hover:text-[#15845c] text-sm font-semibold flex items-center gap-1 transition-colors"
                      >
                        Read More →
                      </button>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  </div>

                  {/* Hover Overlay: FOUNDERS REPLY */}
                  <div className="absolute inset-0 bg-[#1a9e6e] translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 p-8 flex flex-col justify-center text-white z-10">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-3">Founders Reply</span>
                    <p className="text-white/90 text-base leading-relaxed mb-8 line-clamp-4 italic">
                      &ldquo;{review.reply}&rdquo;
                    </p>
                    <button 
                      onClick={() => setSelectedReviewForModal(review)}
                      className="bg-white text-[#1a9e6e] font-bold py-3 px-6 rounded-lg text-sm transition-transform hover:scale-105 w-fit"
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              );
            })}
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

      {/* Negative Review Modal */}
      {selectedReviewForModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedReviewForModal(null)}
          />
          
          <div className="relative w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh]">
            <button 
              onClick={() => setSelectedReviewForModal(null)}
              className="absolute top-6 right-6 z-20 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Column: Reviewer Details */}
            <div className="flex-1 p-8 lg:p-14 overflow-y-auto bg-white text-left">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedReviewForModal.avatar}
                    alt={selectedReviewForModal.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedReviewForModal.name}&background=e8f5f0&color=1a9e6e`; }}
                  />
                  <span className="font-bold text-gray-400 text-xl">{selectedReviewForModal.name}</span>
                </div>
                
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-sm text-lg font-bold ${
                        star === 1 ? 'bg-[#e8372a] text-white' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1A112B] mb-8 leading-tight">
                {selectedReviewForModal.title}
              </h2>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium">
                {selectedReviewForModal.content}
              </p>
            </div>

            {/* Right Column: Founder's Reply */}
            <div className="flex-1 bg-[#1a9e6e] p-8 lg:p-14 flex flex-col relative text-left">
              <span className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase mb-8">Founders Reply</span>
              
              <div className="flex-1 overflow-y-auto pr-4 custom-modal-scrollbar mb-10">
                {selectedReviewForModal.reply.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-white text-xl lg:text-2xl leading-relaxed mb-6 font-medium">
                    {para}
                  </p>
                ))}
              </div>

              {/* Founder Signature Area */}
              <div className="flex items-center gap-5 mt-auto pt-8 border-t border-white/10">
                <img
                  src={founderData.avatar}
                  alt={founderData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <h4 className="text-white font-extrabold text-xl leading-tight">{founderData.name}</h4>
                  <p className="text-white/60 font-bold text-lg">{founderData.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-modal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </main>
  );
}
