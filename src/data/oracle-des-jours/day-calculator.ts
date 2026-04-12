import type {
  BaseNumber, NumerologyNumber, DayForecast, HarmonyLevel,
  NumerologyProfile, OracleResult,
} from '../../types/oracle-des-jours';
import { calculateSoulNumber } from './pythagorean';
import { calculateLifePath } from './life-path';
import { getResonanceScore } from './resonance-table';
import { getMoonPhase, getMoonScore } from './moon-phases';
import { getPlanetForDate } from './planets';

function sumDigits(n: number): number {
  return String(n).split('').reduce((s, d) => s + Number(d), 0);
}

function reduceTo1_9(n: number): BaseNumber {
  while (n > 9) n = sumDigits(n);
  return n as BaseNumber;
}

function getDayNumber(date: Date): { nj: BaseNumber; njBrut: number } {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const dateStr = `${String(d).padStart(2, '0')}${String(m).padStart(2, '0')}${y}`;
  let sum = dateStr.split('').reduce((s, ch) => s + Number(ch), 0);

  // Keep reducing, but track the value before last reduction to detect master numbers
  let njBrut = sum;
  while (sum > 9) {
    njBrut = sum;
    sum = sumDigits(sum);
  }

  return { nj: sum as BaseNumber, njBrut };
}

function classifyIH(ih: number): HarmonyLevel {
  if (ih >= 10) return 'gold';
  if (ih >= 7) return 'favorable';
  if (ih >= 4) return 'neutral';
  if (ih >= 2) return 'cautious';
  if (ih >= 0) return 'retreat';
  return 'withdraw';
}

function isPalindromeDDMM(day: number, month: number): boolean {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const ddmm = dd + mm;
  return ddmm === ddmm.split('').reverse().join('');
}

function isIdenticalDDMM(day: number, month: number): boolean {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  return dd === mm;
}

function calculateDay(
  date: Date,
  na: NumerologyNumber,
  cv: NumerologyNumber,
  ni: BaseNumber,
): DayForecast {
  const { nj, njBrut } = getDayNumber(date);
  const planet = getPlanetForDate(date);
  const moonPhase = getMoonPhase(date);

  // C1: Soul-Day resonance
  const c1 = getResonanceScore(na, nj);

  // C2: LifePath-Planet resonance
  const c2 = getResonanceScore(cv, planet.np);

  // C3: Intention-Day resonance + mirror bonus
  let c3 = getResonanceScore(ni, nj);
  if (ni === nj) c3 += 1;

  // C4: Moon phase score
  const c4 = getMoonScore(moonPhase);

  // C5: Special harmonics
  let c5 = 0;
  const isMasterDay = njBrut === 11 || njBrut === 22 || njBrut === 33;
  if (isMasterDay) c5 += 1;

  const personalNumbers = [na, cv, ni];
  const isTripleAlignment = (
    (personalNumbers[0] === personalNumbers[1]) ||
    (personalNumbers[0] === personalNumbers[2]) ||
    (personalNumbers[1] === personalNumbers[2])
  );
  if (isTripleAlignment) c5 += 1;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const isNumerologicalGate = isPalindromeDDMM(day, month) || isIdenticalDDMM(day, month);
  if (isNumerologicalGate) c5 += 1;

  const ih = c1 + c2 + c3 + c4 + c5;
  const level = classifyIH(ih);

  return {
    date,
    dayNumber: date.getDate(),
    nj,
    njBrut,
    np: planet.np,
    planet: planet.key,
    moonPhase,
    c1, c2, c3, c4, c5,
    ih,
    level,
    isMasterDay,
    isTripleAlignment,
    isNumerologicalGate,
  };
}

export function generateOracleResult(
  firstName: string,
  birthDay: number,
  birthMonth: number,
  birthYear: number,
  intention: BaseNumber,
): OracleResult {
  const soulNumber = calculateSoulNumber(firstName);
  const lifePath = calculateLifePath(birthDay, birthMonth, birthYear);

  const profile: NumerologyProfile = {
    firstName,
    soulNumber,
    lifePath,
    intention,
  };

  const today = new Date();
  const forecasts: DayForecast[] = [];

  for (let i = 1; i <= 30; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    forecasts.push(calculateDay(date, soulNumber, lifePath, intention));
  }

  const summary = {
    goldDays: 0,
    favorableDays: 0,
    neutralDays: 0,
    cautiousDays: 0,
    retreatDays: 0,
    withdrawDays: 0,
    goldDates: [] as string[],
  };

  for (const f of forecasts) {
    switch (f.level) {
      case 'gold': summary.goldDays++; summary.goldDates.push(formatDate(f.date)); break;
      case 'favorable': summary.favorableDays++; break;
      case 'neutral': summary.neutralDays++; break;
      case 'cautious': summary.cautiousDays++; break;
      case 'retreat': summary.retreatDays++; break;
      case 'withdraw': summary.withdrawDays++; break;
    }
  }

  return { profile, forecasts, summary };
}

function formatDate(d: Date): string {
  return `${d.getDate()}/${d.getMonth() + 1}`;
}
