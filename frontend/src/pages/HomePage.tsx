import { ArrowRight, BookOpen, Music2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="eyebrow"><Sparkles size={14}/> PALAVRA • LOUVOR • VIDA</span>
          <h1>Leia a Palavra.<br/><em>Viva a mensagem.</em></h1>
          <p>Explore a Bíblia e a Harpa Cristã em uma experiência limpa, elegante e feita para a leitura.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/biblia"><BookOpen size={19}/> Explorar a Bíblia <ArrowRight size={17}/></Link>
            <Link className="secondary-btn" to="/harpa"><Music2 size={19}/> Explorar a Harpa</Link>
          </div>
        </div>
        <div className="hero-logo-card">
          <img src="/logo.jpg" alt="Logo Bíblia e Harpa" />
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span className="eyebrow">UMA EXPERIÊNCIA SIMPLES</span>
          <h2>Sua Bíblia e sua Harpa<br/><span>em um só lugar.</span></h2>
          <p>Escolha um livro, selecione um ou vários capítulos e leia sem distrações. Depois, encontre seu hino na Harpa.</p>
        </div>
        <div className="feature-grid">
          <Link to="/biblia" className="feature-card">
            <span className="feature-icon"><BookOpen/></span>
            <div><h3>Bíblia Sagrada</h3><p>66 livros organizados por testamento, com seleção múltipla de capítulos.</p></div>
            <ArrowRight/>
          </Link>
          <Link to="/harpa" className="feature-card">
            <span className="feature-icon"><Music2/></span>
            <div><h3>Harpa Cristã</h3><p>Pesquise os hinos, abra a letra completa e leia o coro e as estrofes.</p></div>
            <ArrowRight/>
          </Link>
        </div>
      </section>
    </>
  )
}
