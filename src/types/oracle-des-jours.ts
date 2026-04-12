export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;
export type BaseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type MoonPhase = 'new' | 'waxC' | '1Q' | 'waxG' | 'full' | 'wanG' | '3Q' | 'wanC';

export type HarmonyLevel = 'gold' | 'favorable' | 'neutral' | 'cautious' | 'retreat' | 'withdraw';

export type PlanetKey = 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn';

export type OraclePhase = 'intro' | 'name' | 'birthdate' | 'intention' | 'computing' | 'profile' | 'calendar' | 'day-detail';

export interface DayForecast {
  date: Date;
  dayNumber: number; // day of month
  nj: BaseNumber;
  njBrut: number;
  np: BaseNumber;
  planet: PlanetKey;
  moonPhase: MoonPhase;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  ih: number;
  level: HarmonyLevel;
  isMasterDay: boolean;
  isTripleAlignment: boolean;
  isNumerologicalGate: boolean;
}

export interface NumerologyProfile {
  firstName: string;
  soulNumber: NumerologyNumber; // NA
  lifePath: NumerologyNumber;   // CV
  intention: BaseNumber;        // NI
}

export interface OracleResult {
  profile: NumerologyProfile;
  forecasts: DayForecast[];
  summary: {
    goldDays: number;
    favorableDays: number;
    neutralDays: number;
    cautiousDays: number;
    retreatDays: number;
    withdrawDays: number;
    goldDates: string[];
  };
}
