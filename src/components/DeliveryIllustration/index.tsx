import { useTheme } from 'styled-components'

/** Ilustração original (SVG) de um entregador de scooter levando café. */
export function DeliveryIllustration() {
  const { colors } = useTheme()

  return (
    <svg viewBox="0 0 492 293" width="100%" style={{ maxWidth: 492 }} aria-hidden fill="none">
      {/* chão */}
      <ellipse cx="246" cy="276" rx="220" ry="12" fill={colors.button} />

      {/* linhas de velocidade */}
      <g stroke={colors.yellow} strokeWidth="6" strokeLinecap="round">
        <path d="M20 150h70" />
        <path d="M40 180h60" />
        <path d="M10 210h80" />
      </g>

      {/* rodas */}
      <circle cx="150" cy="240" r="34" fill="#272221" />
      <circle cx="150" cy="240" r="14" fill="#d7d5d5" />
      <circle cx="372" cy="240" r="34" fill="#272221" />
      <circle cx="372" cy="240" r="14" fill="#d7d5d5" />

      {/* corpo da scooter */}
      <path d="M110 220c0-30 30-50 70-50h110l40 40h50c10 0 20 10 20 20v10H110v-20Z" fill="#8047F8" />
      <path d="M330 210l20-90h22" stroke="#4B2995" strokeWidth="10" strokeLinecap="round" />
      <circle cx="378" cy="118" r="8" fill="#DBAC2C" />

      {/* baú com logo */}
      <rect x="92" y="96" width="96" height="76" rx="10" fill="#DBAC2C" />
      <rect x="92" y="96" width="96" height="16" rx="8" fill="#C47F17" />
      <path d="M128 132h24v8a12 12 0 0 1-24 0v-8Z" fill="#fff" />
      <path d="M152 134h3a4 4 0 0 1 0 8h-3" stroke="#fff" strokeWidth="2.5" />

      {/* entregador */}
      <path d="M232 170l-12-60c-2-14 8-24 22-24h18c14 0 22 10 20 22l-10 62h-38Z" fill="#4B2995" />
      <path d="M248 170l-6 44h28l30-44" stroke="#272221" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M272 108l58 14" stroke="#4B2995" strokeWidth="14" strokeLinecap="round" />
      <circle cx="252" cy="58" r="26" fill="#f1c9a5" />
      <path d="M224 56a28 28 0 0 1 56 0v4h-56v-4Z" fill="#C47F17" />
      <rect x="262" y="52" width="24" height="10" rx="5" fill="#EBE5F9" />
    </svg>
  )
}
