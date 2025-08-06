"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown, Phone } from "lucide-react";
import { navLinks } from "./navigation-data";

const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  if (href.startsWith("#") || href.startsWith("/#")) {
    const hash = href.startsWith("/#") ? href.substring(1) : href;
    const element = document.querySelector(hash);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // If element doesn't exist, allow default navigation to root page
  }
};

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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    handleSmoothScroll(e, href);
    closeMenu();
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
        className="fixed top-4 right-4 z-30 flex size-12 items-center justify-center rounded border border-neutral-400 bg-black/50 backdrop-blur-sm lg:hidden"
      >
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="size-9 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          ></path>
        </svg>
      </button>

      {/* Mobile Menu - Always Rendered */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-4/5 min-w-64 transform overflow-y-auto bg-black transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with X button and phone number */}
        <div className="flex items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-2 text-white">
            <Phone size={16} />
            <span className="text-sm">+48 123 456 789</span>
          </div>
          <button
            onClick={closeMenu}
            className="flex size-12 items-center justify-center rounded border border-neutral-400 bg-black/50 backdrop-blur-sm"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        <div className="px-6 pt-6">
          {/* Logo and placeholder text section */}
          <div className="mb-8 flex gap-4">
            <div className="w-full">
              <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={50}
                className="w-full"
              />
              </Link>
            </div>
            <div className="w-2/3">
              <div className="space-y-3 text-sm">
                <div className="border-t border-neutral-700 pt-2">
                  <h4 className="mb-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                    Zastępca Szeryfa
                  </h4>
                  <p className="text-neutral-400">+48 987 654 321</p>
                </div>
                <div>
                  <h4 className="mb-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                    Email
                  </h4>
                  <p className="text-neutral-400">kontakt@labo.pl</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.items ? (
                  <div>
                    {link.hasClickableHeader && link.href ? (
                      <div className="flex items-center border-b border-neutral-800">
                        <Link
                          href={link.href || "#"}
                          onClick={(e) => handleLinkClick(e, link.href || "#")}
                          className="flex-1 py-3 text-white hover:text-neutral-300"
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => toggleSection(link.label)}
                          className="px-3 py-3 text-white"
                        >
                          <ChevronDown
                            className={`transform transition-transform duration-300 ${
                              openSections.includes(link.label)
                                ? "rotate-180"
                                : ""
                            }`}
                            size={20}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleSection(link.label)}
                        className="flex w-full items-center justify-between border-b border-neutral-800 py-3 text-white"
                      >
                        {link.label}
                        <ChevronDown
                          className={`transform transition-transform duration-300 ${
                            openSections.includes(link.label)
                              ? "rotate-180"
                              : ""
                          }`}
                          size={20}
                        />
                      </button>
                    )}
                    {openSections.includes(link.label) && (
                      <div className="py-2 pl-4 transition-all duration-300">
                        {link.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
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
                    href={link.href || "#"}
                    onClick={(e) => handleLinkClick(e, link.href || "#")}
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
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={closeMenu}
      />
    </>
  );
};

export default MobileNav;
