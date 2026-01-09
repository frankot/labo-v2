"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/dropdown";
import { NavLink } from "./navigation-data";

interface DesktopNavProps {
  isVisible: boolean;
  navLinks: NavLink[];
}

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

const DesktopNav = ({ isVisible, navLinks }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 hidden bg-black transition-transform duration-500 lg:block ${
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
                  hasClickableHeader={link.hasClickableHeader}
                  headerHref={link.href}
                  forceClose={pathname !== "/"}
                />
              ) : (
                <Link
                  href={link.href!}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.href!);
                    // Close all dropdowns when clicking regular links
                    const dropdowns =
                      document.querySelectorAll("[data-dropdown]");
                    dropdowns.forEach((dropdown) => {
                      const event = new Event("mouseleave");
                      dropdown.dispatchEvent(event);
                    });
                  }}
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
