"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
interface DropdownItem {
  href: string;
  label: string;
  description: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  isContact?: boolean;
}

const Dropdown = ({ label, items, isContact = false }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus:text-white focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onFocus={() => setIsOpen(true)}
        onBlur={(e) => {
          // Only close if focus is moving outside the dropdown
          if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
          }
        }}
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-1/2 z-50 transform border border-neutral-600 bg-black transition-all duration-300 ease-out ${
          isOpen
            ? "visible -translate-x-1/2 translate-y-0 scale-100 opacity-100"
            : "invisible -translate-x-1/2 translate-x-4 -translate-y-2 scale-95 opacity-0"
        } ${isContact ? "w-[300px]" : "w-[400px] md:w-[500px] lg:w-[600px]"}`}
      >
        <ul
          className={`grid gap-3 p-4 ${
            isContact ? "grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          {items.map((item, index) => (
            <li
              key={item.href}
              className={`transition-all duration-300 ease-out ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <Link
                href={item.href}
                className="block space-y-1 rounded-md p-3 leading-none text-stone-200 transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white focus:outline-none"
              >
                <div className="text-sm leading-none font-medium">
                  {item.label}
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
