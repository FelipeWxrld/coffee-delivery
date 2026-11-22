import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { CartSummary } from '../../components/CartSummary'
import { DeliveryAddressForm } from '../../components/DeliveryAddressForm'
import { EmptyCart } from '../../components/EmptyCart'
import { PaymentMethodSelector } from '../../components/PaymentMethodSelector'
import { useCart } from '../../hooks/useCart'
import { useCepLookup } from '../../hooks/useCepLookup'
import { checkoutSchema, type CheckoutFormData } from '../../schemas/checkout'
import type { CepAddress } from '../../services/viacep'
import { Container, TitleXS } from '../../styles/shared'
import { CheckoutForm, Column } from './styles'

const CEP_NOT_FOUND = 'CEP não encontrado. Verifique o número digitado.'
const CEP_LOADING = 'Aguarde a consulta do CEP terminar.'

export function Checkout() {
  const navigate = useNavigate()
  const { items, checkout } = useCart()

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', uf: '' },
  })
  const { handleSubmit, setValue, setError, clearErrors, watch, setFocus } = form

  // Autopreenchimento (RF-08): só sobrescreve campos que a API devolveu.
  const fillAddress = useCallback(
    (address: CepAddress) => {
      const options = { shouldValidate: true, shouldDirty: true }
      if (address.street) setValue('street', address.street, options)
      if (address.neighborhood) setValue('neighborhood', address.neighborhood, options)
      if (address.city) setValue('city', address.city, options)
      if (address.uf) setValue('uf', address.uf, options)
      setFocus(address.street ? 'number' : 'street')
    },
    [setValue, setFocus],
  )

  const cepStatus = useCepLookup(watch('cep'), fillAddress)

  useEffect(() => {
    if (cepStatus === 'not-found') setError('cep', { type: 'manual', message: CEP_NOT_FOUND })
    if (cepStatus === 'success') clearErrors('cep')
  }, [cepStatus, setError, clearErrors])

  function onSubmit(data: CheckoutFormData) {
    // RN-10: não confirmar com CEP inexistente ou ainda em consulta.
    if (cepStatus === 'not-found' || cepStatus === 'loading') {
      setError('cep', { type: 'manual', message: cepStatus === 'loading' ? CEP_LOADING : CEP_NOT_FOUND })
      setFocus('cep')
      return
    }

    const { paymentMethod, ...address } = data
    checkout({
      paymentMethod,
      address: {
        ...address,
        uf: address.uf.toUpperCase(),
        complement: address.complement?.trim() || undefined,
      },
    })
    navigate('/success')
  }

  // RF-11 / RN-09: carrinho vazio não permite checkout.
  if (items.length === 0) return <EmptyCart />

  return (
    <Container>
      <FormProvider {...form}>
        <CheckoutForm onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Finalizar pedido">
          <Column>
            <TitleXS as="h1">Complete seu pedido</TitleXS>
            <DeliveryAddressForm cepStatus={cepStatus} />
            <PaymentMethodSelector />
          </Column>

          <Column>
            <TitleXS>Cafés selecionados</TitleXS>
            <CartSummary isSubmitting={form.formState.isSubmitting} />
          </Column>
        </CheckoutForm>
      </FormProvider>
    </Container>
  )
}
