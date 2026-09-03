import React from 'react';

export default function KpiTile({ title, value, subtitle, icon: Icon, color = 'navy', trend }) {
  const colorSchemes = {
    navy: 'border-l-4 border-l-navy text-navy',
    teal: 'border-l-4 border-l-teal text-teal',
    seafoam: 'border-l-4 border-l-seafoam text-seafoam',
    mint: 'border-l-4 border-l-mint text-emerald-800',
    amber: 'border-l-4 border-l-amber text-amber'
  };

  return (
    <div className={`bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between ${colorSchemes[color] || colorSchemes.navy}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-2">
        <div className="text-2xl sm:text-3xl font-bold font-heading text-navy tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {trend && (
        <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 pt-1 border-t border-slate-100">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
