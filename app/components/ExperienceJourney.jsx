"use client";
import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView, AnimatePresence } from "framer-motion";

const experience = [
  {
    year: "2026 — Present",
    role: "Senior Systems Engineer",
    company: "RM plc",
    desc: "Support system operations and infrastructure for the Assessment–Technical Operations team, ensuring reliable and highly available technical services. Perform troubleshooting and root-cause analysis across systems and infrastructure to minimize downtime. Contribute to DevOps practices including CI/CD pipeline support, deployment workflows, and infrastructure monitoring. Collaborate with cross-functional technical teams to deliver reliable, scalable solutions and improve operational processes.",
    tech: ["DevOps", "CI/CD", "Infrastructure", "Cloud", "Monitoring"],
    type: "Full-time",
    color: "#22d3ee",
    icon: "🛰️",
    level: 4,
  },
  {
    year: "2023 — 2025",
    role: "Software Engineer",
    company: "Apps Team Technologies",
    desc: "Leading frontend development of client-facing React.js applications. Architecting component systems, implementing responsive designs, and optimizing web performance.",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    type: "Full-time",
    color: "#6366f1",
    icon: "⚡",
    level: 3,
  },
  {
    year: "2023",
    role: "Software Engineer Intern",
    company: "Apps Team Technologies",
    desc: "Completed a 3-month internship in .NET, where I worked on backend development, built RESTful APIs, handled database operations, and gained practical experience.",
    tech: [".NET", "C#", "ASP.NET", "SQL Server", "REST APIs"],
    type: "Internship",
    color: "#8b5cf6",
    icon: "🚀",
    level: 2,
  },
  {
    year: "2022 — 2023",
    role: "Web Developer",
    company: "Aligntax Consultancy",
    desc: "Developed and maintained web applications for the consultancy, building client-facing portals and internal tools. Worked on full-stack development creating responsive interfaces to streamline business operations.",
    tech: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
    type: "Full-time",
    color: "#a78bfa",
    icon: "💼",
    level: 1,
  },
];

// ─── Floating Crystal (3D) ───────────────────
function CheckpointCrystal({ position, color, index }) {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5 + index * 2;
      meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + index * 1.5) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8 + index * 3;
      ringRef.current.rotation.x = Math.PI * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} transparent opacity={0.9} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.0, 0.02, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.6} />
      </mesh>
      <mesh scale={2}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ─── Particle Trail ──────────────────────────
function ParticleTrail({ start, end, color, count = 30 }) {
  const pointsRef = useRef();
  const particles = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      pos.push(
        THREE.MathUtils.lerp(start[0], end[0], t) + (Math.random() - 0.5) * 0.3,
        THREE.MathUtils.lerp(start[1], end[1], t) + (Math.random() - 0.5) * 0.3,
        THREE.MathUtils.lerp(start[2], end[2], t) + (Math.random() - 0.5) * 0.3,
      );
    }
    return new Float32Array(pos);
  }, [start, end, count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const baseT = i / count;
        positions[i * 3]     = THREE.MathUtils.lerp(start[0], end[0], baseT) + Math.sin(t * 2 + i * 0.5) * 0.15;
        positions[i * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], baseT) + Math.cos(t * 1.5 + i * 0.3) * 0.15;
        positions[i * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], baseT) + Math.sin(t + i * 0.7) * 0.1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Nebula ──────────────────────────────────
function Nebula() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} scale={8} position={[0, 0, -5]}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial color="#4f46e5" transparent opacity={0.03} distort={0.6} speed={1.5} wireframe />
      </mesh>
    </Float>
  );
}

function ExperienceScene() {
  const checkpoints = [[-5.5, 1.5, 0], [-1.8, -0.8, 0], [1.8, 1.0, 0], [5.5, -0.8, 0]];
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]}   intensity={0.6} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#6366f1" />
      <pointLight position={[0, 3, -5]}  intensity={0.3} color="#8b5cf6" />
      <pointLight position={[3, -4, 2]}  intensity={0.3} color="#a78bfa" />
      {experience.map((exp, i) => (
        <CheckpointCrystal key={i} position={checkpoints[i]} color={exp.color} index={i} />
      ))}
      <ParticleTrail start={checkpoints[0]} end={checkpoints[1]} color="#22d3ee" />
      <ParticleTrail start={checkpoints[1]} end={checkpoints[2]} color="#6366f1" />
      <ParticleTrail start={checkpoints[2]} end={checkpoints[3]} color="#8b5cf6" />
      <Nebula />
    </>
  );
}

