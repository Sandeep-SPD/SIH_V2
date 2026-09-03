import React from 'react';

export default function MultiSelectTags({ label, options, selected, onChange }) {
  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <button
              type="button"
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-teal text-white border-teal shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isSelected ? '✓ ' : '+ '}{option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
