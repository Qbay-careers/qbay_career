'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BadgeCheck,
  Globe,
  PhoneCall,
  ShieldCheck,
  Star,
  MessageCircle,
  Check,
  Play,
  Volume2,
  Share2,
  Maximize,
  ChevronDown,
  CalendarDays,
  X,
  ArrowRight,
  MapPin,
  Clock,
  Info,
  Pause,
  Quote,
} from 'lucide-react';
import QBayNavbar from '@/components/QBayNavbar';
import FeaturedOn from '@/components/FeaturedOn';
import QBayFooter from '@/components/QBayFooter';
import { supabase } from '@/lib/supabase';

const defaultFrameworkPhases = [
  {
    number: '01',
    title: 'Discovery & Clarity',
    description:
      'Lay the foundation for your career journey with expert counseling and direction assessments.',
    startIdx: 1,
    details: [
      'Free 1:1 Expert Consultation',
      'Career & Psychology Counseling',
      'Career Assessment & Direction Test',
      'Goal Confirmation & Enrollment Decision',
    ],
  },
  {
    number: '02',
    title: 'Research & Market Intel',
    description:
      'Analyze the job market with real-time data collection and strategic inside research.',
    startIdx: 5,
    details: [
      'Onboarding Strategy Call',
      'In-depth Job Market Research',
      'Real-Time Data Collection',
      'Market Data Analysis',
      'Internal QC Review',
    ],
  },
  {
    number: '03',
    title: 'Profile Development & Positioning',
    description:
      'Optimize your resume and validate your profile with industry experts.',
    startIdx: 10,
    details: [
      'Target Role Selection',
      'Job Description (JD) Analysis',
      'Second-Level Research & Data Validation',
      'Plagiarism-Free Resume & Content Creation',
      'Keyword Optimization & Profile Enhancement',
      'Materials Delivery & Expert Review Call',
    ],
  },
  {
    number: '04',
    title: 'Strategy & Skill Preparation',
    description:
      'Build a personalized job search strategy and gain confidence.',
    startIdx: 16,
    details: [
      'Personalized Job Search Strategy Development',
      'Strategy Delivery & Implementation Guidance',
      'Job Search Training',
      'Psychology & Confidence Training',
      'Unique Application Approach Development',
    ],
  },
  {
    number: '05',
    title: 'Execution & Interviews',
    description:
      'Execute your plan and conquer interviews with expert mock training.',
    startIdx: 21,
    details: [
      'Strategic Applications',
      'Interview Calls Generated',
      'Mock Interview Sessions',
      'Final Interview Support',
    ],
  },
];

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

const topRowLogos = [
  '/Brock-University.png',
  '/Dublin-City-University-768x419.png',
  '/University_of_Canterbury_optimized-200x100.png',
  '/queen-mary-university-of-london-seeklogo-01.png',
  '/queen-mary-university-of-london-seeklogo-06.png',
  '/queen-mary-university-of-london-seeklogo-08.png',
  '/queen-mary-university-of-london-seeklogo-09.png',
  '/queen-mary-university-of-london-seeklogo-10.png',
  '/queen-mary-university-of-london-seeklogo-11.png',
];

const bottomRowLogos = [
  '/queen-mary-university-of-london-seeklogo-12.png',
  '/queen-mary-university-of-london-seeklogo-13.png',
  '/queen-mary-university-of-london-seeklogo-15.png',
  '/queen-mary-university-of-london-seeklogo-16.png',
  '/queen-mary-university-of-london-seeklogo-17.png',
  '/queen-mary-university-of-london-seeklogo-19.png',
  '/queen-mary-university-of-london-seeklogo-20.png',
  '/queen-mary-university-of-london-seeklogo-22.png',
  '/queen-mary-university-of-london-seeklogo-23-768x349.png',
];

const defaultFaqData = [
  { 
    q: "Who is the first Malayali career consultant in the UK?", 
    a: "QBay Career is proud to be among the pioneers in guiding Malayalis in the UK. With expert consultants, we provide career planning, education guidance, and job placement support for Malayalis who wish to establish themselves in the UK." 
  },
  { 
    q: "Why do you ask for personal information?", 
    a: "At QBay Career, our Malayali career consultant in the UK understands both Indian and UK job markets. We provide career counseling, interview preparation, resume building, and job assistance to ensure Malayalis succeed abroad." 
  },
  { 
    q: "How long does 2Checkout store personal data?", 
    a: "Yes, QBay Career is a trusted Malayali career consultant in Ireland, helping students and professionals with admission guidance, career development strategies, and job placement support." 
  },
  { 
    q: "Who is the best career consultant in the UK for Indians?", 
    a: "QBay Career is widely recognized as one of the best career consultants in the UK for Indians, offering personalized support for students and professionals to achieve their academic and career goals. perspiciatis." 
  },
  {
    q: "Who’s the best career consultant in Ireland?",
    a: "Wondering who’s the best career consultant in Ireland? QBay Career stands out with a holistic approach, helping both students and working professionals shape successful futures abroad."
  },
  {
    q: "Are you a top-rated career consultant in the UK?",
    a: "Yes, QBay Career is a top-rated career consultant in the UK, trusted by Malayalis and Indians for interview preparation, career strategies, and overseas job placement."
  },
  {
    q: "Who is a top-rated career consultant in Ireland?",
    a: "QBay Career is among the top-rated career consultants in Ireland, offering tailored career strategies and trusted job assistance for international students and professionals."
  },
  {
    q: "Do you provide interview preparation assistance for international students?",
    a: "Yes, QBay Career is an interview preparation expert for international students, offering mock sessions, confidence coaching, and proven strategies to help you crack global interviews."
  },
  {
    q: "Can Malayalis get interview preparation assistance from you?",
    a: "Absolutely! QBay Career acts as a dedicated interview preparation assistant for Malayalis, helping students and professionals face international interviews with confidence."
  },
  {
    q: "Do you offer trusted interview cracking assistance?",
    a: "Yes, we are known as a trusted interview cracking assistant, helping Indian and Malayali students overcome interview challenges through expert coaching and personalized training."
  },
  { q: "Who is the best job assistant expert for international students in the UK?", a: "QBay Career is recognized as the best job assistant expert for international students in the UK, helping students connect with the right opportunities through structured career support." },
  { q: "Do you provide job assistance in Ireland?", a: "Yes, QBay Career is the best job assistant expert in Ireland, offering career counseling, CV building, and job placement support for Indian and Malayali students." },
  { q: "Who is a reliable career assistant expert in Ireland?", a: "QBay Career is a trusted career assistant expert in Ireland, guiding students and professionals with tailored strategies to achieve their dream careers." },
  { q: "Do you provide job strategy guidance in Ireland?", a: "Yes, QBay Career is a job strategy expert in Ireland, helping international students and professionals create career roadmaps to secure the right roles abroad." },
  { q: "Who is the best interview strategy expert in Ireland?", a: "QBay Career is highly regarded as a leading interview strategy expert in Ireland, providing one-on-one support to boost confidence and performance in job interviews." },
  { q: "Do you help Malayalis with career strategies in Ireland?", a: "Yes, at QBay Career, we are a trusted career strategy expert in Ireland for Indians and Malayalis, guiding you in making the right academic and career decisions." },
  { q: "Who is the best career strategist in Ireland?", a: "QBay Career is recognized as one of the best career strategists in Ireland, offering personalized consultancy services to build strong international careers." },
  { q: "Do you provide job hunting support for Malayalis in Ireland?", a: "Yes, QBay Career is a job hunting expert for Malayalis in Ireland, offering specialized support for Malayali students and professionals to secure jobs in healthcare, IT, and other sectors." }
];

