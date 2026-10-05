import { useEffect, useState } from 'react'
import { ArrowRight, Music2, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getHinos, type Hino } from '../lib/api'

export function HarpaPage() {
  const [hymns, setHymns] = useState<Hino[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true)
      getHinos(query).then(setHymns).finally(() => setLoading(false))
    }, 180)
    return () => window.clearTimeout(timer)
  }, [query])

  return (
    <section className="page-container">
      <div className="page-intro harpa-intro">
        <span className="eyebrow"><Music2 size={14}/> HARPA CRISTÃ</span>
        <h1>Hinos para cantar e meditar.</h1>
        <p>Encontre rapidamente o hino que você procura.</p>
        <label className="search-box">
          <Search size={18}/>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar por número ou nome..." />
        </label>
      </div>

      <div className="hymn-grid">
        {loading ? <div className="loading">Carregando hinos...</div> :
          hymns.map(hino => (
            <Link to={`/harpa/${hino.numero}`} className="hymn-card" key={hino.numero}>
              <span>{String(hino.numero).padStart(3, '0')}</span>
              <div><strong>{hino.titulo}</strong><small>Harpa Cristã</small></div>
              <ArrowRight size={18}/>
            </Link>
          ))}
      </div>
    </section>
  )
}
