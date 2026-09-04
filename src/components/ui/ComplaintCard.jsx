import React from 'react';
import { MapPin, Calendar, Building2, Users, Flame, Award, DollarSign, Gauge } from 'lucide-react';
import StatusPill from './StatusPill.jsx';
import DomainTag from './DomainTag.jsx';
import VoteButtons from './VoteButtons.jsx';

// --- Difficulty helper (prototype only: deterministic pseudo-random from complaint id) ---
const DIFFICULTY_LEVELS = [
  { label: 'Easy', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  { label: 'Medium', bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  { label: 'Hard', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
];

function getDifficulty(seed) {
  // simple string hash so the same complaint id always gets the same difficulty
  const str = String(seed ?? Math.random());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return DIFFICULTY_LEVELS[hash % DIFFICULTY_LEVELS.length];
}

function DifficultyBadge({ seed }) {
  const level = getDifficulty(seed);
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${level.bg} ${level.text} border ${level.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${level.dot}`} />
      {level.label}
    </span>
  );
}
// --- end difficulty helper ---

export default function ComplaintCard({ complaint, onClick, showActions = false, onAccept, onDecline }) {
  const {
    id,
    title,
    description,
    domain,
    district,
    location,
    status,
    lastUpdateDate,
    assignedUniversityName,
    upvotes,
    downvotes,
    clusterSize,
    priorityScore,
    needsFunding,
    readyForDeployment,
    outcomeTag,
    photoUrl
  } = complaint;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-teal/40 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      <div className="p-4 sm:p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap overflow-clip">
            <DomainTag domain={domain} />
            <StatusPill status={status} />
            <DifficultyBadge seed={id} />
            {outcomeTag && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <Award className="w-3 h-3 text-amber" />
                {outcomeTag}
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-400 shrink-0">{id}</span>
        </div>

        {/* Title and details */}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-navy text-base group-hover:text-teal transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {photoUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img
                src={photoUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Location and Metadata */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500">
          <span className="flex items-center gap-1 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
            <span className="truncate max-w-[200px]">{location || district}</span>
          </span>

          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Updated {lastUpdateDate}</span>
          </span>

          {clusterSize > 1 && (
            <span className="flex items-center gap-1 text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200">
              <Users className="w-3 h-3 text-amber" />
              <span>{clusterSize} similar reports</span>
            </span>
          )}

          {priorityScore && (
            <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-rose-200">
              <Flame className="w-3 h-3 text-rose-500" />
              <span>Priority {priorityScore}/100</span>
            </span>
          )}
        </div>

        {/* University assignment or Funding tags */}
        {(assignedUniversityName || needsFunding || readyForDeployment) && (
          <div className="mt-2.5 flex items-center justify-between gap-2 flex-wrap text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
            {assignedUniversityName ? (
              <span className="flex items-center gap-1.5 text-teal font-medium">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[220px]">{assignedUniversityName}</span>
              </span>
            ) : (
              <span className="text-slate-400 italic text-[11px]">Open for university match</span>
            )}

            <div className="flex items-center gap-1.5">
              {needsFunding && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <DollarSign className="w-3 h-3 text-amber" /> Needs Funding
                </span>
              )}
              {readyForDeployment && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-mint/20 text-emerald-900 border border-mint/40">
                  Ready for Deployment
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Interactive voting or buttons */}
      <div
        className="px-4 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <VoteButtons complaintId={id} upvotes={upvotes} downvotes={downvotes} />

        {showActions ? (
          <div className="flex items-center gap-2">
            {onDecline && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline(complaint);
                }}
                className="px-3 py-1 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-100 hover:text-navy transition-colors"
              >
                Decline
              </button>
            )}
            {onAccept && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept(complaint);
                }}
                className="px-3 py-1 text-xs font-semibold text-white bg-teal hover:bg-navy rounded-md transition-colors shadow-xs"
              >
                Accept Problem
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onClick}
            className="text-xs font-semibold text-teal hover:text-navy transition-colors"
          >
            View Details &rarr;
          </button>
        )}
      </div>
    </div>
  );
}