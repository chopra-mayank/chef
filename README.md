# Chef Saurabh Sharma — website

A personal site for Chef Saurabh Sharma (Jaipur, Rajasthan): recipes, YouTube videos, story, accolades, and press. This is the **design preview**: the layout, design system and every page are built, but names, recipes, awards, press and photos are placeholders.

## How do I run it?

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender as static)
```

Pages: `/` · `/recipes` · `/recipes/[slug]` · `/videos` · `/story` · `/accolades` · `/press` · `/contact` · `/design-system` (live style guide, not linked in the main nav).

## Where does the content go?

All copy and data live in `src/content/` as plain TypeScript, so pages update when you edit them:

| File | What it holds |
|---|---|
| `site.ts` | Name, tagline, email, YouTube channel, social links, RajRasa details, nav |
| `recipes.ts` | Recipes: region, course, veg/non-veg, timings, ingredients, method, chef's note |
| `videos.ts` | YouTube videos — paste the real `youtubeId` and the player embeds it |
| `awards.ts` | Awards, headline numbers, jury/advisory roles |
| `press.ts` | Books, columns, press coverage, "As featured in" outlets, quotes |
| `story.ts` | Biography chapters, philosophy, timeline |
| `regions.ts` | The "Every dish has an address" region list on the home page |

Everything marked `PLACEHOLDER` or `TODO` is dummy content. Later this can move to a CMS (Sanity or similar) without changing the page designs.

## What about images?

`public/images/chef-saurabh-portrait.jpg` is the chef's own portrait (home hero). Everything else in `public/images/` is a temporary Unsplash photo (free licence, listed in `CREDITS.md`). Replace them with the chef's own photography, keeping the file names or updating the paths in `src/content/`. Recipe and hero images are cropped to 4:5 and 3:4 arches, so vertical shots work best; video thumbnails are 16:9.

## Where are the design elements?

- **Colours, type scale, motion:** `src/app/globals.css` (Tailwind v4 `@theme` tokens). Section themes `theme-day`, `theme-sand`, `theme-night` and `theme-kohl` switch the palette for a whole section.
- **Rajasthani ornaments:** `src/components/ornaments/`. `Arch.tsx` has the jharokha (cusped), mehrab (round) and pointed arch image frames, generated in `src/lib/arch.ts`. `Patterns.tsx` has the jaali lattice, block-print border, leheriya band, rosette, chhatri drawing and placeholder monogram.
- **Style guide:** open `/design-system` to see all of the above in one place.

## Fonts

Zodiak (display) and Ranade (text) are from the Indian Type Foundry via Fontshare, under the ITF Free Font License, and are self-hosted in `src/fonts/`. Hindi text uses Tiro Devanagari Hindi, and the large home-page greeting uses Halant Light (also ITF); both come from Google Fonts (SIL OFL) via `next/font`.

## What still needs wiring?

- The newsletter and contact forms show a success message but are not connected to a mailing or email service yet.
- Video IDs, real social links, the domain in `site.ts` and the media-kit download files.
- There is no logo yet: the header uses the name as a wordmark. A placeholder monogram exists in `Patterns.tsx` if one is wanted later.

## Stack notes

Next.js 16 (App Router, Cache Components on), React 19, Tailwind CSS 4, Lenis for smooth scrolling, Radix Dialog for the menu and video player, and Phosphor icons. Scroll reveals use the `data-reveal` attribute and are skipped for people who prefer reduced motion. Recipe pages output schema.org `Recipe` data for Google rich results.
