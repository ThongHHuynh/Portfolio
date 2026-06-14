import Header from "./components/Header.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import IntroSection from "./components/IntroSection.jsx";
import Line from "./components/Line.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";

function App() {
  return (
    <>
      <Header />
      <Line size="large" />
      <main className="site-main" aria-label="Main content">
        <IntroSection />
        <Line size="medium" />
        <ProjectsSection />
        <Line size="medium" />
        <ContactSection />
      </main>
      <BackToTopButton />
      <Footer />
    </>
  );
}

export default App;
