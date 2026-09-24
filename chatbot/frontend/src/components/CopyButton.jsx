import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={onCopy} aria-label="Copy">
      {copied ? <Check size={13} /> : <Copy size={13} />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}