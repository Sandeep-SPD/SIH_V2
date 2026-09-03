import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import FileUploadInput from '../../components/forms/FileUploadInput.jsx';
import {
  ArrowLeft, Users, Calendar, MapPin, CheckCircle2, Clock, Upload, Plus, Trash2,
  DollarSign, Rocket, Award, ShieldCheck, Check, AlertTriangle, Send
} from 'lucide-react';

const STATUS_OPTIONS = [
  'Accepted',
  'Field Verification Pending',
  'Field Verified',
  'In Progress',
  'Prototype Ready',
  'Completed'
];

const OUTCOME_OPTIONS = ['None', 'Patent Filed', 'Paper Published', 'Startup Formed'];

export default function ProjectWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, updateComplaint, addMilestone } = useAuth();

  const project = complaints.find(c => c.id === id);

  // Milestone input
  const [newMilestoneText, setNewMilestoneText] = useState('');

  // Student team member input
  const [studentName, setStudentName] = useState('');
  const [studentDept, setStudentDept] = useState('');
  const [studentYear, setStudentYear] = useState('Final Year');

  if (!project) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold font-heading text-navy">Project not found</h2>
        <Link to="/university/selected" className="text-xs text-teal font-semibold">
          &larr; Back to Selected Problems
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateComplaint(project.id, {
      status: newStatus,
      lastUpdateDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleToggleFunding = () => {
    updateComplaint(project.id, { needsFunding: !project.needsFunding });
  };

  const handleToggleDeployment = () => {
    updateComplaint(project.id, { readyForDeployment: !project.readyForDeployment });
  };

  const handleToggleGenuine = (isGenuine) => {
    updateComplaint(project.id, {
      isGenuine: isGenuine,
      status: isGenuine ? 'Field Verified' : 'Declined'
    });
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    addMilestone(project.id, newMilestoneText);
    setNewMilestoneText('');
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    const currentTeam = project.studentTeam || [];
    updateComplaint(project.id, {
      studentTeam: [
        ...currentTeam,
        { name: studentName, dept: studentDept || 'Applied Science', year: studentYear }
      ]
    });
    setStudentName('');
    setStudentDept('');
  };

  const handleRemoveStudent = (idx) => {
    const currentTeam = project.studentTeam || [];
    updateComplaint(project.id, {
      studentTeam: currentTeam.filter((_, i) => i !== idx)
    });
  };

  const handleOutcomeChange = (outcome) => {
    updateComplaint(project.id, { outcomeTag: outcome === 'None' ? null : outcome });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/university/selected')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Selected Problems
        </button>

        <span className="text-xs font-mono text-slate-400">{project.id}</span>
      </div>

      {/* Project Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <DomainTag domain={project.domain} size="md" />
              <StatusPill status={project.status} />
              {project.outcomeTag && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                  {project.outcomeTag}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-navy">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal" /> {project.location || project.district}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Assigned to {project.assignedUniversityName || 'University Lab'}
              </span>
            </div>
          </div>

          {/* Quick Lifecycle Status Dropdown */}
          <div className="space-y-1 self-start md:self-auto min-w-[200px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Current Project Stage
            </label>
            <select
              value={project.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold text-navy bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal"
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Way Toggles for Industry Portal Integration */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Needs Funding Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy">
                <DollarSign className="w-4 h-4 text-amber" />
                <span>Needs CSR / Industry Funding</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Flag project in Industry Portal for grant sponsorship
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleFunding}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                project.needsFunding ? 'bg-amber' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  project.needsFunding ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Ready for Deployment Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy">
                <Rocket className="w-4 h-4 text-emerald-600" />
                <span>Ready for Field Deployment</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Prototype completed, ready for corporate rollout
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleDeployment}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                project.readyForDeployment ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  project.readyForDeployment ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 1: Field Verification & Ground Truth Audit */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal" />
                Field Visit & Ground Truth Verification
              </h3>
              <p className="text-xs text-slate-500">
                Student and faculty on-site verification before committing engineering grant funds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleGenuine(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  project.isGenuine === true
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                ✓ Mark Genuine
              </button>
              <button
                type="button"
                onClick={() => handleToggleGenuine(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  project.isGenuine === false
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                }`}
              >
                ✕ Mark Fake / Unverifiable
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadInput
              label="Upload Site Visit Geo-Tagged Evidence"
              onFileSelect={(dataUrl) => updateComplaint(project.id, { photoUrl: dataUrl })}
              initialPreview={project.photoUrl}
            />

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-navy uppercase tracking-wider text-[10px]">
                Ground Investigation Checklist:
              </span>
              <ul className="space-y-1 text-slate-600 text-xs">
                <li>• Water TDS / Contaminant test sample taken</li>
                <li>• Gram Panchayat Head or Mukhiya verified issue</li>
                <li>• GPS coordinates validated against district cluster</li>
              </ul>
              <div className="pt-2 text-[11px] text-teal font-semibold">
                Status: {project.isGenuine ? 'Verified Genuine on Field' : 'Pending Field Inspection'}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Research Team & Student Fellows */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-teal" />
            Assigned Research Team & Scholars
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Faculty Mentor */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Principal Investigator (Faculty Lead)
              </span>
              <p className="text-sm font-bold text-navy">
                {project.facultyMentor || 'Dr. Amitabh Sen (Associate Professor, Environmental Engg)'}
              </p>
              <p className="text-xs text-slate-500">
                Estimated Prototype Timeline: {project.estimatedWeeks || 16} Weeks
              </p>
            </div>

            {/* Student Fellows List */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Student Team Members ({(project.studentTeam || []).length})
                </span>
              </div>

              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {(project.studentTeam || []).map((member, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200">
                    <div>
                      <span className="font-bold text-navy">{member.name}</span>
                      <span className="text-slate-500 text-[11px] ml-2">({member.dept} • {member.year})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveStudent(i)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Student Row */}
              <form onSubmit={handleAddStudent} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Student name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="flex-1 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Dept (e.g. Civil)"
                  value={studentDept}
                  onChange={(e) => setStudentDept(e.target.value)}
                  className="w-28 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-navy text-white rounded-lg text-xs font-bold hover:bg-teal transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SECTION 3: Milestone Log */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal" />
            Milestone Log & Progress Updates
          </h3>

          <div className="space-y-2">
            {(project.milestones || []).map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-teal mt-1.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{m.date}</span>
                    <span className="font-medium text-slate-500">Milestone #{idx + 1}</span>
                  </div>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddMilestone} className="flex gap-2">
            <input
              type="text"
              value={newMilestoneText}
              onChange={(e) => setNewMilestoneText(e.target.value)}
              placeholder="Log lab or field progress update (e.g. Bench-scale prototype tested, TDS reduced to 12 ppm)..."
              className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" /> Add Update
            </button>
          </form>
        </div>

        {/* SECTION 4: Innovation Outcome Tags (When marked Completed) */}
        {project.status === 'Completed' && (
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber" />
                  Academic Innovation Outcome Tag
                </h3>
                <p className="text-xs text-slate-500">
                  Tags add bonus points to the State University Leaderboard and Government Innovation KPI.
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {OUTCOME_OPTIONS.map(outcome => {
                  const isSelected = (!project.outcomeTag && outcome === 'None') || project.outcomeTag === outcome;
                  return (
                    <button
                      key={outcome}
                      type="button"
                      onClick={() => handleOutcomeChange(outcome)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-amber text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {outcome}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
