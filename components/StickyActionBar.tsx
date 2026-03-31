'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PhoneCall } from 'lucide-react';

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
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[13px] font-bold text-[#4B2C83] border border-purple-100 hover:bg-purple-50 transition-all font-sans"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <img src="/google-meet-icon.png" alt="Google Meet" className="h-5 w-5" />
          </span>
          Book Strategy Call
        </a>
        <a
          href="https://wa.me/447441391851"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[13px] font-bold text-white hover:bg-[#128C7E] shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] font-sans"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-8.66 15.02L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.8.8-2.96-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.79-6.13c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.28-.78-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.07-.69.32-.24.26-.9.88-.9 2.16 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3Z"
              />
            </svg>
          </span>
          Whatsapp Now
        </a>
      </div>
    </div>
  );
}
