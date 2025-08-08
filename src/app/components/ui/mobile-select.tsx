"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileSelectOption<T = string | number> {
  value: T;
  label: string;
  description?: string;
  meta?: any;
}

interface MobileSelectProps<T = string | number> {
  value: T;
  options: MobileSelectOption<T>[];
  onChange: (value: T, option: MobileSelectOption<T>) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  optionClassName?: string;
  renderOption?: (option: MobileSelectOption<T>, selected: boolean) => React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function MobileSelect<T = string | number>({
  value,
  options,
  onChange,
  placeholder = "Wybierz",
  className,
  buttonClassName,
  listClassName,
  optionClassName,
  renderOption,
  disabled = false,
  ariaLabel,
}: MobileSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => !disabled && setOpen((o) => !o);

  const handleSelect = (opt: MobileSelectOption<T>) => {
    onChange(opt.value, opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || placeholder}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-white backdrop-blur-sm transition-all duration-300 focus:outline-none",
          "active:scale-[0.99]",
          !disabled && "hover:bg-white/10",
          disabled && "cursor-not-allowed opacity-50",
          buttonClassName,
        )}
      >
        <span className={cn("text-sm font-medium", !current && "text-white/40")}>{current ? current.label : placeholder}</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-30 mt-1 origin-top overflow-hidden rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-200",
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0",
          listClassName,
        )}
        role="listbox"
      >
        <ul className="max-h-80 overflow-auto py-1">
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li key={String(opt.value)}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "w-full px-4 py-3 text-left text-sm transition-colors",
                    selected
                      ? "bg-white/15 font-semibold text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                    optionClassName,
                  )}
                >
                  {renderOption ? renderOption(opt, selected) : (
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.description && (
                        <span className="mt-0.5 text-[11px] font-normal text-white/50 line-clamp-2">{opt.description}</span>
                      )}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
