"use client";
import { useState } from "react";

export default function TokenColumnHeader({ title }: { title: string }) {
  const [tab, setTab] = useState("P2");

  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <h2 className="font-semibold text-lg">{title}</h2>

      {/* Axiom segmented control */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[#111216] border border-[#1e1f22] rounded-full px-1 py-0.5 h-8">
          {["P1", "P2", "P3"].map((p) => (
            <button
              key={p}
              onClick={() => setTab(p)}
              className={`px-3 py-1 rounded-full text-sm transition 
                ${tab === p ? "bg-white text-black font-semibold" : "text-gray-400"}
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
