import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export default function QBayFooter() {
  return (
    <footer id="qbay-footer" className="bg-[#EBE6EA] pt-16 pb-24 md:pb-16 border-t border-gray-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Left */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center">
              <img src="/Your-paragraph-text-1.png" alt="QBay Logo" className="h-12 w-auto object-contain shrink-0" />
            </div>
            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
              Empowering job Seekers with smart and efficient tools to land their dream job
            </p>
          </div>

          {/* Middle */}
          <div className="lg:col-start-3 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg tracking-wide">Quick Link</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Home</Link></li>
              <li><Link href="/about-us" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">About Us</Link></li>
              <li><Link href="/services" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Services</Link></li>
              <li><Link href="/wall-of-fame" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Wall of Fame</Link></li>
              <li><Link href="/blog" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Blog</Link></li>
              <li><Link href="/pricing" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium">Pricing</Link></li>
            </ul>
          </div>

          {/* Right */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wider">OUR STORY</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Created by two laid-off guys who understand the challenges of today&apos;s job market
            </p>
            <div className="flex gap-5 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61588315100598" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-transform" aria-label="Facebook"><Facebook className="w-6 h-6" /></a>
              <a href="https://www.instagram.com/global_career_desk?igsh=MWN1Z2F6OTV5ZWpmbA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:scale-110 transition-transform" aria-label="Instagram"><Instagram className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/company/qbay/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
