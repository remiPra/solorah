import type { BaseNumber, PlanetKey } from '../../types/oracle-des-jours';

interface PlanetInfo {
  key: PlanetKey;
  np: BaseNumber;
}

// Day of week (0=Sunday) -> Planet
const WEEKDAY_PLANETS: PlanetInfo[] = [
  { key: 'sun',     np: 1 }, // Sunday
  { key: 'moon',    np: 2 }, // Monday
  { key: 'mars',    np: 9 }, // Tuesday
  { key: 'mercury', np: 5 }, // Wednesday
  { key: 'jupiter', np: 3 }, // Thursday
  { key: 'venus',   np: 6 }, // Friday
  { key: 'saturn',  np: 8 }, // Saturday
];

export function getPlanetForDate(date: Date): PlanetInfo {
  return WEEKDAY_PLANETS[date.getDay()];
}
