export interface CepAddress {
  street: string
  neighborhood: string
  city: string
  uf: string
}

export type CepLookupResult =
  | { status: 'success'; address: CepAddress }
  | { status: 'not-found' }
  | { status: 'error' }

export const onlyDigits = (value: string) => value.replace(/\D/g, '')

/**
 * Consulta a API pública ViaCEP (RF-08 / RN-07).
 * - CEP inexistente → `not-found` (a API responde `{ "erro": true }`);
 * - falha de rede / HTTP → `error`, para o usuário preencher manualmente.
 */
export async function fetchAddressByCep(cep: string, signal?: AbortSignal): Promise<CepLookupResult> {
  const digits = onlyDigits(cep)
  if (digits.length !== 8) return { status: 'not-found' }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal })
    if (!response.ok) return { status: response.status === 400 ? 'not-found' : 'error' }

    const data = await response.json()
    if (data?.erro) return { status: 'not-found' }

    return {
      status: 'success',
      address: {
        street: data.logradouro ?? '',
        neighborhood: data.bairro ?? '',
        city: data.localidade ?? '',
        uf: data.uf ?? '',
      },
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    return { status: 'error' }
  }
}
