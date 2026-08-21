import { useState } from 'react'

// Gambar dengan fallback: kalau file belum ada, tampil placeholder rapi
// berisi nama file yang harus kamu taruh di public/images/.
export default function Img({ src, alt = '', className = '' }) {
  const [error, setError] = useState(false)
  const fileName = src ? src.split('/').pop() : ''

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-bg-2 text-center ${className}`}
      >
        <span className="text-2xl">🖼️</span>
        <span className="px-4 text-[11px] font-semibold text-ink/60">
          Taruh gambar di
          <br />
          <code className="font-bold text-accent">public/images/{fileName}</code>
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
    />
  )
}
