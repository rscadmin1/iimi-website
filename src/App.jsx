import Header from './components/Header';
import ServiceGrid from './components/ServiceGrid';
import ScatterHero from './components/ScatterHero';
import EditorialFlow from './components/EditorialFlow';
import ScatterLayer from './components/ScatterLayer';
import SocialLinks from './components/SocialLinks';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Skip navigation (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent floating shapes across all sections */}
      <ScatterLayer />

      {/* Fixed navigation */}
      <Header />

      {/* Fixed left-side social links */}
      <SocialLinks />

      {/* Main content flow */}
      <main id="main-content" className="app__main">
        {/* Dense service grid (replaces ecbs scan gallery) */}
        <ServiceGrid />

        {/* Interactive scatter canvas (centerpiece) */}
        <ScatterHero />

        {/* Continuous editorial text + inline images */}
        <EditorialFlow />
      </main>

      {/* Minimal footer */}
      <Footer />
    </div>
  );
}

export default App;
