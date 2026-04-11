'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('qbay_wp_popup_seen');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('qbay_wp_popup_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Blurred backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-sm pointer-events-auto animate-popup-enter"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Card with green gradient */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d6e4c] via-[#128C7E] to-[#25D366] p-8 text-center shadow-[0_30px_80px_rgba(18,140,126,0.35)]">

            {/* Decorative blobs */}
            <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

            {/* WhatsApp SVG Icon */}
            <div className="relative z-10 flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm shadow-lg">
                <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
                  <path
                    fill="white"
                    d="M12 2a10 10 0 0 0-8.66 15.02L2 22l5.13-1.34A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.8.8-2.96-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.79-6.13c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.28-.78-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.07-.69.32-.24.26-.9.88-.9 2.16 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.8 4.44 3.92.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3Z"
                  />
                </svg>
              </div>
            </div>

            {/* Headline */}
            <div className="relative z-10 space-y-3 mb-8">
              <h2 className="text-2xl font-black text-white leading-tight">
                Join Our WhatsApp<br />Community
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Talk directly with our experts, get guidance, and be part of a community that helps you move forward — for free.
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 space-y-3">
              <a
                href="https://wa.me/447441391851"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#0d6e4c] shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Send icon SVG */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                </svg>
                Join Community
              </a>

              <button
                onClick={handleClose}
                className="w-full text-center text-xs text-white/60 hover:text-white/90 transition-colors font-semibold pt-1"
              >
                No, Thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
