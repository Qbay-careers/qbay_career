'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function QBayNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isHomePage = pathname === '/';
  const navTextColor = isScrolled || !isHomePage ? 'text-gray-600' : 'text-white/90';
  const activeTextColor = isScrolled || !isHomePage ? 'text-purple-700' : 'text-white font-bold';

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 rounded-[2.5rem] ${
        isScrolled 
          ? 'top-6 w-[92%] max-w-5xl bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 px-2 sm:px-6' 
          : 'top-0 w-full bg-transparent px-0 border-transparent shadow-none'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-pink-500 shadow-lg shadow-blue-500/20" />
            <div className="leading-tight">
              <div className={`text-lg font-bold transition-colors ${isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'}`}>QBay</div>
              <div className={`text-xs transition-colors ${isScrolled || !isHomePage ? 'text-gray-500' : 'text-white/70'}`}>Careers</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-sm transition-all hover:scale-105 ${
                pathname === l.href
                  ? `${activeTextColor} font-bold`
                  : `${navTextColor} font-medium hover:opacity-100 opacity-80`
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors md:hidden ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top duration-300">
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
    </header>
  );
}
