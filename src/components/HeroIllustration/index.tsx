/**
 * Ilustração original (SVG) do hero: copo de café para viagem com a marca,
 * sobre um círculo amarelo, com grãos de café — inspirada na composição do Figma.
 */
export function HeroIllustration() {
  return (
    <svg viewBox="0 0 476 360" width="100%" style={{ maxWidth: 476 }} aria-hidden fill="none">
      <defs>
        <radialGradient id="hero-circle" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#F1C94B" />
          <stop offset="100%" stopColor="#DBAC2C" />
        </radialGradient>
        <linearGradient id="hero-cup" x1="0" x2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#E9E3DE" />
        </linearGradient>
      </defs>

      {/* círculo e anel decorativo */}
      <circle cx="270" cy="180" r="140" fill="url(#hero-circle)" />
      <circle cx="270" cy="180" r="160" stroke="#8047F8" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 10" />

      {/* sombra */}
      <ellipse cx="230" cy="330" rx="90" ry="10" fill="#000" opacity="0.12" />

      {/* copo */}
      <path d="M160 118h140l-16 206a12 12 0 0 1-12 11h-84a12 12 0 0 1-12-11L160 118Z" fill="url(#hero-cup)" />
      <path d="M167 190h126l-6 78H173l-6-78Z" fill="#272221" />
      {/* tampa */}
      <rect x="150" y="96" width="160" height="26" rx="8" fill="#403937" />
      <rect x="170" y="80" width="120" height="22" rx="8" fill="#574F4D" />
      <rect x="218" y="84" width="36" height="6" rx="3" fill="#272221" />

      {/* marca no copo */}
      <g transform="translate(206 204) scale(1.05)">
        <path d="M24 2C13.5 2 6 10 6 19.5 6 32 24 46 24 46s18-14 18-26.5C42 10 34.5 2 24 2Z" fill="#8047F8" />
        <path d="M14.5 15h17v5.5a8.5 8.5 0 0 1-17 0V15Z" fill="#DBAC2C" />
        <path d="M31.5 16.5h1.8a3.2 3.2 0 0 1 0 6.4h-2.2" stroke="#DBAC2C" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* vapor */}
      <g stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.9">
        <path d="M205 66c-10-12 10-18 0-32" />
        <path d="M232 60c-10-12 10-18 0-32" />
        <path d="M259 66c-10-12 10-18 0-32" />
      </g>

      {/* grãos de café */}
      {[
        [340, 250, -30], [372, 222, 20], [356, 288, 60], [392, 266, -10], [318, 300, 35],
        [96, 120, 40], [418, 150, -50], [110, 290, 10],
      ].map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="15" ry="10" fill="#5A2E14" />
          <path d="M-12 1c8-4 16 3 24-1" stroke="#2A140A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}
