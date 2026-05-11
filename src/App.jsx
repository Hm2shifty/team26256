import React from 'react';
import { Analytics } from "@vercel/analytics/next"
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Portfolio from './pages/Portfolio';
import Robot from './pages/Robot';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import Stats from './pages/Stats';
import Registration from './pages/Registration';
import Notebook from './pages/Notebook';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const { pathname } = useLocation();
  const isNotebook = pathname.startsWith('/notebook');

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className={isNotebook ? '' : 'container'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/notebook/*" element={<Notebook />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isNotebook && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
