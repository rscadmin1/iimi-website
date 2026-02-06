import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import { languages, offices } from '../data/services';
import ShapeSVG from './ShapeSVG';
import './EditorialFlow.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// Large background watermark words -- MORE visible
const editorialWatermarks = [
  { text: 'INTELLIGENT', x: -5, y: 1, size: 'clamp(100px, 16vw, 220px)', rotation: 0, opacity: 0.055 },
  { text: 'IMAGE', x: 45, y: 10, size: 'clamp(120px, 20vw, 280px)', rotation: -1, opacity: 0.05 },
  { text: 'MANAGEMENT', x: 0, y: 25, size: 'clamp(90px, 14vw, 190px)', rotation: 0, opacity: 0.05 },
  { text: 'HIPAA', x: 55, y: 40, size: 'clamp(110px, 18vw, 240px)', rotation: 2, opacity: 0.045 },
  { text: '24/7/365', x: 5, y: 52, size: 'clamp(100px, 17vw, 230px)', rotation: -1, opacity: 0.06 },
  { text: 'SECURE', x: 50, y: 65, size: 'clamp(120px, 20vw, 260px)', rotation: 0, opacity: 0.045 },
  { text: 'GLOBAL', x: -3, y: 78, size: 'clamp(110px, 18vw, 240px)', rotation: 1, opacity: 0.05 },
  { text: 'SINCE 1996', x: 40, y: 90, size: 'clamp(80px, 14vw, 180px)', rotation: -2, opacity: 0.04 },
];

// Floating decorative shapes that appear alongside text (bleeding into content)
const floatingDecorations = [
  { type: 'blob1', x: -8, y: 5, size: 90, color: 'var(--brand-red)', opacity: 0.2, rotation: 15 },
  { type: 'leaf', x: 92, y: 8, size: 70, color: 'var(--brand-red)', opacity: 0.15, rotation: -30 },
  { type: 'hexagon', x: 95, y: 18, size: 40, color: 'var(--accent-gold)', opacity: 0.18, rotation: 20 },
  { type: 'flower', x: -5, y: 22, size: 55, color: 'var(--brand-red-dim)', opacity: 0.12, rotation: 45 },
  { type: 'spiral', x: 90, y: 30, size: 60, color: 'var(--brand-gray)', opacity: 0.1, rotation: 0 },
  { type: 'blob2', x: -6, y: 38, size: 80, color: 'var(--brand-red)', opacity: 0.12, rotation: -20 },
  { type: 'diamond', x: 93, y: 42, size: 35, color: 'var(--brand-red)', opacity: 0.2, rotation: 45 },
  { type: 'star', x: -3, y: 48, size: 30, color: 'var(--accent-gold)', opacity: 0.15, rotation: 10 },
  { type: 'arc', x: 88, y: 55, size: 65, color: 'var(--brand-red-dim)', opacity: 0.1, rotation: -15 },
  { type: 'blob3', x: -4, y: 62, size: 70, color: 'var(--brand-red)', opacity: 0.1, rotation: 30 },
  { type: 'key', x: 94, y: 68, size: 50, color: 'var(--brand-gray)', opacity: 0.08, rotation: -25 },
  { type: 'ring', x: -2, y: 75, size: 45, color: 'var(--brand-red)', opacity: 0.12, rotation: 0 },
  { type: 'zigzag', x: 91, y: 80, size: 55, color: 'var(--brand-red-dim)', opacity: 0.08, rotation: 5 },
  { type: 'blob1', x: -7, y: 88, size: 65, color: 'var(--accent-gold)', opacity: 0.1, rotation: -40 },
  { type: 'triangle', x: 96, y: 92, size: 30, color: 'var(--brand-red)', opacity: 0.15, rotation: 20 },
];

