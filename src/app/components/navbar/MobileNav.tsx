"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { navLinks } from "./navigation-data";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSections([]);
  };

  const toggleSection = (sectionLabel: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionLabel)
        ? prev.filter((s) => s !== sectionLabel)
        : [...prev, sectionLabel],
    );
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-30 flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-800 bg-black/80 backdrop-blur-sm md:hidden"
      >
        <Image src="/logo-small.png" alt="Menu" width={50} height={50} />
      </button>

      {/* Mobile Menu - Always Rendered */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-80 transform overflow-y-auto bg-black transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-6 right-10 text-white"
        >
          <X size={32} />
        </button>

        <div className="px-6 pt-20">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="mb-8"
          />

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.items ? (
                  <div>
                    <button
                      onClick={() => toggleSection(link.label)}
                      className="flex w-full items-center justify-between border-b border-neutral-800 py-3 text-white"
                    >
                      {link.label}
                      <ChevronDown
                        className={`transform transition-transform ${
                          openSections.includes(link.label) ? "rotate-180" : ""
                        }`}
                        size={20}
                      />
                    </button>
                    {openSections.includes(link.label) && (
                      <div className="py-2 pl-4">
                        {link.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="block py-2 text-neutral-400 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={closeMenu}
                    className="block border-b border-neutral-800 py-3 text-white hover:text-neutral-300"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={closeMenu}
      />
    </>
  );
};

export default MobileNav;
