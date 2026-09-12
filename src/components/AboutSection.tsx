import { motion } from "framer-motion";
import { profile } from "../data/content";
import Reveal from "./Reveal";
import "./AboutSection.css";

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section about-inner">
        <motion.div
          className="about-photo-wrap"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-photo glass">
            <img src={profile.photo} alt={profile.name} />
          </div>
        </motion.div>

        <Reveal delay={0.1} className="about-copy">
          <p className="section-eyebrow">About me</p>
          <h1 className="about-title">
            {profile.name} <span className="about-alias">({profile.shortName})</span>
          </h1>
          <p className="about-role">{profile.role}</p>
          <p className="about-bio">{profile.bio}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutSection;
