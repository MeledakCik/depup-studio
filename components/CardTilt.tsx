"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function CardTilt({ children, className = "", style }: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-tilting");
    card.parentElement?.classList.remove("is-hover");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const wrapper = event.currentTarget;
    const card = cardRef.current;
    if (!card) return;
    const rect = wrapper.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    wrapper.classList.add("is-hover");
    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-ry", `${((px - 0.5) * 4).toFixed(2)}deg`);
    card.style.setProperty("--tilt-rx", `${((0.5 - py) * 4).toFixed(2)}deg`);
    card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
  };

  return (
    <div className="t-tilt h-full" onPointerMove={track} onPointerLeave={reset}>
      <div ref={cardRef} className={`t-tilt-card ${className}`} style={style}>
        {children}
        <span className="t-tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
