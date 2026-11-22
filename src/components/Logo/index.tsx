import styles from './Logo.module.css'

interface LogoProps {
  /** Exibe o nome da marca ao lado do símbolo. */
  showText?: boolean
}

/**
 * Logo original do Coffee Delivery.
 *
 * Conceito (gerado com apoio de IA — ver AGENTS.md / README.md):
 * um pin de localização (entrega) que abriga uma xícara fumegante (café),
 * com linhas de velocidade à esquerda sugerindo entrega rápida.
 * O SVG usa variáveis CSS para se adaptar ao Light/Dark Mode.
 */
export function Logo({ showText = true }: LogoProps) {
  return (
    <span className={styles.logo}>
      <svg
        className={styles.symbol}
        viewBox="-6 0 54 48"
        fill="none"
        role="img"
        aria-label="Coffee Delivery"
      >
        <path
          d="M-4 18h6M-5 23h7M-3 28h5"
          stroke="var(--color-yellow)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 2C13.5 2 6 10 6 19.5 6 32 24 46 24 46s18-14 18-26.5C42 10 34.5 2 24 2Z"
          fill="var(--color-purple)"
        />
        <path
          d="M19 7.5c-1.4 1.4 1.4 2.6 0 4M24 6.5c-1.4 1.4 1.4 2.6 0 4M29 7.5c-1.4 1.4 1.4 2.6 0 4"
          stroke="#F1E9C9"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M14.5 15h17v5.5a8.5 8.5 0 0 1-17 0V15Z" fill="#DBAC2C" />
        <path
          d="M31.5 16.5h1.8a3.2 3.2 0 0 1 0 6.4h-2.2"
          stroke="#DBAC2C"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M17 16.8h12" stroke="#C47F17" strokeWidth="1.4" strokeLinecap="round" />
      </svg>

      {showText && (
        <span className={styles.text} aria-hidden="true">
          <strong>Coffee</strong>
          <small>Delivery</small>
        </span>
      )}
    </span>
  )
}
