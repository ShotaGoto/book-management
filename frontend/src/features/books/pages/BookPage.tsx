import { useEffect, useState } from 'react'
import AddBook from '../components/AddBook'
import BookList from '../components/BookList'
import { useBookStore } from '../store'
import type { BookStatus } from '@/lib/api'

type Filter = BookStatus | 'all'

const TABS: { value: Filter; label: string }[] = [
  { value: 'all',     label: 'すべて' },
  { value: 'unread',  label: '未読' },
  { value: 'reading', label: '読書中' },
  { value: 'done',    label: '読了' },
]

export default function BookPage() {
  const fetchBooks = useBookStore((s) => s.fetchBooks)
  const books = useBookStore((s) => s.books)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const countByFilter = (f: Filter) =>
    f === 'all' ? books.length : books.filter((b) => b.status === f).length

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">書籍管理</h1>
      <AddBook />

      <div className="flex gap-1 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              filter === tab.value
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs text-gray-400">({countByFilter(tab.value)})</span>
          </button>
        ))}
      </div>

      <BookList filter={filter} />
    </div>
  )
}
