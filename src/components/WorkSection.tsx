import { work } from "../data/content";
import Reveal from "./Reveal";
import "./WorkSection.css";

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section">
        <Reveal>
          <p className="section-eyebrow">Work</p>
          <h2 className="section-title">Experience</h2>
        </Reveal>

        <div className="work-list">
          {work.map((entry, i) => (
            <Reveal key={entry.company} delay={i * 0.08} className="work-entry glass">
              <div className="work-entry-header">
                <div>
                  <h3 className="work-role">{entry.role}</h3>
                  <p className="work-company">{entry.company}</p>
                </div>
                <p className="work-period">{entry.period}</p>
              </div>

              <div className="work-items">
                {entry.items.map((item) => (
                  <div className="work-item" key={item.title}>
                    <h4 className="work-item-title">{item.title}</h4>
                    <p className="work-item-desc">{item.description}</p>
                    <div className="tag-row">
                      {item.tools.map((tool) => (
                        <span className="tag" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
