"use client";
// Shared speed value written by VehicleController, read by HoverCraft each frame
const vehicleSpeedRef = { current: 0 };
import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
//  SKILL DATA
// ─────────────────────────────────────────────
const SKILLS = [
  {
    id: 0, name: "React.js", category: "frontend", color: "#61dafb",
    glowColor: "#61dafb", size: 1.1,
    desc: "Building component-driven UIs with hooks, context, and performance patterns.",
    years: "3+ years", icon: "⚛️",
    position: [14, 1, -6],
  },
  {
    id: 1, name: "Next.js", category: "frontend", color: "#ffffff",
    glowColor: "#a3a3a3", size: 1.0,
    desc: "SSR, SSG, App Router, API routes, and Vercel deployments.",
    years: "2+ years", icon: "▲",
    position: [6, -2, -18],
  },
  {
    id: 2, name: "TypeScript", category: "frontend", color: "#3178c6",
    glowColor: "#3178c6", size: 0.95,
    desc: "Type-safe code, generics, utility types, and strict mode workflows.",
    years: "2+ years", icon: "📘",
    position: [-10, 2, -14],
  },
  {
    id: 3, name: "JavaScript", category: "frontend", color: "#f7df1e",
    glowColor: "#f7df1e", size: 0.9,
    desc: "ES2023+, async/await, closures, prototype chain, event loop.",
    years: "4+ years", icon: "🟨",
    position: [-16, -1, 0],
  },
  {
    id: 4, name: "Three.js", category: "ecosystem", color: "#049ef4",
    glowColor: "#049ef4", size: 0.85,
    desc: "3D scenes, shaders, particle systems, and WebGL rendering.",
    years: "1+ year", icon: "🔷",
    position: [-10, 2, 12],
  },
  {
    id: 5, name: "Tailwind CSS", category: "styling", color: "#06b6d4",
    glowColor: "#06b6d4", size: 0.85,
    desc: "Utility-first styling, responsive design, and custom design systems.",
    years: "2+ years", icon: "🌊",
    position: [4, -2, 14],
  },
  {
    id: 6, name: "Node.js", category: "backend", color: "#68a063",
    glowColor: "#68a063", size: 0.9,
    desc: "REST APIs, middleware, authentication, and server-side logic.",
    years: "2+ years", icon: "🟢",
    position: [14, 1, 6],
  },
  {
    id: 7, name: "MongoDB", category: "backend", color: "#47a248",
    glowColor: "#47a248", size: 0.8,
    desc: "Schema design, aggregation pipelines, indexing, and Mongoose ODM.",
    years: "2+ years", icon: "🍃",
    position: [8, 2, -4],
  },
];

const CATEGORY_COLORS = {
  frontend: "#6366f1",
  styling: "#06b6d4",
  backend: "#22c55e",
  ecosystem: "#049ef4",
};

const ARRIVAL_RADIUS = 3.2;

