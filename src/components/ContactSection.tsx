import { useState } from "react";
import type { FormEvent } from "react";
import { contact } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import "./ContactSection.css";

/**
 * Static hosting has no backend, so submissions go through a form relay
 * (Formspree, Web3Forms, Basin — anything that accepts a JSON POST).
 * Set VITE_CONTACT_ENDPOINT in .env.local to switch it on. Until then the
 * form degrades to a pre-filled mail client draft so no message is ever lost.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

type Fields = { name: string; email: string; message: string };

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };

const socialLinks = [
  {
    label: "LinkedIn",
    value: contact.linkedinHandle,
    href: contact.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    value: contact.githubHandle,
    href: contact.github,
    Icon: GitHubIcon,
  },
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: MailIcon,
  },
];

function validate(fields: Fields): Errors {
  const errors: Errors = {};

  if (!fields.name.trim()) {
    errors.name = "Please add your name.";
  }

  if (!fields.email.trim()) {
    errors.email = "Please add your email so I can reply.";
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }

  if (!fields.message.trim()) {
    errors.message = "Please add a message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "A little more detail would help — 10 characters minimum.";
  }

  return errors;
}

/** No relay configured: hand the message to the visitor's mail client. */
function openMailClient(fields: Fields) {
  const subject = `Portfolio enquiry from ${fields.name.trim()}`;
  const body = `${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`;

  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function ContactSection() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));

    // Clear a field's error as soon as the visitor starts correcting it.
    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: bots fill hidden inputs, people never see them.
    const form = event.currentTarget;
    const honeypot = form.elements.namedItem("company");

    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(fields);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    if (!ENDPOINT) {
      openMailClient(fields);
      setStatus("success");
      setFields(EMPTY);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Let's stay in touch.</h2>
          <p className="lead">
            Working on something in robotics, computer vision or automation? Send
            me a note — I read everything that comes in.
          </p>

          <ul className="contact-links">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  className="contact-link"
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <span className="contact-icon">
                    <link.Icon className="contact-icon-glyph" />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={fields.name}
              onChange={(event) => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="contact-error" id="contact-name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={fields.email}
              onChange={(event) => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="contact-error" id="contact-email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="What are you building?"
              value={fields.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="contact-error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — hidden from people, irresistible to bots. */}
          <input
            type="text"
            name="company"
            className="contact-honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send message"}
          </button>

          <div className="contact-status" aria-live="polite">
            {status === "success" && (
              <p className="contact-success">
                {ENDPOINT
                  ? "Thanks — your message is on its way. I'll get back to you soon."
                  : "Your mail app should be opening with the message ready to send."}
              </p>
            )}
            {status === "error" && (
              <p className="contact-error" role="alert">
                Something went wrong sending that. Please email me directly at{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
