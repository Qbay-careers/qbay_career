'use client';

import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Check, ArrowRight, Clock, Music, Briefcase, Sun, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
  isHighlighted?: boolean;
  isMaxResult?: boolean;
  badgeText?: string;
  featuredColor?: string;
}

const plans: PricingPlan[] = [
  {
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
    buttonText: 'Checkout',
    buttonLink: '#',
  },
  {
    name: 'Qbay Career Plan',
    price: '€193/-',
    originalPrice: '€263/-',
    description: 'One time payment',
    isHighlighted: true,
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
    buttonText: 'Checkout',
    buttonLink: '#',
    featuredColor: 'bg-indigo-600',
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
    buttonText: 'Checkout',
    buttonLink: '#',
  },
  {
    name: 'Qbay Premium Plan',
    price: '€639/-',
    originalPrice: '€799/-',
    description: 'One time payment',
    isMaxResult: true,
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
    buttonText: 'Checkout',
    buttonLink: '#',
  },
];

const girlMathItems = [
  { icon: Clock, text: 'Resume consultation cost you €500/hour' },
  { icon: Music, text: 'Taylor Swift concert will cost you €1200' },
  { icon: Briefcase, text: 'A low cost Tuxedo will cost you €250' },
  { icon: Sun, text: 'A long weekend trip cost you €300' },
  { icon: BookOpen, text: 'A univ lecture costs €300/hour' },
  { icon: Clock, text: 'MBA/Master Consultant charges €400/hour' },
];

const cancellationPolicies = [
  {
    title: '1. Eligibility for Cancellation',
    content: 'Cancellation requests are accepted only after a successful payment transaction has been completed and reflected in our company account.',
  },
  {
    title: '2. Cancellation Before Process Begins',
    content: 'If the candidate requests cancellation before profile creation and application processing has started, a partial refund may be issued after deducting administrative charges (20–30%).',
  },
  {
    title: '3. Cancellation After Process Begins',
    content: 'Once our team has started preparing the candidate’s CV, profile, documentation, or application submissions, the service is considered in progress and the payment becomes non-refundable.',
  },
  {
    title: '4. Completed Service',
    content: 'If the profile has been prepared and applications have been submitted on behalf of the candidate, cancellation requests will not be accepted.',
  },
  {
    title: '5. Candidate Responsibility',
    content: 'Candidates must provide accurate and complete information required for CV preparation and job applications. Delays caused by missing or incorrect information do not qualify for refunds.',
  },
  {
    title: '6. Requesting Cancellation',
    content: 'All cancellation requests must be submitted through our official email or WhatsApp support channel with the candidate’s name, payment reference, and registered contact details.',
  },
  {
    title: '7. Company Rights',
    content: 'The company reserves the right to decline cancellation or refund requests once the service process has started or if the service has been delivered.',
  },
];

export default function PricingPage() {
  const [timeWorth, setTimeWorth] = useState(20);
  const [timePerApp, setTimePerApp] = useState(10);
  const [openPolicy, setOpenPolicy] = useState<number | null>(0);
  
  const totalHours = Math.round((1000 * timePerApp) / 60);
  const totalSaved = Math.round(totalHours * timeWorth);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-purple-100">
      <QBayNavbar />

      {/* Header Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#5D4A7A] mb-4">
            Choose The Best!
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Focus on building your career, not filling out forms.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our human assistants apply to jobs for you while you spend your time networking and preparing for interviews.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 ${
                plan.isHighlighted
                  ? 'ring-2 ring-indigo-600 shadow-2xl shadow-indigo-100 bg-white'
                  : 'bg-white shadow-xl shadow-gray-100 hover:shadow-2xl hover:shadow-purple-100'
              }`}
            >
              {/* Badges */}
              {(plan.isPopular || plan.isMaxResult) && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-1.5 text-[10px] font-black tracking-widest text-white shadow-lg shadow-indigo-200">
                  {plan.badgeText}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 mb-6 leading-tight">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-base font-bold text-gray-400 line-through decoration-2">
                    {plan.originalPrice}
                  </span>
                </div>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-3.5 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-2.5 text-left">
                    <Check className="h-4 w-4 shrink-0 text-[#37C36B] stroke-[3px] mt-0.5" />
                    <span className="text-[13px] font-semibold text-gray-700 leading-snug">
                      {feature === 'UK/DE/IE Full time Experience' ? (
                        <>
                          UK/DE/IE <span className="text-red-500">Full time Experience</span>
                        </>
                      ) : (
                        feature
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Link
                  href={plan.buttonLink}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black transition-all active:scale-[0.98] ${
                    plan.isHighlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                      : 'bg-[#121826] text-white hover:bg-[#1f2937]'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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
                  <span>What's Your Time Worth : €{timeWorth} / Hour</span>
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
              Over 70% of QBAY Career members receive refunds — not because they're dissatisfied, but because they secure their ideal job before using all their credits. We celebrate your success by refunding unused credits.
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

      {/* Girl Math Edition Section */}
      <section className="bg-[#FAF5FB] py-24 px-4 font-sans">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#5D4A7A]">
              Girl Math Edition
            </h2>
            <p className="text-lg font-bold text-gray-500">
              Let's break down why our service is a no-brainer when you think about it...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {girlMathItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-14 w-14 shrink-0 bg-[#5D4A7A] rounded-full flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <p className="text-left font-bold text-gray-900 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cancellation Policy Section */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#5D4A7A]">
              Cancellation Policy
            </h2>
            <p className="text-lg font-bold text-[#8B7FB1]">
              You can cancel your plan anytime,no questions asked
            </p>
          </div>

          <div className="max-w-4xl mx-auto border-[1.5px] border-[#D1D5DB] rounded-3xl overflow-hidden bg-white shadow-xl shadow-gray-50">
            {cancellationPolicies.map((policy, idx) => (
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
