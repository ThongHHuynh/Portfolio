import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router navigation does not move the viewport on its own. This resets to the
 * top on a page change, and scrolls to the anchored section when a hash is
 * present (e.g. following "/#contact" from the Projects page).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;
