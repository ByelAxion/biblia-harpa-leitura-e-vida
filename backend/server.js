import express from 'express'
import cors from 'cors'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, 'data')

const readJson = async (name) => JSON.parse(await fs.readFile(path.join(dataDir, name), 'utf8'))

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Bíblia & Harpa API' })
})

app.get('/api/biblia/livros', async (_req, res) => {
  try {
    const bible = await readJson('biblia.json')
    res.json(bible.map((book, index) => ({
      id: index + 1,
      nome: book.name,
      abreviacao: book.abbrev,
      slug: slugify(book.name),
      totalCapitulos: book.chapters.length,
      testamento: index < 39 ? 'Antigo Testamento' : 'Novo Testamento'
    })))
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível carregar os livros.' })
  }
})

app.get('/api/biblia/:livro/:capitulo', async (req, res) => {
  try {
    const bible = await readJson('biblia.json')
    const book = bible.find((item) =>
      slugify(item.name) === req.params.livro ||
      item.abbrev?.toLowerCase() === req.params.livro.toLowerCase()
    )
    const chapterNumber = Number(req.params.capitulo)

    if (!book || !Number.isInteger(chapterNumber) || chapterNumber < 1 || chapterNumber > book.chapters.length) {
      return res.status(404).json({ error: 'Livro ou capítulo não encontrado.' })
    }

    const verses = book.chapters[chapterNumber - 1]
    res.json({
      livro: book.name,
      abreviacao: book.abbrev,
      capitulo: chapterNumber,
      totalCapitulos: book.chapters.length,
      versiculos: verses.map((texto, index) => ({
        numero: index + 1,
        texto: String(texto).trim()
      }))
    })
  } catch {
    res.status(500).json({ error: 'Erro ao carregar o capítulo.' })
  }
})

app.get('/api/harpa', async (req, res) => {
  try {
    const harpa = await readJson('harpa.json')
    const q = String(req.query.q || '').trim().toLowerCase()
    const hymns = Object.entries(harpa)
      .map(([numero, item]) => ({
        numero: Number(numero),
        titulo: String(item.hino || '').replace(/^\d+\s*-\s*/, ''),
        coro: item.coro || '',
        versiculos: item.verses || {}
      }))
      .filter((hino) => !q || `${hino.numero} ${hino.titulo}`.toLowerCase().includes(q))
    res.json(hymns)
  } catch {
    res.status(500).json({ error: 'Não foi possível carregar a Harpa.' })
  }
})

app.get('/api/harpa/:numero', async (req, res) => {
  try {
    const harpa = await readJson('harpa.json')
    const item = harpa[String(req.params.numero)]
    if (!item) return res.status(404).json({ error: 'Hino não encontrado.' })

    res.json({
      numero: Number(req.params.numero),
      titulo: String(item.hino || '').replace(/^\d+\s*-\s*/, ''),
      coro: item.coro || '',
      versiculos: item.verses || {}
    })
  } catch {
    res.status(500).json({ error: 'Erro ao carregar o hino.' })
  }
})

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

app.listen(3001, () => {
  console.log('Bíblia & Harpa API rodando em http://localhost:3001')
})
