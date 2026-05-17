import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';



export default function QBayFooter() {
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
              Empowering job Seekers with smart and efficient tools to land their dream job
            </p>
            <div className="flex gap-5 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61588315100598" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:scale-110 transition-transform" aria-label="Facebook"><Facebook className="w-6 h-6" /></a>
              <a href="https://www.instagram.com/global_career_desk?igsh=MWN1Z2F6OTV5ZWpmbA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:scale-110 transition-transform" aria-label="Instagram"><Instagram className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/company/qbay/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
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
                <div className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                  <a href="mailto:info@qbaycareer.com" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">info@qbaycareer.com</a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                  <a href="mailto:sales@qbaycareer.com" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">sales@qbaycareer.com</a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                  <a href="mailto:support@qbaycareer.com" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">support@qbaycareer.com</a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                  <a href="tel:+447551940676" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">+44 7551940676</a>
                </div>
                <div className="flex items-center gap-3 group">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0" />
                  <a href="tel:+447551928080" className="text-gray-500 hover:text-[#5D4A7A] transition-colors font-medium text-sm md:text-base">+44 7551928080</a>
                </div>
              </div>
              <div className="flex items-start gap-3 group pt-2 border-t border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-[#5D4A7A] transition-colors shrink-0 mt-0.5" />
                <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed">
                  18 Nursery Lane, Leamington Spa,<br />England, CV31 2PW
                </p>
              </div>
            </div>
          </div>

          {/* Right: Join Community */}
          <div className="lg:col-span-1 space-y-6 flex flex-col items-start">
            <div className="w-full lg:max-w-xs space-y-6">
              <h3 className="font-bold text-gray-900 text-lg tracking-wide text-left">Community</h3>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed text-left">
                Join our community of professionals and get expert guidance.
              </p>
              <div className="flex justify-start">
                <a 
                  href="https://www.whatsapp.com/channel/0029Vb5n9ib8F2pCzI5gEZ3H" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest"
                >
                  JOIN COMMUNITY
                </a>
              </div>
            </div>
          </div>




        </div>
      </div>
    </footer>
  );
}
