# plushcutaudio.com

The Plush Cut Audio website. Built with [Astro](https://astro.build), which turns
the files in `src/` into a plain static website. Every push to `main` is built
and published to GitHub Pages automatically (see `.github/workflows/ci.yml`).
If a build fails, the live site stays on the last good version.

## Where things live

| You want to change...                         | Edit this                         |
| :-------------------------------------------- | :-------------------------------- |
| Any text, name, project, team member, link    | `src/data/site.ts`                |
| Colors, fonts, sizes, spacing, animation speed | `src/styles/theme.css`            |
| Layout of a page or component                 | `src/styles/global.css`           |
| Images and videos                             | drop files in `public/media/`     |
| The logo shape                                | `src/data/logo.ts`                |
| Page structure (rarely needed)                | `src/pages/*.astro`, `src/components/*.astro` |

Each page is one file in `src/pages/`: `index` (home), `services`, `portfolio`,
`team`, `about`, `contact`, `404`.

## Swapping placeholders for real media

1. Put the file in `public/media/`, e.g. `public/media/team/jane.jpg`.
2. In `src/data/site.ts`, replace the placeholder with the path *without*
   `public`: `headshot: "/media/team/jane.jpg"`.

Reels can be a video file in `public/media/` (MP4, H.264) or a YouTube/Vimeo
link. Keep self-hosted videos small (under ~50 MB; GitHub rejects files over
100 MB). YouTube or Vimeo is the better home for long reels.

Image shapes the site crops to: team headshots 4:5 portrait, project covers
16:9, service images 3:2, showreel poster 16:9. Around 2000 px on the long
side is plenty.

## Themes

`src/styles/theme.css` has the default look (`:root`) and three alternates
(`gallery`, `tide`, `brass`). Preview one on any page with `?theme=gallery`;
add `?preview` to show a picker in the corner. `?theme=ink` goes back to
default, `?preview=off` hides the picker. Both are remembered per browser.

## Previewing on your own computer

Needs [Node.js](https://nodejs.org) 20 or newer. In this folder:

```
npm install
npm run dev
```

Then open http://localhost:4321. The page reloads as you save files.
`npm run build` makes the final site in `dist/` (a good check before pushing).

## Fonts

Self-hosted in `public/fonts/` (Quicksand, Cormorant Garamond, Jost), all
under the SIL Open Font License (`public/fonts/LICENSE-OFL.txt`).
