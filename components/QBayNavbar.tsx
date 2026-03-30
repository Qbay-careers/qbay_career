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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Go to home"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-pink-500" />
            <div className="leading-tight">
              <div className="text-lg font-semibold text-gray-900">QBay</div>
              <div className="text-xs text-gray-500">Careers</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={
                pathname === l.href
                  ? 'text-sm font-bold text-[#5D4A7A]'
                  : 'text-sm font-medium text-gray-500 hover:text-[#5D4A7A] transition-colors'
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
          >
            Appointment
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-800 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  pathname === l.href
                    ? 'rounded-md px-3 py-2 text-sm font-bold text-[#5D4A7A] bg-purple-50'
                    : 'rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                }
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-3 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Appointment
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
