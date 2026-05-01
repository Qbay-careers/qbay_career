'use client';

import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Play, 
  Pause, 
  Star, 
  Maximize, 
  X 
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { testimonialShortUrls, youtubeShortUrls } from '../homeData';

// Helper to map video URLs to objects with extracted IDs and thumbnails
const mapVideoUrls = (items: any[], quality: 'hqdefault' | 'maxresdefault' = 'hqdefault') => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      const url = typeof item === 'string' ? item : item?.url;
      const flag = typeof item === 'object' ? (item?.flag || 'https://flagcdn.com/w80/in.png') : 'https://flagcdn.com/w80/in.png';
      
      if (typeof url !== 'string' || !url) return null;

      // Handle Cloudinary URLs
      if (url.includes('cloudinary.com')) {
        const thumbnail = url
          .replace(/\/video\/upload\//, '/video/upload/f_auto,q_auto,so_auto/')
          .replace(/\.[^/.]+$/, '.jpg');
        return {
          id: url,
          url,
          thumbnail,
          isCloudinary: true,
          flag
        };
      }

      // Robust regex for both shorts and regular YouTube videos
      const match = url.match(/(?:shorts\/|v=|\/)([a-zA-Z0-9_-]{11})/);
      const id = match?.[1];
      if (!id) return null;
      return {
        id,
        url,
        thumbnail: `https://i.ytimg.com/vi/${id}/${quality}.jpg`,
        isCloudinary: false,
        flag
      };
    })
    .filter((v): v is any => v !== null);
};

