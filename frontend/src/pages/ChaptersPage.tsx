import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, Play } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getLivros, type Livro } from '../lib/api'

export function ChaptersPage() {
  const { livro = '' } = useParams()
  const navigate = useNavigate()
  const [books, setBooks] = useState<Livro[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const current = books.find(book => book.slug === livro)

  useEffect(() => { getLivros().then(setBooks) }, [])
  useEffect(() => { setSelected([]) }, [livro])

  const toggle = (chapter: number) =>
    setSelected(prev => prev.includes(chapter) ? prev.filter(x => x !== chapter) : [...prev, chapter].sort((a,b) => a-b))

  const selectAll = () => setSelected(selected.length === current?.totalCapitulos ? [] : Array.from({length: current?.totalCapitulos || 0}, (_, i) => i+1))

  if (!current) return <div className="page-container loading">Carregando livro...</div>

  return (
    <section className="page-container">
      <Link className="back-link" to="/biblia"><ArrowLeft size={16}/> Todos os livros</Link>
      <div className="chapter-head">
        <div>
          <span className="eyebrow">{current.testamento.toUpperCase()}</span>
          <h1>{current.nome}</h1>
          <p>Selecione um ou vários capítulos para começar a leitura.</p>
        </div>
        <button className="ghost-btn" onClick={selectAll}>
          <Check size={17}/> {selected.length === current.totalCapitulos ? 'Limpar seleção' : 'Selecionar todos'}
        </button>
      </div>

      <div className="selection-info">
        <span>{selected.length ? `${selected.length} capítulo${selected.length > 1 ? 's' : ''} selecionado${selected.length > 1 ? 's' : ''}` : 'Nenhum capítulo selecionado'}</span>
        {selected.length > 0 && (
          <button className="primary-btn compact" onClick={() => navigate(`/biblia/${livro}/leitura?capitulos=${selected.join(',')}`)}>
            <Play size={16}/> Ler selecionados
          </button>
        )}
      </div>

      <div className="chapter-grid">
        {Array.from({length: current.totalCapitulos}, (_, i) => i + 1).map(chapter => {
          const active = selected.includes(chapter)
          return (
            <button key={chapter} className={`chapter-card ${active ? 'active' : ''}`} onClick={() => toggle(chapter)}>
              <span>{chapter}</span>{active && <Check size={16}/>}
            </button>
          )
        })}
      </div>

      <div className="tip-card">
        <BookOpen size={21}/>
        <div><strong>Seleção múltipla</strong><p>Clique em quantos capítulos quiser. Eles serão lidos em sequência na mesma página.</p></div>
      </div>

      <div className="quick-nav">
        <Link to="/biblia"><ArrowLeft size={16}/> Trocar livro</Link>
        <Link to={`/biblia/${livro}/leitura?capitulos=1`}>Começar pelo capítulo 1 <ArrowRight size={16}/></Link>
      </div>
    </section>
  )
}
