"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend Core",
    icon: "⚛️",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "Styling & UI",
    icon: "🎨",
    skills: ["Tailwind CSS", "Sass/SCSS", "Framer Motion", "CSS Modules", "Responsive Design", "Figma"],
  },
  {
    title: "Backend & Tools",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "Git/GitHub", "Vite"],
  },
  {
    title: "Ecosystem",
    icon: "🧩",
    skills: ["Redux", "React Query", "Three.js", "Webpack", "npm/Yarn", "Vercel"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="Skills"
      className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-label">// Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-sm sm:text-base">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.1 }}
              className="glass-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.4 + catIdx * 0.1 + skillIdx * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="skill-pill px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm cursor-pointer select-none"
                    data-cursor="pointer"
                  >
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 overflow-hidden"
        >
          <div className="flex animate-marquee">
            {[...skillCategories.flatMap((c) => c.skills), ...skillCategories.flatMap((c) => c.skills)].map(
              (skill, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 mx-4 sm:mx-6 text-lg sm:text-xl font-bold text-[rgba(99,102,241,0.15)] whitespace-nowrap"
                >
                  {skill}
                </span>
              )
            )}
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
              width: max-content;
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
