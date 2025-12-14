
import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML5",
    "JavaScript",
    "CSS3",
    "Git",
    "GitHub",
    "Figma",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful APIs",
    "TypeScript",
  ];

  return (
    <section className="w-full py-20 text-center px-4">
      <div className="mb-12">
        <h3 className="text-sm font-semibold tracking-wider text-yellow-400">
          My Mind
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.15, y: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="px-6 py-3 border border-gray-300 rounded-full 
                       text-lg bg-white shadow-sm hover:shadow-md 
                       cursor-pointer select-none"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
