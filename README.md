# ❄️ Winter Arc Tracker

A daily habit tracker for a Winter Arc challenge — **Sept 2, 2026 → Feb 28, 2027** by default (fully editable). It's a single self-contained web app: no sign-up, no backend, no accounts. Everything lives privately in the browser of whoever opens it.

Built so you can host it once on GitHub Pages and hand the link to anyone — they open it, it works immediately, and they can make it their own.

## Features

- **Today** — a daily checklist with a progress ring, a 7-day glance strip, and a notes field
- **Calendar** — a full heatmap of the whole arc, tap any day to view or edit it
- **Stats** — current streak, best streak, overall completion %, and a per-habit breakdown
- **Manage** — add, edit, reorder, or archive habits; change your start/end dates anytime
- **Share progress** — generates a shareable image card of your streak and stats
- **Installable** — "Add to Home Screen" on iPhone/Android for a real app icon and offline access
- **Milestone celebrations** — a little confetti at streak milestones (3, 7, 14, 30 days…)
- **Private by default** — all data is stored only in the visitor's own browser (`localStorage`); nothing is ever sent anywhere
- **Backup/restore** — export a `.json` backup any time, or import one on a new device

## Hosting it on GitHub Pages

1. Create a new **public** GitHub repository (e.g. `winter-arc`).
2. Upload all the files in this folder to the repo root:
   ```
   index.html
   manifest.json
   sw.js
   icon-192.png
   icon-512.png
   icon-maskable-512.png
   apple-touch-icon.png
   README.md
   ```
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a live URL after a minute, usually:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
6. That's it — open it on your phone and it's live.

## Sharing it with friends

Just send them the link. Two ways they can use it:

- **Use your link directly** — their check-ins are private to their own device (localStorage never syncs between people), so many people can use the exact same URL independently.
- **Fork the repo** — if they want their own copy to fully customize and host under their own GitHub, they can fork it and repeat the steps above.

Tell them to tap **Share → Add to Home Screen** (iPhone) or use the **Install** button in the Manage tab (Android/Chrome) so it opens like a real app.

## Customizing

- **Habits**: everything is editable from the Manage tab — no code changes needed. Add/remove/reorder/archive habits right in the app.
- **Dates**: change the arc's start/end date in Manage → Arc dates.
- **Default habits / colors / name**: open `index.html` in any text editor.
  - Default habit list: search for `defaultHabits(` near the top of the `<script>` block.
  - Default dates: search for `defaultState(` just below it.
  - Colors: the `:root { --bg: ...; --ice: ...; --ember: ...; }` block near the top of `<style>`.

## A couple of notes

- This app has **no server and no login** — that's intentional, so anyone can use it instantly with zero setup. The tradeoff is that data doesn't sync across devices; use **Export/Import** in Manage to move data to a new phone.
- Clearing browser data/cache on a device will erase its tracker data — encourage friends to export a backup occasionally.
- The app is dark-themed by design (no light mode) to match the "Winter Arc" aesthetic.
