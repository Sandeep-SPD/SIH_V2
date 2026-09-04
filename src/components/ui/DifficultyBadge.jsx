import React from 'react';
import { getDifficulty } from '../../utils/difficulty.js';

export default function DifficultyBadge({ seed }) {
  const level = getDifficulty(seed);
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${level.bg} ${level.text} ${level.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${level.dot}`} />
      {level.label}
    </span>
  );
}