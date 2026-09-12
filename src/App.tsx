import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import ProjectsSection from "./components/ProjectsSection";
import AwardSection from "./components/AwardSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main className="site-main" aria-label="Main content">
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <AwardSection />
        <ContactSection />
      </main>
      <BackToTopButton />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
