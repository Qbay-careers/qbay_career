'use client';

import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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


export default function PricingClient({ initialData }: { initialData: any }) {
  const [cmsData, setCmsData] = useState<any>(initialData);

  useEffect(() => {
    setCmsData(initialData);
  }, [initialData]);

  const [timeWorth, setTimeWorth] = useState(20);
  const [timePerApp, setTimePerApp] = useState(10);
  const [openPolicy, setOpenPolicy] = useState<number | null>(0);
  
  const totalHours = Math.round((1000 * timePerApp) / 60);
  const totalSaved = Math.round(totalHours * timeWorth);

  // Mappings
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
      <section className="px-4 pb-20">
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

              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {plan.description || 'Perfect for achieving your career goals.'}
              </p>

              <div className="mb-10">
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
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900 tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/year</span>
                  </div>
                  <div className="border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                    USD ($)
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-10 flex-1">
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

              <div className="mt-auto space-y-3">
                <Link
                  href={plan.buttonLink || '#'}
                  className={`flex w-full items-center justify-center rounded-2xl py-4 text-sm font-bold transition-all ${
                    plan.isPopular
                      ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-md shadow-indigo-100'
                      : 'bg-[#e0e7ff] text-[#4f46e5] hover:bg-[#d1d5ff]'
                  }`}
                >
                  {plan.buttonText || `Get ${plan.name}`}
                </Link>
                {plan.renewalText ? (
                  <p className="text-center text-[11px] text-gray-400 font-medium">
                    {plan.renewalText}
                  </p>
                ) : (
                  <p className="text-center text-[11px] text-gray-400 font-medium">
                    One time payment
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
          <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a021c] p-12 lg:p-16 flex flex-col lg:flex-row gap-12 lg:items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b3b] via-transparent to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#6366f1]/10 to-transparent" />
            
            <div className="relative flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <div className="w-5 h-5 border-2 border-white rotate-45" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {monthlyPlan.name}
                </h3>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-12 max-w-xl">
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

            <div className="relative w-full lg:w-[400px] shrink-0">
              <div className="bg-[#120a26] border border-white/5 rounded-[2rem] p-10 shadow-2xl">
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
                
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-bold text-white tracking-tighter">
                    {monthlyPlan.price}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">i</div>
                    <span className="text-sm font-medium">{monthlyPlan.description || 'One time payment'}</span>
                  </div>
                </div>

                <Link
                  href={monthlyPlan.buttonLink || '#'}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#4f46e5] py-5 text-sm font-bold text-white transition-all hover:bg-[#4338ca] shadow-xl shadow-indigo-900/40"
                >
                  {monthlyPlan.buttonText || `Checkout →`}
                </Link>
              </div>
            </div>
          </div>
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
