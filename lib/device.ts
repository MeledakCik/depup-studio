"use client";

import { useSyncExternalStore } from "react";
import type { PlatformId } from "@/lib/products";

/** The visitor's operating system, or "other" (Linux, ChromeOS, unknown). The web version runs on all of them. */
export type DeviceId = Exclude<PlatformId, "web"> | "other";

interface UADataLike {
  platform?: string;
  mobile?: boolean;
}

export function detectDevice(): DeviceId {
  const nav = navigator as Navigator & { userAgentData?: UADataLike };
  const hint = nav.userAgentData?.platform?.toLowerCase() ?? "";
  const ua = nav.userAgent;

  // The UA string keeps the OS even in Chrome's reduced UA; the client hint is only a fallback.
  if (/Android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ reports itself as a Mac; a touch screen gives it away.
  if (/Macintosh/i.test(ua) && nav.maxTouchPoints > 1) return "ios";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
  if (/Windows/i.test(ua)) return "windows";
  if (/CrOS|Linux/i.test(ua)) return "other";
  if (hint === "android" || hint === "ios" || hint === "macos" || hint === "windows") return hint;
  return "other";
}

const subscribe = () => () => {};

/** Detected device on the client; null during server rendering and the first hydration pass. */
export function useDevice(): DeviceId | null {
  return useSyncExternalStore(subscribe, detectDevice, () => null);
}
