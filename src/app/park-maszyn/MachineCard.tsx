"use client";

import Image from "next/image";
import { Settings, Ruler, Building } from "lucide-react";

interface MachineCardProps {
  machine: {
    id: number;
    name: string;
    workArea: string;
    manufacturer: string;
    description: string;
    applications: string[];
    materials: string[];
    image: string;
  };
}

export default function MachineCard({ machine }: MachineCardProps) {
  return (
    <div className="overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
      {/* Mobile layout */}
      <div className="flex flex-col lg:hidden">
        {/* Image Section */}
        <div className="relative h-64 bg-stone-900/50">
          <Image
            src={machine.image}
            alt={machine.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h3 className="font-michroma mb-3 text-xl font-bold text-white">
              {machine.name}
            </h3>

            {/* Specs */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-stone-300">
                <Ruler className="h-4 w-4 text-stone-500" />
                <span className="text-sm text-stone-500">Pole robocze:</span>
                <span className="text-sm font-medium">{machine.workArea}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-300">
                <Building className="h-4 w-4 text-stone-500" />
                <span className="text-sm text-stone-500">Producent:</span>
                <span className="text-sm font-medium">
                  {machine.manufacturer}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-stone-300">
            {machine.description}
          </p>

          {/* Applications */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-stone-500" />
              <h4 className="text-sm font-semibold text-stone-200">
                Zastosowanie:
              </h4>
            </div>
            <ul className="space-y-1">
              {machine.applications.slice(0, 3).map((app, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-stone-400"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-600" />
                  {app}
                </li>
              ))}
              {machine.applications.length > 3 && (
                <li className="ml-3 text-xs text-stone-500">
                  +{machine.applications.length - 3} więcej...
                </li>
              )}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-stone-200">
              Materiały:
            </h4>
            <div className="flex flex-wrap gap-2">
              {machine.materials.slice(0, 6).map((material, index) => (
                <span
                  key={index}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-stone-400"
                >
                  {material}
                </span>
              ))}
              {machine.materials.length > 6 && (
                <span className="px-2 py-1 text-xs text-stone-500">
                  +{machine.materials.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout with fixed photo and scrollable content */}
      <div className="hidden h-full lg:flex">
        {/* Fixed Image Section */}
        <div className="relative w-1/2 bg-stone-900/50">
          <Image
            src={machine.image}
            alt={machine.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Scrollable Content Section */}
        <div className="w-1/2 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="font-michroma mb-3 text-2xl font-bold text-white">
              {machine.name}
            </h3>

            {/* Specs */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-stone-300">
                <Ruler className="h-4 w-4 text-stone-500" />
                <span className="text-sm text-stone-500">Pole robocze:</span>
                <span className="text-sm font-medium">{machine.workArea}</span>
              </div>

              <div className="flex items-center gap-2 text-stone-300">
                <Building className="h-4 w-4 text-stone-500" />
                <span className="text-sm text-stone-500">Producent:</span>
                <span className="text-sm font-medium">
                  {machine.manufacturer}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-stone-300">
            {machine.description}
          </p>

          {/* Applications */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-stone-500" />
              <h4 className="text-sm font-semibold text-stone-200">
                Zastosowanie:
              </h4>
            </div>
            <ul className="space-y-1">
              {machine.applications.slice(0, 3).map((app, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-stone-400"
                >
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-stone-600" />
                  {app}
                </li>
              ))}
              {machine.applications.length > 3 && (
                <li className="ml-3 text-xs text-stone-500">
                  +{machine.applications.length - 3} więcej...
                </li>
              )}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-stone-200">
              Materiały:
            </h4>
            <div className="flex flex-wrap gap-2">
              {machine.materials.slice(0, 6).map((material, index) => (
                <span
                  key={index}
                  className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-stone-400"
                >
                  {material}
                </span>
              ))}
              {machine.materials.length > 6 && (
                <span className="px-2 py-1 text-xs text-stone-500">
                  +{machine.materials.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
