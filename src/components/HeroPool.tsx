import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useTheme } from "../context/theme-context";
import "./HeroPool.css";

/**
 * Interactive "pool" field: a spring-loaded grid of squares that the cursor
 * pushes outward, easing back to rest when it leaves. Ported from the hero on
 * mtr-site.vercel.app and retuned for this site's light/navy palette.
 *
 * Dots sit at the background colour when undisturbed — invisible — and blend
 * toward the accent as the cursor displaces them, so the field only appears
 * where the pointer has travelled.
 *
 * Tuning lives here — every value is safe to adjust.
 */
const CONFIG = {
  /** Target gap between grid points, in CSS pixels. Smaller = denser. */
  spacing: 19,
  /** Guard rails so huge viewports don't explode the point count. */
  maxColumns: 140,
  maxRows: 90,
  /** Pull back toward the origin. Higher = snappier return. */
  spring: 0.009,
  /** Velocity retained each frame. Lower = settles sooner. */
  damping: 0.82,
  /** How much of the pointer's own motion drags points along with it. */
  drift: 0.07,
  /** Radius of the cursor's influence, in CSS pixels. */
  radius: 150,
  /** Peak push strength at the centre of that radius. */
  force: 2.6,
  /** Square size at rest and fully displaced. */
  sizeMin: 2.4,
  sizeMax: 5,
  /** Displacement (px) treated as "fully displaced" for colour and size. */
  displacementScale: 60,
  /** Below this blend a dot matches the background, so skip drawing it. */
  visibilityThreshold: 0.02,
  /** Brightness steps used to batch canvas fills. More = smoother gradient. */
  buckets: 24,
};

type Point = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Rgb = [number, number, number];

type HeroPoolProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

function parseRgb(value: string, fallback: Rgb): Rgb {
  const parts = value
    .split(",")
    .map((part) => Number.parseFloat(part.trim()))
    .filter((part) => Number.isFinite(part));

  return parts.length === 3 ? (parts as Rgb) : fallback;
}

