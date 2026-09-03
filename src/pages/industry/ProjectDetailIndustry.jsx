import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import Modal from '../../components/ui/Modal.jsx';
import {
  ArrowLeft, Building2, MapPin, Calendar, DollarSign, Rocket, Handshake, CheckCircle2, Send, ShieldCheck
} from 'lucide-react';

export default function ProjectDetailIndustry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, expressInterest, currentUser } = useAuth();

  const project = complaints.find(c => c.id === id);

  const [showModal, setShowModal] = useState(false);
  const [interestType, setInterestType] = useState('Funding');
  const [interestNote, setInterestNote] = useState('');
  const [successToast, setSuccessToast] = useState(null);

  if (!project) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold font-heading text-navy">Project not found</h2>
        <Link to="/industry/browse" className="text-xs text-teal font-semibold">
          &larr; Back to Browse
        </Link>
      </div>
    );
  }

  const handleConfirmInterest = (e) => {
    e.preventDefault();
    expressInterest({
      projectId: project.id,
      industryId: currentUser?.id || 'tata-steel',
      industryName: currentUser?.name || 'Tata Steel CSR',
      type: interestType,
      note: interestNote || `Interested in co-sponsoring ${project.title}`
    });
    setShowModal(false);
    setSuccessToast('Your Expression of Interest has been dispatched to the university research cell!');
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <DomainTag domain={project.domain} size="md" />
            <StatusPill status={project.status} />
            {project.needsFunding && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                ⚡ Needs CSR Funding
              </span>
            )}
            {project.readyForDeployment && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                🚀 Ready for Field Deployment
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-400">{project.id}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            {project.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-teal" /> {project.location || project.district}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Logged {project.lastUpdateDate}
            </span>
          </div>
        </div>

        {/* Academic Institution Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
          <Building2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-navy text-sm block">
              {project.assignedUniversityName || 'University Lab'}
            </span>
            <p className="text-slate-600">
              Lead Faculty Mentor: {project.facultyMentor || 'Assigned Professor'}
            </p>
            {project.studentTeam && (
              <p className="text-slate-500 text-[11px]">
                Student Researchers: {project.studentTeam.map(s => s.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Problem Description and Photo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Statement & Field Context
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {project.photoUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200 max-h-56">
              <img
                src={project.photoUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Milestones Preview */}
        {project.milestones && project.milestones.length > 0 && (
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campus Research Milestones
            </h3>
            <div className="space-y-2">
              {project.milestones.map((m, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="font-mono text-slate-400 text-[10px]">{m.date}: </span>
                  <span className="text-slate-700">{m.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Express Interest Bar */}
        <div className="border-t border-slate-100 pt-6 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-navy block">Ready to Partner?</span>
            <span className="text-[11px] text-slate-500">Provide CSR funding or engineering mentorship.</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-2"
          >
            <Handshake className="w-4 h-4" /> Express Corporate Interest
          </button>
        </div>
      </div>

      {/* Express Interest Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Express Interest in Campus Innovation"
        subtitle={project.title}
      >
        <form onSubmit={handleConfirmInterest} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Type of Support</label>
            <select
              value={interestType}
              onChange={(e) => setInterestType(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
            >
              <option value="Funding">CSR Grant Capital (Funding)</option>
              <option value="Deployment">Field Deployment / Manufacturing Support</option>
              <option value="Mentorship">Technical Mentorship from Corporate Engineers</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Proposal / Note to Faculty</label>
            <textarea
              rows={3}
              value={interestNote}
              onChange={(e) => setInterestNote(e.target.value)}
              placeholder="Detail your interest, expected grant schedule, or field trial support..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs"
            >
              Submit Expression of Interest
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
