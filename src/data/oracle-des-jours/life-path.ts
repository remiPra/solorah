import type { NumerologyNumber } from '../../types/oracle-des-jours';

function reduceWithMasters(n: number): NumerologyNumber {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split('').reduce((sum, d) => sum + Number(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n as NumerologyNumber;
}

export function calculateLifePath(day: number, month: number, year: number): NumerologyNumber {
  const dateStr = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`;
  const sum = dateStr.split('').reduce((acc, d) => acc + Number(d), 0);
  return reduceWithMasters(sum);
}
