import "./ContactSection.css";

const socialOptions = [
  {
    label: "LinkedIn",
    value: "Thong Huynh",
    href: "https://www.linkedin.com/in/thonghuynh1/",
  },
  {
    label: "GitHub",
    value: "ThongHHuynh",
    href: "https://github.com/ThongHHuynh/",
  },
];

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="contact-eyebrow">Contact</p>
        <h2 className="contact-title">Let&apos;s stay in touch.</h2>
        {/* <p className="contact-text">
          Pick the channel that fits best. You can swap these placeholders with your
          real contact details anytime.
        </p> */}
      </div>

      <div className="contact-grid" aria-label="Contact options">
        {socialOptions.map((option) => (
          <a
            key={option.label}
            className="contact-card"
            href={option.href}
            target="_blank"
            rel="noreferrer"
          >
            <p className="contact-label">{option.label}</p>
            <h3 className="contact-value">{option.value}</h3>
          </a>
        ))}

        <form className="contact-form-card">
          <p className="contact-label">Email</p>
          <h3 className="contact-value">Send an inquiry</h3>
          <label className="contact-field">
            <span className="contact-field-label">Your email</span>
            <input
              className="contact-input"
              type="email"
              name="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </label>
          <button className="contact-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
