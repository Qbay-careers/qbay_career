'use client';

import React from 'react';
import QBayNavbar from '@/components/QBayNavbar';
import QBayFooter from '@/components/QBayFooter';
import { Quote, Star, Award, Zap, Heart, CheckCircle2 } from 'lucide-react';

const successStories = [
  {
    name: 'Anjali Nair',
    role: 'Registered Nurse (NHS)',
    content: 'The guidance I received was life-changing. From CV optimization to interview prep, QBay was with me at every step.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ef159963?auto=format&fit=crop&q=80&w=300&h=300',
    stat: 'NHS England',
    category: 'Healthcare'
  },
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    content: 'I was struggling to get calls. After QBay humanized my profile, I secured 3 interviews in just 2 weeks!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    stat: 'Dublin Tech Hub',
    category: 'Tech'
  },
  {
    name: 'Sneha Joseph',
    role: 'Medical Lab Technician',
    content: 'QBay helped me navigate the complex HSC application process seamlessly. Forever grateful!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    stat: 'HSC Northern Ireland',
    category: 'Healthcare'
  },
  {
    name: 'Arjun Das',
    role: 'Operations Manager',
    content: 'Their strategy for international professionals is unmatched. Highly recommend for anyone looking for UK/Ireland shifts.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300',
    stat: 'London Business District',
    category: 'Management'
  }
];

const resultsImages = [
  '/testimonials/whatsapp1.jpeg',
  '/testimonials/whatsapp2.jpeg',
  '/testimonials/whatsapp3.jpeg',
  '/testimonials/whatsapp4.jpeg',
  '/testimonials/whatsapp5.jpeg',
  '/testimonials/whatsapp6.jpeg'
];

export default function WallOfFame() {
  return (
    <main className="min-h-screen bg-[#FDFCFE] text-[#1A112B]">
      <QBayNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-purple-600 shadow-sm mb-6">
            <Award className="h-4 w-4" />
            CELEBRATING SUCCESS
          </div>
          <h1 className="text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-[#160E22] sm:text-7xl lg:text-[5rem] mb-6">
            Wall of <span className="text-purple-600 italic">Fame</span>
          </h1>
          <p className="mt-6 text-xl font-medium text-[#5D4A7A] max-w-2xl mx-auto">
            Real stories, real dreams, and the journey of thousands who transformed their careers with QBay.
          </p>
        </div>
      </section>

      {/* Success Cards Grid */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {successStories.map((story, i) => (
              <div key={i} className="group relative bg-white rounded-3xl p-8 border border-purple-50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 bg-purple-600 text-white p-3 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Quote className="h-5 w-5 rotate-180" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img src={story.image} alt={story.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-purple-100" />
                  <div>
                    <h3 className="font-bold text-[#1A112B]">{story.name}</h3>
                    <p className="text-xs font-medium text-purple-600">{story.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#5D4A7A] mb-6 italic">
                  "{story.content}"
                </p>
                <div className="pt-4 border-t border-purple-50 flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider">
                  <span>{story.stat}</span>
                  <span className="bg-slate-50 px-2 py-1 rounded-md">{story.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Results Section */}
      <section className="py-24 bg-[#F9F5FF] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#160E22] mb-4">Direct from Our Community</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Instant celebration and feedback shared by our candidates across global job markets.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {resultsImages.map((src, i) => (
              <div key={i} className="aspect-[9/16] rounded-2xl overflow-hidden border-4 border-white shadow-md hover:scale-105 transition-transform duration-500 cursor-zoom-in">
                <img src={src} className="h-full w-full object-cover" alt={`Success result ${i+1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-24 bg-white border-t border-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-[#1A112B]">
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-purple-600">100k+</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Helped Globally</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-purple-600">4.8</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Trustpilot Rating</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-purple-600">29</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Countries Covered</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-purple-600">98%</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <QBayFooter />
    </main>
  );
}
