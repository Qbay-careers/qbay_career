'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Wall of Fame', href: '/wall-of-fame' },
  { label: 'Blog', href: '/blog' },
];

export default function QBayNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Reveal on scroll up logic
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setCurrentScrollY(scrollY);
      setIsScrolled(scrollY > 50);

      if (scrollY > lastScrollY && scrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else if (scrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setOpen(false);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navTextColor = 'text-[#2D1B4D]/90';
  const activeTextColor = 'text-[#160E22] font-extrabold';

  const useCapsuleStyle = isScrolled && isDesktop;
  
  // Calculate top position for fixed navbar
  const navbarTop = 0;

  // Navbar stays sticky on mobile, in capsule mode, or when mobile menu is open
  const isActuallyVisible = visible || useCapsuleStyle || !isDesktop || open;

  return (
    <>
      {/* Main Navbar - Fixed with Reveal/Sticky Animation */}
      <div 
        className={`fixed left-0 w-full z-50 flex flex-col items-center transition-all duration-500 ease-in-out ${
          isActuallyVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${useCapsuleStyle ? 'px-4' : 'px-0'}`}
        style={{ 
          top: useCapsuleStyle ? '16px' : `${navbarTop}px`,
        }}
      >
        <header 
          className={`transition-all duration-700 ease-in-out overflow-hidden flex items-center justify-between ${
            useCapsuleStyle 
              ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(45,27,77,0.1)] max-w-max rounded-full px-8 h-12 border border-white/80' 
              : isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 w-full px-4 sm:px-6 lg:px-8 h-16' 
                : 'bg-transparent border-transparent w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-20'
          }`}
        >
          <div 
            className={`flex-shrink-0 transition-all duration-500 ${
              useCapsuleStyle ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100 mr-8'
            }`}
          >
            <Link href="/" className="flex items-center" aria-label="Go to home">
              <img src="/Your-paragraph-text-1.png" alt="QBay Logo" className="h-8 w-auto object-contain flex-shrink-0" />
            </Link>
          </div>

          <nav className={`hidden items-center transition-all duration-300 ${useCapsuleStyle ? 'gap-6' : 'gap-8'} md:flex whitespace-nowrap`} aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm transition-all hover:scale-105 ${
                  pathname === l.href
                    ? `font-bold ${activeTextColor}`
                    : `font-medium hover:opacity-100 ${isScrolled ? `${navTextColor} hover:text-violet-600` : navTextColor}`
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors md:hidden ml-4 text-gray-800`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {open && (
          <div className="absolute top-[100%] left-0 w-full border-t border-gray-100 bg-white/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top duration-300 mt-2 shadow-2xl shadow-purple-900/10 rounded-b-3xl">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6" aria-label="Mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                    pathname === l.href
                      ? 'font-bold text-purple-700 bg-purple-50'
                      : 'font-medium text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
