"use client";
import { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";

const allSkills = [
    // Frontend Core
    { name: "React.js", category: "frontend", size: 1.4, color: "#61dafb" },
    { name: "Next.js", category: "frontend", size: 1.3, color: "#ffffff" },
    { name: "TypeScript", category: "frontend", size: 1.2, color: "#3178c6" },
    { name: "JavaScript", category: "frontend", size: 1.1, color: "#f7df1e" },
    { name: "HTML5", category: "frontend", size: 0.9, color: "#e34f26" },
    { name: "CSS3", category: "frontend", size: 0.9, color: "#264de4" },
    // Styling
    { name: "Tailwind", category: "styling", size: 1.1, color: "#06b6d4" },
    { name: "Sass", category: "styling", size: 0.8, color: "#cc6699" },
    { name: "Framer Motion", category: "styling", size: 0.9, color: "#a855f7" },
    { name: "Figma", category: "styling", size: 0.8, color: "#f24e1e" },
    // Backend
    { name: "Node.js", category: "backend", size: 1.1, color: "#68a063" },
    { name: "Express", category: "backend", size: 0.9, color: "#888888" },
    { name: "MongoDB", category: "backend", size: 1.0, color: "#47a248" },
    { name: "REST APIs", category: "backend", size: 0.8, color: "#818cf8" },
    // Ecosystem
    { name: "Redux", category: "ecosystem", size: 0.9, color: "#764abc" },
    { name: "Three.js", category: "ecosystem", size: 1.0, color: "#049ef4" },
    { name: "Git", category: "ecosystem", size: 0.8, color: "#f05032" },
    { name: "Vite", category: "ecosystem", size: 0.8, color: "#646cff" },
    { name: "Vercel", category: "ecosystem", size: 0.7, color: "#ffffff" },
    { name: "Webpack", category: "ecosystem", size: 0.7, color: "#8dd6f9" },
];

// Position skills in a sphere-like constellation
function getSkillPositions(skills) {
    const positions = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const count = skills.length;

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        const spread = 6;

        positions.push({
            x: Math.cos(theta) * radius * spread,
            y: y * spread * 0.6,
            z: Math.sin(theta) * radius * spread,
        });
    }
    return positions;
}

function SkillNode({ skill, position, index, hoveredSkill, setHoveredSkill }) {
    const meshRef = useRef();
    const glowRef = useRef();
    const isHovered = hoveredSkill === index;

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            // Gentle floating
            meshRef.current.position.y =
                position.y + Math.sin(t * 0.5 + index * 0.7) * 0.15;
            meshRef.current.rotation.x = t * 0.3 + index;
            meshRef.current.rotation.y = t * 0.2 + index * 0.5;

            // Scale on hover
            const targetScale = isHovered ? skill.size * 1.5 : skill.size;
            meshRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.1
            );
        }
        if (glowRef.current) {
            glowRef.current.material.opacity = isHovered
                ? 0.4
                : 0.1 + Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.05;
        }
    });

    return (
        <group position={[position.x, position.y, position.z]}>
            {/* Core geometry */}
            <mesh
                ref={meshRef}
                onPointerEnter={() => setHoveredSkill(index)}
                onPointerLeave={() => setHoveredSkill(null)}
            >
                <dodecahedronGeometry args={[0.3, 0]} />
                <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={isHovered ? 0.8 : 0.3}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={isHovered ? 1 : 0.85}
                />
            </mesh>

            {/* Glow sphere */}
            <mesh ref={glowRef} scale={skill.size * 1.2}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial
                    color={skill.color}
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, -0.6, 0]}
                fontSize={isHovered ? 0.32 : 0.22}
                color={isHovered ? "#ffffff" : "#94a3b8"}
                anchorX="center"
                anchorY="top"
                outlineWidth={0}
            >
                {skill.name}
            </Text>
        </group>
    );
}

