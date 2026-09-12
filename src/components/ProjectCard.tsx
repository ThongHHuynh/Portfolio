import { Link } from "react-router-dom";
import type { Project } from "../data/content";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  eager?: boolean;
};

function ProjectCard({ project, eager = false }: ProjectCardProps) {
  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-link">
        <div className="project-media">
          <img
            src={project.image}
            alt={`${project.name} — ${project.subtitle}`}
            className="project-image"
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="project-overlay" aria-hidden="true" />
        </div>

        <div className="project-content">
          <p className="project-context">{project.context}</p>

          {/* Compact frosted bar: title and subtitle only, so the photo stays
              the subject of the card. The full summary lives on the detail page. */}
          <div className="project-details">
            <div className="project-details-text">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
            </div>
            <span className="project-cta" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
