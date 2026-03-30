'use client';

import QBayNavbar from '@/components/QBayNavbar';
import FeaturedOn from '@/components/FeaturedOn';
import QBayFooter from '@/components/QBayFooter';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#FAF5FB] font-sans">
      <QBayNavbar />

      <section className="bg-[#FAF5FB] pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl md:text-5xl font-sans font-black text-[#5D4A7A] tracking-tight uppercase mb-16">
            ABOUT OUR COMPANY
          </h1>

          <div className="space-y-8 text-gray-800 text-lg md:text-xl font-serif leading-relaxed max-w-4xl mx-auto">
            <p>
              QBay Career is a career transformation platform dedicated to helping students and job seekers turn potential into real global opportunities. We combine expert mentorship, strategic planning, and industry-ready training to guide candidates from confusion to confidence.
            </p>
            <p>
              Our team works closely with each learner through 1-to-1 mentoring, personalized career roadmaps, and practical interview preparation designed around real hiring standards. We don&apos;t just teach — we build complete job-ready profiles by crafting professional CVs, optimized LinkedIn accounts, and targeted job search documents that attract international employers.
            </p>
            <p>
              With a strong network across the UK, Ireland, Germany, and Australia, we actively connect qualified candidates with companies through a fast-track application system and structured outreach strategies. Our proven approach helps students secure interview calls within 90 days by focusing on skills, positioning, and market demand rather than theory alone.
            </p>
            <p>
              At QBay Career, success is measurable — thousands of learners have already achieved interviews and placements through our guidance. We believe every student deserves clarity, direction, and opportunity, and our mission is to simplify the global job journey by providing continuous support, practical tools, and accountability at every step.
            </p>
            <p className="pt-2">
              Wishing you the very best in your journey.
            </p>
          </div>

          {/* Founders Profile Images */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-3xl mx-auto">
            
            {/* Founder 1 */}
            <div className="flex flex-col items-center group">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-[40px] bg-gradient-to-br from-[#1E5696] to-[#0A8CD0] overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Image Placeholder */}
                <div className="absolute inset-x-0 bottom-0 bg-white/10 h-[80%] rounded-t-[100px]" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-[#862788]">Fazil Karatt</h3>
                <p className="text-gray-700 font-medium">Founder & CEO</p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="flex flex-col items-center group">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-[40px] bg-gradient-to-br from-[#1A1A3A] to-[#2B2B85] overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                {/* Image Placeholder */}
                <div className="absolute inset-x-0 bottom-0 bg-white/10 h-[80%] rounded-t-[100px]" />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-[#862788]">Dr. Mohammed Shafeeq Karatt</h3>
                <p className="text-gray-700 font-medium">Co-Founder</p>
              </div>
            </div>

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

              {/* Kerala Startup Mission */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/0/06/Kerala_Startup_Mission_Logo.png"
                  alt="Kerala Startup Mission"
                  className="h-20 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const div = document.createElement('div');
                      div.className = 'text-center';
                      div.innerHTML = '<div class="text-xs font-black tracking-widest text-teal-600 uppercase">KERALA</div><div class="text-xs font-bold text-gray-700 uppercase">STARTUP MISSION®</div>';
                      parent.appendChild(div);
                    }
                  }}
                />
              </div>

              {/* GOV.UK - inline SVG recreation */}
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 146 40" className="h-8 object-contain" xmlns="http://www.w3.org/2000/svg">
                  <rect width="146" height="40" rx="4" fill="#000000"/>
                  <text x="10" y="28" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20">GOV.UK</text>
                </svg>
              </div>

              {/* ANTLER - inline SVG recreation */}
              <div className="flex flex-col items-center gap-1">
                <svg viewBox="0 0 120 36" className="h-9 object-contain" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="36" rx="4" fill="#FF3B3B"/>
                  <rect x="8" y="8" width="20" height="20" rx="2" fill="none" stroke="white" strokeWidth="2"/>
                  <text x="9" y="24" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14">A</text>
                  <text x="32" y="25" fill="white" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" letterSpacing="1">NTLER</text>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </section>

      <QBayFooter />

    </main>
  );
}
