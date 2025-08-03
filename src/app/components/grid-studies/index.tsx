"use client";

import { useResponsive } from "./hooks/useResponsive";
import { DesktopGrid } from "./DesktopGrid";
import { MobileGrid } from "./MobileGrid";
import { caseStudies } from "../../../lib/realizacje-data";

export default function CaseStudiesGrid() {
  const { isMobile } = useResponsive();

  return (
    <div className="h-full w-full">
      {isMobile ? (
        <MobileGrid caseStudies={caseStudies} />
      ) : (
        <DesktopGrid caseStudies={caseStudies} />
      )}
    </div>
  );
}
