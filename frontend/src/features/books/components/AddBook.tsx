import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { useBookStore } from '../store'

export default function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const addBook = useBookStore((s) => s.addBook)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addBook(title.trim(), author.trim())
    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル（必須）"
        className="flex-1"
      />
      <Input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="著者"
        className="flex-1"
      />
      <Button type="submit">追加</Button>
    </form>
  )
}
