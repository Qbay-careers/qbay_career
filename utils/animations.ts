import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

export const fadeInStagger = (elements: string, delay: number = 0) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      delay,
      ease: 'power3.out',
    }
  );
};

export const scaleIn = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

export const slideIn = (
  element: string | Element,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  delay: number = 0
) => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
  };

  return gsap.fromTo(
    element,
    { ...directions[direction], opacity: 0 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: 'power3.out',
    }
  );
};

export const scrollAnimation = (
  element: string | Element,
  trigger?: string
) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ease: 'power3.out',
    }
  );
};
