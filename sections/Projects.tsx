'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description:
      'A modern e-commerce platform with advanced features including real-time inventory, payment integration, and personalized recommendations.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 2,
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with social features and AI-powered recommendations.',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg',
    technologies: ['React Native', 'Firebase', 'TensorFlow', 'Node.js'],
  },
  {
    id: 3,
    title: 'Brand Identity Design',
    category: 'Design',
    description:
      'Complete brand identity redesign including logo, color palette, typography, and brand guidelines for a tech startup.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    technologies: ['Figma', 'Adobe CC', 'Brand Strategy'],
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    category: 'Web Development',
    description:
      'Real-time analytics dashboard with advanced data visualization, custom reports, and automated insights for enterprise clients.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    technologies: ['React', 'D3.js', 'GraphQL', 'MongoDB'],
  },
  {
    id: 5,
    title: 'Social Media Campaign',
    category: 'Marketing',
    description:
      'Multi-platform social media campaign that increased brand awareness by 300% and drove significant customer engagement.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    technologies: ['Meta Ads', 'Google Ads', 'Analytics', 'Content Strategy'],
  },
  {
    id: 6,
    title: 'AI Chatbot Solution',
    category: 'AI/ML',
    description:
      'Intelligent chatbot powered by machine learning for customer support automation with natural language processing capabilities.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'Redis'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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
        gridRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          ease: 'back.out(1.2)',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of successful projects and innovations
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-200 dark:bg-gray-800 aspect-[4/3]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-blue-400 text-sm font-medium mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-white">
                    <span className="text-sm">View Details</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
            </div>

            <div className="p-8">
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                {selectedProject.category}
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                {selectedProject.description}
              </p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
