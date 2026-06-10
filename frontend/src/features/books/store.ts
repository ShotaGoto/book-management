import { create } from 'zustand'
import { api, type Book, type BookStatus } from '@/lib/api'

type BooksState = {
  books: Book[]
  fetchBooks: () => Promise<void>
  addBook: (title: string, author: string) => Promise<void>
  updateBook: (id: number, status: BookStatus, memo: string) => Promise<void>
  removeBook: (id: number) => Promise<void>
}

export const useBookStore = create<BooksState>((set) => ({
  books: [],
  fetchBooks: async () => {
    const books = await api.books.list()
    set({ books })
  },
  addBook: async (title, author) => {
    const book = await api.books.create(title, author)
    set((s) => ({ books: [...s.books, book] }))
  },
  updateBook: async (id, status, memo) => {
    const updated = await api.books.update(id, status, memo)
    set((s) => ({ books: s.books.map((b) => (b.id === id ? updated : b)) }))
  },
  removeBook: async (id) => {
    await api.books.delete(id)
    set((s) => ({ books: s.books.filter((b) => b.id !== id) }))
  },
}))
