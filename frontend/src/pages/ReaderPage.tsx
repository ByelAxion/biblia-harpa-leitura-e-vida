import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, List, LoaderCircle } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getCapitulo, getLivros, type Capitulo, type Livro } from '../lib/api'

export function ReaderPage() {
  const { livro = '' } = useParams()
  const [params] = useSearchParams()
  const chapters = useMemo(() =>
    (params.get('capitulos') || '1').split(',').map(Number).filter(Boolean).sort((a,b) => a-b)
  , [params])
  const [books, setBooks] = useState<Livro[]>([])
  const [data, setData] = useState<Capitulo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentBook = books.find(b => b.slug === livro)
  const activeFirst = chapters[0] || 1
  const prevChapter = activeFirst > 1 ? activeFirst - 1 : null
  const nextChapter = currentBook && activeFirst < currentBook.totalCapitulos ? activeFirst + 1 : null

  useEffect(() => {
    getLivros().then(setBooks).catch(e => setError(e.message))
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all(chapters.map(c => getCapitulo(livro, c)))
      .then(result => { if (!cancelled) setData(result) })
      .catch(e => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [livro, chapters])

  if (loading) return <div className="reader-loading"><LoaderCircle className="spin" size={26}/> Abrindo sua leitura...</div>

  return (
    <section className="reader-page">
      <div className="reader-toolbar">
        <Link className="back-link" to={`/biblia/${livro}`}><List size={16}/> Capítulos</Link>
        <span><BookOpen size={15}/> {currentBook?.nome || data[0]?.livro}</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      <article className="reader">
        {data.map((chapter, chapterIndex) => (
          <section className="chapter-reading" key={chapter.capitulo}>
            <div className="chapter-title">
              <span>{String(chapterIndex + 1).padStart(2, '0')}</span>
              <div><small>{chapter.livro}</small><h1>Capítulo {chapter.capitulo}</h1></div>
            </div>
            <div className="verse-list">
              {chapter.versiculos.map(v => (
                <p className="verse" key={v.numero}><sup>{v.numero}</sup>{v.texto}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <div className="reader-nav">
        {prevChapter ? (
          <Link className="nav-chapter" to={`/biblia/${livro}/leitura?capitulos=${prevChapter}`}>
            <ArrowLeft/><span><small>Anterior</small><strong>Capítulo {prevChapter}</strong></span>
          </Link>
        ) : <div/>}
        <Link className="reader-center" to={`/biblia/${livro}`}>Escolher capítulo</Link>
        {nextChapter ? (
          <Link className="nav-chapter next" to={`/biblia/${livro}/leitura?capitulos=${nextChapter}`}>
            <span><small>Próximo</small><strong>Capítulo {nextChapter}</strong></span><ArrowRight/>
          </Link>
        ) : <div/>}
      </div>
    </section>
  )
}
