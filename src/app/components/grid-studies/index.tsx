"use client";

import { useResponsive } from "./hooks/useResponsive";
import { DesktopGrid } from "./DesktopGrid";
import { MobileGrid } from "./MobileGrid";
import { getCaseStudies, type Realizacja } from "../../../lib/realizacje-data";
import { useState, useEffect } from "react";

export default function CaseStudiesGrid() {
  const { isMobile } = useResponsive();
  const [caseStudies, setCaseStudies] = useState<Realizacja[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCaseStudies() {
      try {
        console.log('🔄 Loading case studies for grid...');
        setLoading(true);
        const studies = await getCaseStudies();
        console.log(`✅ Loaded ${studies.length} case studies`);
        
        // Log summary of case studies
        studies.forEach((study, index) => {
          const isPlaceholder = study.id.startsWith('placeholder-');
          console.log(`Case study ${index + 1}: ${study.client} - ${isPlaceholder ? 'PLACEHOLDER' : 'REAL'}`);
          console.log(`  - Video URL: ${study.video || 'MISSING'}`);
        });
        
        setCaseStudies(studies);
      } catch (error) {
        console.error('Failed to load case studies:', error);
        // getCaseStudies already handles fallback to placeholders
      } finally {
        setLoading(false);
      }
    }

    loadCaseStudies();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-2xl">⏳</div>
          <p className="font-michroma text-sm text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

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
