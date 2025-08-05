"use client";

import MachineCard from "./MachineCard";
import { machinesData } from "./machines-data";

export default function MachinesGrid() {
  return (
    <div className="grid gap-8 md:gap-12 lg:gap-16">
      {machinesData.map((machine) => (
        <div key={machine.id} className="w-full">
          <MachineCard machine={machine} />
        </div>
      ))}
    </div>
  );
}
