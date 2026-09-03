import React from 'react';

export default function StatusPill({ status }) {
  let styleClasses = 'bg-slate-100 text-slate-700 border-slate-300';

  switch (status) {
    case 'Submitted':
      styleClasses = 'bg-amber-50 text-amber-800 border-amber-300';
      break;
    case 'University Assigned':
      styleClasses = 'bg-blue-50 text-blue-800 border-blue-200';
      break;
    case 'In Progress':
      styleClasses = 'bg-teal-50 text-teal-800 border-teal-300';
      break;
    case 'Field Verified':
      styleClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      break;
    case 'Completed':
      styleClasses = 'bg-mint/20 text-emerald-900 border-mint/40 font-semibold';
      break;
    default:
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap ${styleClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
      {status}
    </span>
  );
}
