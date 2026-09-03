import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { MapPin, Info, RefreshCw } from 'lucide-react';

export default function JharkhandMap({ selectedDistrict, onSelectDistrict }) {
  const { districts } = useAuth();
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  // SVG dimensions
  const width = 760;
  const height = 540;

  // Maximum complaints for scaling
  const maxComplaints = Math.max(...districts.map(d => d.openComplaintsCount || 1), 10);

  const getDotRadius = (count) => {
    // scale radius between 7 and 18
    return Math.min(18, Math.max(7, 7 + (count / maxComplaints) * 11));
  };

  const getDotColor = (count, isSelected) => {
    if (isSelected) return '#E07A1F'; // Amber highlight
    if (count >= 7) return '#d97706'; // Dark amber
    if (count >= 5) return '#f59e0b'; // Amber
    if (count >= 3) return '#028090'; // Teal
    return '#00A896'; // Seafoam
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-heading font-bold text-navy text-lg flex items-center gap-2">
            <span>Interactive Heatmap: Jharkhand 24 Districts</span>
            <span className="text-xs font-normal font-body bg-teal/10 text-teal px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Hover over any district to inspect open research problem counts. Click a pin to filter complaints below.
          </p>
        </div>

        {selectedDistrict && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-md border border-teal/20">
              Filtered: {selectedDistrict}
            </span>
            <button
              onClick={() => onSelectDistrict(null)}
              className="text-xs font-semibold text-slate-600 hover:text-navy flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Clear
            </button>
          </div>
        )}
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center justify-center p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[480px] select-none"
        >
          <defs>
            {/* Soft grid pattern */}
            <pattern id="jh-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>

            {/* Glowing filter for selected pin */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E07A1F" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width={width} height={height} fill="url(#jh-grid)" />

          {/* Stylized Jharkhand State Outline Path */}
          <path
            d="M 90,130 
               L 160,150 
               L 260,140 
               L 330,110 
               L 430,120 
               L 520,100 
               L 620,70 
               L 690,50 
               L 700,100 
               L 670,160 
               L 620,180 
               L 570,220 
               L 550,260 
               L 560,340 
               L 560,420 
               L 540,470 
               L 480,480 
               L 420,510 
               L 370,470 
               L 310,480 
               L 230,490 
               L 200,430 
               L 220,360 
               L 200,280 
               L 120,240 
               L 80,180 Z"
            fill="#e0f2fe"
            fillOpacity="0.4"
            stroke="#028090"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="none"
          />

          {/* Internal Plateau Division Contours */}
          <path
            d="M 160,150 Q 300,200 450,170 Q 560,200 620,180"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M 220,360 Q 360,340 480,380 Q 540,430 540,470"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* District connection lines */}
          {districts.map(dist => {
            const isSelected = selectedDistrict && selectedDistrict.toLowerCase().includes(dist.name.toLowerCase());
            return dist.neighbors.map(neighborId => {
              const target = districts.find(d => d.id === neighborId);
              if (!target) return null;
              return (
                <line
                  key={`${dist.id}-${neighborId}`}
                  x1={dist.x}
                  y1={dist.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isSelected ? '#028090' : '#cbd5e1'}
                  strokeWidth={isSelected ? 1.5 : 0.75}
                  strokeOpacity={isSelected ? 0.8 : 0.4}
                />
              );
            });
          })}

          {/* District Interactive Nodes */}
          {districts.map(dist => {
            const count = dist.openComplaintsCount || 0;
            const radius = getDotRadius(count);
            const isSelected = selectedDistrict && selectedDistrict.toLowerCase().includes(dist.name.toLowerCase());
            const isHovered = hoveredDistrict?.id === dist.id;
            const fillColor = getDotColor(count, isSelected);

            return (
              <g
                key={dist.id}
                className="cursor-pointer transition-transform"
                onClick={() => onSelectDistrict(isSelected ? null : dist.name)}
                onMouseEnter={() => setHoveredDistrict(dist)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                {/* Ripple ring for high complaints */}
                {count >= 6 && (
                  <circle
                    cx={dist.x}
                    cy={dist.y}
                    r={radius + 6}
                    fill={fillColor}
                    fillOpacity="0.15"
                    className="animate-pulse"
                  />
                )}

                {/* Main node circle */}
                <circle
                  cx={dist.x}
                  cy={dist.y}
                  r={radius}
                  fill={fillColor}
                  stroke={isSelected ? '#023047' : '#ffffff'}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                  filter={isSelected ? 'url(#glow)' : undefined}
                  className="transition-all duration-200 hover:scale-125"
                />

                {/* Node count text */}
                <text
                  x={dist.x}
                  y={dist.y + 3.5}
                  textAnchor="middle"
                  fontSize={radius > 11 ? '10' : '8.5'}
                  fontWeight="bold"
                  fill="#ffffff"
                  pointerEvents="none"
                >
                  {count}
                </text>

                {/* District Label */}
                <text
                  x={dist.x}
                  y={dist.y + radius + 11}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight={isSelected || isHovered ? 'bold' : '500'}
                  fill={isSelected ? '#E07A1F' : '#023047'}
                  pointerEvents="none"
                  className="transition-colors"
                >
                  {dist.name.replace(' (Jamshedpur)', '').replace(' (Chaibasa)', '')}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredDistrict && (
          <div
            className="absolute pointer-events-none z-20 bg-navy text-white text-xs rounded-xl p-3 shadow-xl border border-slate-700 min-w-[200px]"
            style={{
              left: Math.min(Math.max(16, hoveredDistrict.x - 30), width - 220),
              top: Math.max(16, hoveredDistrict.y - 85)
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1.5 mb-1.5">
              <span className="font-bold font-heading text-sm text-mint">{hoveredDistrict.name}</span>
              <span className="text-[10px] text-slate-300">HQ: {hoveredDistrict.hq}</span>
            </div>
            <div className="flex items-center justify-between text-slate-200 text-xs">
              <span>Open Complaints:</span>
              <span className="font-bold text-amber bg-amber/20 px-2 py-0.5 rounded">
                {hoveredDistrict.openComplaintsCount} cases
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3" /> Click to view and filter problems
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-medium text-slate-700">Cluster Density:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-seafoam"></span> 1-2 low
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal"></span> 3-4 moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span> 5-6 high
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#d97706]"></span> 7+ critical
          </span>
        </div>

        <div className="text-slate-500 text-[11px] italic">
          Showing 24 administrative districts of Jharkhand State
        </div>
      </div>
    </div>
  );
}
