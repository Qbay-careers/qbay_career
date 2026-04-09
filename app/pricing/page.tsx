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
    name: 'Starter',
    price: '$12.0',
    originalPrice: '',
    description: 'Perfect for individuals or small businesses.',
    features: [
      '1 site',
      'Includes all features',
      '1-year updates & support',
      '60 days money-back guarantee',
    ],
    buttonText: 'Get Starter',
    buttonLink: '#',
  },
  {
    name: 'Growth',
    price: '$14.2',
    originalPrice: '$20.00',
    description: 'For growing teams managing multiple sites.',
    isPopular: true,
    badgeText: 'Popular',
    features: [
      '10 sites',
      'Includes all features',
      '1-year updates & support',
      '60 days money-back guarantee',
    ],
    buttonText: 'Get Growth',
    buttonLink: '#',
  },
  {
    name: 'Scale',
    price: '$49.0',
    originalPrice: '',
    description: 'Perfect for scaling businesses managing unlimited sites.',
    features: [
      'Unlimited sites',
      'Includes all features',
      '1-year updates & support',
      '60 days money-back guarantee',
    ],
    buttonText: 'Get Scale',
    buttonLink: '#',
  },
];

const ultimatePlan = {
  name: 'Ultimate',
  price: '$299.5',
  originalPrice: '$599.00',
  description: 'The all-in-one solution for lifetime access to unlimited websites.',
  features: [
    'Unlimited sites',
    'Includes all features',
    'Lifetime updates & support',
    '6-month money-back guarantee',
  ],
  buttonText: 'Get Ultimate',
  buttonLink: '#',
};

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
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-[2.5rem] p-10 bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {plan.name}
                </h3>
                {plan.isPopular && (
                  <span className="bg-[#6366f1] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {plan.badgeText}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mb-12 max-w-[200px] leading-relaxed">
                {plan.description}
              </p>

              <div className="mb-10">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#e0e7ff] text-[#6366f1] text-[10px] font-bold px-2 py-0.5 rounded">
                      30% OFF
                    </span>
                    <span className="text-gray-400 line-through text-lg">
                      {plan.originalPrice}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900 tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/year</span>
                  <div className="ml-auto border border-gray-200 rounded px-1.5 py-0.5 text-[8px] font-bold text-gray-400">
                    USD ($)
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 group/feature">
                    <div className="mt-1 rounded-full text-[#6366f1] transition-transform duration-300 group-hover/feature:scale-110">
                      <Check className="h-3.5 w-3.5 stroke-[4px]" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <Link
                  href={plan.buttonLink}
                  className={`flex w-full items-center justify-center rounded-2xl py-5 text-sm font-bold transition-all ${
                    plan.isPopular
                      ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca] shadow-lg shadow-indigo-100'
                      : 'bg-[#e0e7ff] text-[#4f46e5] hover:bg-[#d1d5ff]'
                  }`}
                >
                  {plan.buttonText}
                </Link>
                <p className="text-center text-[10px] text-gray-400 font-medium">
                  Pay today $55.3, renews at $79
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ultimate Plan Section */}
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
                  {ultimatePlan.name}
                </h3>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-12 max-w-xl">
                The all-in-one solution for <span className="text-[#facc15] italic">lifetime access</span> to unlimited websites.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
                {ultimatePlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-[#6366f1] stroke-[4px]" />
                    <span className={`text-sm font-medium ${idx === ultimatePlan.features.length - 1 ? 'text-[#facc15]' : 'text-gray-300'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full lg:w-[400px] shrink-0">
              <div className="bg-[#120a26] border border-white/5 rounded-[2rem] p-10 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    30% OFF
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    {ultimatePlan.originalPrice}
                  </span>
                </div>
                
                <div className="flex items-baseline mb-12">
                  <span className="text-5xl font-bold text-white tracking-tighter">
                    {ultimatePlan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/year</span>
                  <div className="ml-auto border border-white/10 rounded px-1.5 py-0.5 text-[8px] font-bold text-gray-500">
                    USD ($)
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">i</div>
                    <span className="text-sm font-medium">For up to 10 members,</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">$</div>
                    <span className="text-sm font-medium">$8 per additional member per month</span>
                  </div>
                </div>

                <Link
                  href={ultimatePlan.buttonLink}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#4f46e5] py-5 text-sm font-bold text-white transition-all hover:bg-[#4338ca] shadow-xl shadow-indigo-900/40"
                >
                  {ultimatePlan.buttonText}
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

      {/* Girl Math Edition Section */}
      <section className="bg-[#FAF5FB] py-24 px-4 font-sans">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#5D4A7A]">
              Girl Math Edition
            </h2>
            <p className="text-lg font-bold text-gray-500">
              Let&apos;s break down why our service is a no-brainer when you think about it...
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
