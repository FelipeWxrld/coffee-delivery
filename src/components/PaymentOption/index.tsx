import type { ComponentProps, ReactNode } from 'react'
import styles from './PaymentOption.module.css'

type PaymentOptionProps = Omit<ComponentProps<'input'>, 'type'> & {
  icon: ReactNode
  label: string
}

/** Opção de pagamento: um radio nativo estilizado como botão (acessível por teclado). */
export function PaymentOption({ icon, label, ...props }: PaymentOptionProps) {
  return (
    <label className={styles.option}>
      <input type="radio" {...props} />
      <span className={styles.content}>
        {icon}
        {label}
      </span>
    </label>
  )
}
