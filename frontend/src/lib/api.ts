// VITE_API_BASE_URL: 本番では Render の URL を設定（例: https://book-management-api.onrender.com）
// 未設定時は Vite の dev proxy 経由でローカルバックエンドに転送される
const BASE = (import.meta.env.VITE_API_BASE_URL ?? '') + '/api/v1'

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
