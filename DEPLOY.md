# Deploy notes

## Repository rename (manual)

After this PR merges, rename the GitHub repository from `KimiWebSitePromptCreator` to **`WebBrief`** in repository settings. The app and Vite `base` already assume project pages at:

`https://vitorhubdev.github.io/WebBrief/`

If the org/user or repo name differs, update `base` in `vite.config.ts` to match `/<repo-name>/`.

## GitHub Pages

1. Merge to `main` (the workflow `.github/workflows/deploy-pages.yml` builds on push).
2. In the repo: **Settings → Pages → Build and deployment → Source**: **GitHub Actions**.
3. After the first successful workflow run, the site is published at the project URL above.

## Local preview of production build

```bash
npm run build
npm run preview -- --base /WebBrief/
```
