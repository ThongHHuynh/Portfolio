import { Link } from "react-router-dom";
import { contact, profile } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <Link to="/projects">Projects</Link>
          <Link to="/side-quest">Side Quest</Link>
          <Link to="/cv">CV</Link>

          <span className="footer-socials">
            <a
              className="footer-social"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon className="footer-social-glyph" />
            </a>
            <a
              className="footer-social"
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon className="footer-social-glyph" />
            </a>
            <a
              className="footer-social"
              href={`mailto:${contact.email}`}
              aria-label={`Email ${profile.name}`}
              title="Email"
            >
              <MailIcon className="footer-social-glyph" />
            </a>
          </span>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
