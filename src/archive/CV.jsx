import { useState } from "react";
import "./CV.css";

function makeSlide({ title, accent, detail }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="900" height="700" rx="48" fill="url(#bg)" />
      <circle cx="200" cy="150" r="100" fill="rgba(255,255,255,0.14)" />
      <circle cx="745" cy="560" r="155" fill="rgba(255,255,255,0.12)" />
      <rect x="84" y="92" width="360" height="468" rx="38" fill="rgba(255,255,255,0.14)" />
      <rect x="116" y="124" width="296" height="252" rx="28" fill="rgba(255,255,255,0.88)" />
      <rect x="116" y="408" width="220" height="18" rx="9" fill="rgba(255,255,255,0.45)" />
      <rect x="116" y="448" width="174" height="18" rx="9" fill="rgba(255,255,255,0.3)" />
      <text x="500" y="250" fill="#ffffff" font-size="64" font-family="Segoe UI, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="500" y="332" fill="rgba(255,255,255,0.86)" font-size="30" font-family="Segoe UI, Arial, sans-serif">${detail}</text>
      <text x="84" y="628" fill="rgba(255,255,255,0.78)" font-size="24" font-family="Segoe UI, Arial, sans-serif">Click the top card to bring the next one forward</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const slides = [
  {
    id: "focus",
    title: "Focus Session",
    detail: "The top card moves aside and reveals the next frame.",
    accent: "#f97316",
  },
  {
    id: "capture",
    title: "Instant Capture",
    detail: "A spread stack that feels more like a loose photo hand.",
    accent: "#0ea5e9",
  },
  {
    id: "share",
    title: "Share Moment",
    detail: "Overlapping cards with a fast front-to-back jump.",
    accent: "#ec4899",
  },
  {
    id: "studio",
    title: "Studio Setup",
    detail: "The front card is the only active click target.",
    accent: "#8b5cf6",
  },
].map((slide) => ({
  ...slide,
  image: makeSlide(slide),
}));

function ComputerVisionTab() {
  const [order, setOrder] = useState(slides.map((slide) => slide.id));

  const orderedSlides = order
    .map((id) => slides.find((slide) => slide.id === id))
    .filter(Boolean);

  const activeSlide = orderedSlides[0] ?? slides[0];

  function showNextSlide() {
    setOrder((current) => {
      if (current.length < 2) {
        return current;
      }

      return [...current.slice(1), current[0]];
    });
  }

  return (
    <section className="vision-gallery">
      <div className="vision-gallery__copy">
        <p className="vision-gallery__eyebrow">Spread card stack</p>
        <h2 className="vision-gallery__title">{activeSlide.title}</h2>
        <p className="vision-gallery__description">{activeSlide.detail}</p>
      </div>

      <div className="vision-gallery__stack-wrap">
        <div className="vision-gallery__stack" aria-label="Overlapping image stack">
          {orderedSlides
            .slice()
            .reverse()
            .map((slide, reversedIndex) => {
              const stackIndex = orderedSlides.length - 1 - reversedIndex;
              const isTopCard = stackIndex === 0;

              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`vision-gallery__stack-card${isTopCard ? " is-top" : ""}`}
                  style={{ "--stack-index": stackIndex }}
                  onClick={isTopCard ? showNextSlide : undefined}
                  aria-label={
                    isTopCard
                      ? `Show next image. Current image is ${slide.title}`
                      : slide.title
                  }
                >
                  <img src={slide.image} alt={slide.title} />
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ComputerVisionTab;
