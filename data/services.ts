export interface Service {
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  features: { title: string; description: string }[];
  benefits: string[];
  results?: {
    title?: string;
    subtitle?: string;
    description?: string;
    images: { src: string; flag: string }[];
  };
  audioReviews?: {
    name: string;
    role: string;
    title: string;
    duration: string;
    avatar: string;
    audioUrl: string;
    flag: string;
  }[];
}

const defaultFeatureDesc = "Carefully tailored to ensure maximum success in your specific career path and market conditions.";

export const services: Service[] = [
  {
    slug: 'guaranteed-interview-calls',
    title: 'Guaranteed Interview Calls',
    category: 'Placement Support',
    description: 'Connect with the right employers and receive guaranteed interview opportunities.',
    fullDescription: 'Our hallmark service ensures you don\'t just apply, but actually get in front of decision-makers. We bridge the gap between talented candidates and global employers by leveraging our extensive network and strategic positioning. Our 90-day commitment means we stay with you until those interview calls start coming in.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Direct Employer Connections', description: defaultFeatureDesc },
      { title: '90-Day Call Guarantee', description: defaultFeatureDesc },
      { title: 'Strategic Profile Positioning', description: defaultFeatureDesc },
      { title: 'Global Network Access', description: defaultFeatureDesc },
      { title: 'Follow-up Management', description: defaultFeatureDesc }
    ],
    benefits: [
      'Reduced Job Search Time',
      'Higher Interview Conversion Rate',
      'Access to Hidden Job Market',
      'Personalized Matchmaking'
    ]
  },
  {
    slug: 'we-apply-for-you',
    title: 'We Apply For You',
    category: 'Application Management',
    description: 'Our team handles your profile optimization and job applications to boost your chances.',
    fullDescription: 'Stop spending hours on repetitive forms. Our dedicated application experts take over the heavy lifting. We analyze job descriptions, tailor your profile for each role, and submit meticulously prepared applications on your behalf, ensuring maximum impact with minimum effort from your side.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Personalized JD Analysis', description: defaultFeatureDesc },
      { title: 'Meticulous Form Filling', description: defaultFeatureDesc },
      { title: 'Tailored Cover Letters', description: defaultFeatureDesc },
      { title: 'Application Tracking', description: defaultFeatureDesc },
      { title: 'Regular Status Updates', description: defaultFeatureDesc }
    ],
    benefits: [
      'Save 20+ Hours per Week',
      'Eliminate Application Fatigue',
      'Zero Margin for Error',
      'Industry-Standard Submissions'
    ]
  },
  {
    slug: 'nhs-hsc-applications',
    title: 'NHS - HSC Applications',
    category: 'Healthcare Careers',
    description: 'Dedicated team applies to relevant NHS and HSC roles on your behalf.',
    fullDescription: 'Navigating the UK healthcare recruitment system can be complex. Whether you\'re a nurse, doctor, or allied health professional, our specialist team understands the nuances of NHS and HSC applications (TRAC, etc.). we ensure your clinical and soft skills are highlighted to meet specific Trust requirements.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'NHS Jobs/TRAC Portal Expertise', description: defaultFeatureDesc },
      { title: 'Healthcare-Specific CV Mapping', description: defaultFeatureDesc },
      { title: 'Clinical Competency Highlighting', description: defaultFeatureDesc },
      { title: 'Trust-Specific Research', description: defaultFeatureDesc },
      { title: 'Compliance Checklist Support', description: defaultFeatureDesc }
    ],
    benefits: [
      'Higher Success in Public Sector',
      'Expert Guidance on UK Standards',
      'Stress-Free Compliance',
      'Faster Healthcare Placement'
    ]
  },
  {
    slug: 'cpd-professional-development',
    title: 'CPD (Continuing Professional Development)',
    category: 'Skill Enhancement',
    description: 'Enhance your skills with industry-recognized CPD programs for career advancement.',
    fullDescription: 'Stay ahead of the curve with our curated Continuing Professional Development programs. In today\'s rapidly evolving job market, staying relevant is key. We provide access to industry-recognized certifications and training modules that add significant weight to your professional profile.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Industry-Recognized Certifications', description: defaultFeatureDesc },
      { title: 'Flexible Learning Paths', description: defaultFeatureDesc },
      { title: 'Advanced Skill Modules', description: defaultFeatureDesc },
      { title: 'Professional Credit Tracking', description: defaultFeatureDesc },
      { title: 'Expert-Led Workshops', description: defaultFeatureDesc }
    ],
    benefits: [
      'Faster Career Progression',
      'Higher Salary Potential',
      'Validated Skillsets',
      'Global Professional Credibility'
    ]
  },
  {
    slug: 'domain-specified-interview-assistance',
    title: 'Domain Specified Interview Assistance',
    category: 'Interview Prep',
    description: 'Prepare for industry-specific interviews with practical tips and expert support.',
    fullDescription: 'General interview tips aren\'t enough for specialized roles. Our domain experts provide deep-dive preparation for your specific industry—whether it\'s IT, Healthcare, Finance, or Engineering. We focus on technical questions, scenario-based evaluations, and culture-fit assessments.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Mock Technical Interviews', description: defaultFeatureDesc },
      { title: 'Role-Specific Q&A Banks', description: defaultFeatureDesc },
      { title: 'Industry Scenario Drills', description: defaultFeatureDesc },
      { title: 'Body Language & Tone Coaching', description: defaultFeatureDesc },
      { title: 'Post-Interview Analysis', description: defaultFeatureDesc }
    ],
    benefits: [
      'Boosted Confidence',
      'Higher Technical Pass Rate',
      'Polished Professionalism',
      'Stress-Free Preparation'
    ]
  },
  {
    slug: 'ats-cv-linkedin-cover-letter',
    title: 'ATS – CV, LinkedIn, Cover Letter',
    category: 'Personal Branding',
    description: 'Stand out with ATS-optimized CVs, impactful cover letters, and LinkedIn profiles.',
    fullDescription: 'Most resumes are rejected by robots before a human even sees them. We create ATS-friendly documents that pass through automated filters with ease. Beyond CVs, we optimize your LinkedIn presence and craft persuasive cover letters that tell your unique professional story.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Keyword Optimization', description: defaultFeatureDesc },
      { title: 'Modern Design Templates', description: defaultFeatureDesc },
      { title: 'LinkedIn SEO Enhancement', description: defaultFeatureDesc },
      { title: 'Psychology-Driven Content', description: defaultFeatureDesc },
      { title: 'Multiple Format Delivery', description: defaultFeatureDesc }
    ],
    benefits: [
      'Score 90%+ on ATS Scanners',
      'Increased Profile Visibility',
      'Strong First Impression',
      'Cohesive Personal Brand'
    ]
  },
  {
    slug: 'humanized-sop-guidance',
    title: 'Humanized SOP Guidance And Preparation',
    category: 'Documentation',
    description: 'Build a strong and well-structured SOP that reflects your career goals.',
    fullDescription: 'A Statement of Purpose (SOP) shouldn\'t sound like a template. We help you craft "humanized" SOPs that reflect your genuine voice, aspirations, and journey. Whether for university admissions or specialized job applications, we ensure your narrative stands out in a sea of generic applicants.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Narrative Storytelling', description: defaultFeatureDesc },
      { title: 'Personal Voice Retention', description: defaultFeatureDesc },
      { title: 'Structure & Flow Optimization', description: defaultFeatureDesc },
      { title: 'Admissions-Aligned Editing', description: defaultFeatureDesc },
      { title: 'Plagiarism-Free Content', description: defaultFeatureDesc }
    ],
    benefits: [
      'Increased Admission Success',
      'Distinctive Personal Story',
      'Clarity of Career Goals',
      'Professional Academic Tone'
    ]
  },
  {
    slug: 'internship-guidance',
    title: 'Internship Guidance',
    category: 'Experience Building',
    description: 'Get valuable internship opportunities and hands-on experience to kickstart your career.',
    fullDescription: 'Experience is the most valuable currency in the job market. We guide you toward internships that offer real-world exposure and skill-building. From application to successful completion, we support your journey in gaining the practical experience employers crave.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Internship Matchmaking', description: defaultFeatureDesc },
      { title: 'Portfolio Development', description: defaultFeatureDesc },
      { title: 'Corporate Etiquette Training', description: defaultFeatureDesc },
      { title: 'Mentor Network Access', description: defaultFeatureDesc },
      { title: 'Conversion Strategy (Intern to Full-time)', description: defaultFeatureDesc }
    ],
    benefits: [
      'Real-World Skill Gain',
      'Industry Networking',
      'Career Path Validation',
      'Resume Strength Boost'
    ]
  },
  {
    slug: 'mental-wellness',
    title: 'Mental Wellness',
    category: 'Stability & Growth',
    description: 'Our guidance helps you stay mentally strong, confident, and prepared for career challenges.',
    fullDescription: 'The job search journey can be mentally taxing. We believe professional success is impossible without personal well-being. Our mental wellness program provides support, confidence-building techniques, and stress management strategies to keep you motivated and resilient.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    features: [
      { title: 'Confidence Coaching', description: defaultFeatureDesc },
      { title: 'Stress Management Sessions', description: defaultFeatureDesc },
      { title: 'Mindset Reframing', description: defaultFeatureDesc },
      { title: 'Regular Wellness Checks', description: defaultFeatureDesc },
      { title: 'Community Support', description: defaultFeatureDesc }
    ],
    benefits: [
      'Emotional Resilience',
      'Consistent Motivation',
      'Mental Clarity',
      'Long-Term Career Health'
    ]
  }
];

