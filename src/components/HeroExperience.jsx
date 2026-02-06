import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ShapeSVG from './ShapeSVG';
import './HeroExperience.css';

/* ============================================================
   DATA PARTICLE CANVAS
   Animated particles flowing left→right representing data
   being processed and transformed
   ============================================================ */
function DataCanvas({ mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const PARTICLE_COUNT = 120;
    const colors = [
      'rgba(196, 32, 32, 0.6)',   // brand red
      'rgba(196, 32, 32, 0.3)',
      'rgba(212, 168, 67, 0.5)',   // gold
      'rgba(212, 168, 67, 0.25)',
      'rgba(74, 144, 217, 0.4)',   // highlight blue
      'rgba(163, 187, 218, 0.3)',  // text secondary
      'rgba(255, 255, 255, 0.15)',
      'rgba(255, 255, 255, 0.08)',
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0.3 + Math.random() * 1.2,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        originalVx: 0.3 + Math.random() * 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        trail: [],
      });
    }

    // Connection lines between nearby particles
    const drawConnections = (p, allParticles) => {
      for (let j = 0; j < allParticles.length; j++) {
        const other = allParticles[j];
        if (other === p) continue;
        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(196, 32, 32, ${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const time = Date.now() * 0.001;

      particles.current.forEach((p) => {
        // Mouse influence
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Return to base speed
        p.vx += (p.originalVx - p.vx) * 0.02;
        p.vy *= 0.98;

        // Move
        p.x += p.vx;
        p.y += p.vy + Math.sin(time + p.pulsePhase) * 0.15;

        // Wrap around
        if (p.x > canvas.width + 10) { p.x = -10; p.trail = []; }
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const alpha = (t / p.trail.length) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.lineWidth = p.size * 0.5;
            ctx.moveTo(p.trail[t].x, p.trail[t].y);
            ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
            ctx.stroke();
          }
        }

        // Draw particle
        const pulse = 1 + Math.sin(time * 2 + p.pulsePhase) * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        drawConnections(p, particles.current);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-exp__canvas" aria-hidden="true" />;
}

/* ============================================================
   STAT COUNTER
   ============================================================ */
function HeroStat({ value, suffix, label, delay }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });
  const count = useCountUp(value, isVisible, 2000);

  return (
    <motion.div
      className="hero-exp__stat"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true }}
    >
      <span className="hero-exp__stat-number">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="hero-exp__stat-label">{label}</span>
    </motion.div>
  );
}

/* ============================================================
   ROTATING WORD CYCLE
   Cycles through what IIMI transforms
   ============================================================ */
const transformWords = [
  'Documents',
  'Medical Claims',
  'Financial Data',
  'Prescriptions',
  'Handwritten Records',
  'Historical Archives',
  'AI Training Data',
  'Real Estate Titles',
];

function WordCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % transformWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="hero-exp__cycler">
      <AnimatePresence mode="wait">
        <motion.span
          key={transformWords[index]}
          className="hero-exp__cycler-word"
          initial={{ opacity: 0, y: 24, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -24, rotateX: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {transformWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ============================================================
   FLOATING INTERACTIVE SHAPES (orbit the content)
   ============================================================ */
const floatingShapes = [
  { type: 'hexagon', size: 50, color: 'var(--brand-red)', x: 8, y: 15, rotation: 15, opacity: 0.35 },
  { type: 'ring', size: 70, color: 'var(--brand-red-dim)', x: 88, y: 20, rotation: -10, opacity: 0.25 },
  { type: 'triangle', size: 35, color: 'var(--accent-gold)', x: 92, y: 70, rotation: 30, opacity: 0.3 },
  { type: 'blob1', size: 80, color: 'var(--brand-red)', x: 5, y: 72, rotation: -20, opacity: 0.2 },
  { type: 'diamond', size: 30, color: 'var(--accent-gold)', x: 15, y: 45, rotation: 45, opacity: 0.25 },
  { type: 'spiral', size: 55, color: 'var(--brand-gray)', x: 85, y: 48, rotation: 0, opacity: 0.15 },
  { type: 'star', size: 25, color: 'var(--brand-red)', x: 78, y: 12, rotation: 10, opacity: 0.3 },
  { type: 'arc', size: 60, color: 'var(--brand-red-dim)', x: 20, y: 85, rotation: -30, opacity: 0.15 },
  { type: 'blob2', size: 45, color: 'var(--accent-gold-dim)', x: 70, y: 82, rotation: 20, opacity: 0.2 },
  { type: 'leaf', size: 40, color: 'var(--brand-red)', x: 50, y: 8, rotation: -15, opacity: 0.2 },
];

/* ============================================================
   MAIN HERO COMPONENT
   ============================================================ */
export default function HeroExperience() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      className="hero-exp"
      id="hero"
      ref={sectionRef}
      aria-label="IIMI — Transforming data into intelligence"
    >
      <h1 className="sr-only">
        IIMI — Intelligent Image Management. We transform your data into actionable intelligence. 4,200+ employees, 20 languages, operating 24/7/365 since 1996.
      </h1>

      {/* Interactive particle canvas */}
      <DataCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Background watermarks */}
      <div className="hero-exp__watermarks" aria-hidden="true">
        <span className="hero-exp__watermark" style={{ left: '2%', top: '8%' }}>TRANSFORM</span>
        <span className="hero-exp__watermark hero-exp__watermark--lg" style={{ left: '30%', top: '35%' }}>IIMI</span>
        <span className="hero-exp__watermark" style={{ right: '5%', top: '60%' }}>DATA</span>
        <span className="hero-exp__watermark" style={{ left: '10%', bottom: '15%' }}>INTELLIGENCE</span>
      </div>

      {/* Floating draggable shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={`hero-shape-${i}`}
          className="hero-exp__floating-shape"
          aria-hidden="true"
          tabIndex={-1}
          drag
          dragConstraints={sectionRef}
          dragElastic={0.15}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
          initial={{ opacity: 0, scale: 0.3, rotate: shape.rotation - 30 }}
          animate={{
            opacity: shape.opacity,
            scale: 1,
            rotate: shape.rotation,
            transition: { delay: 1 + i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          }}
          whileHover={{ scale: 1.25, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.85 }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            cursor: 'grab',
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}

      {/* === MAIN CONTENT === */}
      <div className="hero-exp__content">
        {/* Eyebrow */}
        <motion.div
          className="hero-exp__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <span className="hero-exp__eyebrow-line" aria-hidden="true" />
          <span>Est. 1996 — Global BPO Leader</span>
          <span className="hero-exp__eyebrow-line" aria-hidden="true" />
        </motion.div>

        {/* Main headline */}
        <div className="hero-exp__headline">
          <motion.div
            className="hero-exp__headline-row"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          >
            <span className="hero-exp__headline-text">We Transform</span>
          </motion.div>

          <motion.div
            className="hero-exp__headline-row hero-exp__headline-row--accent"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          >
            <WordCycler />
          </motion.div>

          <motion.div
            className="hero-exp__headline-row"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          >
            <span className="hero-exp__headline-text">Into Intelligence</span>
          </motion.div>
        </div>

        {/* Value proposition */}
        <motion.p
          className="hero-exp__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          From handwritten records to AI training data, IIMI manages virtually
          any labor-intensive data process — at a fraction of the cost, with
          enterprise-grade security. HIPAA compliant. 24/7/365.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="hero-exp__cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <a
            href="https://www.iimdirect.com/request-quote/"
            className="hero-exp__cta hero-exp__cta--primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Request a Quote (opens in new tab)"
          >
            Request a Quote
          </a>
          <a
            href="https://www.iimdirect.com/case-studies/"
            className="hero-exp__cta hero-exp__cta--secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Case Studies (opens in new tab)"
          >
            Case Studies
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero-exp__stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: 1.6, duration: 0.6 } }}
          viewport={{ once: true }}
        >
          <HeroStat value={4200} suffix="+" label="Employees Worldwide" delay={1.7} />
          <div className="hero-exp__stats-divider" aria-hidden="true" />
          <HeroStat value={20} suffix="" label="Languages Supported" delay={1.85} />
          <div className="hero-exp__stats-divider" aria-hidden="true" />
          <HeroStat value={29} suffix="" label="Years of Excellence" delay={2.0} />
          <div className="hero-exp__stats-divider" aria-hidden="true" />
          <HeroStat value={5} suffix="" label="Global Offices" delay={2.15} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-exp__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 1 } }}
        aria-hidden="true"
      >
        <span className="hero-exp__scroll-text">Scroll to explore</span>
        <motion.span
          className="hero-exp__scroll-arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
