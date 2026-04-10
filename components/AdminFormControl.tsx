'use client';

import React from 'react';
import { Minus, Plus, Image as ImageIcon, Link as LinkIcon, Type, AlignLeft } from 'lucide-react';

interface AdminFormControlProps {
  label: string;
  value: any;
  onChange: (newValue: any) => void;
  depth?: number;
  excludeFields?: string[];
}

export const AdminFormControl: React.FC<AdminFormControlProps> = ({ 
  label, 
  value, 
  onChange, 
  depth = 0,
  excludeFields = []
}) => {
  const isUrl = (str: any) => typeof str === 'string' && (str.startsWith('http') || str.startsWith('/'));
  const isLongText = (str: any) => typeof str === 'string' && str.length > 60;

  // Render Objects (Recursive)
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return (
      <div className={`space-y-4 ${depth > 0 ? 'mt-4 border-l-2 border-purple-100 pl-6' : ''}`}>
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{label}</h4>
        <div className="grid gap-6">
          {Object.entries(value)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, val]) => (
            <AdminFormControl
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').trim()} // CamelCase to Title Case
              value={val}
              onChange={(newVal) => onChange({ ...value, [key]: newVal })}
              depth={depth + 1}
              excludeFields={excludeFields}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render Arrays (Recursive)
  if (Array.isArray(value)) {
    // Detect string-URL image arrays
    const isImageArray = value.length > 0 && value.every(v => typeof v === 'string' && (v.startsWith('http') || v.startsWith('/')));
    // Detect object-based image arrays e.g. {src, flag} from WhatsApp results
    const isObjectImageArray = value.length > 0 && value.every(v => typeof v === 'object' && v !== null && ('src' in v || 'image' in v || 'flag' in v));

    return (
      <div className={`space-y-4 ${depth > 0 ? 'mt-4 border-l-2 border-purple-200 pl-6' : ''}`}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-purple-700 uppercase tracking-wider">{label}</h4>
          <button
            onClick={() => {
              let template: any = '';
              if (isObjectImageArray && value.length > 0) {
                // Clone the structure of the first item, clearing string values
                const first = value[0];
                template = Object.fromEntries(
                  Object.keys(first).map(k => [
                    k,
                    k === 'flag' ? 'https://flagcdn.com/w80/in.png' : (typeof first[k] === 'string' ? '' : first[k])
                  ])
                );
              } else if (isObjectImageArray || label.toLowerCase().includes('image')) {
                template = { src: '', flag: 'https://flagcdn.com/w80/in.png' };
              } else if (isImageArray) {
                template = '';
              } else {
                template = typeof value[0] === 'object' ? {} : '';
              }
              onChange([...value, template]);
            }}
            className="flex items-center gap-1 rounded bg-purple-100 px-2 py-1 text-[10px] font-bold text-purple-600 hover:bg-purple-200 transition-colors"
          >
            <Plus size={12} /> ADD ITEM
          </button>
        </div>

        {/* Image Grid Preview for string-URL image arrays */}
        {isImageArray && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {value.map((url: string, index: number) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-purple-100 bg-slate-50 aspect-[16/10] shadow-sm">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
                    Image {index + 1}
                  </span>
                </div>
                <button
                  onClick={() => onChange(value.filter((_: any, i: number) => i !== index))}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <Minus size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Image + Flag Grid Preview for object-image arrays like WhatsApp results */}
        {isObjectImageArray && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {value.map((item: any, index: number) => {
              const imgSrc = item.src || item.image || '';
              const flagSrc = item.flag || '';
              return (
                <div key={index} className="relative group rounded-xl overflow-hidden border border-purple-100 bg-slate-50 aspect-[3/4] shadow-sm">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`Image ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={28} />
                    </div>
                  )}
                  {flagSrc && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-md z-10">
                      <img src={flagSrc} alt="flag" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => onChange(value.filter((_: any, i: number) => i !== index))}
                    className="absolute top-2 left-2 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  >
                    <Minus size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="space-y-4">
          {value.map((val: any, index: number) => (
            <div key={index} className="group relative flex items-start gap-4 pr-10">
              <div className="flex-1">
                {isImageArray ? (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <ImageIcon size={12} />
                      Image {index + 1} URL
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const newArr = [...value];
                          newArr[index] = e.target.value;
                          onChange(newArr);
                        }}
                        placeholder="Enter image URL..."
                        className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5"
                      />
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 shadow-inner">
                        <img src={val} alt="Preview" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <AdminFormControl
                    label={`Item ${index + 1}`}
                    value={val}
                    onChange={(newVal) => {
                      const newArr = [...value];
                      newArr[index] = newVal;
                      onChange(newArr);
                    }}
                    depth={depth + 1}
                  />
                )}
              </div>
              {!isImageArray && !isObjectImageArray && (
                <button
                  onClick={() => onChange(value.filter((_: any, i: number) => i !== index))}
                  className="absolute right-0 top-8 rounded-full p-1 text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Basic Inputs (Base Case)
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        {isUrl(value) ? <LinkIcon size={12} /> : isLongText(value) ? <AlignLeft size={12} /> : <Type size={12} />}
        {label}
      </label>
      
      {isLongText(value) ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 min-h-[100px]"
        />
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5"
          />
          {isUrl(value) && (
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 shadow-inner group relative">
               <img 
                 src={value} 
                 alt="Preview" 
                 className="h-full w-full object-cover transition-transform group-hover:scale-150" 
                 onError={(e) => (e.currentTarget.style.display = 'none')}
               />
               {!value && <ImageIcon size={20} className="m-auto text-slate-200" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
