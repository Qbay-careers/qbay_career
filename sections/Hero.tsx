'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CustomButton from '@/components/CustomButton';
import { smoothScroll } from '@/utils/smooth-scroll';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.2'
        );

      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
            Innovation
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          We craft exceptional digital experiences that transform ideas into
          reality. Let's build something amazing together.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CustomButton
            variant="primary"
            size="lg"
            onClick={() => smoothScroll('projects')}
          >
            View Our Work
          </CustomButton>
          <CustomButton
            variant="outline"
            size="lg"
            onClick={() => smoothScroll('contact')}
          >
            Get in Touch
          </CustomButton>
        </div>

        <div
          ref={scrollRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => smoothScroll('about')}
        >
          <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
    </section>
  );
}
