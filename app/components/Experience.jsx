"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experience = [
  {
    year: "2023 — 2025",
    role: "Software Engineer",
    company: "Apps Team Technologies",
    desc: "Leading frontend development of client-facing React.js applications. Architecting component systems, implementing responsive designs, and optimizing web performance. Collaborated with cross-functional teams to deliver high-quality products.",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    type: "Full-time",
  },
  {
    year: "2023",
    role: "Software Engineer Intern",
    company: "Apps Team Technologies",
    desc: "Completed a 3-month internship in .NET, where I worked on backend development, built RESTful APIs, handled database operations, and gained practical experience in building scalable web applications.",
    tech: [".NET", "C#", "ASP.NET", "SQL Server", "REST APIs"],
    type: "Internship",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="Experience"
      className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="section-label">// Experience</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Work{" "}
            <span className="gradient-text">History</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-0 w-[2px] timeline-line" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              className="relative pl-10 sm:pl-14 pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-0 top-2 w-4 h-4 sm:w-5 sm:h-5 timeline-dot rounded-full" />

              {/* Card */}
              <div className="glass-card p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-[var(--primary-light)] font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {exp.year}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(99,102,241,0.15)] text-[var(--primary-light)] font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {exp.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-xs font-mono text-[var(--primary-light)] bg-[rgba(99,102,241,0.08)] px-2.5 py-1 rounded-md border border-[rgba(99,102,241,0.15)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
