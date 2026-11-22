import { CheckCircle, MapPinLine, WarningCircle } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'
import { useTheme as useStyledTheme } from 'styled-components'
import type { CepStatus } from '../../hooks/useCepLookup'
import type { CheckoutFormData } from '../../schemas/checkout'
import { maskCep } from '../../utils/format'
import { TextInput } from '../TextInput'
import { AddressGrid, CardHeader, FormCard, Spinner } from './styles'

interface DeliveryAddressFormProps {
  cepStatus: CepStatus
}

function CepHint({ status }: { status: CepStatus }) {
  switch (status) {
    case 'loading':
      return (
        <>
          <Spinner size={14} aria-hidden /> Buscando endereço…
        </>
      )
    case 'success':
      return (
        <>
          <CheckCircle size={14} weight="fill" aria-hidden /> Endereço encontrado. Informe o número.
        </>
      )
    case 'error':
      return (
        <>
          <WarningCircle size={14} weight="fill" aria-hidden /> Não foi possível consultar o CEP agora.
          Preencha o endereço manualmente.
        </>
      )
    default:
      return null
  }
}

/** Formulário de endereço (RF-08). Lê/escreve no formulário do Checkout via `useFormContext`. */
export function DeliveryAddressForm({ cepStatus }: DeliveryAddressFormProps) {
  const { colors } = useStyledTheme()
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()

  const cepField = register('cep', {
    onChange: (event) => {
      event.target.value = maskCep(event.target.value)
    },
  })

  return (
    <FormCard aria-labelledby="address-title">
      <CardHeader>
        <MapPinLine size={22} color={colors.yellowDark} aria-hidden />
        <div>
          <h3 id="address-title">Endereço de Entrega</h3>
          <p>Informe o endereço onde deseja receber seu pedido</p>
        </div>
      </CardHeader>

      <AddressGrid>
        <TextInput
          id="cep"
          label="CEP"
          placeholder="CEP"
          inputMode="numeric"
          autoComplete="postal-code"
          className="cep"
          error={errors.cep?.message}
          hint={<CepHint status={cepStatus} />}
          aria-busy={cepStatus === 'loading'}
          {...cepField}
        />
        <TextInput
          id="street"
          label="Rua"
          placeholder="Rua"
          autoComplete="address-line1"
          className="street"
          error={errors.street?.message}
          {...register('street')}
        />
        <TextInput
          id="number"
          label="Número"
          placeholder="Número"
          inputMode="numeric"
          className="number"
          error={errors.number?.message}
          {...register('number')}
        />
        <TextInput
          id="complement"
          label="Complemento"
          placeholder="Complemento"
          optional
          className="complement"
          error={errors.complement?.message}
          {...register('complement')}
        />
        <TextInput
          id="neighborhood"
          label="Bairro"
          placeholder="Bairro"
          className="neighborhood"
          error={errors.neighborhood?.message}
          {...register('neighborhood')}
        />
        <TextInput
          id="city"
          label="Cidade"
          placeholder="Cidade"
          autoComplete="address-level2"
          className="city"
          error={errors.city?.message}
          {...register('city')}
        />
        <TextInput
          id="uf"
          label="UF"
          placeholder="UF"
          maxLength={2}
          autoComplete="address-level1"
          className="uf"
          error={errors.uf?.message}
          {...register('uf')}
        />
      </AddressGrid>
    </FormCard>
  )
}
