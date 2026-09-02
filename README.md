# 🌿 HabitFlow - World-Class Habit Tracker

The world's most comprehensive habit tracking PWA. Built with modern web technologies, featuring 10 color palettes, advanced analytics, streak celebration, and complete offline support.

## 🌟 Features

### 🎨 **10 Color Palettes**
- Dark/Light themes with 8 vibrant color variants
- Ocean, Forest, Sunset, Purple, Pink, Orange, Teal, Indigo
- System-aware theme detection
- Smooth theme transitions

### 📊 **Advanced Analytics**
- Daily/Weekly/Monthly statistics
- Completion rate tracking
- Category-based breakdowns
- Trend analysis with progress bars
- Best streak tracking

### 🔥 **Streak System**
- Milestone celebrations (3, 7, 14, 21, 30, 45, 60, 90, 100, 365+ days)
- Badges for achievements
- Streak description messages
- Confetti celebration at milestones

### 📅 **Interactive Calendar**
- Month navigation (prev/next buttons)
- Heatmap visualization with completion levels
- Tap to edit any day
- Visual progress tracking

### 🔔 **Reminder System**
- Daily push notifications (Morning/Evening)
- Configurable reminder times
- Notification permission management

### 📤 **Export Options**
- JSON backup (complete data)
- CSV export (habits data)
- PDF report generation
- Share progress to social media

### 📋 **Habit Templates**
- Morning routine
- Workout routine
- Study sessions
- Sleep habits
- Productivity habits
- Custom templates

### 🔐 **Privacy Features**
- Biometric unlock (fingerprint/face ID)
- Data stays on device only
- No cloud sync required
- Biometric protection overlay

### ♿ **Full Accessibility**
- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation (1-4 for views, Space to toggle)
- ARIA labels throughout
- Focus management

### 🌍 **12 Languages**
- English, Spanish, French, German, Portuguese, Italian
- Japanese, Chinese, Korean, Russian, Arabic, Hindi

### ⌨️ **Keyboard Shortcuts**
- `1` - Today view
- `2` - Calendar view
- `3` - Stats view
- `4` - Manage view
- `Space` - Toggle current habit
- `Esc` - Close modals

### 📱 **PWA Features**
- Install to home screen
- Offline-first architecture
- Service worker caching
- Fast loading times
- Push notifications

### 💡 **Motivation System**
- Daily inspirational quotes
- Context-aware messages
- Streak motivation
- Progress celebrations

## 🚀 Quick Start

1. Open `index.html` in any modern browser
2. Click the install button to add to home screen
3. Select your theme and language
4. Add your first habit
5. Start tracking!

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 1 | Go to Today |
| 2 | Go to Calendar |
| 3 | Go to Stats |
| 4 | Go to Manage |
| Space | Toggle habit |
| Esc | Close modal |

## 📱 Mobile Gestures

- Swipe to switch between views (when using PWA)
- Tap to toggle habits
- Double-tap for faster completion
- Long-press for context menu

## 🛠️ Technical Details

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox/grid
- **Vanilla JavaScript (ES2021+)** - No framework overhead
- **Service Worker** - Offline support
- **IndexedDB** - Local storage
- **Notification API** - Push notifications
- **Web Share API** - Social sharing
- **Biometric API** - Fingerprint/face ID

### Storage
- **localStorage** - Quick settings
- **IndexedDB** - Large data sets
- **Cache API** - PWA assets

### Browser Support
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14.1+)
- Samsung Internet (10+)

## 📁 File Structure

```
d:\Koshish\
├── index.html          # Main application (single file)
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── README.md          # This file
├── icon-192.png       # 192x192 icon
├── icon-512.png       # 512x512 icon
├── icon-maskable-512.png
└── apple-touch-icon.png
```

## 🔧 Customization

### Change Default Theme
Edit the `setTheme()` call in the `init()` function

### Add More Languages
Add translations to the `LANGUAGES` object in the script section

### Customize Categories
Edit the `HABIT_CATEGORIES` object

### Change Quotes
Modify the `DAILY_QUOTES` array

## 🐛 Bug Reports & Feature Requests

Create an issue in your repository with:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 📄 License

This project is available under the MIT License.

## 🙏 Credits

Built with the world's best habit tracker in mind.

---

**Made with ❤️ for habit enthusiasts worldwide**