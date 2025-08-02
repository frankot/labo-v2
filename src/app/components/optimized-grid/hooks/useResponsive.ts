import { useState, useEffect } from "react";

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ultra-simple check - default to mobile for safety
    try {
      setIsMobile(window.innerWidth < 768);
    } catch {
      setIsMobile(true); // Default to mobile if anything fails
    }
  }, []);

  return { isMobile };
}
