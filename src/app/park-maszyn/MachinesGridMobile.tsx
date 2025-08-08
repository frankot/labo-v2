import React from "react";
import { machinesData, Machine } from "./machines-data";
import MachineCard from "./MachineCard";
import { motion, AnimatePresence } from "framer-motion";
import MobileSelect, {
  MobileSelectOption,
} from "@/app/components/ui/mobile-select";

// Dropdown menu styled like Card
import { useState } from "react";

// Removed old MachinePicker in favor of shared MobileSelect component

const MachinesGridMobile = () => {
  const [selectedId, setSelectedId] = useState<number>(machinesData[0]?.id);
  const selectedMachine = machinesData.find(
    (m: Machine) => m.id === selectedId,
  );

  return (
    <div>
      <div className="mb-6">
        <MobileSelect<number>
          value={selectedId}
          options={machinesData.map(
            (m) =>
              ({
                value: m.id,
                label: m.shortName,
                description: m.name,
                meta: m,
              }) as MobileSelectOption<number>,
          )}
          onChange={(val) => setSelectedId(val)}
          placeholder="Wybierz maszynę"
          ariaLabel="Wybierz maszynę"
        />
      </div>
      <div style={{ marginTop: 24 }}>
        <AnimatePresence mode="wait">
          {selectedMachine && (
            <motion.div
              key={selectedMachine.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <MachineCard machine={selectedMachine} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MachinesGridMobile;
