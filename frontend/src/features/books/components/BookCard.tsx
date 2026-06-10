import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import StatusBadge from './StatusBadge'
import { useBookStore } from '../store'
import type { Book, BookStatus } from '@/lib/api'

export default function BookCard({ book }: { book: Book }) {
  const { updateBook, removeBook } = useBookStore()
  const [editingMemo, setEditingMemo] = useState(false)
  const [memo, setMemo] = useState(book.memo)

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateBook(book.id, e.target.value as BookStatus, book.memo)
  }

  const handleMemoSave = () => {
    updateBook(book.id, book.status, memo)
    setEditingMemo(false)
  }

  return (
    <li className="border rounded-lg p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{book.title}</p>
          {book.author && (
            <p className="text-sm text-gray-500">{book.author}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={book.status} />
          <Select value={book.status} onChange={handleStatusChange} className="text-sm py-1">
            <option value="unread">未読</option>
            <option value="reading">読書中</option>
            <option value="done">読了</option>
          </Select>
          <Button variant="danger" onClick={() => removeBook(book.id)}>
            削除
          </Button>
        </div>
      </div>

      {editingMemo ? (
        <div className="flex gap-2">
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
          />
          <div className="flex flex-col gap-1">
            <Button onClick={handleMemoSave} className="text-sm py-1">保存</Button>
            <button
              onClick={() => { setMemo(book.memo); setEditingMemo(false) }}
              className="text-sm text-gray-500 hover:underline"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setEditingMemo(true)}
          className="text-sm text-gray-600 min-h-[1.5rem] cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1"
        >
          {book.memo || <span className="text-gray-400 italic">メモを追加...</span>}
        </div>
      )}
    </li>
  )
}
