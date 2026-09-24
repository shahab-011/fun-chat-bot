import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  MessageSquareCode,
  Bot,
  Palette,
  Zap,
  ShieldCheck,
  Layers,
  Repeat,
  Cpu,
  GitBranch,
} from 'lucide-react'

const FEATURES = [
  { icon: Bot, title: 'Four mood-aware tutors', desc: 'Switch between happy, sad, angry, and depressed teacher personas — each with its own tone, color, and avatar.' },
  { icon: MessageSquareCode, title: 'Markdown + code rendering', desc: 'AI responses support rich markdown, tables, lists, links, and syntax-styled code blocks with one-click copy.' },
  { icon: Palette, title: 'Glassmorphic design', desc: 'A clean white theme with frosted-glass panels, soft gradients, and layered shadows crafted for a premium feel.' },
  { icon: Zap, title: 'Smooth micro-interactions', desc: 'Framer Motion powers message entrance, page transitions, the thinking indicator, and tactile button feedback.' },
  { icon: Repeat, title: 'Clear & regenerate', desc: 'Easily start fresh, copy any AI reply, and let the conversation flow with auto-scrolling context.' },
  { icon: ShieldCheck, title: 'Responsive & accessible', desc: 'Designed mobile-first with keyboard shortcuts, focus styles, and reduced-motion friendly animations.' },
]

const STACK = [
  { name: 'React 19', tag: 'UI' },
  { name: 'Vite', tag: 'Build' },
  { name: 'React Router', tag: 'Routing' },
  { name: 'Framer Motion', tag: 'Animation' },
  { name: 'lucide-react', tag: 'Icons' },
  { name: 'react-markdown', tag: 'Markdown' },
  { name: 'FastAPI', tag: 'Backend' },
  { name: 'LangChain', tag: 'LLM orchestration' },
  { name: 'Groq', tag: 'Inference' },
]

const STEPS = [
  { n: '01', title: 'Pick a mood', desc: 'Choose a teacher personality from the mood selector. Each mode sets its own system prompt on the backend.' },
  { n: '02', title: 'Ask anything', desc: 'Type your question in the glass input and hit Enter. Your message is sent as a HumanMessage to the LangChain model.' },
  { n: '03', title: 'Get a styled reply', desc: 'The Groq-hosted model responds with mood-aware text, rendered as polished markdown right in the chat.' },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={13} /> Premium AI tutoring experience
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          Meet <span className="grad-text">Teacher AI</span>
          <br />a tutor that <em>has feelings</em>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          A mood-aware chatbot that blends Groq’s fast inference, LangChain orchestration,
          and a hand-crafted glass interface — so learning feels less like a lecture and more like a conversation.
        </motion.p>
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <Link to="/" className="primary-btn">
            Start chatting <ArrowRight size={16} />
          </Link>
          <a href="#features" className="ghost-btn">Explore features</a>
        </motion.div>
      </section>

      {/* About */}
      <section className="about-section">
        <motion.div
          className="glass-card about-card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <div className="about-card-tag">About</div>
          <h2>A tutor with a personality dial.</h2>
          <p>
            Teacher AI is a small demonstration of how a single LLM can take on strikingly different
            teaching styles just by swapping the system prompt. Behind the scenes, a FastAPI service
            keeps a LangChain conversation in memory and routes it to a Groq-hosted model. The mood
            you choose on the frontend maps directly to one of four system personas — happy, sad,
            angry, or depressed — and resets the conversation thread whenever you switch.
          </p>
          <p>
            The interface is built to feel like a premium SaaS product: glassmorphism, soft motion,
            a refined white palette, and just enough animation to feel alive without distracting
            from the conversation itself.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="about-section" id="features">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          Features
        </motion.h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                className="glass-card feature-card"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                whileHover={{ y: -4 }}
              >
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Tech */}
      <section className="about-section">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          Technologies used
        </motion.h2>
        <motion.div
          className="tech-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          {STACK.map((t) => (
            <div key={t.name} className="tech-chip">
              <span className="tech-name">{t.name}</span>
              <span className="tech-tag">{t.tag}</span>
            </div>
          ))}
        </motion.div>

        <div className="tech-meta">
          <div className="tech-meta-item">
            <Cpu size={14} /> Model: <code>openai/gpt-oss-20b</code> on Groq
          </div>
          <div className="tech-meta-item">
            <Layers size={14} /> LangChain message threading (System / Human / AI)
          </div>
          <div className="tech-meta-item">
            <GitBranch size={14} /> Frontend / backend split, CORS-secured
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="about-section">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          How it works
        </motion.h2>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="glass-card step-card"
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-section">
        <motion.div
          className="glass-card cta-card"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={reveal}
        >
          <Sparkles size={22} className="cta-spark" />
          <h2>Ready to learn — with attitude?</h2>
          <p>Pick a mood, ask a question, and see how the same model changes everything with a single system prompt.</p>
          <Link to="/" className="primary-btn">
            Return to Chat <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}