const testimonialShortUrls = [
  'https://www.youtube.com/shorts/Ci_6FOC_qNY',
  'https://www.youtube.com/shorts/QV3SJoPKW7c',
  'https://www.youtube.com/shorts/-Wd2QXX1FI4',
  'https://www.youtube.com/shorts/Ci_6FOC_qNY',
];

const youtubeShortUrls = [
  'https://www.youtube.com/shorts/XZvQ73htuyk',
  'https://www.youtube.com/shorts/Tv1rnZS-RKE',
  'https://www.youtube.com/shorts/tuI9reUpcLc',
  'https://www.youtube.com/shorts/w-sNp24i-x0',
  'https://www.youtube.com/shorts/KVjXMUwiuyU',
  'https://www.youtube.com/shorts/JoQnvzjfO-s',
  'https://www.youtube.com/shorts/4knbUF5DHOk',
  'https://www.youtube.com/shorts/6-LZ47xrdQE',
  'https://www.youtube.com/shorts/khxrQkLTW5s',
  'https://www.youtube.com/shorts/xz4V1iQ9BLE',
  'https://www.youtube.com/shorts/YuFkDWzjAlQ',
  'https://www.youtube.com/shorts/_-wRrRov8q8',
  'https://www.youtube.com/shorts/4CjBPyJ9ixI',
  'https://www.youtube.com/shorts/NNEjiXhD4lo',
  'https://www.youtube.com/shorts/OHTmHRypVNg',
];

// Helper to map YouTube URLs to video objects with extracted IDs and thumbnails
const mapYoutubeUrls = (urls: any[], quality: 'hqdefault' | 'maxresdefault' = 'hqdefault') => {
  if (!Array.isArray(urls)) return [];
  return urls
    .map((url) => {
      if (typeof url !== 'string') return null;
      // Robust regex for both shorts and regular videos
      const match = url.match(/(?:shorts\/|v=|\/)([a-zA-Z0-9_-]{11})/);
      const id = match?.[1];
      if (!id) return null;
      return {
        id,
        url,
        thumbnail: `https://i.ytimg.com/vi/${id}/${quality}.jpg`,
      };
    })
    .filter((s): s is { id: string; url: string; thumbnail: string } => Boolean(s));
};


const defaultHeroImages = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800',
];

