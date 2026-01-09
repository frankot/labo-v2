"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { NavLink } from "./navigation-data";

interface NavbarClientProps {
  navLinks: NavLink[];
}

const NavbarClient = ({ navLinks }: NavbarClientProps) => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isMainPage);

  useEffect(() => {
    // If not on main page, always show nav
    if (!isMainPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.3; // 30vh for nav

      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMainPage]);

  return (
    <>
      <DesktopNav isVisible={isScrolled} navLinks={navLinks} />
      <MobileNav isVisible={isScrolled} navLinks={navLinks} />
      {/* <ScrollArrow show={showArrow} onClick={handleArrowClick} /> */}
    </>
  );
};

export default NavbarClient;
