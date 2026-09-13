/**
 * The house mark: an audiogram.
 *
 * Thresholds are plotted with the quiet end at the top, so a normal ear
 * traces a line near the top and age-related loss falls away to the right —
 * low frequencies preserved, high ones lost first. It is the one drawing
 * every patient here leaves with, and the shape is specific to this trade
 * rather than a generic sound wave.
 *
 * Decorative only, so it is hidden from assistive technology.
 */
export default function AudiogramMark({
  className = "",
}: {
  className?: string;
}) {
  // 250Hz .. 8kHz across, hearing level down
  const points = [
    [0, 18], [1, 20], [2, 24], [3, 34], [4, 52], [5, 68], [6, 80], [7, 88],
  ];
  const x = (i: number) => 20 + i * 68;
  const y = (v: number) => 16 + v * 1.5;

  return (
    <svg
      viewBox="0 0 560 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {[0, 1, 2, 3].map((r) => (
        <line
          key={r}
          x1="12"
          x2="548"
          y1={20 + r * 48}
          y2={20 + r * 48}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      <polyline
        points={points.map(([i, v]) => `${x(i)},${y(v)}`).join(" ")}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map(([i, v]) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r="5"
          fill="var(--paper, #FBF8F7)"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      ))}
    </svg>
  );
}
