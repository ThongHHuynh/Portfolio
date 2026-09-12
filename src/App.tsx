import { Navigate, Route, Routes } from "react-router-dom";
import BackToTopButton from "./components/BackToTopButton";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollManager from "./components/ScrollManager";
import CV from "./pages/CV";
import SideQuest from "./pages/SideQuest";
import SideQuestDetail from "./pages/SideQuestDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";

function App() {
  return (
    <>
      <ScrollManager />
      <Header />

      <main className="site-main" id="main" aria-label="Main content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/side-quest" element={<SideQuest />} />
          <Route path="/side-quest/:slug" element={<SideQuestDetail />} />
          {/* Old path kept so any shared /fun link still lands correctly. */}
          <Route path="/fun" element={<Navigate to="/side-quest" replace />} />
          <Route path="/cv" element={<CV />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <BackToTopButton />
      <Footer />
    </>
  );
}

export default App;
