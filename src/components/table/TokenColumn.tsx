"use client";

import { useState } from "react";
import Icons from "@/components/icons/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import TokenRow from "./TokenRow";

export default function TokenColumn({
  title,
  group,
}: {
  title: string;
  group: string;
}) {
  const [hoverMenu, setHoverMenu] = useState<null | "p1" | "p2" | "p3">(null);
  const [openModal, setOpenModal] = useState(false);

  const tokens = useSelector((s: RootState) =>
    s.tokens.tokens.filter((t) => t.group === group)
  );

  return (
    <>
      {/* COLUMN WRAPPER */}
      <div className="bg-[#0d0f12] rounded-xl border border-[#1a1a1a] p-2 flex flex-col gap-3 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between relative">
          <div className="text-lg font-semibold text-white">{title}</div>

          {/* P1 / P2 / P3 */}
          <div className="flex items-center gap-2">

            {/* ---------- P1 ---------- */}
            <div
              className="px-4 py-1 rounded-full bg-[#111318] text-gray-300 text-sm cursor-pointer hover:bg-[#1a1d24] relative"
              onMouseEnter={() => setHoverMenu("p1")}
              onMouseLeave={() => setHoverMenu(null)}
              onClick={() => setOpenModal(true)}
            >
              P1
              {hoverMenu === "p1" && <DropdownMenu />}
            </div>

            {/* ---------- P2 ---------- */}
            <div
              className="px-4 py-1 rounded-full bg-[#111318] text-gray-300 text-sm cursor-pointer hover:bg-[#1a1d24] relative"
              onMouseEnter={() => setHoverMenu("p2")}
              onMouseLeave={() => setHoverMenu(null)}
              onClick={() => setOpenModal(true)}
            >
              P2
              {hoverMenu === "p2" && <DropdownMenu />}
            </div>

            {/* ---------- P3 ---------- */}
            <div
              className="px-4 py-1 rounded-full bg-[#111318] text-gray-300 text-sm cursor-pointer hover:bg-[#1a1d24] relative"
              onMouseEnter={() => setHoverMenu("p3")}
              onMouseLeave={() => setHoverMenu(null)}
              onClick={() => setOpenModal(true)}
            >
              P3
              {hoverMenu === "p3" && <DropdownMenu />}
            </div>

          </div>
        </div>

        {/* TABLE CONTENT — SCROLLABLE */}
        <div
          className="
            flex-1 overflow-y-auto  custom-scroll
          "
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <div className="flex flex-col divide-y divide-[#1a1a1a]">
            {tokens.map((t) => (
              <TokenRow key={t.id} id={t.id} />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && <TradeModal onClose={() => setOpenModal(false)} />}
    </>
  );
}

/* ------------------------------------------------------
      DROPDOWN MENU (ON HOVER)
------------------------------------------------------- */
function DropdownMenu() {
  return (
    <div className="
      absolute left-1/2 -translate-x-1/2 mt-2 z-50
      w-40 bg-[#111318] border border-[#2a2d33] rounded-xl
      shadow-xl text-gray-300 text-sm py-2 space-y-2
    ">
      <MenuItem icon={<Icons.Run className="w-4 h-4" />} label="20%" />
      <MenuItem icon={<Icons.Gas className="w-4 h-4 text-yellow-300" />} label="0.001" highlight />
      <MenuItem icon={<Icons.Ring className="w-4 h-4" />} label="0.01" />
      <MenuItem icon={<Icons.Off className="w-4 h-4" />} label="Off" />
    </div>
  );
}

function MenuItem({ icon, label, highlight = false }: any) {
  return (
    <div
      className={`
        px-3 py-1 flex items-center gap-2 cursor-pointer 
        hover:bg-[#1a1d24] 
        ${highlight ? "text-yellow-300" : ""}
      `}
    >
      {icon}
      {label}
    </div>
  );
}

/* ------------------------------------------------------
      RESTORED ORIGINAL MODAL (NO CHANGES)
------------------------------------------------------- */
function TradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div
        className="
          relative z-50 w-[440px] rounded-2xl bg-[#0f1115]
          border border-[#1d1f23] p-6 shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-200 font-semibold text-lg">Trading Settings</div>
          <div
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            ✕
          </div>
        </div>

        {/* BUY / SELL */}
        <div className="flex items-center mb-5">
          <button className="
            flex-1 py-2 rounded-lg bg-[#1a1d24] 
            text-white font-semibold border border-[#2b2e36]
          ">
            Buy Settings
          </button>

          <button className="
            flex-1 py-2 rounded-lg ml-2 bg-[#0f1115]
            text-gray-400 border border-[#2b2e36]
          ">
            Sell Settings
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <FieldBlock label="SLIPPAGE" value="20%" />
          <FieldBlock label="PRIORITY" value="0.001" />
          <FieldBlock label="BRIBE" value="0.01" />
        </div>

        {/* AUTO FEE */}
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-300 text-sm">Auto Fee</span>

          <div className="flex-1" />

          <div className="
            bg-[#1a1d24] text-gray-500 text-sm px-3 py-2 rounded-lg
            border border-[#2a2d33]
          ">
            MAX FEE 0.1
          </div>
        </div>

        {/* MEV MODE */}
        <div className="text-gray-300 text-sm mb-2">MEV Mode</div>

        <div className="flex items-center gap-3 mb-4">
          <MevOption label="Off" active />
          <MevOption label="Reduced" />
          <MevOption label="Secure" />
        </div>

        {/* RPC INPUT */}
        <input
          placeholder="RPC https://...."
          className="
            w-full bg-[#0c0e12] text-gray-200 px-3 py-3
            rounded-lg border border-[#2a2d33] mb-5
          "
        />

        {/* CONTINUE BUTTON */}
        <button
          className="
            w-full py-3 font-semibold rounded-xl text-black
            bg-gradient-to-b from-[#7f94ff] to-[#4b5cff]
            shadow-lg
          "
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function FieldBlock({ label, value }: any) {
  return (
    <div
      className="
        bg-[#111318] border border-[#2b2e36] rounded-lg
        flex flex-col items-center justify-center py-3
      "
    >
      <div className="text-gray-400 text-xs">{label}</div>
      <div className="text-gray-200 font-semibold">{value}</div>
    </div>
  );
}

function MevOption({ label, active = false }: any) {
  return (
    <div
      className={`
        px-4 py-2 rounded-lg text-sm cursor-pointer border
        ${
          active
            ? "bg-[#1a1d24] text-[#5c6bff] border-[#3c42ff]"
            : "bg-[#111318] text-gray-400 border-[#2b2e36]"
        }
      `}
    >
      {label}
    </div>
  );
}
