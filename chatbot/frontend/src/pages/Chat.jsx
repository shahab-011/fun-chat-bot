import { useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import ModeSelector from '../components/ModeSelector'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import TypingIndicator from '../components/TypingIndicator'
import Welcome from '../components/Welcome'

export default function Chat() {
  const { messages, loading, mode, send, clear, setMode } = useChat()
  const scrollRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, loading])

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-info">
          <h2>Teacher AI</h2>
          <span className="chat-subtitle">Mood-aware tutoring, in real time</span>
        </div>
        <div className="chat-header-actions">
          <Link to="/about" className="ghost-btn">
            <Info size={15} />
            About
          </Link>
          <button className="ghost-btn" onClick={clear} disabled={!messages.length && !loading}>
            <Trash2 size={15} />
            Clear
          </button>
        </div>
      </div>

      <ModeSelector mode={mode} setMode={setMode} />

      <div className="messages-scroll" ref={scrollRef}>
        <AnimatePresence>
          {messages.length === 0 && !loading && (
            <Welcome key="welcome" mode={mode} onSuggestion={send} />
          )}
        </AnimatePresence>

        <div className="messages-list">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
            {loading && <TypingIndicator key="typing" mode={mode} />}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </div>

      <motion.div
        className="chat-input-shell"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <ChatInput onSend={send} loading={loading} mode={mode} />
      </motion.div>
    </div>
  )
}