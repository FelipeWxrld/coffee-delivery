import type { ComponentProps } from 'react'
import styles from './TextInput.module.css'

type TextInputProps = ComponentProps<'input'> & {
  error?: string
  optional?: boolean
  containerClassName?: string
}

/** Input reutilizável e compatível com `register` do React Hook Form (ref como prop no React 19). */
export function TextInput({ error, optional, containerClassName, id, ...props }: TextInputProps) {
  const errorId = error && id ? `${id}-error` : undefined

  return (
    <div className={`${styles.field} ${containerClassName ?? ''}`}>
      <div className={`${styles.box} ${error ? styles.invalid : ''}`}>
        <input id={id} aria-invalid={!!error} aria-describedby={errorId} {...props} />
        {optional && <span className={styles.optional}>Opcional</span>}
      </div>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
