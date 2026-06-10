import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { useBookStore } from '../store'

export default function AddBook() {
  const [title, setTitle] = useState('')
  const addBook = useBookStore((s) => s.addBook)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addBook(title.trim())
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="書籍タイトルを入力"
      />
      <Button type="submit">追加</Button>
    </form>
  )
}
