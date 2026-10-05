const api = async <T,>(path: string): Promise<T> => {
  const response = await fetch(path)
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.error || 'Não foi possível carregar os dados.')
  }
  return response.json()
}

export type Livro = {
  id: number
  nome: string
  abreviacao: string
  slug: string
  totalCapitulos: number
  testamento: 'Antigo Testamento' | 'Novo Testamento'
}

export type Versiculo = {
  numero: number
  texto: string
}

export type Capitulo = {
  livro: string
  abreviacao: string
  capitulo: number
  totalCapitulos: number
  versiculos: Versiculo[]
}

export type Hino = {
  numero: number
  titulo: string
  coro: string
  versiculos: Record<string, string>
}

export const getLivros = () => api<Livro[]>('/api/biblia/livros')
export const getCapitulo = (livro: string, capitulo: number) =>
  api<Capitulo>(`/api/biblia/${livro}/${capitulo}`)
export const getHinos = (q = '') =>
  api<Hino[]>(`/api/harpa${q ? `?q=${encodeURIComponent(q)}` : ''}`)
export const getHino = (numero: number) => api<Hino>(`/api/harpa/${numero}`)
