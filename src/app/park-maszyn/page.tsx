"use client";

import MachinesGrid from "./MachinesGrid";

export default function ParkMaszynPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="mb-16 text-center">
          <h1 className="font-michroma mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            PARK MASZYN
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-stone-400">
            Nowoczesne plotery frezujące CNC do precyzyjnej obróbki różnorodnych
            materiałów
          </p>
        </div> */}

        {/* Machines Grid */}
        <MachinesGrid />
      </div>
    </main>
  );
}