const defaultGoogleReviews = [
  { name: 'Sarah J.', role: 'Software Engineer', content: 'QBay Careers helped me land my dream job in just 3 weeks! The interview prep was top-notch. Their team is dedicated and responsive.', rating: 5, time: '2 weeks ago', initial: 'S', color: 'bg-blue-500' },
  { name: 'Michael T.', role: 'Data Analyst', content: 'Incredible experience. The team is dedicated, and their strategies actually work in today\'s competitive market. Highly recommended for anyone struggling.', rating: 5, time: '1 month ago', initial: 'M', color: 'bg-green-500' },
  { name: 'Priya R.', role: 'Product Manager', content: 'I was struggling to get callbacks, but their CV revamp changed everything. Their 1:1 mentorship is invaluable.', rating: 5, time: '3 months ago', initial: 'P', color: 'bg-purple-500' }
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
  { name: 'Linda V.', role: 'Financial Analyst', title: 'Overcame career stagnation', duration: '2:05', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', flag: 'https://flagcdn.com/w80/ie.png' }
];

const defaultNegativeReviews = [
  {
    name: 'James',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150',
    title: 'Associates are from India',
    content: 'They hire India based interns to do the applying who don\'t even speak english.',
    date: 'Dec 2025',
    reply: 'That\'s correct and we\'re very transparent about it. QBay Careers is a human assistant service... Our assistants are trained to handle the grunt and operational work.'
  },
  {
    name: 'David',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150',
    title: 'Using AI for Customizing Resumes',
    content: 'They use Gemini/ChatGPT to write the cover letter and tailor resumes. Which doesn\'t make sense for all jobs.. writing the same content by just changing job title... that any free ai can.',
    date: 'Sep 2025',
    reply: 'That\'s correct and we\'re very transparent about it. We use AI to scale our workflows but every step is reviewed by human experts to ensure quality.'
  },
  {
    name: 'Manoj',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150',
    title: 'Not Issuing Full Refund when canceled',
    content: 'I paid them 1055 USD. I canceled before any work was used I only received $963 USD. As a customer, their internal operating costs are irrelevant to me. When I return an...',
    date: 'Jul 2025',
    reply: 'We have a strict refund policy which accounts for payment processing fees and initial setup time. We are completely transparent about this before any payment is made.'
  },
  {
    name: 'Sarah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150',
    title: 'No Guaranteed Job Placement',
    content: 'I thought they guaranteed a job in the UK. I haven\'t secured an offer yet after 2 months. They only provided interviews and coaching.',
    date: 'Aug 2025',
    reply: 'We do not guarantee job offers, we guarantee interviews. Ultimately securing the role depends on your performance in the interview, which we coach you extensively for.'
  },
  {
    name: 'Vikram',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=150&h=150',
    title: 'Pricing is too high',
    content: 'Their pricing for full career management is way too high compared to local agencies in Kerala. It feels overpriced for standard assistance.',
    date: 'Oct 2025',
    reply: 'We provide high-touch international consulting, not just resume forwarding. The investment directly reflects the personalized time our UK/Ireland experts spend manually reviewing your profile.'
  },
  {
    name: 'Priya',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150',
    title: 'Time Zone Constraints',
    content: 'It\'s hard to schedule mentoring meetings because of the time difference between India and the UK. Sometimes I have to attend calls very late at night.',
    date: 'Nov 2025',
    reply: 'We offer flexible slots, but our core team operates in UK/Ireland hours as that is where your target market is. Adjusting to these hours is part of the realistic preparation for working abroad.'
  }
];

export default function HomeClient({ initialData }: { initialData: any }) {
  const [cmsData, setCmsData] = useState<any>(initialData);
  const [playingAudioIdx, setPlayingAudioIdx] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = (idx: number, url: string) => {
    if (playingAudioIdx === idx) {
      audioRef.current?.pause();
      setPlayingAudioIdx(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audio.onended = () => setPlayingAudioIdx(null);
      audio.play().catch(e => console.log('Audio play failed:', e));
      audioRef.current = audio;
      setPlayingAudioIdx(idx);
    }
  };

  useEffect(() => {
    setCmsData(initialData);
  }, [initialData]);

  console.log('HomeClient Data Check:', {
    framework: cmsData?.framework ? (Array.isArray(cmsData.framework) ? 'array' : 'object') : 'missing',
    consultation: cmsData?.consultation ? 'present' : 'missing',
    services: cmsData?.services ? `array(${cmsData.services.length})` : 'missing',
    results: cmsData?.results ? (Array.isArray(cmsData.results) ? `array(${cmsData.results.length})` : 'object') : 'missing'
  });

  // Robust mapping for Framework
  const frameworkContent = cmsData?.framework || cmsData?.Framework || cmsData?.frameworkSection || {};
  const frameworkHeading = frameworkContent?.title || frameworkContent?.heading || 'Career Success <br class="hidden sm:block" /> Framework';

  const getFrameworkPhases = () => {
    if (Array.isArray(frameworkContent)) return frameworkContent;
    if (Array.isArray(frameworkContent?.phases)) return frameworkContent.phases;
    return defaultFrameworkPhases;
  };

  // Robust mapping for Consultation
  const consultationData = cmsData?.consultation || cmsData?.Consultation || cmsData?.freeConsultation || null;
  const consultationTitle = consultationData 
    ? (consultationData.title || consultationData.heading || consultationData.mainTitle || (typeof consultationData === 'string' ? consultationData : '')) 
    : 'Expert guidance for your healthcare career.';
  
  const consultationSubtitle = consultationData
    ? (consultationData.subtitle || consultationData.description || consultationData.text || '')
    : 'We provide personalized strategies to help you secure NHS and healthcare opportunities faster, backed by our guaranteed interview support and application assistance.';
    
  const consultationBadge = consultationData
    ? (consultationData.badgeText || consultationData['badge Text'] || consultationData.badge || consultationData.tag || '')
    : 'Includes €99 Value Assessment';
    
  const consultationTopHeading = consultationData
    ? (consultationData.subHeaderText || consultationData['sub Header Text'] || consultationData.topHeading || consultationData.topHeader || '')
    : 'Free 30-Minute Consultation';

  // Robust mapping for Services Section Header
  const servicesHeader = cmsData?.servicesSection || cmsData?.servicesHeader || cmsData?.services || {};
  const servicesTagline = typeof servicesHeader?.tagline === 'string' ? servicesHeader.tagline : 'Our Services';
  const servicesTitle = typeof servicesHeader?.title === 'string' ? servicesHeader.title : 'Comprehensive support for your global career journey.';
  const clientLoveData = cmsData?.clientLove || cmsData?.ClientLove || {};
  const getClientTestimonials = () => {
    // Priority: Explicit clientLove or ClientLove keys
    const raw = clientLoveData;
    
    // Strict array check: If it's an array, return it
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.testimonials)) return raw.testimonials;
    
    // Legacy/Fallback check: Only look for testimonials array if it hasn't been restructured into an object
    const legacyTestimonials = cmsData?.testimonials || cmsData?.Testimonials;
    if (Array.isArray(legacyTestimonials)) return legacyTestimonials;

    return defaultClientTestimonials;
  };

  // Robust mapping for FAQ
  const getFaqData = () => {
    return defaultFaqData;
  };

  const clientLoveTitle = clientLoveData.title || clientLoveData.heading || 'Love ❤️ Letters from our Clients';
  const clientLoveDescription = clientLoveData.description || clientLoveData.subtitle || clientLoveData.text || "Don't just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.";

  const trustpilotData = cmsData?.trustpilotReviews || defaultTrustpilotReviews;
  const frameworkPhases = getFrameworkPhases() as typeof defaultFrameworkPhases;
  const clientTestimonials = getClientTestimonials() as typeof defaultClientTestimonials;
  const faqData = getFaqData() as typeof defaultFaqData;
  const audioReviewsData = cmsData?.audioReviews || defaultAudioReviews;
  const heroImages = (() => {
    const cms = Array.isArray(cmsData?.hero?.images) ? cmsData.hero.images : [];
    const merged = [...cms, ...defaultHeroImages.filter(d => !cms.includes(d))];
    return merged.length >= 6 ? merged.slice(0, 6) : [...merged, ...defaultHeroImages].slice(0, 6);
  })() as string[];
  const heroBadges = (Array.isArray(cmsData?.hero?.badges) ? cmsData.hero.badges : ['100k+ Helped', '4.8 Trustpilot', '1:1 Experts', '90-Day Calls', 'Gov Approved']) as string[];
  const badgeIcons = [BadgeCheck, Star, PhoneCall, ShieldCheck, Globe];
  
  // Custom badge content for Trustpilot replacement
  const badgeContent = (badge: string, idx: number) => {
    if (badge === '4.8 Trustpilot') {
      return (
        <div className="flex items-center gap-2">
          <img 
            src="/Green-Star-on-Gray-Checkerboard-1.png" 
            alt="Trustpilot Rating" 
            className="h-6 w-6 object-contain"
          />
          <span>{badge}</span>
        </div>
      );
    }
    return badge;
  };
  
  // Robust mapping for WhatsApp Results
  const resultsData = cmsData?.results || cmsData?.Results || null;
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
        // Only consider it an image if it has a common image extension or starts with http and looks like a Pexels/Unsplash link
        const isImagePattern = /\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)(\?.*)?$/i.test(trimmed) || 
                               (trimmed.startsWith('http') && (trimmed.includes('/photos/') || trimmed.includes('/img/')));
        
        if (isImagePattern) {
          urls.push(trimmed);
        }
      } else if (val && typeof val === 'object' && !Array.isArray(val)) {
        // Scan object properties (but skip common text fields if they are explicitly known)
        Object.entries(val).forEach(([k, v]) => {
          if (!['title', 'subtitle', 'heading', 'subHeading', 'description', 'text'].includes(k.toLowerCase())) {
            scan(v);
          }
        });
      } else if (Array.isArray(val)) {
        val.forEach(scan);
      }
    };
    scan(resultsData);
    return urls.length > 0 ? urls : [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => `/testimonials/whatsapp${num}.jpeg`);
  })().filter(src => src && !src.includes('[object') && (src.includes('.') || src.includes('/') || src.startsWith('http'))) as string[];

  console.log('Final Results Images Count:', resultsImages.length);
  console.log('Final Results Images:', resultsImages);

  // Process Video Sections
  const testimonialsCms = cmsData?.testimonials || {};
  
  // 1. Grid Testimonials (Real Results section)
  // Look for nested testimonialGrid.videoUrls, then old simple array, then fallback
  const gridUrls = Array.isArray(testimonialsCms.testimonialGrid?.videoUrls) 
    ? testimonialsCms.testimonialGrid.videoUrls 
    : (Array.isArray(testimonialsCms) ? testimonialsCms : testimonialShortUrls);
  
  const testimonialShortsData = mapYoutubeUrls(gridUrls, 'maxresdefault');
  const testimonialsGridTitle = testimonialsCms.testimonialGrid?.title || 'Real Results. Real Stories.';

  // 2. Animated Shorts (Carousel section)
  // Look for nested animatedShorts.videoUrls, then fallback
  const carouselUrls = Array.isArray(testimonialsCms.animatedShorts?.videoUrls)
    ? testimonialsCms.animatedShorts.videoUrls
    : youtubeShortUrls;
    
  const youtubeShortsData = mapYoutubeUrls(carouselUrls, 'hqdefault');

  const servicesList = (Array.isArray(cmsData?.services) ? cmsData.services : [
    {
      title: 'Guaranteed Interview Calls',
      slug: 'guaranteed-interview-calls',
      description: 'Connect with the right employers and receive guaranteed interview opportunities.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'We Apply For You',
      slug: 'we-apply-for-you',
      description: 'Our team handles your profile optimization and job applications to boost your chances.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'NHS - HSC Applications',
      slug: 'nhs-hsc-applications',
      description: 'Dedicated team applies to relevant NHS and HSC roles on your behalf.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'CPD (Continuing Professional Development)',
      slug: 'cpd-professional-development',
      description: 'Enhance your skills with industry-recognized CPD programs for career advancement.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Domain Specified Interview Assistance',
      slug: 'domain-specified-interview-assistance',
      description: 'Prepare for industry-specific interviews with practical tips and expert support.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'ATS – CV, LinkedIn, Cover Letter',
      slug: 'ats-cv-linkedin-cover-letter',
      description: 'Stand out with ATS-optimized CVs, impactful cover letters, and LinkedIn profiles.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Humanized SOP Guidance And Preparation',
      slug: 'humanized-sop-guidance',
      description: 'Build a strong and well-structured SOP that reflects your career goals.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Internship Guidance',
      slug: 'internship-guidance',
      description: 'Get valuable internship opportunities and hands-on experience to kickstart your career.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    },
  ]) as any[];

  const [activePhase, setActivePhase] = useState(0);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isResultsPaused, setIsResultsPaused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
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
  }, [isPaused]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Wider, more stable trigger zone
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          if (index !== null) {
            setActivePhase(parseInt(index));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('[data-framework-step]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#1A112B]">


      <QBayNavbar />

      <section
        id="home"
        className="relative pt-32 pb-0 lg:pt-40 lg:pb-0 overflow-hidden scroll-mt-24 bg-[#FDFCFE]"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-50 pointer-events-none" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920")' }}
        />
        <div className="absolute inset-0 z-0 bg-[#FDFCFE]/80 backdrop-blur-[2px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 lg:mb-6">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex flex-wrap justify-center gap-3">
              {heroBadges.map((badge, idx) => {
                const Icon = badgeIcons[idx % badgeIcons.length];
                return (
                  <div key={idx} className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-[#2D1B4D] shadow-sm">
                    {badge === '4.8 Trustpilot' ? (
                      badgeContent(badge, idx)
                    ) : (
                      <>
                        <Icon className="h-4 w-4 text-purple-600" />
                        {badge}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <h1 
              className="mt-10 text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-[#160E22] sm:text-7xl lg:text-[6rem]"
              dangerouslySetInnerHTML={{ __html: cmsData?.hero?.title || 'A SMARTER <br/> WAY TO APPLY' }}
            />
            <p className="mt-6 text-xl font-bold text-[#5D4A7A] sm:text-2xl lg:text-3xl max-w-3xl mx-auto">
              {cmsData?.hero?.subtitle || 'A Faster Way To Get Interview Calls.'}
            </p>

            <p className="mt-8 text-base font-semibold text-[#4B2C83]">
              {cmsData?.hero?.descriptionHeader || 'Career success starts with the right guidance'}
            </p>
            <p className="mt-2 text-base leading-relaxed text-[#5D4A7A]/80 sm:text-lg max-w-2xl mx-auto">
              {cmsData?.hero?.descriptionBody || "You're not just another profile to us. We guide you personally, improve your job search approach, and stay committed until you start seeing interview results."}
            </p>
          </div>
        </div>

        {/* Auto-Scrolling 3D Image Gallery */}
        <div className="relative z-10 w-full mt-10 lg:mt-16 pb-10 lg:pb-20 overflow-hidden">
          {/* Side fade gradients for depth */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 lg:w-40 bg-gradient-to-r from-[#FDFCFE] via-[#FDFCFE]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 lg:w-40 bg-gradient-to-l from-[#FDFCFE] via-[#FDFCFE]/80 to-transparent z-20 pointer-events-none" />

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 animate-hero-scroll w-max">
            {[...heroImages, ...heroImages].map((src, i) => {
              const isOdd = i % 2 !== 0;
              const translateY = isOdd ? 18 : 0;
              const rotation = isOdd ? 1.5 : -1.5;

              return (
                <div
                  key={i}
                  className="hero-float-animation flex-shrink-0"
                  style={{ animationDelay: `${(i % heroImages.length) * 0.4}s` }}
                >
                  <div
                    className="relative w-[260px] sm:w-[340px] lg:w-[440px] xl:w-[520px] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 group cursor-pointer transition-shadow duration-500 hover:shadow-purple-500/30"
                    style={{
                      transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
                    }}
                  >
                    <img
                      src={src}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      alt={`Career Professional ${(i % heroImages.length) + 1}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-white py-24 sm:py-32 scroll-mt-24 border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col items-start gap-10">
            {/* Top Highlight Badge */}
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <span className="inline-flex w-fit items-center rounded-md bg-[#EDE1F5] px-3 py-1.5 text-[13px] font-bold tracking-wide text-[#2D1B4D]">
                {consultationBadge}
              </span>
              <span className="text-xs font-bold tracking-[0.15em] text-slate-500 uppercase">
                {consultationTopHeading}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1A112B] tracking-tight leading-[1.15]">
              {consultationTitle}
            </h2>
            
            <p className="text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
              {consultationSubtitle}
            </p>

            <div className="w-full h-[1px] bg-slate-100 my-4" />

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 w-full">
              {(Array.isArray(consultationData?.features) ? consultationData.features : [
                'Guaranteed Interview Support',
                'We Apply on Your Behalf',
                'NHS & HSC Application Assistance',
                'CPD & Internship Guidance',
              ]).map((feature: any) => (
                <div key={typeof feature === 'string' ? feature : feature.title} className="flex items-start gap-4">
                  <div className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="text-base font-medium text-slate-800">{typeof feature === 'string' ? feature : feature.title}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <a
                href={consultationData?.ctaLink || "/contact"}
                className="inline-flex items-center justify-center gap-3 bg-[#1A112B] px-10 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-black w-full sm:w-auto overflow-hidden group relative"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0" />
                <img src="/google-meet-icon.png" alt="Google Meet" className="w-5 h-5 object-contain relative z-10" />
                <span className="relative z-10">{consultationData?.ctaLabel || 'Book your free consultancy'}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <section id="about" className="border-t border-gray-100 scroll-mt-24 py-20 bg-[#FDFCFE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-purple-600 uppercase mb-4">{servicesTagline}</h2>
            <h3 className="text-4xl sm:text-5xl font-bold text-[#1A112B] tracking-tight leading-[1.2]">
              {servicesTitle}
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesList.filter(item => item.title !== 'Mental Wellness').map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-purple-100/50 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-200"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-[#2D1B4D] mb-3 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 mb-6 flex-1">
                    {item.description || item.desc}
                  </p>
                  
                  <div className="mt-auto">
                    <a
                      href={item.slug ? `/services/${item.slug}` : '#'}
                      className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 group/link transition-colors"
                    >
                      View More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full-width Mental Wellness card */}
          <div className="mt-12">
            <div className="group relative overflow-hidden rounded-3xl border border-purple-100/50 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:border-purple-200">
              <div className="flex flex-col lg:flex-row min-h-[320px]">
                {/* Image side */}
                <div className="lg:w-1/3 aspect-[2/1] lg:aspect-auto overflow-hidden bg-purple-50">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
                    alt="Mental Wellness"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content side */}
                <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-xs font-bold text-purple-700 mb-6 w-fit border border-purple-100">
                    Mindset Support
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2D1B4D] mb-4">
                    Mental Wellness
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                    Our guidance helps you stay mentally strong, confident, and prepared for career challenges. We provide comprehensive support for your mental well-being throughout your job search journey.
                  </p>
                  <a
                    href="/services/mental-wellness"
                    className="inline-flex items-center gap-2 text-base font-bold text-purple-600 hover:text-purple-800 group/link transition-colors w-fit"
                  >
                    Explore support programs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="framework" className="relative scroll-mt-24 overflow-hidden font-sans" style={{ background: 'linear-gradient(135deg, #3B9AE8 0%, #2B7BD6 50%, #1E6AC4 100%)' }}>
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16 lg:mb-20">
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
              dangerouslySetInnerHTML={{ __html: frameworkHeading }}
            />
            <p className="text-white/80 text-base sm:text-lg max-w-md leading-[1.8] lg:text-right">
              We are committed to helping you achieve your career goals and land your dream job in a timeframe that exceeds your expectations.
            </p>
          </div>

          {/* Phase Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {frameworkPhases.map((phase, idx) => (
              <div
                key={phase.number}
                className="relative p-8 sm:p-10 lg:p-12 bg-[#3B9AE8]/60 backdrop-blur-sm hover:bg-[#2B7BD6]/70 transition-colors duration-500 group"
              >
                {/* Large watermark number */}
                <span 
                  className="absolute top-2 right-4 text-[7rem] sm:text-[8rem] lg:text-[9rem] font-black text-white/[0.12] leading-none select-none pointer-events-none" 
                  style={{ 
                    fontWeight: 900,
                    WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)'
                  }}
                >
                  {phase.number}
                </span>

                {/* Phase title */}
                <h3 className="relative z-10 text-lg sm:text-xl font-extrabold text-white italic mb-4 leading-snug tracking-wide">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-white/70 text-sm leading-[1.8] mb-6">
                  {phase.description}
                </p>

                {/* Detail bullets */}
                <ul className="relative z-10 space-y-4">
                  {phase.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-white/80 flex-shrink-0" />
                      <span className="text-sm text-white/90 leading-[1.7]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CTA Card - fills last slot */}
            <div className="relative p-8 sm:p-10 lg:p-12 bg-white/10 backdrop-blur-sm flex flex-col justify-center">
              <p className="text-white text-base sm:text-lg leading-[1.8] mb-8">
                Contact us today to arrange your initial call and begin your journey towards landing your dream job in 30 days or less.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#2B7BD6] px-8 py-4 rounded-xl text-sm font-bold tracking-wide hover:bg-white/90 transition-all shadow-lg shadow-black/10 group/cta w-full sm:w-auto"
              >
                GET STARTED
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

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
              {resultsImages.map((src, idx) => (
                <div
                  key={idx}
                  className="min-w-[240px] w-[70vw] sm:w-[300px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border border-purple-100 bg-white cursor-pointer group"
                  onClick={() => setSelectedImage(src)}
                >
                  <div className="relative">
                    <img
                      src={src}
                      alt={`Student success story ${idx + 1}`}
                      className="w-full h-[380px] object-cover"
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

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Success story"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>
      )}

      {/* Removed Google Reviews Section */}

      {/* Trustpilot Reviews Section */}
      <section id="trustpilot-reviews" className="bg-[#1C1C28] py-24 scroll-mt-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
             <div className="max-w-xl">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Excellent on Trustpilot</h2>
               <p className="text-gray-400 text-lg">See why thousands of job seekers trust QBay Careers for their professional journey.</p>
             </div>
             <div className="flex flex-col items-center md:items-end">
               <div className="flex items-center gap-1 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="bg-[#00B67A] p-1.5 rounded-sm">
                     <Star className="w-5 h-5 fill-white text-white" />
                   </div>
                 ))}
               </div>
               <p className="text-sm text-gray-400">Based on <strong className="text-white">400+ reviews</strong></p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustpilotData.map((review: any, idx: number) => {
              const ratingCount = !isNaN(Number(review.rating)) && Number(review.rating) > 0 ? Number(review.rating) : 5;
              
              return (
                <div key={idx} className="bg-[#262635] rounded-xl p-6 border border-white/5 hover:border-[#00B67A]/50 transition-colors flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(ratingCount)].map((_, i) => (
                      <div key={i} className="bg-[#00B67A] p-1 rounded-sm">
                        <Star className="w-3 h-3 fill-white text-white" />
                      </div>
                    ))}
                    {[...Array(5 - ratingCount)].map((_, i) => (
                       <div key={`empty-${i}`} className="bg-gray-600 p-1 rounded-sm">
                         <Star className="w-3 h-3 fill-gray-800 text-gray-800" />
                       </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3 leading-snug">{review.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                    {review.content}
                  </p>
                <div className="mt-auto">
                  <p className="font-medium text-white text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{review.time}</p>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Audio Reviews Section */}
      <section id="audio-reviews" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#2D1B4D] tracking-tight mb-4">
              Hear their success stories
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Listen to real experiences from our candidates who cracked top-tier interviews and landed their dream roles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
             {audioReviewsData.map((audio: any, idx: number) => (
               <div key={idx} className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-purple-100/60 flex items-stretch gap-3 sm:gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow group relative overflow-hidden">
                 {/* Left: Image Container */}
                 <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0">
                   <img src={audio.avatar} alt={audio.name} className="w-full h-full rounded-xl object-cover" />
                 </div>

                 {/* Right: Content & Controls */}
                 <div className="flex-1 flex flex-col py-0.5 justify-between min-w-0">
                   {/* Top Right Flag */}
                   <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 rounded-full border border-gray-100 overflow-hidden shadow-sm bg-gray-50 flex-shrink-0">
                     <img src={audio.flag} alt="Country flag" className="w-full h-full object-cover" />
                   </div>

                   {/* Name and Role */}
                   <div className="pr-10 min-w-0 pt-2">
                     <h3 className="font-extrabold text-[#2D1B4D] text-base sm:text-lg leading-tight mb-1 truncate">{audio.name}</h3>
                     <p className="text-xs sm:text-sm font-bold text-violet-600 truncate">{audio.role}</p>
                   </div>

                   {/* Play & Waveform */}
                   <div className="flex items-center gap-2 sm:gap-3 mt-3">
                     <button 
                       onClick={() => {
                         if (audio.audioUrl) {
                           toggleAudio(idx, audio.audioUrl);
                         }
                       }}
                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                         playingAudioIdx === idx 
                           ? 'border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-100' 
                           : 'border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white'
                       }`}
                     >
                       {playingAudioIdx === idx ? (
                         <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                       ) : (
                         <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 fill-current" />
                       )}
                     </button>
                     
                     {/* Waveform Visualization */}
                     <div className="flex flex-1 items-center gap-[2px] sm:gap-1 h-5 overflow-hidden pr-2">
                       {[30, 60, 40, 80, 50, 90, 70, 40, 60, 100, 80, 50, 40, 60, 30, 70, 90, 50, 80, 40, 60, 30, 70, 90].map((h, i) => (
                         <div 
                           key={i} 
                           className={`w-[3px] sm:w-1 rounded-full transition-all duration-300 ${
                             playingAudioIdx === idx
                               ? 'bg-purple-600 opacity-100 animate-pulse'
                               : 'bg-violet-600 opacity-60 group-hover:opacity-100'
                           }`} 
                           style={{ 
                             height: playingAudioIdx === idx ? `${Math.max(20, h + (Math.sin(i) * 20))}%` : `${h}%`,
                             animationDelay: `${i * 0.05}s`
                           }}
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

      <section id="testimonials" className="bg-[#F9F5FF] py-24 scroll-mt-24 pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#2D1B4D] text-center mb-16 sm:text-5xl">
            {testimonialsGridTitle}
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {testimonialShortsData.map((video: { id: string; url: string; thumbnail: string }, idx: number) => (
                <a
                  key={video.id + idx}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-xl border border-white/10 relative">
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
                  </div>
                </a>
            ))}
          </div>

        </div>
      </section>

      <section id="client-love" className="relative bg-gradient-to-b from-white via-[#F8F7FF] to-white py-24 sm:py-32 scroll-mt-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-violet-200/30 rounded-full blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D1B4D] tracking-tight mb-6">
              {clientLoveTitle}
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-12 bg-purple-600 rounded-full" />
              <Quote className="w-5 h-5 text-purple-600 fill-current" />
              <div className="h-1 w-12 bg-purple-600 rounded-full" />
            </div>
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
                {/* Floating Quote Icon */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Quote className="w-6 h-6 fill-current" />
                </div>

                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="relative w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2D1B4D] text-lg leading-tight">{testimonial.name}</h3>
                      <p className="text-sm font-semibold text-purple-600/80 mt-1 uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <p className="text-[#4A4A68] leading-relaxed text-base italic font-medium">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-purple-100/50 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= (testimonial.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Review</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glaringly Painful Reviews Section */}
      <section id="painful-reviews" className="bg-gradient-to-br from-[#F5F3FF] to-[#FAFAFA] py-24 scroll-mt-24 font-sans border-y border-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#2D1B4D] tracking-tight flex items-center justify-center gap-3 flex-wrap mb-4">
              Our Brutally Honest 1 
              <span className="bg-red-500 text-white rounded-md px-1.5 py-1.5 inline-flex shadow-sm">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
              </span> 
              Reviews 
              <span className="text-purple-300">
                <Info className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={1.5} />
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap text-lg text-slate-600 mt-2">
              <p>There is a reason for this section.</p>
              <button className="bg-violet-600 text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-violet-700 transition-colors shadow-sm tracking-wide">
                Read Why?
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {defaultNegativeReviews.map((review, idx) => (
              <div key={idx} className="bg-white rounded-[1.25rem] p-7 md:p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)] hover:shadow-xl transition-shadow duration-300 flex flex-col relative overflow-hidden group border border-purple-50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100" />
                    <h3 className="font-bold text-gray-900 text-[17px]">{review.name}</h3>
                  </div>
                  <div className="flex gap-0.5">
                    <div className="bg-red-500 p-[2px] rounded-sm">
                       <Star className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-200 p-[2px] rounded-sm">
                         <Star className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-4 text-[15px]">{review.title}</h4>
                <p className="text-gray-500 leading-relaxed text-[15px] flex-1 mb-8">
                  {review.content}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-violet-600 font-bold text-sm flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                    Read More <ArrowRight className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">{review.date}</span>
                </div>

                {/* Hover Reply Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-[22%] bg-[#2D1B4D] rounded-t-xl rounded-b-[1.25rem] p-6 sm:p-8 flex flex-col translate-y-[105%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 shadow-[0_-10px_40px_rgb(0,0,0,0.15)]">
                  <div>
                    <h5 className="text-violet-400 tracking-[0.15em] text-[10px] font-bold uppercase mb-4 blur-[0.3px]">FOUNDERS REPLY</h5>
                    <p className="text-white/95 text-[15px] leading-relaxed">
                      {review.reply}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shorts" className="bg-[#FDFBFF] py-24 scroll-mt-24">
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide px-4 md:px-0"
          >
            {youtubeShortsData.map((s, idx) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="relative w-[220px] aspect-[9/16] flex-shrink-0 rounded-[2.2rem] overflow-hidden bg-gray-900 shadow-2xl border border-white/10 group cursor-pointer block"
              >
                <img
                  src={s.thumbnail}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt={`QBay Short ${idx + 1}`}
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
        </div>
      </section>

      <section className="bg-[#FAF5FB] py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:px-16 sm:py-12 p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left side text content */}
            <div className="z-10 flex-1 space-y-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-violet-700" />
                 <span className="text-sm font-bold text-violet-700">
                   Trusted by 200+ job seekers
                 </span>
               </div>

               <h2 className="text-2xl md:text-4xl font-medium text-[#2D1B4D] leading-[1.4]">
                 &ldquo;Put your energy into <span className="text-violet-700">interview preparation</span>, we&apos;ll take care of the applications for you.&rdquo;
               </h2>

               <div className="pt-4">
                 <h3 className="text-base md:text-lg font-bold text-gray-400">
                   Fazil Karatt
                 </h3>
                 <p className="text-xs md:text-sm font-bold text-gray-400 mt-1">
                   Founder & CEO
                 </p>
               </div>
            </div>

            {/* Right side image content */}
            <div className="relative w-[280px] h-[320px] md:h-[380px] md:w-[320px] flex-shrink-0 self-center md:self-end -mb-12 mt-8 md:mt-0 md:-mr-12 xl:-mr-8 group cursor-pointer">
              <div 
                className="absolute inset-0 bg-[center_bottom] bg-no-repeat bg-contain filter grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                style={{
                   backgroundImage: `url('/Hizana-Web-61-768x768.webp')`,
                   maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
              />
            </div>

          </div>
        </div>
      </section>

      <section className="bg-[#FAF5FB] py-24 scroll-mt-24 overflow-hidden relative border-t border-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D1B4D] mb-4 font-serif">
            Top Universities Chosen by
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold text-violet-700 font-serif">
            Our Partnered Students
          </h3>
        </div>

        {/* Top Marquee Row */}
        <div className="flex overflow-hidden relative w-full mb-12">
          {/* We duplicate the content to create a seamless infinite scroll loop */}
          <div className="flex gap-16 min-w-full animate-marquee items-center justify-start shrink-0 px-8">
            {topRowLogos.map((src, idx) => (
              <div
                key={idx}
                className="flex min-w-[280px] items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={src}
                  alt="University logo"
                  className="h-16 w-auto max-w-[280px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-16 min-w-full animate-marquee items-center justify-start shrink-0 px-8" aria-hidden="true">
            {topRowLogos.map((src, idx) => (
              <div
                key={`dup-${idx}`}
                className="flex min-w-[280px] items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={src}
                  alt="University logo"
                  className="h-16 w-auto max-w-[280px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row (Reverse) */}
        <div className="flex overflow-hidden relative w-full">
          <div className="flex gap-16 min-w-full animate-marquee-reverse items-center justify-start shrink-0 px-8">
            {bottomRowLogos.map((src, idx) => (
              <div
                key={idx}
                className="flex min-w-[280px] items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={src}
                  alt="University logo"
                  className="h-16 w-auto max-w-[280px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-16 min-w-full animate-marquee-reverse items-center justify-start shrink-0 px-8" aria-hidden="true">
            {bottomRowLogos.map((src, idx) => (
              <div
                key={`dup-${idx}`}
                className="flex min-w-[280px] items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={src}
                  alt="University logo"
                  className="h-16 w-auto max-w-[280px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fade overlays for the edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#FAF5FB] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FAF5FB] to-transparent z-10 pointer-events-none" />
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24 scroll-mt-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A112B] mb-4">
              Need-to-Know Answers
            </h2>
            <p className="text-lg md:text-xl text-gray-500">
              Quick Answers to Common Questions
            </p>
          </div>

          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="bg-[#FAF5FB]/50 rounded-[2rem] p-8 md:p-12 h-fit space-y-6">
                {faqData.slice(0, 9).map((faq, idx) => (
                  <div key={idx} className="border-b border-purple-100/50 pb-6 last:border-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full flex items-start gap-4 text-left group transition-all"
                    >
                      <ChevronDown
                        className={`w-5 h-5 mt-1 shrink-0 text-[#5D4A7A] transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : '-rotate-90'}`}
                      />
                      <span className={`text-[#5D4A7A] text-lg transition-all ${openFaqIndex === idx ? 'font-bold' : 'font-medium group-hover:text-purple-900'}`}>
                        {faq.q}
                      </span>
                    </button>
                    
                    <div className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="text-gray-600 pl-9 leading-relaxed text-base">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="bg-[#FAF5FB]/50 rounded-[2rem] p-8 md:p-12 h-fit space-y-6">
                {faqData.slice(9, 18).map((faq, idx) => {
                  const globalIdx = idx + 9;
                  return (
                    <div key={globalIdx} className="border-b border-purple-100/50 pb-6 last:border-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === globalIdx ? null : globalIdx)}
                        className="w-full flex items-start gap-4 text-left group transition-all"
                      >
                        <ChevronDown
                          className={`w-5 h-5 mt-1 shrink-0 text-[#5D4A7A] transition-transform duration-300 ${openFaqIndex === globalIdx ? 'rotate-180' : '-rotate-90'}`}
                        />
                        <span className={`text-[#5D4A7A] text-lg transition-all ${openFaqIndex === globalIdx ? 'font-bold' : 'font-medium group-hover:text-purple-900'}`}>
                          {faq.q}
                        </span>
                      </button>
                      
                      <div className={`grid transition-all duration-300 ease-in-out ${openFaqIndex === globalIdx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="text-gray-600 pl-9 leading-relaxed text-base">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Letter & Final CTA Section */}
      <section className="bg-gradient-to-b from-[#FAF5FB] to-white py-24 sm:py-32 relative border-t border-purple-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          {/* Letter Part */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A112B] tracking-tight">
              {cmsData?.founderLetter?.title || 'Dear Fellow Job Seeker,'}
            </h2>
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6 max-w-3xl mx-auto font-medium">
              {cmsData?.founderLetter?.content ? (
                <div dangerouslySetInnerHTML={{ __html: cmsData.founderLetter.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <>
                  <p>
                    QBay Career was built with a simple mission: to take the frustration out of your job hunt. We aren&apos;t a faceless tech giant pushing &quot;mass-apply&quot; AI tools. In fact, we know recruiters instantly spot and reject low-effort AI applications. That&apos;s why we take a completely human approach. 
                  </p>
                  <p>
                    Our dedicated team handles the heavy lifting for you. We craft ATS-friendly custom resumes and cover letters, and personally apply to highly relevant jobs on your behalf in under 24 hours. By taking the grueling application process off your plate, we give you your time back so you can focus on what actually gets you hired: networking and interview prep. 
                  </p>
                  <p>
                    When you choose QBay, you&apos;re partnering with a small, passionate team deeply invested in your success. Thank you for trusting us to help you take the next big step in your career.
                  </p>
                </>
              )}
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-500 pt-4">
              {cmsData?.founderLetter?.signature || 'Welcome to QBay Career.'}
            </p>
          </div>

          <div className="w-24 h-px bg-purple-200 mx-auto" />

          {/* CTA Part */}
          <div className="space-y-10 pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A112B]">
                {cmsData?.finalCTA?.title || "Have more questions? Let's chat!"}
              </h2>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                {cmsData?.finalCTA?.subtitle || "We understand that you might have questions specific to your situation. Schedule a call with our founder – we're here to help you succeed!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16 pt-4">
              {(Array.isArray(cmsData?.finalCTA?.benefits) ? cmsData.finalCTA.benefits : [
                { icon: CalendarDays, text: 'Flexible Scheduling' },
                { icon: PhoneCall, text: 'One-on-One Call' },
                { icon: MessageCircle, text: 'Personalized Advice' },
              ]).map((benefit: any, idx: number) => {
                const Icon = benefit.icon || [CalendarDays, PhoneCall, MessageCircle][idx % 3];
                return (
                  <div key={idx} className="flex items-center gap-3 text-[#5D4A7A] font-semibold text-lg">
                    <Icon className="w-6 h-6" />
                    <span>{typeof benefit === 'string' ? benefit : benefit.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center justify-center pt-8 gap-4">
              <a
                href={cmsData?.finalCTA?.ctaLink || "#book"}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-[#594A7A] rounded-xl hover:bg-[#4a3b61] hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
              >
                {cmsData?.finalCTA?.ctaLabel || 'Talk to Founder'}
              </a>
              <p className="text-sm font-medium text-gray-400">
                {cmsData?.finalCTA?.footerText || 'Limited slots available. Book your call now!'}
              </p>
            </div>
          </div>

        </div>
      </section>

      <FeaturedOn />
      <QBayFooter />

    </main>
  );
}
