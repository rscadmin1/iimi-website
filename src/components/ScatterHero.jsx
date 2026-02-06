import { useRef } from 'react';
import { motion } from 'framer-motion';
import { heroShapes } from '../data/scatterShapes';
import ShapeSVG from './ShapeSVG';
import './ScatterHero.css';

const titleLines = [
  { text: 'OUR.', delay: 0 },
  { text: 'WORKFORCE.', delay: 0.12 },
  { text: 'IS.YOUR.', delay: 0.24 },
  { text: 'WORKFORCE', delay: 0.36 },
];

// Large background watermark words -- MORE VISIBLE than before
const watermarkWords = [
  { text: 'DATA', x: 2, y: 5, size: 'clamp(120px, 20vw, 260px)', rotation: 0, opacity: 0.06 },
  { text: 'SCAN', x: 48, y: 12, size: 'clamp(100px, 17vw, 220px)', rotation: -2, opacity: 0.05 },
  { text: 'IIMI', x: 8, y: 38, size: 'clamp(160px, 28vw, 360px)', rotation: 0, opacity: 0.07 },
  { text: 'GLOBAL', x: 45, y: 50, size: 'clamp(90px, 15vw, 200px)', rotation: 2, opacity: 0.045 },
  { text: 'BPO', x: 70, y: 72, size: 'clamp(130px, 22vw, 280px)', rotation: -1, opacity: 0.06 },
  { text: 'TRANSFORM', x: -5, y: 78, size: 'clamp(80px, 13vw, 170px)', rotation: 0, opacity: 0.04 },
  { text: 'PROCESS', x: 55, y: 30, size: 'clamp(70px, 11vw, 150px)', rotation: -3, opacity: 0.035 },
  { text: '4200+', x: 30, y: 65, size: 'clamp(100px, 16vw, 200px)', rotation: 1, opacity: 0.04 },
];

export default function ScatterHero() {
  const constraintsRef = useRef(null);

  // Split shapes into layers
  const blurShapes = heroShapes.filter((s) => s.blur > 0);
  const solidShapes = heroShapes.filter((s) => s.blur === 0 && s.type !== 'text');
  const textFragments = heroShapes.filter((s) => s.type === 'text');

  // Interleave: some shapes render BEHIND title, some ABOVE
  const behindTitle = solidShapes.slice(0, Math.floor(solidShapes.length * 0.6));
  const aboveTitle = solidShapes.slice(Math.floor(solidShapes.length * 0.6));

  return (
    <section className="scatter-hero" id="hero" ref={constraintsRef} aria-label="Our Mission">
      <h1 className="sr-only">OUR WORKFORCE IS YOUR WORKFORCE — IIMI, Intelligent Image Management</h1>

      {/* Layer 0: Giant background watermark text (decorative) */}
      {watermarkWords.map((word, i) => (
        <motion.div
          key={`wm-${i}`}
          className="scatter-hero__watermark"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{
            opacity: word.opacity,
            scale: 1,
            transition: { delay: 0.1 + i * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] },
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

      {/* Layer 1: Blurred atmospheric shapes (decorative) */}
      {blurShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="scatter-hero__blur-shape"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: shape.opacity,
            scale: 1,
            transition: { duration: 2, ease: 'easeOut' },
          }}
          viewport={{ once: true }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            background: shape.color,
            filter: `blur(${shape.blur}px)`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      {/* Layer 2: Draggable shapes BEHIND the title (decorative) */}
      {behindTitle.map((shape, i) => (
        <motion.div
          key={shape.id}
          className="scatter-hero__shape scatter-hero__shape--behind"
          aria-hidden="true"
          tabIndex={-1}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 250, bounceDamping: 18 }}
          initial={{ opacity: 0, scale: 0.3, rotate: shape.rotation - 20 }}
          whileInView={{
            opacity: shape.opacity,
            scale: 1,
            rotate: shape.rotation,
            transition: {
              delay: 0.15 + i * 0.04,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          whileHover={{ scale: 1.18, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9 }}
          viewport={{ once: true }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            cursor: 'grab',
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}

      {/* Layer 3: Title text -- sits in the middle of the chaos */}
      <div className="scatter-hero__title-block">
        {titleLines.map((line, i) => (
          <motion.div
            key={i}
            className="scatter-hero__title-line"
            initial={{ opacity: 0, x: -40, skewX: 3 }}
            whileInView={{
              opacity: 1,
              x: 0,
              skewX: 0,
              transition: {
                delay: line.delay + 0.15,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            viewport={{ once: true }}
          >
            {line.text}
          </motion.div>
        ))}
        <motion.p
          className="scatter-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.8 },
          }}
          viewport={{ once: true }}
        >
          everything.can.be.managed
        </motion.p>
      </div>

      {/* Layer 4: Draggable shapes ABOVE the title (decorative) */}
      {aboveTitle.map((shape, i) => (
        <motion.div
          key={shape.id}
          className="scatter-hero__shape scatter-hero__shape--above"
          aria-hidden="true"
          tabIndex={-1}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 250, bounceDamping: 18 }}
          initial={{ opacity: 0, scale: 0.3, rotate: shape.rotation + 15 }}
          whileInView={{
            opacity: shape.opacity * 0.7,
            scale: 1,
            rotate: shape.rotation,
            transition: {
              delay: 0.5 + i * 0.05,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          whileHover={{ scale: 1.18, opacity: shape.opacity, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.9 }}
          viewport={{ once: true }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            cursor: 'grab',
          }}
        >
          <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
        </motion.div>
      ))}

      {/* Layer 5: Typographic fragments (decorative) */}
      {textFragments.map((shape, i) => (
        <motion.span
          key={shape.id}
          className="scatter-hero__text-fragment"
          aria-hidden="true"
          tabIndex={-1}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: shape.opacity,
            y: 0,
            transition: { delay: 0.6 + i * 0.08, duration: 0.7 },
          }}
          viewport={{ once: true }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            fontSize: shape.size,
            color: shape.color,
            transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
            cursor: 'grab',
          }}
        >
          {shape.content}
        </motion.span>
      ))}
    </section>
  );
}
