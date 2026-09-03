import React from 'react';

export default function DomainTag({ domain, size = 'sm' }) {
  const colorMap = {
    Water: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    Healthcare: 'bg-rose-50 text-rose-800 border-rose-200',
    Agriculture: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Education: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    Environment: 'bg-teal-50 text-teal-800 border-teal-200',
    Energy: 'bg-amber-50 text-amber-800 border-amber-200',
    'Urban Development': 'bg-slate-100 text-slate-800 border-slate-300',
    Accessibility: 'bg-purple-50 text-purple-800 border-purple-200',
    'Public Administration': 'bg-blue-50 text-blue-800 border-blue-200',
    'Rural Livelihoods': 'bg-orange-50 text-orange-800 border-orange-200'
  };

  const style = colorMap[domain] || 'bg-slate-50 text-slate-700 border-slate-200';
  const sizeClass = size === 'xs' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-medium rounded-md border whitespace-nowrap ${style} ${sizeClass}`}>
      {domain}
    </span>
  );
}
