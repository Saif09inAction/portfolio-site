# Deploying this repo

## What went wrong

The site in **`portfolio-next/`** is the **Next.js** portfolio. The root **`vercel.json`** used to run **`build.js`**, which only copies **`index.html`** and static files into **`dist/`**. That meant Vercel never built Next.js, so new changes (hero, reels, etc.) never appeared on the live URL.

## Current setup (fixed)

Root **`vercel.json`** now:

1. Installs dependencies inside **`portfolio-next/`**
2. Runs **`npm run build`** there (Next.js)

Redeploy after pulling this change (**Redeploy** in the Vercel dashboard, or push to `main`).

## If the build still fails on Vercel

1. Open the project on [vercel.com](https://vercel.com) → **Settings** → **General**.
2. Set **Root Directory** to **`portfolio-next`**.
3. Clear custom **Build Command** / **Install Command** in the dashboard (let `package.json` handle it), **or** remove the root **`vercel.json`** so only the subfolder settings apply.
4. Save and **Redeploy**.

## Netlify (Git “Link your project” screen)

The Next.js site is in **`portfolio-next/`**, not the repo root. After you connect **GitHub** → **`Saif09inAction/portfolio-site`** → branch **`main`**:

1. **Leave the UI fields empty** if Netlify reads **`netlify.toml`** from the repo (recommended after you pull latest `main`). It sets **base directory**, **build command**, and Node **20** automatically.

2. **Or** fill the form manually:

| Field | Value |
|--------|--------|
| **Base directory** | `portfolio-next` |
| **Build command** | `npm run build` |
| **Publish directory** | *leave empty* — Netlify’s Next.js runtime (OpenNext) handles output; do **not** use `dist` or `.next` here unless Netlify docs ask for it. |

3. Click through and **deploy**. If the build fails, open the deploy log — often it’s Node version (we pin **20** in `netlify.toml`) or missing `npm install` (Netlify runs install in the base directory before `npm run build`).

## Large videos

Reel MP4s under **`portfolio-next/public/videos/`** are large. If uploads time out, compress the files or host them on a CDN and point `videoSrc` in **`lib/data.ts`** at those URLs.
