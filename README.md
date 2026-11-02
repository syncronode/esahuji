# eSahuji website

Marketing site for esahuji.com

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build for hosting

```bash
npm run build    # writes a static site to ./out
```

Upload the `out` folder to any static host (Cloudflare Pages, Netlify, Vercel), or connect this
repo to the host and set the build command to `npm run build` with output folder `out`.

## Where things are

- `app/page.tsx`: all page sections and copy
- `app/globals.css`: styles and brand colours
- `components/pos/`: the interactive tablet POS in the hero
  - `data.ts`: the 18 items, prices and udharo customers
  - `art.ts`: product drawings (swap for real photos later)
- `public/assets/`: logo, mascot and POS screenshots
# esahuji
