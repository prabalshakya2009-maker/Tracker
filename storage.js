/**
 * storage.js — Data Layer for Winter Arc Pro
 * Resilient Habit Framework — 100% Client-Side LocalStorage Wrapper
 * GitHub Pages Compliant (Zero Backend Dependency)
 */

(function (window) {
  'use strict';

  const STORAGE_KEYS = {
    LOGS: 'winter_arc_logs_v4',
    HABITS: 'winter_arc_habits_config_v4',
    LEGACY_V1: 'winterArcData_v1'
  };

  // Default Habit Tiering: 3 Core Non-Negotiables & Bonus Quests
  const DEFAULT_HABITS = {
    core: [
      {
        id: 'core_1',
        title: 'Deep Workout',
        subtitle: '45m resistance training or high-intensity cardio',
        icon: 'fitness'
      },
      {
        id: 'core_2',
        title: 'Deep Study / Work',
        subtitle: '90m monk mode single-tasking, zero distractions',
        icon: 'brain'
      },
      {
        id: 'core_3',
        title: 'Wake Up by 6:00 AM',
        subtitle: 'No snooze, immediate hydrate & cold splash',
        icon: 'alarm'
      }
    ],
    bonus: [
      {
        id: 'bonus_1',
        title: '3 Liters of Water',
        subtitle: 'Optimal daily cellular hydration',
        icon: 'water'
      },
      {
        id: 'bonus_2',
        title: '10 Pages of Reading',
        subtitle: 'Physical book or non-fiction article',
        icon: 'book'
      },
      {
        id: 'bonus_3',
        title: 'Clean Nutrition',
        subtitle: 'Zero processed sugar, high protein baseline',
        icon: 'nutrition'
      }
    ]
  };

  // Memory fallback if localStorage is unavailable
  let memoryStore = {};

  function isLocalStorageAvailable() {
    try {
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('[Storage] localStorage unavailable, using memory fallback.', e);
      return false;
    }
  }

  const hasStorage = isLocalStorageAvailable();

  function rawGet(key) {
    try {
      if (hasStorage) {
        return window.localStorage.getItem(key);
      }
      return memoryStore[key] || null;
    } catch (e) {
      console.error('[Storage] Error reading key:', key, e);
      return null;
    }
  }

  function rawSet(key, value) {
    try {
      if (hasStorage) {
        window.localStorage.setItem(key, value);
      } else {
        memoryStore[key] = value;
      }
      return true;
    } catch (e) {
      console.error('[Storage] Error writing key:', key, e);
      return false;
    }
  }

  /**
   * Format a Date object as YYYY-MM-DD in local time
   */
  function formatDateKey(dateObj = new Date()) {
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Migrate or read legacy check-ins if present to ensure zero data loss
   */
  function tryMigrateLegacy(targetLogs) {
    try {
      const legacyRaw = rawGet(STORAGE_KEYS.LEGACY_V1);
      if (!legacyRaw) return targetLogs;
      const legacy = JSON.parse(legacyRaw);
      if (legacy && typeof legacy.checkIns === 'object') {
        Object.keys(legacy.checkIns).forEach((dateStr) => {
          if (!targetLogs[dateStr]) {
            const legacyDay = legacy.checkIns[dateStr];
            const coreArr = [false, false, false];
            const bonusArr = [false, false, false];

            if (legacy.habits && Array.isArray(legacy.habits)) {
              legacy.habits.slice(0, 3).forEach((h, idx) => {
                if (legacyDay[h.id]) coreArr[idx] = true;
              });
              legacy.habits.slice(3, 6).forEach((h, idx) => {
                if (legacyDay[h.id]) bonusArr[idx] = true;
              });
            }
            targetLogs[dateStr] = { core: coreArr, bonus: bonusArr };
          }
        });
      }
    } catch (err) {
      console.warn('[Storage] Legacy migration check non-critical warning:', err);
    }
    return targetLogs;
  }

  const StorageService = {
    /**
     * Get today's local date string (YYYY-MM-DD)
     */
    getTodayStr() {
      return formatDateKey(new Date());
    },

    formatDateKey(d) {
      return formatDateKey(d);
    },

    /**
     * Format date for UI Header (e.g., "Friday, Sep 4")
     */
    formatDateDisplay(dateStr) {
      if (!dateStr) dateStr = formatDateKey(new Date());
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return d.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
    },

    /**
     * Load all habit configurations (Core + Bonus)
     */
    getHabitsConfig() {
      const raw = rawGet(STORAGE_KEYS.HABITS);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.core) && Array.isArray(parsed.bonus)) {
            // Guarantee at most 3 core non-negotiables
            parsed.core = parsed.core.slice(0, 3);
            return parsed;
          }
        } catch (e) {
          console.error('[Storage] Error parsing habits config:', e);
        }
      }
      // Save default configuration
      this.saveHabitsConfig(DEFAULT_HABITS);
      return DEFAULT_HABITS;
    },

    /**
     * Save habit configuration
     */
    saveHabitsConfig(config) {
      const sanitized = {
        core: (config.core || DEFAULT_HABITS.core).slice(0, 3),
        bonus: (config.bonus || DEFAULT_HABITS.bonus)
      };
      rawSet(STORAGE_KEYS.HABITS, JSON.stringify(sanitized));
      return sanitized;
    },

    /**
     * Load the entire dictionary of dates:
     * Schema: { "2026-09-04": { core: [true, false, true], bonus: [false] } }
     */
    getLogs() {
      const raw = rawGet(STORAGE_KEYS.LOGS);
      let logs = {};
      if (raw) {
        try {
          logs = JSON.parse(raw) || {};
        } catch (e) {
          console.error('[Storage] Error parsing logs JSON:', e);
          logs = {};
        }
      }
      // Non-destructive legacy migration check
      logs = tryMigrateLegacy(logs);
      return logs;
    },

    /**
     * Persist the entire dictionary of dates
     */
    saveLogs(logs) {
      return rawSet(STORAGE_KEYS.LOGS, JSON.stringify(logs || {}));
    },

    /**
     * Get day log for a specific date (or defaults to all false)
     */
    getDayLog(dateStr) {
      const logs = this.getLogs();
      const habits = this.getHabitsConfig();
      const coreCount = habits.core.length;
      const bonusCount = habits.bonus.length;

      const existing = logs[dateStr];
      if (existing && Array.isArray(existing.core)) {
        // Ensure array sizes match current habits length
        const core = [];
        for (let i = 0; i < coreCount; i++) {
          core[i] = Boolean(existing.core[i]);
        }
        const bonus = [];
        for (let j = 0; j < bonusCount; j++) {
          bonus[j] = Boolean(existing.bonus && existing.bonus[j]);
        }
        return { core, bonus };
      }

      return {
        core: new Array(coreCount).fill(false),
        bonus: new Array(bonusCount).fill(false)
      };
    },

    /**
     * Toggle or set status of a specific habit on a specific date
     * @param {string} dateStr 'YYYY-MM-DD'
     * @param {'core'|'bonus'} tier
     * @param {number} index
     * @param {boolean} [completed] If omitted, toggles current value
     */
    setHabitStatus(dateStr, tier, index, completed) {
      const logs = this.getLogs();
      const dayLog = this.getDayLog(dateStr);

      if (tier === 'core') {
        const nextVal = typeof completed === 'boolean' ? completed : !dayLog.core[index];
        dayLog.core[index] = nextVal;
      } else if (tier === 'bonus') {
        const nextVal = typeof completed === 'boolean' ? completed : !dayLog.bonus[index];
        dayLog.bonus[index] = nextVal;
      }

      logs[dateStr] = dayLog;
      this.saveLogs(logs);
      return dayLog;
    }
  };

  window.StorageService = StorageService;
})(window);
