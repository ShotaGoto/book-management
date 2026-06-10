import { useEffect } from 'react'
import AddBook from '../components/AddBook'
import BookList from '../components/BookList'
import { useBookStore } from '../store'

export default function BookPage() {
  const fetchBooks = useBookStore((s) => s.fetchBooks)

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">書籍管理</h1>
      <AddBook />
      <BookList />
    </div>
  )
}
