"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: FaGithub,
    
    href: "https://github.com/Rijinrvr",
    label: "GitHub",
    hoverColor: "hover:text-white hover:bg-[#333]",
  },
  {
    icon: FaLinkedinIn,
    target: "_blank",

    href: "https://www.linkedin.com/in/r-v-r/",
    label: "LinkedIn",
    hoverColor: "hover:text-white hover:bg-[#0077b5]",
  },
  {
    icon: FaInstagram,
    target: "_blank",
    href: "https://www.instagram.com/thefoodiedeveloper?igsh=MXFleDk3MzQ5bXdrdg==",
    label: "Instagram",
    hoverColor:
      "hover:text-white hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]",
  },
];

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#AboutMe" },
  { label: "Projects", href: "#Projects" },
  { label: "Skills", href: "#Skills" },
  { label: "Experience", href: "#Experience" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="footer-gradient py-16 sm:py-20 px-5 sm:px-8 md:px-16" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label">// Let&apos;s Connect</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6">
            Have a project in{" "}
            <span className="gradient-text">mind?</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto mb-8 text-sm sm:text-base">
            I&apos;m always interested in new opportunities and collaborations.
            Let&apos;s build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:rijin.connect@gmail.com"
              className="btn-primary text-center"
              data-cursor="pointer"
            >
              <span>Get in Touch</span>
            </a>
            <a
              href="https://wa.me/919061788964"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-center"
              data-cursor="pointer"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 pt-10 border-t border-[rgba(99,102,241,0.1)]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-white">Rijin</span>
              <span className="text-xl font-bold gradient-text">.</span>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-1">
                dev
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              React.js Developer & Frontend Engineer crafting high-performance
              web experiences from Kerala, India.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[var(--text-muted)] transition-all duration-300 ${social.hoverColor}`}
                  data-cursor="pointer"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary-light)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[1px] bg-[var(--primary)] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-4 sm:col-span-2 md:col-span-1"
          >
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:rijin.connect@gmail.com"
                className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--primary-light)] transition-colors break-all"
              >
                <span className="w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0 text-xs">
                  📧
                </span>
                rijin.connect@gmail.com
              </a>
              <a
                href="tel:+919061788964"
                className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--primary-light)] transition-colors"
              >
                <span className="w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0 text-xs">
                  📱
                </span>
                +91 906 178 8964
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                <span className="w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0 text-xs">
                  📍
                </span>
                Kerala, India
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(99,102,241,0.08)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            &copy; {new Date().getFullYear()} Rijin V Reji. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Built with <span className="gradient-text font-semibold">React</span> &{" "}
            <span className="gradient-text font-semibold">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
