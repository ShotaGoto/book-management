const BASE = '/api/v1'

export type BookStatus = 'unread' | 'reading' | 'done'

export type Book = {
  id: number
  title: string
  author: string
  status: BookStatus
  memo: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  books: {
    list: (): Promise<Book[]> => request('/books'),
    create: (title: string, author: string): Promise<Book> =>
      request('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author }),
      }),
    update: (id: number, status: BookStatus, memo: string): Promise<Book> =>
      request(`/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, memo }),
      }),
    delete: (id: number): Promise<void> =>
      request(`/books/${id}`, { method: 'DELETE' }),
  },
}
