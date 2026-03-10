"use client";

import * as React from "react";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label className="text-xs font-semibold text-app-muted">{label}</label>
      {children}
    </div>
  );
}
