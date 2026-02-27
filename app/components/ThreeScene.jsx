"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles({ count = 80 }) {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 60;
            const speed = 0.002 + Math.random() * 0.006;
            const xFactor = -30 + Math.random() * 60;
            const yFactor = -15 + Math.random() * 30;
            const zFactor = -15 + Math.random() * 30;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed;
            const a = Math.cos(t) + Math.sin(t * 1 / 10);
            const b = Math.sin(t) + Math.cos(t * 2 / 10);
            const s = Math.max(0.4, Math.cos(t));

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.setScalar(s * 0.15);
            dummy.rotation.set(t * 0.5, t * 0.3, t * 0.2);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#6366f1"
                transparent
                opacity={0.15}
                roughness={0.7}
                metalness={0.3}
            />
        </instancedMesh>
    );
}

function GlowingSphere() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.5} position={[0, 0, 0]}>
                <icosahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    color="#4f46e5"
                    transparent
                    opacity={0.08}
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

function GradientRings() {
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.2;
            ring1.current.rotation.z = t * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.y = t * 0.15;
            ring2.current.rotation.x = t * 0.08;
        }
        if (ring3.current) {
            ring3.current.rotation.z = t * 0.12;
            ring3.current.rotation.y = t * 0.06;
        }
    });

    return (
        <>
            <mesh ref={ring1} position={[0, 0, 0]}>
                <torusGeometry args={[4, 0.02, 16, 100]} />
                <meshStandardMaterial color="#818cf8" transparent opacity={0.3} />
            </mesh>
            <mesh ref={ring2} position={[0, 0, 0]}>
                <torusGeometry args={[5, 0.015, 16, 100]} />
                <meshStandardMaterial color="#a78bfa" transparent opacity={0.2} />
            </mesh>
            <mesh ref={ring3} position={[0, 0, 0]}>
                <torusGeometry args={[6, 0.01, 16, 100]} />
                <meshStandardMaterial color="#c4b5fd" transparent opacity={0.15} />
            </mesh>
        </>
    );
}

export default function ThreeScene() {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={0.6} color="#6366f1" />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
                    <FloatingParticles />
                    <GlowingSphere />
                    <GradientRings />
                </Suspense>
            </Canvas>
        </div>
    );
}
