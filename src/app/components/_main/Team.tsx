"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Michroma } from "next/font/google";
import { Phone, Mail } from "lucide-react";
import MobileSelect from "../ui/mobile-select";
import Card from "../ui/card";
import StickyHeader from "../ui/sticky-header";
import { FadeInView } from "../../anim";
import { getDepartmentNames } from "@/lib/team-service";
import type { LegacyTeamData } from "@/lib/team-data";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});


export default function TeamSection() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const departmentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Właściciele");
  const [teamData, setTeamData] = useState<LegacyTeamData>({});
  const [isLoading, setIsLoading] = useState(true);
  // Removed debug overlay state

  // Load team data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const { loadTeamData } = await import("@/lib/team-service");
        const { teamData: data, firstDepartment } = await loadTeamData();
        setTeamData(data);
        setSelectedDepartment(firstDepartment);
      } catch (error) {
        console.error('❌ Error in team data loading:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const departments = getDepartmentNames(teamData);

  const scrollToDepartment = (department: string) => {
    const departmentElement = departmentRefs.current[department];
    if (departmentElement && scrollContainerRef.current) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const elementRect = departmentElement.getBoundingClientRect();
      const scrollLeft =
        scrollContainerRef.current.scrollLeft +
        elementRect.left -
        containerRect.left;

      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    scrollToDepartment(department);
  };

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    // Find which department is most visible
    let mostVisibleDepartment = departments[0];
    let maxVisibility = 0;

    departments.forEach((department) => {
      const element = departmentRefs.current[department];
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const containerRect =
          scrollContainerRef.current!.getBoundingClientRect();

        const visibleLeft = Math.max(elementRect.left, containerRect.left);
        const visibleRight = Math.min(elementRect.right, containerRect.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);

        if (visibleWidth > maxVisibility) {
          maxVisibility = visibleWidth;
          mostVisibleDepartment = department;
        }
      }
    });

    if (mostVisibleDepartment !== selectedDepartment) {
      setSelectedDepartment(mostVisibleDepartment);
    }
  }, [departments, selectedDepartment]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Show loading state with same layout structure
  if (isLoading) {
    return (
      <div id="team" className="relative">
        <div className="relative w-full">
          <StickyHeader title="TEAM" delay={0.2} />
          
          <FadeInView className="relative z-20 mx-auto -mt-20">
            <div className="mx-auto mt-24 max-w-7xl lg:mt-10">
              <div className="relative overflow-hidden px-4 pb-20 text-white">
                <div className="text-center text-white/60">Ładowanie danych zespołu...</div>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    );
  }

  return (
  <div id="team" className="relative">

      {/* Main Content */}
      <div className="relative w-full">
        <StickyHeader title="TEAM" delay={0.2} />

        {/* Title Section */}
        <FadeInView className="relative z-20 mx-auto -mt-20">
          <div className="mx-auto mt-24 max-w-7xl lg:mt-10">
            <div
              ref={containerRef}
              className="relative overflow-hidden px-4 pb-20 text-white"
            >
              {/* Department Selector */}
              <div className="mb-12 flex justify-center">
                {/* Desktop: Horizontal buttons */}
                <div className="hidden flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-sm md:flex">
                  {departments.map((department) => (
                    <button
                      key={department}
                      onClick={() => handleDepartmentChange(department)}
                      className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        selectedDepartment === department
                          ? "bg-white text-black shadow-lg"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>

                {/* Mobile: Shared MobileSelect */}
                <div className="relative mx-auto w-full max-w-xs md:hidden">
                  <MobileSelect<string>
                    value={selectedDepartment}
                    options={departments.map((d) => ({ value: d, label: d }))}
                    onChange={(val) => handleDepartmentChange(val)}
                    placeholder="Wybierz dział"
                    ariaLabel="Wybierz dział"
                  />
                </div>
              </div>

              {/* Team Members */}
              <div
                ref={scrollContainerRef}
                className="scrollbar-hide overflow-x-auto pb-4"
              >
                <div className="flex min-w-max gap-8">
                  {departments.map((department, departmentIndex) => (
                    <div key={department} className="flex gap-6">
                      <div
                        ref={(el) => {
                          if (el) {
                            departmentRefs.current[department] = el;
                          }
                        }}
                        className="flex gap-6"
                      >
                        {teamData[department]?.map((member) => {
                          const imgSrc = member.image && member.image.trim().length > 0 ? member.image : "/logo-small.png";
                          return (
                            <Card
                              key={member.id}
                              className="group relative w-80 flex-shrink-0 overflow-hidden p-0 md:w-80"
                            >
                              {/* Image Section */}
                              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                                <Image
                                  src={imgSrc}
                                  alt={member.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                                {/* Department Badge */}
                                <div className="absolute top-3 left-3">
                                  <div className="rounded-full border border-white/20 bg-black/50 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                                    {department}
                                  </div>
                                </div>
                              </div>

                              {/* Content Section */}
                              <div className="space-y-3 p-4">
                                {/* Name and Role */}
                                <div>
                                  <h4 className={`${michroma.className} mb-1 text-lg font-medium text-white`}>
                                    {member.name}
                                  </h4>
                                  <p className="text-sm font-medium text-gray-400">{member.role}</p>
                                </div>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-gray-300">{member.description}</p>

                                {/* Contact Info */}
                                <div className="space-y-2 border-t border-white/10 pt-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{member.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{member.email}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>

                      {/* Vertical Divider - Hidden on mobile */}
                      {departmentIndex < departments.length - 1 && (
                        <div className="hidden h-96 w-[2px] flex-shrink-0 self-center bg-gradient-to-b from-transparent via-white/50 to-transparent md:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
  {/* CMS probe removed for production */}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}


