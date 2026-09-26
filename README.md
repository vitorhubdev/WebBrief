<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/webbrief-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./public/webbrief-logo.svg">
  <img alt="WebBrief" src="./public/webbrief-logo.svg" width="560">
</picture>

# WebBrief

**WebBrief** is an open-source bilingual (English + Portuguese) toolkit that turns a project idea into a **structured web/project brief** and a downloadable **agent kit**: `AGENTS.md`, `SKILL.md` files, harness adapters (including optional Cursor export), specs, and token-economy notes.

Built by [Vitor (vitorhubdev)](https://github.com/vitorhubdev) · [vitorhub.com](https://vitorhub.com)

## What you get

- A guided form (template → story → harness & options)
- A zip with kickoff prompt, contract files, use-case skills, and target-specific shims
- Three workflow rhythms: **rapid**, **structured**, and **spec-driven**
- Optional Ralph / Gauntlet loop configuration

WebBrief is a professional OSS utility—not a toy demo. Generated kits are meant to live in your repo so agents read files from disk instead of bloating chat context.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL from Vite. Use the **PT / EN** toggle in the header; preference is stored in `localStorage`.

```bash
npm run build   # production build (GitHub Pages–ready)
npm run lint
```

## GitHub Pages

The site deploys automatically when changes land on `main`. Enable **Settings → Pages → Source: GitHub Actions**, then see [DEPLOY.md](./DEPLOY.md) for the repo rename note and URL details.

Live demo (after rename & deploy): `https://vitorhubdev.github.io/WebBrief/`

## License

MIT

---

## WebBrief (Português)

**WebBrief** é um kit open source bilíngue (português + inglês) que transforma a ideia do projeto em um **brief estruturado** e um **kit para agentes**: `AGENTS.md`, arquivos `SKILL.md`, adaptadores de harness (export Cursor opcional), specs e notas de economia de tokens.

Autor: [Vitor (vitorhubdev)](https://github.com/vitorhubdev) · [vitorhub.com](https://vitorhub.com)

### Uso rápido

```bash
npm install
npm run dev
```

Alterne **Português / English** no cabeçalho; a preferência fica no `localStorage`.

### GitHub Pages

Deploy automático no push para `main`. Ative **Configurações → Pages → Origem: GitHub Actions**. Detalhes em [DEPLOY.md](./DEPLOY.md).

Licença: MIT
