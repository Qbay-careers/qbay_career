const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const p = (key) => envFile.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim();

const supabase = createClient(
  p('NEXT_PUBLIC_SUPABASE_URL'),
  p('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

const newServiceData = {
  title: "90 days Finishing Program",
  slug: "90-days-Finishing-Program",
  description: "No experience? Career gap? Wrong degree? We fix it all. Qbay's 90-Day Career Finishing Programme turns any graduate or job seeker into a job-ready professional — tailored for the country you want to work in.",
  fullDescription: `No experience? Career gap? Wrong degree? We fix it all.

Qbay's 90-Day Career Finishing Programme turns any graduate or job seeker into a job-ready professional — tailored for the country you want to work in. We don't just train you. We walk with you until you get your first interview call. Guaranteed.

You Are Not Alone. Millions Struggle to Get Hired Abroad.
The problem isn't your degree. It isn't your intelligence.
It's that nobody taught you how the job market really works in your target country.
Qbay was built to fix exactly that.`,
  benefits: [
    { title: "100% Interview Call — Guaranteed" },
    { title: "Personalised to You — Not a Copy-Paste Programme" },
    { title: "AI + Human Mentoring — Together" },
    { title: "Real Experience — Not Classroom Theory" },
    { title: "Mental Wellness Support — Included" },
    { title: "Country-Specific Job Market Strategy" },
  ],
  features: [
    {
      title: "Week 1–2: DISCOVER — Career Assessment",
      description: "Full AI and Human Career Assessment on your profile. We identify why you are not getting hired, what is missing, what your target job market needs, and your personal strengths and hidden gaps. You receive a detailed career report and a private one-on-one consultation."
    },
    {
      title: "Week 2–4: PLAN — Personal Career Strategy",
      description: "Our R&D experts — trained at Boston University and University of Michigan — use your profile report and AI tools to build a custom career strategy covering target roles, companies, positioning, skills, and country-specific job market tactics."
    },
    {
      title: "Week 4–10: EXECUTE — Dedicated Mentor",
      description: "A personal career mentor is assigned to you for the full 90 days. They help you execute your strategy, build real-world experience through live internships and projects, fix your CV and LinkedIn, prepare for interviews, and provide mental wellness coaching."
    },
    {
      title: "Week 10–13: TRACK — AI Application Tracker",
      description: "Qbay's AI-powered Application Tracker monitors every job application. It tells you how many you have sent, which are performing, where to improve, and what to do next — based on real data. Your mentor reviews it with you regularly."
    },
    {
      title: "Interview Support — Until You Win",
      description: "When interview calls come in, Qbay supports you through preparation and mock sessions, psychological confidence coaching, and offer guidance and salary negotiation support. We stay until you land the offer."
    },
    {
      title: "British Government Accredited",
      description: "Officially recognised by the UK government — giving your career journey a credential that global employers respect. Also selected by Finland's SISU Launchpad, co-founded by the European Union."
    },
  ],
  richContent: {
    whyDifferent: [
      { title: "100% Interview Call — Guaranteed", body: "Not 'we'll try.' Not 'we'll do our best.' We guarantee interview calls in your target country — or we keep working with you until you get them." },
      { title: "Personalised to You — Not a Copy-Paste Programme", body: "Every candidate is different. Every career plan at Qbay is built from scratch — just for you — based on your background, your target country, and your goals." },
      { title: "AI + Human Mentoring — Together", body: "We combine cutting-edge AI technology with real human mentors who stay with you from day one to your first job offer. You are never left figuring it out alone." },
      { title: "Real Experience — Not Classroom Theory", body: "Real internships. Real projects. Real career tasks. Everything in this programme is built around what employers in your target country are actually looking for right now." },
      { title: "Mental Wellness Support — Included", body: "Job searching is stressful. We include psychological support and mental wellness coaching as part of your journey — because your mindset matters as much as your CV." },
    ],
    results: [
      { stat: "98.7%", label: "Interview Call Success Rate", promise: "100% Interview Call Guarantee" },
      { stat: "Every Candidate", label: "Receives Personalised Mentoring", promise: "Personalised Mentoring" },
      { stat: "27+", label: "Countries Covered", promise: "Country-Specific Strategy" },
      { stat: "4.9 ⭐", label: "Google · 4.8 Trustpilot", promise: "Verified Reviews" },
    ],
    companiesHired: "EY (Ernst and Young) · Ireland National Bank · Leading UK Corporates · European MNCs · Top Gulf Companies · Canada and Australia",
    whyTrust: [
      { title: "British Government Accredited", body: "Officially recognised by the UK government — giving your career journey a credential that global employers respect." },
      { title: "SISU Launchpad, Finland", body: "The only India-founded startup selected by Finland's government-backed SISU Launchpad — co-founded by the European Union." },
      { title: "World-Class Expert Team", body: "Our career R&D team includes specialists from Boston University and University of Michigan — building strategies that are academically rigorous and market-proven." },
      { title: "Founder — Fazil Karatt", body: "University of Michigan alumnus. Ex-OYO executive. Leap Scholar. Career expert with deep experience across Asia, Europe, and beyond." },
      { title: "Co-Founder — Dr. Shafeeq", body: "Leading consultant in the UK National Health Service. Brings evidence-based thinking and clinical precision to career development." },
      { title: "Operating from UK and Finland", body: "Qbay is a global career platform — headquartered in the UK and Finland, serving job seekers across 27+ countries since 2022." },
    ],
    whoIsItFor: [
      "A fresh graduate who does not know how to start a career abroad",
      "A job seeker who keeps applying but never hears back",
      "A working professional who wants to switch countries or industries",
      "Someone returning after a career break or gap year",
      "Anyone who wants to work in the UK, Europe, Canada, Australia, the Gulf, or any international job market",
    ],
    faqs: [
      { title: "Do I need work experience to join?", content: "No. Qbay is designed for all levels — from fresh graduates to experienced professionals. We work with what you have and build from there." },
      { title: "Which countries do you cover?", content: "We cover 27+ countries including the UK, Ireland, Canada, Australia, Germany, UAE, Qatar, Finland, and more." },
      { title: "What if I do not get an interview call?", content: "We guarantee it. If you complete the programme and do not receive an interview call, we continue working with you — at no extra cost — until you do." },
      { title: "Is the mentoring really personalised?", content: "Yes. Every candidate is assigned a dedicated human mentor. Your career plan, your strategy, and your sessions are built entirely around your individual profile — not a generic template." },
      { title: "How does the AI tracker work?", content: "Our proprietary AI tool monitors your job applications, tracks your performance against your strategy, and surfaces insights to help your mentor guide you more effectively." },
    ],
    ctaHeading: "Start Your 90-Day Career Transformation Today",
    ctaBody: "The only programme in the world that combines AI-powered career profiling, expert mentoring from UK and Finland, real internships and live projects, country-specific job market strategy, mental wellness and psychological support, and a 100% interview call guarantee.",
    ctaButton: "Book Your Free Career Consultation Now",
    ctaLink: "/contact",
  }
};

async function updateService() {
  // Fetch current services
  const { data, error } = await supabase
    .from('cms_content')
    .select('content')
    .eq('key', 'services')
    .single();

  if (error) {
    console.error('Error fetching services:', error);
    return;
  }

  const services = data.content;
  const idx = services.findIndex(s => s.slug === '90-days-Finishing-Program');

  if (idx === -1) {
    console.error('Service not found!');
    return;
  }

  // Merge new data into existing service (preserves pricing, audioReviews, results, etc.)
  services[idx] = { ...services[idx], ...newServiceData };

  // Save back
  const { error: updateError } = await supabase
    .from('cms_content')
    .update({ content: services, updated_at: new Date().toISOString() })
    .eq('key', 'services');

  if (updateError) {
    console.error('Error updating service:', updateError);
  } else {
    console.log('✅ 90 days Finishing Program updated successfully!');
  }
}

updateService();
