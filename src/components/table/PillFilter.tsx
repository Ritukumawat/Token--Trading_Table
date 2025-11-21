'use client'
import { useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // adjust path if your shadcn exports live elsewhere

type PillFilterProps = {
  label: string;
  items?: string[];
  onSelect?: (value: string) => void;
  className?: string;
};

export default function PillFilter({
  label,
  items = ["Filter A", "Filter B", "Filter C"],
  onSelect,
  className = "",
}: PillFilterProps) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<number | null>(null);

  // open on hover, but keep keyboard/click accessible
  function handleMouseEnter() {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setOpen(true);
  }
  function handleMouseLeave() {
    // short delay to avoid flicker when moving pointer quickly
    hoverTimer.current = window.setTimeout(() => setOpen(false), 120);
  }

  return (
    <DropdownMenu open={open} onOpenChange={(v) => setOpen(v)}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`inline-block ${className}`}
      >
        <DropdownMenuTrigger asChild>
          <button
            aria-haspopup="menu"
            aria-expanded={open}
            className="px-2 py-0.5 text-xs rounded-md bg-[#1e2026] hover:bg-[#272a30] transition flex items-center gap-2"
          >
            <span className="font-medium text-sm leading-none">{label}</span>
            {/* small caret */}
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
              aria-hidden
            >
              <path d="M1 1.5L5 5.5L9 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="center"
          className="bg-[#15171c] border border-[#2b2e36] text-white text-sm p-1 rounded-md min-w-[140px] shadow-lg"
        >
          {items.map((it) => (
            <DropdownMenuItem
              key={it}
              onSelect={() => onSelect?.(it)}
              className="px-3 py-1 rounded-sm hover:bg-[#1b1d24] cursor-pointer"
            >
              {it}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
