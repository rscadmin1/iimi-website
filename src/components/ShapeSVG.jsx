// Reusable SVG shape renderer for scatter elements
// Includes geometric AND organic/artistic shapes
// All shapes are decorative — aria-hidden is applied by parent

export default function ShapeSVG({ type, size, color, ariaHidden = true }) {
  const s = size;
  const half = s / 2;

  switch (type) {
    case 'hexagon':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <polygon
            points={`${half},${s * 0.05} ${s * 0.93},${s * 0.25} ${s * 0.93},${s * 0.75} ${half},${s * 0.95} ${s * 0.07},${s * 0.75} ${s * 0.07},${s * 0.25}`}
            fill={color}
          />
        </svg>
      );

    case 'circle':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <circle cx={half} cy={half} r={half * 0.9} fill={color} />
        </svg>
      );

    case 'triangle':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <polygon
            points={`${half},${s * 0.08} ${s * 0.92},${s * 0.88} ${s * 0.08},${s * 0.88}`}
            fill={color}
          />
        </svg>
      );

    case 'diamond':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <polygon
            points={`${half},${s * 0.05} ${s * 0.95},${half} ${half},${s * 0.95} ${s * 0.05},${half}`}
            fill={color}
          />
        </svg>
      );

    case 'cross':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <rect x={s * 0.35} y={s * 0.1} width={s * 0.3} height={s * 0.8} rx={2} fill={color} />
          <rect x={s * 0.1} y={s * 0.35} width={s * 0.8} height={s * 0.3} rx={2} fill={color} />
        </svg>
      );

    case 'ring':
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <circle cx={half} cy={half} r={half * 0.8} stroke={color} strokeWidth={s * 0.08} fill="none" />
        </svg>
      );

    // --- ORGANIC / ARTISTIC SHAPES ---

    case 'blob1':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M100,20 C140,20 180,50 175,90 C170,130 190,160 150,180 C110,200 60,185 35,150 C10,115 20,70 50,45 C80,20 60,20 100,20Z" fill={color} />
        </svg>
      );

    case 'blob2':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M95,15 C130,10 170,35 180,75 C190,115 170,145 145,170 C120,195 75,195 50,170 C25,145 15,110 25,75 C35,40 60,20 95,15Z" fill={color} />
        </svg>
      );

    case 'blob3':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M80,15 C120,5 165,25 180,60 C195,95 185,135 160,160 C135,185 95,200 60,180 C25,160 5,120 15,80 C25,40 40,25 80,15Z" fill={color} />
        </svg>
      );

    case 'flower':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 100 + 40 * Math.cos(rad);
            const cy = 100 + 40 * Math.sin(rad);
            return <ellipse key={i} cx={cx} cy={cy} rx="28" ry="18"
              transform={`rotate(${angle}, ${cx}, ${cy})`} fill={color} opacity={0.8} />;
          })}
          <circle cx="100" cy="100" r="15" fill={color} />
        </svg>
      );

    case 'leaf':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M100,20 C140,40 175,80 180,130 C185,180 140,190 100,180 C60,190 15,180 20,130 C25,80 60,40 100,20Z" fill={color} />
          <line x1="100" y1="30" x2="100" y2="175" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          <path d="M100,70 C80,85 65,100 60,120" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" fill="none" />
          <path d="M100,70 C120,85 135,100 140,120" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case 'key':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <circle cx="70" cy="70" r="35" fill={color} />
          <circle cx="70" cy="70" r="15" fill="rgba(0,0,0,0.15)" />
          <rect x="95" y="60" width="85" height="18" rx="4" fill={color} />
          <rect x="155" y="60" width="12" height="35" rx="3" fill={color} />
          <rect x="140" y="60" width="8" height="25" rx="2" fill={color} />
        </svg>
      );

    case 'spiral':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M100,100 C100,80 120,60 140,60 C160,60 180,80 180,100 C180,120 160,150 130,150 C100,150 70,130 70,100 C70,70 90,40 120,30 C150,20 185,35 195,65"
            stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      );

    case 'arc':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <path d="M30,150 Q100,10 170,150" stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="30" cy="150" r="6" fill={color} />
          <circle cx="170" cy="150" r="6" fill={color} />
        </svg>
      );

    case 'zigzag':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <polyline points="20,160 50,60 80,140 110,40 140,120 170,50 190,100"
            stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'star':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          <polygon
            points="100,15 118,75 180,75 130,110 148,170 100,135 52,170 70,110 20,75 82,75"
            fill={color}
          />
        </svg>
      );

    case 'dots': {
      const dotR = s * 0.05;
      const gap = s * 0.2;
      const dots = [];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          dots.push(
            <circle
              key={`${row}-${col}`}
              cx={s * 0.15 + col * gap}
              cy={s * 0.15 + row * gap}
              r={dotR}
              fill={color}
            />
          );
        }
      }
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {dots}
        </svg>
      );
    }

    case 'lines': {
      const lines = [];
      for (let i = 0; i < 5; i++) {
        lines.push(
          <line
            key={i}
            x1={s * 0.1}
            y1={s * 0.15 + i * s * 0.17}
            x2={s * 0.9}
            y2={s * 0.15 + i * s * 0.17}
            stroke={color}
            strokeWidth={1.5}
          />
        );
      }
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          {lines}
        </svg>
      );
    }

    case 'waves':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          {[0, 1, 2, 3, 4].map(i => (
            <path key={i}
              d={`M10,${60 + i * 25} Q55,${40 + i * 25} 100,${60 + i * 25} T190,${60 + i * 25}`}
              stroke={color} strokeWidth="2.5" fill="none" opacity={1 - i * 0.15} />
          ))}
        </svg>
      );

    case 'grid-pattern':
      return (
        <svg width={s} height={s} viewBox="0 0 200 200" fill="none">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <g key={i}>
              <line x1={30 + i * 28} y1="20" x2={30 + i * 28} y2="180" stroke={color} strokeWidth="1" opacity="0.6" />
              <line x1="20" y1={30 + i * 28} x2="180" y2={30 + i * 28} stroke={color} strokeWidth="1" opacity="0.6" />
            </g>
          ))}
          <circle cx="86" cy="86" r="4" fill={color} />
          <circle cx="114" cy="114" r="4" fill={color} />
          <circle cx="86" cy="142" r="4" fill={color} />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
          <rect width={s} height={s} rx={4} fill={color} />
        </svg>
      );
  }
}
