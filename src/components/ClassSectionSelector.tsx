import React, { useState } from 'react';
import { SPIC_CLASS_STRUCTURE } from '../constants/schoolStructure';
import { ChevronDown, Pencil, Sparkles } from 'lucide-react';

interface ClassSectionSelectorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
  helpText?: string;
}

export const ClassSectionSelector: React.FC<ClassSectionSelectorProps> = ({
  id = 'class-section-input',
  value,
  onChange,
  label = 'Target Class & Section',
  required = true,
  className = '',
  helpText
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold">
          {label} {required && '*'}
        </label>
        <button
          type="button"
          onClick={() => setIsCustomMode(!isCustomMode)}
          className="text-[10px] text-indigo-600 hover:text-indigo-800 font-black flex items-center gap-1 cursor-pointer transition"
        >
          <Pencil className="w-3 h-3" />
          <span>{isCustomMode ? 'Use Quick Dropdown' : 'Edit / Custom Name'}</span>
        </button>
      </div>

      <div className="relative flex items-center gap-2">
        {/* If in custom edit mode or direct typing */}
        {isCustomMode ? (
          <div className="relative w-full">
            <input
              id={id}
              type="text"
              required={required}
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="e.g. 10 A, VI B, XI A-CS, or Custom Section"
              className="w-full border-2 border-indigo-400 bg-indigo-50/30 rounded-xl p-2.5 font-bold text-xs text-slate-900 focus:border-indigo-600 focus:bg-white outline-none transition"
            />
            <div className="absolute right-2 top-2.5 flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-100/80 px-1.5 py-0.5 rounded">
              <span>Custom Text</span>
            </div>
          </div>
        ) : (
          /* Pre-structured dropdown with all VI to X & XI/XII sections */
          <div className="relative w-full">
            <select
              id={id}
              value={value}
              onChange={e => {
                if (e.target.value === '__CUSTOM__') {
                  setIsCustomMode(true);
                } else {
                  onChange(e.target.value);
                }
              }}
              className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none appearance-none pr-8 cursor-pointer"
            >
              {/* If current value is not in standard list, show it as selected custom value */}
              {value && !SPIC_CLASS_STRUCTURE.some(g => g.options.some(o => o.value === value)) && (
                <option value={value}>Custom: {value}</option>
              )}

              {SPIC_CLASS_STRUCTURE.map(group => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}

              <option value="__CUSTOM__">✏️ Other / Custom Class & Section...</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {helpText && (
        <p className="text-[10px] text-slate-400 font-medium">
          {helpText}
        </p>
      )}
    </div>
  );
};
