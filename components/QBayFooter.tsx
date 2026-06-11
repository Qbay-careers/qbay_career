'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

interface FooterData {
  tagline?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  email1?: string;
  email2?: string;
  email3?: string;
  phone?: string;
  address?: string;
  whatsappCommunityUrl?: string;
  communityHeading?: string;
  communitySubtext?: string;
  communityButtonLabel?: string;
}

interface QBayFooterProps {
  data?: FooterData;
}

const DEFAULTS: FooterData = {
  tagline: 'Empowering job Seekers with smart and efficient tools to land their dream job',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61588315100598',
  instagramUrl: 'https://www.instagram.com/qbay_global_careers/?hl=en',
  linkedinUrl: 'https://www.linkedin.com/company/qbay/',
  email1: 'info@qbaycareer.com',
  email2: 'sales@qbaycareer.com',
  email3: 'support@qbaycareer.com',
  phone: '+44 7704 862669',
  address: 'London Rd, Elephant and Castle,\nLondon SE1 6LF, United Kingdom',
  whatsappCommunityUrl: 'https://www.whatsapp.com/channel/0029Vb5n9ib8F2pCzI5gEZ3H',
  communityHeading: 'Community',
  communitySubtext: 'Join our community of professionals and get expert guidance.',
  communityButtonLabel: 'JOIN COMMUNITY',
};

export default function QBayFooter({ data }: QBayFooterProps) {
  const d: FooterData = { ...DEFAULTS, ...data };

  const addressLines = (d.address || '').split('\n');

  return (
    <footer id="qbay-footer" className="bg-[#EBE6EA] pt-16 pb-24 md:pb-16 border-t border-gray-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-x-2 lg:gap-y-8">

          {/* Left: Logo & Socials */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <img src="/Your-paragraph-text-1.png" alt="QBay Logo" className="h-12 w-auto object-contain shrink-0" />
            </div>
            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed max-w-[280px]">
              {d.tagline}
            </p>
            <div className="flex gap-5 pt-2">
              {d.facebookUrl && (
                <a href={d.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-transform" aria-label="Facebook">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {d.instagramUrl && (
                <a href={d.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:scale-110 transition-transform" aria-label="Instagram">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {d.linkedinUrl && (
                <a href={d.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform" aria-label="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Home</Link></li>
              <li><Link href="/about-us" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">About Us</Link></li>
              <li><Link href="/wall-of-fame" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Wall of Fame</Link></li>
              <li><Link href="/blog" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Blog</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Pricing</Link></li>
            </ul>
          </div>

          {/* Middle: Contact Info */}
          <div className="lg:col-span-1 space-y-6 lg:-ml-12">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex flex-col space-y-4">
                {d.email1 && (
                  <div className="flex items-center gap-3 group">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                    <a href={`mailto:${d.email1}`} className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">{d.email1}</a>
                  </div>
                )}
                {d.email2 && (
                  <div className="flex items-center gap-3 group">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                    <a href={`mailto:${d.email2}`} className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">{d.email2}</a>
                  </div>
                )}
                {d.email3 && (
                  <div className="flex items-center gap-3 group">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                    <a href={`mailto:${d.email3}`} className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">{d.email3}</a>
                  </div>
                )}
                {d.phone && (
                  <div className="flex items-center gap-3 group">
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                    <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">{d.phone}</a>
                  </div>
                )}
              </div>
              {d.address && (
                <div className="flex items-start gap-3 group pt-2 border-t border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0 mt-0.5" />
                  <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
                    {addressLines.map((line, i) => (
                      <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Join Community */}
          <div className="lg:col-span-1 space-y-6 flex flex-col items-start">
            <div className="w-full lg:max-w-xs space-y-6">
              <h3 className="font-bold text-gray-900 text-lg tracking-wide text-left">{d.communityHeading}</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed text-left">
                {d.communitySubtext}
              </p>
              <div className="flex justify-start">
                <a
                  href={d.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  {d.communityButtonLabel}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
