"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type SceneMotion = "parallax" | "hero" | "closing";

interface ScrollSceneProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  motion?: SceneMotion;
  intensity?: number;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function documentTop(element: HTMLElement) {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current && current !== document.body) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

export function ScrollScene({
  children,
  className = "",
  motion = "parallax",
  intensity = 1,
  style,
  ...props
}: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const reset = () => {
      scene.style.removeProperty("--scene-x");
      scene.style.removeProperty("--scene-y");
      scene.style.removeProperty("--scene-scale");
      scene.style.removeProperty("--scene-opacity");
      scene.style.removeProperty("--hero-progress");
    };

    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (preference.matches) {
          reset();
          return;
        }

        const top = documentTop(scene) - window.scrollY;
        const height = Math.max(1, scene.offsetHeight);
        const intensityValue = Math.max(0, Math.min(1.5, intensity));

        if (motion === "hero") {
          const progress = clamp(-top / Math.max(1, height * 0.68));
          scene.style.setProperty("--hero-progress", progress.toFixed(3));
          scene.style.setProperty("--scene-scale", (1 - progress * 0.025).toFixed(3));
          scene.style.setProperty("--scene-opacity", (1 - progress * 0.16).toFixed(3));
          scene.style.setProperty("--scene-y", `${(-progress * 14).toFixed(1)}px`);
          scene.style.setProperty("--scene-x", "0px");
          return;
        }

        const progress = clamp((window.innerHeight - top) / (window.innerHeight + height));
        const focus = 1 - Math.abs(progress * 2 - 1);
        const scale = motion === "closing" ? 0.98 + focus * 0.025 : 0.99 + focus * 0.014 * intensityValue;
        const y = (0.5 - progress) * (motion === "closing" ? 14 : 24 * intensityValue);
        const x = Math.sin((progress - 0.5) * Math.PI) * 8 * intensityValue;
        const opacity = motion === "closing" ? 0.9 + focus * 0.1 : 0.9 + focus * 0.1;

        scene.style.setProperty("--scene-x", `${x.toFixed(1)}px`);
        scene.style.setProperty("--scene-y", `${y.toFixed(1)}px`);
        scene.style.setProperty("--scene-scale", scale.toFixed(3));
        scene.style.setProperty("--scene-opacity", opacity.toFixed(3));
      });
    };

    const handleMotionPreference = () => {
      if (preference.matches) reset();
      else update();
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    preference.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", handleMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [intensity, motion]);

  return (
    <div
      {...props}
      ref={sceneRef}
      className={`scroll-scene ${className}`.trim()}
      data-scroll-scene={motion}
      style={style as CSSProperties}
    >
      {children}
    </div>
  );
}
