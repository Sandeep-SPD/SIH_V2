import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function FileUploadInput({ label, onFileSelect, initialPreview = null }) {
  const [preview, setPreview] = useState(initialPreview);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      if (onFileSelect) onFileSelect(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onFileSelect) onFileSelect(null, '');
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-slate-700">{label}</label>}

      {preview ? (
        <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-2 flex items-center gap-3">
          <img
            src={preview}
            alt="Upload preview"
            className="w-16 h-16 object-cover rounded-lg border border-slate-200"
          />
          <div className="flex-1 min-w-0 text-xs">
            <p className="font-semibold text-navy truncate">{fileName || 'Uploaded site photo'}</p>
            <p className="text-emerald-700 flex items-center gap-1 mt-0.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready for verification
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-teal bg-teal/5'
              : 'border-slate-200 hover:border-teal/60 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="p-2.5 rounded-full bg-teal/10 text-teal">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-navy">
              Click to upload geotagged photo / video
            </p>
            <p className="text-[11px] text-slate-500">
              or drag and drop file here (JPG, PNG, MP4 up to 25MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
