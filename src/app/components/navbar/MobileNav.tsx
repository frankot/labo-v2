"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";
import { NavLink } from "./navigation-data";

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

interface MobileNavProps {
  isVisible: boolean;
  navLinks: NavLink[];
}

const MobileNav = ({ isVisible, navLinks }: MobileNavProps) => {
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
      {/* Mobile Navbar */}
      <nav
        className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-center bg-black lg:hidden"
        style={{ boxShadow: "none", border: "none" }}
      >
        {/* Centered LABO logo, only when isVisible */}
        <div
          className={`absolute left-1/2 flex -translate-x-1/2 items-center justify-center transition-opacity duration-500 ${isVisible || isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <Link href="/" className="flex overflow-hidden">
            <Image src="/labo-hor-white.png" alt="LABO" width={90} height={45} />
          </Link>
        </div>
        {/* Burger/X Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-1/2 right-4 z-50 flex -translate-y-1/2 items-center justify-center border-none bg-transparent outline-none"
          style={{
            width: "1.8rem",
            height: "1.8rem",
            minWidth: "unset",
            minHeight: "unset",
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-7 w-7">
            {/* Animated burger/X icon with improved transition */}
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-7 rounded bg-white transition-transform duration-400 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-2.5"}`}
              style={{ transitionProperty: "transform, opacity" }}
            />
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-7 rounded bg-white transition-opacity duration-400 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              style={{ transitionProperty: "opacity" }}
            />
            <span
              className={`absolute top-1/2 left-0 h-0.5 w-7 rounded bg-white transition-transform duration-400 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-2.5"}`}
              style={{ transitionProperty: "transform, opacity" }}
            />
          </span>
        </button>
      </nav>

      {/* Slide-up Mobile Menu */}
      <div
        className={`fixed bottom-0 left-0 z-40 w-full overflow-y-auto border-t border-white/30 bg-black transition-transform duration-300 lg:hidden ${isMenuOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{
          height: "calc(100vh - 4rem)", // 4rem = 64px nav height
          marginTop: "4rem",
        }}
      >
        <div className="px-6 pt-6 pb-6">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.items && link.label !== "Usługi" ? (
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

        {/* Bottom Contact & Info Section */}
        <div className="mt-8 w-full border-t border-white/20 bg-black px-6 pt-4 pb-6">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white">
                <Phone size={16} />
                <span>+48 123 456 789</span>
              </div>
              <div>
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
            <div className="space-y-2">
              <div>
                <h4 className="mb-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Godziny pracy
                </h4>
                <p className="text-neutral-400">Pon-Pt: 8:00-16:00</p>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Adres
                </h4>
                <p className="text-neutral-400">
                  ul. Przykładowa 123, Warszawa
                </p>
              </div>
              <div>
                <h4 className="mb-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                  Social
                </h4>
                <p className="text-neutral-400">@labo_official</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 lg:hidden ${isMenuOpen ? "block" : "hidden"}`}
        onClick={closeMenu}
        style={{ top: "4rem" }}
      />
    </>
  );
};

export default MobileNav;
