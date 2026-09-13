import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { focusFor, sideQuests } from "../data/content";
import "./SideQuestRotator.css";

/** Milliseconds between automatic turns. */
const ROTATE_INTERVAL = 2000;

function SideQuestRotator() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const count = sideQuests.length;

  const go = useCallback(
    (next: number) => {
      // Wrap in both directions so the ring is endless.
      setActive(((next % count) + count) % count);
    },
    [count]
  );

  // Slow auto-rotation, suspended while the visitor is interacting.
  useEffect(() => {
    if (isPaused) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, ROTATE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, count]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  }

  return (
    <div
      className="rotator"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className="rotator-stage"
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Side quests"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {sideQuests.map((entry, index) => {
          // Shortest signed distance from the active card, so cards wrap
          // around the ring instead of sliding the long way back.
          let offset = index - active;

          if (offset > count / 2) {
            offset -= count;
          } else if (offset < -count / 2) {
            offset += count;
          }

          const distance = Math.abs(offset);
          const isActive = offset === 0;
          // Anything past the immediate neighbours is behind the stack.
          const isHidden = distance > 1;

          return (
            <button
              type="button"
              key={entry.slug}
              className={`rotator-card${isActive ? " is-active" : ""}`}
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
              onClick={() =>
                isActive ? navigate(`/side-quest/${entry.slug}`) : go(index)
              }
              aria-label={
                isActive
                  ? `Open ${entry.name} — ${entry.event}, ${entry.result}`
                  : `Show ${entry.name}`
              }
            >
              <img
                src={entry.image}
                alt=""
                className="rotator-image"
                style={{ objectPosition: focusFor(entry.image) }}
                loading="lazy"
                decoding="async"
              />
              <span className="rotator-overlay" aria-hidden="true" />

              <span className="rotator-body">
                <span className="rotator-meta">
                  <span className="rotator-event">{entry.event}</span>
                  <span className="rotator-year">{entry.year}</span>
                </span>

                <span className="rotator-details">
                  <span className="rotator-name">{entry.name}</span>
                  <span className="rotator-result">
                    {isActive ? "View →" : entry.result}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="rotator-controls">
        <button
          type="button"
          className="rotator-arrow"
          onClick={() => go(active - 1)}
          aria-label="Previous side quest"
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
          {sideQuests.map((entry, index) => (
            <button
              type="button"
              key={entry.slug}
              className={`rotator-dot${index === active ? " is-active" : ""}`}
              onClick={() => go(index)}
              aria-label={entry.name}
              aria-current={index === active}
            />
          ))}
        </div>

        <button
          type="button"
          className="rotator-arrow"
          onClick={() => go(active + 1)}
          aria-label="Next side quest"
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

      {/* Announces the change for screen readers without moving focus. */}
      <p className="rotator-live" aria-live="polite">
        {sideQuests[active].name} — {sideQuests[active].result}
      </p>
    </div>
  );
}

export default SideQuestRotator;