const defaultAudioReviews = [
  { name: 'David L.', role: 'UX Designer', title: 'Secured a role at a top agency', duration: '1:24', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
  { name: 'Anita P.', role: 'Marketing Lead', title: 'Got my UK visa sponsored job', duration: '0:58', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', flag: 'https://flagcdn.com/w80/ie.png' },
  { name: 'John D.', role: 'Cloud Architect', title: 'Negotiated a 30% salary bump', duration: '2:15', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', flag: 'https://flagcdn.com/w80/in.png' }
];

const defaultTrustpilotReviews = [
  { name: 'James W.', title: 'Outstanding support from start to finish', content: 'They guided me through every step of the process. I landed a senior role faster than I expected.', rating: 5, time: '4 days ago' },
  { name: 'Emily C.', title: 'Best career investment', content: 'Worth every penny. The 1:1 coaching gave me the confidence I lacked during technical interviews.', rating: 5, time: '2 weeks ago' },
  { name: 'Rahul M.', title: 'Highly professional and effective', content: 'Their market insights are brilliant. I secured two competing offers thanks to their negotiation coaching.', rating: 5, time: '1 month ago' }
];

const defaultPlans = [
  {
    name: 'Qbay Career Plan',
    price: '€193/-',
    originalPrice: '€263/-',
    description: 'One time payment',
    features: [
      'UK/Germany/Ireland Internship',
      '60-Day Success Club Access',
      'Market Research & Profiling',
      '1:1 Career Counseling',
      '1:1 Mind Belief Sessions',
      'Mock Interview Prep (1)',
      'ATS CV & Cover Letter',
      'LinkedIn Optimisation',
    ],
    buttonText: 'Checkout →',
    buttonLink: '#',
  },
  {
    name: 'Qbay Master Plan',
    price: '€329/-',
    originalPrice: '€499/-',
    description: 'One time payment',
    isPopular: true,
    badgeText: 'MOST POPULAR',
    features: [
      'Career Strategy Development',
      'Effective Career Roadmap',
      'UK/DE/IE Full time Experience',
      '90-Day Success Club Access',
      '2x 1:1 Career Coaching',
      'Mock Interview Prep (2)',
      'ATS CV & Cover Letter',
      'LinkedIn Optimisation',
    ],
    buttonText: 'Checkout →',
    buttonLink: '#',
  },
  {
    name: 'Qbay Premium Plan',
    price: '€639/-',
    originalPrice: '€799/-',
    description: 'One time payment',
    isPopular: true,
    badgeText: 'MAX RESULTS!',
    features: [
      '3 Month Application Assistance',
      'UK & India Career Roadmap',
      '100-Day Internship Assistance',
      'Full Success Club Access',
      '3x Career Coaching Sessions',
      '2x Mind Belief Counseling',
      'Mock Interview Prep (3)',
      'ATS CV & Cover Letter',
    ],
    buttonText: 'Checkout →',
    buttonLink: '#',
  },
];

const defaultMonthlyPlan = {
  name: 'Monthly Subscription',
  price: '€219/-',
  originalPrice: '€258/-',
  description: 'One time payment',
  features: [
    'Job applications on your behalf',
    'Daily 10 job applications',
    'Non-easy applications',
    'Email & message applications',
    'LinkedIn applications included',
    'Direct company website apps',
    'Dedicated Account Manager',
  ],
  buttonText: 'Checkout →',
  buttonLink: '#',
};

export default function PricingClient({ 
  initialPricingData, 
  initialHomeData,
  initialTrustpilotData,
  initialAudioData,
  initialTestimonialsData
}: { 
  initialPricingData: any, 
  initialHomeData: any,
  initialTrustpilotData: any,
  initialAudioData: any,
  initialTestimonialsData: any
}) {
  const [cmsData, setCmsData] = useState<any>(initialPricingData);
  const [homeData, setHomeData] = useState<any>(initialHomeData);
  const [trustpilotCms, setTrustpilotCms] = useState<any>(initialTrustpilotData);
  const [audioCms, setAudioCms] = useState<any>(initialAudioData);
  const [testimonialsCms, setTestimonialsCms] = useState<any>(initialTestimonialsData);

  useEffect(() => {
    setCmsData(initialPricingData);
    setHomeData(initialHomeData);
    setTrustpilotCms(initialTrustpilotData);
    setAudioCms(initialAudioData);
    setTestimonialsCms(initialTestimonialsData);
  }, [initialPricingData, initialHomeData, initialTrustpilotData, initialAudioData, initialTestimonialsData]);

  const [timeWorth, setTimeWorth] = useState(20);
  const [timePerApp, setTimePerApp] = useState(10);
  const [openPolicy, setOpenPolicy] = useState<number | null>(0);

  // Testimonials State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const [isResultsPaused, setIsResultsPaused] = useState(false);

  // Marquee Effect for WhatsApp Results
  useEffect(() => {
    const scrollContainer = resultsScrollRef.current;
    if (!scrollContainer || isResultsPaused) return;

    let animationFrameId: number;
    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isResultsPaused]);

  const toggleAudio = (idx: number, url: string) => {
    if (playingAudioIdx === idx) {
      audioRef.current?.pause();
      setPlayingAudioIdx(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      } else {
        const audio = new Audio(url);
        audio.onended = () => setPlayingAudioIdx(null);
        audio.play();
        audioRef.current = audio;
      }
      setPlayingAudioIdx(idx);
    }
  };
  
  const totalHours = Math.round((1000 * timePerApp) / 60);
  const totalSaved = Math.round(totalHours * timeWorth);

  // Pricing Mappings
  const header = cmsData?.header || {
    title: 'Choose The Best!',
    subtitle: 'Focus on building your career, not filling out forms.',
    description: 'Our human assistants apply to jobs for you while you spend your time networking and preparing for interviews.'
  };

  const plans = (cmsData?.plans && Array.isArray(cmsData.plans) && cmsData.plans.length > 0) 
    ? cmsData.plans 
    : defaultPlans;

  const monthlyPlan = cmsData?.monthlyPlan || cmsData?.ultimatePlan || defaultMonthlyPlan;

  const cancellation = cmsData?.cancellation || {
    title: 'Cancellation Policy',
    subtitle: 'You can cancel your plan anytime, no questions asked',
    policies: []
  };

  // Home Mappings for Testimonials
  const resultsData = homeData?.results || {};
  const resultsTitle = resultsData.title || "The Proof is in the Results";
  const resultsSubtitle = resultsData.subtitle || "Real candidate results, real interview calls, and real success stories.";
  const resultsDescription = resultsData.description || "These aren't just screenshots; they are the results of our structured application system.";
  const resultsImages = resultsData.images || [
    { src: '/whatsapp-results/result-1.jpg', flag: 'https://flagcdn.com/w80/gb.png' },
    { src: '/whatsapp-results/result-2.jpg', flag: 'https://flagcdn.com/w80/ie.png' },
    { src: '/whatsapp-results/result-3.jpg', flag: 'https://flagcdn.com/w80/in.png' }
  ];

  // Logic to match HomeClient.tsx exactly
  const audioReviewsData = audioCms || homeData?.audioReviews || defaultAudioReviews;
  
  const trustpilotDataObj = trustpilotCms || homeData?.trustpilotReviews || { title: 'Excellent on Trustpilot', rating: 5, reviews: defaultTrustpilotReviews };
  const trustpilotData = Array.isArray(trustpilotDataObj) ? trustpilotDataObj : (trustpilotDataObj.reviews || []);
  const trustpilotRating = typeof trustpilotDataObj === 'object' && !Array.isArray(trustpilotDataObj) ? (trustpilotDataObj.rating || 5) : 5;
  const trustpilotTitle = typeof trustpilotDataObj === 'object' && !Array.isArray(trustpilotDataObj) ? (trustpilotDataObj.title || 'Excellent on Trustpilot') : 'Excellent on Trustpilot';

  // Video Testimonials Processing
  const testimonialsData = testimonialsCms || homeData?.testimonials || {};
  
  // Grid Testimonials (Real Results section)
  // Matching Admin logic: If it's a flat array, first 4 go to grid, rest to animated
  let gridUrls: any[] = [];
  if (testimonialsData.testimonialGrid?.videoUrls) {
    gridUrls = testimonialsData.testimonialGrid.videoUrls;
  } else if (Array.isArray(testimonialsData)) {
    gridUrls = testimonialsData.slice(0, 4);
  } else if (testimonialsData.videoUrls) {
    gridUrls = testimonialsData.videoUrls.slice(0, 4);
  } else {
    gridUrls = testimonialShortUrls.slice(0, 4);
  }

  const testimonialShortsData = mapVideoUrls(gridUrls, 'maxresdefault');
  const testimonialsGridTitle = testimonialsData.testimonialGrid?.title || 'Real Results. Real Stories.';

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-purple-100">
      <QBayNavbar />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#5D4A7A] mb-4">
            {header.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {header.subtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {header.description}
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.filter((p: any) => p.name?.toLowerCase() !== 'monthly subscription').map((plan: any) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-3xl p-8 bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  {plan.name}
                </h3>
                {plan.isPopular && (
                  <span className="bg-[#6366f1] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {plan.badgeText || 'Popular'}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {plan.description || 'Perfect for achieving your career goals.'}
              </p>

              <div className="mb-6">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#e0e7ff] text-[#6366f1] text-[10px] font-bold px-2 py-0.5 rounded">
                      {plan.originalPriceLabel || '30% OFF'}
                    </span>
                    <span className="text-gray-400 line-through text-sm font-medium">
                      {plan.originalPrice}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/year</span>
                </div>
              </div>

              <div className="space-y-2 mb-4 flex-1">
                {plan.features?.map((feature: any, idx: number) => {
                  const featureText = feature.title || feature;
                  const isLast = idx === plan.features.length - 1;
                  return (
                    <div key={featureText} className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#6366f1]">
                        <Check className="h-4 w-4 stroke-[3px]" />
                      </div>
                      <span className={`text-sm font-medium ${isLast ? 'text-[#6366f1]' : 'text-gray-600'}`}>
                        {featureText}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-4">
                <Link
                  href={plan.buttonLink || '#'}
                  className={`flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold transition-all ${
                    plan.isPopular
                      ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-md shadow-indigo-100'
                      : 'bg-[#e0e7ff] text-[#4f46e5] hover:bg-[#d1d5ff]'
                  }`}
                >
                  {plan.buttonText || `Get ${plan.name}`}
                </Link>
                {plan.renewalText && (
                  <p className="text-center text-[11px] text-gray-400 font-medium mt-3">
                    {plan.renewalText}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Plan Section - Dark Beautiful Layout */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden bg-[#0a021c] p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3b] via-transparent to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6366f1]/10 to-transparent" />
            
            <div className="relative flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <Sparkles className="w-5 h-5 text-[#facc15]" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {monthlyPlan.name}
                </h3>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-8 max-w-xl">
                The all-in-one monthly solution for <span className="text-[#facc15] italic">comprehensive</span> career support.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                {monthlyPlan.features?.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#6366f1] stroke-[4px]" />
                    <span className="text-sm font-medium text-gray-300">
                      {feature.title || feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:w-[360px] shrink-0">
              <div className="bg-[#120a26] border border-white/5 rounded-[1.5rem] p-8 shadow-2xl">
                {monthlyPlan.originalPrice && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {monthlyPlan.originalPriceLabel || 'SAVE NOW'}
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      {monthlyPlan.originalPrice}
                    </span>
                  </div>
                )}
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white tracking-tighter">
                    {monthlyPlan.price}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {monthlyPlan.description && monthlyPlan.description !== 'One time payment' && (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">i</div>
                      <span className="text-sm font-medium">{monthlyPlan.description}</span>
                    </div>
                  )}
                </div>

                <Link
                  href={monthlyPlan.buttonLink || '#'}
                  className="flex w-full items-center justify-center rounded-xl bg-[#4f46e5] py-4 text-sm font-bold text-white transition-all hover:bg-[#4338ca] shadow-xl shadow-indigo-900/40"
                >
                  {monthlyPlan.buttonText || `Checkout →`}
                </Link>
              </div>
            </div>
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
              className="flex gap-4 overflow-x-auto pb-16 pt-10 scrollbar-hide perspective-[1000px] py-10"
              style={{ perspective: '1200px' }}
            >
              {[...resultsImages, ...resultsImages].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[130px] w-[42vw] sm:w-[220px] flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-purple-100 bg-white cursor-pointer group transition-all duration-300 transform-gpu whatsapp-review-card will-change-transform"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <div className="relative">
                    {item.flag && (
                      <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-lg">
                        <img src={item.flag} alt="Country flag" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <img
                      src={item.src}
                      alt={`Success story ${idx + 1}`}
                      className="w-full h-[260px] sm:h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <div className="bg-white rounded-full p-2">
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
      <section id="audio-reviews" className="bg-[#FAF5FB] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D1B4D] tracking-tight mb-4 text-center">Hear their success stories</h2>
            <p className="text-lg text-slate-600 text-center">Listen to real experiences from our candidates who cracked top-tier interviews.</p>
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
                    <p className="text-sm font-bold text-violet-600 truncate">{audio.role || audio.title}</p>
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

      {/* Video Testimonials Grid */}
      <section id="video-testimonials" className="bg-[#F9F5FF] py-24 scroll-mt-24">
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#1A112B] tracking-tight mb-6">
              {testimonialsGridTitle}
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Watch real stories from candidates who transformed their careers.
            </p>
          </div>

          {testimonialShortsData.length > 4 ? (
            <div className="relative w-full overflow-hidden">
              {/* Side fades for a smooth transition */}
              <div className="absolute inset-y-0 left-0 w-12 sm:w-16 lg:w-24 bg-gradient-to-r from-[#F9F5FF] via-[#F9F5FF]/40 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-12 sm:w-16 lg:w-24 bg-gradient-to-l from-[#F9F5FF] via-[#F9F5FF]/40 to-transparent z-20 pointer-events-none" />
              
              <div className="flex gap-6 lg:gap-8 animate-hero-scroll hover:[animation-play-state:paused] w-max px-4">
                {[...testimonialShortsData, ...testimonialShortsData].map((video: any, idx: number) => (
                  <div
                    key={video.id + idx}
                    onClick={() => setSelectedVideo(video)}
                    className="group relative w-[180px] sm:w-[220px] lg:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-xl cursor-pointer transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shrink-0"
                  >
                    <img
                      src={video.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={`Success Story ${idx + 1}`}
                      loading="lazy"
                    />
                    {video.flag && (
                      <div className="absolute top-4 right-4 z-10 w-12 h-8 rounded-md overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <img src={video.flag} alt="Country flag" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500">
                        <Play className="h-8 w-8 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {testimonialShortsData.map((video: any, idx: number) => (
                <div
                  key={video.id + idx}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-xl cursor-pointer transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl mx-auto w-full max-w-[260px]"
                >
                  <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={`Success Story ${idx + 1}`}
                    loading="lazy"
                  />
                  {video.flag && (
                    <div className="absolute top-4 right-4 z-10 w-12 h-8 rounded-md overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-110">
                      <img src={video.flag} alt="Country flag" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:border-red-500">
                      <Play className="h-8 w-8 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trustpilot Reviews Section */}
      <section id="trustpilot-reviews" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B4D]">{trustpilotTitle}</h2>
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(Number(trustpilotRating)))].map((_, i) => (
                <div key={i} className="bg-[#00B67A] p-1.5 rounded-sm"><Star className="w-5 h-5 fill-white text-white" /></div>
              ))}
              {Number(trustpilotRating) % 1 !== 0 && (
                <div className="bg-[#00B67A] p-1.5 rounded-sm relative overflow-hidden">
                  <Star className="w-5 h-5 fill-white text-white" />
                  <div className="absolute inset-0 bg-gray-200 translate-x-[50%]" />
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustpilotData.map((review: any, idx: number) => (
              <a 
                key={idx} 
                href="https://www.trustpilot.com/review/qbaycareer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#00B67A]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(Math.floor(Number(review.rating || 5)))].map((_, i) => (
                    <div key={i} className="bg-[#00B67A] p-1 rounded-sm"><Star className="w-3 h-3 fill-white text-white" /></div>
                  ))}
                </div>
                <h3 className="font-bold text-[#2D1B4D] text-lg mb-3" dangerouslySetInnerHTML={{ __html: review.title }} />
                <div className="text-gray-600 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: review.content }} />
                <div className="flex justify-between items-center text-xs border-t border-gray-50 pt-4">
                  <span className="font-bold text-[#2D1B4D]">{review.name}</span>
                  <span className="text-gray-400">{review.time}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Success story"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-[500px] bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            
            {selectedVideo.isCloudinary ? (
              <video 
                src={selectedVideo.url} 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[85vh]"
              />
            ) : (
              <div className="relative w-full aspect-[9/16] max-h-[85vh]">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                  title="Video testimonial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ROI Calculator Section */}
      <section className="bg-white py-24 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#5D4A7A]">
              Calculate Your Return on Investment
            </h2>
            <p className="text-lg font-bold text-gray-500">
              Based on Applying to 1000 Jobs With Our Service Instead of Doing it Yourself
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Sliders Area */}
            <div className="space-y-12">
               <div className="space-y-6">
                 <div className="flex justify-between items-center text-[#5D4A7A] font-bold text-lg">
                   <span>What&apos;s Your Time Worth : €{timeWorth} / Hour</span>
                 </div>
                 <div className="relative h-4 bg-gray-100 rounded-full">
                   <div 
                     className="absolute top-0 left-0 h-full bg-[#121826] rounded-full transition-all duration-300"
                     style={{ width: `${(timeWorth / 100) * 100}%` }}
                   >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#121826] text-white text-[10px] px-2 py-1 rounded-md font-bold">
                       {Math.round((timeWorth / 100) * 100)}%
                     </div>
                   </div>
                   <input
                     type="range"
                     min="10"
                     max="100"
                     value={timeWorth}
                     onChange={(e) => setTimeWorth(parseInt(e.target.value))}
                     className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                   />
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="flex justify-between items-center text-[#5D4A7A] font-bold text-lg">
                   <span>Time Spend Filling Application : {timePerApp} / Application</span>
                 </div>
                 <div className="relative h-4 bg-gray-100 rounded-full">
                   <div 
                     className="absolute top-0 left-0 h-full bg-[#121826] rounded-full transition-all duration-300"
                     style={{ width: `${(timePerApp / 30) * 100}%` }}
                   >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#121826] text-white text-[10px] px-2 py-1 rounded-md font-bold">
                       {Math.round((timePerApp / 30) * 100)}%
                     </div>
                   </div>
                   <input
                     type="range"
                     min="1"
                     max="30"
                     value={timePerApp}
                     onChange={(e) => setTimePerApp(parseInt(e.target.value))}
                     className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                   />
                 </div>
               </div>
            </div>

            {/* Results Area */}
            <div className="bg-[#FAF5FB] rounded-[3rem] p-12 text-center space-y-6">
              <div className="space-y-2">
                <span className="block text-6xl font-black text-[#5D4A7A]">{totalHours} Hours</span>
                <span className="block text-5xl font-black text-[#5D4A7A]">€ {totalSaved.toLocaleString()} Saved</span>
              </div>
              <p className="text-xl font-bold text-gray-500">
                plus landing a job up to 3 months faster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white py-24 px-4 font-sans">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#5D4A7A]">
              Proven Results. Real Success Stories.
            </h2>
            <p className="text-lg font-bold text-[#8B7FB1] max-w-4xl mx-auto leading-relaxed">
              Over 70% of QBAY Career members receive refunds — not because they&apos;re dissatisfied, but because they secure their ideal job before using all their credits. We celebrate your success by refunding unused credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-[#6B51A6] text-white p-10 rounded-3xl space-y-4 shadow-xl shadow-purple-100 flex flex-col justify-center min-h-[320px]">
               <span className="text-7xl font-black block">94%</span>
               <h3 className="text-xl font-black">Successfully Placed Within 90 Days</h3>
               <p className="text-sm font-bold text-white/90 leading-relaxed">
                 Nearly half of successful placements come through QBAY applications, while others result from strengthened networking and consistent personal follow-ups.
               </p>
             </div>
             <div className="bg-[#6B51A6] text-white p-10 rounded-3xl space-y-4 shadow-xl shadow-purple-100 flex flex-col justify-center min-h-[320px]">
               <span className="text-7xl font-black block">45%</span>
               <h3 className="text-xl font-black">Faster Job Search Process</h3>
               <p className="text-sm font-bold text-white/90 leading-relaxed">
                 QBAY Career helps reduce the average job hunt from 4-6 months down to approximately 1-3 months with structured application strategies.
               </p>
             </div>
             <div className="bg-[#6B51A6] text-white p-10 rounded-3xl space-y-4 shadow-xl shadow-purple-100 flex flex-col justify-center min-h-[320px]">
               <span className="text-7xl font-black block">180x</span>
               <h3 className="text-xl font-black">Exceptional Return on Investment</h3>
               <p className="text-sm font-bold text-white/90 leading-relaxed">
                 Shorter job search time means faster income, stronger offers, and often significant salary growth — making your investment in QBAY Career highly rewarding.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#5D4A7A]">
              {cancellation.title}
            </h2>
            <p className="text-lg font-bold text-[#8B7FB1]">
              {cancellation.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto border-[1.5px] border-[#D1D5DB] rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-50">
             {cancellation.policies?.map((policy: any, idx: number) => (
               <div key={idx} className="border-b last:border-b-0 border-[#E5E7EB]">
                 <button
                   onClick={() => setOpenPolicy(openPolicy === idx ? null : idx)}
                   className={`w-full flex items-center justify-between px-8 py-6 text-left transition-colors ${
                     openPolicy === idx ? 'bg-[#BDC5D3] text-[#5D4A7A]' : 'bg-white text-[#8B7FB1] hover:bg-gray-50'
                   }`}
                 >
                   <span className="text-lg font-bold">{policy.title}</span>
                   {openPolicy === idx ? (
                     <ChevronUp className="h-5 w-5 shrink-0" />
                   ) : (
                     <ChevronDown className="h-5 w-5 shrink-0" />
                   )}
                 </button>
                 {openPolicy === idx && (
                   <div className="px-8 py-8 bg-white text-gray-900 font-bold leading-relaxed border-t border-[#E5E7EB]">
                     {policy.content}
                   </div>
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
