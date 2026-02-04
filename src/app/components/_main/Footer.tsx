"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/labopracownia/",
      label: "Instagram",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://www.facebook.com/labopracownia/?locale=pl_PL",
      label: "Facebook",
    },
  ];

  return (
    <motion.footer
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto mt-10 max-w-7xl border-t border-white/10 px-10 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-michroma text-2xl text-white">LABO</h3>
            <p className="text-sm text-neutral-400">
             Tworzymy przestrzenie, które działają.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-michroma text-sm text-neutral-200">
              NAWIGACJA
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white">
                  Usługi
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-white">
                  Zespół
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-michroma text-sm text-neutral-200">KONTAKT</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
          
              <li>biuro@labopracownia.pl</li>
              <li>ul. Kaczorowa 26B</li>
              <li>03-046 Warszawa</li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-michroma text-sm text-neutral-200">
              SOCIAL MEDIA
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 transition-colors duration-300 hover:border-white"
                  aria-label={link.label}
                >
                  <span className="text-neutral-400 transition-colors duration-300 group-hover:text-white">
                    {link.icon}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-16 border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400"
        >
          <p>
            © {new Date().getFullYear()} LABO. Wszystkie prawa zastrzeżone.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
