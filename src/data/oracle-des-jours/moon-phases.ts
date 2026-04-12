import type { MoonPhase } from '../../types/oracle-des-jours';

// Reference: New Moon on January 6, 2000 at 18:14 UTC
const REF_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14, 0);
const SYNODIC_PERIOD_DAYS = 29.53058867;
const SYNODIC_PERIOD_MS = SYNODIC_PERIOD_DAYS * 24 * 60 * 60 * 1000;

const PHASES: MoonPhase[] = ['new', 'waxC', '1Q', 'waxG', 'full', 'wanG', '3Q', 'wanC'];

const MOON_SCORES: Record<MoonPhase, number> = {
  'new':  0,
  'waxC': 1,
  '1Q':   1,
  'waxG': 2,
  'full': 2,
  'wanG': 1,
  '3Q':   0,
  'wanC': -1,
};

export function getMoonPhase(date: Date): MoonPhase {
  const dateMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
  const daysSinceRef = (dateMs - REF_NEW_MOON_MS) / SYNODIC_PERIOD_MS;
  const cyclePosition = ((daysSinceRef % 1) + 1) % 1; // 0 to 1
  const phaseIndex = Math.floor(cyclePosition * 8) % 8;
  return PHASES[phaseIndex];
}

export function getMoonScore(phase: MoonPhase): number {
  return MOON_SCORES[phase];
}
