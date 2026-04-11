'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  Home, 
  Info, 
  Euro, 
  Mail, 
  Briefcase,
  ChevronRight,
  Save,
  Loader2,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  LayoutGrid,
  Plus,
  Trash2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Toaster, toast } from 'sonner';
import { AdminFormControl } from '@/components/AdminFormControl';

const sections = [
  { id: 'navigation', icon: LayoutDashboard, label: 'Navigation' },
  { id: 'home', icon: Home, label: 'Home Page', subSections: [
    { id: 'hero', label: 'Hero Section', description: 'Main title, subtitle, and hero images.' },
    { id: 'consultation', label: 'Consultation', description: 'Free consultation and expert guidance highlights.' },
    { id: 'framework', label: 'Framework', description: 'The 5-phase career success steps.' },
    { id: 'results', label: 'WhatsApp Results', description: 'Success story images and social proof.' },
    { id: 'testimonials', label: 'Video Shorts', description: 'YouTube shorts and video testimonials.' },
    { id: 'clientLove', label: 'Client Reviews', description: 'Detailed customer testimonials and ratings.' },
    { id: 'trustpilotReviews', label: 'Trustpilot', description: 'Trustpilot ratings, names, and reviews.' },
    { id: 'audioReviews', label: 'Audio Testimonials', description: 'Audio success stories, roles, and flags.' },
    { id: 'negativeReviews', label: 'Negative Reviews', description: 'Glaringly painful 1-star reviews and founder replies.' },
    { id: 'services', label: 'Our Services', description: 'Categories and service cards for the home page.', targetKey: 'services' },
    { id: 'founderLetter', label: 'Founder Letter', description: 'A personal note from the founder.' },
    { id: 'finalCTA', label: 'Bottom CTA', description: 'The final call to action at the bottom.' },
  ]},
  { id: 'about', icon: Info, label: 'About Us' },
  { id: 'pricing', icon: Euro, label: 'Pricing', subSections: [
    { id: 'header', label: 'Pricing Header', description: 'Main heading, subtitle, and description.' },
    { id: 'plans', label: 'Standard Packages', description: 'The main pricing plans (3 cards).' },
    { id: 'monthlyPlan', label: 'Monthly Subscription', description: 'The full width monthly subscription plan card at the top.' },
    { id: 'cancellation', label: 'Cancellation Policy', description: 'Manage refund details and policy items.' }
  ]},
  { id: 'contactPage', icon: Mail, label: 'Contact Page' },
  { id: 'services', icon: Briefcase, label: 'Services' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('navigation');
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [content, setContent] = useState<any>(null);
  const [subContent, setSubContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);

  const processContent = (data: any, parentKey?: string): any => {
    if (!data) return data;
    
    // Upgrade features array from string[] to object[]
    if (Array.isArray(data)) {
      return data.map(item => processContent(item, parentKey));
    }

    if (typeof data === 'object') {
      const newData = { ...data };

      // Auto-migrate Pricing Schema: map 'hero' to 'header'
      if (newData.hero && !newData.header) {
        newData.header = newData.hero;
      }

      // Auto-migrate Hero Images: ensure at least 6 images
      if (newData.hero && typeof newData.hero === 'object') {
        const defaultImgs = [
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800',
          'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800',
          'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=800',
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=800',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800',
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800',
        ];
        const currentImgs = Array.isArray(newData.hero.images) ? newData.hero.images : [];
        if (currentImgs.length < 6) {
          const missing = defaultImgs.filter(d => !currentImgs.includes(d));
          newData.hero.images = [...currentImgs, ...missing].slice(0, 6);
        }
        if (!newData.hero.backgroundImage) {
          newData.hero.backgroundImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920';
        }
      }

      // Auto-migrate Pricing Schema: extract 'Monthly Subscription' from 'plans'
      if (Array.isArray(newData.plans)) {
        const monthlyIndex = newData.plans.findIndex((p: any) => 
          p.name && p.name.toLowerCase().includes('monthly')
        );
        
        if (monthlyIndex !== -1 && !newData.monthlyPlan) {
          newData.monthlyPlan = newData.plans[monthlyIndex];
          // Remove it from standard plans
          newData.plans = newData.plans.filter((_: any, idx: number) => idx !== monthlyIndex);
        }
      }

      // Auto-migrate Trustpilot Reviews
      if (newData.trustpilotReviews === undefined && !parentKey && newData.hero) {
         newData.trustpilotReviews = [
           { name: 'James W.', title: 'Outstanding support from start to finish', content: 'They guided me through every step of the process. I landed a senior role faster than I expected.', rating: 5, time: '4 days ago' },
           { name: 'Emily C.', title: 'Best career investment', content: 'Worth every penny. The 1:1 coaching gave me the confidence I lacked during technical interviews.', rating: 5, time: '2 weeks ago' },
           { name: 'Rahul M.', title: 'Highly professional and effective', content: 'Their market insights are brilliant. I secured two competing offers thanks to their negotiation coaching.', rating: 5, time: '1 month ago' },
           { name: 'Anna K.', title: 'Life-changing career guidance', content: 'I transitioned to a completely new industry with their help. The support system is unmatched.', rating: 5, time: '2 months ago' },
           { name: 'Sophie L.', title: 'Incredible resume overhaul', content: 'My callback rate jumped from 0% to 40% after they rewrote my CV and LinkedIn profile.', rating: 5, time: '3 months ago' },
           { name: 'Daniel P.', title: 'Helped me relocate smoothly', content: 'Got a sponsored job in the UK. Their guidance on visa processes and international interviews was vital.', rating: 5, time: '3 months ago' }
         ];
      }

      // Auto-migrate Audio Reviews
      if (newData.audioReviews === undefined && !parentKey && newData.hero) {
        newData.audioReviews = [
          { name: 'David L.', role: 'UX Designer', title: 'Secured a role at a top agency', duration: '1:24', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
          { name: 'Anita P.', role: 'Marketing Lead', title: 'Got my UK visa sponsored job', duration: '0:58', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', flag: 'https://flagcdn.com/w80/ie.png' },
          { name: 'John D.', role: 'Cloud Architect', title: 'Negotiated a 30% salary bump', duration: '2:15', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', flag: 'https://flagcdn.com/w80/in.png' },
          { name: 'Rachel M.', role: 'Data Scientist', title: 'Moved from academia to tech', duration: '1:45', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', flag: 'https://flagcdn.com/w80/gb.png' },
          { name: 'Kevin B.', role: 'Product Manager', title: 'Landed 3 offers in 2 weeks', duration: '1:10', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', flag: 'https://flagcdn.com/w80/ae.png' },
          { name: 'Linda V.', role: 'Financial Analyst', title: 'Overcame career stagnation', duration: '2:05', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', flag: 'https://flagcdn.com/w80/ie.png' }
        ];
      }

      // Auto-migrate Framework Content
      if ((newData.framework === undefined || (Array.isArray(newData.framework?.phases) && newData.framework.phases[0]?.title === 'Discovery & Clarity')) && !parentKey && newData.hero) {
        newData.framework = {
          title: 'Career Success <br class="hidden sm:block" /> Framework',
          phases: [
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
          ]
        };
      }

      // Auto-migrate WhatsApp Results: convert old string[] images to {src, flag}[] objects
      if (newData.results && !parentKey) {
        const r = newData.results;
        const isObj = typeof r === 'object' && !Array.isArray(r);
        const existingMeta = isObj ? r : {};
        const rawImages: any[] = isObj ? (r.images || []) : (Array.isArray(r) ? r : []);

        // Default to 9 local WhatsApp images when nothing is stored in DB
        const defaultLocalImages = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
          n => `/testimonials/whatsapp${n}.jpeg`
        );
        const imagesToUse = rawImages.length === 0 ? defaultLocalImages : rawImages;
        const needsConversion = imagesToUse.some((item: any) => typeof item === 'string');

        if (!isObj || needsConversion || rawImages.length === 0) {
          newData.results = {
            title: existingMeta.title || 'Success Stories That Inspire',
            subtitle: existingMeta.subtitle || 'Real Experiences. Real Results.',
            description: existingMeta.description || "Don't just take our word for it—hear from students and parents whose journeys have been transformed by Qbay.",
            images: imagesToUse.map((item: any) =>
              typeof item === 'string'
                ? { src: item, flag: 'https://flagcdn.com/w80/in.png' }
                : { src: item.src || '', flag: item.flag || 'https://flagcdn.com/w80/in.png' }
            )
          };
        } else if (isObj && Array.isArray(r.images)) {
          // Ensure all existing objects have a non-empty flag
          newData.results = {
            ...r,
            images: r.images.map((item: any) =>
              typeof item === 'string'
                ? { src: item, flag: 'https://flagcdn.com/w80/in.png' }
                : { src: item.src || '', flag: item.flag || 'https://flagcdn.com/w80/in.png' }
            )
          };
        }
      }

      // Auto-migrate Negative Reviews
      if (newData.negativeReviews === undefined && !parentKey && newData.hero) {
        newData.negativeReviews = [
          {
            name: 'James',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150',
            title: 'Associates are from India',
            content: 'They hire India based interns to do the applying who don\'t even speak english.',
            date: 'Dec 2025',
            reply: 'That\'s correct and we\'re very transparent about it. QBay Careers is a human assistant service... Our assistants are trained to handle the grunt and operational work.',
            rating: 1
          },
          {
            name: 'David',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150',
            title: 'Using AI for Customizing Resumes',
            content: 'They use Gemini/ChatGPT to write the cover letter and tailor resumes. Which doesn\'t make sense for all jobs.. writing the same content by just changing job title... that any free ai can.',
            date: 'Sep 2025',
            reply: 'That\'s correct and we\'re very transparent about it. We use AI to scale our workflows but every step is reviewed by human experts to ensure quality.',
            rating: 1
          },
          {
            name: 'Manoj',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150',
            title: 'Not Issuing Full Refund when canceled',
            content: 'I paid them 1055 USD. I canceled before any work was used I only received $963 USD. As a customer, their internal operating costs are irrelevant to me. When I return an...',
            date: 'Jul 2025',
            reply: 'We have a strict refund policy which accounts for payment processing fees and initial setup time. We are completely transparent about this before any payment is made.',
            rating: 1
          },
          {
            name: 'Sarah',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150',
            title: 'No Guaranteed Job Placement',
            content: 'I thought they guaranteed a job in the UK. I haven\'t secured an offer yet after 2 months. They only provided interviews and coaching.',
            date: 'Aug 2025',
            reply: 'We do not guarantee job offers, we guarantee interviews. Ultimately securing the role depends on your performance in the interview, which we coach you extensively for.',
            rating: 1
          },
          {
            name: 'Vikram',
            avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=150&h=150',
            title: 'Pricing is too high',
            content: 'Their pricing for full career management is way too high compared to local agencies in Kerala. It feels overpriced for standard assistance.',
            date: 'Oct 2025',
            reply: 'We provide high-touch international consulting, not just resume forwarding. The investment directly reflects the personalized time our UK/Ireland experts spend manually reviewing your profile.',
            rating: 1
          },
          {
            name: 'Priya',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&h=150',
            title: 'Time Zone Constraints',
            content: 'It\'s hard to schedule mentoring meetings because of the time difference between India and the UK. Sometimes I have to attend calls very late at night.',
            date: 'Nov 2025',
            reply: 'We offer flexible slots, but our core team operates in UK/Ireland hours as that is where your target market is. Adjusting to these hours is part of the realistic preparation for working abroad.',
            rating: 1
          }
        ];
      }

      // Auto-migrate Client Love Ratings
      if (newData.clientLove && typeof newData.clientLove === 'object') {
        const items = Array.isArray(newData.clientLove) ? newData.clientLove : (newData.clientLove.testimonials || []);
        if (Array.isArray(items)) {
          items.forEach((item: any) => {
            if (item.rating === undefined) item.rating = 5;
          });
          if (!Array.isArray(newData.clientLove) && newData.clientLove.testimonials) {
            newData.clientLove.testimonials = items;
          } else if (Array.isArray(newData.clientLove)) {
            newData.clientLove = items;
          }
        }
      }

      for (const [key, value] of Object.entries(newData)) {
        // Only upgrade to full objects (with description) if it's a main service 
        // (identified by having a slug/image) or if it's the top-level 'services' key.
        if (key.toLowerCase() === 'features' && Array.isArray(value) && (typeof value[0] === 'string' || typeof value[0] === 'object')) {
          const isMainService = newData.slug || newData.image || parentKey === 'services';
          
          if (isMainService) {
            newData[key] = value.map(item => {
              const title = typeof item === 'string' ? item : (item.title || '');
              const desc = typeof item === 'string' ? "Carefully tailored to ensure maximum success in your specific career path and market conditions." : (item.description || "");
              return { title, description: desc };
            });
          } else {
            // For Consultation and others, just keep as simple titles and STRIP any descriptions
            newData[key] = value.map(item => {
              const title = typeof item === 'string' ? item : (item.title || '');
              return { title };
            });
          }
        } else if (key === 'testimonials' && parentKey === 'clientLove' && value && (value as any).testimonialGrid) {
          // REVERSE MIGRATION: Extract review items out of the accidental video-list structure
          newData[key] = (value as any).testimonialGrid.videoUrls || [];
        } else if (key === 'testimonials' && (parentKey === undefined || parentKey === 'home') && (Array.isArray(value) || (value && (value as any).videoUrls && !(value as any).testimonialGrid))) {
          // Migration: Convert main Video Shorts to dual-list structure
          // Only migrate if we see string URLs (not review objects)
          const rawUrls = Array.isArray(value) ? value : ((value as any).videoUrls || []);
          const isUrlArray = Array.isArray(rawUrls) && (rawUrls.length === 0 || typeof rawUrls[0] === 'string');
          
          if (isUrlArray) {
            newData[key] = {
              testimonialGrid: {
                title: (typeof value === 'object' && (value as any).title) ? (value as any).title : "Real Results. Real Stories.",
                videoUrls: rawUrls.slice(0, 4)
              },
              animatedShorts: {
                title: "Animated Shorts",
                videoUrls: rawUrls.slice(4)
              }
            };
          } else {
            newData[key] = processContent(value, key);
          }
        } else {
          newData[key] = processContent(value, key);
        }
      }
      return newData;
    }

    return data;
  };

  const fetchContent = async (key: string, isSubKey = false) => {
    if (!isSubKey) setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('cms_content')
        .select('content')
        .eq('key', key)
        .single();

      if (fetchError) throw fetchError;
      
      const processed = processContent(data.content);
      if (isSubKey) {
        setSubContent(processed);
      } else {
        setContent(processed);
        setActiveSubSection(null);
        setActiveItemIndex(null);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to load ${key} content`);
    } finally {
      if (!isSubKey) setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);
    if (sub?.targetKey) {
      fetchContent(sub.targetKey, true);
    } else {
      setSubContent(null);
    }
    setActiveItemIndex(null); // Reset item selection when sub-section changes
  }, [activeSubSection]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);
      const targetKey = sub?.targetKey || activeSection;
      let finalContent = sub?.targetKey ? subContent : content;
      
      if (devMode && typeof content === 'string') {
        try {
          finalContent = JSON.parse(content);
        } catch (e) {
          throw new Error('Invalid JSON format');
        }
      }

      const { error: updateError } = await supabase
        .from('cms_content')
        .update({ content: finalContent, updated_at: new Date().toISOString() })
        .eq('key', targetKey);

      if (updateError) throw updateError;
      toast.success(`${activeSubSection || activeSection} updated successfully!`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const updateSubSection = (newSubContent: any) => {
    if (!activeSubSection) return;
    const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);
    
    if (sub?.targetKey) {
      setSubContent(newSubContent);
    } else {
      setContent({
        ...content,
        [activeSubSection]: newSubContent
      });
    }
  };

  const updateItemContent = (newItemContent: any) => {
    if (activeItemIndex === null || !activeSubSection) return;
    const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);
    
    if (sub?.targetKey) {
      const newArray = [...subContent];
      newArray[activeItemIndex] = newItemContent;
      setSubContent(newArray);
    } else {
      const newArray = [...content[activeSubSection]];
      newArray[activeItemIndex] = newItemContent;
      setContent({ ...content, [activeSubSection]: newArray });
    }
  };

  const addItem = () => {
    if (!activeSubSection) return;
    const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);
    
    // Create a template based on the subsection
    let template: any = { title: "New Item", description: "Default description" };
    if (activeSubSection === 'trustpilotReviews') {
      template = { name: "New User", title: "Excellent Service", content: "Write your review here...", rating: 5, time: "Just now" };
    } else if (activeSubSection === 'audioReviews') {
      template = { name: "New Candidate", role: "Job Seeker", title: "My Career Success", audioUrl: "", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150", flag: "https://flagcdn.com/w80/gb.png", duration: "1:00" };
    } else if (activeSubSection === 'plans') {
      template = { name: "New Plan", price: "0", features: ["Benefit 1"], isRecommended: false };
    } else if (activeSubSection === 'services') {
      template = { title: "New Service", description: "Service details...", image: "", slug: "new-service" };
    } else if (activeSubSection === 'clientLove') {
      template = { name: "New Client", role: "Job Seeker", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150", content: "Write the feedback here...", rating: 5 };
    } else if (activeSubSection === 'negativeReviews') {
      template = { name: "New Reviewer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150", title: "Review Title", content: "Negative review content...", date: "Jan 2026", reply: "Our professional response...", rating: 1 };
    } else if (activeSubSection === 'results') {
      template = { src: "", flag: "https://flagcdn.com/w80/in.png" };
    }

    if (sub?.targetKey) {
      const newArray = [...(subContent || []), template];
      setSubContent(newArray);
      setActiveItemIndex(newArray.length - 1);
    } else {
      const newArray = [...(content[activeSubSection] || []), template];
      setContent({ ...content, [activeSubSection]: newArray });
      setActiveItemIndex(newArray.length - 1);
    }
    toast.info("Added new item template");
  };

  const removeItem = (index: number) => {
    if (!activeSubSection) return;
    const sub = sections.find(s => s.id === activeSection)?.subSections?.find(ss => ss.id === activeSubSection);

    if (window.confirm("Are you sure you want to delete this item?")) {
      if (sub?.targetKey) {
        const newArray = subContent.filter((_: any, i: number) => i !== index);
        setSubContent(newArray);
      } else {
        const newArray = content[activeSubSection].filter((_: any, i: number) => i !== index);
        setContent({ ...content, [activeSubSection]: newArray });
      }
      setActiveItemIndex(null);
      toast.error("Item removed. Don't forget to save changes!");
    }
  };

  const currentSection = sections.find(s => s.id === activeSection);
  const currentSubSection = currentSection?.subSections?.find(s => s.id === activeSubSection);
  const activeItems = currentSubSection?.targetKey ? subContent : (currentSubSection && activeSubSection ? content[activeSubSection] : null);
  const isArraySection = Array.isArray(activeItems);
  const selectedItem = isArraySection && activeItemIndex !== null ? activeItems[activeItemIndex] : null;

  return (
    <div className="flex min-h-screen bg-[#FDFCFE]">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-purple-100 bg-white p-6 shadow-sm flex flex-col">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold text-[#1A112B]">CMS Admin</h1>
        </div>

        <nav className="space-y-1 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-purple-50 text-purple-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={18} />
                {section.label}
              </div>
              {activeSection === section.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        <div className="mt-auto px-4 py-6 border-t border-slate-50">
           <button 
             onClick={() => setDevMode(!devMode)}
             className={`text-[10px] uppercase font-bold tracking-widest ${devMode ? 'text-purple-600' : 'text-slate-300'}`}
           >
             {devMode ? 'Disable Dev Mode' : 'Enable Dev Mode'}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-auto">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {(activeSubSection || activeItemIndex !== null) && !devMode && (
               <button 
                 onClick={() => {
                   if (activeItemIndex !== null) setActiveItemIndex(null);
                   else setActiveSubSection(null);
                 }}
                 className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-100 bg-white text-purple-600 hover:bg-purple-50 transition-colors shadow-sm"
               >
                 <ArrowLeft size={18} />
               </button>
             )}
             <div>
                <h2 className="text-3xl font-bold text-[#1A112B]">
                  {selectedItem ? (selectedItem.title || selectedItem.name || 'Edit Item') : (currentSubSection ? currentSubSection.label : currentSection?.label)}
                </h2>
                <p className="mt-1 text-slate-500 text-sm">
                  {selectedItem 
                    ? `Currently editing specific details for "${selectedItem.title || selectedItem.name}".` 
                    : (currentSubSection ? (isArraySection ? `Select a ${currentSubSection.id.slice(0, -1)} to begin editing.` : `Editing the ${currentSubSection.label} of your Home Page.`) : `Manage your ${currentSection?.label} content.`)}
                </p>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fetchContent(activeSection)}
              className="flex items-center gap-2 rounded-lg border border-purple-100 bg-white px-4 py-2 text-sm font-semibold text-[#1A112B] hover:bg-purple-50 transition-colors"
            >
              <RefreshCcw size={16} />
              Reload
            </button>
            {activeItemIndex !== null && isArraySection && (
              <button
                onClick={() => removeItem(activeItemIndex)}
                className="flex items-center justify-center h-10 w-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                title="Remove Item"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving || loading || (currentSection?.subSections && !activeSubSection && !devMode)}
              className="flex items-center gap-2 rounded-lg bg-[#1A112B] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </header>

        <section className="relative min-h-[500px]">
          {loading ? (
            <div className="flex h-[500px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
                <p className="text-slate-400 font-medium animate-pulse">Fetching latest content...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-[500px] flex-col items-center justify-center text-center p-8 border-2 border-dashed border-red-100 rounded-3xl">
              <AlertCircle className="h-16 w-16 text-red-500 mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-red-900 mb-2">Failed to load content</h3>
              <p className="text-red-600/70 max-w-md">{error}</p>
            </div>
          ) : (
            <>
              {/* Category Selection Grid (Page OverView) */}
              {currentSection?.subSections && !activeSubSection && !devMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {currentSection.subSections.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubSection(sub.id)}
                      className="group flex flex-col items-start rounded-3xl border border-purple-100 bg-white p-8 text-left shadow-sm transition-all hover:shadow-xl hover:border-purple-300 hover:-translate-y-1"
                    >
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                         <LayoutGrid size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#1A112B] mb-2">{sub.label}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{sub.description}</p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         Edit Content <ChevronRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : isArraySection && activeItemIndex === null && !devMode ? (
                /* Item Selection Grid (Sub-Section OverView) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Add New Item Button Card */}
                  <button
                    onClick={addItem}
                    className="group flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-purple-100 bg-purple-50/20 p-8 text-center transition-all hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg h-full min-h-[220px]"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm transition-transform group-hover:scale-110">
                       <Plus size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A112B]">Add New Item</h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-[180px]">Expand your {currentSubSection?.label || 'list'} with fresh content.</p>
                  </button>

                  {activeItems.map((item: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveItemIndex(index)}
                      className="group flex flex-col items-start rounded-3xl border border-purple-100 bg-white p-8 text-left shadow-sm transition-all hover:shadow-xl hover:border-purple-300 hover:-translate-y-1"
                    >
                      <div className="mb-6 flex h-16 w-full items-center justify-center rounded-2xl bg-purple-50 overflow-hidden group-hover:bg-purple-100 transition-colors">
                         {item.image ? (
                           <img src={item.image} alt={item.title} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                         ) : (
                           <LayoutGrid size={24} className="text-purple-400" />
                         )}
                      </div>
                      <h3 className="text-lg font-bold text-[#1A112B] mb-2 line-clamp-1">{item.title || item.name || `Item #${index + 1}`}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 italic">
                        {item.description || item.category || 'Click to edit details.'}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                         Select to Edit <ChevronRight size={14} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Editor View */
                <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-xl shadow-purple-500/5 animate-in fade-in zoom-in-95 duration-300">
                   <div className="flex items-center justify-between mb-8 overflow-hidden">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 border border-green-100">
                      <CheckCircle2 size={12} />
                      Live Sync Active
                    </span>
                    <span className="text-xs text-slate-400 font-sans">
                      {devMode ? 'Mode: Developer (Raw JSON)' : `Mode: Visual CMS / ${selectedItem ? (selectedItem.title || selectedItem.name) : (activeSubSection || 'Full view')}`}
                    </span>
                  </div>

                  <div className="group relative">
                    {devMode ? (
                      <textarea
                        value={typeof (activeSubSection ? (currentSubSection?.targetKey ? subContent : content[activeSubSection]) : content) === 'string' 
                          ? (activeSubSection ? (currentSubSection?.targetKey ? subContent : content[activeSubSection]) : content) 
                          : JSON.stringify(activeSubSection ? (currentSubSection?.targetKey ? subContent : content[activeSubSection]) : content, null, 2)}
                        onChange={(e) => activeSubSection ? (currentSubSection?.targetKey ? setSubContent(e.target.value) : setContent({...content, [activeSubSection]: e.target.value})) : setContent(e.target.value)}
                        className="min-h-[600px] w-full rounded-2xl border border-purple-100 bg-[#FAFBFF] p-8 font-mono text-sm leading-relaxed text-slate-800 outline-none transition-all focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 selection:bg-purple-100"
                      />
                    ) : (
                      <div className="space-y-10 max-w-4xl mx-auto py-10">
                        {/* Render Visual Form Fields */}
                        {activeItemIndex !== null && selectedItem ? (
                          <AdminFormControl 
                            label={selectedItem.title || selectedItem.name || 'Item Details'} 
                            value={selectedItem} 
                            onChange={updateItemContent}
                            excludeFields={['bookStrategyCall', 'whatsappNow']}
                          />
                        ) : activeSubSection ? (
                          <AdminFormControl 
                            label={activeSubSection} 
                            value={currentSubSection?.targetKey ? subContent : content[activeSubSection]} 
                            onChange={updateSubSection}
                            excludeFields={['bookStrategyCall', 'whatsappNow']}
                          />
                        ) : (
                          <AdminFormControl 
                            label={activeSection} 
                            value={content} 
                            onChange={(newContent: any) => setContent(newContent)} 
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
