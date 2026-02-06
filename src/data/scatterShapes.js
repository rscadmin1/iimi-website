// Shape definitions for the scatter layer and scatter hero
// Dense, artistic, organic + geometric mix -- mirrors the ecbs "controlled chaos"

export const heroShapes = [
  // === BOLD BRAND RED SILHOUETTES (like ecbs's gold silhouettes -- highly visible) ===
  { id: "h1", type: "blob1", x: 5, y: 8, size: 110, color: "var(--brand-red)", blur: 0, rotation: 15, opacity: 0.75 },
  { id: "h2", type: "flower", x: 78, y: 6, size: 90, color: "var(--brand-red)", blur: 0, rotation: -20, opacity: 0.65 },
  { id: "h3", type: "leaf", x: 88, y: 42, size: 100, color: "var(--brand-red)", blur: 0, rotation: 35, opacity: 0.6 },
  { id: "h4", type: "key", x: 12, y: 65, size: 85, color: "var(--brand-red-light)", blur: 0, rotation: -15, opacity: 0.55 },
  { id: "h5", type: "blob2", x: 65, y: 72, size: 95, color: "var(--brand-red)", blur: 0, rotation: 60, opacity: 0.6 },
  { id: "h6", type: "star", x: 40, y: 4, size: 55, color: "var(--brand-red)", blur: 0, rotation: 10, opacity: 0.5 },
  { id: "h7", type: "spiral", x: 92, y: 25, size: 80, color: "var(--brand-red)", blur: 0, rotation: 0, opacity: 0.5 },
  { id: "h8", type: "blob3", x: 55, y: 88, size: 75, color: "var(--brand-red-light)", blur: 0, rotation: -30, opacity: 0.45 },

  // === GOLD ACCENT SHAPES ===
  { id: "h9", type: "hexagon", x: 72, y: 12, size: 65, color: "var(--accent-gold)", blur: 0, rotation: 20, opacity: 0.6 },
  { id: "h10", type: "diamond", x: 18, y: 40, size: 50, color: "var(--accent-gold)", blur: 0, rotation: 45, opacity: 0.5 },
  { id: "h11", type: "arc", x: 85, y: 65, size: 70, color: "var(--accent-gold)", blur: 0, rotation: -10, opacity: 0.45 },
  { id: "h12", type: "ring", x: 30, y: 82, size: 60, color: "var(--accent-gold-light)", blur: 0, rotation: 0, opacity: 0.4 },
  { id: "h13", type: "cross", x: 50, y: 20, size: 40, color: "var(--accent-gold)", blur: 0, rotation: 15, opacity: 0.45 },

  // === GRAY STRUCTURAL SHAPES ===
  { id: "h14", type: "zigzag", x: 8, y: 30, size: 90, color: "var(--brand-gray)", blur: 0, rotation: 5, opacity: 0.3 },
  { id: "h15", type: "waves", x: 70, y: 50, size: 80, color: "var(--brand-gray-light)", blur: 0, rotation: -8, opacity: 0.25 },
  { id: "h16", type: "grid-pattern", x: 35, y: 60, size: 70, color: "var(--brand-gray)", blur: 0, rotation: 3, opacity: 0.2 },
  { id: "h17", type: "lines", x: 90, y: 82, size: 60, color: "var(--brand-gray)", blur: 0, rotation: 12, opacity: 0.2 },

  // === LARGE BLURRED SHADOW SHAPES (depth / atmosphere) ===
  { id: "h18", type: "circle", x: 15, y: 25, size: 220, color: "var(--brand-red-dim)", blur: 55, rotation: 0, opacity: 0.35 },
  { id: "h19", type: "circle", x: 70, y: 15, size: 260, color: "var(--accent-blue)", blur: 60, rotation: 0, opacity: 0.3 },
  { id: "h20", type: "circle", x: 45, y: 60, size: 240, color: "var(--brand-red-dim)", blur: 50, rotation: 0, opacity: 0.25 },
  { id: "h21", type: "circle", x: 85, y: 70, size: 200, color: "var(--accent-blue)", blur: 45, rotation: 0, opacity: 0.28 },
  { id: "h22", type: "circle", x: 5, y: 75, size: 180, color: "var(--bg-tertiary)", blur: 40, rotation: 0, opacity: 0.2 },
  { id: "h23", type: "circle", x: 55, y: 35, size: 300, color: "var(--accent-blue)", blur: 70, rotation: 0, opacity: 0.15 },

  // === ADDITIONAL ORGANIC SHAPES (filling space) ===
  { id: "h24", type: "blob1", x: 95, y: 10, size: 55, color: "var(--brand-red)", blur: 0, rotation: -40, opacity: 0.4 },
  { id: "h25", type: "leaf", x: 3, y: 50, size: 65, color: "var(--accent-gold)", blur: 0, rotation: 70, opacity: 0.35 },
  { id: "h26", type: "flower", x: 48, y: 42, size: 45, color: "var(--brand-red-dim)", blur: 0, rotation: 25, opacity: 0.3 },
  { id: "h27", type: "blob3", x: 25, y: 15, size: 50, color: "var(--brand-red)", blur: 0, rotation: -60, opacity: 0.35 },
  { id: "h28", type: "key", x: 80, y: 88, size: 55, color: "var(--brand-gray)", blur: 0, rotation: 45, opacity: 0.25 },
  { id: "h29", type: "blob2", x: 15, y: 90, size: 70, color: "var(--brand-red)", blur: 0, rotation: 20, opacity: 0.35 },
  { id: "h30", type: "star", x: 60, y: 5, size: 35, color: "var(--accent-gold)", blur: 0, rotation: -15, opacity: 0.4 },

  // === SMALL TYPOGRAPHIC FRAGMENTS ===
  { id: "h31", type: "text", x: 28, y: 18, content: "1996", size: 16, color: "var(--text-secondary)", blur: 0, rotation: -5, opacity: 0.45 },
  { id: "h32", type: "text", x: 72, y: 40, content: "4,200+", size: 14, color: "var(--brand-red)", blur: 0, rotation: 8, opacity: 0.5 },
  { id: "h33", type: "text", x: 10, y: 85, content: "24/7", size: 18, color: "var(--text-secondary)", blur: 0, rotation: -3, opacity: 0.35 },
  { id: "h34", type: "text", x: 90, y: 90, content: "BPO", size: 13, color: "var(--brand-red-dim)", blur: 0, rotation: 12, opacity: 0.3 },
  { id: "h35", type: "text", x: 45, y: 75, content: "HIPAA", size: 11, color: "var(--text-subtle)", blur: 0, rotation: -7, opacity: 0.25 },
  { id: "h36", type: "text", x: 82, y: 18, content: "20+", size: 15, color: "var(--accent-gold)", blur: 0, rotation: 5, opacity: 0.35 },

  // === GEOMETRIC ACCENTS (small, scattered) ===
  { id: "h37", type: "dots", x: 38, y: 48, size: 80, color: "var(--brand-red-dim)", blur: 0, rotation: 0, opacity: 0.25 },
  { id: "h38", type: "triangle", x: 58, y: 30, size: 40, color: "var(--accent-highlight)", blur: 0, rotation: -20, opacity: 0.3 },
  { id: "h39", type: "hexagon", x: 22, y: 55, size: 35, color: "var(--brand-red)", blur: 0, rotation: 30, opacity: 0.35 },
  { id: "h40", type: "diamond", x: 75, y: 58, size: 30, color: "var(--accent-gold)", blur: 0, rotation: 0, opacity: 0.3 },
  { id: "h41", type: "circle", x: 42, y: 92, size: 25, color: "var(--brand-red)", blur: 0, rotation: 0, opacity: 0.4 },
  { id: "h42", type: "ring", x: 10, y: 20, size: 45, color: "var(--brand-gray)", blur: 0, rotation: 0, opacity: 0.2 },
];

