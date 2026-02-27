"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Whizpot",
    subtitle: "Full Stack Web Application",
    description:
      "A comprehensive web platform built with React.js and modern tooling. Features responsive design, dynamic content, and seamless user experience.",
    img: "/portfolio/Whizpot.png",
    link: "https://www.whizpot.com/",
    tags: ["React.js", "Next.js", "Responsive"],
  },
  {
    id: 2,
    title: "Belocated",
    subtitle: "Marketplace Platform",
    description:
      "A location-based services platform with interactive UI components, real-time updates, and intuitive navigation built with modern React patterns.",
    img: "/portfolio/Blocated.png",
    link: "https://belocated.com/",
    tags: ["React.js", "Node.js", "REST API"],
  },
  {
    id: 3,
    title: "Sage Research",
    subtitle: "Research Portal",
    description:
      "An elegant research portal with clean architecture, server-side rendering, and optimized performance for content-heavy pages.",
    img: "/portfolio/Sage.png",
    link: "https://sageresearch.oneteamus.com/",
    tags: ["Next.js", "TypeScript", "SSR"],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="Projects"
      className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="section-label">// Projects</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Featured{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-lg text-sm sm:text-base">
            A selection of projects that showcase my expertise in React.js development
            and modern web technologies.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card group overflow-hidden"
              data-cursor="pointer"
            >
              {/* Image */}
              <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                <Image
                  src={project.img}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />

                {/* View button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg hover:bg-[var(--primary-light)] transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs font-mono text-[var(--primary-light)] bg-[rgba(99,102,241,0.1)] px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--primary-light)] font-medium mb-3">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.description}
                </p>

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[var(--primary-light)] hover:text-white transition-colors group/link"
                >
                  <span>View Project</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform group-hover/link:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
