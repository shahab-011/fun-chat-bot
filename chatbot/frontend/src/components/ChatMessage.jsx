import { memo } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User } from 'lucide-react'
import { getMode } from '../lib/modes'
import CodeBlock from './CodeBlock'
import CopyButton from './CopyButton'

function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  const m = getMode(message.mode)
  const Icon = m.icon

  const markdownComponents = {
    pre: ({ children }) => <>{children}</>,
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '')
      const text = String(children).replace(/\n$/, '')
      if (match) return <CodeBlock language={match[1]} code={text} />
      return <code className="inline-code">{children}</code>
    },
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`msg ${isUser ? 'msg-user' : 'msg-ai'}`}
    >
      {!isUser && (
        <div
          className="avatar"
          style={{ background: m.soft, color: m.accent, border: `1px solid ${m.soft}` }}
        >
          <Icon size={18} />
        </div>
      )}

      <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-ai'} ${message.error ? 'bubble-error' : ''}`}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <>
            <div className="markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.content}
              </ReactMarkdown>
            </div>
            <div className="bubble-actions">
              <CopyButton text={message.content} />
            </div>
          </>
        )}
      </div>

      {isUser && (
        <div className="avatar avatar-user">
          <User size={16} />
        </div>
      )}
    </motion.div>
  )
}

export default memo(ChatMessage)