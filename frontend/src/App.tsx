import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { BookOpen, Headphones, Home, Menu, Moon, Music2, Sun, X } from 'lucide-react'
import { HomePage } from './pages/HomePage'
import { BiblePage } from './pages/BiblePage'
import { ChaptersPage } from './pages/ChaptersPage'
import { ReaderPage } from './pages/ReaderPage'
import { HarpaPage } from './pages/HarpaPage'
import { HymnPage } from './pages/HymnPage'

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('tema') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('tema', dark ? 'dark' : 'light')
  }, [dark])

  const toggle = () => setDark((value) => !value)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <img src="/logo.jpg" alt="Bíblia & Harpa" />
            <span>
              <strong>Bíblia & Harpa</strong>
              <small>Leitura e Vida</small>
            </span>
          </NavLink>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}><Home size={17}/> Início</NavLink>
            <NavLink to="/biblia" onClick={() => setMenuOpen(false)}><BookOpen size={17}/> Bíblia</NavLink>
            <NavLink to="/harpa" onClick={() => setMenuOpen(false)}><Music2 size={17}/> Harpa</NavLink>
          </nav>

          <div className="header-actions">
            <button className="icon-button" onClick={toggle} aria-label="Alternar tema">
              {dark ? <Sun size={19}/> : <Moon size={19}/>}
            </button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Abrir menu">
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/biblia" element={<BiblePage />} />
          <Route path="/biblia/:livro" element={<ChaptersPage />} />
          <Route path="/biblia/:livro/leitura" element={<ReaderPage />} />
          <Route path="/harpa" element={<HarpaPage />} />
          <Route path="/harpa/:numero" element={<HymnPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Bíblia & Harpa</strong>
          <span>Leitura e Vida</span>
        </div>
        <p>Site criado pela <b>Vellmont ent.</b></p>
      </footer>
    </div>
  )
}

export default App
