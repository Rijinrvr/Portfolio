"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ReactiveParticles({ count = 150, mouse }) {
    const mesh = useRef();
    const lightRef = useRef();

    const particles = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = [];
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
            vel.push({
                vx: (Math.random() - 0.5) * 0.01,
                vy: (Math.random() - 0.5) * 0.01,
                vz: (Math.random() - 0.5) * 0.005,
                baseX: pos[i * 3],
                baseY: pos[i * 3 + 1],
                baseZ: pos[i * 3 + 2],
            });
        }
        return { pos, vel };
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        const positions = mesh.current.geometry.attributes.position.array;
        const t = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const v = particles.vel[i];
            // Gentle drift with sinusoidal motion
            positions[i * 3] =
                v.baseX +
                Math.sin(t * 0.3 + i * 0.1) * 1.5 +
                mouse.current.x * 2;
            positions[i * 3 + 1] =
                v.baseY +
                Math.cos(t * 0.2 + i * 0.15) * 1.0 +
                mouse.current.y * 2;
            positions[i * 3 + 2] =
                v.baseZ + Math.sin(t * 0.1 + i * 0.2) * 0.5;
        }
        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Move light with mouse
        if (lightRef.current) {
            lightRef.current.position.x = mouse.current.x * 10;
            lightRef.current.position.y = mouse.current.y * 10;
        }
    });

    return (
        <>
            <pointLight
                ref={lightRef}
                position={[0, 0, 5]}
                intensity={0.3}
                color="#6366f1"
                distance={20}
            />
            <points ref={mesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={particles.pos}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    color="#6366f1"
                    transparent
                    opacity={0.4}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    );
}

function FloatingOrbs() {
    const orbs = useRef([]);

    const orbData = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 40,
                -5 - Math.random() * 10,
            ],
            color: ["#6366f1", "#8b5cf6", "#a78bfa", "#818cf8", "#4f46e5"][i],
            speed: 0.2 + Math.random() * 0.3,
            size: 0.5 + Math.random() * 1.5,
        }));
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        orbs.current.forEach((orb, i) => {
            if (!orb) return;
            const data = orbData[i];
            orb.position.y =
                data.position[1] + Math.sin(t * data.speed + i * 2) * 3;
            orb.position.x =
                data.position[0] + Math.cos(t * data.speed * 0.5 + i) * 2;
            orb.material.opacity =
                0.03 + Math.sin(t * 0.5 + i * 1.5) * 0.015;
        });
    });

    return (
        <>
            {orbData.map((orb, i) => (
                <mesh
                    key={i}
                    ref={(el) => (orbs.current[i] = el)}
                    position={orb.position}
                    scale={orb.size}
                >
                    <sphereGeometry args={[1, 16, 16]} />
                    <meshBasicMaterial
                        color={orb.color}
                        transparent
                        opacity={0.03}
                    />
                </mesh>
            ))}
        </>
    );
}

export default function GlobalParticles() {
    const mouse = useRef({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!mounted) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                dpr={[1, 1]}
                gl={{ antialias: false, alpha: true }}
                style={{ background: "transparent", pointerEvents: "none" }}
                eventPrefix="offset"
            >
                <ReactiveParticles mouse={mouse} />
                <FloatingOrbs />
            </Canvas>
        </div>
    );
}
