import type { BookStatus } from '@/lib/api'

const config: Record<BookStatus, { label: string; className: string }> = {
  unread:  { label: '未読',   className: 'bg-gray-100 text-gray-600' },
  reading: { label: '読書中', className: 'bg-blue-100 text-blue-700' },
  done:    { label: '読了',   className: 'bg-green-100 text-green-700' },
}

export default function StatusBadge({ status }: { status: BookStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  )
}
