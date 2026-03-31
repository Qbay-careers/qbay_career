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
} from 'lucide-react';
import QBayNavbar from '@/components/QBayNavbar';
import FeaturedOn from '@/components/FeaturedOn';
import QBayFooter from '@/components/QBayFooter';

const frameworkPhases = [
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

const clientTestimonials = [
  {
    name: 'Sophia Martinez',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'Balancing work and job applications was exhausting. Each application felt repetitive and draining. I almost gave up after weeks of no responses. But once I got structured support and a smarter strategy, everything changed. Within weeks, interviews started lining up. The clarity and consistency made all the difference. I finally felt confident and supported throughout the process.',
  },
  {
    name: 'Daniel Brooks',
    role: 'Marketing Analyst',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'Moving to a new country meant starting from scratch. I didn\'t understand how the hiring process worked here. Applications went unanswered and I felt stuck. After getting guidance and optimizing my approach, I started seeing real traction. Recruiters began reaching out. In just one month, I secured multiple offers and negotiated a better package than I expected.',
  },
  {
    name: 'Emily Chen',
    role: 'Software Developer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    content:
      'After facing a sudden layoff, I had limited time to secure a new role. The pressure was intense. Instead of applying randomly, I followed a focused and aggressive strategy. The results were unbelievable. Within four weeks, I received three strong offers and increased my salary significantly. The support system kept me motivated and organized.',
  },
];

const topRowLogos = [
  { name: 'Maynooth University', color: 'text-gray-900', img: 'M' },
  { name: 'Trinity College Dublin', color: 'text-blue-800', img: 'T' },
  { name: 'TU Dublin', color: 'text-cyan-700', img: 'TU' },
  { name: 'University College Dublin', color: 'text-blue-600', img: 'UCD' },
  { name: 'University of Windsor', color: 'text-gray-600', img: 'W' },
  { name: 'Brock University', color: 'text-red-700', img: 'B' },
];

const bottomRowLogos = [
  { name: 'UNSW Australia', color: 'text-gray-900', img: 'UNSW' },
  { name: 'Queen Mary University', color: 'text-gray-800', img: 'QM' },
  { name: 'Lincoln University', color: 'text-blue-700', img: 'L' },
  { name: 'University of New Brunswick', color: 'text-red-600', img: 'UNB' },
  { name: 'Lakehead University', color: 'text-blue-800', img: 'LU' },
  { name: 'Dalhousie University', color: 'text-gray-900', img: 'D' },
];

const faqData = [
  { q: "Who is the first Malayali career consultant in the UK?", a: "QBay Career is proud to be among the pioneers in guiding Malayalis in the UK. With expert consultants, we provide career planning, education guidance, and job placement support for Malayalis who wish to establish themselves in the UK." },
  { q: "Why do you ask for personal information?", a: "At QBay Career, our Malayali career consultant in the UK understands both Indian and UK job markets. We provide career counseling, interview preparation, resume building, and job assistance to ensure Malayalis succeed abroad." },
  { q: "How long does 2Checkout store personal data?", a: "Yes, QBay Career is a trusted Malayali career consultant in Ireland, helping students and professionals with admission guidance, career development strategies, and job placement support." },
  { q: "Who is the best career consultant in the UK for Indians?", a: "QBay Career is widely recognized as one of the best career consultants in the UK for Indians, offering personalized support for students and professionals to achieve their academic and career goals. perspiciatis." },
  { q: "Who’s the best career consultant in Ireland?", a: "Wondering who’s the best career consultant in Ireland? QBay Career stands out with a holistic approach, helping both students and working professionals shape successful futures abroad." },
  { q: "Are you a top-rated career consultant in the UK?", a: "Yes, QBay Career is a top-rated career consultant in the UK, trusted by Malayalis and Indians for interview preparation, career strategies, and overseas job placement." },
  { q: "Who is a top-rated career consultant in Ireland?", a: "QBay Career is among the top-rated career consultants in Ireland, offering tailored career strategies and trusted job assistance for international students and professionals." },
  { q: "Do you provide interview preparation assistance for international students?", a: "Yes, QBay Career is an interview preparation expert for international students, offering mock sessions, confidence coaching, and proven strategies to help you crack global interviews" },
  { q: "Can Malayalis get interview preparation assistance from you?", a: "Absolutely! QBay Career acts as a dedicated interview preparation assistant for Malayalis, helping students and professionals face international interviews with confidence." },
  { q: "Do you offer trusted interview cracking assistance?", a: "Yes, we are known as a trusted interview cracking assistant, helping Indian and Malayali students overcome interview challenges through expert coaching and personalized training." },
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

const youtubeShorts = youtubeShortUrls
  .map((url) => {
    const match = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    const id = match?.[1];
    if (!id) return null;
    return {
      id,
      url,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  })
  .filter(
    (
      s
    ): s is { id: string; url: string; thumbnail: string } => Boolean(s)
  );

const testimonialShorts = testimonialShortUrls
  .map((url) => {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    const id = match?.[1];
    if (!id) return null;
    return {
      id,
      url,
      thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    };
  })
  .filter(
    (s): s is { id: string; url: string; thumbnail: string } => Boolean(s)
  );

export default function Home() {
  const [activePhase, setActivePhase] = useState(0);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isResultsPaused, setIsResultsPaused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
    <main className="min-h-screen bg-white">
      <QBayNavbar />

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#5B3FA0] via-[#6A4BB0] to-[#8B6FD1] scroll-mt-24"
      >
        <div className="absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8 lg:pt-48 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                <BadgeCheck className="h-4 w-4 text-purple-700" />
                100k+ Helped
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                <Star className="h-4 w-4 text-purple-700" />
                4.8 Trustpilot
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                <PhoneCall className="h-4 w-4 text-purple-700" />
                90-Day Calls
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-purple-700" />
                Gov Approved
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                <Globe className="h-4 w-4 text-purple-700" />
                29 Countries
              </div>
            </div>

            <h1 className="mt-10 text-4xl font-semibold tracking-wide text-white sm:text-5xl lg:text-6xl">
              A SMARTER WAY TO APPLY
            </h1>
            <p className="mt-3 text-2xl font-medium text-white/80 sm:text-3xl">
              A Faster Way To Get Interview Calls.
            </p>

            <p className="mt-8 text-sm font-semibold text-white/90">
              Career success starts with the right guidance
            </p>
            <p className="mt-2 text-base leading-relaxed text-white/80 sm:text-lg">
              You&apos;re not just another profile to us. We guide you personally,
              improve your job search approach, and stay committed until you start
              seeing interview results.
            </p>
          </div>
        </div>

      </section>

      <section id="about" className="border-t border-gray-100 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Guaranteed Interview Calls',
                desc: 'Connect with the right employers and receive guaranteed interview opportunities.',
              },
              {
                title: 'We Apply For You',
                desc: 'Our team handles your profile optimization and job applications to boost your interview chances.',
              },
              {
                title: 'NHS - HSC Applications',
                desc: 'Our dedicated team applies to relevant NHS and HSC roles on your behalf for faster opportunities.',
              },
              {
                title: 'CPD And Internship',
                desc: 'Build your career with industry-focused CPD programs and valuable internship experience.',
              },
              {
                title: 'Domain Specified Interview Assistance',
                desc: 'We help you prepare for industry-specific interviews with practical tips and expert support.',
              },
              {
                title: 'ATS – CV, LinkedIn, Cover Letter',
                desc: 'Stand out to recruiters with ATS-optimized CVs, impactful cover letters, and a powerful LinkedIn profile.',
              },
              {
                title: 'Humanized SOP Guidance And Preparation',
                desc: 'Build a strong and well-structured SOP that reflects your career goals clearly.',
              },
              {
                title: 'Mental Wellness',
                desc: 'Our guidance helps you stay mentally strong, confident, and prepared for career challenges.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-3xl border border-purple-200/60 bg-gradient-to-b from-white to-[#E6CFF2] px-6 pb-7 pt-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="text-xl font-semibold text-[#4B2C83]">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#5D4A7A]">
                  {item.desc}
                </p>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-300/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="framework" className="bg-[#F9F5FF] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-4xl font-bold tracking-tight text-[#2D1B4D] sm:text-5xl">
            Career Success <br className="hidden sm:block" /> Framework
          </h2>

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
                      ? 'bg-white shadow-2xl shadow-purple-500/10 border-purple-600 opacity-100 scale-[1.02]'
                      : 'opacity-40 border-transparent'
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold ${
                      activePhase === idx ? 'text-purple-700' : 'text-purple-400'
                    }`}
                  >
                    <span className="mr-4 opacity-50 text-base font-medium font-mono">{phase.number}</span>
                    {phase.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#5D4A7A]/80">
                    {phase.description}
                  </p>

                  {/* Mobile-only inline details */}
                  <div className={`mt-8 space-y-4 lg:hidden transition-all duration-500 ${activePhase === idx ? 'block' : 'hidden'}`}>
                    {phase.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600/10 text-purple-600 mt-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium text-[#4B2C83]">
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
              <div className="sticky top-24 rounded-[2.5rem] bg-white p-8 shadow-2xl shadow-purple-500/5 sm:p-12">
                <h3 className="text-2xl font-bold text-[#2D1B4D] sm:text-3xl">
                  {frameworkPhases[activePhase].title}
                </h3>
                <div className="mt-10 space-y-6">
                  {frameworkPhases[activePhase].details.map((detail) => (
                    <div key={detail} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600/10 text-purple-600 mt-1">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-lg font-medium text-[#4B2C83]">
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
            <h2 className="text-4xl font-bold text-violet-700 sm:text-5xl">
              Success Stories That Inspire
            </h2>
            <p className="mt-3 text-lg font-semibold text-gray-900">
              Real Experiences. Real Results.
            </p>
            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              Don&apos;t just take our word for it—hear from students and parents
              whose journeys have been transformed by Qbay.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div
              ref={resultsScrollRef}
              onMouseEnter={() => setIsResultsPaused(true)}
              onMouseLeave={() => setIsResultsPaused(false)}
              className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative min-w-[260px] max-w-[320px] w-[80vw] sm:w-auto flex-shrink-0 rounded-[2.5rem] border-4 border-gray-50 bg-[#F4F4F9] shadow-2xl"
                >
                {/* Anniversary Badge */}
                <div className="absolute -right-2 -top-2 z-10">
                   <div className="bg-white rounded-full p-1 shadow-lg border border-purple-100">
                      <div className="bg-[#2D1B4D] text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                        5 <span className="text-[7px] leading-tight font-bold">YEARS <br/> Success</span>
                      </div>
                   </div>
                </div>

                <div className="overflow-hidden rounded-[2.5rem] bg-white">
                  {/* WhatsApp Header Mockup */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden" />
                    <div>
                      <div className="text-xs font-bold">Success Story {i}</div>
                      <div className="text-[10px] opacity-70">online</div>
                    </div>
                  </div>

                  {/* Chat Content Placeholder */}
                  <div className="h-[360px] bg-[#E5DDD5] p-4 flex flex-col gap-3 relative">
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat" />
                    
                    <div className="self-start bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-[13px] relative z-10">
                      Hi QBay! I just got the interview call from the NHS! Thank you so much for the support.
                    </div>
                    <div className="self-end bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%] text-[13px] relative z-10">
                      That&apos;s amazing news! Congratulations! We always knew your profile was strong.
                    </div>
                    <div className="self-start bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-[13px] relative z-10">
                      The mock interview sessions really helped me stay confident.
                    </div>
                  </div>

                  {/* Phone Home Bar */}
                  <div className="h-12 bg-white flex items-center justify-center">
                    <div className="w-24 h-1 rounded-full bg-black/20" />
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

      <section id="testimonials" className="bg-[#F9F5FF] py-24 scroll-mt-24 pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#2D1B4D] text-center mb-16 sm:text-5xl">
            Real Results. Real Stories.
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {testimonialShorts.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block cursor-pointer"
              >
                <div className="aspect-video overflow-hidden rounded-2xl bg-gray-900 shadow-xl border border-white/10 relative">
                  <img
                    src={s.thumbnail}
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

      <section id="client-love" className="bg-white py-16 sm:py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1B4D] text-center mb-12 sm:mb-16 sm:text-5xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 leading-tight">
            <span>Love</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>Letters from our Clients</span>
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {clientTestimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative rounded-[2.5rem] bg-[#FDFBFF] p-8 border border-purple-50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 overflow-hidden rounded-full ring-4 ring-white shadow-md">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2D1B4D]">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#37C36B]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-purple-200/50 font-serif pointer-events-none">
                    &ldquo;
                  </span>
                  <p className="relative z-10 text-[15px] leading-relaxed text-[#5D4A7A]/80 italic font-medium">
                    {testimonial.content}
                  </p>
                  <span className="absolute -bottom-10 -right-2 text-6xl text-purple-200/50 font-serif pointer-events-none">
                    &rdquo;
                  </span>
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
            {youtubeShorts.map((s, idx) => (
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
          <div className="flex gap-16 min-w-full animate-marquee items-center justify-around shrink-0 px-8">
            {topRowLogos.concat(topRowLogos).map((logo, idx) => (
              <div key={idx} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 min-w-[200px]">
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-black text-xl bg-white border border-gray-100 shadow-sm ${logo.color}`}>
                  {logo.img}
                </div>
                <div className={`font-bold leading-tight ${logo.color}`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-16 min-w-full animate-marquee items-center justify-around shrink-0 px-8" aria-hidden="true">
            {topRowLogos.concat(topRowLogos).map((logo, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 min-w-[200px]">
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-black text-xl bg-white border border-gray-100 shadow-sm ${logo.color}`}>
                  {logo.img}
                </div>
                <div className={`font-bold leading-tight ${logo.color}`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Row (Reverse) */}
        <div className="flex overflow-hidden relative w-full">
          <div className="flex gap-16 min-w-full animate-marquee-reverse items-center justify-around shrink-0 px-8">
            {bottomRowLogos.concat(bottomRowLogos).map((logo, idx) => (
              <div key={idx} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 min-w-[200px]">
                 <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-black text-xl bg-white border border-gray-100 shadow-sm ${logo.color}`}>
                  {logo.img}
                </div>
                <div className={`font-bold leading-tight ${logo.color}`}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-16 min-w-full animate-marquee-reverse items-center justify-around shrink-0 px-8" aria-hidden="true">
            {bottomRowLogos.concat(bottomRowLogos).map((logo, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 min-w-[200px]">
                 <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-black text-xl bg-white border border-gray-100 shadow-sm ${logo.color}`}>
                  {logo.img}
                </div>
                <div className={`font-bold leading-tight ${logo.color}`}>
                  {logo.name}
                </div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-[#5D4A7A] mb-4">
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#5D4A7A] font-serif tracking-tight">
              Dear Fellow Job Seeker,
            </h2>
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-6 max-w-3xl mx-auto font-medium">
              <p>
                QBay Career was built with a simple mission: to take the frustration out of your job hunt. We aren&apos;t a faceless tech giant pushing &quot;mass-apply&quot; AI tools. In fact, we know recruiters instantly spot and reject low-effort AI applications. That&apos;s why we take a completely human approach. 
              </p>
              <p>
                Our dedicated team handles the heavy lifting for you. We craft ATS-friendly custom resumes and cover letters, and personally apply to highly relevant jobs on your behalf in under 24 hours. By taking the grueling application process off your plate, we give you your time back so you can focus on what actually gets you hired: networking and interview prep. 
              </p>
              <p>
                When you choose QBay, you&apos;re partnering with a small, passionate team deeply invested in your success. Thank you for trusting us to help you take the next big step in your career.
              </p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-500 pt-4">
              Welcome to QBay Career.
            </p>
          </div>

          <div className="w-24 h-px bg-purple-200 mx-auto" />

          {/* CTA Part */}
          <div className="space-y-10 pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-[#5D4A7A] font-serif">
                Have more questions? Let&apos;s chat!
              </h2>
              <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
                We understand that you might have questions specific to your situation. Schedule a call with our founder – we&apos;re here to help you succeed!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16 pt-4">
              <div className="flex items-center gap-3 text-[#5D4A7A] font-semibold text-lg">
                <CalendarDays className="w-6 h-6" />
                <span>Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-3 text-[#5D4A7A] font-semibold text-lg">
                <PhoneCall className="w-6 h-6" />
                <span>One-on-One Call</span>
              </div>
              <div className="flex items-center gap-3 text-[#5D4A7A] font-semibold text-lg">
                <MessageCircle className="w-6 h-6" />
                <span>Personalized Advice</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center pt-8 gap-4">
              <a
                href="#book"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-[#5D4A7A] rounded-xl hover:bg-[#4a3b61] hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
              >
                Talk to Founder
              </a>
              <p className="text-sm font-medium text-gray-400">
                Limited slots available. Book your call now!
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
