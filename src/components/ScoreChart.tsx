import { mockScoreHistory } from '../data/mockData';

/**
 * Responsive SVG line chart for credit score history.
 * Matches the Figma Score screen "Score history" card.
 */
export default function ScoreChart() {
  const data   = mockScoreHistory;
  const scores = data.map(d => d.score);

  // Chart dimensions in SVG units (responsive via viewBox)
  const vbW  = 320;
  const vbH  = 130;
  const padL = 12;
  const padR = 28;   // extra right space for the "624" label
  const padT = 20;   // space above for the last-point label
  const padB = 22;   // space below for month labels

  const chartW = vbW - padL - padR;
  const chartH = vbH - padT - padB;

  const minS = Math.min(...scores) - 8;
  const maxS = Math.max(...scores) + 8;

  const xStep = chartW / (data.length - 1);
  const toX   = (i: number) => padL + i * xStep;
  const toY   = (s: number) => padT + chartH - ((s - minS) / (maxS - minS)) * chartH;

  const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.score), ...d }));

  const linePath  = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaClose = `L${pts[pts.length - 1].x.toFixed(1)},${(padT + chartH).toFixed(1)} L${pts[0].x.toFixed(1)},${(padT + chartH).toFixed(1)} Z`;
  const areaPath  = linePath + ' ' + areaClose;

  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-label="Credit score history chart"
    >
      <defs>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2D6A4F" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={areaPath} fill="url(#chartAreaGrad)" />

      {/* Trend line */}
      <path
        d={linePath}
        fill="none"
        stroke="#2D6A4F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Data-point circles */}
      {pts.map((p, i) => {
        const isLast = i === pts.length - 1;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isLast ? 5 : 3.5}
            fill={isLast ? '#2D6A4F' : '#ffffff'}
            stroke="#2D6A4F"
            strokeWidth="1.8"
          />
        );
      })}

      {/* Last-point score label (top-right of final dot) */}
      <text
        x={last.x + 6}
        y={last.y - 6}
        fontSize="10"
        fontWeight="600"
        fill="#2D6A4F"
        fontFamily="Inter, sans-serif"
        dominantBaseline="middle"
      >
        {last.score}
      </text>

      {/* Month axis labels */}
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={padT + chartH + 14}
          fontSize="9.5"
          fill="#9CA3AF"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
        >
          {p.month}
        </text>
      ))}
    </svg>
  );
}
