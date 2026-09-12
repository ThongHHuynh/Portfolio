import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import HeroPool from "../components/HeroPool";
import ProjectCard from "../components/ProjectCard";
import SideQuestRotator from "../components/SideQuestRotator";
import { contact, featuredProjects, profile, work } from "../data/content";
import "./Home.css";

function Home() {
  return (
    <>
      <HeroPool className="intro-section" id="about">
        <div className="shell intro-inner">
          <div className="intro-copy">
            <p className="eyebrow">About</p>
            <h1>{profile.tagline}</h1>
            <p className="lead">{profile.bio}</p>
            <p className="lead">{profile.secondary}</p>

            <div className="intro-actions">
              <Link className="button" to="/projects">
                View projects
              </Link>
              <Link className="button button--ghost" to="/cv">
                Read my CV
              </Link>
            </div>
          </div>

          <div className="intro-media">
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.role}`}
              className="intro-photo"
              width={480}
              height={480}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </HeroPool>

      <div className="divider" />

      <section className="where-section" aria-label="Where I work">
        <div className="shell where-inner">
          <p className="eyebrow">Currently</p>
          <ul className="where-list">
            {work.map((role) => (
              <li className="where-item" key={`${role.company}-${role.role}`}>
                <span className="where-role">{role.role}</span>
                <span className="where-company">{role.company}</span>
                <span className="where-period">{role.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="divider" />

      <section className="featured-section">
        <div className="shell">
          <div className="featured-head">
            <div className="featured-copy">
              <p className="eyebrow">Projects</p>
              <h2 className="section-heading">
                <span>A playground</span>
                <span>during my engineering journey</span>
              </h2>
            </div>
            <Link className="featured-all" to="/projects">
              All projects
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                eager={index === 0}
              />
            ))}
          </div>

          <p className="featured-note">
            More coming soon — or{" "}
            <a href={contact.github} target="_blank" rel="noreferrer">
              follow along on GitHub
            </a>
            .
          </p>
        </div>
      </section>

      <div className="divider" />

      <section className="quests-section">
        <div className="shell">
          <div className="featured-head">
            <div className="featured-copy">
              <p className="eyebrow">Side quest</p>
              <h2 className="section-heading section-heading--wide">
                Besides projects, I also compete in hackathons and do FPV racing
              </h2>
            </div>
            <Link className="featured-all" to="/side-quest">
              All side quests
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <SideQuestRotator />
        </div>
      </section>

      <div className="divider" />

      <ContactSection />
    </>
  );
}

export default Home;
