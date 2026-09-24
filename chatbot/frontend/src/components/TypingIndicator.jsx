import { motion } from 'framer-motion'
import { getMode } from '../lib/modes'
import { Sparkles } from 'lucide-react'

export default function TypingIndicator({ mode }) {
  const m = getMode(mode)
  const Icon = m.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="msg msg-ai"
    >
      <div className="avatar" style={{ background: m.soft, color: m.accent, border: `1px solid ${m.soft}` }}>
        <Icon size={18} />
      </div>
      <div className="bubble thinking-bubble">
        <div className="typing-dots" aria-label="AI is thinking">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              style={{ background: m.color }}
            />
          ))}
        </div>
        <span className="thinking-label">
          <Sparkles size={11} /> thinking
        </span>
      </div>
    </motion.div>
  )
}