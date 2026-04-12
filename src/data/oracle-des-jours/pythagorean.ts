import type { NumerologyNumber } from '../../types/oracle-des-jours';

const PYTHAGOREAN_TABLE: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

function stripAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function reduceWithMasters(n: number): NumerologyNumber {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split('').reduce((sum, d) => sum + Number(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n as NumerologyNumber;
}

export function calculateSoulNumber(firstName: string): NumerologyNumber {
  const clean = stripAccents(firstName).toUpperCase().replace(/[^A-Z]/g, '');
  const sum = clean.split('').reduce((acc, letter) => acc + (PYTHAGOREAN_TABLE[letter] || 0), 0);
  return reduceWithMasters(sum);
}
