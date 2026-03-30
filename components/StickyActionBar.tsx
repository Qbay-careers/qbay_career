'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function StickyActionBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Re-initialize observer whenever the pathname changes
    const footer = document.getElementById('qbay-footer');
    if (!footer) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide if footer is more than 5% visible
        setIsVisible(!entry.isIntersecting);
      },
      { 
        threshold: 0.05,
        rootMargin: '100px' // Start hiding a bit earlier
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-lg pointer-events-none transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 px-0'
      }`}
    >
      <div className="bg-white/90 backdrop-blur-2xl border border-white/40 rounded-full p-2 shadow-2xl shadow-purple-900/10 flex gap-2 pointer-events-auto items-center">
        <a
          href="/contact"
          className="flex-1 inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-[13px] font-bold text-[#4B2C83] border border-purple-100 hover:bg-purple-50 transition-all font-sans"
        >
          Book Strategy Call
        </a>
        <a
          href="https://wa.me/447441391851"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-bold text-white hover:bg-[#128C7E] shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] font-sans"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          Whatsapp Now
        </a>
      </div>
    </div>
  );
}
