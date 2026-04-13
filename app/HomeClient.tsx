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
  Quote,
} from 'lucide-react';
import QBayNavbar from '@/components/QBayNavbar';
import FeaturedOn from '@/components/FeaturedOn';
import QBayFooter from '@/components/QBayFooter';
import { supabase } from '@/lib/supabase';

const defaultFrameworkPhases = [
  {
    number: '01',
    title: 'Partnership',
    description: 'Relationships based on transparency and trust',
    details: [
      'Relationships based on transparency and trust',
      'Fully integrate & align with our client\'s goals, people & processes',
    ],
  },
  {
    number: '02',
    title: 'Reputation',
    description: 'Consistent, long-established pattern of repeat engagements',
    details: [
      'Consistent, long-established pattern of repeat engagements',
      'Fully referenceable across our entire client base',
    ],
  },
  {
    number: '03',
    title: 'Expertise',
    description: 'Highly qualified and experienced Coaching Community',
    details: [
      'Highly qualified and experienced Coaching Community',
      'Clients benefit from our practitioner-based model',
    ],
  },
  {
    number: '04',
    title: 'Cost competitiveness',
    description: 'One of the most cost-effective firms on the market',
    details: [
      'One of the most cost-effective firms on the market',
      'Providing the best return on investment',
    ],
  },
  {
    number: '05',
    title: 'Capability',
    description: 'Proven capability across the entire Coaching Spectrum',
    details: [
      'Proven capability across the entire Coaching Spectrum',
      'Specialists in Career Success',
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

export default function HomeClient({ initialData }: { initialData: any }) {
  const [cmsData, setCmsData] = useState<any>(initialData);

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

  const clientLoveTitle = clientLoveData.title || clientLoveData.heading || 'Love ❤️ Letters from our Clients';
  const clientLoveDescription = clientLoveData.description || clientLoveData.subtitle || clientLoveData.text || "Don't just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.";

  // Negative Reviews (Brutally Honest)
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
    avatar: "/Hizana-Web-61-768x768.webp" // Reusing the existing founder image from the site
  };
  const negativeReviewsData = (Array.isArray(cmsData?.negativeReviews) && cmsData.negativeReviews.length > 0)
    ? cmsData.negativeReviews
    : defaultNegativeReviews;

  const getFaqData = () => {
    return defaultFaqData;
  };


  const frameworkPhases = getFrameworkPhases() as typeof defaultFrameworkPhases;
  const clientTestimonials = getClientTestimonials() as typeof defaultClientTestimonials;
  const faqData = getFaqData() as typeof defaultFaqData;
  const heroImages = (() => {
    const cms = Array.isArray(cmsData?.hero?.images) ? cmsData.hero.images : [];
    const merged = [...cms, ...defaultHeroImages.filter(d => !cms.includes(d))];
    return merged.length >= 6 ? merged.slice(0, 6) : [...merged, ...defaultHeroImages].slice(0, 6);
  })() as string[];
  const heroBadges = (Array.isArray(cmsData?.hero?.badges) ? cmsData.hero.badges : ['100k+ Helped', '4.8 Trustpilot', '1:1 Experts', '90-Day Calls', 'Gov Approved']) as string[];
  const badgeIcons = [BadgeCheck, Star, PhoneCall, ShieldCheck, Globe];
  
  // Custom badge content for Trustpilot, Gov Approved, 90-Day Calls, 100k+ Helped, and Globe/countries replacement
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
    if (badge === 'Gov Approved') {
      return (
        <div className="flex items-center gap-2">
          <img 
            src="/verified.png" 
            alt="Verified" 
            className="h-6 w-6 object-contain"
          />
          <span>{badge}</span>
        </div>
      );
    }
    if (badge === '90-Day Calls') {
      return (
        <div className="flex items-center gap-2">
          <img 
            src="/call.png" 
            alt="90-Day Calls" 
            className="h-6 w-6 object-contain"
          />
          <span>{badge}</span>
        </div>
      );
    }
    if (badge === '100k+ Helped') {
      return (
        <div className="flex items-center gap-2">
          <img 
            src="/help.jpg" 
            alt="100k+ Helped" 
            className="h-6 w-6 object-contain"
          />
          <span>{badge}</span>
        </div>
      );
    }
    // Replace Globe icon with global image for any badge that would use it
    if (idx % 5 === 4) {
      return (
        <div className="flex items-center gap-2">
          <img 
            src="/global.png" 
            alt="Global" 
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
  // resultsImages: supports both old string[] format and new {src, flag}[] format
  const resultsImages = (() => {
    const defaultImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({
      src: `/testimonials/whatsapp${num}.jpeg`,
      flag: 'https://flagcdn.com/w80/in.png'
    }));

    // New structure: resultsData.images is an array of {src, flag} objects
    if (resultsData?.images && Array.isArray(resultsData.images) && resultsData.images.length > 0) {
      return resultsData.images.map((item: any) => {
        if (typeof item === 'string') return { src: item, flag: 'https://flagcdn.com/w80/in.png' };
        return {
          src: item.src || item.image || '',
          flag: item.flag || 'https://flagcdn.com/w80/in.png'
        };
      }).filter((item: { src: string; flag: string }) => item.src);
    }

    // Legacy: scan for any image URLs in the data
    const urls: string[] = [];
    const scan = (val: any) => {
      if (typeof val === 'string') {
        const trimmed = val.trim();
        const isImagePattern = /\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff)(\?.*)?$/i.test(trimmed) ||
                               (trimmed.startsWith('http') && (trimmed.includes('/photos/') || trimmed.includes('/img/')));
        if (isImagePattern) urls.push(trimmed);
      } else if (val && typeof val === 'object' && !Array.isArray(val)) {
        Object.entries(val).forEach(([k, v]) => {
          if (!['title', 'subtitle', 'heading', 'subHeading', 'description', 'text', 'flag'].includes(k.toLowerCase())) {
            scan(v);
          }
        });
      } else if (Array.isArray(val)) {
        val.forEach(scan);
      }
    };
    scan(resultsData);

    if (urls.length > 0) {
      return urls
        .filter(src => src && !src.includes('[object'))
        .map(src => ({ src, flag: 'https://flagcdn.com/w80/in.png' }));
    }

    return defaultImages;
  })() as { src: string; flag: string }[];

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
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState<any | null>(null);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isResultsPaused, setIsResultsPaused] = useState(false);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
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
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-framework-step]');
      if (!elements.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          const idx = el.getAttribute('data-index');
          if (idx !== null) closestIndex = parseInt(idx);
        }
      });

      setActivePhase(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#1A112B]">


      <QBayNavbar />

      <section
        id="home"
        className="relative pt-32 pb-0 lg:pt-40 lg:pb-0 overflow-hidden scroll-mt-24 bg-[#FDFCFE]"
      >
        {(() => {
          const bgUrl = cmsData?.hero?.backgroundImage || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920';
          const isVideo = bgUrl.match(/\.(mp4|webm|ogg)$/i);
          
          if (isVideo) {
            return (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="absolute inset-0 z-0 w-full h-full object-cover opacity-50 pointer-events-none"
              >
                <source src={bgUrl} type={`video/${bgUrl.split('.').pop()}`} />
              </video>
            );
          }
          
          return (
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-50 pointer-events-none" 
              style={{ backgroundImage: `url("${bgUrl}")` }}
            />
          );
        })()}
        <div className="absolute inset-0 z-0 bg-[#FDFCFE]/80 backdrop-blur-[2px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 lg:mb-6">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex flex-wrap justify-center gap-3">
              {heroBadges.map((badge, idx) => {
                const Icon = badgeIcons[idx % badgeIcons.length];
                return (
                  <div key={idx} className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-[#2D1B4D] shadow-sm">
                    {(badge === '4.8 Trustpilot' || badge === 'Gov Approved' || badge === '90-Day Calls' || badge === '100k+ Helped' || idx % 5 === 4) ? (
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

      <section id="consultation" className="bg-white py-24 sm:py-32 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1A112B] border border-white/5 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] p-8 md:p-14 lg:p-20">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Left Column: Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-sm font-bold tracking-[0.2em] text-purple-300/60 uppercase">
                      {consultationTopHeading}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                    {consultationTitle}
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 border border-white/10 backdrop-blur-md">
                  <Star className="h-4 w-4 text-purple-400 fill-purple-400" />
                  <span className="text-sm font-bold text-purple-100">
                    {consultationBadge}
                  </span>
                </div>
                
                <p className="text-lg text-purple-100/70 leading-relaxed max-w-xl">
                  {consultationSubtitle}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {(Array.isArray(consultationData?.features) ? consultationData.features : [
                    'Guaranteed Interview Support',
                    'We Apply on Your Behalf',
                    'NHS & HSC Application Assistance',
                    'CPD & Internship Guidance',
                  ])
                  .filter((feature: any) => {
                    const text = typeof feature === 'string' ? feature : (feature?.title || feature?.text || '');
                    return text && text.trim().length > 0;
                  })
                  .map((feature: any) => {
                    const text = typeof feature === 'string' ? feature : (feature?.title || feature?.text || '');
                    return (
                      <div key={text} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/5">
                          <Check className="h-3 w-3" strokeWidth={4} />
                        </div>
                        <span className="text-[15px] font-bold text-white/90">{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Booking Card */}
              <div className="w-full lg:w-[420px] shrink-0">
                <div className="relative group">
                  {/* Decorative Glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  
                  <div className="relative bg-white rounded-[2rem] border border-white/10 p-8 shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center relative">
                        <CalendarDays className="w-10 h-10 text-purple-600" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-bounce">
                           <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-[#1A112B]">Personalized Strategy Call</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Join over 200+ healthcare professionals who started their journey here.</p>
                      </div>

                      <div className="w-full h-px bg-slate-100" />

                      <a
                        href={consultationData?.ctaLink || "/contact"}
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#1A112B] px-8 py-5 text-sm font-bold text-white transition-all hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/20"
                      >
                        <img src="/google-meet-icon.png" alt="Google Meet" className="w-5 h-5 object-contain" />
                        <span>{consultationData?.ctaLabel || 'Book your free consultancy'}</span>
                      </a>

                      <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
                        Available Slots for This Week
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gradient-to-br from-[#F8F7FF] via-white to-[#FAF5FB] py-16 scroll-mt-24 border-b border-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-purple-900/20 border border-purple-100 ring-4 ring-purple-500/5">
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
            >
              <source src="https://res.cloudinary.com/doe5qc2oe/video/upload/q_auto/f_auto/v1776056277/IMG_4996_nzlf1m.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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

      <section id="framework" className="scroll-mt-24" style={{ background: '#1a7de3' }}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 
            className="mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            dangerouslySetInnerHTML={{ __html: frameworkHeading }}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column: Phases List */}
            <div className="space-y-4">
              {frameworkPhases.map((phase, idx) => (
                <div
                  key={phase.number}
                  data-framework-step
                  data-index={idx}
                  className={`rounded-3xl p-8 sm:p-10 transition-all duration-500 border-l-4 ${
                    activePhase === idx
                      ? 'bg-white/15 shadow-2xl shadow-blue-900/20 border-white opacity-100 scale-[1.02]'
                      : 'opacity-50 border-transparent'
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold ${
                      activePhase === idx ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    <span className="mr-4 opacity-50 text-base font-medium font-mono">{phase.number}</span>
                    {phase.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    {phase.description}
                  </p>

                  {/* Mobile-only inline details */}
                  <div className={`mt-8 space-y-4 lg:hidden transition-all duration-500 ${activePhase === idx ? 'block' : 'hidden'}`}>
                    {phase.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium text-white">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Active Phase Details (Desktop only) */}
            <div className="relative hidden lg:block">
              <div className="sticky top-24 rounded-[2.5rem] bg-white/15 backdrop-blur-sm p-8 shadow-2xl sm:p-12 border border-white/20 overflow-hidden">
                {/* Large background phase number with bottom fade */}
                <div
                  className="absolute bottom-0 right-6 text-[220px] font-black text-white/10 leading-none select-none pointer-events-none transition-all duration-500"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 60%, black 100%)',
                    maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.6) 60%, black 100%)',
                  }}
                >
                  {frameworkPhases[activePhase].number}
                </div>

                <h3 className="text-2xl font-bold text-white sm:text-3xl relative z-10">
                  {frameworkPhases[activePhase].title}
                </h3>
                <div className="mt-10 space-y-6 relative z-10">
                  {frameworkPhases[activePhase].details.map((detail) => (
                    <div key={detail} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-white mt-1">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-lg font-medium text-white">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
            {testimonialShortsData.map((video, idx) => (
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
            {clientTestimonials.map((testimonial, index) => (
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

      {/* Negative Reviews Section */}
      <section id="negative-reviews" className="py-20 scroll-mt-24" style={{ background: 'linear-gradient(135deg, #e8f5f0 0%, #f0faf5 40%, #e8f5ee 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
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
                href="#why-negative"
                className="inline-flex items-center gap-1 bg-[#1a9e6e] hover:bg-[#15845c] text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
              >
                Read Why?
              </a>
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {negativeReviewsData.map((review: any, idx: number) => {
              const isExpanded = expandedReviewId === idx;
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
                      {/* Trustpilot-style 1-star rating */}
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

      <section id="shorts" className="bg-[#FDFBFF] py-24 scroll-mt-24">
        <div className="w-full overflow-hidden relative">
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
                className="relative w-[220px] aspect-[9/16] flex-shrink-0 rounded-[2.2rem] overflow-hidden bg-gray-900 shadow-2xl group cursor-pointer block"
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

          {/* Fade overlays for the edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#FDFBFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#FDFBFF] to-transparent z-10 pointer-events-none" />
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

      {/* Founder Letter Section */}
      <section className="bg-[#FAF8F6] py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* The "Letter" Card */}
          <div className="bg-[#FDFBF7] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05),0_10px_30px_-10px_rgba(0,0,0,0.03)] border border-[#E5E0D8]/50 rounded-sm p-8 md:p-16 lg:p-20 relative overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-100 via-purple-600/20 to-purple-100" />
            
            {/* Letter Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#E5E0D8]/60 pb-8">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <img src="/cropped-Adobe_Express_-_file-removebg-preview-32x32.png" alt="QBay Logo" className="w-8 h-8 opacity-40 grayscale" />
                <span className="text-xs font-bold tracking-[0.3em] text-[#A09688] uppercase">QBay Careers</span>
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B4D] font-sans tracking-tight">
                {cmsData?.founderLetter?.title || 'Dear Fellow Job Seeker,'}
              </h2>
              
              <div className="text-lg md:text-xl text-[#4A443D] leading-[1.8] space-y-8 font-serif">
                {cmsData?.founderLetter?.content ? (
                  <div 
                    className="prose prose-purple max-w-none" 
                    dangerouslySetInnerHTML={{ __html: cmsData.founderLetter.content.replace(/\n/g, '<br/>') }} 
                  />
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
                
                <p className="text-2xl md:text-3xl text-purple-900/80 font-medium pb-4">
                  {cmsData?.founderLetter?.signature || 'Welcome to QBay Career.'}
                </p>
              </div>

              {/* Signature Block */}
              <div className="mt-12 pt-12 border-t border-[#E5E0D8]/60 flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-20" />
                  <img
                    src={founderData.avatar}
                    alt={founderData.name}
                    className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-md grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-script text-purple-700 mb-1">{founderData.name}</h4>
                  <p className="text-sm font-bold text-[#A09688] tracking-widest uppercase">{founderData.role}</p>
                </div>
              </div>
            </div>

            {/* Subtle decorative "stamp" or seal */}
            <div className="absolute bottom-12 right-12 opacity-[0.03] pointer-events-none select-none">
              <img src="/cropped-Adobe_Express_-_file-removebg-preview-300x300.png" alt="Seal" className="w-48 h-48 rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white py-24 sm:py-32 relative border-t border-purple-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-10">
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
            <div className="flex-1 p-8 lg:p-14 overflow-y-auto bg-white">
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
            <div className="flex-1 bg-[#1a9e6e] p-8 lg:p-14 flex flex-col relative">
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
