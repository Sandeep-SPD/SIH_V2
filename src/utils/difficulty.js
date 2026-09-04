// Prototype-only: deterministic pseudo-random difficulty label from an id.
// Same id always returns the same difficulty, so it stays consistent
// across cards, tables, and workspace views without needing a real field yet.

export const DIFFICULTY_LEVELS = [
  { label: 'Moderate', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  { label: 'High', bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  { label: 'Critical', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
];

export function getDifficulty(seed) {
  const str = String(seed ?? Math.random());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return DIFFICULTY_LEVELS[hash % DIFFICULTY_LEVELS.length];
}