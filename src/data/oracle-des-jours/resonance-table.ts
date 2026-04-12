import type { NumerologyNumber, BaseNumber } from '../../types/oracle-des-jours';

// Rows: NA/CV (1-9, 11, 22, 33), Columns: NJ/NP (1-9)
const TABLE: Record<number, number[]> = {
  1:  [3, 1, 3, 0, 3, 1, 0, 0, 3],
  2:  [1, 3, 1, 3, 0, 3, 3, 0, 1],
  3:  [3, 1, 3, 0, 3, 3, 0, 0, 3],
  4:  [0, 3, 0, 3, 0, 3, 1, 3, 0],
  5:  [3, 0, 3, 0, 3, 1, 3, 0, 3],
  6:  [1, 3, 3, 3, 1, 3, 0, 1, 3],
  7:  [0, 3, 0, 1, 3, 0, 3, 0, 0],
  8:  [0, 0, 0, 3, 0, 1, 0, 3, 0],
  9:  [3, 1, 3, 0, 3, 3, 0, 0, 3],
  11: [3, 3, 3, 1, 3, 1, 3, 0, 3],
  22: [1, 3, 1, 3, 1, 3, 1, 3, 1],
  33: [3, 3, 3, 3, 1, 3, 1, 1, 3],
};

export function getResonanceScore(row: NumerologyNumber, col: BaseNumber): number {
  const rowData = TABLE[row];
  if (!rowData) return 0;
  return rowData[col - 1] ?? 0;
}
