import { Link, Navigate, useParams } from "react-router-dom";
import MediaCarousel from "../components/MediaCarousel";
import { galleryFor, getProject, projects } from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  usePageTitle(project?.name, project?.summary);

  // Unknown slug — hand the visitor to the 404 page rather than crashing.
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <article className="page detail-page">
      <div className="shell detail-head">
        <Link className="detail-back" to="/projects">
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
          All projects
        </Link>

        <p className="eyebrow">{project.context}</p>
        <h1>{project.name}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>
        <p className="detail-period">{project.period}</p>

        <ul className="tag-row detail-tags">
          {project.tools.map((tool) => (
            <li className="tag" key={tool}>
              {tool}
            </li>
          ))}
        </ul>
      </div>

      <div className="shell detail-gallery">
        <MediaCarousel items={galleryFor(project)} label={project.name} />
      </div>

      <div className="shell detail-body">
        <section className="detail-block">
          <h2 className="detail-heading">Overview</h2>
          <div className="detail-prose">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="detail-block">
          <h2 className="detail-heading">What I built</h2>
          <ul className="detail-list">
            {project.highlights.map((highlight) => (
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
              {project.tools.map((tool) => (
                <li className="tag" key={tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-skills-group">
            <h3 className="detail-skills-label">Skills</h3>
            <ul className="tag-row">
              {project.skills.map((skill) => (
                <li className="tag" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell">
        <nav className="detail-nav" aria-label="Other projects">
          {previous ? (
            <Link className="detail-nav-link" to={`/projects/${previous.slug}`}>
              <span className="detail-nav-label">Previous</span>
              <span className="detail-nav-name">{previous.name}</span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              className="detail-nav-link detail-nav-link--next"
              to={`/projects/${next.slug}`}
            >
              <span className="detail-nav-label">Next</span>
              <span className="detail-nav-name">{next.name}</span>
            </Link>
          )}
        </nav>

        <div className="detail-cta">
          <p className="lead">Interested in this kind of work?</p>
          <Link className="button" to="/#contact">
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectDetail;
