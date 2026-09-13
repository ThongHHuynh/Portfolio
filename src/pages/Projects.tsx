import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/content";
import usePageTitle from "../hooks/usePageTitle";
import "./Projects.css";

function Projects() {
  usePageTitle(
    "Projects",
    "Robotics, computer vision and automation projects by Thong Huynh — autonomous mobile robots, inspection systems, digital twins and more."
  );

  return (
    <div className="page projects-page">
      <header className="shell projects-head">
        <p className="eyebrow">Projects</p>
        <h1>Things I've designed, built and shipped</h1>
        <p className="lead">
          A mix of independent builds and work I've done in industry and research.
        </p>
      </header>

      <div className="shell">
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              eager={index < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
