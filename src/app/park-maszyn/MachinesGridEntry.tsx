import MachinesGridDesktop from "./MachinesGrid";
import MachinesGridMobile from "./MachinesGridMobile";
import { useResponsive } from "../components/grid-studies/hooks/useResponsive";

export default function MachinesGridEntry() {
  const { isMobile } = useResponsive();
  return isMobile ? <MachinesGridMobile /> : <MachinesGridDesktop />;
}
