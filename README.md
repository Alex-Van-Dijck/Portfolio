# Portfolio

Personal portfolio for Alex Van Dijck, a full-stack engineer based in Wuustwezel, Belgium. The hero features an interactive three.js scene.

## Stack

- React 19 and TypeScript, built with Vite (React Compiler enabled)
- Tailwind CSS v4
- three.js through React Three Fiber and drei
- EmailJS for the contact form
- Deployed to GitHub Pages with GitHub Actions

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site is served under `/Portfolio/` (see `base` in `vite.config.ts`).

## Environment variables

The contact form needs three EmailJS values, set in `.env.local` for development:

| Variable                   | Description         |
| -------------------------- | ------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service ID  |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key  |

Vite inlines these into the client bundle at build time, so they are visible to anyone. Restrict the allowed domains in the EmailJS dashboard.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the dev server           |
| `npm run build`   | Type-check and build to `dist` |
| `npm run lint`    | Run ESLint                     |
| `npm run preview` | Preview the production build   |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The three `VITE_EMAILJS_*` values must be saved as Actions variables, either at repository level or under the `github-pages` environment.
