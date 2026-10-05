import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getLivros, type Livro } from '../lib/api'

export function BiblePage() {
  const [books, setBooks] = useState<Livro[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { getLivros().then(setBooks).catch(e => setError(e.message)) }, [])

  const filtered = useMemo(() => books.filter(book =>
    `${book.nome} ${book.abreviacao}`.toLowerCase().includes(query.toLowerCase())
  ), [books, query])

  const old = filtered.filter(b => b.testamento === 'Antigo Testamento')
  const young = filtered.filter(b => b.testamento === 'Novo Testamento')

  return (
    <section className="page-container">
      <div className="page-intro">
        <span className="eyebrow">BÍBLIA SAGRADA</span>
        <h1>Explorar a Bíblia</h1>
        <p>Escolha um livro para encontrar seus capítulos.</p>
        <label className="search-box">
          <Search size={18}/>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar livro..." />
        </label>
      </div>

      {error && <div className="error-box">{error}</div>}
      <BookSection title="Antigo Testamento" books={old}/>
      <BookSection title="Novo Testamento" books={young}/>
    </section>
  )
}

function BookSection({ title, books }: { title: string, books: Livro[] }) {
  return (
    <section className="book-section">
      <div className="section-line"><h2>{title}</h2><span>{books.length} livros</span></div>
      <div className="book-grid">
        {books.map(book => (
          <Link to={`/biblia/${book.slug}`} className="book-card" key={book.slug}>
            <span className="book-number">{book.id}</span>
            <div><strong>{book.nome}</strong><small>{book.abreviacao} · {book.totalCapitulos} capítulos</small></div>
          </Link>
        ))}
      </div>
    </section>
  )
}
