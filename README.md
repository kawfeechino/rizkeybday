# birthday microsite — starter code

This is a working implementation of the design direction document, wired up
end to end. A handful of things are deliberately left as placeholders for
you to fill in with the real content.

## 1. install

```
npm install
```

Needs Next.js 14+, React 18, and framer-motion — all already listed in
`package.json`.

## 2. set the unlock date

Create `.env.local` in the project root:

```
UNLOCK_AT_ISO=2026-11-03T00:00:00+08:00
```

Asia/Manila is UTC+8 year-round, so keep that `+08:00` offset rather than
reaching for a timezone library. After changing it, also update the plain-
text line in `components/sections/LockedVideo.tsx` ("opens nov 3 ·
12:00am") so the readable date and the real gate stay in sync.

## 3. replace the placeholders

- `HER_NAME` in `app/page.tsx`
- venue / restaurant / attire copy in `components/sections/WhatWhere.tsx`
  (double-check the restaurant's exact spelling against the real signage)
- photo captions in `components/sections/Memories.tsx`
- the closing paragraph in `components/sections/FinalMessage.tsx`
- every `.photo` placeholder box (a plain paper-colored div right now) in
  `WhatWhere.tsx`, `Memories.tsx`, and `FinalMessage.tsx` — swap for real
  `next/image` photos
- `public/video/placeholder.mp4` and `public/images/video-poster.jpg` —
  see the hosting note below before dropping a real file in here

## 4. where things live

- `app/` — routing, root layout, the unlock API route
- `components/scenes/InvitationScene.tsx` — the cold open and the yes/no
  moment, combined into one full-screen beat
- `components/sections/` — everything that scrolls, in order
- `components/characters/` — `Cat`, `TulipMark`, `PetalBurst`: the
  recurring visual language, built once and reused rather than one-off
  graphics scattered through the codebase
- `components/ui/Button.tsx` — the one shared button style
- `hooks/useUnlockStatus.ts` — polls the server for the real unlock time;
  never trusts the browser's own clock
- `lib/motion.ts` — shared easing/duration constants so every transition
  in the site uses the same feel

## 5. a few implementation notes, in case they're useful

- Dark mode (`prefers-color-scheme`) is intentionally not implemented —
  this is meant to look one specific way, not adapt to system settings.
- The video reveal happens inline, where that section already sits in the
  scroll, rather than hijacking the whole viewport for a second full-screen
  scene. It's simpler to build reliably and still reads as a real moment
  because of the crossfade and the cats/tulip staging around it.
- Memories captions show below each photo always, rather than only on
  hover — a hover-only reveal doesn't exist on a touchscreen, and this is
  very likely opened on a phone first.
- `Cat` supports a `peek` pose that isn't wired up anywhere yet — it's
  there if you want to add the "cat peeks from the edge of the screen"
  moment from the design doc somewhere later.
- `next-env.d.ts` isn't included here — Next.js generates it automatically
  the first time you run `npm run dev`, so there's nothing to do.

## 6. hosting the actual video

Don't commit a large video file into the repo — it bloats every clone and
slows every Vercel deploy from then on. Host it on Vercel Blob, Cloudinary,
or Mux and point the `<source>` in `LockedVideo.tsx` at that URL instead.
Compress before upload; a phone-shot compilation rarely needs to be more
than 1080p.

Deploy as normal on Vercel — nothing here needs anything beyond the
default Next.js + Vercel setup.
