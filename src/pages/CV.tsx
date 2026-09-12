import { contact, profile } from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
import "./CV.css";

function CV() {
  usePageTitle(
    "CV",
    `Curriculum vitae of ${profile.name} — ${profile.role}. Mechatronics engineering, robotics, computer vision and automation.`
  );

  return (
    <div className="page cv-page">
      <header className="shell cv-head">
        {/* Deliberately compact: every pixel here is a pixel the resume loses. */}
        <div className="cv-head-copy">
          <h1>{profile.name}</h1>
          <p className="cv-role">{profile.role}</p>
        </div>

        <div className="cv-actions">
          <a className="button" href={contact.resume} download>
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
            Download PDF
          </a>
          <a
            className="button button--ghost"
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>
      </header>

      <div className="shell cv-viewer-wrap">
        {/* <object> renders the PDF inline where supported and shows its own
            children as the fallback when the browser cannot — which is the
            normal case on iOS and most mobile browsers. */}
        {/* view=Fit scales the whole page into the frame; toolbar/navpanes off
            so the browser's own chrome doesn't eat height the page could use. */}
        <object
          className="cv-viewer"
          data={`${contact.resume}#view=Fit&toolbar=0&navpanes=0&scrollbar=0`}
          type="application/pdf"
          aria-label={`${profile.name} — curriculum vitae`}
        >
          <div className="cv-fallback">
            <h2>Your browser can't display the PDF here.</h2>
            <p className="lead">
              Most mobile browsers don't support inline PDF viewing. You can
              still open or download the full CV.
            </p>
            <div className="cv-fallback-actions">
              <a className="button" href={contact.resume} download>
                Download PDF
              </a>
              <a
                className="button button--ghost"
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
              >
                Open in new tab
              </a>
            </div>
          </div>
        </object>
      </div>

    </div>
  );
}

export default CV;
