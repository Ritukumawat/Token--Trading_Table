// src/app/pulse/page.tsx
import React from "react";
import TokenColumn from "@/components/table/TokenColumn";

export default function PulsePage() {
  return (
    <div className="p-4">
  <h1 className="text-2xl font-bold mb-4">Pulse</h1>

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">
    <TokenColumn title="New Pairs" group="new" />
    <TokenColumn title="Final Stretch" group="final" />
    <TokenColumn title="Migrated" group="migrated" />
  </div>
</div>

  );
}

