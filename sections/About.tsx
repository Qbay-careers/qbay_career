'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircleCheck as CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Expert team with 10+ years of experience',
  'Cutting-edge technology and solutions',
  'Customer-focused approach',
  'Proven track record of success',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-1">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    10+
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              We are a passionate team of innovators dedicated to creating
              exceptional digital experiences. Our mission is to transform ideas
              into reality through cutting-edge technology and creative
              solutions.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              With over a decade of experience, we've helped hundreds of
              businesses achieve their goals and exceed their expectations. Our
              commitment to excellence drives everything we do.
            </p>

            <ul ref={featuresRef} className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
