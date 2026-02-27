"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Text } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const experience = [
    {
        year: "2023 — 2025",
        role: "Software Engineer",
        company: "Apps Team Technologies",
        desc: "Leading frontend development of client-facing React.js applications. Architecting component systems, implementing responsive designs, and optimizing web performance.",
        tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
        type: "Full-time",
        color: "#6366f1",
    },
    {
        year: "2023",
        role: "Software Engineer Intern",
        company: "Apps Team Technologies",
        desc: "Completed a 3-month internship in .NET, where I worked on backend development, built RESTful APIs, handled database operations, and gained practical experience.",
        tech: [".NET", "C#", "ASP.NET", "SQL Server", "REST APIs"],
        type: "Internship",
        color: "#8b5cf6",
    },
];

// Floating checkpoint crystal
function CheckpointCrystal({ position, color, index }) {
    const meshRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.5 + index * 2;
            meshRef.current.rotation.x = Math.sin(t * 0.3 + index) * 0.3;
            meshRef.current.position.y =
                position[1] + Math.sin(t * 0.8 + index * 1.5) * 0.3;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.8 + index * 3;
            ringRef.current.rotation.x = Math.PI * 0.5;
        }
    });

    return (
        <group position={position}>
            {/* Crystal */}
            <mesh ref={meshRef}>
                <octahedronGeometry args={[0.6, 0]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Spinning ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[1.0, 0.02, 16, 64]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Glow */}
            <mesh scale={2}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

// Particle trail between checkpoints
function ParticleTrail({ start, end, color, count = 30 }) {
    const pointsRef = useRef();

    const particles = useMemo(() => {
        const pos = [];
        for (let i = 0; i < count; i++) {
            const t = i / count;
            pos.push(
                THREE.MathUtils.lerp(start[0], end[0], t) + (Math.random() - 0.5) * 0.3,
                THREE.MathUtils.lerp(start[1], end[1], t) + (Math.random() - 0.5) * 0.3,
                THREE.MathUtils.lerp(start[2], end[2], t) + (Math.random() - 0.5) * 0.3
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
                positions[i * 3] =
                    THREE.MathUtils.lerp(start[0], end[0], baseT) +
                    Math.sin(t * 2 + i * 0.5) * 0.15;
                positions[i * 3 + 1] =
                    THREE.MathUtils.lerp(start[1], end[1], baseT) +
                    Math.cos(t * 1.5 + i * 0.3) * 0.15;
                positions[i * 3 + 2] =
                    THREE.MathUtils.lerp(start[2], end[2], baseT) +
                    Math.sin(t + i * 0.7) * 0.1;
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color={color}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Background nebula
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
                <MeshDistortMaterial
                    color="#4f46e5"
                    transparent
                    opacity={0.03}
                    distort={0.6}
                    speed={1.5}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

// Floating space debris
function SpaceDebris({ count = 50 }) {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                ],
                speed: 0.1 + Math.random() * 0.3,
                rotationSpeed: Math.random() * 0.02,
                scale: 0.02 + Math.random() * 0.06,
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        particles.forEach((p, i) => {
            dummy.position.set(
                p.position[0] + Math.sin(t * p.speed + i) * 0.5,
                p.position[1] + Math.cos(t * p.speed * 0.7 + i) * 0.5,
                p.position[2]
            );
            dummy.rotation.set(t * p.rotationSpeed, t * p.rotationSpeed * 0.5, 0);
            dummy.scale.setScalar(p.scale);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#818cf8"
                transparent
                opacity={0.3}
                metalness={0.5}
                roughness={0.5}
            />
        </instancedMesh>
    );
}

function ExperienceScene() {
    const checkpoints = [
        [-3, 1.5, 0],
        [3, -1.5, 0],
    ];

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#6366f1" />
            <pointLight position={[-5, -3, 3]} intensity={0.4} color="#8b5cf6" />
            <pointLight position={[0, 3, -5]} intensity={0.3} color="#a78bfa" />

            {experience.map((exp, i) => (
                <CheckpointCrystal
                    key={i}
                    position={checkpoints[i]}
                    color={exp.color}
                    index={i}
                />
            ))}

            {/* Trail between checkpoints */}
            <ParticleTrail
                start={checkpoints[0]}
                end={checkpoints[1]}
                color="#6366f1"
            />

            <Nebula />
            <SpaceDebris />
        </>
    );
}

export default function ExperienceJourney() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            id="Experience"
            className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16 relative"
            ref={sectionRef}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <span className="section-label">// Journey</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                        Experience{" "}
                        <span className="gradient-text">Quest</span>
                    </h2>
                    <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-sm sm:text-base">
                        My career path visualized as a space journey. Each crystal represents a milestone.
                    </p>
                </motion.div>

                {/* 3D Scene */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden glass-card mb-8 sm:mb-12"
                    style={{ minHeight: "300px" }}
                >
                    <Canvas
                        camera={{ position: [0, 0, 8], fov: 50 }}
                        dpr={[1, 1.5]}
                        gl={{ antialias: true, alpha: true }}
                        style={{ background: "transparent" }}
                    >
                        <Suspense fallback={null}>
                            <ExperienceScene />
                        </Suspense>
                    </Canvas>

                    {/* Crystal labels overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Left crystal label */}
                        <div className="absolute left-[15%] sm:left-[20%] top-[15%] sm:top-[20%]">
                            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2">
                                <span className="text-[10px] sm:text-xs font-mono text-[var(--primary-light)]">
                                    ◆ {experience[0].role}
                                </span>
                            </div>
                        </div>
                        {/* Right crystal label */}
                        <div className="absolute right-[15%] sm:right-[20%] bottom-[15%] sm:bottom-[20%]">
                            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2">
                                <span className="text-[10px] sm:text-xs font-mono text-[var(--accent-light)]">
                                    ◆ {experience[1].role}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Experience Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {experience.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, rotateY: -10 }}
                            animate={
                                isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}
                            }
                            transition={{ duration: 0.7, delay: 0.4 + i * 0.2 }}
                            className="glass-card p-6 sm:p-8 relative overflow-hidden group"
                        >
                            {/* Glowing accent bar */}
                            <div
                                className="absolute top-0 left-0 w-full h-1 opacity-60"
                                style={{
                                    background: `linear-gradient(90deg, ${exp.color}, transparent)`,
                                }}
                            />

                            {/* Level indicator */}
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                                    style={{
                                        background: `rgba(${exp.color === "#6366f1" ? "99,102,241" : "139,92,246"}, 0.2)`,
                                        border: `1px solid ${exp.color}40`,
                                        color: exp.color,
                                    }}
                                >
                                    {i === 0 ? "⚡" : "🚀"}
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-[var(--text-muted)]">
                                        Level {experience.length - i}
                                    </span>
                                    <span
                                        className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium"
                                        style={{
                                            background: `${exp.color}20`,
                                            color: exp.color,
                                        }}
                                    >
                                        {exp.type}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                                {exp.role}
                            </h3>
                            <p className="text-sm font-medium mb-1" style={{ color: exp.color }}>
                                {exp.company}
                            </p>
                            <p className="text-xs font-mono text-[var(--text-muted)] mb-4">
                                {exp.year}
                            </p>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                                {exp.desc}
                            </p>

                            {/* Tech Stack as "Equipped Items" */}
                            <div>
                                <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                                    ⊞ Equipped Tech
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-md border"
                                            style={{
                                                color: exp.color,
                                                borderColor: `${exp.color}30`,
                                                background: `${exp.color}08`,
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* XP bar */}
                            <div className="mt-5">
                                <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                                    <span>XP Progress</span>
                                    <span>{i === 0 ? "MAX" : "Complete"}</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-[rgba(255,255,255,0.05)]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: "100%" } : {}}
                                        transition={{ duration: 1.5, delay: 0.8 + i * 0.3 }}
                                        className="h-full rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${exp.color}, ${exp.color}80)`,
                                            boxShadow: `0 0 10px ${exp.color}40`,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
