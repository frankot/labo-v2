"use client";

import { ChevronDown } from "lucide-react";

interface ScrollArrowProps {
  show: boolean;
  onClick: () => void;
}

const ScrollArrow = ({ show, onClick }: ScrollArrowProps) => {
  return (
    <div
      className={`fixed right-[48%] bottom-6 z-50 transition-all duration-500 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-5 opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Przewiń do następnej sekcji"
        className="animate-bounce-custom cursor-pointer"
        onClick={onClick}
        style={{
          animation: show ? "bounce-custom 2s infinite ease-in-out" : "none",
        }}
      >
        <ChevronDown className="size-14 text-white/70 drop-shadow-lg transition-colors duration-300 hover:text-white" />
      </button>

      <style jsx global>{`
        @keyframes bounce-custom {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollArrow;
