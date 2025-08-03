import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "group relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur transition-colors duration-300 hover:bg-white/5",
        className,
      )}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover Effect Corner */}
      <div className="absolute -top-12 -right-12 size-24 rotate-45 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
