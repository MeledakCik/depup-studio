"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-primary"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden="true" /> Cetak / simpan PDF
    </button>
  );
}
