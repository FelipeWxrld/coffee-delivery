import type { ComponentProps, ReactNode } from 'react'
import { ErrorMessage, FieldBox, FieldContainer, Hint, OptionalTag } from './styles'

type TextInputProps = ComponentProps<'input'> & {
  /** Rótulo acessível (visualmente oculto, como no protótipo, que usa placeholders). */
  label: string
  error?: string
  hint?: ReactNode
  optional?: boolean
  className?: string
}

/**
 * Input reutilizável compatível com `register` do React Hook Form
 * (no React 19 `ref` é recebido como prop comum).
 */
export function TextInput({ label, error, hint, optional, className, id, ...props }: TextInputProps) {
  const messageId = id ? `${id}-message` : undefined

  return (
    <FieldContainer className={className}>
      <label htmlFor={id} className="sr-only">
        {label}
        {optional ? ' (opcional)' : ''}
      </label>
      <FieldBox $invalid={!!error}>
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error || hint ? messageId : undefined}
          {...props}
        />
        {optional && <OptionalTag aria-hidden>Opcional</OptionalTag>}
      </FieldBox>
      {error ? (
        <ErrorMessage id={messageId} role="alert">
          {error}
        </ErrorMessage>
      ) : (
        hint && (
          <Hint id={messageId} aria-live="polite">
            {hint}
          </Hint>
        )
      )}
    </FieldContainer>
  )
}
