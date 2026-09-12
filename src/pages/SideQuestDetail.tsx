import { Link, Navigate, useParams } from "react-router-dom";
import MediaCarousel from "../components/MediaCarousel";
import { galleryFor, getSideQuest, sideQuests } from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
// This page reuses the project detail layout, so its styles must load too.
import "./ProjectDetail.css";

function SideQuestDetail() {
  const { slug } = useParams();
  const entry = getSideQuest(slug);

  usePageTitle(entry?.name, entry?.description);

  // Unknown slug — hand the visitor to the 404 page rather than crashing.
  if (!entry) {
    return <Navigate to="/404" replace />;
  }

  const index = sideQuests.findIndex((item) => item.slug === entry.slug);
  const previous = index > 0 ? sideQuests[index - 1] : undefined;
  const next = index < sideQuests.length - 1 ? sideQuests[index + 1] : undefined;

  return (
    <article className="page detail-page">
      <div className="shell detail-head">
        <Link className="detail-back" to="/side-quest">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All side quests
        </Link>

        <p className="eyebrow">{entry.event}</p>
        <h1>{entry.name}</h1>
        <p className="detail-subtitle">{entry.result}</p>
        <p className="detail-period">{entry.year}</p>
      </div>

      <div className="shell detail-gallery">
        <MediaCarousel items={galleryFor(entry)} label={entry.name} />
      </div>

      <div className="shell detail-body">
        <section className="detail-block">
          <h2 className="detail-heading">Overview</h2>
          <div className="detail-prose">
            {entry.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="detail-block">
          <h2 className="detail-heading">What it involved</h2>
          <ul className="detail-list">
            {entry.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="shell detail-skills">
        <h2 className="detail-heading">Skills and technology</h2>
        <div className="detail-skills-grid">
          <div className="detail-skills-group">
            <h3 className="detail-skills-label">Technology</h3>
            <ul className="tag-row">
              {entry.tools.map((tool) => (
                <li className="tag" key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-skills-group">
            <h3 className="detail-skills-label">Skills</h3>
            <ul className="tag-row">
              {entry.skills.map((skill) => (
                <li className="tag" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell">
        <nav className="detail-nav" aria-label="Other side quests">
          {previous ? (
            <Link className="detail-nav-link" to={`/side-quest/${previous.slug}`}>
              <span className="detail-nav-label">Previous</span>
              <span className="detail-nav-name">{previous.name}</span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              className="detail-nav-link detail-nav-link--next"
              to={`/side-quest/${next.slug}`}
            >
              <span className="detail-nav-label">Next</span>
              <span className="detail-nav-name">{next.name}</span>
            </Link>
          )}
        </nav>

        <div className="detail-cta">
          <p className="lead">The engineering work is over here.</p>
          <Link className="button" to="/projects">
            View projects
          </Link>
        </div>
      </div>
    </article>
  );
}

export default SideQuestDetail;
