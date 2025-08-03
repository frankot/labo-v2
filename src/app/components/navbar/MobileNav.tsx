"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { navLinks } from "./navigation-data";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset open sections when closing menu
    if (isMenuOpen) {
      setOpenSections([]);
    }
  };

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
      <div className="fixed right-4 bottom-4 z-50 md:hidden">
        <button
          onClick={toggleMenu}
          className="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-800 bg-black transition-all duration-200"
          aria-label="Toggle menu"
        >
          <Image src="/logo-small.png" alt="Menu" width={50} height={50} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 z-10 flex h-16 w-16 items-center justify-center rounded-lg text-white transition-all duration-200"
            aria-label="Close menu"
          >
            <X className="size-8" strokeWidth={1.5} />
          </button>

          {/* Menu Content */}
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-24">
              <div className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={150} height={50} />
              </div>
              <div className="text-right text-sm text-neutral-300">
                <div>labo@labo.com</div>
                <div>+48 123 456 789</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.items ? (
                      // Dropdown section
                      <div>
                        <button
                          onClick={() => toggleSection(link.label)}
                          className="flex w-full items-center justify-between border-b border-neutral-800 py-4 text-left text-lg text-white"
                        >
                          {link.label}
                          <ChevronDown
                            className={`size-5 transition-transform duration-200 ${
                              openSections.includes(link.label)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {openSections.includes(link.label) && (
                          <div className="pb-2 pl-4">
                            {link.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className="block py-2 text-neutral-400 transition-colors hover:text-white"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Regular link
                      <div className="border-b border-neutral-800">
                        <Link
                          href={link.href!}
                          onClick={closeMenu}
                          className="block py-4 text-lg text-white transition-colors hover:text-neutral-300"
                        >
                          {link.label}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