function HeroPool({ children, className = "", id }: HeroPoolProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  /** Lets the theme effect below repaint without tearing down the simulation. */
  const redrawRef = useRef<(() => void) | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const context = canvas?.getContext("2d");

    if (!section || !canvas || !cursor || !context) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let points: Point[] = [];
    let width = 0;
    let height = 0;

    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let lastX = 0;
    let lastY = 0;
    let deltaX = 0;
    let deltaY = 0;
    let frame = 0;

    function layout() {
      const rect = section!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Cap DPR at 2 — beyond that the extra pixels cost more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.min(
        CONFIG.maxColumns,
        Math.max(2, Math.round(width / CONFIG.spacing))
      );
      const rows = Math.min(
        CONFIG.maxRows,
        Math.max(2, Math.round(height / CONFIG.spacing))
      );
      const stepX = width / columns;
      const stepY = height / rows;

      const next: Point[] = [];

      for (let row = 0; row <= rows; row += 1) {
        for (let column = 0; column <= columns; column += 1) {
          const x = column * stepX;
          const y = row * stepY;
          next.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }

      points = next;
    }

    /**
     * Lit dots are grouped into a few dozen brightness buckets before painting.
     * A heavy scribble lights thousands of dots at once, and setting fillStyle
     * per dot is the expensive part — this caps it at one change per bucket.
     * Reused across frames to avoid per-frame allocation.
     */
    const buckets: Point[][] = Array.from(
      { length: CONFIG.buckets },
      () => [] as Point[]
    );

    function draw() {
      // Read the palette live rather than caching it at setup. The theme
      // attribute lands on <html> in a parent effect, which React runs AFTER
      // this component's effects — caching here would freeze the old colours.
      const styles = getComputedStyle(section!);
      // Fallback matches the light theme's --bg, so a failed read still leaves
      // resting dots invisible rather than painting a visible grid.
      const rest = parseRgb(
        styles.getPropertyValue("--hero-dot-rest"),
        [250, 249, 246]
      );
      const active = parseRgb(
        styles.getPropertyValue("--hero-dot-active"),
        [37, 99, 235]
      );

      context!.clearRect(0, 0, width, height);

      for (const bucket of buckets) {
        bucket.length = 0;
      }

      for (const point of points) {
        const offsetX = point.x - point.ox;
        const offsetY = point.y - point.oy;
        const blend = Math.min(
          1,
          Math.hypot(offsetX, offsetY) / CONFIG.displacementScale
        );

        // Undisturbed dots match the background, so there is nothing to paint.
        if (blend < CONFIG.visibilityThreshold) {
          continue;
        }

        const index = Math.min(
          CONFIG.buckets - 1,
          Math.floor(blend * CONFIG.buckets)
        );
        buckets[index].push(point);
      }

      for (let index = 0; index < CONFIG.buckets; index += 1) {
        const bucket = buckets[index];

        if (bucket.length === 0) {
          continue;
        }

        const blend = (index + 0.5) / CONFIG.buckets;
        const r = Math.round(rest[0] + (active[0] - rest[0]) * blend);
        const g = Math.round(rest[1] + (active[1] - rest[1]) * blend);
        const b = Math.round(rest[2] + (active[2] - rest[2]) * blend);
        const size = CONFIG.sizeMin + blend * (CONFIG.sizeMax - CONFIG.sizeMin);
        const half = size / 2;

        context!.fillStyle = `rgb(${r}, ${g}, ${b})`;

        for (const point of bucket) {
          context!.fillRect(point.x - half, point.y - half, size, size);
        }
      }
    }

    redrawRef.current = draw;

    function step() {
      frame = 0;
      let settling = false;

      for (const point of points) {
        let ax = (point.ox - point.x) * CONFIG.spring;
        let ay = (point.oy - point.y) * CONFIG.spring;

        if (pointerActive) {
          const toX = point.x - pointerX;
          const toY = point.y - pointerY;
          const distance = Math.hypot(toX, toY) || 0.001;

          if (distance < CONFIG.radius) {
            const falloff = 1 - distance / CONFIG.radius;
            const push = falloff * falloff * CONFIG.force;

            ax += (toX / distance) * push;
            ay += (toY / distance) * push;
            // Trail the pointer's own movement for a sense of momentum.
            ax += deltaX * falloff * CONFIG.drift;
            ay += deltaY * falloff * CONFIG.drift;
          }
        }

        point.vx = (point.vx + ax) * CONFIG.damping;
        point.vy = (point.vy + ay) * CONFIG.damping;
        point.x += point.vx;
        point.y += point.vy;

        if (
          Math.abs(point.x - point.ox) > 0.05 ||
          Math.abs(point.y - point.oy) > 0.05 ||
          Math.abs(point.vx) > 0.02 ||
          Math.abs(point.vy) > 0.02
        ) {
          settling = true;
        }
      }

      draw();

      // Stop the loop once everything is back at rest — no idle rAF burn.
      if (settling || pointerActive) {
        frame = window.requestAnimationFrame(step);
      }
    }

    function wake() {
      if (!frame) {
        frame = window.requestAnimationFrame(step);
      }
    }

    function handlePointer(event: PointerEvent) {
      const rect = section!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // On the first move, seed the previous position so delta starts at zero.
      if (!pointerActive) {
        lastX = x;
        lastY = y;
      }

      deltaX = x - lastX;
      deltaY = y - lastY;
      pointerX = x;
      pointerY = y;
      lastX = x;
      lastY = y;
      pointerActive = true;

      // Give interactive elements their normal cursor back.
      const overControl = Boolean(
        (event.target as Element | null)?.closest("a, button, input, textarea")
      );

      if (hasFinePointer) {
        section!.toggleAttribute("data-pointer-active", !overControl);
        cursor!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      wake();
    }

    function handleLeave() {
      pointerActive = false;
      section!.removeAttribute("data-pointer-active");
      wake();
    }

    layout();
    draw();

    if (prefersReducedMotion) {
      return () => {
        controller.abort();
        redrawRef.current = null;
      };
    }

    section.addEventListener("pointerenter", handlePointer, { signal });
    section.addEventListener("pointermove", handlePointer, { signal });
    section.addEventListener("pointerleave", handleLeave, { signal });
    section.addEventListener("pointercancel", handleLeave, { signal });
    section.addEventListener(
      "pointerup",
      (event) => {
        if (event.pointerType !== "mouse") {
          handleLeave();
        }
      },
      { signal }
    );

    // ResizeObserver catches layout changes the window resize event misses.
    // The callback is deferred to the next frame: resizing the canvas from
    // inside the observation pass makes the browser report "ResizeObserver
    // loop completed with undelivered notifications".
    let resizeFrame = 0;

    const observer = new ResizeObserver(() => {
      if (resizeFrame) {
        return;
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        layout();

        if (!frame) {
          draw();
        }
      });
    });
    observer.observe(section);

    return () => {
      controller.abort();
      observer.disconnect();
      redrawRef.current = null;

      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }

      section.removeAttribute("data-pointer-active");
    };
  }, []);

  // Repaint on theme change. rAF defers until after the provider's effect has
  // written data-theme, so the new palette is actually readable by then.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => redrawRef.current?.());

    return () => window.cancelAnimationFrame(id);
  }, [theme]);

  return (
    <section ref={sectionRef} className={`hero-pool ${className}`} id={id}>
      <div className="hero-field" aria-hidden="true">
        <canvas ref={canvasRef} className="hero-field-canvas" />
      </div>

      <span ref={cursorRef} className="hero-reticle" aria-hidden="true">
        <i />
      </span>

      {children}
    </section>
  );
}

export default HeroPool;
