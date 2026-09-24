import { useState, useCallback, useRef } from 'react'
import { sendMessage } from '../lib/api'

export function useChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('happy')
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const userMsg = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmed,
        mode,
      }
      setMessages((prev) => [...prev, userMsg])
      setLoading(true)
      setError(null)

      try {
        const data = await sendMessage(trimmed, mode, controller.signal)
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'ai',
            content: data.response,
            mode,
          },
        ])
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e.message || 'Something went wrong')
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'ai',
            content:
              "I couldn't reach the server. Please check the backend connection and try again.",
            mode,
            error: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, mode],
  )

  const regenerate = useCallback(async () => {
    setMessages((prev) => {
      const lastUser = [...prev].reverse().find((m) => m.role === 'user')
      if (!lastUser) return prev
      // visually remove last AI message then resend
      const withoutLastAI = prev.filter((m, i) => !(m.role === 'ai' && i === prev.length - 1))
      return withoutLastAI
    })
  }, [])

  const clear = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setLoading(false)
  }, [])

  const changeMode = useCallback(
    (newMode) => {
      if (newMode === mode) return
      setMode(newMode)
      // backend resets history on mode change; sync local UI
      clear()
    },
    [mode, clear],
  )

  return {
    messages,
    loading,
    mode,
    error,
    send,
    clear,
    regenerate,
    setMode: changeMode,
  }
}