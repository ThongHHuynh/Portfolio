import { projects } from "../data/content";
import Reveal from "./Reveal";
import "./ProjectsSection.css";

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="section">
        <Reveal>
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-title">Personal projects</h2>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08} className="project-card glass">
              <div className="project-media">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="project-body">
                <div className="project-heading">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-period">{project.period}</span>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-summary">{project.summary}</p>
                <div className="tag-row">
                  {project.tools.map((tool) => (
                    <span className="tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
