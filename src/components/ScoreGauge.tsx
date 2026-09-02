interface ScoreGaugeProps {
  score: number;
  minScore?: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/**
 * SVG half-arc gauge matching the Figma design.
 * Arc spans from left (180°) to right (0°) across the top.
 * Score text is rendered BELOW the arc by the parent, controlled by showLabel.
 */
export default function ScoreGauge({
  score,
  minScore = 300,
  maxScore = 900,
  size = 'md',
  showLabel = false,
}: ScoreGaugeProps) {
  const pct = Math.max(0, Math.min(1, (score - minScore) / (maxScore - minScore)));

  // SVG coordinate space: 200×96, arc centre at (100, 84), radius 64
  const cx = 100;
  const cy = 84;
  const r  = 64;
  const strokeW = 9;

  const toXY = (deg: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy - r * Math.sin((deg * Math.PI) / 180),
  });

  const startA = 180;   // left end
  const endA   = 0;     // right end
  // Progress sweeps from left (180°) toward right (0°) across the top arch
  const progA  = startA - pct * 180;

  const s   = toXY(startA);
  const e   = toXY(endA);
  const pe  = toXY(progA);
  const dot = toXY(progA);

  const bgPath   = `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 0 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
  const progPath = `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 0 1 ${pe.x.toFixed(2)} ${pe.y.toFixed(2)}`;

  // Sizes
  const dims =
    size === 'sm'
      ? { svgW: 130, svgH: 76,  scoreSize: 'text-2xl' }
      : size === 'lg'
      ? { svgW: 210, svgH: 116, scoreSize: 'text-5xl' }
      : { svgW: 170, svgH: 95,  scoreSize: 'text-3xl' };  // md default

  // ViewBox: arc top is ~cy-r=20, bottom is cy=84, give it to 92
  const vbH = 92;

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={dims.svgW}
        height={dims.svgH}
        viewBox={`0 0 200 ${vbH}`}
        className="gauge-svg"
        aria-label={`Credit score gauge: ${score}`}
      >
        {/* ── Range labels ── */}
        <text x="10"  y="90" fontSize="8.5" fill="#9CA3AF" textAnchor="middle" fontFamily="Inter, sans-serif">300</text>
        <text x="190" y="90" fontSize="8.5" fill="#9CA3AF" textAnchor="middle" fontFamily="Inter, sans-serif">900</text>

        {/* ── Background track ── */}
        <path
          d={bgPath}
          fill="none"
          stroke="#E5E1DB"
          strokeWidth={strokeW}
          strokeLinecap="round"
        />

        {/* ── Progress arc (only when pct > 0) ── */}
        {pct > 0.01 && (
          <path
            d={progPath}
            fill="none"
            stroke="#2D6A4F"
            strokeWidth={strokeW}
            strokeLinecap="round"
          />
        )}

        {/* ── Endpoint indicator dot ── */}
        <circle cx={dot.x} cy={dot.y} r="5.5" fill="#2D6A4F" />
        <circle cx={dot.x} cy={dot.y} r="2.5" fill="white" />
      </svg>

      {showLabel && (
        <div className="text-center mt-1">
          <span className={`font-bold text-text-primary leading-none ${dims.scoreSize}`}>
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
