import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { services, offices } from '../data/services';
import './MegaMenu.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.15 } },
};

const panelVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.25 },
  },
  exit: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

const companyLinks = [
  { label: 'About IIMI', href: 'https://www.iimdirect.com/welcome-to-iimi/' },
  { label: 'Security', href: 'https://www.iimdirect.com/security-and-confidentiality/' },
  { label: 'Case Studies', href: 'https://www.iimdirect.com/case-studies/' },
  { label: 'Data Labeling & AI', href: 'https://www.iimdirect.com/data-labeling-ai/' },
  { label: 'Blog', href: 'https://www.iimdirect.com/blog/' },
  { label: 'Careers', href: 'https://www.iimdirect.com/career/' },
  { label: 'Contact', href: 'https://www.iimdirect.com/contact/' },
];

const pageAnchors = [
  { label: 'Services Overview', id: 'grid' },
  { label: 'Our Mission', id: 'hero' },
  { label: 'About & Philosophy', id: 'editorial' },
  { label: 'Security & Compliance', id: 'services' },
  { label: 'Global Reach', id: 'global' },
  { label: 'Contact', id: 'footer' },
];

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MegaMenu({ onClose, onNavigate }) {
  const menuRef = useRef(null);

  // Escape key to close (WCAG 2.1.1)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap (WCAG 2.4.3)
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Auto-focus first link on open (WCAG 2.4.3)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (menuRef.current) {
        const first = menuRef.current.querySelector(FOCUSABLE_SELECTOR);
        first?.focus();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="megamenu"
      id="mega-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={menuRef}
    >
      <motion.div className="megamenu__panel" variants={panelVariants}>
        {/* Background watermark */}
        <div className="megamenu__watermark" aria-hidden="true">MENU</div>

        <motion.div className="megamenu__content" variants={staggerContainer}>

          {/* Column 1: Services */}
          <div className="megamenu__column" role="group" aria-labelledby="menu-heading-services">
            <motion.h2 className="megamenu__heading" id="menu-heading-services" variants={itemVariants}>
              Services
            </motion.h2>
            <ul className="megamenu__list" role="list">
              {services.map((service) => (
                <motion.li key={service.id} variants={itemVariants} role="listitem">
                  <a
                    href="https://www.iimdirect.com/services/"
                    className="megamenu__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${service.name} — ${service.desc} (opens in new tab)`}
                  >
                    <span className="megamenu__link-name">{service.name}</span>
                    <span className="megamenu__link-desc" aria-hidden="true">{service.desc}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="megamenu__column">
            <motion.h2 className="megamenu__heading" id="menu-heading-company" variants={itemVariants}>
              Company
            </motion.h2>
            <ul className="megamenu__list" role="list" aria-labelledby="menu-heading-company">
              {companyLinks.map((link, i) => (
                <motion.li key={i} variants={itemVariants} role="listitem">
                  <a
                    href={link.href}
                    className="megamenu__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in new tab)`}
                  >
                    <span className="megamenu__link-name">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.h2 className="megamenu__heading megamenu__heading--mt" id="menu-heading-page" variants={itemVariants}>
              This Page
            </motion.h2>
            <ul className="megamenu__list" role="list" aria-labelledby="menu-heading-page">
              {pageAnchors.map((anchor, i) => (
                <motion.li key={i} variants={itemVariants} role="listitem">
                  <button
                    className="megamenu__link megamenu__link--btn"
                    onClick={() => onNavigate(anchor.id)}
                    aria-label={`Go to section: ${anchor.label}`}
                  >
                    <span className="megamenu__link-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="megamenu__link-name">{anchor.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Column 3: Global Offices + CTA */}
          <div className="megamenu__column" role="group" aria-labelledby="menu-heading-offices">
            <motion.h2 className="megamenu__heading" id="menu-heading-offices" variants={itemVariants}>
              Global Offices
            </motion.h2>
            <ul className="megamenu__list megamenu__list--offices" role="list">
              {offices.map((office, i) => (
                <motion.li key={i} className="megamenu__office" variants={itemVariants} role="listitem">
                  <span className="megamenu__office-city">{office.city}</span>
                  <span className="megamenu__office-country">{office.country}</span>
                  <a
                    href={`tel:${office.phone.replace(/\s/g, '')}`}
                    className="megamenu__office-phone"
                    aria-label={`Call ${office.city} office: ${office.phone}`}
                  >
                    {office.phone}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div className="megamenu__cta-block" variants={itemVariants}>
              <a
                href="https://www.iimdirect.com/request-quote/"
                className="megamenu__cta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Request a Quote (opens in new tab)"
              >
                Request a Quote
              </a>
              <div className="megamenu__contact-row">
                <a href="tel:+17024304693" className="megamenu__contact-link" aria-label="Call IIMI: +1 (702) 430 4693">
                  +1 (702) 430 4693
                </a>
                <a href="mailto:info@iimdirect.com" className="megamenu__contact-link" aria-label="Email IIMI: info@iimdirect.com">
                  info@iimdirect.com
                </a>
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* Bottom bar */}
        <motion.div className="megamenu__bottom" variants={itemVariants}>
          <span className="megamenu__bottom-text">
            Intelligent Image Management Inc. — Est. 1996
          </span>
          <span className="megamenu__bottom-text">
            4,200+ Employees &middot; 24/7/365 &middot; 20 Languages
          </span>
        </motion.div>
      </motion.div>

      {/* Click outside to close */}
      <div
        className="megamenu__backdrop"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />
    </motion.div>
  );
}
