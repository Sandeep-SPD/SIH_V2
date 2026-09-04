import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Modal from '../../components/ui/Modal.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import { DOMAIN_CATEGORIES } from '../../data/jharkhandDistrics.js';
import {
  ChevronDown, ChevronRight, Check, X, Users, Flame, MapPin, Building2, Calendar, Sparkles, CheckCircle2
} from 'lucide-react';

// --- Difficulty helper (prototype only: deterministic pseudo-random from complaint id) ---
// NOTE: keep this identical to the version in ComplaintCard.jsx so the same
// problem id always shows the same difficulty everywhere in the app.
const DIFFICULTY_LEVELS = [
  { label: 'Easy', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  { label: 'Medium', bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  { label: 'Hard', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
];

function getDifficulty(seed) {
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
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${level.bg} ${level.text} ${level.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${level.dot}`} />
      {level.label}
    </span>
  );
}
// --- end difficulty helper ---

export default function AllProblems() {
  const { complaints, acceptProblem, currentUser } = useAuth();
  const navigate = useNavigate();

  // Collapsible domain groups state
  const [collapsedDomains, setCollapsedDomains] = useState({});
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [declinedIds, setDeclinedIds] = useState([]);

  // Faculty and initial team state for modal
  const [facultyLead, setFacultyLead] = useState('Dr. Amitabh Sen (Dept of Civil & Environmental Engg)');
  const [estWeeks, setEstWeeks] = useState('16');

  // Filter out already accepted by another uni or declined in session
  const availableProblems = useMemo(() => {
    return complaints.filter(c => !declinedIds.includes(c.id));
  }, [complaints, declinedIds]);

  // Group by domain
  const groupedProblems = useMemo(() => {
    const groups = {};
    DOMAIN_CATEGORIES.forEach(domain => {
      const items = availableProblems.filter(p => p.domain === domain);
      if (items.length > 0) {
        groups[domain] = items;
      }
    });
    return groups;
  }, [availableProblems]);

  const toggleDomain = (domain) => {
    setCollapsedDomains(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const handleOpenAcceptModal = (problem) => {
    setSelectedProblem(problem);
    setShowAcceptModal(true);
  };

  const handleConfirmAccept = () => {
    if (!selectedProblem) return;
    acceptProblem(selectedProblem.id, {
      facultyMentor: facultyLead,
      studentTeam: [
        { name: 'Research Scholar Lead', dept: selectedProblem.domain + ' Applied Lab', year: 'Final Year' }
      ]
    });
    setShowAcceptModal(false);
    navigate(`/university/workspace/${selectedProblem.id}`);
  };

  const handleDecline = (problemId) => {
    setDeclinedIds(prev => [...prev, problemId]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            All Available Problems (Grouped by Domain)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Grievances aggregated across Jharkhand districts. Accept problems to assign your faculty and research teams.
          </p>
        </div>
        <span className="text-xs font-semibold bg-teal/10 text-teal px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {availableProblems.length} Total Matched Cases
        </span>
      </div>

      {/* Grouped Collapsible Domain Sections */}
      <div className="space-y-4">
        {Object.entries(groupedProblems).map(([domain, items]) => {
          const isCollapsed = !!collapsedDomains[domain];
          return (
            <div
              key={domain}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
            >
              {/* Domain Group Header */}
              <button
                type="button"
                onClick={() => toggleDomain(domain)}
                className="w-full px-5 py-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between transition-colors border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <DomainTag domain={domain} size="md" />
                  <span className="font-heading font-bold text-navy text-base">
                    {domain} Domain
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? 'problem' : 'problems'}
                  </span>
                </div>

                <div className="text-slate-400">
                  {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Problem Rows in this Domain */}
              {!isCollapsed && (
                <div className="divide-y divide-slate-100">
                  {items.map(problem => {
                    const isAlreadyAssigned = problem.assignedUniversityId || problem.status !== 'Submitted';
                    return (
                      <div
                        key={problem.id}
                        className="p-5 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                      >
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-slate-400">{problem.id}</span>
                            <StatusPill status={problem.status} />
                            {problem.clusterSize > 1 && (
                              <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold border border-amber-200">
                                <Users className="w-3 h-3 text-amber" />
                                {problem.clusterSize} similar reports
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-bold border border-rose-200">
                              <Flame className="w-3 h-3 text-rose-500" />
                              Priority {problem.priorityScore}/100
                            </span>
                            <DifficultyBadge seed={problem.id} />
                          </div>

                          <h3
                            onClick={() => handleOpenAcceptModal(problem)}
                            className="font-heading font-bold text-navy text-base hover:text-teal transition-colors cursor-pointer"
                          >
                            {problem.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {problem.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-teal" />
                              {problem.location || problem.district}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              Logged {problem.lastUpdateDate}
                            </span>
                          </div>
                        </div>

                        {/* Accept / Decline / View Button controls */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {isAlreadyAssigned ? (
                            <button
                              onClick={() => navigate(`/university/workspace/${problem.id}`)}
                              className="px-3.5 py-1.5 text-xs font-bold text-teal bg-teal/10 hover:bg-teal/20 rounded-xl transition-colors"
                            >
                              Open Workspace &rarr;
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleDecline(problem.id)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl border border-slate-200 transition-colors"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => handleOpenAcceptModal(problem)}
                                className="px-4 py-1.5 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Accept Problem
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Accept Problem & Assign Team Modal */}
      <Modal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        title="Accept Problem for University R&D"
        subtitle={selectedProblem ? `${selectedProblem.id} • ${selectedProblem.domain}` : ''}
      >
        {selectedProblem && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-navy text-sm font-heading">{selectedProblem.title}</h4>
              <p className="text-slate-600 text-xs">{selectedProblem.description}</p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal" /> {selectedProblem.location || selectedProblem.district}
                </span>
                <span className="font-semibold text-rose-700">
                  Priority Score: {selectedProblem.priorityScore}/100
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-100 pt-3">
              <h5 className="font-bold text-navy text-xs uppercase tracking-wide">
                Assign Research Faculty Mentor
              </h5>

              <div className="space-y-1">
                <label className="text-slate-600">Faculty Lead / Principal Investigator</label>
                <input
                  type="text"
                  value={facultyLead}
                  onChange={(e) => setFacultyLead(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600">Estimated Timeline to Prototype (Weeks)</label>
                <input
                  type="number"
                  value={estWeeks}
                  onChange={(e) => setEstWeeks(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                />
              </div>

              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20 text-navy space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-teal">
                  <CheckCircle2 className="w-4 h-4" /> Direct Transition to Project Workspace
                </div>
                <p className="text-[11px] text-slate-600">
                  Accepting will notify the citizen submitter, assign this project to your university account, and initialize the field verification workspace.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAcceptModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                className="px-5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs"
              >
                Confirm & Open Project Workspace
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}