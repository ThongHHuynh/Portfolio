import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/** Travel, in px, before a drag counts as a swipe rather than a tap. */
const THRESHOLD = 45;

type Swipe = {
  /** Spread onto the element the gesture is made over. */
  swipeProps: {
    onPointerDown: (event: ReactPointerEvent) => void;
    onPointerUp: (event: ReactPointerEvent) => void;
    onPointerCancel: () => void;
  };
  /**
   * True when the click now firing is the tail of a swipe rather than a tap.
   * Reads once and clears, so a click handler can open with it and bail.
   */
  consumedTap: () => boolean;
};

/**
 * Horizontal swipe over the carousels: drag left for the next item, right for
 * the previous one.
 *
 * Mouse drags are left alone. On a pointer device the arrows and the side
 * cards already turn the ring, and a click that happened to travel a few
 * pixels should still open whatever is under it.
 *
 * This relies on the page-wide `touch-action: pan-y`. Because sideways travel
 * scrolls nothing, the browser never claims the gesture and never cancels the
 * pointer stream partway — so the delta measured at pointerup is the whole
 * movement. Vertical travel does scroll, which fires pointercancel, and the
 * gesture is abandoned.
 */
function useSwipe(onSwipe: (direction: 1 | -1) => void): Swipe {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const onPointerDown = useCallback((event: ReactPointerEvent) => {
    // Cleared for every pointer, mouse included. On a laptop with a touch
    // screen a swipe leaves the flag set, and a mouse press that never
    // reached this point would have had its click swallowed by it.
    swiped.current = false;

    if (event.pointerType === "mouse") {
      return;
    }

    origin.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent) => {
      const from = origin.current;
      origin.current = null;

      if (!from) {
        return;
      }

      const dx = event.clientX - from.x;
      const dy = event.clientY - from.y;

      // Short travel is a tap. Travel that is more vertical than horizontal is
      // the visitor scrolling the page past the carousel, not turning it.
      if (Math.abs(dx) < THRESHOLD || Math.abs(dx) <= Math.abs(dy)) {
        return;
      }

      swiped.current = true;
      onSwipe(dx < 0 ? 1 : -1);
    },
    [onSwipe]
  );

  const onPointerCancel = useCallback(() => {
    origin.current = null;
  }, []);

  const consumedTap = useCallback(() => {
    const was = swiped.current;
    swiped.current = false;
    return was;
  }, []);

  return {
    swipeProps: { onPointerDown, onPointerUp, onPointerCancel },
    consumedTap,
  };
}

export default useSwipe;
