import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Music2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getHino, type Hino } from '../lib/api'

export function HymnPage() {
  const { numero = '1' } = useParams()
  const [hymn, setHymn] = useState<Hino | null>(null)
  const n = Number(numero)

  useEffect(() => { getHino(n).then(setHymn) }, [n])

  if (!hymn) return <div className="loading">Abrindo hino...</div>

  const verses = Object.entries(hymn.versiculos)

  return (
    <section className="hymn-reader-page">
      <div className="hymn-reader">
        <Link className="back-link" to="/harpa"><ArrowLeft size={16}/> Todos os hinos</Link>
        <div className="hymn-heading">
          <span className="hymn-number">{String(hymn.numero).padStart(3, '0')}</span>
          <span className="eyebrow"><Music2 size={14}/> HARPA CRISTÃ</span>
          <h1>{hymn.titulo}</h1>
        </div>
        {hymn.coro && (
          <div className="chorus">
            <span>CORO</span>
            <p dangerouslySetInnerHTML={{ __html: hymn.coro }} />
          </div>
        )}
        <div className="hymn-verses">
          {verses.map(([number, text]) => (
            <div className="hymn-verse" key={number}>
              <b>{number}</b><p dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          ))}
        </div>
        <div className="hymn-navigation">
          <Link to={`/harpa/${n > 1 ? n - 1 : 1}`} className={n <= 1 ? 'disabled' : ''}><ArrowLeft/> Hino anterior</Link>
          <Link to="/harpa">Lista de hinos</Link>
          <Link to={`/harpa/${n + 1}`}><span>Próximo hino</span> <ArrowRight/></Link>
        </div>
      </div>
    </section>
  )
}