export const persistentShapes = [
  // Persistent shapes floating across the entire page with parallax
  // More prominent than before
  { id: "p1", type: "blob1", xStart: 1, size: 60, color: "var(--brand-red)", opacity: 0.12, parallaxSpeed: 0.3 },
  { id: "p2", type: "flower", xStart: 93, size: 45, color: "var(--brand-red-dim)", opacity: 0.1, parallaxSpeed: 0.5 },
  { id: "p3", type: "diamond", xStart: 89, size: 30, color: "var(--accent-gold)", opacity: 0.09, parallaxSpeed: 0.2 },
  { id: "p4", type: "leaf", xStart: 4, size: 50, color: "var(--brand-red)", opacity: 0.08, parallaxSpeed: 0.4 },
  { id: "p5", type: "dots", xStart: 95, size: 55, color: "var(--brand-red-dim)", opacity: 0.1, parallaxSpeed: 0.6 },
  { id: "p6", type: "spiral", xStart: 2, size: 45, color: "var(--brand-gray)", opacity: 0.06, parallaxSpeed: 0.35 },
  { id: "p7", type: "blob2", xStart: 91, size: 40, color: "var(--brand-red)", opacity: 0.08, parallaxSpeed: 0.45 },
  { id: "p8", type: "hexagon", xStart: 6, size: 55, color: "var(--accent-blue)", opacity: 0.05, parallaxSpeed: 0.25 },
  { id: "p9", type: "arc", xStart: 96, size: 35, color: "var(--brand-red)", opacity: 0.07, parallaxSpeed: 0.55 },
  { id: "p10", type: "star", xStart: 3, size: 28, color: "var(--accent-gold)", opacity: 0.06, parallaxSpeed: 0.3 },
  { id: "p11", type: "key", xStart: 94, size: 50, color: "var(--brand-gray)", opacity: 0.05, parallaxSpeed: 0.4 },
  { id: "p12", type: "blob3", xStart: 1, size: 65, color: "var(--brand-red-dim)", opacity: 0.07, parallaxSpeed: 0.2 },
];
