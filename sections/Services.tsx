'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Smartphone, Rocket, Globe, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Custom web applications built with modern technologies and best practices.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive designs that engage users and drive conversions.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile applications for iOS and Android.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description:
      'Optimization and speed improvements for lightning-fast experiences.',
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description:
      'Strategic marketing solutions to grow your online presence.',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Enterprise-level security measures to protect your digital assets.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          ease: 'back.out(1.2)',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
