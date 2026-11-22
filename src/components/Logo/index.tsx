import logoIcon from '../../assets/logo-icon.svg'
import { LogoContainer, Wordmark } from './styles'

interface LogoProps {
  /** Exibe o nome da marca ao lado do símbolo. */
  showText?: boolean
}

/**
 * Logo original do Coffee Delivery (criada com IA — ver README "Branding com IA").
 * Símbolo: pin de entrega com xícara fumegante + linhas de velocidade.
 * O nome é texto real (acessível e nítido), com cores vindas do tema.
 */
export function Logo({ showText = true }: LogoProps) {
  return (
    <LogoContainer>
      <img src={logoIcon} alt={showText ? '' : 'Coffee Delivery'} width={44} height={40} />
      {showText && (
        <Wordmark>
          <strong>Coffee</strong>
          <small>Delivery</small>
        </Wordmark>
      )}
    </LogoContainer>
  )
}
