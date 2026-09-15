import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { contact, profile } from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
import "./CV.css";

type DocKey = "cv" | "portfolio";

const DOCUMENTS: Record<
  DocKey,
  { label: string; file: string; viewer: string; wide: boolean; name: string }
> = {
  cv: {
    label: "CV",
    file: contact.resume,
    // One page: fit it whole. Chrome/Edge read view/toolbar/navpanes; Firefox's
    // viewer ignores those and reads zoom + pagemode instead — without
    // pagemode=none it opens the document-outline panel over the left of the
    // page, and literal 100% zoom is wider than the frame and clips both sides.
    viewer: "#pagemode=none&zoom=page-fit&view=Fit&toolbar=0&navpanes=0&scrollbar=0",
    wide: false,
    name: "curriculum vitae",
  },
  portfolio: {
    label: "CV + Portfolio",
    file: contact.resumePortfolio,
    // Several pages, portrait resume then landscape slides: fit the width and
    // keep the scrollbar so visitors can move through them.
    viewer: "#pagemode=none&zoom=page-fit&view=FitH&toolbar=0&navpanes=0",
    wide: true,
    name: "resume and portfolio",
  },
};

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 3v12M12 15l-4.5-4.5M12 15l4.5-4.5M4 19h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CV() {
  // Kept in the URL (/cv?doc=portfolio) so each version has a shareable link.
  const [params, setParams] = useSearchParams();
  const active: DocKey = params.get("doc") === "portfolio" ? "portfolio" : "cv";
  const doc = DOCUMENTS[active];

  usePageTitle(
    active === "portfolio" ? "CV + Portfolio" : "CV",
    `Curriculum vitae of ${profile.name} — ${profile.role}. Mechatronics engineering, robotics, computer vision and automation.`
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const [fitVersion, setFitVersion] = useState(0);

  /**
   * Documents whose viewer has been created. A viewer stays mounted once
   * opened and is only hidden when its tab is inactive: Chrome's PDF viewer
   * fits the page once, at load, so destroying and recreating it on every tab
   * switch left a window where it could fit to the wrong frame size and stay
   * squeezed. The portfolio still isn't loaded until its tab is first opened.
   */
  const [opened, setOpened] = useState<Set<DocKey>>(() => new Set([active]));

  /**
   * The browser's PDF viewer applies `view=Fit` once, when the document loads,
   * and keeps that zoom even if its frame changes size afterwards. So a window
   * resize, a browser zoom or a layout shift left the page drawn at the old
   * size inside a bigger (or smaller) frame. When the frame settles at a new
   * size, remount the viewer so it fits again. The PDF is cached, so the
   * reload is near-instant.
   */
  useEffect(() => {
    const frame = wrapRef.current;

    if (!frame) {
      return;
    }

    let lastWidth = frame.clientWidth;
    let lastHeight = frame.clientHeight;
    let timer = 0;

    // On phones the address bar sliding in and out resizes the viewport by
    // 60-90px on nearly every change of scroll direction. Re-fitting on that
    // would reload the PDF again and again while someone is reading it, so
    // touch devices re-fit on width alone — a rotation, or the window
    // genuinely changing shape.
    const heightMatters = window.matchMedia("(pointer: fine)").matches;

    const observer = new ResizeObserver(() => {
      const width = frame.clientWidth;
      const height = frame.clientHeight;

      // Ignore sub-pixel jitter; only a real size change needs a re-fit.
      const widthChanged = Math.abs(width - lastWidth) >= 8;
      const heightChanged =
        heightMatters && Math.abs(height - lastHeight) >= 8;

      if (!widthChanged && !heightChanged) {
        return;
      }

      lastWidth = width;
      lastHeight = height;
      window.clearTimeout(timer);
      // Wait for the resize to finish so a drag doesn't reload repeatedly.
      timer = window.setTimeout(() => setFitVersion((v) => v + 1), 250);
    });

    observer.observe(frame);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  function select(key: DocKey) {
    setOpened((current) => (current.has(key) ? current : new Set(current).add(key)));
    setParams(key === "cv" ? {} : { doc: key }, { replace: true });
  }

  return (
    <div className="page cv-page">
      <header className="shell cv-head">
        {/* Deliberately compact: every pixel here is a pixel the resume loses. */}
        <div className="cv-head-copy">
          <h1>{profile.name}</h1>
          <p className="cv-role">{profile.role}</p>
        </div>

        <div className="cv-tabs" role="tablist" aria-label="Document">
          {(Object.keys(DOCUMENTS) as DocKey[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`cv-tab-${key}`}
              aria-selected={active === key}
              aria-controls="cv-panel"
              className={`cv-tab${active === key ? " is-active" : ""}`}
              onClick={() => select(key)}
            >
              {DOCUMENTS[key].label}
            </button>
          ))}
        </div>

        <div className="cv-actions">
          <a className="button" href={doc.file} download>
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      </header>

      <div
        className="shell cv-viewer-wrap"
        ref={wrapRef}
        id="cv-panel"
        role="tabpanel"
        aria-labelledby={`cv-tab-${active}`}
      >
        {/* <object> renders the PDF inline where supported and shows its own
            children as the fallback when the browser cannot — which is the
            normal case on iOS and most mobile browsers. One viewer per opened
            document; the inactive one is hidden, not unmounted. fitVersion in
            the key re-creates them only after a real resize. */}
        {(Object.keys(DOCUMENTS) as DocKey[])
          .filter((key) => key === active || opened.has(key))
          .map((key) => {
            const item = DOCUMENTS[key];
            const isActive = key === active;

            return (
              <object
                key={`${key}-${fitVersion}`}
                className={`cv-viewer${item.wide ? " cv-viewer--wide" : ""}${
                  isActive ? "" : " is-inactive"
                }`}
                data={`${item.file}${item.viewer}`}
                type="application/pdf"
                aria-label={`${profile.name} — ${item.name}`}
                aria-hidden={!isActive}
                tabIndex={isActive ? undefined : -1}
              >
                <div className="cv-fallback">
                  <h2>Your browser can't display the PDF here.</h2>
                  <p className="lead">
                    Most mobile browsers don't support inline PDF viewing. You
                    can still download it.
                  </p>
                  <div className="cv-fallback-actions">
                    <a className="button" href={item.file} download>
                      Download PDF
                    </a>
                  </div>
                </div>
              </object>
            );
          })}
      </div>
    </div>
  );
}

export default CV;
