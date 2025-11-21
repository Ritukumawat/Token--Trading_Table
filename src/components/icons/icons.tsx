// src/components/icons/icons.tsx
"use client";
import React from "react";

export const Icons = {
  Leaf: ({ className = "", title = "Leaf" }: { className?: string; title?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <title>{title}</title>
      <path d="M3 21c6-5 9-9 18-18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 3c-5 6-9 9-18 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Profile: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Link: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 14l6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 20h-7a3 3 0 01-3-3V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Globe: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),

  Twitter: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M23 4.5a8.9 8.9 0 01-2.6.7A4.5 4.5 0 0016.5 3c-2.5 0-4.5 2.1-4.5 4.6 0 .36.04.71.12 1.05A12.8 12.8 0 013 4.9a4.6 4.6 0 001.4 6.1 4.3 4.3 0 01-2-.56v.06c0 2.2 1.6 4.1 3.8 4.5a4.6 4.6 0 01-2 .08 4.6 4.6 0 004.3 3.2 9.08 9.08 0 01-5.6 1.95c-.36 0-.72-.02-1.07-.06A12.8 12.8 0 008.5 21c8.1 0 12.6-6.7 12.6-12.5v-.56A8.9 8.9 0 0023 4.5z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Sparkline: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 8" fill="none" aria-hidden preserveAspectRatio="none">
      <polyline points="0,6 4,4 8,2 12,3 16,1 20,3 24,2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  Bolt: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Crown: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 20h20l-3-12-4 6-4-6-4 6-5-6-0 12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Dot: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 8 8" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  ),

  Check: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Search: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Candle: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="3" height="14" stroke="currentColor" strokeWidth="2"/>
      <rect x="10.5" y="3" width="3" height="18" stroke="currentColor" strokeWidth="2"/>
      <rect x="17" y="7" width="3" height="10" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  Trophy: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 4h8v2a4 4 0 004 4h0a4 4 0 01-4 4v2H8v-2a4 4 0 01-4-4h0a4 4 0 004-4V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="16" width="6" height="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),

  Activity: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Fire: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2C7 8 17 10 12 22c6-4 8-10 4-14-2-2-1-5 0-6-2 0-4 1-4 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Warning: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Run: ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
),

Gas: ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 21V3h9v18M9 7h2m-2 4h2m8 10v-9a2 2 0 00-2-2h-2V6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
),

Ring: ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
  </svg>
),

Off: ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 3l18 18M12 6v6M6 12a6 6 0 0010.4 4.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
),

};

export default Icons;
