import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chat from './pages/Chat'
import About from './pages/About'

export default function App() {
  const location = useLocation()
  const isChat = location.pathname === '/'

  return (
    <>
      <Background />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!isChat && <Footer />}
    </>
  )
}