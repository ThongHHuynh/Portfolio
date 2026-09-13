import { useCallback, useEffect, useRef, useState } from "react";
import { focusFor } from "../data/content";
import type { MediaItem } from "../data/content";
import "./MediaCarousel.css";

/** Milliseconds between automatic turns, matching the home page rotator. */
const ROTATE_INTERVAL = 3000;

/** Upper bound on the zoom-out, in case `animationend` never fires. */
const CLOSE_FALLBACK_MS = 1000;

type MediaCarouselProps = {
  items: MediaItem[];
  /** Used for the carousel's accessible name. */
  label: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The still frame — the same image box the detail pages used before. */
function MediaFrame({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        className="media-frame-el"
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
      />
    );
  }

  return <img className="media-frame-el" src={item.src} alt={item.alt} />;
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Three panels — a front card between two receding ones — reading as "carousel". */
function CarouselIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <rect x="1.8" y="7.5" width="3.9" height="9" rx="1" />
        <rect x="7.6" y="4.5" width="8.8" height="15" rx="1.6" />
        <rect x="18.3" y="7.5" width="3.9" height="9" rx="1" />
      </g>
    </svg>
  );
}

function MediaCarousel({ items, label }: MediaCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const backRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const focusCardOnReturn = useRef(false);

  const count = items.length;
  const hasMany = count > 1;
  const current = items[active];

  const go = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count);
    },
    [count]
  );

  // Auto-rotation. Suspended while interacting, while the image box is
  // showing, and whenever the visible item is a video — turning away from a
  // playing clip would be hostile.
  useEffect(() => {
    if (!hasMany || isPaused || isExpanded || current.type === "video") {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % count);
    }, ROTATE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [hasMany, isPaused, isExpanded, current.type, count]);

  function expand(index: number) {
    setActive(index);
    setIsClosing(false);
    setIsExpanded(true);
  }

  const finishCollapse = useCallback(() => {
    setIsClosing(false);
    setIsExpanded(false);
    focusCardOnReturn.current = true;
  }, []);

  // Closing plays the zoom-out first and swaps back to the carousel when it
  // ends. Reduced motion skips straight to the swap.
  const collapse = useCallback(() => {
    if (prefersReducedMotion()) {
      finishCollapse();
      return;
    }

    setIsClosing(true);
  }, [finishCollapse]);

  // Safety net: if the animation never reports finishing, still close.
  useEffect(() => {
    if (!isClosing) {
      return;
    }

    const timer = window.setTimeout(finishCollapse, CLOSE_FALLBACK_MS);

    return () => window.clearTimeout(timer);
  }, [isClosing, finishCollapse]);

  // Back in the carousel: return focus to the front card, not the page top.
  useEffect(() => {
    if (isExpanded || !focusCardOnReturn.current) {
      return;
    }

    focusCardOnReturn.current = false;
    containerRef.current
      ?.querySelector<HTMLButtonElement>(".media-card.is-active")
      ?.focus({ preventScroll: true });
  }, [isExpanded]);

  // Keyboard in the image box: Escape closes, arrows step through the images.
  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    backRef.current?.focus({ preventScroll: true });

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        collapse();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((value) => (value + 1) % count);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((value) => (value - 1 + count) % count);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isExpanded, collapse, count]);

  function handleStageKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  }

  // A single item has nothing to rotate — show the frame and nothing else.
  if (!hasMany) {
    return (
      <figure className="media-frame media-frame--static">
        <MediaFrame item={items[0]} />
      </figure>
    );
  }

  if (isExpanded) {
    return (
      <div className="media-carousel is-expanded" ref={containerRef}>
        <figure
          className={`media-frame${isClosing ? " is-closing" : ""}`}
          onAnimationEnd={(event) => {
            // Only the frame's own zoom-out — the image swap inside it also
            // fires animationend, and that must not close the box.
            if (
              isClosing &&
              event.target === event.currentTarget &&
              event.animationName === "media-zoom-out"
            ) {
              finishCollapse();
            }
          }}
        >
          {/* Keyed by index so changing image replays the swap animation. */}
          <div className="media-frame-swap" key={active}>
            <MediaFrame item={current} />
          </div>

          {/* Outside the keyed wrapper, so it stays put while images swap. */}
          <button
            type="button"
            className="media-back"
            onClick={collapse}
            ref={backRef}
            aria-label="Back to carousel"
            title="Back to carousel"
          >
            <CarouselIcon />
          </button>
        </figure>

        <div className="media-controls">
          <button
            type="button"
            className="rotator-arrow"
            onClick={() => go(active - 1)}
            aria-label="Previous image"
          >
            <ArrowIcon direction="left" />
          </button>

          <span className="media-count" aria-live="polite">
            {active + 1} / {count}
          </span>

          <button
            type="button"
            className="rotator-arrow"
            onClick={() => go(active + 1)}
            aria-label="Next image"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="media-carousel"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className="media-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${label} gallery`}
        tabIndex={0}
        onKeyDown={handleStageKey}
      >
        {items.map((item, index) => {
          // Shortest signed distance, so the ring wraps rather than unwinding.
          let offset = index - active;

          if (offset > count / 2) {
            offset -= count;
          } else if (offset < -count / 2) {
            offset += count;
          }

          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const isHidden = distance > 1;

          return (
            <button
              type="button"
              key={`${item.src}-${index}`}
              className={`media-card${isActive ? " is-active" : ""}`}
              style={{
                transform: `translateX(${offset * 62}%) translateZ(${
                  -distance * 220
                }px) rotateY(${offset * -24}deg)`,
                zIndex: count - distance,
                opacity: isHidden ? 0 : 1,
                pointerEvents: isHidden ? "none" : "auto",
              }}
              aria-hidden={isHidden}
              tabIndex={isActive ? 0 : -1}
              onClick={() => (isActive ? expand(index) : go(index))}
              aria-label={isActive ? `Open ${item.alt}` : `Show ${item.alt}`}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt=""
                  className="media-thumb"
                  style={{ objectPosition: focusFor(item.src) }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ) : (
                <>
                  <video
                    className="media-thumb"
                    style={{ objectPosition: focusFor(item.poster ?? item.src) }}
                    src={item.src}
                    poster={item.poster}
                    muted
                    playsInline
                    preload="metadata"
                    tabIndex={-1}
                  />
                  <span className="media-badge" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
                    </svg>
                  </span>
                </>
              )}

              <span className="media-overlay" aria-hidden="true" />

              {isActive && (
                <span className="media-details">
                  <span className="media-name">{item.alt}</span>
                  <span className="media-hint">
                    {item.type === "video" ? "Play" : "Open"}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="media-controls">
        <button
          type="button"
          className="rotator-arrow"
          onClick={() => go(active - 1)}
          aria-label="Previous item"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="rotator-dots">
          {items.map((item, index) => (
            <button
              type="button"
              key={`dot-${item.src}-${index}`}
              className={`rotator-dot${index === active ? " is-active" : ""}`}
              onClick={() => go(index)}
              aria-label={item.alt}
              aria-current={index === active}
            />
          ))}
        </div>

        <button
          type="button"
          className="rotator-arrow"
          onClick={() => go(active + 1)}
          aria-label="Next item"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

export default MediaCarousel;
