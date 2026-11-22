import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

// O Node 25+ expõe um `localStorage` global próprio (Web Storage experimental) que,
// sem --localstorage-file, fica indefinido e sobrepõe o do jsdom. Usamos uma
// implementação em memória para que os testes sejam determinísticos.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length() {
    return this.store.size
  }
  clear() {
    this.store.clear()
  }
  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }
  key(index: number) {
    return [...this.store.keys()][index] ?? null
  }
  removeItem(key: string) {
    this.store.delete(key)
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value))
  }
}

const memoryStorage = new MemoryStorage()
for (const target of [globalThis, window]) {
  Object.defineProperty(target, 'localStorage', { value: memoryStorage, configurable: true, writable: true })
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
})

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

window.scrollTo = () => {}
