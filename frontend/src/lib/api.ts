const BASE = '/api/v1'

export type Book = { id: number; title: string }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  books: {
    list: (): Promise<Book[]> => request('/books'),
    create: (title: string): Promise<Book> =>
      request('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      }),
    delete: (id: number): Promise<void> =>
      request(`/books/${id}`, { method: 'DELETE' }),
  },
}
