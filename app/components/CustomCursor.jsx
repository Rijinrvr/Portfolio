"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [trailDots, setTrailDots] = useState([]);
    const trailIdRef = useRef(0);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        let lastTrailTime = 0;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);

            // Create trail dots every 40ms
            const now = Date.now();
            if (now - lastTrailTime > 40) {
                lastTrailTime = now;
                trailIdRef.current += 1;
                setTrailDots((prev) => [
                    ...prev.slice(-12),
                    { id: trailIdRef.current, x: e.clientX, y: e.clientY },
                ]);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "pointer"
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.dataset.cursor === "pointer"
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isMobile, cursorX, cursorY, dotX, dotY]);

    // Clean up old trail dots
    useEffect(() => {
        if (trailDots.length === 0) return;
        const timer = setTimeout(() => {
            setTrailDots((prev) => prev.slice(1));
        }, 300);
        return () => clearTimeout(timer);
    }, [trailDots]);

    if (isMobile) return null;

    return (
        <>
            {/* Trail dots */}
            {trailDots.map((dot, index) => (
                <motion.div
                    key={dot.id}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        left: dot.x - 3,
                        top: dot.y - 3,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: `rgba(99, 102, 241, ${0.3 + index * 0.02})`,
                        pointerEvents: "none",
                        zIndex: 9997,
                    }}
                />
            ))}

            {/* Outer ring */}
            <motion.div
                style={{
                    position: "fixed",
                    left: smoothX,
                    top: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    borderRadius: "50%",
                    border: `2px solid ${isHovering ? "#818cf8" : "rgba(99, 102, 241, 0.5)"}`,
                    pointerEvents: "none",
                    zIndex: 9998,
                    scale: isClicking ? 0.8 : 1,
                    transition: "width 0.3s, height 0.3s, border-color 0.3s, scale 0.2s",
                    mixBlendMode: "difference",
                }}
            />

            {/* Inner dot */}
            <motion.div
                style={{
                    position: "fixed",
                    left: dotX,
                    top: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 8 : 6,
                    height: isHovering ? 8 : 6,
                    borderRadius: "50%",
                    background: isHovering
                        ? "#818cf8"
                        : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    pointerEvents: "none",
                    zIndex: 9999,
                    scale: isClicking ? 1.5 : 1,
                    transition: "width 0.2s, height 0.2s, scale 0.15s",
                }}
            />
        </>
    );
}
