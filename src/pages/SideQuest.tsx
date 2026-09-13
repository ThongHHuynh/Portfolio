import { Link } from "react-router-dom";
import {
  awards,
  competitions,
  extracurriculars,
  focusFor,
  sideQuests,
} from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
import "./SideQuest.css";

function SideQuest() {
  usePageTitle(
    "Side Quest",
    "Competitions, awards and extracurriculars — robot competitions, FPV drones and the team work behind Thong Huynh's engineering."
  );

  return (
    <div className="page quest-page">
      <header className="shell quest-head">
        <p className="eyebrow">Side quest</p>
        <h1>
          Besides projects, I also compete in hackathons and do FPV racing
        </h1>
        <p className="lead">
          Competitions, team builds and the things I make for no reason other
          than wanting to. Most of what I know about robots I learned somewhere
          on this page first.
        </p>
      </header>

      <section className="shell quest-section" aria-label="Competitions">
        <div className="quest-grid">
          {sideQuests.map((entry, index) => (
            <article className="quest-card" key={entry.slug}>
              <Link className="quest-link" to={`/side-quest/${entry.slug}`}>
                <div className="quest-media">
                  <img
                    src={entry.image}
                    alt={`${entry.name} — ${entry.event}`}
                    className="quest-image"
                    style={{ objectPosition: focusFor(entry.image) }}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="quest-overlay" aria-hidden="true" />
                </div>

                <div className="quest-content">
                  <div className="quest-meta">
                    <span className="quest-event">{entry.event}</span>
                    <span className="quest-year">{entry.year}</span>
                  </div>

                  {/* Frosted panel over the photo — same acrylic language as
                      the project cards. The description expands on hover so
                      the card stays compact at rest. */}
                  <div className="quest-details">
                    <div className="quest-details-text">
                      <h2 className="quest-name">{entry.name}</h2>
                      <p className="quest-result">{entry.result}</p>
                    </div>
                    <p className="quest-description">{entry.description}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="shell quest-section">
        <h2 className="quest-section-title">Awards</h2>
        <ul className="quest-award-list">
          {awards.map((award) => (
            <li className="quest-award" key={award.title}>
              <span className="quest-award-title">{award.title}</span>
              <span className="quest-award-org">{award.org}</span>
            </li>
          ))}
        </ul>

        <div className="quest-competitions">
          <h3 className="quest-sub">Competitions</h3>
          <ul className="tag-row">
            {competitions.map((competition) => (
              <li className="tag" key={competition}>
                {competition}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell quest-section">
        <h2 className="quest-section-title">Teams and extracurriculars</h2>
        <ul className="quest-role-list">
          {extracurriculars.map((item) => (
            <li className="quest-role" key={`${item.org}-${item.role}`}>
              <div className="quest-role-head">
                <h3>{item.role}</h3>
                <span className="quest-role-period">{item.period}</span>
              </div>
              <p className="quest-role-org">{item.org}</p>
              <p className="quest-role-text">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="shell quest-foot">
        <p className="lead">Want the serious version?</p>
        <div className="quest-foot-actions">
          <Link className="button button--ghost" to="/projects">
            View projects
          </Link>
          <Link className="button" to="/cv">
            Read my CV
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideQuest;
