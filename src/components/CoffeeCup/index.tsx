import { useId } from 'react'
import type { CoffeeArt } from '../../types/coffee'

interface CoffeeCupProps {
  art: CoffeeArt
  size?: number
  /** Texto alternativo; omita para ilustração decorativa. */
  label?: string
}

/**
 * Ilustração original (SVG) de uma xícara vista de cima.
 * Cada café do catálogo define sua paleta em `art`, então um único
 * componente reutilizável gera as 14 imagens do catálogo.
 */
export function CoffeeCup({ art, size = 120, label }: CoffeeCupProps) {
  const uid = useId().replace(/:/g, '')
  const { liquid, foam, pattern = 'none', cup = '#f4f1ee' } = art

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <radialGradient id={`liquid-${uid}`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={foam ?? liquid} />
          <stop offset="100%" stopColor={liquid} />
        </radialGradient>
      </defs>

      {/* pires */}
      <ellipse cx="60" cy="64" rx="56" ry="54" fill="#00000014" />
      <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#e3ddd8" strokeWidth="2" />
      <circle cx="60" cy="60" r="44" fill="#f7f4f1" />

      {/* alça */}
      <rect x="92" y="54" width="22" height="12" rx="6" fill={cup} stroke="#d9d2cc" strokeWidth="1.5" />

      {/* xícara */}
      <circle cx="58" cy="60" r="38" fill={cup} stroke="#d9d2cc" strokeWidth="1.5" />
      <circle cx="58" cy="60" r="31" fill={`url(#liquid-${uid})`} />

      {pattern === 'heart' && (
        <path
          d="M58 76c-9-7-15-12-15-19a7.5 7.5 0 0 1 15-2 7.5 7.5 0 0 1 15 2c0 7-6 12-15 19Z"
          fill="#fffaf2"
          opacity="0.9"
        />
      )}

      {pattern === 'dust' &&
        [
          [48, 50], [62, 46], [70, 58], [54, 66], [66, 70], [46, 62], [58, 56], [74, 66], [50, 74],
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#5a2e14" opacity="0.7" />)}

      {pattern === 'ice' && (
        <g fill="#ffffff" opacity="0.65" stroke="#ffffff" strokeWidth="1">
          <rect x="44" y="46" width="12" height="12" rx="3" transform="rotate(-12 50 52)" />
          <rect x="62" y="50" width="11" height="11" rx="3" transform="rotate(18 67 55)" />
          <rect x="50" y="64" width="12" height="12" rx="3" transform="rotate(8 56 70)" />
        </g>
      )}

      {/* reflexo */}
      <path d="M38 46a28 28 0 0 1 14-12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
    </svg>
  )
}
