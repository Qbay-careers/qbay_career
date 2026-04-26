'use client';

import React, { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Check sessionStorage cache first (5-minute TTL) to avoid repeat Supabase calls
        const CACHE_KEY = 'qbay_popup_cms';
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { data: cachedData, ts } = JSON.parse(cached);
            if (Date.now() - ts < 5 * 60 * 1000) {
              setCmsData(cachedData);
              setLoading(false);
              return;
            }
          } catch { /* stale or corrupt cache — fall through to fetch */ }
        }

        const { data } = await supabase
          .from('cms_content')
          .select('content')
          .eq('key', 'popup')
          .maybeSingle();
        
        if (data?.content) {
          setCmsData(data.content);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: data.content, ts: Date.now() }));
          } catch { /* sessionStorage unavailable (e.g. private mode) — ignore */ }
        }
      } catch (err) {
        console.error('Failed to fetch popup settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (loading || !cmsData || cmsData.isEnabled === false) return;

    const hasSeenPopup = sessionStorage.getItem('qbay_wp_popup_seen');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, cmsData.delay || 6000);

    return () => clearTimeout(timer);
  }, [loading, cmsData]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('qbay_wp_popup_seen', 'true');
  };

  if (!isVisible || !cmsData) return null;

  const {
    title = "Join Our WhatsApp Community",
    subtitle = "Talk directly with our experts, get guidance, and be part of a community that helps you move forward — for free.",
    buttonLabel = "Join Community",
    whatsappLink = "https://wa.me/447551940676",
    primaryColor = "#0d6e4c",
    secondaryColor = "#25D366"
  } = cmsData;

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
          {/* Card with dynamic gradient */}
          <div 
            className="relative overflow-hidden rounded-3xl p-8 text-center shadow-[0_30px_80px_rgba(18,140,126,0.35)]"
            style={{ 
              background: `linear-gradient(to bottom right, ${primaryColor}, ${primaryColor}, ${secondaryColor})` 
            }}
          >

            {/* Decorative blobs */}
            <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />


            {/* Headline */}
            <div className="relative z-10 space-y-3 mb-8">
              <h2 className="text-2xl font-black text-white leading-tight">
                {title.split('\n').map((line: string, i: number) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 space-y-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-4 text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                style={{ color: primaryColor }}
              >
                <Send className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                {buttonLabel}
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
