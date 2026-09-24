import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Square, Sparkles } from 'lucide-react'
import { getMode } from '../lib/modes'

export default function ChatInput({ onSend, loading, mode, disabled }) {
  const [value, setValue] = useState('')
  const ref = useRef(null)
  const m = getMode(mode)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 180) + 'px'
  }, [value])

  const submit = (e) => {
    e?.preventDefault()
    if (!value.trim() || loading) return
    onSend(value)
    setValue('')
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="chat-input-wrap">
      <form
        className="chat-input"
        onSubmit={submit}
        style={{ '--input-accent': m.color, '--input-glow': m.glow }}
      >
        <div className="chat-input-icon">
          <Sparkles size={18} style={{ color: m.color }} />
        </div>
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder={`Message your ${m.label.toLowerCase()} teacher…`}
          disabled={disabled}
          aria-label="Message"
        />
        <motion.button
          type="submit"
          className="send-btn"
          disabled={!value.trim() || loading || disabled}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          style={{ background: `linear-gradient(135deg, ${m.color}, ${m.accent})` }}
          aria-label="Send message"
        >
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.span key="stop" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <Square size={16} fill="#fff" />
              </motion.span>
            ) : (
              <motion.span key="send" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <ArrowUp size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
      <div className="chat-input-hint">
        <span>Teacher AI can make mistakes — verify important info.</span>
        <span className="kbd-hint">
          <kbd>Enter</kbd> to send · <kbd>Shift</kbd>+<kbd>Enter</kbd> for newline
        </span>
      </div>
    </div>
  )
}