// Inline abstract image tiles that break up the text
function InlineImageGroup({ items }) {
  return (
    <motion.div
      className="editorial__image-group"
      role="list"
      aria-label="Related services"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((item, i) => {
        // Parse caption: "Name. Description. Protocol No.X"
        const parts = item.caption.split('. ');
        const name = parts[0] || '';
        const desc = parts[1] || '';
        const num = parts[2] || '';
        return (
          <motion.div
            key={i}
            className="editorial__image-tile"
            variants={fadeUp}
            tabIndex={0}
            role="listitem"
            aria-label={`${name} — ${desc}. ${num}`}
          >
            <div className="editorial__tile-card">
              <div className="editorial__tile-illustration" aria-hidden="true">
                {item.svg}
              </div>
              <div className="editorial__tile-info">
                <span className="editorial__tile-num" aria-hidden="true">{num}</span>
                <span className="editorial__tile-name">{name}</span>
              </div>
              <div className="editorial__tile-overlay" aria-hidden="true">
                <span className="editorial__tile-overlay-name">{name}</span>
                <span className="editorial__tile-overlay-desc">{desc}</span>
                <span className="editorial__tile-overlay-num">{num}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function StatNumber({ value, label, suffix = '' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''), 10);
  const count = useCountUp(numericValue, isVisible, 2200);

  return (
    <div className="editorial__stat" ref={ref}>
      <span className="editorial__stat-number">{count.toLocaleString()}{suffix}</span>
      <span className="editorial__stat-label">{label}</span>
    </div>
  );
}

export default function EditorialFlow() {
  const imageGroup1 = [
    {
      caption: 'Data transformation pipeline. Process No.1',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          <rect x="20" y="60" width="45" height="80" rx="4" fill="#1E3A5F" opacity="0.6" />
          <rect x="78" y="40" width="45" height="120" rx="4" fill="#C42020" opacity="0.45" />
          <rect x="136" y="70" width="45" height="60" rx="4" fill="#4A90D9" opacity="0.4" />
          <line x1="65" y1="100" x2="78" y2="100" stroke="#8BA4C4" strokeWidth="2" opacity="0.5" />
          <line x1="123" y1="100" x2="136" y2="100" stroke="#8BA4C4" strokeWidth="2" opacity="0.5" />
        </svg>
      ),
    },
    {
      caption: 'Knowledge extraction. Process No.2',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="50" stroke="#1E3A5F" strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="30" stroke="#C42020" strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="100" cy="100" r="10" fill="#C42020" opacity="0.7" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle key={i} cx={100 + 50 * Math.cos(rad)} cy={100 + 50 * Math.sin(rad)}
                r="4" fill={i % 2 === 0 ? '#C42020' : '#4A90D9'} opacity="0.5" />
            );
          })}
        </svg>
      ),
    },
    {
      caption: 'Global network topology. Process No.3',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          {[[50, 50], [150, 50], [100, 100], [50, 150], [150, 150]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill={i === 2 ? '#C42020' : '#1E3A5F'} opacity="0.7" />
            </g>
          ))}
          <line x1="50" y1="50" x2="100" y2="100" stroke="#4A6480" strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="50" x2="100" y2="100" stroke="#4A6480" strokeWidth="1" opacity="0.3" />
          <line x1="50" y1="150" x2="100" y2="100" stroke="#4A6480" strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="150" x2="100" y2="100" stroke="#4A6480" strokeWidth="1" opacity="0.3" />
          <line x1="50" y1="50" x2="150" y2="50" stroke="#4A6480" strokeWidth="1" opacity="0.2" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="#4A6480" strokeWidth="1" opacity="0.2" />
        </svg>
      ),
    },
  ];

  const imageGroup2 = [
    {
      caption: 'Secure data handling. Protocol No.4',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M100,30 L160,60 L160,120 Q160,170 100,185 Q40,170 40,120 L40,60 Z"
            fill="#1E3A5F" opacity="0.4" />
          <path d="M88,110 L98,120 L118,90" stroke="#C42020" strokeWidth="4"
            fill="none" strokeLinecap="round" opacity="0.8" />
        </svg>
      ),
    },
    {
      caption: 'Multilingual processing. Protocol No.5',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="60" stroke="#1E3A5F" strokeWidth="1.5" fill="none" opacity="0.4" />
          <ellipse cx="100" cy="100" rx="35" ry="60" stroke="#C42020" strokeWidth="1" fill="none" opacity="0.3" />
          <ellipse cx="100" cy="100" rx="60" ry="35" stroke="#4A90D9" strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx="100" cy="100" r="5" fill="#C42020" opacity="0.8" />
          <text x="72" y="75" fontFamily="Inter" fontSize="9" fill="#8BA4C4" opacity="0.5">EN</text>
          <text x="118" y="75" fontFamily="Inter" fontSize="9" fill="#8BA4C4" opacity="0.5">DE</text>
          <text x="72" y="140" fontFamily="Inter" fontSize="9" fill="#8BA4C4" opacity="0.5">ES</text>
          <text x="118" y="140" fontFamily="Inter" fontSize="9" fill="#8BA4C4" opacity="0.5">HI</text>
        </svg>
      ),
    },
    {
      caption: 'Document digitization. Protocol No.6',
      svg: (
        <svg viewBox="0 0 200 200" fill="none">
          <rect x="40" y="30" width="120" height="140" rx="6" fill="#0D1E38" opacity="0.8" />
          <rect x="55" y="50" width="70" height="4" rx="1" fill="#C42020" opacity="0.5" />
          <rect x="55" y="62" width="90" height="4" rx="1" fill="#1E3A5F" opacity="0.4" />
          <rect x="55" y="74" width="50" height="4" rx="1" fill="#C42020" opacity="0.35" />
          <rect x="55" y="86" width="80" height="4" rx="1" fill="#1E3A5F" opacity="0.4" />
          <rect x="55" y="98" width="65" height="4" rx="1" fill="#8C8C8C" opacity="0.3" />
          <rect x="55" y="110" width="75" height="4" rx="1" fill="#1E3A5F" opacity="0.35" />
          <line x1="35" y1="130" x2="165" y2="130" stroke="#C42020" strokeWidth="2" opacity="0.6" />
          <rect x="55" y="140" width="60" height="4" rx="1" fill="#4A6480" opacity="0.3" />
          <rect x="55" y="150" width="45" height="4" rx="1" fill="#4A6480" opacity="0.25" />
        </svg>
      ),
    },
  ];

  return (
    <section className="editorial" id="editorial" aria-labelledby="editorial-heading">
      <h2 id="editorial-heading" className="sr-only">About IIMI</h2>

      {/* Large background watermark text throughout editorial (decorative) */}
      {editorialWatermarks.map((word, i) => (
        <motion.div
          key={`ewm-${i}`}
          className="editorial__watermark"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{
            opacity: word.opacity,
            scale: 1,
            transition: { delay: 0.05 + i * 0.06, duration: 1.5 },
          }}
          viewport={{ once: true }}
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            fontSize: word.size,
            transform: `rotate(${word.rotation}deg)`,
          }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Floating decorative shapes bleeding into the text from edges (decorative) */}
      {floatingDecorations.map((deco, i) => (
        <motion.div
          key={`deco-${i}`}
          className="editorial__floating-shape"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{
            opacity: deco.opacity,
            scale: 1,
            transition: { delay: 0.2 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] },
          }}
          viewport={{ once: true, amount: 0.1 }}
          style={{
            left: `${deco.x}%`,
            top: `${deco.y}%`,
            transform: `rotate(${deco.rotation}deg)`,
          }}
        >
          <ShapeSVG type={deco.type} size={deco.size} color={deco.color} />
        </motion.div>
      ))}

      {/* Paragraph 1: Introduction */}
      <motion.div
        className="editorial__text-block"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="editorial__intro">
          IIMI — Intelligent Image Management — is a global BPO leader that transforms all types
          of data into information and knowledge. Every data point is a result of someone's work,
          and it is essential for us to process, convert, and deliver it with precision.
        </p>
      </motion.div>

      <motion.div
        className="editorial__text-block"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="editorial__body">
          Every single record matters. IIMI manages virtually any labor-intensive data entry process
          off-site at a fraction of the cost of doing the work in-house. For us, every document is
          a story — every dataset a narrative waiting to be unlocked.
        </p>
      </motion.div>

      {/* Image Group 1 */}
      <InlineImageGroup items={imageGroup1} />

      {/* Paragraph 2: Philosophy */}
      <motion.div
        className="editorial__text-block"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="editorial__body">
          For us, every piece of data is valuable. The quality of processing can vary across the
          industry; nevertheless, we perceive each project as mission-critical. In a world full of
          information, we believe it makes sense to pave the way toward comprehension — to transform
          raw data into actionable intelligence.
        </p>
      </motion.div>

      <motion.div
        className="editorial__text-block"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="editorial__body">
          IIMI helps enterprises achieve the benefits of big data faster and with a greater return
          on investment. Every material record hides stories and people behind it. We realize that
          the data we handle has passed through dozens of people before reaching us, and will serve
          dozens more after we've processed it.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="editorial__stats-row"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <StatNumber value={4200} label="Employees" suffix="+" />
        <StatNumber value={24} label="Hours / 7 Days" suffix="/7" />
        <StatNumber value={20} label="Languages" suffix="+" />
        <StatNumber value={6} label="Global Offices" />
      </motion.div>

      {/* Image Group 2 */}
      <InlineImageGroup items={imageGroup2} />

      {/* Paragraph 3: Security */}
      <motion.div
        className="editorial__text-block"
        id="services"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        aria-labelledby="security-heading"
      >
        <h3 id="security-heading" className="sr-only">Security & Compliance</h3>
        <p className="editorial__body">
          We are HIPAA compliant. We are regularly audited by international audit firms to check for
          adherence to the latest standards and regulations. We maintain comprehensive, well-documented,
          clearly defined security and confidentiality procedures throughout our organization and follow
          industry best practices in security.
        </p>
      </motion.div>

      <motion.div
        className="editorial__text-block"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="editorial__body">
          Established in 1996. Cost-competitive. Blue Chip client list. Diversified country risk.
          US Minority Supplier. Our workforce spans the globe — from Henderson, Nevada to Colombo,
          Dhaka, Kolkata, and Singapore. What's more, the majority of our 4,200+ team members are
          dedicated professionals whose expertise is what sets IIMI apart.
        </p>
      </motion.div>

      {/* === GLOBAL REACH — Artistic typographic composition === */}
      <div className="editorial__global-section" id="global" aria-labelledby="global-heading">
        <h3 id="global-heading" className="sr-only">Global Reach</h3>

        {/* Opening statement */}
        <motion.div
          className="editorial__text-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="editorial__body editorial__body--dim">
            A bridge from the past to the future, from analog to digital.
            IIMI illustrates the cross-section of global data processing
            at a particular time and place.
          </p>
        </motion.div>

        {/* Language Cloud — artistic scattered typography */}
        <motion.div
          className="editorial__lang-cloud"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          aria-labelledby="lang-cloud-heading"
        >
          <motion.h3 className="editorial__lang-label" variants={fadeUp} id="lang-cloud-heading">
            We process data in
          </motion.h3>
          <ul className="editorial__lang-words" role="list" aria-label="Supported languages">
            {languages.map((lang, i) => {
              // Vary sizes and weights for visual rhythm
              const sizes = [28, 18, 34, 22, 16, 40, 20, 26, 14, 32, 24, 19, 36, 17, 30, 21, 15, 38, 23, 27, 25];
              const weights = [700, 500, 800, 400, 600, 700, 500, 600, 400, 800, 500, 400, 700, 500, 600, 400, 500, 700, 600, 500, 700];
              const isAccent = i % 5 === 0;
              const isRed = i % 7 === 0;
              return (
                <motion.li
                  key={lang}
                  className={`editorial__lang-word ${isAccent ? 'editorial__lang-word--accent' : ''} ${isRed ? 'editorial__lang-word--red' : ''}`}
                  style={{
                    fontSize: `clamp(${Math.round(sizes[i] * 0.6)}px, ${sizes[i] * 0.14}vw, ${sizes[i]}px)`,
                    fontWeight: weights[i],
                    display: 'inline',
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.9 },
                    visible: {
                      opacity: isAccent ? 1 : (0.4 + (sizes[i] / 60)),
                      y: 0,
                      scale: 1,
                      transition: {
                        delay: i * 0.04,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  {lang}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Cities — large typographic display */}
        <motion.div
          className="editorial__cities"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="editorial__cities-label" variants={fadeUp}>
            Our offices span
          </motion.p>
          <div className="editorial__cities-grid">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                className="editorial__city-block"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: i * 0.1,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                <span className="editorial__city-name">{office.city}</span>
                <span className="editorial__city-country">{office.country}</span>
                <span className="editorial__city-line" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing — large feature text */}
        <motion.div
          className="editorial__closing"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="editorial__closing-big">24/7/365</span>
          <span className="editorial__closing-sub">coverage across every time zone</span>
        </motion.div>

        {/* Final sentence */}
        <motion.p
          className="editorial__final"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          All these qualities drive us every day.
        </motion.p>

      </div>
    </section>
  );
}
