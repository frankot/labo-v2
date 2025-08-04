"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Michroma } from "next/font/google";
import { Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";
import Card from "../ui/card";
import StickyHeader from "../ui/sticky-header";
import { FadeInView } from "../../anim";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

// Team structure with categories
const teamData = {
  Właściciele: [
    {
      id: 1,
      name: "Bartek Kowalski",
      role: "CEO & Founder",
      phone: "+48 123 456 789",
      email: "bartek@company.com",
      image: "/team/Bartek.jpg",
      description: "Visionary leader driving innovation and strategic growth.",
    },
    {
      id: 2,
      name: "Robert Nowak",
      role: "Co-Founder & CTO",
      phone: "+48 123 456 788",
      email: "robert@company.com",
      image: "/team/Robert.jpg",
      description: "Tech architect building scalable solutions for the future.",
    },
  ],
  PM: [
    {
      id: 3,
      name: "Anna Wiśniewska",
      role: "Senior Project Manager",
      phone: "+48 123 456 787",
      email: "anna@company.com",
      image: "/team/Bartek.jpg",
      description:
        "Expert in coordinating complex projects and team workflows.",
    },
    {
      id: 4,
      name: "Michał Zieliński",
      role: "Project Manager",
      phone: "+48 123 456 786",
      email: "michal@company.com",
      image: "/team/Robert.jpg",
      description:
        "Ensuring seamless project delivery and client satisfaction.",
    },
  ],
  "Dział Projektowy": [
    {
      id: 5,
      name: "Katarzyna Dąbrowska",
      role: "Lead Architect",
      phone: "+48 123 456 785",
      email: "katarzyna@company.com",
      image: "/team/Bartek.jpg",
      description: "Creating innovative architectural solutions and designs.",
    },
    {
      id: 6,
      name: "Piotr Lewandowski",
      role: "Senior Developer",
      phone: "+48 123 456 784",
      email: "piotr@company.com",
      image: "/team/Robert.jpg",
      description: "Building robust applications with cutting-edge technology.",
    },
    {
      id: 7,
      name: "Magdalena Wójcik",
      role: "Systems Analyst",
      phone: "+48 123 456 783",
      email: "magdalena@company.com",
      image: "/team/Bartek.jpg",
      description: "Analyzing complex systems and optimizing performance.",
    },
  ],
  "Dział Kreatywny": [
    {
      id: 8,
      name: "Jakub Kowalczyk",
      role: "Creative Director",
      phone: "+48 123 456 782",
      email: "jakub@company.com",
      image: "/team/Robert.jpg",
      description: "Leading creative vision and brand development strategies.",
    },
    {
      id: 9,
      name: "Natalia Kamińska",
      role: "UX/UI Designer",
      phone: "+48 123 456 781",
      email: "natalia@company.com",
      image: "/team/Bartek.jpg",
      description:
        "Crafting intuitive user experiences and beautiful interfaces.",
    },
    {
      id: 10,
      name: "Tomasz Jankowski",
      role: "Graphic Designer",
      phone: "+48 123 456 780",
      email: "tomasz@company.com",
      image: "/team/Robert.jpg",
      description: "Creating compelling visual content and brand materials.",
    },
  ],
  Producenci: [
    {
      id: 11,
      name: "Agnieszka Mazur",
      role: "Production Manager",
      phone: "+48 123 456 779",
      email: "agnieszka@company.com",
      image: "/team/Bartek.jpg",
      description: "Overseeing production processes and quality control.",
    },
    {
      id: 12,
      name: "Łukasz Krawczyk",
      role: "Technical Producer",
      phone: "+48 123 456 778",
      email: "lukasz@company.com",
      image: "/team/Robert.jpg",
      description: "Managing technical aspects of production workflows.",
    },
    {
      id: 13,
      name: "Monika Piotrowska",
      role: "Quality Specialist",
      phone: "+48 123 456 777",
      email: "monika@company.com",
      image: "/team/Bartek.jpg",
      description: "Ensuring highest quality standards in all deliverables.",
    },
  ],
  Logistyka: [
    {
      id: 14,
      name: "Krzysztof Grabowski",
      role: "Logistics Manager",
      phone: "+48 123 456 776",
      email: "krzysztof@company.com",
      image: "/team/Robert.jpg",
      description: "Coordinating supply chain and delivery operations.",
    },
    {
      id: 15,
      name: "Dorota Pawlak",
      role: "Operations Coordinator",
      phone: "+48 123 456 775",
      email: "dorota@company.com",
      image: "/team/Bartek.jpg",
      description: "Streamlining operations and resource management.",
    },
    {
      id: 16,
      name: "Marcin Michalski",
      role: "Supply Chain Specialist",
      phone: "+48 123 456 774",
      email: "marcin@company.com",
      image: "/team/Robert.jpg",
      description: "Optimizing supply chain efficiency and cost-effectiveness.",
    },
  ],
};

export default function TeamSection() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const departmentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("Właściciele");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  const departments = Object.keys(teamData);

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
    setIsDropdownOpen(false);
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

  return (
    <div id="team" className="relative">
      {/* Main Content */}
      <div className="relative w-full px-2 lg:px-0">
        <StickyHeader
          className="top-0 z-0 text-left text-[4rem] text-white/20 lg:text-[5rem] xl:text-[12rem]"
          title="TEAM"
          delay={0.2}
        />

        {/* Title Section */}
        <FadeInView className="relative z-20 container mx-auto -mt-20">
          <div className="mx-auto mt-24 max-w-7xl lg:mt-10">
            <div
              ref={containerRef}
              className={`relative overflow-hidden px-4 pb-20 text-white transition-opacity duration-600 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
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

                {/* Mobile: Dropdown */}
                <div className="relative mx-auto w-full max-w-xs md:hidden">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="text-sm font-medium">
                      {selectedDepartment}
                    </span>
                    {isDropdownOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 left-0 z-20 mt-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                      {departments.map((department) => (
                        <button
                          key={department}
                          onClick={() => handleDepartmentChange(department)}
                          className={`w-full px-4 py-3 text-left text-sm transition-all duration-300 first:rounded-t-lg last:rounded-b-lg ${
                            selectedDepartment === department
                              ? "bg-white/20 text-white"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  )}
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
                        {teamData[department as keyof typeof teamData].map(
                          (member) => (
                            <Card
                              key={member.id}
                              className="group relative w-80 flex-shrink-0 overflow-hidden p-0 md:w-80"
                            >
                              {/* Image Section */}
                              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                                <Image
                                  src={member.image}
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
                                  <h4
                                    className={`${michroma.className} mb-1 text-lg font-medium text-white`}
                                  >
                                    {member.name}
                                  </h4>
                                  <p className="text-sm font-medium text-gray-400">
                                    {member.role}
                                  </p>
                                </div>

                                {/* Description */}
                                <p className="text-sm leading-relaxed text-gray-300">
                                  {member.description}
                                </p>

                                {/* Contact Info */}
                                <div className="space-y-2 border-t border-white/10 pt-2">
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {member.phone}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {member.email}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ),
                        )}
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
