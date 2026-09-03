# ❄️ Winter Arc Pro — The Ultimate Habit & Focus OS

A private, client-side, world-class productivity powerhouse designed for the **Winter Arc** discipline challenge and year-round mastery.

Zero sign-ups, zero tracking, zero cloud lock-in. 100% private, offline-first, and installable on iOS, Android, macOS, and Windows.

---

## 🌟 What Makes This World-Class

### 1. Advanced Multi-Type Habit Engine
- **Flexible Habit Types**:
  - **Checkboxes**: Standard binary completion (Done / Skip).
  - **Numeric Steppers**: Track measurable targets with custom units (e.g. *3.5 Liters Water*, *25 Pages Reading*, *10,000 Steps*).
  - **Duration Targets**: Time-based goals (e.g. *90 min Deep Work*, *15 min Meditation*) linked directly with the Focus Timer.
- **Time of Day Filters**: Focus on what matters now — filter by *Morning*, *Afternoon*, *Evening*, or *Any Time*.
- **Streak Freeze Protection**: Life happens. Bank up to 2 streak freezes per month to safeguard your streak during sickness or planned rest without feeling punished.

### 2. Deep Work & Monk Mode Suite
- **Multi-Mode Focus Timer**: Switch between Pomodoro (25m), Ultra (50m), Deep Work (90m), or an open Stopwatch.
- **Procedural Ambient Sound Synthesizer**: Powered 100% by the Web Audio API with zero external audio assets or downloads:
  - *Brown Noise* (Deep low-frequency rumble for ADHD and intense focus)
  - *Pink Noise* (Balanced soothing static)
  - *White Noise* (Crisp masking sound)
  - *Rain Storm* (Algorithmic raindrop impulses and rolling ambience)
  - *40Hz Gamma Binaural Waves* (Cognitive flow state stimulation)
- **Friction & Distraction Logger**: Catch what pulls you away (phone notifications, fatigue, mind-wandering) to build self-awareness over time.

### 3. Master Heatmap & Day Inspector
- Complete high-density calendar matrix for the entire arc duration.
- Heatmap intensity coloring (25%, 50%, 75%, 100%) showing daily discipline density.
- Tap any day to view retroactive logs, adjust habits, record daily reflections, or apply a streak freeze.

### 4. Discipline Analytics & Trophies
- **Hero Metrics**: Current streak, best streak, total reps completed, and arc progress %.
- **Weekday Consistency Patterns**: Visual bar chart identifying your strongest days vs. vulnerable drop-off days.
- **11 Unlockable Milestone Trophies**: Earn badges from *Arc Awakening* to *Century Titan* and *The Ascendant*.

### 5. High-Resolution Share Card Studio
- Custom 2D Canvas rendering engine synchronized with web font loading.
- **3 Aspect Ratios**: Story (9:16 - 1080x1920), Square Post (1:1 - 1080x1080), and Landscape Banner (16:9 - 1920x1080).
- **Themes & Watermarks**: Match your current accent color with crisp vector snowflakes and dynamic progress cards.
- **One-Tap Sharing**: Share directly to Instagram, WhatsApp, TikTok, or Twitter using native device share sheets or high-res PNG downloads.

### 6. Tactile Audio & Aesthetics
- **7 Luxury Themes**: *Frost Ice*, *Aurora Emerald*, *Obsidian Gold*, *Cyberpunk Violet*, *Crimson Ember*, *Tokyo Night*, and *Alpine Monochrome*.
- **Synthesized UI Audio**: Pleasant mechanical click ticks and euphoric completion chimes.
- **Confetti & Blizzard Celebration**: Dynamic particle physics celebrating 100% daily completion.

### 7. Bulletproof Data Freedom & Cloud Sync
- **GitHub Gist Cloud Sync**: Synchronize your state seamlessly across Phone, Laptop, and Tablet using a GitHub Personal Access Token stored securely in your browser's private memory.
- **Dual Export**: Export full JSON backups for complete restoration, or CSV files for analysis in Excel, Notion, and Google Sheets.
- **Zero 404s & Standalone PWA**: Includes full vector and high-resolution icons with custom Service Worker caching for instant offline boot.

---

## 🚀 Hosting on GitHub Pages

1. Create a public repository (e.g., `Tracker` or `winter-arc`).
2. Upload all files from this directory to the root of your repository:
   ```
   index.html
   style.css
   app.js
   manifest.json
   sw.js
   icons/
     icon.svg
     icon-192.png
     icon-512.png
     icon-maskable-512.png
     apple-touch-icon.png
     favicon-64.png
   README.md
   ```
3. Go to your repository's **Settings → Pages**.
4. Set **Build and deployment** source to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Your live app is available at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `1` | Navigate to **Today** View |
| `2` | Navigate to **Focus Mode** |
| `3` | Navigate to **Calendar Heatmap** |
| `4` | Navigate to **Analytics & Trophies** |
| `5` | Navigate to **Share Card Studio** |
| `6` | Navigate to **Settings & Manage** |
| `Space` | Start / Pause Focus Timer |
| `?` | Open Keyboard Shortcuts Modal |

---

## 🔒 Privacy & Architecture

- **No Tracker, No Telemetry, No Analytics Scripts**: Your habits, thoughts, notes, and progress belong exclusively to you.
- **LocalStorage & Offline Cache**: All data resides strictly in your browser's local sandbox.