// ─────────────────────────────────────────────
//  MOBILE SKILL GRID  (replaces 3D on small screens)
// ─────────────────────────────────────────────
function MobileSkillGrid({ visitedSkills, activeSkillId, onSkillSelect }) {
  const levelDots = (years) =>
    years.startsWith("4") ? 5 : years.startsWith("3") ? 4 : years.startsWith("2") ? 3 : 2;

  return (
    <div style={{ padding: "0 4px" }}>
      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 16, padding: "8px 14px",
          background: "rgba(10,10,20,0.7)", borderRadius: 50,
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        <span style={{ color: "#818cf8", fontFamily: "monospace", fontSize: "0.7rem", whiteSpace: "nowrap" }}>
          {visitedSkills.size}/{SKILLS.length} tapped
        </span>
        <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${Math.round((visitedSkills.size / SKILLS.length) * 100)}%` }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)" }}
          />
        </div>
        <span style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "0.7rem" }}>
          {Math.round((visitedSkills.size / SKILLS.length) * 100)}%
        </span>
      </motion.div>

      {/* 2-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {SKILLS.map((skill, i) => {
          const isActive = activeSkillId === skill.id;
          const isVisited = visitedSkills.has(skill.id);
          return (
            <motion.button
              key={skill.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 220, damping: 18 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSkillSelect(skill.id)}
              style={{
                position: "relative",
                background: isActive
                  ? `linear-gradient(135deg, ${skill.color}22, ${skill.color}08)`
                  : "rgba(13,13,26,0.8)",
                border: `1px solid ${isActive ? skill.color + "60" : isVisited ? skill.color + "30" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16,
                padding: "14px 12px",
                cursor: "pointer",
                textAlign: "left",
                overflow: "hidden",
                boxShadow: isActive ? `0 0 20px ${skill.color}25` : "none",
                transition: "box-shadow 0.3s, border 0.3s",
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: isVisited || isActive
                  ? `linear-gradient(90deg, transparent, ${skill.color}, transparent)`
                  : "transparent",
                transition: "background 0.4s",
              }} />

              {/* Visited check */}
              {isVisited && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute", top: 8, right: 8,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#22c55e", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "0.6rem",
                  }}
                >✓</motion.div>
              )}

              <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{skill.icon}</div>
              <div style={{ color: isActive ? "#fff" : "#e2e8f0", fontWeight: 700, fontSize: "0.82rem", marginBottom: 2 }}>
                {skill.name}
              </div>
              <div style={{ color: CATEGORY_COLORS[skill.category], fontSize: "0.6rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                {skill.category}
              </div>
              {/* Dots */}
              <div style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map(d => (
                  <div key={d} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: d <= levelDots(skill.years) ? skill.color : "rgba(255,255,255,0.1)",
                    boxShadow: d <= levelDots(skill.years) ? `0 0 4px ${skill.color}` : "none",
                  }} />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active skill detail card */}
      <AnimatePresence mode="wait">
        {activeSkillId !== null && (() => {
          const skill = SKILLS.find(s => s.id === activeSkillId);
          if (!skill) return null;
          const dots = levelDots(skill.years);
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                marginTop: 14,
                background: "rgba(10,10,22,0.9)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${skill.color}40`,
                borderRadius: 18,
                padding: "18px 18px 16px",
                position: "relative", overflow: "hidden",
                boxShadow: `0 0 30px ${skill.color}20`,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${skill.color},transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: "1.8rem" }}>{skill.icon}</span>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{skill.name}</div>
                  <div style={{ color: skill.color, fontSize: "0.65rem", fontFamily: "monospace", textTransform: "uppercase" }}>{skill.category} · {skill.years}</div>
                </div>
                <button
                  onClick={() => onSkillSelect(null)}
                  style={{ marginLeft: "auto", background: "rgba(255,255,255,0.07)", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: "50%", width: 28, height: 28, fontSize: "1.1rem" }}
                >×</button>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>{skill.desc}</p>
              <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
                {[1,2,3,4,5].map(d => (
                  <div key={d} style={{ width: 10, height: 10, borderRadius: "50%", background: d <= dots ? skill.color : "rgba(255,255,255,0.1)", boxShadow: d <= dots ? `0 0 6px ${skill.color}` : "none" }} />
                ))}
                <span style={{ color: skill.color, fontSize: "0.75rem", fontWeight: 600, marginLeft: 6 }}>{skill.years}</span>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
//  HOVER VEHICLE  (visible 3-D mesh)
// ─────────────────────────────────────────────
function HoverCraft({ vehicleRef }) {
  const bodyRef = useRef();
  const glowRef = useRef();
  const engineL = useRef();
  const engineR = useRef();
  const smoothPitch = useRef(0);
  const smoothBank  = useRef(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const spd = Math.min(vehicleSpeedRef.current / 16, 1);
    const lateral = vehicleSpeedRef.lateral ?? 0;

    const bobAmp = 0.08 + spd * 0.05;
    if (bodyRef.current) {
      const targetBob = Math.sin(t * 1.2) * bobAmp;
      const targetPitch = -spd * 0.18;
      const targetBank = lateral * 0.25;
      smoothPitch.current = THREE.MathUtils.lerp(smoothPitch.current, targetPitch, 0.08);
      smoothBank.current  = THREE.MathUtils.lerp(smoothBank.current,  targetBank,  0.08);
      bodyRef.current.position.y = targetBob;
      bodyRef.current.rotation.x = smoothPitch.current;
      bodyRef.current.rotation.z = smoothBank.current;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = THREE.MathUtils.lerp(
        glowRef.current.material.opacity, 0.15 + spd * 0.25, 0.05
      );
    }
    const targetGlow = 0.5 + spd * 1.4;
    if (engineL.current) {
      engineL.current.material.emissiveIntensity = THREE.MathUtils.lerp(engineL.current.material.emissiveIntensity, targetGlow, 0.1);
    }
    if (engineR.current) {
      engineR.current.material.emissiveIntensity = THREE.MathUtils.lerp(engineR.current.material.emissiveIntensity, targetGlow, 0.1);
    }
  });

  return (
    <group ref={vehicleRef}>
      <group ref={bodyRef}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.2, 1.4]} />
          <meshStandardMaterial color="#dce8f5" emissive="#a8c8e8" emissiveIntensity={0.25} metalness={0.85} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0.18, 0.1]}>
          <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#00e5ff" metalness={0.2} roughness={0.05} transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.65, 0, -0.1]}>
          <boxGeometry args={[0.5, 0.06, 0.8]} />
          <meshStandardMaterial color="#00b4d8" emissive="#0096c7" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.65, 0, -0.1]}>
          <boxGeometry args={[0.5, 0.06, 0.8]} />
          <meshStandardMaterial color="#00b4d8" emissive="#0096c7" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={engineL} position={[0.6, -0.08, -0.55]}>
          <cylinderGeometry args={[0.1, 0.14, 0.4, 10]} />
          <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={0.8} metalness={0.5} roughness={0.15} />
        </mesh>
        <mesh ref={engineR} position={[-0.6, -0.08, -0.55]}>
          <cylinderGeometry args={[0.1, 0.14, 0.4, 10]} />
          <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={0.8} metalness={0.5} roughness={0.15} />
        </mesh>
      </group>
      <mesh ref={glowRef} position={[0, -0.22, 0]}>
        <planeGeometry args={[1.1, 1.6]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────
//  SKILL PLANET
// ─────────────────────────────────────────────
function SkillPlanet({ skill, isActive, isVisited }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const glowRef = useRef();
  const orbitRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.5 + skill.id) * 0.1;
    }
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.3;
    if (glowRef.current) {
      const pulse = 0.15 + Math.sin(t * 2 + skill.id) * 0.08;
      glowRef.current.material.opacity = isActive ? 0.45 : isVisited ? 0.22 : pulse;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.7;
      orbitRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={skill.position}>
      <mesh ref={glowRef} scale={skill.size * 2.8}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={skill.glowColor} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      <mesh ref={meshRef} scale={skill.size * (isActive ? 1.25 : 1)}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={isActive ? 0.6 : isVisited ? 0.3 : 0.15} metalness={0.6} roughness={0.3} />
      </mesh>
      {skill.size > 0.9 && (
        <mesh ref={ringRef} rotation={[Math.PI * 0.15, 0, 0]}>
          <torusGeometry args={[skill.size * 1.1, 0.04, 8, 48]} />
          <meshBasicMaterial color={skill.color} transparent opacity={isVisited ? 0.5 : 0.2} />
        </mesh>
      )}
      <group ref={orbitRef}>
        <mesh position={[skill.size * 1.4, 0, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.6} />
        </mesh>
        <mesh position={[-skill.size * 1.3, 0.15, 0.1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.4} />
        </mesh>
      </group>
      {isVisited && (
        <mesh position={[0, skill.size * 1.4, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      )}
      <Text position={[0, skill.size * -1.2, 0]} fontSize={0.28} color={isActive ? "#ffffff" : isVisited ? "#86efac" : "#94a3b8"} anchorX="center" anchorY="top" outlineWidth={0.025} outlineColor="#000000">
        {skill.name}
      </Text>
    </group>
  );
}

// ─────────────────────────────────────────────
//  NEBULA CLOUD
// ─────────────────────────────────────────────
function NebulaCloud({ position, color, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      ref.current.material.opacity = 0.07 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[3.5, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.07} side={THREE.BackSide} />
    </mesh>
  );
}

// ─────────────────────────────────────────────
//  GALAXY PATHS
// ─────────────────────────────────────────────
function GalaxyPaths({ skills }) {
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i < skills.length - 1; i++) {
      const a = skills[i].position;
      const b = skills[i + 1].position;
      const mid = [(a[0] + b[0]) / 2 + (Math.random() - 0.5) * 4, (a[1] + b[1]) / 2 + 2, (a[2] + b[2]) / 2 + (Math.random() - 0.5) * 4];
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), new THREE.Vector3(...mid), new THREE.Vector3(...b));
      pts.push(...curve.getPoints(20));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [skills]);

  const matRef = useRef();
  useFrame((state) => {
    if (matRef.current) matRef.current.opacity = 0.08 + Math.sin(state.clock.getElapsedTime()) * 0.03;
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial ref={matRef} color="#6366f1" transparent opacity={0.1} />
    </line>
  );
}

// ─────────────────────────────────────────────
//  VEHICLE CONTROLLER
// ─────────────────────────────────────────────
function VehicleController({ vehicleRef, onSkillProximity, skills }) {
  const { camera } = useThree();
  const keysRef = useRef({});
  const velRef = useRef(new THREE.Vector3());
  const targetYawRef = useRef(0);
  const currentYawRef = useRef(0);
  const posRef = useRef(new THREE.Vector3(0, 0, 4));
  const clickTargetRef = useRef(null);
  const lastVisitRef = useRef(-1);
  const smoothYRef = useRef(0.3);

  useEffect(() => {
    const down = (e) => { keysRef.current[e.code] = true; };
    const up   = (e) => { keysRef.current[e.code] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useFrame((state, delta) => {
    const keys = keysRef.current;
    const vel  = velRef.current;
    const pos  = posRef.current;
    const spd  = 14;
    const drag = 0.92;
    const dt   = Math.min(delta, 0.05);

    let inputX = 0, inputZ = 0;
    if (keys["ArrowUp"]    || keys["KeyW"]) inputZ -= 1;
    if (keys["ArrowDown"]  || keys["KeyS"]) inputZ += 1;
    if (keys["ArrowLeft"]  || keys["KeyA"]) inputX -= 1;
    if (keys["ArrowRight"] || keys["KeyD"]) inputX += 1;

    if (clickTargetRef.current) {
      const dir  = clickTargetRef.current.clone().sub(pos);
      const dist = dir.length();
      if (dist > 0.8) {
        dir.normalize();
        const boost = Math.min(dist / 6, 2.0);
        inputX = dir.x * boost;
        inputZ = dir.z * boost;
      } else {
        clickTargetRef.current = null;
      }
    }

    if (inputX !== 0 || inputZ !== 0) {
      const len = Math.sqrt(inputX * inputX + inputZ * inputZ);
      vel.x += (inputX / len) * spd * dt;
      vel.z += (inputZ / len) * spd * dt;
      targetYawRef.current = Math.atan2(inputX, inputZ);
    }

    vel.multiplyScalar(drag);
    vel.clampLength(0, 16);
    pos.add(vel.clone().multiplyScalar(dt));
    pos.x = THREE.MathUtils.clamp(pos.x, -22, 22);
    pos.z = THREE.MathUtils.clamp(pos.z, -24, 24);

    currentYawRef.current = THREE.MathUtils.lerp(currentYawRef.current, targetYawRef.current, 0.12);

    const speed = vel.length();
    vehicleSpeedRef.current = speed;
    const yaw = currentYawRef.current;
    const fwdX = Math.sin(yaw), fwdZ = Math.cos(yaw);
    const rightX = fwdZ, rightZ = -fwdX;
    vehicleSpeedRef.lateral = vel.x * rightX + vel.z * rightZ;

    if (vehicleRef.current) {
      vehicleRef.current.position.copy(pos);
      smoothYRef.current = THREE.MathUtils.lerp(smoothYRef.current, 0.3, 0.08);
      vehicleRef.current.position.y = smoothYRef.current;
      vehicleRef.current.rotation.y = currentYawRef.current + Math.PI;
    }

    const camDist = 6 + Math.min(speed / 16, 1) * 2;
    const behind = new THREE.Vector3(
      pos.x - Math.sin(currentYawRef.current) * camDist,
      pos.y + 4.5,
      pos.z - Math.cos(currentYawRef.current) * camDist
    );
    camera.position.lerp(behind, 0.04);
    camera.lookAt(pos.x, pos.y + 0.5, pos.z);

    skills.forEach((skill) => {
      const sp   = new THREE.Vector3(...skill.position);
      const dist = pos.distanceTo(sp);
      if (dist < ARRIVAL_RADIUS && lastVisitRef.current !== skill.id) {
        lastVisitRef.current = skill.id;
        onSkillProximity(skill.id);
      }
    });
  });

  VehicleController._setTarget = (x, z) => {
    clickTargetRef.current = new THREE.Vector3(x, 0, z);
  };

  return null;
}

// ─────────────────────────────────────────────
//  3D SCENE
// ─────────────────────────────────────────────
function GalaxyScene({ visitedSkills, activeSkillId, onSkillReach }) {
  const vehicleRef = useRef();
  const handleProximity = useCallback((id) => { onSkillReach(id); }, [onSkillReach]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 20, 0]} intensity={0.5} color="#6366f1" />
      <pointLight position={[20, -5, -10]} intensity={0.4} color="#8b5cf6" />
      <pointLight position={[-20, 5, 10]} intensity={0.3} color="#06b6d4" />
      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.2} fade speed={0.5} />
      <NebulaCloud position={[-5, -4, -12]} color="#6366f1" scale={1.4} />
      <NebulaCloud position={[12, 3, 5]}    color="#8b5cf6" scale={1.1} />
      <NebulaCloud position={[-14, 2, 8]}   color="#06b6d4" scale={1.3} />
      <NebulaCloud position={[5, -3, -20]}  color="#3178c6" scale={1.0} />
      <GalaxyPaths skills={SKILLS} />
      {SKILLS.map((skill) => (
        <SkillPlanet key={skill.id} skill={skill} isActive={activeSkillId === skill.id} isVisited={visitedSkills.has(skill.id)} />
      ))}
      <HoverCraft vehicleRef={vehicleRef} />
      <VehicleController vehicleRef={vehicleRef} onSkillProximity={handleProximity} skills={SKILLS} />
    </>
  );
}

// ─────────────────────────────────────────────
//  CLICK PLANE (desktop)
// ─────────────────────────────────────────────
function PlanetClickPlane() {
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    if (VehicleController._setTarget) VehicleController._setTarget(e.point.x, e.point.z);
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} onClick={handleClick}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

// ─────────────────────────────────────────────
//  DESKTOP SKILL CARD POPUP
// ─────────────────────────────────────────────
function SkillCard({ skill, onClose }) {
  if (!skill) return null;
  const levelDots = skill.years.startsWith("4") ? 5 : skill.years.startsWith("3") ? 4 : skill.years.startsWith("2") ? 3 : 2;

  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="pointer-events-auto"
      style={{
        background: "rgba(10,10,20,0.88)", backdropFilter: "blur(24px)",
        border: `1px solid ${skill.color}40`, borderRadius: 20,
        padding: "20px 24px", minWidth: 260, maxWidth: 320,
        boxShadow: `0 0 30px ${skill.color}30, 0 20px 60px rgba(0,0,0,0.6)`,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${skill.color},transparent)` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ fontSize: "2rem", lineHeight: 1 }}>{skill.icon}</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{skill.name}</div>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: CATEGORY_COLORS[skill.category], fontFamily: "monospace", marginTop: 2 }}>{skill.category}</div>
        </div>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.08)", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: "50%", width: 26, height: 26, fontSize: "1rem" }}>×</button>
      </div>
      <p style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 14 }}>{skill.desc}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "#64748b", fontSize: "0.72rem", fontFamily: "monospace" }}>EXPERIENCE</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[1,2,3,4,5].map(d => (
            <div key={d} style={{ width: 10, height: 10, borderRadius: "50%", background: d <= levelDots ? skill.color : "rgba(255,255,255,0.1)", boxShadow: d <= levelDots ? `0 0 6px ${skill.color}` : "none", transition: "all 0.3s" }} />
          ))}
          <span style={{ color: skill.color, fontSize: "0.75rem", fontWeight: 600, marginLeft: 6 }}>{skill.years}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  CONTROLS HUD (desktop)
// ─────────────────────────────────────────────
function ControlsHUD() {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const t = setTimeout(() => setVisible(false), 6000); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
          style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(10,10,20,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 14, padding: "12px 16px", color: "#94a3b8", fontSize: "0.72rem", fontFamily: "monospace", lineHeight: 1.8, pointerEvents: "none", zIndex: 10 }}
        >
          <div style={{ color: "#818cf8", marginBottom: 2 }}>// controls</div>
          <div>⬆⬇⬅➡ or W A S D &nbsp; Move</div>
          <div>🖱 Click planet &nbsp;&nbsp;&nbsp;&nbsp; Fly there</div>
          <div>🌌 Reach a planet &nbsp; Discover</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
//  MINI-MAP (desktop)
// ─────────────────────────────────────────────
function MiniMap({ visitedSkills, activeSkillId }) {
  const size = 120;
  const scale = size / 50;
  const offset = size / 2;

  return (
    <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(5,5,15,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: 8, zIndex: 10 }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <defs>
          <pattern id="mgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={size} height={size} fill="url(#mgrid)" rx="6" />
        {SKILLS.map((s, i) => {
          if (i === 0) return null;
          const prev = SKILLS[i - 1];
          return <line key={i} x1={offset + prev.position[0] * scale} y1={offset + prev.position[2] * scale} x2={offset + s.position[0] * scale} y2={offset + s.position[2] * scale} stroke="rgba(99,102,241,0.2)" strokeWidth="1" />;
        })}
        {SKILLS.map((s) => {
          const cx = offset + s.position[0] * scale;
          const cy = offset + s.position[2] * scale;
          const isVis = visitedSkills.has(s.id);
          const isAct = activeSkillId === s.id;
          return (
            <g key={s.id} style={{ cursor: "pointer" }} onClick={() => VehicleController._setTarget && VehicleController._setTarget(s.position[0], s.position[2])}>
              <circle cx={cx} cy={cy} r={isAct ? 5 : 4} fill={isAct ? s.color : isVis ? s.color : "rgba(255,255,255,0.15)"} stroke={s.color} strokeWidth={isAct ? "2" : "1"} opacity={isAct ? 1 : isVis ? 0.8 : 0.5} />
            </g>
          );
        })}
        <text x={size / 2} y={size - 5} textAnchor="middle" fontSize="7" fill="rgba(148,163,184,0.5)" fontFamily="monospace">GALAXY MAP</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
//  DESKTOP PROGRESS BAR
// ─────────────────────────────────────────────
function ProgressTracker({ visitedSkills }) {
  const count = visitedSkills.size;
  const total = SKILLS.length;
  const pct   = Math.round((count / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
      style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(10,10,20,0.75)", backdropFilter: "blur(14px)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "6px 18px", display: "flex", alignItems: "center", gap: 12, zIndex: 10, minWidth: 200 }}
    >
      <span style={{ color: "#818cf8", fontFamily: "monospace", fontSize: "0.68rem", whiteSpace: "nowrap" }}>{count}/{total} explored</span>
      <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 200 }} style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)" }} />
      </div>
      <span style={{ color: "#a78bfa", fontFamily: "monospace", fontSize: "0.68rem" }}>{pct}%</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  ARRIVAL FLASH
// ─────────────────────────────────────────────
function ArrivalFlash({ trigger }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (trigger) { setShow(true); setTimeout(() => setShow(false), 700); }
  }, [trigger]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0.7, scale: 0.8 }} animate={{ opacity: 0, scale: 1.6 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ position: "absolute", inset: 0, borderRadius: 20, border: "2px solid #00e5ff", pointerEvents: "none", zIndex: 20 }}
        />
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────
//  ROOT COMPONENT
// ─────────────────────────────────────────────
export default function SkillsGalaxy() {
  const [visitedSkills, setVisitedSkills] = useState(new Set());
  const [activeSkillId, setActiveSkillId] = useState(null);
  const [flashTrigger, setFlashTrigger] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSkillReach = useCallback((id) => {
    setActiveSkillId(id);
    setVisitedSkills(prev => { const n = new Set(prev); n.add(id); return n; });
    setFlashTrigger(f => f + 1);
  }, []);

  // Mobile: tap a card to toggle its detail
  const handleMobileSelect = useCallback((id) => {
    setActiveSkillId(prev => {
      const next = prev === id ? null : id;
      if (next !== null) setVisitedSkills(v => { const n = new Set(v); n.add(next); return n; });
      return next;
    });
  }, []);

  const activeSkill = activeSkillId !== null ? SKILLS.find(s => s.id === activeSkillId) : null;

  return (
    <section id="Skills" className="w-full py-12 sm:py-20 lg:py-28 px-4 sm:px-8 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-8"
        >
          <span className="section-label">// Skill Galaxy</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            {isMobile ? "My " : "Drive Through My "}
            <span className="gradient-text">Tech Universe</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {isMobile
              ? "Tap any skill card to explore it. See your progress as you unlock each technology."
              : "Pilot your hover-craft with WASD / arrow keys. Click the map to navigate. Reach a planet to unlock its skill card."}
          </p>
        </motion.div>

        {/* ── MOBILE: Interactive card grid ── */}
        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <MobileSkillGrid
              visitedSkills={visitedSkills}
              activeSkillId={activeSkillId}
              onSkillSelect={handleMobileSelect}
            />
          </motion.div>
        ) : (
          /* ── DESKTOP: 3D Galaxy canvas ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.18)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.5)",
              height: 560,
              background: "radial-gradient(ellipse at 20% 30%,rgba(99,102,241,0.06) 0%,transparent 60%),#05050e",
            }}
          >
            <Canvas
              camera={{ position: [0, 5, 10], fov: 58 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={null}>
                <GalaxyScene visitedSkills={visitedSkills} activeSkillId={activeSkillId} onSkillReach={handleSkillReach} />
                <PlanetClickPlane />
              </Suspense>
            </Canvas>

            <ProgressTracker visitedSkills={visitedSkills} />
            <MiniMap visitedSkills={visitedSkills} activeSkillId={activeSkillId} />
            <ControlsHUD />
            <ArrivalFlash trigger={flashTrigger} />

            {/* Skill popup */}
            <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 30, pointerEvents: "none" }}>
              <AnimatePresence mode="wait">
                {activeSkill && <SkillCard key={activeSkill.id} skill={activeSkill} onClose={() => setActiveSkillId(null)} />}
              </AnimatePresence>
            </div>

            {/* Vignette */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none", background: "radial-gradient(ellipse at center,transparent 55%,rgba(5,5,15,0.6) 100%)" }} />
          </motion.div>
        )}

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8"
        >
          {Object.entries(CATEGORY_COLORS).map(([cat, col]) => (
            <div key={cat} className="flex items-center gap-2">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}` }} />
              <span style={{ color: "#94a3b8", fontSize: "0.78rem", textTransform: "capitalize" }}>{cat}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
