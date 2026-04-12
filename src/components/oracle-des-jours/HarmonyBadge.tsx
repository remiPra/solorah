import type { HarmonyLevel } from '../../types/oracle-des-jours';

const LEVEL_COLORS: Record<HarmonyLevel, { bg: string; text: string; border: string; glow?: string }> = {
  gold:       { bg: 'rgba(212,168,83,0.15)', text: '#d4a853', border: 'rgba(212,168,83,0.5)', glow: '0 0 12px rgba(212,168,83,0.3)' },
  favorable:  { bg: 'rgba(139,195,74,0.12)', text: '#8bc34a', border: 'rgba(139,195,74,0.4)' },
  neutral:    { bg: 'rgba(158,158,158,0.12)', text: '#9e9e9e', border: 'rgba(158,158,158,0.4)' },
  cautious:   { bg: 'rgba(255,152,0,0.12)', text: '#ff9800', border: 'rgba(255,152,0,0.4)' },
  retreat:    { bg: 'rgba(126,87,194,0.12)', text: '#7e57c2', border: 'rgba(126,87,194,0.4)' },
  withdraw:   { bg: 'rgba(183,28,28,0.12)', text: '#b71c1c', border: 'rgba(183,28,28,0.4)' },
};

interface HarmonyBadgeProps {
  level: HarmonyLevel;
  label: string;
  ih?: number;
  compact?: boolean;
}

export default function HarmonyBadge({ level, label, ih, compact }: HarmonyBadgeProps) {
  const c = LEVEL_COLORS[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-[Inter] rounded-sm ${compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'}`}
      style={{
        backgroundColor: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        boxShadow: c.glow,
      }}
    >
      {level === 'gold' && <span>&#10022;</span>}
      {label}
      {ih !== undefined && <span className="opacity-60">({ih})</span>}
    </span>
  );
}

export { LEVEL_COLORS };
