import faceImage from "../assets/Face.JPG";
import "./IntroSection.css";

function IntroSection() {
  return (
    <section className="intro-section" id="about">
      <div className="intro-media" aria-label="Portrait">
        <img src={faceImage} alt="Face" className="intro-photo" />
      </div>
      <div className="intro-copy">
        <p className="intro-eyebrow">About</p>
        <h1 className="intro-title">I like to build robots that solve problems</h1>
        <p className="intro-text">
          Hi, I&apos;m Thong Huynh aka Tom, I&apos;m passionate about Robotics, AI and
          Automation. 
          I&apos;m building robot for SMEs to elevate their business.
        </p>
        <p className="intro-text">Check out some of my projects below!</p>
      </div>
    </section>
  );
}

export default IntroSection;
