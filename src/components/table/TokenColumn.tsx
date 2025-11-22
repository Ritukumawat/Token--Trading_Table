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
  const [hoverMenu, setHoverMenu] = useState<"p1" | "p2" | "p3" | null>(null);
  const [openModal, setOpenModal] = useState<"p1" | "p2" | "p3" | null>(null);

  const tokens = useSelector((s: RootState) =>
    s.tokens.tokens.filter((t) => t.group === group)
  );

  return (
    <>
      {/* COLUMN WRAPPER */}
      <div className="bg-[#0d0f12] rounded-xl border border-[#1a1a1a] p-3 flex flex-col gap-3 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between relative">
          <div className="text-lg font-semibold text-white">{title}</div>

          {/* P1 / P2 / P3 */}
          <div className="flex items-center gap-2">

            {/* ---------- P BUTTON TEMPLATE ---------- */}
            <PillButton
              label="P1"
              id="p1"
              hoverMenu={hoverMenu}
              setHoverMenu={setHoverMenu}
              setOpenModal={setOpenModal}
            />

            <PillButton
              label="P2"
              id="p2"
              hoverMenu={hoverMenu}
              setHoverMenu={setHoverMenu}
              setOpenModal={setOpenModal}
            />

            <PillButton
              label="P3"
              id="p3"
              hoverMenu={hoverMenu}
              setHoverMenu={setHoverMenu}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>

        {/* TABLE CONTENT — SCROLLABLE */}
        <div
          className="flex-1 overflow-y-auto custom-scroll"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          <div className="flex flex-col divide-y divide-[#1a1a1a]">
            {tokens.map((t) => (
              <TokenRow key={t.id} id={t.id} />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL (shared for P1, P2, P3) */}
      {openModal && (
        <TradeModal
          mode={openModal}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------
      PILL BUTTON (P1 / P2 / P3)
------------------------------------------------------- */
function PillButton({
  label,
  id,
  hoverMenu,
  setHoverMenu,
  setOpenModal,
}: any) {
  return (
    <div
      className="px-4 py-1 rounded-full bg-[#111318] text-gray-300 text-sm cursor-pointer hover:bg-[#1a1d24] relative"
      onMouseEnter={() => setHoverMenu(id)}
      onMouseLeave={() => setHoverMenu(null)}
      onClick={() => setOpenModal(id)}
    >
      {label}

      {/* Dropdown */}
      <DropdownMenu visible={hoverMenu === id} />
    </div>
  );
}

/* ------------------------------------------------------
      DROPDOWN MENU (controlled visible)
------------------------------------------------------- */
function DropdownMenu({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
        w-40 bg-[#111318] border border-[#2a2d33] rounded-xl
        shadow-xl text-gray-300 text-sm py-2 space-y-2
      "
    >
      <DropdownItem
        icon={<Icons.Run className="w-4 h-4" />}
        label="20%"
      />
      <DropdownItem
        icon={<Icons.Gas className="w-4 h-4 text-yellow-300" />}
        label="0.001"
        highlight
      />
      <DropdownItem
        icon={<Icons.Ring className="w-4 h-4" />}
        label="0.01"
      />
      <DropdownItem
        icon={<Icons.Off className="w-4 h-4" />}
        label="Off"
      />
    </div>
  );
}

function DropdownItem({ icon, label, highlight = false }: any) {
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
      TRADE MODAL (shared for P1/P2/P3)
------------------------------------------------------- */
function TradeModal({
  onClose,
  mode,
}: {
  onClose: () => void;
  mode: "p1" | "p2" | "p3";
}) {
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
          <div className="text-gray-200 font-semibold text-lg">
            {mode.toUpperCase()} Settings
          </div>
          <div
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-white"
          >
            ✕
          </div>
        </div>

        <div className="text-gray-400 mb-5">
          Configure {mode.toUpperCase()} trading rules.
        </div>

        {/* MOCK CONTENT */}
        <div className="flex flex-col gap-4">
          <div className="p-3 bg-[#111318] rounded-lg border border-[#2b2e36]">
            Slippage: <span className="text-white font-semibold">20%</span>
          </div>
          <div className="p-3 bg-[#111318] rounded-lg border border-[#2b2e36]">
            Priority: <span className="text-white font-semibold">0.001</span>
          </div>
          <div className="p-3 bg-[#111318] rounded-lg border border-[#2b2e36]">
            Bribe: <span className="text-white font-semibold">0.01</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="
            w-full mt-5 py-3 font-semibold rounded-xl text-black
            bg-gradient-to-b from-[#7f94ff] to-[#4b5cff]
            shadow-lg
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
