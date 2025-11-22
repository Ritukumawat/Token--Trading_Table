// src/components/table/TokenRow.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Icons from "@/components/icons/icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

type Props = { id: string };

export default function TokenRow({ id }: Props) {
  const token = useSelector((s: RootState) =>
    s.tokens.tokens.find((t) => t.id === id)
  );

  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (!token) return;
    if (token.prevPrice == null) return;
    if (token.price > token.prevPrice) {
      setFlash("up");
      const t = setTimeout(() => setFlash(null), 650);
      return () => clearTimeout(t);
    }
    if (token.price < token.prevPrice) {
      setFlash("down");
      const t = setTimeout(() => setFlash(null), 650);
      return () => clearTimeout(t);
    }
  }, [token?.price, token?.prevPrice]);

  if (!token) return null;

  const mc = Math.round(token.price * token.volume);
  const mcLabel = mc >= 1000 ? `${(mc / 1000).toFixed(1)}K` : `${mc}`;
  const volLabel =
    token.volume >= 1000
      ? `${Math.round(token.volume / 1000)}K`
      : `${Math.round(token.volume)}`;
  const txCount = Math.max(1, Math.round((token.volume ?? 0) / 10));
  const pct = token.change24h ?? 0;

  const imgSrc =
    token.image ?? `https://picsum.photos/seed/${token.id}/120/120`;

  return (
    <TooltipProvider delayDuration={60}>
      <div
        className={`flex gap-3 p-3 rounded-lg items-start transition-colors duration-150
          ${
            flash === "up" ? "bg-[rgba(6,176,37,0.04)]" : ""
          } ${flash === "down" ? "bg-[rgba(255,24,84,0.04)]" : ""}
          border-b border-[rgba(255,255,255,0.03)]
        `}
      >
        {/* IMAGE */}
        <div className="relative flex-shrink-0 w-[72px] h-[72px]">
          <div
            className="rounded-md overflow-hidden w-full h-full"
            style={{ boxShadow: "0 0 0 2px rgba(10,12,14,0.95)" }}
          >
            <img
              src={imgSrc}
              alt={token.name}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.currentTarget.src = `https://picsum.photos/seed/fallback${id}/120/120`)
              }
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 rounded-md"
            style={{
              boxShadow:
                "inset 0 0 0 3px rgba(6,176,37,0.12), 0 0 0 2px rgba(0,0,0,0.7)",
            }}
          />

          {/* CHECK BADGE */}
          <div className="absolute -right-2 bottom-[-6px]">
            <div className="w-8 h-8 rounded-full bg-[#0f1113] flex items-center justify-center border-2 border-emerald-400 shadow-[0_6px_18px_rgba(6,176,37,0.12)]">
              <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* HOVER PREVIEW */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute inset-0" aria-hidden />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="p-2 bg-[#15171c] border border-[#2b2e36] rounded-md shadow-lg"
            >
              <div className="w-48">
                <img
                  src={imgSrc}
                  alt={token.name}
                  className="w-full h-36 object-cover rounded-md"
                />
                <div className="mt-2 text-sm">
                  <div className="font-semibold">{token.name}</div>
                  <div className="text-xs text-gray-300">MC ${mcLabel}</div>
                  <div className="text-xs text-gray-300">Vol ${volLabel}</div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* ================= LEFT SIDE TEXT ================= */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* NAME + MC */}
          <div className="flex items-start gap-3">
            <div className="min-w-0">
              {/* Top row */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-xl truncate">
                  {token.name}
                </span>
                <span className="text-sm text-gray-400 truncate">
                  {token.symbol}
                </span>
                <Icons.Link className="w-4 h-4 text-gray-300 ml-1" />
              </div>

              {/* ICONS row (hover → blue) */}
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-emerald-400">
                  {token.age ?? "35s"}
                </span>

                {/* HOLDERS */}
                <div className="flex items-center gap-1 text-gray-300">
                  <Icons.Profile className="w-4 h-4" />
                  <span>{token.holders ?? 46}</span>
                </div>

                {/* SEARCH (hover blue) */}
                <Icons.Search className="w-4 h-4 opacity-80 hover:text-sky-400 transition" />

                {/* GLOBE (hover blue) */}
                <Icons.Globe className="w-4 h-4 hover:text-sky-400 transition" />

                {/* SNIPER icon → tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer">
                      <Icons.Crown className="w-4 h-4 text-yellow-400 hover:text-sky-400 transition" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="px-3 py-1 bg-[#15171c] text-white border border-[#2b2e36] rounded-md text-xs"
                  >
                    Sniper Holding
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* MC + V BLOCK */}
            <div className="flex-1" />

            <div className="text-right min-w-[92px]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-gray-400 cursor-default">
                    MC
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-[#15171c] border border-[#2b2e36] text-white text-xs px-3 py-1 rounded-md"
                >
                  Market Cap
                </TooltipContent>
              </Tooltip>

              <div className="text-sky-400 font-semibold text-xl">
                ${mcLabel}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mt-1 text-white text-sm cursor-default">
                    ${volLabel}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-[#15171c] border border-[#2b2e36] text-white text-xs px-3 py-1 rounded-md"
                >
                  Volume
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* BADGES ROW */}
          <div className="flex items-center gap-3 mt-1 text-gray-300 flex-wrap">
            {/* RED % with tooltip → Bundle Holding */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-0.5 rounded-full bg-[rgba(255,0,55,0.08)] text-rose-400 border border-[rgba(255,0,55,0.15)] text-xs flex items-center gap-1 cursor-default">
                  <Icons.Dot className="w-2 h-2" />
                  {pct}%
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#15171c] text-white border border-[#2b2e36] px-3 py-1 rounded-md text-xs"
              >
                Bundle Holding
              </TooltipContent>
            </Tooltip>

            {/* DS badge */}
            <div className="px-2 py-0.5 rounded-full bg-[#0f1220] text-blue-300 border border-[rgba(255,255,255,0.05)] text-xs flex items-center gap-1">
              <Icons.Crown className="w-3 h-3" />
              DS <span className="text-gray-400">6h</span>
            </div>

            {/* 39% bubble → tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-0.5 rounded-full bg-[rgba(255,0,55,0.06)] text-rose-400 border border-[rgba(255,0,55,0.15)] text-xs cursor-default">
                  39%
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#15171c] text-white border border-[#2b2e36] px-3 py-1 rounded-md text-xs"
              >
                Bundle Holding
              </TooltipContent>
            </Tooltip>

            {/* green 0% → Insider Holding */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-0.5 rounded-full bg-[rgba(6,176,37,0.06)] text-emerald-400 border border-[rgba(6,176,37,0.15)] text-xs cursor-default">
                  0%
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-[#15171c] text-white border border-[#2b2e36] px-3 py-1 rounded-md text-xs"
              >
                Insider Holding
              </TooltipContent>
            </Tooltip>

            {/* right aligned V */}
            <div className="ml-auto text-right">
              <div className="text-xs text-gray-500">V</div>
              <div className="text-gray-200">${Math.round(token.volume)}</div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex items-center gap-3 mt-3">
            <div className="text-xs text-gray-400 truncate">
              Dq7s...pump
            </div>

            {/* F + TX with tooltips */}
            <div className="flex items-center gap-3 text-xs text-gray-400 ml-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default">F</span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-[#15171c] text-white border border-[#2b2e36] px-3 py-1 rounded-md text-xs"
                >
                  Global Fees Paid
                </TooltipContent>
              </Tooltip>

              <span className="text-gray-200">0.026</span>

              {/* TX tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-default">TX {txCount}</span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-[#15171c] text-white border border-[#2b2e36] px-3 py-1 rounded-md text-xs"
                >
                  Transactions
                </TooltipContent>
              </Tooltip>
            </div>

{/* NEW PREMIUM PULSE BAR */}
<div className="flex-1 px-4">
  <div className="relative h-1 rounded-full overflow-hidden bg-[#0f1113]">
    
    {/* static gradient */}
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: "linear-gradient(90deg, #0ee676 0%, #ff1f4d 100%)",
        opacity: 0.35,
      }}
    />

    {/* gentle breathing pulse */}
    <div
      className="
        absolute top-0 h-full rounded-full 
        animate-[pulseLine_3s_ease-in-out_infinite]
      "
      
    />
  </div>
</div>




            {/* SOL button */}
            <div className="flex-shrink-0">
              <button
                className="flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-black"
                style={{
                  background:
                    "linear-gradient(180deg,#8098ff 0%, #4b5cff 100%)",
                  boxShadow: "0 6px 18px rgba(75,92,255,0.18)",
                }}
              >
                <Icons.Bolt className="w-4 h-4" />
                <span>0 SOL</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KEYFRAMES */}
      <style jsx>{`
        @keyframes tug {
          0% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(45%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </TooltipProvider>
  );
}
