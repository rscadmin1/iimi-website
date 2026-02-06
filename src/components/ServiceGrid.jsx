import { motion } from 'framer-motion';
import { services } from '../data/services';
import './ServiceGrid.css';

// Abstract SVG tile illustrations for each service icon type
function TileIllustration({ icon, size = 200 }) {
  const s = size;
  const c = '#1E3A5F'; // accent blue
  const r = '#C42020'; // brand red
  const d = '#4A90D9'; // highlight blue
  const g = '#8C8C8C'; // brand gray

  switch (icon) {
    case 'grid':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          {[0, 1, 2, 3].map(row =>
            [0, 1, 2, 3].map(col => (
              <rect key={`${row}-${col}`} x={30 + col * 38} y={30 + row * 38} width={30} height={30} rx={4}
                fill={(row + col) % 3 === 0 ? r : (row + col) % 4 === 0 ? g : c}
                opacity={(row + col) % 2 === 0 ? 0.9 : 0.45} />
            ))
          )}
        </svg>
      );
    case 'code':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <text x="40" y="80" fontFamily="monospace" fontSize="24" fill={r} opacity="0.7">{'</'}</text>
          <text x="80" y="80" fontFamily="monospace" fontSize="24" fill={d} opacity="0.5">{'>_'}</text>
          <rect x="35" y="95" width="90" height="3" rx="1" fill={c} opacity="0.4" />
          <rect x="35" y="105" width="60" height="3" rx="1" fill={r} opacity="0.25" />
          <rect x="35" y="115" width="110" height="3" rx="1" fill={c} opacity="0.5" />
          <rect x="50" y="125" width="75" height="3" rx="1" fill={g} opacity="0.3" />
          <rect x="35" y="135" width="95" height="3" rx="1" fill={c} opacity="0.4" />
          <circle cx="150" cy="70" r="20" fill={c} opacity="0.15" />
        </svg>
      );
    case 'nodes':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          {[[60, 50], [140, 50], [100, 100], [50, 140], [150, 140]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={12} fill={i === 2 ? r : i % 2 === 0 ? d : c} opacity={0.7} />
              {i < 4 && <line x1={cx} y1={cy} x2={100} y2={100} stroke={c} strokeWidth="1.5" opacity="0.3" />}
            </g>
          ))}
          <line x1={60} y1={50} x2={140} y2={50} stroke={g} strokeWidth="1" opacity="0.2" />
          <line x1={50} y1={140} x2={150} y2={140} stroke={g} strokeWidth="1" opacity="0.2" />
        </svg>
      );
    case 'chart':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          {[40, 70, 55, 90, 75, 100, 65].map((h, i) => (
            <rect key={i} x={30 + i * 22} y={160 - h} width={16} height={h} rx={2}
              fill={i % 3 === 0 ? r : (i % 3 === 1 ? d : c)} opacity={0.5 + i * 0.04} />
          ))}
          <line x1="25" y1="162" x2="185" y2="162" stroke={g} strokeWidth="1.5" opacity="0.4" />
        </svg>
      );
    case 'pill':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <rect x="50" y="70" width="100" height="60" rx="30" fill={c} opacity="0.5" />
          <rect x="100" y="70" width="50" height="60" rx="0 30 30 0" fill={r} opacity="0.5" />
          <circle cx="75" cy="100" r="6" fill={d} opacity="0.4" />
          <circle cx="125" cy="100" r="6" fill="var(--bg-primary)" opacity="0.5" />
        </svg>
      );
    case 'cross':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <rect x="80" y="40" width="40" height="120" rx="8" fill={r} opacity="0.6" />
          <rect x="40" y="80" width="120" height="40" rx="8" fill={r} opacity="0.4" />
          <circle cx="100" cy="100" r="15" fill="var(--bg-primary)" opacity="0.6" />
        </svg>
      );
    case 'scroll':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <rect x="55" y="35" width="90" height="130" rx="6" fill={c} opacity="0.4" />
          <rect x="65" y="50" width="55" height="3" rx="1" fill={r} opacity="0.5" />
          <rect x="65" y="60" width="70" height="3" rx="1" fill={g} opacity="0.3" />
          <rect x="65" y="70" width="45" height="3" rx="1" fill={r} opacity="0.35" />
          <rect x="65" y="85" width="60" height="3" rx="1" fill={c} opacity="0.5" />
          <rect x="65" y="95" width="50" height="3" rx="1" fill={g} opacity="0.3" />
          <rect x="65" y="110" width="65" height="3" rx="1" fill={r} opacity="0.4" />
          <circle cx="130" cy="145" r="12" fill={r} opacity="0.15" />
        </svg>
      );
    case 'house':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <polygon points="100,40 160,90 160,160 40,160 40,90" fill={c} opacity="0.5" />
          <polygon points="100,40 160,90 40,90" fill={r} opacity="0.25" />
          <rect x="80" y="110" width="40" height="50" rx="3" fill={r} opacity="0.5" />
          <rect x="55" y="95" width="20" height="20" rx="2" fill={d} opacity="0.3" />
        </svg>
      );
    case 'scan':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <rect x="40" y="50" width="120" height="100" rx="6" fill={c} opacity="0.3" />
          <line x1="35" y1="100" x2="165" y2="100" stroke={r} strokeWidth="2.5" opacity="0.7" />
          <rect x="55" y="65" width="30" height="25" rx="3" fill={d} opacity="0.3" />
          <rect x="95" y="60" width="50" height="30" rx="3" fill={c} opacity="0.4" />
          <rect x="60" y="115" width="80" height="3" rx="1" fill={g} opacity="0.3" />
          <rect x="70" y="125" width="60" height="3" rx="1" fill={r} opacity="0.2" />
        </svg>
      );
    case 'shield':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <path d="M100,35 L155,60 L155,115 Q155,160 100,175 Q45,160 45,115 L45,60 Z" fill={c} opacity="0.5" />
          <path d="M88,110 L98,120 L118,90" stroke={r} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </svg>
      );
    case 'pen':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <line x1="60" y1="150" x2="140" y2="50" stroke={r} strokeWidth="4" opacity="0.6" strokeLinecap="round" />
          <polygon points="140,50 148,44 152,52 144,58" fill={r} opacity="0.7" />
          <path d="M55 155 Q58 145 65 148" stroke={g} strokeWidth="2" fill="none" opacity="0.5" />
          <rect x="50" y="160" width="80" height="3" rx="1" fill={c} opacity="0.3" />
          <rect x="60" y="168" width="60" height="3" rx="1" fill={c} opacity="0.2" />
        </svg>
      );
    case 'globe':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="55" stroke={r} strokeWidth="2" fill="none" opacity="0.35" />
          <ellipse cx="100" cy="100" rx="30" ry="55" stroke={r} strokeWidth="1.5" fill="none" opacity="0.25" />
          <line x1="45" y1="80" x2="155" y2="80" stroke={c} strokeWidth="1" opacity="0.3" />
          <line x1="45" y1="120" x2="155" y2="120" stroke={c} strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="4" fill={r} opacity="0.7" />
          <circle cx="130" cy="78" r="3" fill={g} opacity="0.5" />
          <circle cx="70" cy="115" r="3" fill={d} opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 200 200">
          <rect x="40" y="40" width="120" height="120" rx="8" fill={c} opacity="0.3" />
        </svg>
      );
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServiceGrid() {
  return (
    <section className="service-grid" id="grid" aria-labelledby="services-heading">
      <h2 id="services-heading" className="sr-only">Our Services</h2>
      <motion.div
        className="service-grid__container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        role="list"
        aria-label="Service offerings"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="service-grid__item"
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            role="listitem"
            tabIndex={0}
            aria-label={`${service.name} — ${service.desc}. Since ${service.year}`}
          >
            <div className="service-grid__tile">
              <div className="service-grid__illustration" aria-hidden="true">
                <TileIllustration icon={service.icon} />
              </div>
              <div className="service-grid__info">
                <span className="service-grid__num" aria-hidden="true">No.{service.id}</span>
                <span className="service-grid__name">{service.name}</span>
              </div>
              {/* Hover + focus overlay */}
              <div className="service-grid__overlay" aria-hidden="true">
                <span className="service-grid__overlay-name">{service.name}</span>
                <span className="service-grid__overlay-desc">{service.desc}</span>
                <span className="service-grid__overlay-year">Since {service.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
