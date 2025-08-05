"use client";

import MachineCard from "./MachineCard";
import { machinesData } from "./machines-data";

export default function MachinesGrid() {
  return (
    <div className="grid gap-8 md:gap-12 lg:gap-16">
      {/* Mobile layout */}
      <div className="block lg:hidden">
        {machinesData.map((machine) => (
          <div key={machine.id} className="w-full">
            <MachineCard machine={machine} />
          </div>
        ))}
      </div>

      {/* Desktop layout with fixed height and snap scrolling */}
      <div className="hidden lg:block">
        <div className="h-screen snap-y snap-mandatory overflow-y-auto">
          {machinesData.map((machine) => (
            <div key={machine.id} className="h-screen snap-start">
              <MachineCard machine={machine} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
