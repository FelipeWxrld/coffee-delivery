import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTheme as useStyledTheme } from 'styled-components'
import type { PaymentMethod } from '../../types/coffee'
import type { CheckoutFormData } from '../../schemas/checkout'
import { PAYMENT_LABELS, PAYMENT_METHODS } from '../../data/paymentMethods'
import { CardHeader, FormCard } from '../DeliveryAddressForm/styles'
import { ErrorMessage, Option, Options } from './styles'

const ICONS: Record<PaymentMethod, ReactNode> = {
  credit: <CreditCard size={16} aria-hidden />,
  debit: <Bank size={16} aria-hidden />,
  cash: <Money size={16} aria-hidden />,
}

/** Seleção obrigatória da forma de pagamento (RF-09). Radios nativos = acessível por teclado. */
export function PaymentMethodSelector() {
  const { colors } = useStyledTheme()
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>()
  const error = errors.paymentMethod?.message

  return (
    <FormCard aria-labelledby="payment-title">
      <CardHeader>
        <CurrencyDollar size={22} color={colors.purple} aria-hidden />
        <div>
          <h3 id="payment-title">Pagamento</h3>
          <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
        </div>
      </CardHeader>

      <Options
        role="radiogroup"
        aria-labelledby="payment-title"
        aria-invalid={!!error}
        aria-describedby={error ? 'payment-error' : undefined}
      >
        {PAYMENT_METHODS.map((method) => (
          <Option key={method}>
            <input type="radio" value={method} {...register('paymentMethod')} />
            <span>
              {ICONS[method]}
              {PAYMENT_LABELS[method]}
            </span>
          </Option>
        ))}
      </Options>

      {error && (
        <ErrorMessage id="payment-error" role="alert">
          {error}
        </ErrorMessage>
      )}
    </FormCard>
  )
}
