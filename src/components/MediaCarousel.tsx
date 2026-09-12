import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaItem } from "../data/content";
import "./MediaCarousel.css";

/** Milliseconds between automatic turns, matching the home page rotator. */
const ROTATE_INTERVAL = 3000;

type MediaCarouselProps = {
  items: MediaItem[];
  /** Used for the carousel's accessible name. */
  label: string;
};

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

function MediaCarousel({ items, label }: MediaCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const backRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const count = items.length;
  const hasMany = count > 1;
  const current = items[active];

  const go = useCallback(
    (next: number) => {
      setActive(((next % count) + count) % count);
    },
    [count]
  );

  // Auto-rotation. Suspended while interacting, while the still frame is
  // showing, and whenever the visible item is a video — turning away from a
  // playing clip would be hostile.
  useEffect(() => {
    if (!hasMany || isPaused || isExpanded || current.type === "video") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % count);
    }, ROTATE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [hasMany, isPaused, isExpanded, current.type, count]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    // Send focus back to the card that was clicked, not the top of the page.
    returnFocusRef.current?.focus();
  }, []);

  function expand(index: number) {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setActive(index);
    setIsExpanded(true);
  }

  // Escape returns to the carousel, mirroring the button.
  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    backRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        collapse();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isExpanded, collapse]);

  function handleStageKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!hasMany) {
      return;
    }

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
      <div className="media-carousel is-expanded">
        <figure className="media-frame">
          <MediaFrame item={current} />

          <button
            type="button"
            className="media-back"
            onClick={collapse}
            ref={backRef}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M4 8V4h4M20 16v4h-4M20 8V4h-4M4 16v4h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to carousel
          </button>

          <figcaption className="media-caption">
            {current.alt}
            {hasMany && (
              <span className="media-count">
                {active + 1} / {count}
              </span>
            )}
          </figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div
      className="media-carousel"
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
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ) : (
                <>
                  <video
                    className="media-thumb"
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
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M15 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MediaCarousel;
