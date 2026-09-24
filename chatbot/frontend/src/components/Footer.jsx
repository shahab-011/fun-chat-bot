import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-orb small">
            <Sparkles size={13} />
          </span>
          <span>TeacherAI</span>
        </div>
        <p className="footer-tag">Mood-aware AI tutoring · built with React, FastAPI, LangChain & Groq.</p>
        <div className="footer-links">
          <Link to="/">Chat</Link>
          <Link to="/about">About</Link>
          <a href="https://groq.com" target="_blank" rel="noreferrer">Groq</a>
          <a href="https://www.langchain.com" target="_blank" rel="noreferrer">LangChain</a>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Teacher AI · For demo purposes only.</span>
      </div>
    </footer>
  )
}