'use client';

import React, { useState, useEffect } from 'react';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Calendar, User, ArrowRight, Search, Tag, Loader2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function BlogListing() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('key', 'blog')
          .maybeSingle();

        if (error) throw error;
        if (data?.content && Array.isArray(data.content)) {
          setBlogPosts(data.content);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const featuredPost = blogPosts[0];

  return (
    <main className="min-h-screen bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section - Redesigned based on User Provided Design */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background Geometric Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 20 L20 0 M80 100 L100 80 M0 80 L20 100 M80 0 L100 20" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="h-[450px] w-full rounded-[2.5rem] bg-white animate-pulse border border-purple-50 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-purple-200" />
            </div>
          ) : featuredPost && (
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-purple-900/5 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Left Side: Image */}
                <div className="lg:w-[55%] relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                   <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent z-10 group-hover:opacity-0 transition-opacity" />
                   <img 
                    src={featuredPost.image} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    alt={featuredPost.title} 
                  />
                </div>
                {/* Right Side: Content */}
                <div className="lg:w-[45%] p-8 lg:p-14 flex flex-col justify-center bg-white relative">
                   <div className="flex items-center gap-3 mb-8">
                     <span className="px-5 py-1.5 rounded-full bg-[#1A112B] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-black/10">
                       Featured
                     </span>
                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 grayscale opacity-70">
                       8 min read
                     </span>
                   </div>
                   
                   <h1 className="text-3xl lg:text-5xl font-black mb-8 text-[#1A112B] leading-[1.1] tracking-tighter">
                     {featuredPost.title}
                   </h1>
                   
                   <p className="text-lg text-slate-500 mb-10 leading-relaxed line-clamp-3 font-medium">
                     {featuredPost.excerpt}
                   </p>
                   
                   <Link 
                     href={`/blog/${featuredPost.slug || featuredPost.title.toLowerCase().replace(/ /g, '-')}`} 
                     className="inline-flex items-center gap-2 text-sm font-black text-[#1A112B] hover:gap-4 transition-all group/link"
                   >
                     Read More <ArrowRight className="h-5 w-5 text-purple-600 transition-transform group-hover/link:translate-x-1" />
                   </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-32 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Navigation Icons */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16 px-2">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#1A112B] tracking-tight mb-3">
                Our Recent Articles
              </h2>
              <p className="text-slate-400 font-bold text-sm tracking-wide uppercase opacity-80">
                Stay Informed with Our Latest Insights
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#1A112B] hover:text-[#1A112B] transition-all">
                 <ChevronLeft size={20} />
               </button>
               <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#1A112B] hover:text-[#1A112B] transition-all">
                 <ChevronRight size={20} />
               </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16 px-2">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                    activeCategory === cat 
                      ? 'bg-[#1A112B] border-[#1A112B] text-white shadow-xl shadow-black/10' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-purple-600" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-white focus:outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-600/5 transition-all font-bold text-sm text-[#1A112B] placeholder:text-slate-300"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="h-[400px] w-full rounded-3xl bg-white border border-purple-50 animate-pulse" />
               ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-[3rem] bg-white">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-[#1A112B]">No articles matched.</h3>
              <p className="text-slate-500 mt-2 font-medium">Try broadening your filters or search keywords.</p>
            </div>
          ) : (
             <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {(activeCategory === 'All' && searchQuery === '' ? filteredPosts.slice(1) : filteredPosts).map((post, i) => (
                  <div key={i} className="group flex flex-col bg-transparent lg:hover:-translate-y-2 transition-transform duration-500">
                    {/* Card Image */}
                    <div className="aspect-[1.4] overflow-hidden rounded-[2rem] border border-slate-100 bg-white mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500 relative">
                      <img 
                        src={post.image} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt={post.title} 
                      />
                      <div className="absolute top-4 left-4 z-20">
                         <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black text-[#1A112B] border border-white/20 uppercase tracking-widest shadow-sm">
                           {post.category}
                         </span>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="flex-1 flex flex-col px-1">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-[11px] font-black uppercase text-purple-600 tracking-wider">
                          {post.author}
                        </span>
                        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter">
                          {post.date}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-[#1A112B] leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto">
                        <Link 
                          href={`/blog/${post.slug || post.title.toLowerCase().replace(/ /g, '-')}`} 
                          className="inline-flex items-center gap-2 text-xs font-black text-[#1A112B] hover:gap-3 transition-all group/card-link"
                        >
                          Read More <ArrowRight className="h-4 w-4 text-purple-400 transition-transform group-hover/card-link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
