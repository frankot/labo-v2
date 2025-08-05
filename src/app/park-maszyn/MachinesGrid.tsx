"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Settings, Ruler, Building, ChevronDown } from "lucide-react";
import MachineCard from "./MachineCard";
import Card from "../components/ui/card";
import { FadeInView, AnimatedText } from "../anim";
import { machinesData } from "./machines-data";

export default function MachinesGrid() {
  const [currentMachineIndex, setCurrentMachineIndex] = useState(0);
  const [mobileMachineIndex, setMobileMachineIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const machineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToMachine = (index: number) => {
    const element = machineRefs.current[index];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Find which machine is currently in view
      let currentIndex = 0;
      machineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const isInView =
            rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2;
          if (isInView) {
            currentIndex = index;
          }
        }
      });

      setCurrentMachineIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="relative">
      {/* Hero Image Section */}
      <FadeInView className="relative h-[30vh] w-full">
        <Image
          src="/scene.jpg"
          alt="Park maszyn - zaawansowane technologie produkcyjne"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
      </FadeInView>

      {/* Main Content */}
      <div className="relative w-full">
        {/* Title Section */}
        <FadeInView className="relative z-20 -mt-16">
          <div className="mx-auto mt-20 max-w-7xl lg:mt-8">
            <div className="mx-2 md:mx-0">
              <Card className="cursor-default">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
                  {/* Header - 1/3 width */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      <h2 className="font-michroma text-2xl font-bold text-white lg:text-3xl">
                        <AnimatedText text="PARK MASZYN" delay={0.1} />
                      </h2>
                      <h3 className="font-michroma text-lg font-semibold text-stone-200 lg:text-xl">
                        <AnimatedText
                          text="Zaawansowane technologie produkcyjne"
                          delay={0.2}
                        />
                      </h3>
                    </div>
                  </div>

                  {/* Paragraph - 2/3 width */}
                  <div className="lg:col-span-2">
                    <div className="space-y-4 text-lg leading-relaxed text-stone-300">
                      <p>
                        <AnimatedText
                          text="Dysponujemy nowoczesnym parkiem maszynowym, który umożliwia nam realizację projektów na najwyższym poziomie. Nasze zaawansowane technologie produkcyjne pozwalają na precyzyjne wykonanie elementów scenograficznych z różnorodnych materiałów."
                          delay={0.3}
                        />
                      </p>
                      <p>
                        <AnimatedText
                          text="Od cięcia CNC po druk 3D - każda maszyna została dobrana pod kątem maksymalnej jakości i efektywności produkcji, zapewniając naszym klientom doskonałe rezultaty."
                          delay={0.5}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </FadeInView>

        {/* Machines Grid Section */}
        <div className="mt-16 grid gap-8 md:gap-12 lg:gap-16">
          {/* Mobile layout */}
          <div className="block lg:hidden">
            {/* Fixed Dropdown Controller */}
            <div className="fixed top-0 right-0 left-0 z-50 w-3/4 rounded-br-lg border-b border-white/10 bg-black/60 backdrop-blur-sm">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between p-4 text-white"
                >
                  <div>
                    <div className="font-michroma text-sm font-bold">
                      {machinesData[mobileMachineIndex].shortName}
                    </div>
                    <div className="text-xs text-stone-400">
                      {mobileMachineIndex + 1} / {machinesData.length}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 left-0 max-h-60 overflow-y-auto border-b border-white/10 bg-stone-900">
                    {machinesData.map((machine, index) => (
                      <button
                        key={machine.id}
                        onClick={() => {
                          setMobileMachineIndex(index);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full border-b border-white/5 px-4 py-3 text-left transition-colors last:border-b-0 ${
                          index === mobileMachineIndex
                            ? "bg-white/10 text-white"
                            : "text-stone-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="font-michroma text-sm font-bold">
                          {machine.shortName}
                        </div>
                        <div className="mt-1 text-xs text-stone-400">
                          {machine.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Machine Content with top padding to account for fixed header */}
            <div className="pt-20">
              <MachineCard machine={machinesData[mobileMachineIndex]} />
            </div>
          </div>

          {/* Fixed Horizontal Controller for Desktop */}
          <div className="fixed right-0 bottom-0 left-0 z-50 mt-20 hidden lg:block">
            <div className="mx-auto w-fit max-w-7xl px-4">
              <div className="flex justify-center space-x-2 rounded-lg border border-white/10 bg-black/80 p-2 backdrop-blur-sm lg:space-x-4">
                {machinesData.map((machine, index) => (
                  <button
                    key={machine.id}
                    onClick={() => scrollToMachine(index)}
                    className={`rounded border px-4 py-2 text-center transition-all duration-200 ${
                      index === currentMachineIndex
                        ? "border-white/30 bg-white/10 text-white"
                        : "border-white/10 bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="font-michroma text-sm font-bold">
                      {machine.shortName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Machines Content */}
          <div className="hidden lg:block">
            <div className="space-y-24">
              {machinesData.map((machine, index) => (
                <div
                  key={machine.id}
                  ref={(el) => {
                    machineRefs.current[index] = el;
                  }}
                  className="relative"
                >
                  {/* Minimalistic divider above each card except the first */}
                  {index > 0 && (
                    <div className="mb-16 flex justify-center">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  )}
                  <div className="flex items-center">
                    {/* Floating Photo */}
                    <div className="absolute left-8 z-10 h-3/4 w-2/5">
                      <div className="relative h-full w-full">
                        <Image
                          src={machine.image}
                          alt={machine.name}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    {/* Machine Details Card */}
                    <div className="ml-auto w-3/5 p-8">
                      <Card className="h-fit">
                        <div className="space-y-6">
                          {/* Header */}
                          <div>
                            <h3 className="font-michroma mb-3 text-2xl font-bold text-white">
                              {machine.name}
                            </h3>

                            {/* Specs */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-stone-300">
                                <Ruler className="h-4 w-4 text-stone-500" />
                                <span className="text-sm text-stone-500">
                                  Pole robocze:
                                </span>
                                <span className="text-sm font-medium">
                                  {machine.workArea}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-stone-300">
                                <Building className="h-4 w-4 text-stone-500" />
                                <span className="text-sm text-stone-500">
                                  Producent:
                                </span>
                                <span className="text-sm font-medium">
                                  {machine.manufacturer}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm leading-relaxed text-stone-300">
                            {machine.description}
                          </p>

                          {/* Applications */}
                          <div>
                            <div className="mb-3 flex items-center gap-2">
                              <Settings className="h-4 w-4 text-stone-500" />
                              <h4 className="text-sm font-semibold text-stone-200">
                                Zastosowanie:
                              </h4>
                            </div>
                            <ul className="space-y-1">
                              {machine.applications.map((app, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2 text-xs text-stone-400"
                                >
                                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-600" />
                                  {app}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Materials */}
                          <div>
                            <h4 className="mb-3 text-sm font-semibold text-stone-200">
                              Materiały:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {machine.materials.map((material, index) => (
                                <span
                                  key={index}
                                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-stone-400"
                                >
                                  {material}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
