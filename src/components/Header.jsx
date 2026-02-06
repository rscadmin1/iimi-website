import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';
import './Header.css';

const sections = [
  { num: 1, id: 'grid', label: 'Services Overview' },
  { num: 2, id: 'hero', label: 'Our Mission' },
  { num: 3, id: 'editorial', label: 'About & Philosophy' },
  { num: 4, id: 'services', label: 'Security & Compliance' },
  { num: 5, id: 'global', label: 'Global Reach' },
  { num: 6, id: 'footer', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Return focus to hamburger (WCAG 2.4.3)
    setTimeout(() => hamburgerRef.current?.focus(), 100);
  }, []);

  const scrollTo = (id) => {
    closeMenu();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
      >
        <div className="header__inner">
          <div className="header__left">
            <button
              className="header__logo"
              onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="IIMI — Go to top of page"
            >
              <img
                src="/iimi-logo.png"
                alt=""
                className="header__logo-img"
                aria-hidden="true"
              />
              <span className="sr-only">IIMI Home</span>
            </button>
          </div>

          <div className="header__right">
            <nav className="header__nav" aria-label="Page sections">
              <span className="header__nav-label" aria-hidden="true">about:</span>
              {sections.map((s) => (
                <button
                  key={s.num}
                  className="header__nav-link"
                  onClick={() => scrollTo(s.id)}
                  aria-label={`Go to section ${s.num}: ${s.label}`}
                >
                  {s.num}
                </button>
              ))}
              <span className="header__nav-divider" aria-hidden="true">———</span>
              <a
                href="https://www.iimdirect.com/"
                className="header__nav-ext"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit IIMI main website (opens in new tab)"
              >
                site
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </nav>

            {/* Hamburger / X toggle */}
            <button
              ref={hamburgerRef}
              className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mega-menu"
            >
              <span className="hamburger__line hamburger__line--1" aria-hidden="true" />
              <span className="hamburger__line hamburger__line--2" aria-hidden="true" />
              <span className="hamburger__line hamburger__line--3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MegaMenu
            onClose={closeMenu}
            onNavigate={scrollTo}
          />
        )}
      </AnimatePresence>
    </>
  );
}
