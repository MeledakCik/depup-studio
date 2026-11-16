"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "left" | "right" | "scale";
}

export function ScrollReveal({ children, className = "", delay = 0, variant = "rise" }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [visibility, setVisibility] = useState<"pending" | "hidden" | "shown">("pending");

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    document.documentElement.dataset.scrollMotionReady = "true";

    if (!("IntersectionObserver" in window)) {
      setVisibility("shown");
      return;
    }

    if (element.getBoundingClientRect().top < window.innerHeight * 0.86) {
      setVisibility("shown");
      return;
    }

    setVisibility("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const reachedRevealLine = entry.boundingClientRect.top < window.innerHeight * 0.88;
        if (!entry.isIntersecting && !reachedRevealLine) return;
        setVisibility("shown");
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px 10% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className}${visibility === "shown" ? " is-shown" : ""}`}
      data-scroll-reveal={visibility}
      data-scroll-reveal-variant={variant}
      style={{ "--scroll-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
