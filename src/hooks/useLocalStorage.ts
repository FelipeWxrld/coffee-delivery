import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * Estado React sincronizado com o LocalStorage.
 * O valor inicial é lido uma única vez (inicialização preguiçosa) e validado;
 * cada alteração é gravada de volta.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T | (() => T),
  isValid?: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    const initial = fallback instanceof Function ? fallback() : fallback
    return readStorage(key, initial, isValid)
  })

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
