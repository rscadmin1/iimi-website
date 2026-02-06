import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SocialLinks.css';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/intelligent-image-management/' },
  { label: 'Facebook', href: 'https://www.facebook.com/iimdirect/' },
];

const contactLinks = [
  { label: 'Careers', href: 'https://www.iimdirect.com/career/' },
  { label: 'Email', href: 'mailto:info@iimdirect.com' },
  { label: 'Contact', href: 'https://www.iimdirect.com/contact/' },
];

const allLinks = [...socialLinks, ...contactLinks];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 1.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function LinkItem({ link, index }) {
  const isExternal = link.href.startsWith('http');
  const isMail = link.href.startsWith('mailto:');

  return (
    <motion.li
      custom={index}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <a
        href={link.href}
        className="fixed-links__link"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={
          isMail
            ? 'Email IIMI: info@iimdirect.com'
            : isExternal
            ? `${link.label} (opens in new tab)`
            : link.label
        }
      >
        {link.label}
      </a>
    </motion.li>
  );
}

export default function SocialLinks() {
  const [coalesced, setCoalesced] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          const winHeight = window.innerHeight;
          const nearBottom = scrollTop + winHeight >= docHeight - 150;
          setCoalesced(nearBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* === SEPARATED: Fixed corner blocks === */}
      <nav
        className={`fixed-links fixed-links--left ${coalesced ? 'fixed-links--hidden' : ''}`}
        aria-label="Social media links"
      >
        <motion.div
          className="fixed-links__label-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="fixed-links__label">Socials</span>
          <span className="fixed-links__line" aria-hidden="true" />
        </motion.div>
        <ul className="fixed-links__list" role="list">
          {socialLinks.map((link, i) => (
            <LinkItem key={link.label} link={link} index={i} />
          ))}
        </ul>
      </nav>

      <nav
        className={`fixed-links fixed-links--right ${coalesced ? 'fixed-links--hidden' : ''}`}
        aria-label="Contact links"
      >
        <motion.div
          className="fixed-links__label-row fixed-links__label-row--right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="fixed-links__line" aria-hidden="true" />
          <span className="fixed-links__label">Connect</span>
        </motion.div>
        <ul className="fixed-links__list fixed-links__list--right" role="list">
          {contactLinks.map((link, i) => (
            <LinkItem key={link.label} link={link} index={i} />
          ))}
        </ul>
      </nav>

      {/* === COALESCED: Evenly spaced horizontal row === */}
      <nav
        className={`coalesced-bar ${coalesced ? 'coalesced-bar--visible' : ''}`}
        aria-label="Quick links"
      >
        {allLinks.map((link) => {
          const isExternal = link.href.startsWith('http');
          const isMail = link.href.startsWith('mailto:');
          return (
            <a
              key={link.label}
              href={link.href}
              className="coalesced-bar__link"
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={
                isMail
                  ? 'Email IIMI: info@iimdirect.com'
                  : isExternal
                  ? `${link.label} (opens in new tab)`
                  : link.label
              }
              tabIndex={coalesced ? 0 : -1}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
