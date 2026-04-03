# Deploying this repo

## What went wrong

The site in **`portfolio-next/`** is the **Next.js** portfolio. The root **`vercel.json`** used to run **`build.js`**, which only copies **`index.html`** and static files into **`dist/`**. That meant Vercel never built Next.js, so new changes (hero, reels, etc.) never appeared on the live URL.

## Current setup (fixed)

The Next app uses **`output: 'export'`** so `next build` produces static files in **`portfolio-next/out/`** (works on both Netlify and Vercel without a serverless Next runtime).

- **`vercel.json`**: install + build in `portfolio-next`, **`outputDirectory`**: `portfolio-next/out`
- **`netlify.toml`**: same build, **`publish`**: `portfolio-next/out`

Redeploy after pulling (**Vercel** or **Netlify**).

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
| **Publish directory** | `out` *(relative to base directory)* **or** leave empty if `netlify.toml` sets `publish = "portfolio-next/out"` from repo root. |

If you still see Netlify’s generic **“Page not found”**, the deploy is almost certainly pointing at the wrong folder (e.g. old `dist`) — clear **Publish directory** in the UI so **`netlify.toml` wins**, or set it to **`out`** with base **`portfolio-next`**.

3. Click through and **deploy**. If the build fails, open the deploy log — often it’s Node version (we pin **20** in `netlify.toml`) or missing `npm install` (Netlify runs install in the base directory before `npm run build`).

## Large videos

Reel MP4s under **`portfolio-next/public/videos/`** are large. If uploads time out, compress the files or host them on a CDN and point `videoSrc` in **`lib/data.ts`** at those URLs.
