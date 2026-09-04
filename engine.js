/**
 * engine.js — Logic Layer for Winter Arc Pro
 * Resilient Habit Framework — Pure Mathematical Behavioral Engine
 * GitHub Pages Compliant (Zero Backend Dependency)
 */

(function (window) {
  'use strict';

  /**
   * Evaluates if a day log counts as a Core Success.
   * Rule: All core non-negotiables must be completed. Missing even one fails the core day.
   * @param {Object} dayLog { core: boolean[], bonus: boolean[] }
   * @param {number} totalCore Total expected core habits (max 3)
   * @returns {boolean}
   */
  function isCoreDaySuccess(dayLog, totalCore = 3) {
    if (!dayLog || !dayLog.core || !Array.isArray(dayLog.core)) return false;
    if (dayLog.core.length < totalCore) return false;
    for (let i = 0; i < totalCore; i++) {
      if (!dayLog.core[i]) return false;
    }
    return true;
  }

  /**
   * Helper to compute YYYY-MM-DD offset from a base date string
   * @param {string} baseDateStr 'YYYY-MM-DD'
   * @param {number} offsetDays Positive to subtract days into the past
   */
  function getDateWithOffset(baseDateStr, offsetDays) {
    const parts = baseDateStr.split('-');
    const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    d.setDate(d.getDate() - offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /**
   * Mathematical Model 1: The 30-Day Consistency Score
   * Calculates the percentage of days out of the last rolling 30 days where the user completed all Core habits.
   * The dashboard goal is to keep this above 85%.
   * 
   * @param {Object} logs Dictionary of dates
   * @param {string} todayStr 'YYYY-MM-DD'
   * @param {number} totalCore Number of core habits (default 3)
   * @param {number} windowSize Rolling window in days (default 30)
   * @returns {Object} { score: number, successfulDays: number, totalDays: number, goalMet: boolean }
   */
  function calculateConsistencyScore(logs, todayStr, totalCore = 3, windowSize = 30) {
    if (!logs || typeof logs !== 'object') logs = {};
    if (!todayStr) todayStr = (window.StorageService && window.StorageService.getTodayStr()) || '2026-09-04';

    let successfulDays = 0;

    for (let i = 0; i < windowSize; i++) {
      const dateKey = getDateWithOffset(todayStr, i);
      const dayLog = logs[dateKey];
      if (isCoreDaySuccess(dayLog, totalCore)) {
        successfulDays++;
      }
    }

    const score = windowSize > 0 ? Math.round((successfulDays / windowSize) * 100) : 0;

    return {
      score,
      successfulDays,
      totalDays: windowSize,
      goalMet: score >= 85
    };
  }

  /**
   * Mathematical Model 2: The "Never Miss Twice" Resilient Streak
   * A streak does NOT reset to 0 on a single missed day.
   * If Day 1 is hit, and Day 2 is missed, the streak is "Paused" (Warning state).
   * If Day 3 is hit, the streak continues.
   * If Day 3 is missed, the streak resets to 0.
   * 
   * @param {Object} logs Dictionary of dates
   * @param {string} todayStr 'YYYY-MM-DD'
   * @param {number} totalCore Number of core habits (default 3)
   * @returns {Object} { count: number, status: 'active'|'paused'|'broken', todayHit: boolean, message: string }
   */
  function calculateResilientStreak(logs, todayStr, totalCore = 3) {
    if (!logs || typeof logs !== 'object') logs = {};
    if (!todayStr) todayStr = (window.StorageService && window.StorageService.getTodayStr()) || '2026-09-04';

    const isHitAtOffset = (offset) => {
      const dateKey = getDateWithOffset(todayStr, offset);
      return isCoreDaySuccess(logs[dateKey], totalCore);
    };

    const todayHit = isHitAtOffset(0);
    const yesterdayHit = isHitAtOffset(1);
    const dayBeforeHit = isHitAtOffset(2);

    let count = 0;
    let status = 'active'; // 'active' (Emerald), 'paused' (Yellow), 'broken' (Gray/0)
    let message = '';

    if (todayHit) {
      // Today is complete!
      count = 1;
      status = 'active';
      let offset = 1;
      let consecutiveMisses = 0;

      while (offset <= 365) {
        if (isHitAtOffset(offset)) {
          count++;
          consecutiveMisses = 0;
          offset++;
        } else {
          consecutiveMisses++;
          if (consecutiveMisses >= 2) {
            // Two consecutive misses break the streak
            break;
          }
          // Single miss allowed by Never-Miss-Twice rule
          offset++;
        }
      }

      message = `${count} Day Resilient Streak Active`;
    } else {
      // Today is still in progress (not completed yet)
      if (yesterdayHit) {
        // Yesterday was hit, so streak is active and pending today's action
        status = 'active';
        let offset = 1;
        let consecutiveMisses = 0;

        while (offset <= 365) {
          if (isHitAtOffset(offset)) {
            count++;
            consecutiveMisses = 0;
            offset++;
          } else {
            consecutiveMisses++;
            if (consecutiveMisses >= 2) {
              break;
            }
            offset++;
          }
        }

        message = count > 0 ? `${count} Day Streak • Complete today to advance` : 'Start your streak today!';
      } else {
        // Yesterday was missed!
        if (dayBeforeHit) {
          // Single miss yesterday: Streak is PAUSED under Never Miss Twice!
          status = 'paused';
          let offset = 2;
          let consecutiveMisses = 0;

          while (offset <= 365) {
            if (isHitAtOffset(offset)) {
              count++;
              consecutiveMisses = 0;
              offset++;
            } else {
              consecutiveMisses++;
              if (consecutiveMisses >= 2) {
                break;
              }
              offset++;
            }
          }

          message = 'Streak Paused (Missed 1 Day) • Never Miss Twice Rule Active!';
        } else {
          // Two consecutive misses in the past: streak has reset to 0
          status = 'broken';
          count = 0;
          message = 'Streak Reset • Complete today to start a new streak';
        }
      }
    }

    return {
      count,
      status, // 'active' | 'paused' | 'broken'
      todayHit,
      message
    };
  }

  /**
   * Tracks Bonus Quests completion separately without penalizing the Core score
   * @param {Object} logs
   * @param {string} todayStr
   */
  function getBonusSummary(logs, todayStr, totalBonus = 3) {
    if (!logs || typeof logs !== 'object') logs = {};
    const dayLog = logs[todayStr] || { bonus: [] };
    let todayDone = 0;
    if (Array.isArray(dayLog.bonus)) {
      todayDone = dayLog.bonus.filter(Boolean).length;
    }
    return {
      todayDone,
      totalBonus,
      allDone: todayDone >= totalBonus && totalBonus > 0
    };
  }

  const EngineService = {
    isCoreDaySuccess,
    calculateConsistencyScore,
    calculateResilientStreak,
    getBonusSummary,
    getDateWithOffset
  };

  window.EngineService = EngineService;
})(window);
