import { motion } from 'framer-motion'
import { MODES } from '../lib/modes'

export default function ModeSelector({ mode, setMode }) {
  return (
    <div className="mode-selector" role="tablist" aria-label="Select teacher mood">
      {MODES.map((m) => {
        const Icon = m.icon
        const active = m.id === mode
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={active}
            onClick={() => setMode(m.id)}
            className={`mode-pill ${active ? 'active' : ''}`}
            style={{
              '--mode-color': m.color,
              '--mode-soft': m.soft,
              '--mode-glow': m.glow,
              '--mode-accent': m.accent,
            }}
          >
            <Icon size={15} />
            <span>{m.label}</span>
            {active && (
              <motion.span
                layoutId="mode-dot"
                className="mode-dot"
                style={{ background: m.color }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}