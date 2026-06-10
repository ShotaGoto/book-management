type Props = React.SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ className = '', ...props }: Props) {
  return (
    <select
      className={`border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  )
}
