"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "15+", label: "Projects Completed" },
  { number: "10+", label: "Happy Clients" },
  { number: "5+", label: "Tech Stack" },
];

const codeSnippet = `// about-rijin.js
const rijin = {
  role: "React.js Developer",
  location: "Kerala, India",
  skills: ["React", "Next.js", 
           "TypeScript", "Node.js"],
  passion: "Building beautiful UIs",
  currentFocus: "Full Stack Web Apps",
  available: true,
};`;

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="AboutMe"
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
          <span className="section-label">// About Me</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            Get To Know{" "}
            <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mb-6">
              Hi! I&apos;m <span className="text-white font-semibold">Rijin V Reji</span>,
              a passionate <span className="text-[var(--primary-light)] font-medium">React.js Developer</span> with
              a strong foundation in modern frontend development. I specialize in building
              high-performance, accessible, and visually stunning web applications that
              deliver exceptional user experiences.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mb-6">
              With expertise in <span className="text-white">React</span>, <span className="text-white">Next.js</span>,
              <span className="text-white"> TypeScript</span>, and <span className="text-white">Node.js</span>, I love
              turning complex problems into elegant, intuitive interfaces. I&apos;m deeply invested
              in component architecture, state management patterns, and performance optimization.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-sm sm:text-base mb-8">
              I thrive in fast-paced environments where I can push boundaries, mentor teams,
              and continuously learn. When I&apos;m not coding, I&apos;m exploring the latest
              frontend trends and contributing to the dev community.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="code-block relative">
              {/* Window dots */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <pre className="text-xs sm:text-sm overflow-x-auto">
                {codeSnippet.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-[var(--surface-border)] select-none mr-4 text-right w-6 inline-block">
                      {i + 1}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightSyntax(line),
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>

            {/* Terminal-style status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-4 glass-card p-3 sm:p-4 flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-glow" />
              <span className="font-mono text-xs text-[var(--text-muted)]">
                status: <span className="text-green-400">available for hire</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function highlightSyntax(line) {
  // Handle comments first (entire line)
  if (line.trim().startsWith('//')) {
    return `<span class="code-comment">${escapeHtml(line)}</span>`;
  }

  let result = '';
  let i = 0;
  const chars = line;

  while (i < chars.length) {
    // String literals
    if (chars[i] === '"') {
      let end = chars.indexOf('"', i + 1);
      if (end === -1) end = chars.length - 1;
      result += `<span class="code-string">${escapeHtml(chars.slice(i, end + 1))}</span>`;
      i = end + 1;
      continue;
    }
    // Brackets and punctuation
    if ('{}[],;='.includes(chars[i])) {
      result += `<span class="code-bracket">${chars[i]}</span>`;
      i++;
      continue;
    }
    // Words
    if (/[a-zA-Z_]/.test(chars[i])) {
      let word = '';
      let start = i;
      while (i < chars.length && /[a-zA-Z_0-9+()]/.test(chars[i])) {
        word += chars[i];
        i++;
      }
      const keywords = ['const', 'let', 'var', 'true', 'false'];
      if (keywords.includes(word)) {
        result += `<span class="code-keyword">${word}</span>`;
      } else if (i < chars.length && chars[i] === ':') {
        result += `<span class="code-function">${word}</span>`;
      } else {
        result += word;
      }
      continue;
    }
    result += chars[i];
    i++;
  }
  return result;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

