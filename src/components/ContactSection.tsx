import { contact } from "../data/content";
import Reveal from "./Reveal";
import "./ContactSection.css";

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M12 11v6M9.5 14.5 12 17l2.5-2.5" />
    </svg>
  );
}

const options = [
  {
    label: "LinkedIn",
    value: "/in/thonghuynh1",
    href: contact.linkedin,
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: <MailIcon />,
    external: false,
  },
  {
    label: "Resume",
    value: "Download CV",
    href: contact.resume,
    icon: <DocumentIcon />,
    external: true,
    download: true,
  },
];

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="section">
        <Reveal>
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let's connect</h2>
        </Reveal>

        <div className="contact-grid">
          {options.map((option, i) => (
            <Reveal key={option.label} delay={i * 0.08}>
              <a
                className="contact-card glass"
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noreferrer" : undefined}
                download={option.download}
              >
                <span className="contact-icon">{option.icon}</span>
                <div>
                  <p className="contact-label">{option.label}</p>
                  <p className="contact-value">{option.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
