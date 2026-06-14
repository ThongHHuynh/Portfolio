import amrImage from "../assets/AMR.jpg";
import boltEyeImage from "../assets/BoltEye.jpg";
import pegasusImage from "../assets/Pegasus.jpeg";
import "./ProjectsSection.css";

const projects = [
  {
    label: "Articles",
    name: "BumbleBee: A Compact Autonomous Mobile Robot",
    summary: "A compact AMR platform focused on practical warehouse and SME automation workflows.",
    image: amrImage,
  },
  {
    label: "Articles",
    name: "BoltEye",
    summary: "An intelligent computer vision system to detect and classify your products.",
    image: boltEyeImage,
  },
  {
    label: "Articles",
    name: "Digital Twin Conveyor System",
    summary:
      "A high-fidelity NVIDIA Isaac Sim for validating sensors, path planning before deployment.",
    image: boltEyeImage,
  },
  {
    label: "Articles",
    name: "Pegasus: A Multi-Modal Quadruped Robot",
    summary:
      "Locomotion, inverse kinematics, and ROS-based control for a four-legged robotics platform.",
    image: pegasusImage,
  },
];

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-copy">
        <p className="projects-eyebrow">Projects</p>
        <h2 className="projects-title">A playground during my engineering journey</h2>
        {/* <p className="projects-text">
          This section is ready for project cards, case studies, or a simple list of
          builds. For now it gives you a real scroll target for the navigation bar.
        </p> */}
      </div>
      <div className="projects-grid" aria-label="Project placeholders">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <div className="project-media">
              <img src={project.image} alt={project.name} className="project-image" />
              <div className="project-overlay" />
            </div>
            <div className="project-content">
              <p className="project-label">{project.label}</p>
              <div className="project-details">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="projects-coming-soon">More coming soon....</p>
    </section>
  );
}

export default ProjectsSection;
