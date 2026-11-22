import { useEffect, useState } from 'react'
import { fetchAddressByCep, onlyDigits, type CepAddress } from '../services/viacep'

export type CepStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

/**
 * Consulta o CEP sempre que ele fica completo (8 dígitos) e informa o estado
 * da consulta (carregando, encontrado, não encontrado ou falha).
 * Requisições antigas são canceladas com AbortController.
 */
export function useCepLookup(cep: string | undefined, onFound: (address: CepAddress) => void) {
  const [status, setStatus] = useState<CepStatus>('idle')
  const digits = onlyDigits(cep ?? '')

  useEffect(() => {
    if (digits.length !== 8) {
      setStatus('idle')
      return
    }

    const controller = new AbortController()
    setStatus('loading')

    fetchAddressByCep(digits, controller.signal)
      .then((result) => {
        if (result.status === 'success') onFound(result.address)
        setStatus(result.status)
      })
      .catch(() => {
        // Requisição cancelada: uma nova consulta já está em andamento.
      })

    return () => controller.abort()
    // onFound é intencionalmente omitido: só queremos consultar quando o CEP muda.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits])

  return status
}
