"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="w-full min-h-screen relative text-black font-sans bg-white">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-8 md:px-20 py-6 relative">
        <div className="text-2xl sm:text-3xl font-bold">
          Rijin V Reji<span className="text-yellow-500">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-lg">
          <a href="#AboutMe" className="hover:opacity-70">
            About
          </a>
          <a href="#Projects" className="hover:opacity-70">
            Projects
          </a>
          <a href="#Experience" className="hover:opacity-70">
            Experience
          </a>
        </div>

        {/* Contact Button - Hidden on mobile */}
        <a
          href="mailto:rijin.connect@gmail.com"
          className="hidden sm:inline-block border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition"
        >
          rijin@connect
        </a>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-all ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-black transition-all ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-black transition-all ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40 border-t border-gray-200"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              <a
                href="#AboutMe"
                className="text-lg hover:text-yellow-500 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#Projects"
                className="text-lg hover:text-yellow-500 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#Experience"
                className="text-lg hover:text-yellow-500 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="mailto:rijin.connect@gmail.com"
                className="border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition text-center"
              >
                rijin@connect
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center px-4 sm:px-8 md:px-0 py-12 sm:py-20">
        <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
          👋, my name is Rijin and I am a Software Engineer
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight relative inline-block px-2"
        >
          Software Engineer
          <span className="inline-block ml-2 text-xl sm:text-2xl align-top border border-black rounded-full p-1 sm:p-2">
            ↗
          </span>
        </motion.h1>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-yellow-300 -mt-4 sm:-mt-6 mb-6 sm:mb-10">
          & Photographer
        </h2>

        <p className="text-base sm:text-lg mb-6 sm:mb-8">
          based in Kerala, God&apos;s Own Country.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 mb-12 sm:mb-20 px-4">
          <a
            href="/portfolio/Rijin_V_Reji.pdf"
            download
            className="px-6 py-3 bg-yellow-400 text-white rounded-lg hover:opacity-80 transition text-center"
          >
            Download CV
          </a>
          <a
            href="https://wa.me/919061788964"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-yellow-400 rounded-lg hover:bg-yellow-300 hover:text-white transition text-center"
          >
            Let&apos;s Talk
          </a>
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
