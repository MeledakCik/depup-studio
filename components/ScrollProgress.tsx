"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let frame = 0;

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const range = document.documentElement.scrollHeight - window.innerHeight;
        const progress = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
        bar.style.transform = `scaleX(${progress})`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const contentObserver = new ResizeObserver(update);
    contentObserver.observe(document.documentElement);
    if (document.body) contentObserver.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      contentObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={progressRef} className="studio-scroll-progress" aria-hidden="true" />;
}
