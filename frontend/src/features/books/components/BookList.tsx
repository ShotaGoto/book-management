import Button from '@/components/atoms/Button'
import { useBookStore } from '../store'

export default function BookList() {
  const books = useBookStore((s) => s.books)
  const removeBook = useBookStore((s) => s.removeBook)

  if (books.length === 0) {
    return <p className="text-gray-500">書籍が登録されていません。</p>
  }

  return (
    <ul className="space-y-2">
      {books.map((book) => (
        <li key={book.id} className="flex items-center justify-between p-3 border rounded">
          <span>{book.title}</span>
          <Button variant="danger" onClick={() => removeBook(book.id)}>
            削除
          </Button>
        </li>
      ))}
    </ul>
  )
}
