import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Link to="/" className="logo" aria-label="Teacher AI home">
        <span className="logo-orb">
          <Sparkles size={16} />
        </span>
        <span className="logo-text">
          Teacher<span className="logo-accent">AI</span>
        </span>
      </Link>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Chat
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          About
        </NavLink>
        <Link to="/" className="nav-cta">
          Start Chatting
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </nav>
  )
}