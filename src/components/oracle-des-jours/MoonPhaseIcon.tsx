import type { MoonPhase } from '../../types/oracle-des-jours';

const MOON_PATHS: Record<MoonPhase, { d: string; fill: string }> = {
  'new':  { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', fill: 'rgba(158,158,158,0.15)' },
  'waxC': { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16c-2 0-4-3.6-4-8s2-8 4-8z', fill: 'rgba(212,168,83,0.6)' },
  '1Q':   { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2v16a8 8 0 0 0 0-16z', fill: 'rgba(212,168,83,0.7)' },
  'waxG': { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 2.2A8 8 0 0 1 12 4a8 8 0 0 1 0 16 8 8 0 0 1-2-.2c1.5-1.5 2-4.5 2-7.8s-.5-6.3-2-7.8z', fill: 'rgba(212,168,83,0.8)' },
  'full': { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', fill: 'rgba(212,168,83,0.9)' },
  'wanG': { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2 2.2c-1.5 1.5-2 4.5-2 7.8s.5 6.3 2 7.8A8 8 0 0 0 12 4a8 8 0 0 0 2 .2z', fill: 'rgba(212,168,83,0.7)' },
  '3Q':   { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16V4z', fill: 'rgba(212,168,83,0.5)' },
  'wanC': { d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 0 0 16c2 0 4-3.6 4-8s-2-8-4-8z', fill: 'rgba(158,158,158,0.3)' },
};

interface MoonPhaseIconProps {
  phase: MoonPhase;
  size?: number;
}

export default function MoonPhaseIcon({ phase, size = 20 }: MoonPhaseIconProps) {
  const { d, fill } = MOON_PATHS[phase];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="rgba(158,158,158,0.08)" />
      <path d={d} fill={fill} />
    </svg>
  );
}
