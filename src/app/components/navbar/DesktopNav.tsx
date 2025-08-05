"use client";

import Link from "next/link";
import Dropdown from "../ui/dropdown";
import { navLinks } from "./navigation-data";

interface DesktopNavProps {
  isVisible: boolean;
}

const DesktopNav = ({ isVisible }: DesktopNavProps) => {
  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 hidden bg-black transition-transform duration-500 md:block ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <h1 className="font-michroma text-4xl font-bold text-white">LABO</h1>
        </Link>

        <div className="flex items-center space-x-2">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.items ? (
                <Dropdown
                  label={link.label}
                  items={link.items}
                  isContact={link.label === "Kontakt"}
                />
              ) : (
                <Link
                  href={link.href!}
                  className="px-4 py-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus:text-white focus:outline-none"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
