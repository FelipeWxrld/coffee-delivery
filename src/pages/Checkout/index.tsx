import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router'
import { CartItemRow } from '../../components/CartItemRow'
import { PaymentOption } from '../../components/PaymentOption'
import { TextInput } from '../../components/TextInput'
import { useCart } from '../../hooks/useCart'
import { checkoutSchema, type CheckoutFormData } from '../../schemas/checkout'
import { fetchAddressByCep } from '../../services/viacep'
import { formatCurrency, maskCep } from '../../utils/format'
import styles from './Checkout.module.css'

export function Checkout() {
  const navigate = useNavigate()
  const { items, itemsTotalInCents, deliveryFeeInCents, totalInCents, checkout } = useCart()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', uf: '' },
  })

  const cep = watch('cep')

  // Autopreenchimento do endereço via ViaCEP quando o CEP fica completo.
  useEffect(() => {
    if (cep?.replace(/\D/g, '').length !== 8) return
    const controller = new AbortController()
    fetchAddressByCep(cep, controller.signal).then((address) => {
      if (!address) return
      const opts = { shouldValidate: true }
      if (address.street) setValue('street', address.street, opts)
      if (address.neighborhood) setValue('neighborhood', address.neighborhood, opts)
      if (address.city) setValue('city', address.city, opts)
      if (address.uf) setValue('uf', address.uf, opts)
    })
    return () => controller.abort()
  }, [cep, setValue])

  function onSubmit(data: CheckoutFormData) {
    const { paymentMethod, ...address } = data
    checkout({
      paymentMethod,
      address: { ...address, uf: address.uf.toUpperCase(), complement: address.complement || undefined },
    })
    navigate('/success')
  }

  if (items.length === 0) {
    return (
      <section className={`container ${styles.empty}`}>
        <h1>Seu carrinho está vazio</h1>
        <p>Que tal escolher um café delicioso para começar o dia?</p>
        <Link to="/" className={styles.backButton}>
          Ver cafés
        </Link>
      </section>
    )
  }

  const cepField = register('cep')

  return (
    <form className={`container ${styles.checkout}`} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.column}>
        <h2>Complete seu pedido</h2>

        <section className={styles.card} aria-labelledby="address-title">
          <header className={styles.cardHeader}>
            <MapPinLine size={22} color="var(--color-yellow-dark)" aria-hidden />
            <div>
              <h3 id="address-title">Endereço de Entrega</h3>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </header>

          <div className={styles.addressGrid}>
            <TextInput
              id="cep"
              placeholder="CEP"
              aria-label="CEP"
              inputMode="numeric"
              autoComplete="postal-code"
              containerClassName={styles.cep}
              error={errors.cep?.message}
              {...cepField}
              onChange={(event) => {
                event.target.value = maskCep(event.target.value)
                cepField.onChange(event)
              }}
            />
            <TextInput
              id="street"
              placeholder="Rua"
              aria-label="Rua"
              autoComplete="address-line1"
              containerClassName={styles.street}
              error={errors.street?.message}
              {...register('street')}
            />
            <TextInput
              id="number"
              placeholder="Número"
              aria-label="Número"
              inputMode="numeric"
              containerClassName={styles.number}
              error={errors.number?.message}
              {...register('number')}
            />
            <TextInput
              id="complement"
              placeholder="Complemento"
              aria-label="Complemento"
              optional
              containerClassName={styles.complement}
              error={errors.complement?.message}
              {...register('complement')}
            />
            <TextInput
              id="neighborhood"
              placeholder="Bairro"
              aria-label="Bairro"
              containerClassName={styles.neighborhood}
              error={errors.neighborhood?.message}
              {...register('neighborhood')}
            />
            <TextInput
              id="city"
              placeholder="Cidade"
              aria-label="Cidade"
              autoComplete="address-level2"
              containerClassName={styles.city}
              error={errors.city?.message}
              {...register('city')}
            />
            <TextInput
              id="uf"
              placeholder="UF"
              aria-label="UF"
              maxLength={2}
              autoComplete="address-level1"
              containerClassName={styles.uf}
              error={errors.uf?.message}
              {...register('uf')}
            />
          </div>
        </section>

        <section className={styles.card} aria-labelledby="payment-title">
          <header className={styles.cardHeader}>
            <CurrencyDollar size={22} color="var(--color-purple)" aria-hidden />
            <div>
              <h3 id="payment-title">Pagamento</h3>
              <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
            </div>
          </header>

          <div className={styles.payments} role="radiogroup" aria-labelledby="payment-title">
            <PaymentOption
              value="credit"
              label="Cartão de crédito"
              icon={<CreditCard size={16} />}
              {...register('paymentMethod')}
            />
            <PaymentOption
              value="debit"
              label="Cartão de débito"
              icon={<Bank size={16} />}
              {...register('paymentMethod')}
            />
            <PaymentOption
              value="cash"
              label="Dinheiro"
              icon={<Money size={16} />}
              {...register('paymentMethod')}
            />
          </div>
          {errors.paymentMethod && (
            <p className={styles.error} role="alert">
              {errors.paymentMethod.message}
            </p>
          )}
        </section>
      </div>

      <div className={styles.column}>
        <h2>Cafés selecionados</h2>

        <section className={`${styles.card} ${styles.summary}`} aria-label="Resumo do pedido">
          <ul className={styles.items}>
            {items.map((item) => (
              <CartItemRow key={item.coffee.id} item={item} />
            ))}
          </ul>

          <dl className={styles.totals}>
            <div>
              <dt>Total de itens</dt>
              <dd>{formatCurrency(itemsTotalInCents)}</dd>
            </div>
            <div>
              <dt>Entrega</dt>
              <dd>{formatCurrency(deliveryFeeInCents)}</dd>
            </div>
            <div className={styles.total}>
              <dt>Total</dt>
              <dd data-testid="order-total">{formatCurrency(totalInCents)}</dd>
            </div>
          </dl>

          <button type="submit" className={styles.confirm} disabled={isSubmitting}>
            Confirmar pedido
          </button>
        </section>
      </div>
    </form>
  )
}
