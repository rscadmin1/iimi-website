import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { persistentShapes } from '../data/scatterShapes';
import ShapeSVG from './ShapeSVG';
import './ScatterLayer.css';

export default function ScatterLayer() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scatter-layer" aria-hidden="true">
      {persistentShapes.map((shape, i) => {
        const yOffset = scrollY * shape.parallaxSpeed * 0.12;
        // Alternate sides and distribute vertically
        const baseY = 5 + (i * 8);

        return (
          <motion.div
            key={shape.id}
            className="scatter-layer__shape"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: shape.opacity,
              scale: 1,
              transition: { delay: 0.5 + i * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            }}
            style={{
              left: `${shape.xStart}%`,
              top: `calc(${baseY}% + ${yOffset}px)`,
              transform: `translateX(-50%)`,
            }}
          >
            <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
