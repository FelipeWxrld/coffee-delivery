/**
 * Leitura/escrita segura no LocalStorage: falhas (modo privado, cota cheia,
 * JSON corrompido) nunca quebram a aplicação.
 */
export function readStorage<T>(key: string, fallback: T, isValid?: (value: unknown) => value is T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (isValid && !isValid(parsed)) return fallback
    return parsed as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignora: a persistência é um recurso de conveniência.
  }
}

export const STORAGE_KEYS = {
  cart: '@coffee-delivery:cart-state-1.0.0',
  theme: '@coffee-delivery:theme',
} as const
