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
  LayoutGrid
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
    { id: 'faq', label: 'FAQ', description: 'Frequently asked questions and answers.' },
    { id: 'services', label: 'Our Services', description: 'Categories and service cards for the home page.', targetKey: 'services' },
    { id: 'founderLetter', label: 'Founder Letter', description: 'A personal note from the founder.' },
    { id: 'finalCTA', label: 'Bottom CTA', description: 'The final call to action at the bottom.' },
  ]},
  { id: 'about', icon: Info, label: 'About Us' },
  { id: 'pricing', icon: Euro, label: 'Pricing' },
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

  const fetchContent = async (key: string, isSubKey = false) => {
    if (!isSubKey) setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('cms_content')
        .select('content')
        .eq('key', key)
        .single();

      if (fetchError) throw fetchError;
      
      if (isSubKey) {
        setSubContent(data.content);
      } else {
        setContent(data.content);
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
                    <span className="text-xs text-slate-400 font-mono">
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
                        {activeItemIndex !== null ? (
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
