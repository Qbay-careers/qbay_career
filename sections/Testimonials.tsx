'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    content:
      'Working with this team has been an absolute pleasure. They delivered beyond our expectations and transformed our digital presence completely.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, GrowthLabs',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    content:
      'Their expertise in modern web technologies is unmatched. Our new platform is fast, beautiful, and exactly what we needed to scale our business.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director, BrandCo',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    content:
      'The attention to detail and creative solutions they provided were outstanding. Our brand has never looked better, and our customers love the new experience.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Park',
    role: 'CTO, InnovateTech',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    content:
      'Professional, responsive, and incredibly talented. They turned our vision into reality and exceeded all our technical requirements.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Client{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        <div ref={carouselRef} className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 text-center mb-8 italic">
              "{currentTestimonial.content}"
            </p>

            <div className="flex flex-col items-center">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentTestimonial.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {currentTestimonial.role}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
