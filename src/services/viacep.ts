export interface ViaCepAddress {
  street: string
  neighborhood: string
  city: string
  uf: string
}

/**
 * Consulta o ViaCEP para preencher o endereço automaticamente.
 * Retorna null em caso de CEP inexistente ou falha de rede — o usuário
 * sempre pode preencher os campos manualmente.
 */
export async function fetchAddressByCep(cep: string, signal?: AbortSignal): Promise<ViaCepAddress | null> {
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return null

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal })
    if (!response.ok) return null
    const data = await response.json()
    if (data.erro) return null
    return {
      street: data.logradouro ?? '',
      neighborhood: data.bairro ?? '',
      city: data.localidade ?? '',
      uf: data.uf ?? '',
    }
  } catch {
    return null
  }
}
