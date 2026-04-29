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
import InfluencerCard from '@/components/InfluencerCard';
import {
  defaultClientTestimonials,
  defaultTrustpilotReviews,
  defaultAudioReviews,
  defaultNegativeReviews,
  youtubeShortUrls,
} from '../homeData';

const mapVideoUrls = (urls: any[], quality: 'hqdefault' | 'maxresdefault' = 'hqdefault') => {
  if (!Array.isArray(urls)) return [];
  return urls
    .map((url) => {
      if (typeof url !== 'string') return null;

      // Handle Cloudinary URLs
      if (url.includes('cloudinary.com')) {
        const thumbnail = url
          .replace(/\/video\/upload\//, '/video/upload/f_auto,q_auto,so_auto/')
          .replace(/\.[^/.]+$/, '.jpg');
        return {
          id: url,
          url,
          thumbnail,
          isCloudinary: true
        };
      }

      // Handle YouTube URLs
      const match = url.match(/(?:shorts\/|v=|\/)([a-zA-Z0-9_-]{11})/);
      const id = match?.[1];
      if (!id) return null;
      return {
        id,
        url,
        thumbnail: `https://i.ytimg.com/vi/${id}/${quality}.jpg`,
        isCloudinary: false
      };
    })
    .filter((s): s is { id: string; url: string; thumbnail: string; isCloudinary: boolean } => Boolean(s));
};

export default function WallOfFame() {
  const [cmsData, setCmsData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const audioScrollRef = useRef<HTMLDivElement>(null);
  const whatsappScrollRef = useRef<HTMLDivElement>(null);
  const [isWhatsappPaused, setIsWhatsappPaused] = useState(false);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState<any | null>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [isResultsPaused, setIsResultsPaused] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        // Check sessionStorage cache first (5-minute TTL)
        const CACHE_KEY = 'qbay_wof_cms';
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { data: cachedData, ts } = JSON.parse(cached);
            if (Date.now() - ts < 5 * 60 * 1000) {
              setCmsData(cachedData);
              setLoading(false);
              return;
            }
          } catch { /* stale — fall through */ }
        }

        // Only fetch the 5 keys this page actually needs (not the entire table)
        const { data, error } = await supabase
          .from('cms_content')
          .select('key, content')
          .in('key', ['audioReviews', 'trustpilotReviews', 'testimonials', 'negativeReviews', 'home']);

        if (error) {
          console.error('Error fetching CMS data:', error);
        } else {
          const dataMap = (data || []).reduce((acc: any, item: any) => ({
            ...acc,
            [item.key]: item.content
          }), {});
          
          // Merge 'home' key content into the root, just like app/page.tsx does
          // This ensures that sub-sections stored within the 'home' key are accessible
          const mergedData = {
            ...(dataMap.home || {}),
            ...dataMap
          };
          
          setCmsData(mergedData);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: mergedData, ts: Date.now() }));
          } catch { /* sessionStorage unavailable — ignore */ }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCmsData();
  }, []);

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

  useEffect(() => {
    const scrollContainer = whatsappScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isWhatsappPaused) {
        if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        } else {
          scrollContainer.scrollLeft -= 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isWhatsappPaused]);

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

  const resultsImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
    src: `/testimonials/whatsapp${num}.jpeg`,
    flag: 'https://flagcdn.com/w80/in.png'
  }));

  const midPoint = Math.ceil(resultsImages.length / 2);
  const col1Images = resultsImages.slice(0, midPoint);
  const col2Images = resultsImages.slice(midPoint);

  const audioReviewsData = cmsData?.audioReviews || defaultAudioReviews;

  const clientLoveData = cmsData?.clientLove || {};
  const clientTestimonials = Array.isArray(clientLoveData) ? clientLoveData : (clientLoveData?.testimonials || defaultClientTestimonials);

  const clientLoveTitle = clientLoveData.title || clientLoveData.heading || 'Love ❤️ Letters from our Clients';
  const clientLoveDescription = clientLoveData.description || clientLoveData.subtitle || clientLoveData.text || "Don't just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.";

  const trustpilotDataObj = cmsData?.trustpilotReviews || { title: 'Excellent on Trustpilot', rating: 5, reviews: defaultTrustpilotReviews };
  const trustpilotData = Array.isArray(trustpilotDataObj) ? trustpilotDataObj : (trustpilotDataObj.reviews || []);
  const trustpilotRating = typeof trustpilotDataObj === 'object' && !Array.isArray(trustpilotDataObj) ? (trustpilotDataObj.rating || 5) : 5;
  const trustpilotTitle = typeof trustpilotDataObj === 'object' && !Array.isArray(trustpilotDataObj) ? (trustpilotDataObj.title || 'Excellent on Trustpilot') : 'Excellent on Trustpilot';
  const negativeReviewsData = cmsData?.negativeReviews || defaultNegativeReviews;

  const testimonialsCms = cmsData?.testimonials || {};
  const testimonialsGridTitle = testimonialsCms.testimonialGrid?.title || 'Real Results. Real Stories.';

  const gridUrls = Array.isArray(testimonialsCms.testimonialGrid?.videoUrls) 
    ? testimonialsCms.testimonialGrid.videoUrls 
    : (Array.isArray(testimonialsCms) && testimonialsCms.length > 0 ? testimonialsCms : youtubeShortUrls);
  const testimonialShortsData = mapVideoUrls(gridUrls, 'maxresdefault');

  const founderData = {
    name: "Fazil Karatt",
    role: "Founder & CEO",
    avatar: "/Hizana-Web-61-768x768.webp"
  };

  return (
    <main className="min-h-screen bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] lg:h-screen overflow-hidden bg-gradient-to-br from-[#FEFCE8] via-[#FDF4FF] to-[#F0F9FF]">
        {/* Aurora blob blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-200/50 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-purple-200/40 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[20%] w-[600px] h-[200px] rounded-full bg-pink-200/30 blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch h-full">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left py-24 lg:py-32 z-20 self-center">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A112B] tracking-tight leading-[1.1] max-w-2xl mb-8">
                Wall of <span className="text-purple-600 italic">Fame</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
                Real stories, real dreams, and the journey of thousands who transformed their careers with QBay.
              </p>
            </div>

            {/* Right side WhatsApp Marquee */}
            <div className="relative hidden lg:block h-full w-full overflow-hidden mask-image-vertical">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FDF4FF] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F0F9FF] to-transparent z-10 pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-4 h-[200%] w-full rotate-2 transform-gpu pt-10 pb-20">
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

      {/* Mobile WhatsApp Testimonials (Moved after Audio) */}
      <section className="lg:hidden bg-white py-12 overflow-hidden border-b border-purple-100/50">
        <div className="relative w-full">
          <div 
            ref={whatsappScrollRef}
            onMouseEnter={() => setIsWhatsappPaused(true)}
            onMouseLeave={() => setIsWhatsappPaused(false)}
            className="flex gap-4 overflow-x-auto pb-6 pt-2 scrollbar-hide px-4"
          >
            {[...resultsImages, ...resultsImages].map((item, idx) => (
              <div
                key={`mobile-whatsapp-${idx}`}
                className="w-[200px] flex-shrink-0 overflow-hidden rounded-2xl shadow-md border border-purple-100 bg-white cursor-pointer group"
                onClick={() => setSelectedImage(item.src)}
              >
                <div className="relative aspect-[3/4]">
                  {item.flag && (
                    <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full border border-white overflow-hidden shadow-sm">
                      <img src={item.flag} alt="Country flag" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <img
                    src={item.src}
                    alt={`Success story ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Influencers Marquee Section */}
      <section id="client-love" className="relative bg-white py-24 scroll-mt-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D1B4D] tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: clientLoveTitle }} />
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">
              {clientLoveDescription}
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative w-full">
          {/* Side Fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <div className="flex gap-8 animate-hero-scroll hover:[animation-play-state:paused] w-max px-4">
            {[...clientTestimonials, ...clientTestimonials].map((testimonial: any, index: number) => (
              <InfluencerCard
                key={index}
                name={testimonial.name}
                image={testimonial.image}
                followers={testimonial.followers}
                description={testimonial.description || testimonial.content || ''}
                socialLinks={testimonial.socialLinks || []}
                actionLink={testimonial.actionLink || { label: 'View More', url: '#' }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="trustpilot-reviews" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
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
                <h3 className="font-bold text-[#2D1B4D] text-lg mb-3 group-hover:text-[#00B67A] transition-colors" dangerouslySetInnerHTML={{ __html: review.title }} />
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

      {/* Video Testimonials Section */}
      <section id="testimonials" className="bg-[#F9F5FF] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D1B4D] tracking-tight mb-4">
              {testimonialsGridTitle}
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              Watch real stories from candidates who transformed their careers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {testimonialShortsData.slice(0, 4).map((video: any, idx: number) => (
              <div
                key={video.id + idx}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-xl cursor-pointer transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={video.thumbnail}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={`Success Story ${idx + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (video.isCloudinary) {
                        // Fallback for Cloudinary if the auto-thumbnail fails
                        target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400";
                    }
                  }}
                />
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
      </section>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
            >
              <X className="w-10 h-10" />
            </button>
            
            {selectedVideo.isCloudinary ? (
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[85vh] rounded-3xl shadow-2xl"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="relative w-full aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}

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
                    <div className="flex-1 mt-4 mb-4 text-left">
                      <div 
                        className="text-base text-gray-600 leading-relaxed line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
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

              <div 
                className="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: selectedReviewForModal.content }}
              />
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
