import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useLocalStorage } from '../hooks/useLocalStorage'

const isNumber = (value: unknown): value is number => typeof value === 'number'

describe('useLocalStorage', () => {
  it('usa o valor inicial quando não há nada salvo e persiste alterações', () => {
    const { result } = renderHook(() => useLocalStorage('contador', 1, isNumber))
    expect(result.current[0]).toBe(1)

    act(() => result.current[1](5))

    expect(result.current[0]).toBe(5)
    expect(localStorage.getItem('contador')).toBe('5')
  })

  it('restaura o valor salvo', () => {
    localStorage.setItem('contador', '42')
    const { result } = renderHook(() => useLocalStorage('contador', 1, isNumber))
    expect(result.current[0]).toBe(42)
  })

  it('ignora valores inválidos ou JSON corrompido', () => {
    localStorage.setItem('contador', '{quebrado')
    const { result } = renderHook(() => useLocalStorage('contador', 7, isNumber))
    expect(result.current[0]).toBe(7)
  })
})
