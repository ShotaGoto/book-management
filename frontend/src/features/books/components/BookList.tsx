import { useBookStore } from '../store'
import BookCard from './BookCard'
import type { BookStatus } from '@/lib/api'

export default function BookList({ filter }: { filter: BookStatus | 'all' }) {
  const books = useBookStore((s) => s.books)
  const filtered = filter === 'all' ? books : books.filter((b) => b.status === filter)

  if (filtered.length === 0) {
    return <p className="text-gray-500 text-sm">該当する書籍がありません。</p>
  }

  return (
    <ul className="space-y-3">
      {filtered.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </ul>
  )
}
