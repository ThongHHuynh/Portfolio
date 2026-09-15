import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Header.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects", end: false },
  { to: "/side-quest", label: "Side Quest", end: false },
  { to: "/cv", label: "CV", end: false },
];

/** Scroll distance (px) over which the island fully contracts. */
const COLLAPSE_DISTANCE = 160;

function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  /**
   * Publishes scroll position as a 0–1 CSS variable so every part of the
   * island — width, wordmark, glass opacity, shadow — interpolates smoothly
   * instead of snapping at a threshold. Written straight to the DOM rather
   * than through state, so scrolling never triggers a React re-render.
   */
  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    let frame = 0;

    function apply() {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / COLLAPSE_DISTANCE));
      header!.style.setProperty("--progress", progress.toFixed(4));
    }

    function handleScroll() {
      // Coalesce bursts of scroll events into one write per frame.
      if (!frame) {
        frame = window.requestAnimationFrame(apply);
      }
    }

    apply();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  /**
   * Dismiss the panel on anything that reads as "I'm done with this": a tap or
   * click anywhere off the header, or Escape. Without it the only way out was
   * the burger itself or following a link, so tapping the page to dismiss the
   * menu — the thing everyone tries first — did nothing.
   *
   * pointerdown rather than click, so the panel is gone by the time whatever
   * was underneath it reacts. The listener spans the whole header, so the
   * panel's own links and the burger are unaffected; they close it themselves.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        // Escape should leave focus somewhere sensible, not adrift in a panel
        // that is no longer on screen.
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Never leave the menu panel open behind a resize into the desktop layout.
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const query = window.matchMedia("(min-width: 721px)");

    function handleChange() {
      if (query.matches) {
        setIsMenuOpen(false);
      }
    }

    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, [isMenuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        {/* aria-label carries the full name so the collapsed "TH" never
            reaches assistive tech as the link's only text. */}
        <Link
          to="/"
          className="brand-name"
          onClick={closeMenu}
          aria-label="Thong Huynh — home"
        >
          <span className="brand-full" aria-hidden="true">
            Thong Huynh
          </span>
          <span className="brand-short" aria-hidden="true">
            TH
          </span>
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `header-link${isActive ? " is-active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/#contact" className="header-link header-link--cta">
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          <button
            type="button"
            className="menu-toggle"
            ref={toggleRef}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className={`menu-bar${isMenuOpen ? " is-open" : ""}`} />
            <span className={`menu-bar${isMenuOpen ? " is-open" : ""}`} />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu${isMenuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        hidden={!isMenuOpen}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={closeMenu}
            className={({ isActive }) =>
              `mobile-link${isActive ? " is-active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/#contact" className="mobile-link" onClick={closeMenu}>
          Contact
        </Link>
      </div>
    </header>
  );
}

export default Header;