// ─── XP Bar ──────────────────────────────────
function XPBar({ color, delay, isInView }) {
  return (
    <div className="mt-5">
      <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1.5">
        <span>XP Progress</span>
        <span style={{ color }}>100%</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}70)`, boxShadow: `0 0 10px ${color}50` }}
        />
      </div>
    </div>
  );
}

// ─── Experience Card ─────────────────────────
function ExpCard({ exp, index, isInView }) {
  const [expanded, setExpanded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.94 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, delay: 0.3 + index * 0.18, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card relative overflow-hidden flex flex-col"
      style={{ cursor: "default" }}
    >
      {/* Top accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 + index * 0.18, ease: "easeOut" }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3, originX: 0,
          background: `linear-gradient(90deg, ${exp.color}, ${exp.color}00)`,
        }}
      />

      {/* Side glow */}
      <div style={{
        position: "absolute", left: 0, top: "20%", bottom: "20%", width: 2, borderRadius: 2,
        background: exp.color, opacity: 0.5, boxShadow: `0 0 12px ${exp.color}`,
      }} />

      <div className="p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col flex-1">
        {/* Level badge + type */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.5 + index * 0.18 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
            style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}40`, color: exp.color }}
          >
            {exp.icon}
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
              Level {exp.level}
            </span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium w-fit mt-0.5"
              style={{ background: `${exp.color}18`, color: exp.color }}
            >
              {exp.type}
            </span>
          </div>
          {/* Year chip */}
          <span className="ml-auto text-[10px] font-mono text-[var(--text-muted)] bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 rounded-md text-center leading-tight max-w-[80px] lg:max-w-[72px] xl:max-w-none">
            {exp.year}
          </span>
        </div>

        {/* Role & company */}
        <motion.h3
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 + index * 0.18 }}
          className="text-base lg:text-sm xl:text-lg font-bold text-white mb-0.5 leading-snug"
        >
          {exp.role}
        </motion.h3>
        <p className="text-sm font-semibold mb-4" style={{ color: exp.color }}>{exp.company}</p>

        {/* Description with expand */}
        <div className="flex-1">
          <AnimatePresence initial={false}>
            <motion.p
              key={expanded ? "full" : "short"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-[var(--text-muted)] leading-relaxed mb-4"
            >
              {expanded ? exp.desc : exp.desc.slice(0, 90) + (exp.desc.length > 90 ? "…" : "")}
            </motion.p>
          </AnimatePresence>
          {exp.desc.length > 90 && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-[11px] font-mono mb-4 transition-colors"
              style={{ color: exp.color, background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {expanded ? "↑ show less" : "↓ read more"}
            </button>
          )}
        </div>

        {/* Tech tags */}
        <div className="mb-1">
          <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">⊞ Equipped Tech</p>
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t, ti) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.18 + ti * 0.05 }}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                style={{ color: exp.color, borderColor: `${exp.color}30`, background: `${exp.color}08` }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        <XPBar color={exp.color} delay={0.8 + index * 0.2} isInView={isInView} />
      </div>
    </motion.div>
  );
}

// ─── ROOT COMPONENT ──────────────────────────
export default function ExperienceJourney() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      id="Experience"
      ref={sectionRef}
      className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16 relative"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.15em" } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-label"
          >
            // Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3"
          >
            Experience{" "}
            <span className="gradient-text">Quest</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            My career path visualized as a space journey. Each crystal represents a milestone.
          </motion.p>
        </motion.div>

        {/* ── 3D Scene (hidden on very small screens to save perf) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.25 }}
          className="hidden sm:block relative w-full rounded-2xl overflow-hidden glass-card mb-10 sm:mb-14"
          style={{ height: "clamp(200px, 28vw, 340px)" }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
            <Suspense fallback={null}>
              <ExperienceScene />
            </Suspense>
          </Canvas>

          {/* Crystal label overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {experience.map((exp, i) => {
              const positions = [
                "left-[2%] top-[10%]",
                "left-[26%] bottom-[8%]",
                "left-[56%] top-[10%]",
                "right-[2%] bottom-[8%]",
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className={`absolute ${positions[i]}`}
                >
                  <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2">
                    <span className="text-[10px] sm:text-xs font-mono font-semibold" style={{ color: exp.color }}>
                      ◆ {exp.role}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.5) 100%)" }} />
        </motion.div>

        {/* ── Experience Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 items-start"
        >
          {experience.map((exp, i) => (
            <ExpCard key={i} exp={exp} index={i} isInView={isInView} />
          ))}
        </motion.div>

        {/* ── Timeline connector (desktop) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="hidden lg:flex items-center justify-center gap-0 mt-10"
        >
          {experience.map((exp, i) => (
            <div key={i} className="flex items-center">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: "spring", delay: 1.3 + i * 0.15 }}
                style={{ width: 12, height: 12, borderRadius: "50%", background: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
              />
              {/* Line */}
              {i < experience.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.45 + i * 0.15, ease: "easeOut" }}
                  style={{
                    width: "clamp(60px, 12vw, 160px)", height: 2, originX: 0,
                    background: `linear-gradient(90deg, ${exp.color}, ${experience[i + 1].color})`,
                    opacity: 0.4,
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
