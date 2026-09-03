import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import { MapPin, Calendar, Building2, User, Users, Flame, Check, ArrowLeft, Sparkles } from 'lucide-react';

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, acceptProblem } = useAuth();

  const problem = complaints.find(c => c.id === id);

  const [facultyLead, setFacultyLead] = useState('Dr. S. K. Mahato (Dept of Environmental Engg)');
  const [estWeeks, setEstWeeks] = useState('16');

  if (!problem) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold font-heading text-navy">Problem not found</h2>
        <button onClick={() => navigate('/university/all-problems')} className="text-xs text-teal font-semibold">
          &larr; Back to All Problems
        </button>
      </div>
    );
  }

  const handleAccept = () => {
    acceptProblem(problem.id, {
      facultyMentor: facultyLead,
      studentTeam: [{ name: 'Research Scholar', dept: problem.domain + ' Lab', year: 'Final Year' }]
    });
    navigate(`/university/workspace/${problem.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <DomainTag domain={problem.domain} />
            <StatusPill status={problem.status} />
          </div>
          <span className="text-xs font-mono text-slate-400">{problem.id}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-navy">
            {problem.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-teal" /> {problem.location || problem.district}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Logged {problem.lastUpdateDate}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wide">Citizen Statement:</span>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{problem.description}</p>
        </div>

        {/* Accept Form */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal" />
            Accept Problem for Research Lab
          </h3>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-slate-700">Assign Faculty Mentor</label>
            <input
              type="text"
              value={facultyLead}
              onChange={(e) => setFacultyLead(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-slate-700">Estimated Timeline (Weeks)</label>
            <input
              type="number"
              value={estWeeks}
              onChange={(e) => setEstWeeks(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <button
            onClick={handleAccept}
            className="w-full py-2.5 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Confirm & Open Project Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
