'use client';

import React from 'react';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Cracking the NHS Interview: A Step-by-Step Guide',
    excerpt: 'Understanding the core values of the NHS and how to align your experience with their competency frameworks.',
    date: 'April 05, 2026',
    author: 'Dr. Sarah Smith',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'Top 10 High-Demand Skills for the UK Tech Market in 2026',
    excerpt: 'From AI integration to cybersecurity, explore the skills that recruiters are desperately searching for this year.',
    date: 'April 02, 2026',
    author: 'James Wilson',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1519389950473-acc71958480c?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'How to Build an ATS-Friendly CV for Global Companies',
    excerpt: 'Stop getting filtered out by algorithms. Learn the secrets to making your CV both human and bot-friendly.',
    date: 'March 28, 2026',
    author: 'Emily Chen',
    category: 'Career Strategy',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    title: 'Moving to Ireland: Essential Checklist for Professionals',
    excerpt: 'From PPS numbers to housing and cultural integration, everything you need to know before you fly.',
    date: 'March 15, 2026',
    author: 'Rahul Verma',
    category: 'Migration',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

export default function BlogListing() {
  return (
    <main className="min-h-screen bg-white text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-[#F9F5FF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#160E22] mb-6">
            Insights & <span className="text-purple-600">Advice</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our latest thoughts on career growth, global job markets, and relocation strategies.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-bold text-slate-400 mr-2 uppercase tracking-widest flex items-center gap-2">
                <Tag className="h-4 w-4" /> Filters:
              </span>
              {['All', 'Healthcare', 'Tech', 'Career Strategy', 'Migration'].map((cat) => (
                <button key={cat} className="px-4 py-2 rounded-full text-sm font-bold border border-slate-100 hover:border-purple-600 hover:text-purple-600 transition-all">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all font-medium"
              />
            </div>
          </div>

          {/* Featured Post (First one) */}
          <div className="mb-20">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-purple-50 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img 
                    src={blogPosts[0].image} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={blogPosts[0].title} 
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-bold uppercase mb-6 w-fit leading-tight border border-purple-100">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#1A112B] leading-tight group-hover:text-purple-600 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-8 text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {blogPosts[0].date}</span>
                    <span className="flex items-center gap-2"><User className="h-4 w-4" /> {blogPosts[0].author}</span>
                  </div>
                  <Link href={`/blog/${blogPosts[0].title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-base font-bold text-purple-600 hover:text-purple-800 transition-colors group/btn">
                    Read Full Story <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of other posts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-purple-50 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-4 block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-4 text-[#1A112B] group-hover:text-purple-600 transition-colors flex-1 leading-tight">
                    {post.title}
                  </h3>
                  <div className="mt-6 pt-6 border-t border-purple-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{post.date}</span>
                    <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-purple-600 transition-all hover:bg-purple-600 hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#1A112B] overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-purple-600/20 blur-[120px] pointer-events-none rounded-full" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Stay ahead of the curve.</h2>
          <p className="text-slate-300 mb-10 text-lg">Weekly insights on global careers, salary trends, and interview secrets delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your work email" className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white/15 transition-all text-sm font-medium" />
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-purple-900/20 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
