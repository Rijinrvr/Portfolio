"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="w-full min-h-screen relative text-black font-sans bg-white">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 md:px-20 py-6">
        <div className="text-3xl font-bold">
          Rijin V Reji<span className="text-yellow-500">.</span>
        </div>
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
        <a
          href="mailto:rijinvreji1@gmail.com"
          className="border border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition inline-block"
        >
          hello@rijin
        </a>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto text-center px-8 md:px-0 py-20">
        <p className="text-xl md:text-2xl mb-6">
          👋, my name is Rijin and I am a Software Engineer
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight relative inline-block"
        >
          Software Engineer
          <span className="inline-block ml-2 text-2xl align-top border border-black rounded-full p-2">
            ↗
          </span>
        </motion.h1>

        <h2 className="text-6xl md:text-8xl font-bold text-yellow-300 -mt-6 mb-10">
          & Photographer
        </h2>

        <p className="text-lg mb-8">based in Kerala, God&apos;s Own Country.</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6 mb-20">
          <a
            href="/portfolio/Rijin_v_Reji.pdf"
            download
            className="px-6 py-3 bg-yellow-400 text-white rounded-lg hover:opacity-80 transition"
          >
            Download CV
          </a>
          <a
            href="https://wa.me/919061788964"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-yellow-400 rounded-lg hover:bg-yellow-300 hover:text-white transition"
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