function ConnectionLines({ skills, positions }) {
    const linesRef = useRef();

    const lineGeometry = useMemo(() => {
        const points = [];
        // Connect skills within same category
        for (let i = 0; i < skills.length; i++) {
            for (let j = i + 1; j < skills.length; j++) {
                if (skills[i].category === skills[j].category) {
                    points.push(
                        new THREE.Vector3(positions[i].x, positions[i].y, positions[i].z),
                        new THREE.Vector3(positions[j].x, positions[j].y, positions[j].z)
                    );
                }
            }
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [skills, positions]);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.material.opacity =
                0.06 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.02;
        }
    });

    return (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
            <lineBasicMaterial color="#6366f1" transparent opacity={0.08} />
        </lineSegments>
    );
}

function StarField({ count = 200 }) {
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            p.push(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
        }
        return new Float32Array(p);
    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#818cf8"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
}

function SkillsScene({ hoveredSkill, setHoveredSkill }) {
    const positions = useMemo(() => getSkillPositions(allSkills), []);
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y =
                state.clock.getElapsedTime() * 0.03;
        }
    });

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#6366f1" />
            <pointLight position={[-10, -5, -10]} intensity={0.4} color="#8b5cf6" />
            <pointLight position={[0, 10, 0]} intensity={0.3} color="#a78bfa" />

            <group ref={groupRef}>
                {allSkills.map((skill, i) => (
                    <SkillNode
                        key={skill.name}
                        skill={skill}
                        position={positions[i]}
                        index={i}
                        hoveredSkill={hoveredSkill}
                        setHoveredSkill={setHoveredSkill}
                    />
                ))}
                <ConnectionLines skills={allSkills} positions={positions} />
            </group>

            <StarField />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.3}
                maxPolarAngle={Math.PI * 0.7}
                minPolarAngle={Math.PI * 0.3}
            />
        </>
    );
}

export default function SkillsGalaxy() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const activeSkill = hoveredSkill !== null ? allSkills[hoveredSkill] : null;

    const categoryColors = {
        frontend: "#6366f1",
        styling: "#a855f7",
        backend: "#22c55e",
        ecosystem: "#06b6d4",
    };

    const categoryLabels = {
        frontend: "Frontend Core",
        styling: "Styling & UI",
        backend: "Backend & Tools",
        ecosystem: "Ecosystem",
    };

    return (
        <section
            id="Skills"
            className="w-full py-16 sm:py-24 lg:py-32 px-5 sm:px-8 md:px-16 relative"
            ref={sectionRef}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-4 sm:mb-8"
                >
                    <span className="section-label">// Tech Stack</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                        Skills{" "}
                        <span className="gradient-text">Galaxy</span>
                    </h2>
                    <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-sm sm:text-base">
                        Explore my tech constellation. Drag to rotate, hover to discover.
                    </p>
                </motion.div>

                {/* 3D Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden glass-card"
                    style={{ minHeight: "400px" }}
                >
                    <Canvas
                        camera={{ position: [0, 0, 12], fov: 60 }}
                        dpr={[1, 1.5]}
                        gl={{ antialias: true, alpha: true }}
                        style={{ background: "transparent" }}
                    >
                        <Suspense fallback={null}>
                            <SkillsScene
                                hoveredSkill={hoveredSkill}
                                setHoveredSkill={setHoveredSkill}
                            />
                        </Suspense>
                    </Canvas>

                    {/* Hover Info Overlay */}
                    {activeSkill && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-6 py-3 pointer-events-none">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: activeSkill.color }}
                                />
                                <span className="text-white font-bold text-sm sm:text-base">
                                    {activeSkill.name}
                                </span>
                                <span className="text-xs text-[var(--text-muted)] font-mono">
                                    {categoryLabels[activeSkill.category]}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Instruction hint */}
                    <div className="absolute top-4 right-4 text-xs font-mono text-[var(--text-muted)] opacity-50">
                        drag to explore ↻
                    </div>
                </motion.div>

                {/* Category Legend */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
                >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: categoryColors[key] }}
                            />
                            <span className="text-xs sm:text-sm text-[var(--text-muted)]">
                                {label}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
