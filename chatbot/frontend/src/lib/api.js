const API_BASE =
  import.meta.env.VITE_API_BASE ||
  'http://localhost:8000'

export async function sendMessage(message, mode, signal) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, mode }),
    signal,
  })

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return res.json() // { response: string }
}

export async function checkHealth() {
  try {
    const res = await fetch(API_BASE, { method: 'GET' })
    return res.ok
  } catch {
    return false
  }
}