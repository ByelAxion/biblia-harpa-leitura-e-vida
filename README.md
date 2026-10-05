# Bíblia & Harpa — Leitura e Vida

Projeto completo em React + TypeScript + Vite no frontend e Node.js + Express no backend.

## O que já está incluído

- Logo enviada no projeto.
- Bíblia Livre em JSON local.
- Harpa em JSON local.
- API própria no backend.
- 66 livros separados em Antigo e Novo Testamento.
- Seleção de vários capítulos.
- Leitura de vários capítulos na mesma página.
- Setas para capítulo anterior e próximo.
- Navegação rápida entre capítulos.
- Busca de livros e hinos.
- Página individual de cada hino.
- Tema claro/escuro salvo no navegador.
- Layout responsivo.
- Footer com "Site criado pela Vellmont ent."

## Rodar

Na pasta raiz:

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

Se preferir instalar separado:

```bash
cd backend
npm install
npm run dev
```

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

## API

- GET `/api/health`
- GET `/api/biblia/livros`
- GET `/api/biblia/:livro/:capitulo`
- GET `/api/harpa`
- GET `/api/harpa/:numero`

Os arquivos de conteúdo ficam em `backend/data/`.

## Observação sobre conteúdo

O projeto usa os arquivos JSON disponibilizados no projeto. Antes de publicar, confira as permissões/licenças das traduções bíblicas e das letras dos hinos que serão distribuídas no site.
