"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import TypeWriter from "./components/TypeWriter";

const ThreeScene = dynamic(() => import("./components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "About", href: "#AboutMe" },
    { label: "Projects", href: "#Projects" },
    { label: "Skills", href: "#Skills" },
    { label: "Experience", href: "#Experience" },
  ];

  return (
    <main className="w-full min-h-screen relative font-sans noise-bg">
      <CustomCursor />

      {/* Gradient mesh background */}
      <div className="gradient-mesh" />

      {/* ===== Navbar ===== */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-20 py-4 transition-all duration-300 ${scrolled
            ? "backdrop-blur-xl bg-[rgba(10,10,15,0.8)] border-b border-[rgba(99,102,241,0.1)] shadow-lg shadow-black/20"
            : "bg-transparent"
          }`}
      >
        <a href="#" className="flex items-center gap-1 group">
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Rijin
          </span>
          <span className="text-xl sm:text-2xl font-bold gradient-text">.</span>
          <span className="text-xs sm:text-sm font-mono text-[var(--text-muted)] ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            dev
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link text-sm font-medium">
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact Button - Desktop */}
        <a
          href="mailto:rijin.connect@gmail.com"
          className="hidden sm:inline-flex items-center gap-2 btn-secondary text-xs sm:text-sm !py-2.5 !px-5"
          data-cursor="pointer"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Available for work</span>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 backdrop-blur-xl bg-[rgba(10,10,15,0.95)] md:hidden z-40 border-t border-[rgba(99,102,241,0.15)] shadow-2xl"
            >
              <div className="flex flex-col px-6 py-8 gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-lg text-[var(--text-muted)] hover:text-white transition py-3 border-b border-[rgba(99,102,241,0.08)] font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xs font-mono gradient-text mr-3">
                      0{i + 1}.
                    </span>
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="mailto:rijin.connect@gmail.com"
                  className="mt-4 btn-primary text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Get in Touch</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== Hero Section ===== */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Three.js Background */}
        <ThreeScene />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-5 sm:px-8 pt-20">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs sm:text-sm text-[var(--text-muted)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </motion.div>

          {/* Code-style greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <span className="font-mono text-sm sm:text-base text-[var(--text-muted)]">
              <span className="code-keyword">const</span>{" "}
              <span className="code-variable">developer</span>{" "}
              <span className="code-bracket">=</span>{" "}
              <span className="code-string">&quot;Rijin V Reji&quot;</span>
              <span className="code-bracket">;</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white mb-4"
          >
            I Build Things
            <br />
            <span className="gradient-text">For The Web</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 h-10"
          >
            <TypeWriter />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Crafting high-performance, accessible, and visually stunning web
            applications with{" "}
            <span className="text-[var(--primary-light)] font-medium">
              React.js
            </span>
            ,{" "}
            <span className="text-[var(--primary-light)] font-medium">
              Next.js
            </span>
            , and modern frontend technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <a href="#Projects" className="btn-primary text-center" data-cursor="pointer">
              <span>View My Work</span>
            </a>
            <a
              href="/portfolio/Rijin_V_Reji.pdf"
              download
              className="btn-secondary text-center"
              data-cursor="pointer"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-16 sm:mt-24 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-[var(--text-muted)]">
              scroll down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-[var(--primary)] flex items-start justify-center p-1"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutMe />
      <Projects />
      <Skills />
      <Experience />
      <Footer />
    </main>
  );
}
