import { create } from 'zustand'
import { api, type Book } from '@/lib/api'

type BooksState = {
  books: Book[]
  fetchBooks: () => Promise<void>
  addBook: (title: string) => Promise<void>
  removeBook: (id: number) => Promise<void>
}

export const useBookStore = create<BooksState>((set) => ({
  books: [],
  fetchBooks: async () => {
    const books = await api.books.list()
    set({ books })
  },
  addBook: async (title) => {
    const book = await api.books.create(title)
    set((s) => ({ books: [...s.books, book] }))
  },
  removeBook: async (id) => {
    await api.books.delete(id)
    set((s) => ({ books: s.books.filter((b) => b.id !== id) }))
  },
}))
