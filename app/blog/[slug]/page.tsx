'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Calendar, User, ArrowLeft, Clock, Share2, Tag, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function BlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('cms_content')
          .select('content')
          .eq('key', 'blog')
          .maybeSingle();

        if (error) throw error;
        if (data?.content && Array.isArray(data.content)) {
          const foundPost = data.content.find((p: any) => p.slug === slug || p.title.toLowerCase().replace(/ /g, '-') === slug);
          if (foundPost) {
            setPost(foundPost);
            setRelatedPosts(data.content.filter((p: any) => (p.slug || p.title.toLowerCase().replace(/ /g, '-')) !== slug && p.category === foundPost.category).slice(0, 3));
          } else {
            router.push('/blog');
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Processing Article...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Article Header */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-24 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-100 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black text-purple-600 mb-12 hover:gap-4 transition-all uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" /> All Articles
          </Link>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-[#1A112B] text-white text-[10px] font-black uppercase tracking-widest leading-none">
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Clock className="h-4 w-4" /> 8 min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-[#1A112B] mb-12 leading-[1.05]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-8 pb-12 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <img src={`https://ui-avatars.com/api/?name=${post.author}&background=1A112B&color=FFFFFF&bold=true`} alt={post.author} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-base font-black text-[#1A112B]">{post.author}</div>
                <div className="text-xs font-bold text-slate-400 flex items-center gap-2 mt-1">
                  <Calendar className="h-3.5 w-3.5" /> Published on {post.date}
                </div>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#1A112B] text-xs font-black shadow-xl shadow-purple-900/5 hover:bg-[#1A112B] hover:text-white transition-all border border-slate-100 uppercase tracking-widest">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="mb-20 rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-900/10 border border-slate-100 aspect-video">
            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
          </div>

          {/* Body Text */}
          <div className="prose prose-slate prose-xl max-w-none">
             <p className="text-xl sm:text-2xl text-slate-500 font-bold leading-relaxed mb-16 italic border-l-8 border-purple-600 pl-10 opacity-80">
              {post.excerpt}
            </p>
            <div 
              className="text-[#1A112B] leading-[1.8] text-lg space-y-12 font-medium [&>h1]:text-4xl [&>h1]:font-black [&>h1]:tracking-tighter [&>h2]:text-3xl [&>h2]:font-black [&>h2]:tracking-tight [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Social Footer */}
          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-black text-slate-300 mr-2 flex items-center gap-2 uppercase tracking-[0.2em] mb-2 sm:mb-0">
                <Tag className="h-3.5 w-3.5" /> Tags:
              </span>
              {['Global', 'Career Management', post.category].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-lg bg-white text-slate-500 text-[10px] font-black border border-slate-100 uppercase tracking-widest shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section - Redesigned Card Style */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-black text-[#1A112B] tracking-tight mb-4">Recommended for You</h2>
               <div className="h-1.5 w-20 bg-purple-600 mx-auto rounded-full" />
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {relatedPosts.map((rPost, i) => (
                <div key={i} className="group flex flex-col bg-transparent lg:hover:-translate-y-2 transition-transform duration-500">
                  <div className="aspect-[1.5] overflow-hidden rounded-[2rem] border border-slate-100 bg-white mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src={rPost.image} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" alt={rPost.title} />
                  </div>
                  <div className="px-2">
                    <span className="text-[10px] font-black uppercase text-purple-600 tracking-widest mb-3 block">
                      {rPost.category}
                    </span>
                    <h3 className="text-xl font-bold mb-4 text-[#1A112B] group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                      {rPost.title}
                    </h3>
                    <Link href={`/blog/${rPost.slug || rPost.title.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-xs font-black text-[#1A112B] hover:gap-3 transition-all group/rlink">
                      Read More <ArrowRight className="h-4 w-4 text-purple-400 transition-transform group-hover/rlink:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <QBayFooter />
    </main>
  );
}
