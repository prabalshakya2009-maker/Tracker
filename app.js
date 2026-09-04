/**
 * app.js — UI Layer for Winter Arc Pro
 * Resilient Habit Framework — DOM Manipulation, Event Listeners & Reactive Updates
 * GitHub Pages Compliant (Zero Backend Dependency)
 */

(function () {
  'use strict';

  // Audio State
  let audioEnabled = true;

  /**
   * Procedural Audio Synthesis via Web Audio API (Zero external assets)
   */
  function playHapticSound(type) {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'all_core_hit') {
        // Glorious Resilient Chord (C5 - E5 - G5 - C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.1, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.38);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.4);
        });
      } else if (type === 'toggle_on') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      }
    } catch (err) {
      // Audio context may be restricted before first touch
    }
  }

  /**
   * SVG Icon Definitions
   */
  function getIconSvg(name, isCore = true) {
    const size = isCore ? 'w-6 h-6' : 'w-4 h-4';
    switch (name) {
      case 'fitness':
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13h2m14 0h2M7 10h10M7 14h10M6 8v8M18 8v8M4 11v2M20 11v2" />
        </svg>`;
      case 'brain':
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>`;
      case 'alarm':
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM5 3L3 5m16-2l2 2" />
        </svg>`;
      case 'water':
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>`;
      case 'book':
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>`;
      case 'nutrition':
      default:
        return `<svg class="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>`;
    }
  }

  /**
   * Lightweight Toast Feedback
   */
  let toastTimer = null;
  function showToast(message, icon = '⚡') {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    const iconEl = document.getElementById('toastIcon');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    if (iconEl) iconEl.textContent = icon;

    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 1800);
  }

  /**
   * Master Render Function
   */
  function renderApp() {
    const todayStr = window.StorageService.getTodayStr();
    const habitsConfig = window.StorageService.getHabitsConfig();
    const logs = window.StorageService.getLogs();
    const todayLog = window.StorageService.getDayLog(todayStr);

    const totalCore = habitsConfig.core.length;
    const totalBonus = habitsConfig.bonus.length;

    // 1. Render Header Date
    const dateEl = document.getElementById('currentDateDisplay');
    if (dateEl) {
      dateEl.textContent = window.StorageService.formatDateDisplay(todayStr);
    }

    // 2. Calculate Mathematical Models via engine.js
    const consistency = window.EngineService.calculateConsistencyScore(logs, todayStr, totalCore, 30);
    const streak = window.EngineService.calculateResilientStreak(logs, todayStr, totalCore);
    const bonusSummary = window.EngineService.getBonusSummary(logs, todayStr, totalBonus);

    // 3. Render 30-Day Consistency Score (Visual Hierarchy 1: Massive Glowing Text)
    const scoreValEl = document.getElementById('consistencyScoreVal');
    const goalBadgeEl = document.getElementById('goalBadge');
    if (scoreValEl) {
      scoreValEl.textContent = `${consistency.score}%`;

      if (consistency.goalMet) {
        scoreValEl.className = 'text-5xl md:text-6xl font-extrabold font-disp tracking-tight text-success drop-shadow-[0_0_24px_rgba(52,211,153,0.5)]';
        if (goalBadgeEl) {
          goalBadgeEl.textContent = 'GOAL MET (85%+)';
          goalBadgeEl.className = 'text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-success/20 text-success border border-success/30';
        }
      } else {
        scoreValEl.className = 'text-5xl md:text-6xl font-extrabold font-disp tracking-tight text-accent drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]';
        if (goalBadgeEl) {
          goalBadgeEl.textContent = 'TARGET: 85%+';
          goalBadgeEl.className = 'text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60';
        }
      }
    }

    // 4. Render Resilient Streak Dot & Indicator
    const streakDotEl = document.getElementById('streakDot');
    const streakTextEl = document.getElementById('streakText');
    const warningBanner = document.getElementById('pausedWarningBanner');

    if (streakDotEl && streakTextEl) {
      if (streak.status === 'paused') {
        // Pulsing Yellow dot on single missed day ("Never Miss Twice")
        streakDotEl.className = 'w-2.5 h-2.5 rounded-full bg-warning shadow-glow-warning animate-ping transition-all duration-300';
        streakTextEl.innerHTML = `<span class="text-warning font-bold">${streak.count} Day Streak (PAUSED)</span> • Hit today to save!`;
        if (warningBanner) warningBanner.classList.remove('hidden');
      } else if (streak.status === 'active') {
        // Emerald dot for active streak
        streakDotEl.className = 'w-2.5 h-2.5 rounded-full bg-success shadow-glow-success transition-all duration-300';
        streakTextEl.textContent = `${streak.count} Day Resilient Streak`;
        if (warningBanner) warningBanner.classList.add('hidden');
      } else {
        // Broken/Reset
        streakDotEl.className = 'w-2.5 h-2.5 rounded-full bg-slate-600';
        streakTextEl.textContent = '0 Day Streak • Complete today to start';
        if (warningBanner) warningBanner.classList.add('hidden');
      }
    }

    // 5. Render Core Badges & Counts
    const coreDoneCount = todayLog.core.filter(Boolean).length;
    const coreBadge = document.getElementById('coreCompletedBadge');
    if (coreBadge) {
      coreBadge.textContent = `${coreDoneCount} / ${totalCore} Done`;
      if (coreDoneCount === totalCore && totalCore > 0) {
        coreBadge.className = 'text-xs font-bold font-disp px-2.5 py-1 rounded-lg bg-success/15 border border-success/40 text-success';
      } else {
        coreBadge.className = 'text-xs font-bold font-disp px-2.5 py-1 rounded-lg bg-cardDark border border-slate-700/60 text-slate-300';
      }
    }

    // 6. Render THE GRIND (Core Non-Negotiables - Visual Hierarchy 2)
    const coreContainer = document.getElementById('coreHabitsContainer');
    if (coreContainer) {
      coreContainer.innerHTML = habitsConfig.core.map((habit, idx) => {
        const isCompleted = Boolean(todayLog.core[idx]);
        const borderClass = isCompleted 
          ? 'border-accent shadow-glow-accent bg-gradient-to-r from-cardDark via-slate-900 to-accent/10 ring-1 ring-accent/40'
          : 'border-slate-800/90 bg-cardDark hover:border-slate-700 hover:bg-cardHover';
        const iconColor = isCompleted ? 'text-accent' : 'text-slate-400';
        const checkClass = isCompleted 
          ? 'bg-accent border-accent text-bgDark check-pop' 
          : 'border-slate-700 bg-slate-900/60 text-transparent';

        return `
          <button 
            type="button" 
            data-tier="core" 
            data-index="${idx}"
            aria-pressed="${isCompleted}"
            class="touch-bounce w-full min-h-[76px] p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${borderClass}">
            
            <div class="flex items-center gap-4">
              <!-- Habit Icon -->
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 ${iconColor} transition-colors">
                ${getIconSvg(habit.icon, true)}
              </div>

              <!-- Habit Title & Subtitle -->
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold font-disp uppercase text-accent/80">#${idx + 1}</span>
                  <h3 class="text-base md:text-lg font-bold tracking-tight text-white">
                    ${habit.title}
                  </h3>
                </div>
                <p class="text-xs text-slate-400 mt-0.5 leading-snug">
                  ${habit.subtitle}
                </p>
              </div>
            </div>

            <!-- Massive Tactile Checkbox Box -->
            <div class="w-8 h-8 md:w-9 md:h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-3 ${checkClass}">
              <svg class="w-5 h-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        `;
      }).join('');
    }

    // 7. Render THE EXTRAS (Bonus Quests - Visual Hierarchy 3)
    const bonusContainer = document.getElementById('bonusHabitsContainer');
    const bonusBadge = document.getElementById('bonusCompletedBadge');
    if (bonusBadge) {
      bonusBadge.textContent = `${bonusSummary.todayDone} / ${totalBonus}`;
    }

    if (bonusContainer) {
      bonusContainer.innerHTML = habitsConfig.bonus.map((habit, idx) => {
        const isCompleted = Boolean(todayLog.bonus[idx]);
        const borderClass = isCompleted
          ? 'border-slate-700 bg-slate-900/90 text-white shadow-sm'
          : 'border-slate-800/80 bg-cardDark/90 hover:border-slate-700/80 text-slate-300';
        const checkClass = isCompleted
          ? 'bg-slate-400 border-slate-400 text-bgDark check-pop'
          : 'border-slate-700 bg-slate-900/40 text-transparent';

        return `
          <button 
            type="button" 
            data-tier="bonus" 
            data-index="${idx}"
            aria-pressed="${isCompleted}"
            class="touch-bounce w-full min-h-[52px] px-4 py-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${borderClass}">
            
            <div class="flex items-center gap-3">
              <div class="p-1.5 rounded-lg bg-slate-900/70 text-slate-400">
                ${getIconSvg(habit.icon, false)}
              </div>
              <div>
                <h4 class="text-xs md:text-sm font-semibold text-slate-200">
                  ${habit.title}
                </h4>
                <p class="text-[10.5px] text-slate-400">
                  ${habit.subtitle}
                </p>
              </div>
            </div>

            <div class="w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-150 flex-shrink-0 ml-2 ${checkClass}">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        `;
      }).join('');
    }

    // 8. Render Rolling 30-Day Progress Bar in Footer
    const rollingCountEl = document.getElementById('rollingDaysCount');
    const progressBarEl = document.getElementById('rollingProgressBar');
    if (rollingCountEl) {
      rollingCountEl.textContent = `${consistency.successfulDays} / ${consistency.totalDays} Days`;
    }
    if (progressBarEl) {
      progressBarEl.style.width = `${consistency.score}%`;
    }

    // Attach Event Listeners to rendered buttons
    attachToggleListeners();
  }

  /**
   * Attach Click/Tap Listeners to Habit Buttons
   */
  function attachToggleListeners() {
    document.querySelectorAll('#coreHabitsContainer button, #bonusHabitsContainer button').forEach((btn) => {
      btn.onclick = function (e) {
        e.preventDefault();
        const tier = this.dataset.tier;
        const index = parseInt(this.dataset.index, 10);
        const todayStr = window.StorageService.getTodayStr();

        const currentLog = window.StorageService.getDayLog(todayStr);
        const wasCompleted = tier === 'core' ? Boolean(currentLog.core[index]) : Boolean(currentLog.bonus[index]);
        const willBeCompleted = !wasCompleted;

        // Update in data layer
        const updatedLog = window.StorageService.setHabitStatus(todayStr, tier, index, willBeCompleted);

        // Check if all 3 core habits are now completed
        const habits = window.StorageService.getHabitsConfig();
        const allCoreHitNow = window.EngineService.isCoreDaySuccess(updatedLog, habits.core.length);

        if (willBeCompleted) {
          if (allCoreHitNow && !wasCompleted) {
            playHapticSound('all_core_hit');
            showToast('Day Secured! All 3 Core Habits Hit 🔥', '👑');
          } else {
            playHapticSound('toggle_on');
            showToast(`${tier === 'core' ? 'Core Habit' : 'Bonus'} Checked ✓`, '⚡');
          }
        } else {
          playHapticSound('toggle_off');
        }

        // Re-render immediately
        renderApp();
      };
    });
  }

  /**
   * Keyboard Shortcuts (1, 2, 3 for Core Habits)
   */
  function initKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = parseInt(e.key, 10) - 1;
        const coreBtns = document.querySelectorAll('#coreHabitsContainer button');
        if (coreBtns[idx]) coreBtns[idx].click();
      }
    });
  }

  /**
   * Audio Feedback Toggle in Footer
   */
  function initAudioToggle() {
    const btn = document.getElementById('btnAudioToggle');
    const icon = document.getElementById('audioIcon');
    const statusText = document.getElementById('audioStatusText');
    if (!btn) return;

    btn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (icon) icon.textContent = audioEnabled ? '🔊' : '🔇';
      if (statusText) statusText.textContent = audioEnabled ? 'Audio On' : 'Muted';
      showToast(audioEnabled ? 'Audio feedback active' : 'Audio muted', '🔊');
    });
  }

  /**
   * PWA Service Worker Registration
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  // Boot Application when DOM is ready
  function boot() {
    initKeyboard();
    initAudioToggle();
    renderApp();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
