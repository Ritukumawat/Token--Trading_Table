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

  // PRICE FLASH
  useEffect(() => {
    if (!token) return;
    if (token.prevPrice == null) return;

    if (token.price > token.prevPrice) {
      setFlash("up");
      setTimeout(() => setFlash(null), 600);
    } else if (token.price < token.prevPrice) {
      setFlash("down");
      setTimeout(() => setFlash(null), 600);
    }
  }, [token?.price]);

  if (!token) return null;

  const imgSrc = token.image ?? `https://picsum.photos/seed/${token.id}/120/120`;
  const mc = Math.round(token.price * token.volume);
  const mcLabel = mc >= 1000 ? `${(mc / 1000).toFixed(1)}K` : mc;
  const volLabel = token.volume >= 1000 ? `${Math.round(token.volume / 1000)}K` : token.volume;
  const pct = token.change24h ?? 0;
  const txCount = Math.max(1, Math.round((token.volume ?? 0) / 10));

  return (
    <TooltipProvider>
      <div
        className={`flex gap-3 p-3 rounded-lg items-start transition-colors duration-150 border-b border-[rgba(255,255,255,0.03)]
          ${flash === "up" ? "bg-[rgba(6,176,37,0.04)]" : ""}
          ${flash === "down" ? "bg-[rgba(255,24,84,0.04)]" : ""}
        `}
      >
        {/* ====================== IMAGE ====================== */}
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

          {/* Image Glow Frame */}
          <div
            className="absolute inset-0 rounded-md pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0 0 3px rgba(6,176,37,0.12), 0 0 0 2px rgba(0,0,0,0.7)",
            }}
          />

          {/* Verified Badge */}
          <div className="absolute -right-2 bottom-[-6px]">
            <div className="w-8 h-8 rounded-full bg-[#0f1113] flex items-center justify-center border-2 border-emerald-400 shadow-[0_6px_18px_rgba(6,176,37,0.12)]">
              <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* HOVER PREVIEW */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute inset-0 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent className="p-2 bg-[#15171c] border border-[#2b2e36] rounded-md">
              <div className="w-48">
                <img
                  src={imgSrc}
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

        {/* ====================== CONTENT ====================== */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* NAME + MC */}
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl truncate">{token.name}</span>
                <span className="text-sm text-gray-400">{token.symbol}</span>
                <Icons.Link className="w-4 h-4 text-gray-300" />
              </div>

              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="text-emerald-400">{token.age ?? "35s"}</span>

                <div className="flex items-center gap-1 text-gray-300">
                  <Icons.Profile className="w-4 h-4" />
                  <span>{token.holders ?? 46}</span>
                </div>

                <Icons.Search className="w-4 h-4 opacity-80 hover:text-sky-400 cursor-pointer" />
                <Icons.Globe className="w-4 h-4 hover:text-sky-400 cursor-pointer" />

                <Icons.Crown className="w-4 h-4 text-yellow-400" />
              </div>
            </div>

            {/* MC BLOCK */}
            <div className="text-right min-w-[90px]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-gray-400 cursor-default">MC</div>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 text-xs bg-[#15171c]">
                  Market Cap
                </TooltipContent>
              </Tooltip>

              <div className="text-xl font-semibold text-sky-400">
                ${mcLabel}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-sm text-gray-200 cursor-default mt-1">
                    ${volLabel}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-1 text-xs bg-[#15171c]">
                  Volume
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* BADGE ROW */}
          <div className="flex items-center gap-3 mt-2">
            <div className="px-2 py-0.5 rounded-full bg-[rgba(255,0,55,0.08)] text-rose-400 border border-[rgba(255,0,55,0.15)] text-xs flex items-center gap-1">
              <Icons.Dot className="w-2 h-2" />
              {pct}%
            </div>

            <div className="px-2 py-0.5 rounded-full bg-[#0f1220] text-blue-300 text-xs border border-[rgba(255,255,255,0.08)]">
              DS <span className="text-gray-400">6h</span>
            </div>

            <div className="px-2 py-0.5 rounded-full bg-[rgba(255,0,55,0.06)] text-rose-400 border border-[rgba(255,0,55,0.12)] text-xs">
              39%
            </div>

            <div className="px-2 py-0.5 rounded-full bg-[rgba(6,176,37,0.06)] text-emerald-400 border border-[rgba(6,176,37,0.12)] text-xs">
              0%
            </div>

            <div className="ml-auto text-right text-xs text-gray-400">
              V
              <div className="text-gray-200">${volLabel}</div>
            </div>
          </div>

          {/* ===================== BOTTOM ROW ====================== */}
          <div className="flex items-center gap-3 mt-3">

            <span className="text-xs text-gray-400">Dq7s…pump</span>

            <span className="text-xs text-gray-400 ml-2">
              F <span className="text-gray-200">0.026</span>
            </span>

            <span className="text-xs text-gray-400">
              TX {txCount}
            </span>

            {/* FIXED PREMIUM LINE (NO MULTILINE!!) */}
            <div className="flex-1 px-4">
              <div className="relative h-1 rounded-full overflow-hidden bg-[#0f1113]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0ee676 0%, #ff1f4d 100%)",
                    opacity: 0.35,
                  }}
                />
                <div className="absolute top-0 h-full rounded-full animate-[pulseLine_3s_ease-in-out_infinite]" />
              </div>
            </div>

            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-black"
              style={{
                background: "linear-gradient(180deg,#8098ff 0%, #4b5cff 100%)",
                boxShadow: "0 6px 18px rgba(75,92,255,0.18)",
              }}
            >
              <Icons.Bolt className="w-4 h-4" />
              0 SOL
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style jsx>{`
        @keyframes pulseLine {
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
