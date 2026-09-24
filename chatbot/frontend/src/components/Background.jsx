import { motion } from 'framer-motion'

export default function Background() {
  return (
    <div className="bg-stage" aria-hidden>
      <div className="bg-grid" />
      <motion.div
        className="blob blob-a"
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 40, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob blob-b"
        animate={{ x: [0, -60, 40, 0], y: [0, -40, 60, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="blob blob-c"
        animate={{ x: [0, 50, -60, 0], y: [0, -30, 30, 0], scale: [1, 1.05, 0.9, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="bg-noise" />
    </div>
  )
}