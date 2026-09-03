// Winter Arc Pro — World-Class Habit & Focus OS v3.0
// Pure Vanilla JavaScript · Zero Dependencies · 100% Private & Offline-First

(function () {
  "use strict";

  /* ==========================================================================
     CONSTANTS & PRESETS
     ========================================================================== */

  const STORAGE_KEY = "WINTER_ARC_PRO_V3";
  const LEGACY_STORAGE_KEY_V1 = "winterArcData_v1";
  const LEGACY_CALIBRE_KEY = "CALIBRE_OS_STATE_V3";
  const GIST_CREDS_KEY = "WINTER_ARC_GIST_CREDS";

  const THEMES = [
    { id: "frost", name: "Frost Ice", color: "#6fb8e8" },
    { id: "aurora", name: "Aurora Emerald", color: "#2dd4bf" },
    { id: "gold", name: "Obsidian Gold", color: "#f59e0b" },
    { id: "violet", name: "Cyber Violet", color: "#a855f7" },
    { id: "ember", name: "Crimson Ember", color: "#f97316" },
    { id: "tokyo", name: "Tokyo Night", color: "#38bdf8" },
    { id: "mono", name: "Alpine Monochrome", color: "#f5f5f5" }
  ];

  const EMOJI_PRESETS = [
    "💪","🏃","📚","💧","🧘","😴","🥗","🚭","📵","✍️",
    "❄️","🔥","⏰","🚿","🧠","🎯","🎧","🚶","🌅","💰",
    "🏋️","🚴","🥑","🍎","🛡️","⚡","✨","👑","🏆","📈"
  ];

  const HABIT_SUGGESTIONS = [
    { icon: "🌅", name: "Wake up by 6:00 AM", type: "checkbox", category: "discipline", timeOfDay: "morning" },
    { icon: "🚿", name: "Cold shower", type: "checkbox", category: "discipline", timeOfDay: "morning" },
    { icon: "💪", name: "Workout / Resistance training", type: "checkbox", category: "fitness", timeOfDay: "morning" },
    { icon: "💧", name: "Drink Water", type: "counter", target: 3.5, unit: "Liters", step: 0.5, category: "health", timeOfDay: "anytime" },
    { icon: "📚", name: "Read Non-Fiction", type: "counter", target: 25, unit: "Pages", step: 5, category: "focus", timeOfDay: "evening" },
    { icon: "⏱️", name: "Deep Work Block", type: "duration", target: 90, unit: "Min", category: "focus", timeOfDay: "morning" },
    { icon: "🥗", name: "Clean Whole Food Diet", type: "checkbox", category: "health", timeOfDay: "anytime" },
    { icon: "📵", name: "Zero Social Media / Screen limit", type: "checkbox", category: "discipline", timeOfDay: "anytime" },
    { icon: "🧘", name: "Meditation / Breathwork", type: "duration", target: 15, unit: "Min", category: "mind", timeOfDay: "morning" },
    { icon: "🚶", name: "10,000 Daily Steps", type: "counter", target: 10000, unit: "Steps", step: 1000, category: "fitness", timeOfDay: "anytime" },
    { icon: "✍️", name: "Daily Journal / Stoic Reflection", type: "checkbox", category: "mind", timeOfDay: "evening" },
    { icon: "😴", name: "Sleep 8 Hours", type: "checkbox", category: "health", timeOfDay: "evening" }
  ];

  const DISCIPLINE_QUOTES = [
    "Small reps, repeated, become a different person.",
    "The cold doesn't ask permission. Neither should your discipline.",
    "You don't rise to your goals, you fall to your habits.",
    "One unremarkable day at a time — that's the whole arc.",
    "Consistency is quiet. It rarely feels like progress until it is.",
    "Today's log is tomorrow's evidence.",
    "Ice doesn't form in a day. Neither does discipline.",
    "Show up even when it's easy to skip. Especially then.",
    "The version of you in February is built today.",
    "Progress hides in the days you almost skipped.",
    "Nobody sees the streak. Everyone eventually sees who you became.",
    "Motivation starts it. Systems finish it.",
    "You're not behind. You're mid-arc.",
    "Discomfort now, direction later.",
    "The habit is the point, not the mood you're in.",
    "Every checkbox is a small vote for who you're becoming.",
    "Cold mornings, warm results.",
    "You don't need to feel ready. You need to show up.",
    "Small wins compound quietly, then all at once.",
    "The arc doesn't care how you feel about Tuesday.",
    "Discipline is a promise you keep to yourself.",
    "Skipping one day is a choice. Skipping two is a habit.",
    "Winter tests. Spring reveals.",
    "Go slow if you must. Just don't stop.",
    "The streak isn't the goal — who it's making you is.",
    "Today doesn't need to be perfect. It needs to be logged.",
    "Every arc has quiet, unremarkable middle days. This might be one.",
    "Build it when no one's watching. That's when it counts most.",
    "Comfort is the only real opponent here.",
    "Do it tired. Do it bored. Do it anyway.",
    "The version of you that finishes this arc is already in motion.",
    "Small, boring, repeated — that's the whole formula.",
    "You don't have to want to. You just have to do it.",
    "Every day tracked is a day you chose yourself.",
    "The hardest rep is the one you almost skipped.",
    "Nobody becomes disciplined on a good day — it happens on the bad ones."
  ];

  const TROPHY_DEFINITIONS = [
    { id: "first_rep", name: "Arc Awakening", desc: "Log your first completed habit.", icon: "❄️" },
    { id: "streak_3", name: "Spark of Fire", desc: "Achieve a 3-day full completion streak.", icon: "🔥" },
    { id: "streak_7", name: "Unshakable Week", desc: "Achieve a 7-day full completion streak.", icon: "⚡" },
    { id: "streak_14", name: "Fortress of Habit", desc: "Reach 14 days of unbroken discipline.", icon: "🛡️" },
    { id: "streak_30", name: "Winter Master", desc: "Maintain a 30-day complete streak.", icon: "🏔️" },
    { id: "streak_100", name: "Century Titan", desc: "100 consecutive days of mastery.", icon: "👑" },
    { id: "reps_100", name: "Centurion Reps", desc: "Complete 100 total habit actions.", icon: "🎯" },
    { id: "reps_500", name: "Iron Disciplined", desc: "Complete 500 total habit actions.", icon: "⚔️" },
    { id: "focus_10h", name: "Deep Worker", desc: "Log over 10 hours of focused work blocks.", icon: "⏱️" },
    { id: "freeze_used", name: "Strategic Recovery", desc: "Safeguard your momentum with a streak freeze.", icon: "🧊" },
    { id: "full_arc", name: "The Ascendant", desc: "Finish your entire Winter Arc timeline.", icon: "🏆" }
  ];

  /* ==========================================================================
     DATE UTILITIES (Robust, Timezone-Safe, Leap-Year Proof)
     ========================================================================== */

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function toDateStr(dateObj) {
    const d = dateObj || new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function parseDateStr(s) {
    if (!s || typeof s !== "string") return new Date();
    const parts = s.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function addDays(dateStr, days) {
    const d = parseDateStr(dateStr);
    d.setDate(d.getDate() + days);
    return toDateStr(d);
  }

  function daysBetween(aStr, bStr) {
    const da = parseDateStr(aStr);
    const db = parseDateStr(bStr);
    return Math.round((db.getTime() - da.getTime()) / 86400000);
  }

  function todayStr() {
    return toDateStr(new Date());
  }

  function formatDisplayDate(dateStr, style) {
    try {
      const d = parseDateStr(dateStr);
      if (style === "short") {
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
      }
      return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  }

  function uid() {
    return "h_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  function escapeAttr(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ==========================================================================
     STATE MANAGEMENT & DEFENSIVE MIGRATION ENGINE
     ========================================================================== */

  function getDefaultHabits(startDate) {
    return [
      { id: uid(), icon: "🌅", name: "Wake up early", type: "checkbox", createdAt: startDate, order: 0, archived: false, schedule: "all", category: "discipline", timeOfDay: "morning" },
      { id: uid(), icon: "💪", name: "Workout", type: "checkbox", createdAt: startDate, order: 1, archived: false, schedule: "all", category: "fitness", timeOfDay: "morning" },
      { id: uid(), icon: "🚿", name: "Cold shower", type: "checkbox", createdAt: startDate, order: 2, archived: false, schedule: "all", category: "discipline", timeOfDay: "morning" },
      { id: uid(), icon: "📚", name: "Read / study", type: "checkbox", createdAt: startDate, order: 3, archived: false, schedule: "all", category: "focus", timeOfDay: "evening" },
      { id: uid(), icon: "💧", name: "Drink 3L water", type: "counter", target: 3, unit: "L", step: 0.5, createdAt: startDate, order: 4, archived: false, schedule: "all", category: "health", timeOfDay: "anytime" },
      { id: uid(), icon: "🥗", name: "No junk food", type: "checkbox", createdAt: startDate, order: 5, archived: false, schedule: "all", category: "health", timeOfDay: "anytime" },
      { id: uid(), icon: "🧘", name: "Meditate", type: "checkbox", createdAt: startDate, order: 6, archived: false, schedule: "all", category: "mind", timeOfDay: "morning" },
      { id: uid(), icon: "😴", name: "Sleep 7–8 hrs", type: "checkbox", createdAt: startDate, order: 7, archived: false, schedule: "all", category: "health", timeOfDay: "evening" }
    ];
  }

  function getInitialState() {
    const start = "2026-09-02";
    const end = "2027-02-28";
    return {
      schemaVersion: 3,
      settings: {
        arcName: "WINTER ARC",
        startDate: start,
        endDate: end,
        theme: "frost",
        soundEnabled: true,
        confettiEnabled: true,
        freezesBanked: 2,
        usedFreezes: []
      },
      habits: getDefaultHabits(start),
      logs: {}, // dateStr -> { done: { habitId: true/number }, note: "", energy: 1-5, focusMinutes: 0 }
      focusSessions: [], // { id, habitId, minutes, date, timestamp }
      frictions: [], // { id, date, note, timestamp }
      unlockedTrophies: []
    };
  }

  function migrateLegacyState() {
    // 1. Try checking v3 storage first
    try {
      const existingV3 = localStorage.getItem(STORAGE_KEY);
      if (existingV3) {
        const parsed = JSON.parse(existingV3);
        if (parsed && typeof parsed === "object" && parsed.schemaVersion >= 3) {
          return sanitizeState(parsed);
        }
      }
    } catch (e) {
      console.warn("Error reading v3 state:", e);
    }

    // 2. Check for legacy winterArcData_v1 (Untouched migration & safety snapshot)
    try {
      const rawV1 = localStorage.getItem(LEGACY_STORAGE_KEY_V1);
      if (rawV1) {
        // Create an immutable pre-upgrade safety snapshot so existing data is preserved untouched
        try {
          if (!localStorage.getItem("winterArcData_v1_BACKUP_ORIGINAL")) {
            localStorage.setItem("winterArcData_v1_BACKUP_ORIGINAL", rawV1);
          }
        } catch {}

        const v1 = JSON.parse(rawV1);
        if (v1 && v1.settings && Array.isArray(v1.habits)) {
          console.log("[Migration] Preserving all earlier winterArcData_v1 data 100% untouched...");
          const newState = getInitialState();
          newState.settings.startDate = v1.settings.startDate || newState.settings.startDate;
          newState.settings.endDate = v1.settings.endDate || newState.settings.endDate;
          newState.settings.theme = v1.settings.accent || "frost";

          // Exact preservation of all user habits and their IDs
          newState.habits = v1.habits.map((h, i) => ({
            id: h.id || uid(),
            icon: h.icon || "🔥",
            name: h.name || "Habit",
            type: h.type || (h.name.toLowerCase().includes("water") ? "counter" : "checkbox"),
            target: h.target || (h.name.toLowerCase().includes("water") ? 3 : 1),
            unit: h.unit || (h.name.toLowerCase().includes("water") ? "L" : ""),
            step: h.step || (h.name.toLowerCase().includes("water") ? 0.5 : 1),
            createdAt: h.createdAt || newState.settings.startDate,
            order: typeof h.order === "number" ? h.order : i,
            archived: !!h.archived,
            schedule: h.schedule || "all",
            category: h.category || "discipline",
            timeOfDay: h.timeOfDay || "anytime"
          }));

          // Exact preservation of all past check-ins and notes
          if (v1.logs && typeof v1.logs === "object") {
            Object.keys(v1.logs).forEach((ds) => {
              const oldLog = v1.logs[ds];
              newState.logs[ds] = {
                done: Object.assign({}, oldLog.done || {}),
                note: oldLog.note || "",
                energy: oldLog.energy || 3,
                focusMinutes: oldLog.focusMinutes || 0
              };
            });
          }

          if (v1.meta && Array.isArray(v1.meta.celebratedStreaks)) {
            newState.unlockedTrophies = v1.meta.celebratedStreaks.map((s) => `streak_${s}`);
          }

          saveStateDirect(newState);
          return newState;
        }
      }
    } catch (e) {
      console.warn("Error migrating v1 state:", e);
    }

    // 3. Check for legacy Calibre OS
    try {
      const rawCalibre = localStorage.getItem(LEGACY_CALIBRE_KEY);
      if (rawCalibre) {
        const cState = JSON.parse(rawCalibre);
        if (cState && (cState.subjects || cState.directives)) {
          const newState = getInitialState();
          if (Array.isArray(cState.completedSessions)) {
            newState.focusSessions = cState.completedSessions;
          }
          saveStateDirect(newState);
          return newState;
        }
      }
    } catch (e) {
      console.warn("Error migrating Calibre state:", e);
    }

    return getInitialState();
  }

  function sanitizeState(s) {
    const base = getInitialState();
    if (!s || typeof s !== "object") return base;
    s.schemaVersion = 3;
    s.settings = Object.assign({}, base.settings, s.settings || {});
    if (!Array.isArray(s.habits)) s.habits = base.habits;
    if (!s.logs || typeof s.logs !== "object") s.logs = {};
    if (!Array.isArray(s.focusSessions)) s.focusSessions = [];
    if (!Array.isArray(s.frictions)) s.frictions = [];
    if (!Array.isArray(s.unlockedTrophies)) s.unlockedTrophies = [];
    return s;
  }

  let state = migrateLegacyState();

  function saveState() {
    saveStateDirect(state);
    checkTrophies();
  }

  function saveStateDirect(st) {
    try {
      // 1. Primary persistence for Winter Arc Pro v3
      localStorage.setItem(STORAGE_KEY, JSON.stringify(st));

      // 2. Dual-persistence: Keep legacy winterArcData_v1 updated in real-time
      // so earlier data is always preserved, untouched, and backward-compatible!
      const v1Compat = {
        schemaVersion: 2,
        settings: {
          startDate: st.settings.startDate,
          endDate: st.settings.endDate,
          accent: st.settings.theme === "gold" ? "gold" : (st.settings.theme === "violet" ? "violet" : (st.settings.theme === "aurora" ? "aurora" : (st.settings.theme === "ember" ? "rose" : "frost")))
        },
        habits: st.habits.map((h) => ({
          id: h.id,
          icon: h.icon,
          name: h.name,
          createdAt: h.createdAt,
          order: h.order,
          archived: !!h.archived
        })),
        logs: {},
        meta: {
          onboarded: true,
          celebratedStreaks: (st.unlockedTrophies || []).map((tid) => parseInt(tid.replace("streak_", ""), 10)).filter((n) => !isNaN(n))
        }
      };

      Object.keys(st.logs).forEach((ds) => {
        const l = st.logs[ds];
        v1Compat.logs[ds] = {
          done: l.done || {},
          note: l.note || ""
        };
      });

      localStorage.setItem(LEGACY_STORAGE_KEY_V1, JSON.stringify(v1Compat));
    } catch (e) {
      showToast("Storage quota warning: unable to save!");
    }
  }

  function getLog(dateStr, create) {
    if (!state.logs[dateStr]) {
      if (!create) return { done: {}, note: "", energy: 3, focusMinutes: 0 };
      state.logs[dateStr] = { done: {}, note: "", energy: 3, focusMinutes: 0 };
    }
    return state.logs[dateStr];
  }

  /* ==========================================================================
     WEB AUDIO SYNTHESIZER: UI CLICKS, CHIMES & AMBIENT GENERATOR
     ========================================================================== */

  let audioCtx = null;
  let ambientSourceNode = null;
  let ambientGainNode = null;
  let isAmbientPlaying = false;
  let currentAmbientSound = "brown";

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playUiClickSound() {
    if (!state.settings.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
  }

  function playCompletionChime() {
    if (!state.settings.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + (idx * 0.09);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.36);
      });
    } catch {}
  }

  // Procedural Noise Generator Buffer
  function generateNoiseBuffer(type, durationSec = 4) {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * durationSec;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    if (type === "white") {
      for (let i = 0; i < bufferSize; i++) {
        left[i] = (Math.random() * 2 - 1) * 0.4;
        right[i] = (Math.random() * 2 - 1) * 0.4;
      }
    } else if (type === "pink") {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const out = (b0 + b1 + b2 + b3 + b4 + b5 + white * 0.5362) * 0.08;
        left[i] = out;
        right[i] = out;
      }
    } else if (type === "brown") {
      let lastOutL = 0.0, lastOutR = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const whiteL = Math.random() * 2 - 1;
        const whiteR = Math.random() * 2 - 1;
        lastOutL = (lastOutL + (0.02 * whiteL)) / 1.02;
        lastOutR = (lastOutR + (0.02 * whiteR)) / 1.02;
        left[i] = lastOutL * 2.8;
        right[i] = lastOutR * 2.8;
      }
    } else if (type === "rain") {
      let brown = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        brown = (brown + (0.03 * white)) / 1.03;
        // Occasional randomized raindrop impulses
        const drop = Math.random() > 0.996 ? (Math.random() * 0.6) : 0;
        const sig = (brown * 1.8) + drop;
        left[i] = sig * 0.45;
        right[i] = sig * 0.45;
      }
    } else if (type === "binaural") {
      // 40Hz Gamma frequency carrier
      const carrier = 210.0;
      const beat = 40.0;
      for (let i = 0; i < bufferSize; i++) {
        const t = i / ctx.sampleRate;
        left[i] = Math.sin(2 * Math.PI * carrier * t) * 0.25;
        right[i] = Math.sin(2 * Math.PI * (carrier + beat) * t) * 0.25;
      }
    }
    return buffer;
  }

  function startAmbientSound(soundType) {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAmbientSound();

    currentAmbientSound = soundType;
    ambientSourceNode = ctx.createBufferSource();
    ambientSourceNode.buffer = generateNoiseBuffer(soundType, 5);
    ambientSourceNode.loop = true;

    ambientGainNode = ctx.createGain();
    const volInput = document.getElementById("synthVolumeSlider");
    const vol = volInput ? (parseInt(volInput.value, 10) / 100) : 0.35;
    ambientGainNode.gain.setValueAtTime(vol * 0.5, ctx.currentTime);

    ambientSourceNode.connect(ambientGainNode);
    ambientGainNode.connect(ctx.destination);
    ambientSourceNode.start();

    isAmbientPlaying = true;
    updateSynthUi();
  }

  function stopAmbientSound() {
    if (ambientSourceNode) {
      try { ambientSourceNode.stop(); ambientSourceNode.disconnect(); } catch {}
      ambientSourceNode = null;
    }
    isAmbientPlaying = false;
    updateSynthUi();
  }

  function setAmbientVolume(valRatio) {
    if (ambientGainNode && audioCtx) {
      ambientGainNode.gain.setValueAtTime(valRatio * 0.5, audioCtx.currentTime);
    }
  }

  function updateSynthUi() {
    const btn = document.getElementById("btnToggleNoisePlay");
    if (btn) {
      btn.textContent = isAmbientPlaying ? "Stop Sound" : "Play Sound";
      btn.classList.toggle("active", isAmbientPlaying);
    }
    document.querySelectorAll(".sound-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.sound === currentAmbientSound);
    });
  }

  /* ==========================================================================
     HABIT EVALUATION & STREAKS LOGIC
     ========================================================================== */

  function isHabitScheduledFor(habit, dateStr) {
    if (!habit || habit.archived) return false;
    if (habit.createdAt && habit.createdAt > dateStr) return false;
    if (!habit.schedule || habit.schedule === "all") return true;

    const dayOfWeek = parseDateStr(dateStr).getDay(); // 0: Sun, 1: Mon...
    if (habit.schedule === "weekdays") return dayOfWeek >= 1 && dayOfWeek <= 5;
    if (habit.schedule === "weekends") return dayOfWeek === 0 || dayOfWeek === 6;
    if (Array.isArray(habit.schedule)) return habit.schedule.includes(dayOfWeek);
    return true;
  }

  function activeHabitsFor(dateStr) {
    return state.habits
      .filter((h) => !h.archived && isHabitScheduledFor(h, dateStr))
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function isHabitDone(habit, log) {
    if (!log || !log.done) return false;
    const val = log.done[habit.id];
    if (habit.type === "counter" || habit.type === "duration") {
      return (Number(val) || 0) >= (habit.target || 1);
    }
    return !!val;
  }

  function getDayCompletion(dateStr) {
    // Check if streak freeze was used
    if (state.settings.usedFreezes && state.settings.usedFreezes.includes(dateStr)) {
      return { done: 1, total: 1, pct: 100, all: true, isFreeze: true };
    }

    const scheduledHabits = activeHabitsFor(dateStr);
    if (scheduledHabits.length === 0) {
      return { done: 0, total: 0, pct: 0, all: false, isFreeze: false };
    }

    const log = getLog(dateStr, false);
    let doneCount = 0;
    scheduledHabits.forEach((h) => {
      if (isHabitDone(h, log)) doneCount++;
    });

    const pct = Math.round((doneCount / scheduledHabits.length) * 100);
    return {
      done: doneCount,
      total: scheduledHabits.length,
      pct,
      all: doneCount === scheduledHabits.length,
      isFreeze: false
    };
  }

  function computeStreaks() {
    const s = state.settings;
    const today = todayStr();
    const lastCountable = today < s.endDate ? today : s.endDate;
    if (lastCountable < s.startDate) return { current: 0, best: 0 };

    let current = 0;
    let cursor = lastCountable;

    // If today is not 100% completed yet, inspect yesterday to see if streak is still active
    if (cursor === today) {
      const tc = getDayCompletion(cursor);
      if (!tc.all) cursor = addDays(cursor, -1);
    }

    while (cursor >= s.startDate) {
      const comp = getDayCompletion(cursor);
      if (comp.total > 0 && comp.all) {
        current++;
        cursor = addDays(cursor, -1);
      } else {
        break;
      }
    }

    let best = 0;
    let run = 0;
    let d = s.startDate;
    while (d <= lastCountable) {
      const dc = getDayCompletion(d);
      if (dc.total > 0 && dc.all) {
        run++;
        if (run > best) best = run;
      } else {
        run = 0;
      }
      d = addDays(d, 1);
    }

    return { current, best };
  }

  function computeOverallArcPct() {
    const s = state.settings;
    const today = todayStr();
    const lastCountable = today < s.endDate ? today : s.endDate;
    if (lastCountable < s.startDate) return 0;

    let totalDone = 0;
    let totalPossible = 0;
    let d = s.startDate;

    while (d <= lastCountable) {
      const habits = activeHabitsFor(d);
      if (habits.length > 0) {
        const log = getLog(d, false);
        totalPossible += habits.length;
        habits.forEach((h) => {
          if (isHabitDone(h, log)) totalDone++;
        });
      }
      d = addDays(d, 1);
    }

    return totalPossible === 0 ? 0 : Math.round((totalDone / totalPossible) * 100);
  }

  function computeTotalReps() {
    let reps = 0;
    Object.keys(state.logs).forEach((ds) => {
      const log = state.logs[ds];
      if (log && log.done) {
        Object.keys(log.done).forEach((hid) => {
          if (log.done[hid]) reps++;
        });
      }
    });
    return reps;
  }

  /* ==========================================================================
     ACHIEVEMENT & TROPHIES ENGINE
     ========================================================================== */

  function checkTrophies() {
    const streaks = computeStreaks();
    const reps = computeTotalReps();
    const unlocked = state.unlockedTrophies || [];

    function grant(id) {
      if (!unlocked.includes(id)) {
        unlocked.push(id);
        state.unlockedTrophies = unlocked;
        const def = TROPHY_DEFINITIONS.find((t) => t.id === id);
        if (def) {
          showToast(`🏆 Trophy Unlocked: ${def.name}!`);
          launchConfetti();
          playCompletionChime();
        }
      }
    }

    if (reps >= 1) grant("first_rep");
    if (streaks.current >= 3) grant("streak_3");
    if (streaks.current >= 7) grant("streak_7");
    if (streaks.current >= 14) grant("streak_14");
    if (streaks.current >= 30) grant("streak_30");
    if (streaks.current >= 100) grant("streak_100");
    if (reps >= 100) grant("reps_100");
    if (reps >= 500) grant("reps_500");

    let totalFocusMins = 0;
    (state.focusSessions || []).forEach((fs) => totalFocusMins += (fs.minutes || 0));
    if (totalFocusMins >= 600) grant("focus_10h");

    if (state.settings.usedFreezes && state.settings.usedFreezes.length > 0) {
      grant("freeze_used");
    }

    if (todayStr() >= state.settings.endDate) {
      grant("full_arc");
    }
  }

  /* ==========================================================================
     TOASTS & VISUAL CELEBRATIONS
     ========================================================================== */

  function showToast(msg) {
    const host = document.getElementById("toastContainer");
    if (!host) return;
    const t = document.createElement("div");
    t.className = "toast-item";
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "translateY(-10px)";
      t.style.transition = "all 0.25s ease";
      setTimeout(() => t.remove(), 250);
    }, 2600);
  }

  function launchConfetti() {
    if (!state.settings.confettiEnabled) return;
    const colors = ["#6fb8e8", "#2dd4bf", "#ff8a4c", "#fbbf24", "#a855f7", "#ffffff"];
    const count = 30;
    const cx = window.innerWidth / 2;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "particle-shard";
      piece.style.left = `${cx + (Math.random() * 260 - 130)}px`;
      piece.style.setProperty("--deltaX", `${Math.random() * 220 - 110}px`);
      piece.style.setProperty("--rotation", `${Math.random() * 720 - 360}deg`);
      const duration = 1.2 + Math.random() * 0.9;
      piece.style.setProperty("--duration", `${duration}s`);
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${5 + Math.random() * 6}px`;
      piece.style.height = `${8 + Math.random() * 8}px`;

      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), duration * 1000 + 200);
    }
  }

  /* ==========================================================================
     UI RENDERING: TODAY VIEW
     ========================================================================== */

  let currentTimeFilter = "all";

  function renderTopbar() {
    const s = state.settings;
    const today = todayStr();
    const titleEl = document.getElementById("topbarBrandText");
    const dTitleEl = document.getElementById("desktopBrandTitle");
    if (titleEl) titleEl.textContent = s.arcName || "WINTER ARC";
    if (dTitleEl) dTitleEl.textContent = s.arcName || "WINTER ARC";

    const badge = document.getElementById("topbarDayBadge");
    const spanEl = document.getElementById("arcDateSpan");
    const daysLeftEl = document.getElementById("arcDaysLeft");
    const linearBar = document.getElementById("arcLinearBar");

    if (spanEl) spanEl.textContent = `${formatDisplayDate(s.startDate, "short")} → ${formatDisplayDate(s.endDate, "short")}`;

    const totalArcDays = Math.max(1, daysBetween(s.startDate, s.endDate) + 1);

    if (today < s.startDate) {
      if (badge) badge.textContent = "Not Started";
      const beforeDays = daysBetween(today, s.startDate);
      if (daysLeftEl) daysLeftEl.textContent = `Starts in ${beforeDays} day${beforeDays === 1 ? "" : "s"}`;
      if (linearBar) linearBar.style.width = "0%";
    } else if (today > s.endDate) {
      if (badge) badge.textContent = "Arc Complete";
      if (daysLeftEl) daysLeftEl.textContent = "Challenge Completed";
      if (linearBar) linearBar.style.width = "100%";
    } else {
      const currentDayNum = Math.min(totalArcDays, daysBetween(s.startDate, today) + 1);
      const remainingDays = daysBetween(today, s.endDate);
      if (badge) badge.textContent = `Day ${currentDayNum} / ${totalArcDays}`;
      if (daysLeftEl) daysLeftEl.textContent = `${remainingDays} day${remainingDays === 1 ? "" : "s"} remaining`;
      const elapsedPct = Math.round((currentDayNum / totalArcDays) * 100);
      if (linearBar) linearBar.style.width = `${elapsedPct}%`;
    }

    const soundIcon = document.getElementById("topbarSoundIcon");
    const sideSoundIcon = document.getElementById("sidebarSoundIcon");
    const sideSoundText = document.getElementById("sidebarSoundText");
    if (soundIcon) soundIcon.textContent = s.soundEnabled ? "🔊" : "🔇";
    if (sideSoundIcon) sideSoundIcon.textContent = s.soundEnabled ? "🔊" : "🔇";
    if (sideSoundText) sideSoundText.textContent = s.soundEnabled ? "Audio FX On" : "Audio FX Off";
  }

  function renderGlanceStrip() {
    const wrap = document.getElementById("glanceStrip");
    if (!wrap) return;
    wrap.innerHTML = "";
    const today = todayStr();

    for (let i = 6; i >= 0; i--) {
      const ds = addDays(today, -i);
      const comp = getDayCompletion(ds);
      const btn = document.createElement("button");
      btn.className = "glance-item";
      btn.setAttribute("aria-label", `${formatDisplayDate(ds, "full")}: ${comp.pct}% complete`);

      const bubble = document.createElement("div");
      bubble.className = "glance-bubble";
      if (ds === today) bubble.classList.add("today");
      if (comp.isFreeze) {
        bubble.classList.add("freeze");
        bubble.textContent = "🛡️";
      } else if (comp.all && comp.total > 0) {
        bubble.classList.add("completed");
        bubble.textContent = "✓";
      } else if (comp.pct > 0) {
        bubble.textContent = `${comp.pct}%`;
      } else {
        bubble.textContent = parseDateStr(ds).getDate();
      }

      const label = document.createElement("span");
      label.className = "glance-label";
      label.textContent = parseDateStr(ds).toLocaleDateString(undefined, { weekday: "narrow" });

      btn.appendChild(bubble);
      btn.appendChild(label);
      btn.addEventListener("click", () => openDayModal(ds));
      wrap.appendChild(btn);
    }
  }

  function renderHeroRing() {
    const today = todayStr();
    const comp = getDayCompletion(today);
    const circle = document.getElementById("heroRingCircle");
    const pctText = document.getElementById("heroRingPct");
    const ratioText = document.getElementById("heroRingRatio");

    const circumference = 440; // 2 * Math.PI * 70
    const offset = circumference - (comp.pct / 100) * circumference;
    if (circle) circle.style.strokeDashoffset = offset;
    if (pctText) pctText.textContent = `${comp.pct}%`;
    if (ratioText) {
      if (comp.isFreeze) ratioText.textContent = "🛡️ Streak Freeze Active";
      else ratioText.textContent = `${comp.done} / ${comp.total} reps done`;
    }
  }

  function renderTodayHabits() {
    const today = todayStr();
    const list = document.getElementById("todayHabitList");
    if (!list) return;

    const scheduled = activeHabitsFor(today);
    const log = getLog(today, false);

    // Apply Time of Day filter
    const filtered = scheduled.filter((h) => {
      if (currentTimeFilter === "all") return true;
      return (h.timeOfDay || "anytime") === currentTimeFilter;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<div style="text-align:center;padding:36px 16px;color:var(--text-dim);border:1px dashed var(--border);border-radius:var(--radius-lg);">
        No habits scheduled for this time slot.<br>Tap Settings to add or modify habits.
      </div>`;
      return;
    }

    list.innerHTML = filtered.map((h) => {
      const isDone = isHabitDone(h, log);
      const val = (log.done && log.done[h.id]) || 0;

      let controlHtml = "";
      if (h.type === "checkbox") {
        controlHtml = `
          <button class="habit-check-btn" aria-label="Toggle ${escapeAttr(h.name)}">
            ${isDone ? "✓" : ""}
          </button>
        `;
      } else if (h.type === "counter") {
        controlHtml = `
          <div class="stepper-wrap">
            <button class="stepper-btn btn-step-minus" data-habit="${h.id}">−</button>
            <span class="stepper-display">${val} / ${h.target} ${h.unit || ""}</span>
            <button class="stepper-btn btn-step-plus" data-habit="${h.id}">+</button>
          </div>
        `;
      } else if (h.type === "duration") {
        controlHtml = `
          <div class="stepper-wrap">
            <button class="stepper-btn btn-step-minus" data-habit="${h.id}">−</button>
            <span class="stepper-display">${val} / ${h.target} min</span>
            <button class="stepper-btn btn-step-plus" data-habit="${h.id}">+</button>
            <button class="action-pill-btn btn-launch-timer" data-habit="${h.id}" title="Launch Focus Timer">⏱️</button>
          </div>
        `;
      }

      return `
        <div class="habit-card ${isDone ? "done" : ""}" data-habit="${h.id}">
          <div class="habit-icon" aria-hidden="true">${h.icon || "⚡"}</div>
          <div class="habit-info">
            <div class="habit-header">
              <span class="habit-title">${escapeHtml(h.name)}</span>
              ${isDone ? '<span class="habit-streak-pill">✓ Done</span>' : ""}
            </div>
            ${h.type !== "checkbox" ? `
              <div class="habit-mini-bar">
                <div class="habit-mini-bar-fill" style="width:${Math.min(100, Math.round((val / (h.target || 1)) * 100))}%;"></div>
              </div>
            ` : ""}
          </div>
          ${controlHtml}
        </div>
      `;
    }).join("");

    // Wire interactions
    list.querySelectorAll(".habit-card").forEach((card) => {
      const hid = card.dataset.habit;
      const habit = state.habits.find((x) => x.id === hid);
      if (!habit) return;

      if (habit.type === "checkbox") {
        card.addEventListener("click", () => toggleHabit(today, hid));
      }

      const btnPlus = card.querySelector(".btn-step-plus");
      const btnMinus = card.querySelector(".btn-step-minus");
      const btnLaunch = card.querySelector(".btn-launch-timer");

      if (btnPlus) {
        btnPlus.addEventListener("click", (e) => {
          e.stopPropagation();
          stepHabit(today, hid, habit.step || 1);
        });
      }
      if (btnMinus) {
        btnMinus.addEventListener("click", (e) => {
          e.stopPropagation();
          stepHabit(today, hid, -(habit.step || 1));
        });
      }
      if (btnLaunch) {
        btnLaunch.addEventListener("click", (e) => {
          e.stopPropagation();
          switchTab("focus");
          const sel = document.getElementById("focusHabitSelect");
          if (sel) sel.value = hid;
        });
      }
    });
  }

  function toggleHabit(dateStr, habitId) {
    const wasAll = getDayCompletion(dateStr).all;
    const log = getLog(dateStr, true);
    log.done[habitId] = !log.done[habitId];
    saveState();
    playUiClickSound();

    const nowComp = getDayCompletion(dateStr);
    if (!wasAll && nowComp.all && nowComp.total > 0) {
      launchConfetti();
      playCompletionChime();
      showToast("Day 100% complete! Discipline solidified! 🎉");
    }

    renderToday();
    renderCalendar();
    renderStats();
  }

  function stepHabit(dateStr, habitId, delta) {
    const habit = state.habits.find((h) => h.id === habitId);
    if (!habit) return;
    const log = getLog(dateStr, true);
    const current = Number(log.done[habitId]) || 0;
    const nextVal = Math.max(0, Math.round((current + delta) * 100) / 100);
    log.done[habitId] = nextVal;
    saveState();
    playUiClickSound();

    if (nextVal >= habit.target && current < habit.target) {
      playCompletionChime();
      showToast(`Target reached for ${habit.name}! 🎯`);
    }

    renderToday();
    renderStats();
  }

  function renderReflection() {
    const today = todayStr();
    const log = getLog(today, false);
    const textarea = document.getElementById("todayJournalText");
    if (textarea) textarea.value = log.note || "";

    document.querySelectorAll("#energyRatingRow .energy-btn").forEach((btn) => {
      btn.classList.toggle("selected", parseInt(btn.dataset.level, 10) === (log.energy || 3));
    });
  }

  function renderToday() {
    renderTopbar();
    renderGlanceStrip();
    renderHeroRing();
    renderTodayHabits();
    renderReflection();

    const quoteIdx = Math.abs(daysBetween(state.settings.startDate, todayStr())) % DISCIPLINE_QUOTES.length;
    const quoteEl = document.getElementById("todayQuoteBanner");
    if (quoteEl) quoteEl.textContent = `\u201C${DISCIPLINE_QUOTES[quoteIdx]}\u201D`;
  }

  /* ==========================================================================
     FOCUS & DEEP WORK TIMER SUITE (Drift-Proof & Background-Safe)
     ========================================================================== */

  let timerInterval = null;
  let timerDurationSec = 25 * 60;
  let timerRemainingSec = 25 * 60;
  let timerEndTime = 0;
  let isTimerRunning = false;
  let isStopwatchMode = false;
  let stopwatchSec = 0;
  let stopwatchStartTime = 0;
  let stopwatchAccumulated = 0;

  function formatTimerDigits(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function getTimerPresetLabel(sec) {
    const mins = Math.round(sec / 60);
    if (mins === 25) return "25-Min Pomodoro";
    if (mins === 50) return "50-Min Ultra";
    if (mins === 90) return "90-Min Deep Work";
    return `${mins}-Min Custom Focus`;
  }

  function updateTimerDisplay() {
    const disp = document.getElementById("focusTimerDisplay");
    const ring = document.getElementById("timerRingProgress");
    const badge = document.getElementById("focusStatusBadge");
    const sub = document.getElementById("focusSubModeText");

    const circumference = (ring && ring.r && ring.r.baseVal) ? (2 * Math.PI * ring.r.baseVal.value) : 628;

    if (isStopwatchMode) {
      if (disp) disp.textContent = formatTimerDigits(stopwatchSec);
      if (sub) sub.textContent = "Open Stopwatch Mode";
      if (ring) {
        const ringProgress = (stopwatchSec % 60) / 60;
        ring.style.strokeDashoffset = circumference - (ringProgress * circumference);
      }
    } else {
      if (disp) disp.textContent = formatTimerDigits(timerRemainingSec);
      if (ring) {
        const fraction = timerDurationSec > 0 ? (timerRemainingSec / timerDurationSec) : 0;
        ring.style.strokeDashoffset = circumference - (fraction * circumference);
      }
      if (sub) {
        if (isTimerRunning) sub.textContent = "Stay in the zone · Deep focus";
        else sub.textContent = getTimerPresetLabel(timerDurationSec);
      }
    }

    if (badge) {
      if (isTimerRunning) {
        badge.className = "timer-status-pill running";
        badge.textContent = "FOCUSING";
      } else if (!isStopwatchMode && timerRemainingSec < timerDurationSec && timerRemainingSec > 0) {
        badge.className = "timer-status-pill paused";
        badge.textContent = "❚❚ PAUSED";
      } else {
        badge.className = "timer-status-pill";
        badge.textContent = "READY TO FOCUS";
      }
    }

    // Update browser tab title
    if (isTimerRunning) {
      const activeText = isStopwatchMode ? formatTimerDigits(stopwatchSec) : formatTimerDigits(timerRemainingSec);
      document.title = `(${activeText}) Focus · ${state.settings.arcName || "Winter Arc"}`;
    } else {
      document.title = "Winter Arc Pro — World-Class Habit & Focus OS";
    }
  }

  function startFocusTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    playUiClickSound();

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }

    const icon = document.getElementById("focusStartIcon");
    const text = document.getElementById("focusStartText");
    if (icon) icon.textContent = "⏸";
    if (text) text.textContent = "Pause Session";

    const now = Date.now();
    if (isStopwatchMode) {
      stopwatchStartTime = now;
    } else {
      timerEndTime = now + (timerRemainingSec * 1000);
    }

    updateTimerDisplay();

    timerInterval = setInterval(() => {
      const currentNow = Date.now();
      if (isStopwatchMode) {
        stopwatchSec = stopwatchAccumulated + Math.floor((currentNow - stopwatchStartTime) / 1000);
        updateTimerDisplay();
      } else {
        const remaining = Math.max(0, Math.ceil((timerEndTime - currentNow) / 1000));
        timerRemainingSec = remaining;
        updateTimerDisplay();
        if (remaining <= 0) {
          completeFocusSession();
        }
      }
    }, 250);
  }

  function pauseFocusTimer() {
    if (!isTimerRunning) return;
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;

    if (isStopwatchMode) {
      stopwatchAccumulated = stopwatchSec;
    }

    const icon = document.getElementById("focusStartIcon");
    const text = document.getElementById("focusStartText");
    if (icon) icon.textContent = "▶";
    if (text) text.textContent = "Resume Session";

    updateTimerDisplay();
    promptFrictionLog();
  }

  function resetFocusTimer() {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
    }

    const icon = document.getElementById("focusStartIcon");
    const text = document.getElementById("focusStartText");
    if (icon) icon.textContent = "▶";
    if (text) text.textContent = "Start Session";

    if (isStopwatchMode) {
      stopwatchSec = 0;
      stopwatchAccumulated = 0;
    } else {
      timerRemainingSec = timerDurationSec;
    }
    updateTimerDisplay();
  }

  function nudgeTimer(deltaSec) {
    if (isStopwatchMode) return;
    const newTotal = Math.max(60, Math.min(180 * 60, timerDurationSec + deltaSec));
    timerDurationSec = newTotal;
    if (!isTimerRunning) {
      timerRemainingSec = newTotal;
    } else {
      timerEndTime += deltaSec * 1000;
      timerRemainingSec = Math.max(0, Math.ceil((timerEndTime - Date.now()) / 1000));
    }
    playUiClickSound();
    updateTimerDisplay();
  }

  // Deep Meditation Singing Bowl / Gong Synthesis via Web Audio API
  function playMeditationBowlSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const harmonics = [264, 528, 792, 1056];
      harmonics.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const amp = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(amp, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 3.1);
      });
    } catch {}
  }

  function completeFocusSession() {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;

    playMeditationBowlSound();
    launchConfetti();

    try {
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    } catch {}

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Focus Session Complete! 🏆", {
        body: "Outstanding deep work block! Time to take a mindful breath.",
        icon: "icons/icon-192.png"
      });
    }

    showToast("Focus block completed! Outstanding deep work! 🏆");

    const sel = document.getElementById("focusHabitSelect");
    const habitId = sel ? sel.value : null;
    const minutes = isStopwatchMode ? Math.max(1, Math.round(stopwatchSec / 60)) : Math.round(timerDurationSec / 60);

    // Save session record
    state.focusSessions = state.focusSessions || [];
    state.focusSessions.push({
      id: uid(),
      habitId,
      minutes,
      date: todayStr(),
      timestamp: Date.now()
    });

    // Credit toward habit if duration habit selected
    if (habitId) {
      stepHabit(todayStr(), habitId, minutes);
    }

    saveState();
    resetFocusTimer();
    renderFocusSuite();
  }

  // Handle Tab Visibility Changes to prevent mobile background drift
  document.addEventListener("visibilitychange", () => {
    if (isTimerRunning) {
      const currentNow = Date.now();
      if (!isStopwatchMode) {
        timerRemainingSec = Math.max(0, Math.ceil((timerEndTime - currentNow) / 1000));
        updateTimerDisplay();
        if (timerRemainingSec <= 0) {
          completeFocusSession();
        }
      } else {
        stopwatchSec = stopwatchAccumulated + Math.floor((currentNow - stopwatchStartTime) / 1000);
        updateTimerDisplay();
      }
    }
  });

  function promptFrictionLog() {
    openModal(`
      <div class="modal-top-bar">
        <div class="modal-title">Session Paused — Friction Log</div>
        <button class="modal-close-btn" id="btnFrictionClose">✕</button>
      </div>
      <p style="font-size:12px;color:var(--text-dim);margin-bottom:14px;">
        Did a distraction or obstacle interrupt your focus block?
      </p>
      <div class="form-group">
        <label>Distraction Category</label>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;" id="frictionChips">
          <button class="chip" data-val="Phone / Notification">📱 Phone / Social</button>
          <button class="chip" data-val="Noise / Interruption">🗣️ Interruption</button>
          <button class="chip" data-val="Fatigue / Low Energy">🥱 Fatigue</button>
          <button class="chip" data-val="Mind Wandering">🧠 Daydreaming</button>
          <button class="chip" data-val="Other">⚡ Other</button>
        </div>
        <input type="text" class="form-input" id="frictionInputNote" placeholder="Optional notes...">
      </div>
      <button class="btn-large btn-primary" id="btnSaveFriction" style="width:100%;justify-content:center;">
        Log Friction &amp; Continue
      </button>
    `);

    let selectedFriction = "Phone / Notification";
    document.querySelectorAll("#frictionChips .chip").forEach((c) => {
      c.addEventListener("click", () => {
        document.querySelectorAll("#frictionChips .chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        selectedFriction = c.dataset.val;
      });
    });

    document.getElementById("btnFrictionClose").addEventListener("click", closeModal);
    document.getElementById("btnSaveFriction").addEventListener("click", () => {
      const note = document.getElementById("frictionInputNote").value.trim();
      state.frictions = state.frictions || [];
      state.frictions.push({
        id: uid(),
        date: todayStr(),
        category: selectedFriction,
        note,
        timestamp: Date.now()
      });
      saveState();
      closeModal();
      showToast("Friction logged. Build self-awareness.");
    });
  }

  function renderFocusSuite() {
    const sel = document.getElementById("focusHabitSelect");
    if (sel) {
      sel.innerHTML = '<option value="">None (General Focus)</option>' +
        state.habits.filter((h) => !h.archived).map((h) => `<option value="${h.id}">${h.icon} ${escapeHtml(h.name)}</option>`).join("");
    }

    const today = todayStr();
    let todayMins = 0;
    let todaySessions = 0;
    (state.focusSessions || []).forEach((fs) => {
      if (fs.date === today) {
        todayMins += (fs.minutes || 0);
        todaySessions++;
      }
    });

    const minEl = document.getElementById("todayFocusMinutes");
    const sessEl = document.getElementById("todayFocusSessions");
    if (minEl) minEl.textContent = `${todayMins} min`;
    if (sessEl) sessEl.textContent = todaySessions;

    updateTimerDisplay();
  }

  /* ==========================================================================
     CALENDAR HEATMAP VIEW
     ========================================================================== */

  function renderCalendar() {
    const wrap = document.getElementById("calendarMonthsWrap");
    if (!wrap) return;
    wrap.innerHTML = "";

    const s = state.settings;
    const today = todayStr();
    const cursor = parseDateStr(s.startDate);
    const endD = parseDateStr(s.endDate);

    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekLabels = ["S","M","T","W","T","F","S"];

    while (cursor <= endD) {
      const year = cursor.getFullYear();
      const month = cursor.getMonth();
      const mStart = new Date(year, month, 1);
      const mEnd = new Date(year, month + 1, 0);

      const card = document.createElement("div");
      card.className = "month-card";

      const header = document.createElement("div");
      header.className = "month-header";
      header.innerHTML = `
        <span class="month-name disp">${monthNames[month]} ${year}</span>
        <span class="month-stat-badge" id="mStat_${year}_${month}">Tracking</span>
      `;
      card.appendChild(header);

      const wkGrid = document.createElement("div");
      wkGrid.className = "weekdays-grid";
      weekLabels.forEach((lbl) => {
        const sp = document.createElement("span");
        sp.textContent = lbl;
        wkGrid.appendChild(sp);
      });
      card.appendChild(wkGrid);

      const daysGrid = document.createElement("div");
      daysGrid.className = "days-grid";

      // Leading empty spaces
      for (let i = 0; i < mStart.getDay(); i++) {
        const emp = document.createElement("div");
        emp.className = "day-cell empty";
        daysGrid.appendChild(emp);
      }

      let dCur = new Date(mStart);
      while (dCur <= mEnd) {
        const ds = toDateStr(dCur);
        const cell = document.createElement("div");
        cell.className = "day-cell";
        cell.textContent = dCur.getDate();

        if (ds < s.startDate || ds > s.endDate) {
          cell.classList.add("empty");
        } else if (ds > today) {
          cell.classList.add("future");
        } else {
          const comp = getDayCompletion(ds);
          if (comp.isFreeze) {
            cell.classList.add("freeze-day");
            cell.textContent = "🛡️";
          } else if (comp.total > 0) {
            const alpha = 0.12 + (comp.pct / 100) * 0.76;
            cell.style.background = `rgba(111,184,232,${alpha.toFixed(2)})`;
            cell.style.borderColor = "transparent";
            if (comp.pct >= 60) cell.style.color = "#040e1a";
          }

          if (ds === today) cell.classList.add("today");

          cell.addEventListener("click", () => openDayModal(ds));
        }

        daysGrid.appendChild(cell);
        dCur.setDate(dCur.getDate() + 1);
      }

      card.appendChild(daysGrid);
      wrap.appendChild(card);
      cursor.setMonth(cursor.getMonth() + 1);
      cursor.setDate(1);
    }
  }

  /* ==========================================================================
     STATS & TROPHIES VIEW
     ========================================================================== */

  function renderStats() {
    const streaks = computeStreaks();
    const overallPct = computeOverallArcPct();
    const reps = computeTotalReps();

    const currEl = document.getElementById("statCurrentStreak");
    const bestEl = document.getElementById("statBestStreak");
    const arcEl = document.getElementById("statArcCompletion");
    const repsEl = document.getElementById("statTotalReps");

    if (currEl) currEl.textContent = streaks.current;
    if (bestEl) bestEl.textContent = streaks.best;
    if (arcEl) arcEl.textContent = `${overallPct}%`;
    if (repsEl) repsEl.textContent = reps;

    renderWeekdayBars();
    renderHabitStats();
    renderTrophiesGrid();
  }

  function renderWeekdayBars() {
    const container = document.getElementById("weekdayBarsContainer");
    if (!container) return;
    container.innerHTML = "";

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const totals = [0, 0, 0, 0, 0, 0, 0];
    const completed = [0, 0, 0, 0, 0, 0, 0];

    const s = state.settings;
    const today = todayStr();
    let d = s.startDate;

    while (d <= today && d <= s.endDate) {
      const dow = parseDateStr(d).getDay();
      const comp = getDayCompletion(d);
      if (comp.total > 0) {
        totals[dow]++;
        if (comp.all) completed[dow]++;
      }
      d = addDays(d, 1);
    }

    let highestPct = -1;
    let strongestDay = "-";

    days.forEach((name, i) => {
      const pct = totals[i] > 0 ? Math.round((completed[i] / totals[i]) * 100) : 0;
      if (pct > highestPct && totals[i] > 0) {
        highestPct = pct;
        strongestDay = `${name} (${pct}%)`;
      }

      const col = document.createElement("div");
      col.className = "bar-col";
      col.innerHTML = `
        <span class="bar-pct-tag">${pct}%</span>
        <div class="bar-track-vertical">
          <div class="bar-fill-vertical" style="height:${pct}%;"></div>
        </div>
        <span class="bar-lbl">${name}</span>
      `;
      container.appendChild(col);
    });

    const badge = document.getElementById("strongestDayBadge");
    if (badge) badge.textContent = `Strongest: ${strongestDay}`;
  }

  function renderHabitStats() {
    const wrap = document.getElementById("habitStatsList");
    if (!wrap) return;
    const active = state.habits.filter((h) => !h.archived);

    if (active.length === 0) {
      wrap.innerHTML = '<div style="color:var(--text-dim);font-size:12px;">No active habits tracked.</div>';
      return;
    }

    wrap.innerHTML = active.map((h) => {
      let totalDays = 0;
      let completedDays = 0;
      const today = todayStr();
      let d = h.createdAt > state.settings.startDate ? h.createdAt : state.settings.startDate;

      while (d <= today && d <= state.settings.endDate) {
        if (isHabitScheduledFor(h, d)) {
          totalDays++;
          if (isHabitDone(h, getLog(d, false))) completedDays++;
        }
        d = addDays(d, 1);
      }

      const pct = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);

      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
            <span>${h.icon} ${escapeHtml(h.name)}</span>
            <span style="font-weight:700;color:var(--accent);">${pct}% (${completedDays}/${totalDays} days)</span>
          </div>
          <div style="height:6px;background:var(--bg-elevated);border-radius:3px;overflow:hidden;">
            <div style="width:${pct}%;height:100%;background:var(--accent);border-radius:3px;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderTrophiesGrid() {
    const grid = document.getElementById("trophiesGrid");
    if (!grid) return;
    const unlocked = state.unlockedTrophies || [];

    grid.innerHTML = TROPHY_DEFINITIONS.map((t) => {
      const isUnlocked = unlocked.includes(t.id);
      return `
        <div class="trophy-badge ${isUnlocked ? "unlocked" : "locked"}">
          <div class="trophy-icon">${t.icon}</div>
          <div class="trophy-name">${escapeHtml(t.name)}</div>
          <div class="trophy-desc">${escapeHtml(t.desc)}</div>
        </div>
      `;
    }).join("");
  }

  /* ==========================================================================
     SHARE CARD STUDIO (High-Res Multi-Format Canvas Engine)
     ========================================================================== */

  async function drawShareCard() {
    const canvas = document.getElementById("shareCanvas");
    if (!canvas) return;
    const ratio = document.getElementById("shareCardRatio")?.value || "9:16";
    const styleTheme = document.getElementById("shareCardStyle")?.value || "current";

    let W = 1080, H = 1920;
    if (ratio === "1:1") { W = 1080; H = 1080; }
    if (ratio === "16:9") { W = 1920; H = 1080; }

    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Ensure typography fonts are fully loaded
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Color palette based on card theme
    let bgStart = "#0c1526", bgEnd = "#060a14", accentCol = "#6fb8e8", emberCol = "#ff8a4c";
    if (styleTheme === "obsidian" || (styleTheme === "current" && state.settings.theme === "gold")) {
      bgStart = "#1f180c"; bgEnd = "#0a0703"; accentCol = "#f59e0b"; emberCol = "#fbbf24";
    } else if (styleTheme === "cyber" || (styleTheme === "current" && state.settings.theme === "aurora")) {
      bgStart = "#091e18"; bgEnd = "#030c0a"; accentCol = "#2dd4bf"; emberCol = "#34d399";
    }

    // Canvas Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, bgStart);
    grad.addColorStop(1, bgEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decorative Borders & Glow Ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, W - 64, H - 64);

    // Snowflake Geometry Emblem
    const centerX = W / 2;
    const emblemY = ratio === "1:1" ? 220 : 340;

    ctx.save();
    ctx.translate(centerX, emblemY);
    ctx.strokeStyle = accentCol;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.lineTo(0, 60);
      ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle = emberCol;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // App Branding Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#8ba0c2";
    ctx.font = "700 36px 'Space Grotesk', sans-serif";
    ctx.fillText(state.settings.arcName || "WINTER ARC", centerX, emblemY + 110);

    // Streak Hero Display
    const streaks = computeStreaks();
    const streakY = emblemY + (ratio === "1:1" ? 280 : 380);

    ctx.fillStyle = emberCol;
    ctx.font = `700 ${ratio === "1:1" ? "180px" : "240px"} 'Space Grotesk', sans-serif`;
    ctx.fillText(String(streaks.current), centerX, streakY);

    ctx.fillStyle = "#cfe6ff";
    ctx.font = "600 34px 'Space Grotesk', sans-serif";
    ctx.fillText("DAYS OF UNBROKEN DISCIPLINE", centerX, streakY + 55);

    // Stats Grid
    const overallPct = computeOverallArcPct();
    const reps = computeTotalReps();
    const gridY = streakY + (ratio === "1:1" ? 170 : 250);

    function drawMetric(x, y, val, lbl) {
      ctx.fillStyle = accentCol;
      ctx.font = "700 64px 'Space Grotesk', sans-serif";
      ctx.fillText(val, x, y);
      ctx.fillStyle = "#8ba0c2";
      ctx.font = "600 24px 'Inter', sans-serif";
      ctx.fillText(lbl, x, y + 36);
    }

    drawMetric(centerX - (W * 0.25), gridY, `${overallPct}%`, "ARC COMPLETION");
    drawMetric(centerX + (W * 0.25), gridY, `${reps}`, "REPS LOGGED");

    // Discipline Quote
    const quoteIdx = Math.abs(daysBetween(state.settings.startDate, todayStr())) % DISCIPLINE_QUOTES.length;
    ctx.fillStyle = "#54688a";
    ctx.font = "italic 26px 'Inter', sans-serif";
    ctx.fillText(`\u201C${DISCIPLINE_QUOTES[quoteIdx]}\u201D`, centerX, H - 120);

    // Watermark footer
    ctx.fillStyle = "#334155";
    ctx.font = "600 20px 'Space Grotesk', sans-serif";
    ctx.fillText("WINTER ARC · PRIVATE & UNBREAKABLE", centerX, H - 60);
  }

  function shareCardNative() {
    const canvas = document.getElementById("shareCanvas");
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "winter-arc-discipline.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "My Winter Arc Progress",
          text: `Forging discipline on Winter Arc. Day streak: ${computeStreaks().current}.`
        }).catch((err) => {
          if (err.name !== "AbortError") downloadCanvasBlob(blob);
        });
      } else {
        downloadCanvasBlob(blob);
      }
    }, "image/png");
  }

  function downloadCanvasBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `winter-arc-progress-${todayStr()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Share card saved to photos!");
  }

  /* ==========================================================================
     MODALS: HABITS CRUD, DAY INSPECTION, & SHORTCUTS
     ========================================================================== */

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalSheet = document.getElementById("modalSheetContent");

  function openModal(html) {
    if (!modalBackdrop || !modalSheet) return;
    modalSheet.innerHTML = html;
    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("open")) closeModal();
  });

  function openHabitModal(habitId = null) {
    const habit = habitId ? state.habits.find((h) => h.id === habitId) : null;
    let selectedEmoji = habit ? habit.icon : EMOJI_PRESETS[Math.floor(Math.random() * EMOJI_PRESETS.length)];

    openModal(`
      <div class="modal-top-bar">
        <div class="modal-title">${habit ? "Edit Habit" : "Add New Habit"}</div>
        <button class="modal-close-btn" id="mClose">✕</button>
      </div>

      ${!habit ? `
        <div style="font-size:12px;font-weight:600;color:var(--text-dim);margin-bottom:6px;">Quick Add Suggestions</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;" id="mSuggestionsWrap">
          ${HABIT_SUGGESTIONS.map((s) => `
            <button class="chip btn-preset-chip" data-name="${escapeAttr(s.name)}" data-icon="${s.icon}" data-type="${s.type}" data-target="${s.target || 1}" data-unit="${s.unit || ""}" data-time="${s.timeOfDay}">
              ${s.icon} ${escapeHtml(s.name)}
            </button>
          `).join("")}
        </div>
      ` : ""}

      <div class="form-group">
        <label for="mHabitName">Habit Name</label>
        <input type="text" class="form-input" id="mHabitName" placeholder="e.g. Cold Shower, 30 Pages, Workout" value="${habit ? escapeAttr(habit.name) : ""}">
      </div>

      <div class="form-group">
        <label>Habit Icon</label>
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;" id="mEmojiRow">
          ${EMOJI_PRESETS.map((em) => `
            <button class="theme-swatch-btn ${em === selectedEmoji ? "selected" : ""}" style="background:var(--bg-card);font-size:18px;">
              ${em}
            </button>
          `).join("")}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="form-group">
          <label for="mHabitType">Tracking Type</label>
          <select class="form-input" id="mHabitType">
            <option value="checkbox" ${habit && habit.type === "checkbox" ? "selected" : ""}>Simple Checkbox (Done / Skip)</option>
            <option value="counter" ${habit && habit.type === "counter" ? "selected" : ""}>Numeric Stepper (Water, Pages)</option>
            <option value="duration" ${habit && habit.type === "duration" ? "selected" : ""}>Duration Target (Focus, Meditation)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="mHabitTime">Time of Day</label>
          <select class="form-input" id="mHabitTime">
            <option value="morning" ${habit && habit.timeOfDay === "morning" ? "selected" : ""}>🌅 Morning</option>
            <option value="afternoon" ${habit && habit.timeOfDay === "afternoon" ? "selected" : ""}>☀️ Afternoon</option>
            <option value="evening" ${habit && habit.timeOfDay === "evening" ? "selected" : ""}>🌙 Evening</option>
            <option value="anytime" ${!habit || habit.timeOfDay === "anytime" ? "selected" : ""}>⚡ Any Time</option>
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;" id="mTargetRow">
        <div class="form-group">
          <label for="mHabitTarget">Target Goal</label>
          <input type="number" class="form-input" id="mHabitTarget" value="${habit ? (habit.target || 1) : 1}" step="any">
        </div>
        <div class="form-group">
          <label for="mHabitUnit">Unit</label>
          <input type="text" class="form-input" id="mHabitUnit" placeholder="e.g. Liters, Pages, Min" value="${habit ? escapeAttr(habit.unit || "") : ""}">
        </div>
      </div>

      <button class="btn-large btn-primary" id="mSaveHabit" style="width:100%;justify-content:center;margin-top:14px;">
        ${habit ? "Save Changes" : "Create Habit"}
      </button>

      ${habit ? `
        <button class="btn-large btn-danger" id="mDeleteHabit" style="width:100%;justify-content:center;margin-top:8px;">
          Archive Habit
        </button>
      ` : ""}
    `);

    document.getElementById("mClose").addEventListener("click", closeModal);

    // Wire emoji picker
    document.querySelectorAll("#mEmojiRow button").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#mEmojiRow button").forEach((x) => x.classList.remove("selected"));
        b.classList.add("selected");
        selectedEmoji = b.textContent.trim();
      });
    });

    // Wire quick suggestion chips
    document.querySelectorAll(".btn-preset-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.getElementById("mHabitName").value = chip.dataset.name;
        selectedEmoji = chip.dataset.icon;
        document.getElementById("mHabitType").value = chip.dataset.type;
        document.getElementById("mHabitTarget").value = chip.dataset.target;
        document.getElementById("mHabitUnit").value = chip.dataset.unit;
        document.getElementById("mHabitTime").value = chip.dataset.time;
      });
    });

    document.getElementById("mSaveHabit").addEventListener("click", () => {
      const name = document.getElementById("mHabitName").value.trim();
      if (!name) {
        showToast("Please give your habit a name!");
        return;
      }

      const type = document.getElementById("mHabitType").value;
      const target = parseFloat(document.getElementById("mHabitTarget").value) || 1;
      const unit = document.getElementById("mHabitUnit").value.trim();
      const timeOfDay = document.getElementById("mHabitTime").value;

      if (habit) {
        habit.name = name;
        habit.icon = selectedEmoji;
        habit.type = type;
        habit.target = target;
        habit.unit = unit;
        habit.timeOfDay = timeOfDay;
      } else {
        const maxOrder = state.habits.reduce((m, h) => Math.max(m, h.order || 0), -1);
        state.habits.push({
          id: uid(),
          name,
          icon: selectedEmoji,
          type,
          target,
          unit,
          timeOfDay,
          createdAt: todayStr() < state.settings.startDate ? state.settings.startDate : todayStr(),
          order: maxOrder + 1,
          archived: false,
          schedule: "all"
        });
      }

      saveState();
      closeModal();
      renderToday();
      renderManageHabits();
      showToast(habit ? "Habit updated" : "New habit forged! 🔥");
    });

    if (habit) {
      document.getElementById("mDeleteHabit").addEventListener("click", () => {
        habit.archived = true;
        saveState();
        closeModal();
        renderToday();
        renderManageHabits();
        showToast(`Habit "${habit.name}" archived.`);
      });
    }
  }

  function openDayModal(dateStr) {
    const isPastOrToday = dateStr <= todayStr();
    const scheduled = activeHabitsFor(dateStr);
    const log = getLog(dateStr, false);
    const comp = getDayCompletion(dateStr);

    openModal(`
      <div class="modal-top-bar">
        <div class="modal-title disp">${formatDisplayDate(dateStr, "full")}</div>
        <button class="modal-close-btn" id="mDayClose">✕</button>
      </div>
      <div style="font-size:12px;color:var(--text-dim);margin-bottom:12px;">
        ${comp.isFreeze ? "🛡️ A streak freeze was applied to this day." : `${comp.done} of ${comp.total} habits completed (${comp.pct}%).`}
      </div>

      <div style="max-height:260px;overflow-y:auto;margin-bottom:16px;">
        ${scheduled.map((h) => {
          const isDone = isHabitDone(h, log);
          return `
            <div class="habit-card ${isDone ? "done" : ""}" style="padding:10px 12px;margin-bottom:6px;">
              <span style="font-size:18px;">${h.icon}</span>
              <span style="flex:1;font-size:13.5px;font-weight:600;">${escapeHtml(h.name)}</span>
              ${isPastOrToday ? `
                <button class="action-pill-btn btn-toggle-past-habit ${isDone ? "active" : ""}" data-habit="${h.id}">
                  ${isDone ? "✓ Completed" : "Mark Done"}
                </button>
              ` : '<span style="font-size:11px;color:var(--text-faint);">Future</span>'}
            </div>
          `;
        }).join("")}
      </div>

      <div class="form-group">
        <label for="mDayNote">Day Notes / Lessons</label>
        <textarea class="journal-textarea" id="mDayNote" ${isPastOrToday ? "" : "disabled"} placeholder="Notes for this day...">${escapeHtml(log.note || "")}</textarea>
      </div>

      ${isPastOrToday && !comp.isFreeze && state.settings.freezesBanked > 0 ? `
        <button class="btn-large btn-ghost" id="mDayApplyFreeze" style="width:100%;justify-content:center;margin-top:6px;">
          🛡️ Apply Streak Freeze to this Day (${state.settings.freezesBanked} left)
        </button>
      ` : ""}
    `);

    document.getElementById("mDayClose").addEventListener("click", closeModal);

    document.querySelectorAll(".btn-toggle-past-habit").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hid = btn.dataset.habit;
        const l = getLog(dateStr, true);
        l.done[hid] = !l.done[hid];
        saveState();
        playUiClickSound();
        openDayModal(dateStr); // Refresh modal view
        renderToday();
        renderCalendar();
        renderStats();
      });
    });

    const noteEl = document.getElementById("mDayNote");
    if (noteEl && isPastOrToday) {
      noteEl.addEventListener("input", () => {
        const l = getLog(dateStr, true);
        l.note = noteEl.value;
        saveState();
      });
    }

    const freezeBtn = document.getElementById("mDayApplyFreeze");
    if (freezeBtn) {
      freezeBtn.addEventListener("click", () => {
        if (state.settings.freezesBanked <= 0) return;
        state.settings.freezesBanked--;
        state.settings.usedFreezes = state.settings.usedFreezes || [];
        state.settings.usedFreezes.push(dateStr);
        saveState();
        playCompletionChime();
        closeModal();
        renderToday();
        renderCalendar();
        renderStats();
        showToast("Streak Freeze applied successfully! 🛡️");
      });
    }
  }

  function openShortcutsModal() {
    openModal(`
      <div class="modal-top-bar">
        <div class="modal-title disp">Keyboard Shortcuts</div>
        <button class="modal-close-btn" id="mShortcutsClose">✕</button>
      </div>
      <div style="font-size:13px;line-height:1.8;color:var(--text-dim);">
        <p><b style="color:var(--text);">1</b> — Go to Today Hub</p>
        <p><b style="color:var(--text);">2</b> — Go to Focus Mode</p>
        <p><b style="color:var(--text);">3</b> — Go to Progress Center</p>
        <p><b style="color:var(--text);">4</b> — Go to Settings &amp; Studio</p>
        <p><b style="color:var(--text);">Space</b> — Toggle / Pause focus timer</p>
        <p><b style="color:var(--text);">?</b> — Open this Help modal</p>
      </div>
    `);
    document.getElementById("mShortcutsClose").addEventListener("click", closeModal);
  }

  /* ==========================================================================
     SETTINGS, MANAGE & CLOUD SYNC
     ========================================================================== */

  function renderThemeSwatches() {
    const wrap = document.getElementById("themeSwatchesRow");
    if (!wrap) return;
    wrap.innerHTML = THEMES.map((th) => `
      <button class="theme-swatch-btn ${state.settings.theme === th.id ? "selected" : ""}" data-theme="${th.id}" style="background:${th.color};" title="${th.name}">
        ${state.settings.theme === th.id ? "✓" : ""}
      </button>
    `).join("");

    wrap.querySelectorAll(".theme-swatch-btn").forEach((b) => {
      b.addEventListener("click", () => {
        setTheme(b.dataset.theme);
      });
    });
  }

  function setTheme(themeId) {
    state.settings.theme = themeId;
    document.documentElement.setAttribute("data-theme", themeId);
    saveState();
    renderThemeSwatches();
    drawShareCard();
  }

  function renderManageHabits() {
    const wrap = document.getElementById("manageHabitList");
    if (!wrap) return;
    const active = state.habits.filter((h) => !h.archived);

    wrap.innerHTML = active.map((h, i) => `
      <div class="habit-card" style="padding:10px 14px;margin-bottom:8px;">
        <div style="display:flex;flex-direction:column;gap:2px;">
          <button class="stepper-btn btn-move-up" data-idx="${i}" ${i === 0 ? "disabled" : ""} title="Move Up">▲</button>
          <button class="stepper-btn btn-move-down" data-idx="${i}" ${i === active.length - 1 ? "disabled" : ""} title="Move Down">▼</button>
        </div>
        <span style="font-size:20px;">${h.icon}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:600;">${escapeHtml(h.name)}</div>
          <div style="font-size:11px;color:var(--text-dim);">${h.type.toUpperCase()} · ${h.timeOfDay || "Anytime"}</div>
        </div>
        <button class="action-pill-btn btn-edit-habit" data-habit="${h.id}">✏️ Edit</button>
      </div>
    `).join("");

    wrap.querySelectorAll(".btn-edit-habit").forEach((b) => {
      b.addEventListener("click", () => openHabitModal(b.dataset.habit));
    });

    wrap.querySelectorAll(".btn-move-up").forEach((b) => {
      b.addEventListener("click", () => moveHabitOrder(parseInt(b.dataset.idx, 10), -1));
    });

    wrap.querySelectorAll(".btn-move-down").forEach((b) => {
      b.addEventListener("click", () => moveHabitOrder(parseInt(b.dataset.idx, 10), 1));
    });
  }

  function moveHabitOrder(index, direction) {
    const active = state.habits.filter((h) => !h.archived);
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= active.length) return;

    const temp = active[index].order;
    active[index].order = active[targetIdx].order;
    active[targetIdx].order = temp;

    saveState();
    renderManageHabits();
    renderToday();
  }

  // Dual Export: JSON & CSV
  function exportBackupJSON() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `winter-arc-backup-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Full JSON backup downloaded!");
  }

  function exportBackupCSV() {
    let csv = "Date,Habit ID,Habit Name,Status,Target,Unit,Day Notes\n";
    const s = state.settings;
    let d = s.startDate;

    while (d <= todayStr() && d <= s.endDate) {
      const log = getLog(d, false);
      state.habits.forEach((h) => {
        if (!h.archived) {
          const done = isHabitDone(h, log) ? "Completed" : "Incomplete";
          const noteClean = (log.note || "").replace(/"/g, '""');
          csv += `"${d}","${h.id}","${h.name}","${done}","${h.target || 1}","${h.unit || ""}","${noteClean}"\n`;
        }
      });
      d = addDays(d, 1);
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `winter-arc-data-${todayStr()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("CSV exported for Excel / Sheets!");
  }

  function importBackupJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!parsed || typeof parsed !== "object" || !parsed.settings) {
          showToast("Invalid backup structure!");
          return;
        }
        state = sanitizeState(parsed);
        saveStateDirect(state);
        document.documentElement.setAttribute("data-theme", state.settings.theme || "frost");
        renderAll();
        showToast("Backup restored successfully! Welcome back.");
      } catch {
        showToast("Error: File is not valid JSON.");
      }
    };
    reader.readAsText(file);
  }

  // GitHub Gist Synchronization
  function getGistCreds() {
    try {
      return JSON.parse(localStorage.getItem(GIST_CREDS_KEY)) || { token: "", gistId: "" };
    } catch {
      return { token: "", gistId: "" };
    }
  }

  function saveGistCreds(token, gistId) {
    localStorage.setItem(GIST_CREDS_KEY, JSON.stringify({ token, gistId }));
  }

  async function pushToGist() {
    const creds = getGistCreds();
    if (!creds.token) {
      showToast("Please enter your GitHub Token first!");
      return;
    }

    showToast("Pushing to GitHub Gist...");
    try {
      const payload = {
        description: "Winter Arc Pro — Private State Backup",
        public: false,
        files: {
          "winter_arc_state.json": {
            content: JSON.stringify(state, null, 2)
          }
        }
      };

      const url = creds.gistId ? `https://api.github.com/gists/${creds.gistId}` : "https://api.github.com/gists";
      const method = creds.gistId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${creds.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Gist push failed with status " + res.status);
      const data = await res.json();
      if (!creds.gistId && data.id) {
        creds.gistId = data.id;
        saveGistCreds(creds.token, data.id);
        const idInput = document.getElementById("inputGistId");
        if (idInput) idInput.value = data.id;
      }

      showToast("Cloud sync complete! Backup live on Gist.");
      playCompletionChime();
    } catch (err) {
      showToast("Cloud Sync Error: " + err.message);
    }
  }

  async function pullFromGist() {
    const creds = getGistCreds();
    if (!creds.token || !creds.gistId) {
      showToast("Need Token and Gist ID to pull!");
      return;
    }

    showToast("Pulling from GitHub Gist...");
    try {
      const res = await fetch(`https://api.github.com/gists/${creds.gistId}`, {
        headers: {
          Authorization: `Bearer ${creds.token}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (!res.ok) throw new Error("Gist pull failed: " + res.status);
      const data = await res.json();
      const file = data.files && data.files["winter_arc_state.json"];
      if (!file || !file.content) throw new Error("No winter_arc_state.json file in this Gist.");

      const remoteState = JSON.parse(file.content);
      state = sanitizeState(remoteState);
      saveStateDirect(state);
      document.documentElement.setAttribute("data-theme", state.settings.theme || "frost");
      renderAll();
      showToast("Pulled and restored from cloud!");
      playCompletionChime();
    } catch (err) {
      showToast("Cloud Pull Error: " + err.message);
    }
  }

  /* ==========================================================================
     TAB NAVIGATION & ROUTING
     ========================================================================== */

  function switchTab(tabName) {
    let activeTab = tabName;
    if (tabName === "calendar" || tabName === "stats") activeTab = "progress";
    if (tabName === "manage" || tabName === "studio") activeTab = "settings";

    document.querySelectorAll(".view-panel").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".sidebar-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === activeTab));
    document.querySelectorAll(".nav-tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === activeTab));

    const target = document.getElementById(`view-${activeTab}`);
    if (target) target.classList.add("active");

    const scrollArea = document.getElementById("viewsScroll");
    if (scrollArea) scrollArea.scrollTop = 0;

    if (activeTab === "progress") {
      renderCalendar();
      renderStats();
    }
    if (activeTab === "settings") {
      renderThemeSwatches();
      renderManageHabits();
      drawShareCard();
    }
    if (activeTab === "focus") renderFocusSuite();
    if (activeTab === "today") renderToday();
  }

  function renderAll() {
    document.documentElement.setAttribute("data-theme", state.settings.theme || "frost");
    renderTopbar();
    renderToday();
    renderFocusSuite();
    renderCalendar();
    renderStats();
    renderThemeSwatches();
    renderManageHabits();
    drawShareCard();

    const nameInput = document.getElementById("inputArcName");
    const startInput = document.getElementById("inputStartDate");
    const endInput = document.getElementById("inputEndDate");
    if (nameInput) nameInput.value = state.settings.arcName || "WINTER ARC";
    if (startInput) startInput.value = state.settings.startDate;
    if (endInput) endInput.value = state.settings.endDate;

    const creds = getGistCreds();
    const tokenInput = document.getElementById("inputGistToken");
    const idInput = document.getElementById("inputGistId");
    if (tokenInput) tokenInput.value = creds.token || "";
    if (idInput) idInput.value = creds.gistId || "";

    const freezeBankEl = document.getElementById("freezeBankCount");
    if (freezeBankEl) freezeBankEl.textContent = `${state.settings.freezesBanked || 0} freezes`;
  }

  /* ==========================================================================
     INITIALIZATION & EVENT BINDINGS
     ========================================================================== */

  function initEvents() {
    // Navigation (Sidebar & Mobile)
    document.querySelectorAll(".sidebar-btn[data-tab], .nav-tab-btn[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Time of day filters
    document.querySelectorAll("#timeFilterRow .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll("#timeFilterRow .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentTimeFilter = chip.dataset.time;
        renderTodayHabits();
      });
    });

    // Daily Reflection Energy Rating Buttons
    document.querySelectorAll("#energyRatingRow .energy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const level = parseInt(btn.dataset.level, 10);
        const today = todayStr();
        const log = getLog(today, true);
        log.energy = level;
        saveState();
        playUiClickSound();
        renderReflection();
        showToast(`Energy logged: Level ${level} / 5 ⚡`);
      });
    });

    // Daily Reflection Journal Notes & Auto-Save
    const journalTextarea = document.getElementById("todayJournalText");
    let autoSaveTimer = null;
    if (journalTextarea) {
      journalTextarea.addEventListener("input", () => {
        const statusEl = document.getElementById("journalAutoSaveStatus");
        if (statusEl) statusEl.textContent = "Typing...";
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
          const today = todayStr();
          const log = getLog(today, true);
          log.note = journalTextarea.value;
          saveState();
          if (statusEl) {
            statusEl.textContent = "Auto-saved ✓";
            setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 2500);
          }
        }, 800);
      });
    }

    // Daily Reflection Save Button
    document.getElementById("btnSaveReflection")?.addEventListener("click", (e) => {
      e.preventDefault();
      const today = todayStr();
      const log = getLog(today, true);
      const txt = document.getElementById("todayJournalText")?.value || "";
      log.note = txt;
      saveState();
      playCompletionChime();
      const statusEl = document.getElementById("journalAutoSaveStatus");
      if (statusEl) {
        statusEl.textContent = "Saved ✓";
        setTimeout(() => { if (statusEl) statusEl.textContent = ""; }, 3000);
      }
      showToast("Daily reflection saved! 📝");
    });

    // Sound toggle
    const toggleSound = () => {
      state.settings.soundEnabled = !state.settings.soundEnabled;
      saveState();
      renderTopbar();
      showToast(state.settings.soundEnabled ? "Audio FX turned ON" : "Audio FX muted");
    };
    document.getElementById("btnSoundToggle")?.addEventListener("click", toggleSound);
    document.getElementById("btnSidebarSoundToggle")?.addEventListener("click", toggleSound);

    // Help modal
    document.getElementById("btnHelpModal")?.addEventListener("click", openShortcutsModal);
    document.getElementById("btnSidebarHelp")?.addEventListener("click", openShortcutsModal);

    // Focus Timer Controls
    document.getElementById("btnFocusStart")?.addEventListener("click", () => {
      if (isTimerRunning) pauseFocusTimer();
      else startFocusTimer();
    });
    document.getElementById("btnFocusReset")?.addEventListener("click", resetFocusTimer);

    // Quick Nudge Buttons (-5m / +5m) (Mobile & PC safe)
    const btnNudgeMinus = document.getElementById("btnTimerNudgeMinus");
    const btnNudgePlus = document.getElementById("btnTimerNudgePlus");

    if (btnNudgeMinus) {
      btnNudgeMinus.addEventListener("click", (e) => {
        if (e) e.preventDefault();
        nudgeTimer(-300);
      });
    }

    if (btnNudgePlus) {
      btnNudgePlus.addEventListener("click", (e) => {
        if (e) e.preventDefault();
        nudgeTimer(300);
      });
    }

    // Timer Preset Buttons Grid (Responsive & Mobile Touch Safe)
    const presetBtns = document.querySelectorAll("#timerPresetsGrid button");
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e) e.preventDefault();
        presetBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mins = parseInt(btn.dataset.minutes, 10);
        if (mins === 0) {
          isStopwatchMode = true;
          stopwatchSec = 0;
          stopwatchAccumulated = 0;
        } else {
          isStopwatchMode = false;
          timerDurationSec = mins * 60;
          timerRemainingSec = timerDurationSec;
        }
        resetFocusTimer();
      });
    });

    // Ambient Synthesizer Controls
    document.getElementById("btnToggleNoisePlay")?.addEventListener("click", () => {
      if (isAmbientPlaying) stopAmbientSound();
      else startAmbientSound(currentAmbientSound);
    });

    document.querySelectorAll(".sound-btn").forEach((b) => {
      b.addEventListener("click", () => {
        const st = b.dataset.sound;
        if (isAmbientPlaying) startAmbientSound(st);
        else {
          currentAmbientSound = st;
          updateSynthUi();
        }
      });
    });

    document.getElementById("synthVolumeSlider")?.addEventListener("input", (e) => {
      const vol = parseInt(e.target.value, 10) / 100;
      setAmbientVolume(vol);
      const lbl = document.getElementById("synthVolLabel");
      if (lbl) lbl.textContent = `${e.target.value}%`;
    });

    // Add Habit Button
    document.getElementById("btnOpenAddHabit")?.addEventListener("click", () => openHabitModal());

    // Arc Dates Save
    document.getElementById("btnSaveArcDates")?.addEventListener("click", () => {
      const name = document.getElementById("inputArcName").value.trim();
      const start = document.getElementById("inputStartDate").value;
      const end = document.getElementById("inputEndDate").value;
      if (!start || !end || start >= end) {
        showToast("Start date must be strictly before end date!");
        return;
      }
      state.settings.arcName = name || "WINTER ARC";
      state.settings.startDate = start;
      state.settings.endDate = end;
      saveState();
      renderAll();
      showToast("Arc details updated successfully!");
    });

    // Freeze Today
    document.getElementById("btnApplyFreezeToday")?.addEventListener("click", () => {
      const today = todayStr();
      if (state.settings.freezesBanked <= 0) {
        showToast("No streak freezes remaining this month.");
        return;
      }
      state.settings.freezesBanked--;
      state.settings.usedFreezes = state.settings.usedFreezes || [];
      state.settings.usedFreezes.push(today);
      saveState();
      playCompletionChime();
      renderToday();
      renderCalendar();
      renderStats();
      showToast("Streak Freeze applied to today! 🛡️");
    });

    // Share Card Actions
    document.getElementById("btnShareNative")?.addEventListener("click", shareCardNative);
    document.getElementById("btnDownloadCard")?.addEventListener("click", () => {
      const canvas = document.getElementById("shareCanvas");
      if (!canvas) return;
      canvas.toBlob((b) => downloadCanvasBlob(b), "image/png");
    });
    document.getElementById("shareCardRatio")?.addEventListener("change", drawShareCard);
    document.getElementById("shareCardStyle")?.addEventListener("change", drawShareCard);

    // Gist Sync Actions
    document.getElementById("inputGistToken")?.addEventListener("change", (e) => {
      const creds = getGistCreds();
      saveGistCreds(e.target.value.trim(), creds.gistId);
    });
    document.getElementById("inputGistId")?.addEventListener("change", (e) => {
      const creds = getGistCreds();
      saveGistCreds(creds.token, e.target.value.trim());
    });
    document.getElementById("btnGistPush")?.addEventListener("click", pushToGist);
    document.getElementById("btnGistPull")?.addEventListener("click", pullFromGist);

    // Backup & Import
    document.getElementById("btnExportJSON")?.addEventListener("click", exportBackupJSON);
    document.getElementById("btnExportCSV")?.addEventListener("click", exportBackupCSV);
    document.getElementById("btnTriggerImport")?.addEventListener("click", () => {
      document.getElementById("inputImportFile")?.click();
    });
    document.getElementById("inputImportFile")?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        importBackupJSON(e.target.files[0]);
      }
      e.target.value = "";
    });

    // Reset Data
    document.getElementById("btnResetAllData")?.addEventListener("click", () => {
      if (confirm("Are you certain you wish to wipe all habits, logs, and streaks? This cannot be undone.")) {
        state = getInitialState();
        saveStateDirect(state);
        renderAll();
        showToast("All data reset to fresh state.");
      }
    });

    // Global Keyboard Navigation
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;
      if (e.key === "1") switchTab("today");
      if (e.key === "2") switchTab("focus");
      if (e.key === "3") switchTab("progress");
      if (e.key === "4") switchTab("settings");
      if (e.key === "?") openShortcutsModal();
      if (e.code === "Space") {
        e.preventDefault();
        if (isTimerRunning) pauseFocusTimer();
        else startFocusTimer();
      }
    });

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("[SW] Registration error:", err);
      });
    }

    // PWA Install Prompt Handling
    let deferredPrompt = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const installBtn = document.getElementById("btnPwaInstall");
      if (installBtn) {
        installBtn.style.display = "block";
        installBtn.onclick = () => {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.finally(() => {
            deferredPrompt = null;
            installBtn.style.display = "none";
          });
        };
      }
    });
  }

  // Self-booting initialization (Safe against cached DOMContentLoaded race conditions)
  function bootEngine() {
    try {
      renderAll();
      initEvents();
      console.log("[Winter Arc Pro] Engine booted flawlessly.");
    } catch (err) {
      console.error("[Winter Arc Pro] Boot exception:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootEngine);
  } else {
    bootEngine();
  }

})();
