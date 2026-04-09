'use client';

import React, { useState, useEffect } from 'react';
import QBayNavbar from '@/components/QBayNavbar';
import FeaturedOn from '@/components/FeaturedOn';
import QBayFooter from '@/components/QBayFooter';

export default function AboutClient({ initialData }: { initialData: any }) {
  const [cmsData, setCmsData] = useState<any>(initialData);

  useEffect(() => {
    setCmsData(initialData);
  }, [initialData]);

  // Handle data mapping with fallbacks
  const title = cmsData?.title || 'ABOUT OUR COMPANY';
  const description = cmsData?.description || '';
  
  let contentParagraphs: string[] = [];
  if (cmsData?.story && Array.isArray(cmsData.story)) {
    contentParagraphs = cmsData.story;
  } else if (cmsData?.paragraphs && Array.isArray(cmsData.paragraphs)) {
    contentParagraphs = cmsData.paragraphs;
  } else if (typeof description === 'string' && description.trim().length > 0) {
    contentParagraphs = description.split('\n').filter((p: string) => p.trim() !== '');
  } else {
    contentParagraphs = [
      "QBay Career is a career transformation platform dedicated to helping students and job seekers turn potential into real global opportunities. We combine expert mentorship, strategic planning, and industry-ready training to guide candidates from confusion to confidence.",
      "Our team works closely with each learner through 1-to-1 mentoring, personalized career roadmaps, and practical interview preparation designed around real hiring standards. We don't just teach — we build complete job-ready profiles by crafting professional CVs, optimized LinkedIn accounts, and targeted job search documents that attract international employers.",
      "With a strong network across the UK, Ireland, Germany, and Australia, we actively connect qualified candidates with companies through a fast-track application system and structured outreach strategies. Our proven approach helps students secure interview calls within 90 days by focusing on skills, positioning, and market demand rather than theory alone.",
      "At QBay Career, success is measurable — thousands of learners have already achieved interviews and placements through our guidance. We believe every student deserves clarity, direction, and opportunity, and our mission is to simplify the global job journey by providing continuous support, practical tools, and accountability at every step.",
      "Wishing you the very best in your journey."
    ];
  }

  const founders = (cmsData?.founders && Array.isArray(cmsData.founders) && cmsData.founders.length > 0) 
    ? cmsData.founders 
    : [
        { name: "Fazil Karatt", role: "Founder & CEO", image: "/fazil-karatt.png" },
        { name: "Dr. Mohammed Shafeeq Karatt", role: "Co-Founder", image: "/shafeeq-karatt.png" }
      ];

  const associates = (cmsData?.associates && Array.isArray(cmsData.associates) && cmsData.associates.length > 0)
    ? cmsData.associates
    : [
        { name: "Kerala Startup Mission", image: "/Kerala_StartUp_Mission_Logo.svg-768x429.png" },
        { name: "Associate Partner", image: "/Untitled-design-53-768x512.png" },
        { name: "Associate Partner", image: "/Untitled-design-54-768x512.png" }
      ];

  return (
    <main className="min-h-screen bg-[#FAF5FB] font-sans">
      <QBayNavbar />

      <section className="bg-[#FAF5FB] pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl md:text-5xl font-sans font-black text-[#5D4A7A] tracking-tight uppercase mb-16">
            {title}
          </h1>

          <div className="space-y-8 text-gray-800 text-lg md:text-xl font-serif leading-relaxed max-w-4xl mx-auto">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className={index === contentParagraphs.length - 1 ? 'pt-2' : ''}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Founders Profile Images */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-3xl mx-auto">
            {founders.map((founder: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-[2.5rem] overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 bg-white">
                  <img 
                    src={founder.image} 
                    alt={founder.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-[#862788]">{founder.name}</h3>
                  <p className="text-gray-700 font-medium">{founder.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedOn />

      {/* Backed By & Associates Section */}
      <section className="bg-[#FAF5FB] py-16 md:py-20 border-t border-purple-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Backed By */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5D4A7A] mb-2">Backed by</h2>
            <div className="w-24 h-[3px] bg-[#5D4A7A] mx-auto mb-10 rounded-full" />
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {/* Techstars */}
              <div className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                techstars<span className="text-gray-400">_</span>
              </div>
              {/* Carnegie Mellon */}
              <div className="text-center text-gray-700">
                <div className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-gray-500 mb-0.5">Carnegie Mellon University</div>
                <div className="text-sm md:text-base font-bold tracking-wide">Center for Entrepreneurship</div>
              </div>
            </div>
          </div>

          {/* Associates */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5D4A7A] mb-2">We Associates With</h2>
            <div className="w-24 h-[3px] bg-[#5D4A7A] mx-auto mb-10 rounded-full" />
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24">
              {associates.map((asso: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={asso.image}
                    alt={asso.name}
                    className="h-28 md:h-40 object-contain"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
