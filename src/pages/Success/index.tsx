import { DeliveryIllustration } from '../../components/DeliveryIllustration'
import { EmptyState } from '../../components/EmptyCart'
import { OrderSuccess } from '../../components/OrderSuccess'
import { useCart } from '../../hooks/useCart'
import { Container, PrimaryLink } from '../../styles/shared'
import { SuccessContent, Subtitle, Title } from './styles'

export function Success() {
  const { lastOrder } = useCart()

  // RN-09: confirmação sem pedido válido mostra estado vazio.
  if (!lastOrder) {
    return (
      <EmptyState
        title="Nenhum pedido confirmado"
        description="Você ainda não finalizou um pedido. Escolha seus cafés para começar."
      />
    )
  }

  return (
    <Container>
      <SuccessContent>
        <div>
          <Title>Uhu! Pedido confirmado</Title>
          <Subtitle>Agora é só aguardar que logo o café chegará até você</Subtitle>
          <OrderSuccess order={lastOrder} />
          <PrimaryLink to="/" style={{ marginTop: '2rem' }}>
            Fazer novo pedido
          </PrimaryLink>
        </div>

        <DeliveryIllustration />
      </SuccessContent>
    </Container>
  )
}
