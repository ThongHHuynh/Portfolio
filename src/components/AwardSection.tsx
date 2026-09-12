import { awards } from "../data/content";
import Reveal from "./Reveal";
import "./AwardSection.css";

function TrophyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M5 4H3v2a4 4 0 0 0 4 4M19 4h2v2a4 4 0 0 1-4 4" />
    </svg>
  );
}

function AwardSection() {
  return (
    <section className="award-section" id="award">
      <div className="section">
        <Reveal>
          <p className="section-eyebrow">Award</p>
          <h2 className="section-title">Recognition</h2>
        </Reveal>

        <div className="award-grid">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.06} className="award-card glass">
              <span className="award-icon">
                <TrophyIcon />
              </span>
              <div>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-org">{award.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AwardSection;
