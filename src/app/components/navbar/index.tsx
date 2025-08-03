"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ScrollArrow from "./ScrollArrow";

const Navbar = () => {
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isMainPage);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    // If not on main page, always show nav
    if (!isMainPage) {
      setIsScrolled(true);
      setShowArrow(false);
      return;
    }

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.3; // 30vh for nav
      const arrowThreshold = window.innerHeight * 0.5; // 50vh for arrow

      setIsScrolled(window.scrollY > scrollThreshold);

      // Arrow logic
      if (window.scrollY > arrowThreshold) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    // Show arrow after 4 seconds on main page
    const timer = setTimeout(() => {
      if (isMainPage) {
        setShowArrow(true);
      }
    }, 4000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isMainPage]);

  const handleArrowClick = () => {
    setShowArrow(false);
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <DesktopNav isVisible={isScrolled} />
      <MobileNav />
      {/* <ScrollArrow show={showArrow} onClick={handleArrowClick} /> */}
    </>
  );
};

export default Navbar;
