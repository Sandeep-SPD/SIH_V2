import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Modal from '../../components/ui/Modal.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import {
  DollarSign, Rocket, Award, Handshake, MapPin, Building2, CheckCircle2, ArrowRight, Sparkles, Send
} from 'lucide-react';

export default function BrowseProblems() {
  const { complaints, expressInterest, currentUser } = useAuth();
  const navigate = useNavigate();

  // Filter tab: 'funding' | 'deployment' | 'mentorship'
  const [activeTab, setActiveTab] = useState('funding');

  // Modal State for Express Interest
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [interestType, setInterestType] = useState('Funding');
  const [interestNote, setInterestNote] = useState('');
  const [successToast, setSuccessToast] = useState(null);

  // Filter complaints according to tab
  const filteredProjects = useMemo(() => {
    return complaints.filter(c => {
      if (activeTab === 'funding') return c.needsFunding === true;
      if (activeTab === 'deployment') return c.readyForDeployment === true;
      if (activeTab === 'mentorship') return c.status === 'In Progress' || c.status === 'University Assigned';
      return true;
    });
  }, [complaints, activeTab]);

  const handleOpenInterestModal = (project, defaultType = 'Funding') => {
    setSelectedProject(project);
    setInterestType(defaultType);
    setShowModal(true);
  };

  const handleConfirmInterest = (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    expressInterest({
      projectId: selectedProject.id,
      industryId: currentUser?.id || 'tata-steel',
      industryName: currentUser?.name || 'Tata Steel CSR',
      type: interestType,
      note: interestNote || `Interested in co-sponsoring ${selectedProject.title} under corporate social responsibility.`
    });

    setShowModal(false);
    setInterestNote('');
    setSuccessToast(`Expression of Interest logged for ${selectedProject.title}! The university research lead has been notified.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            Browse University Innovations & Prototypes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover vetted campus engineering solutions to deploy in Jharkhand or sponsor via CSR capital.
          </p>
        </div>

        {/* 3 Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('funding')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'funding'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber" />
            Needs Funding
          </button>

          <button
            onClick={() => setActiveTab('deployment')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'deployment'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-emerald-600" />
            Ready for Deployment
          </button>

          <button
            onClick={() => setActiveTab('mentorship')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'mentorship'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-teal" />
            Open to Mentorship
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <DomainTag domain={project.domain} />
                  <StatusPill status={project.status} />
                </div>
                <span className="text-xs font-mono text-slate-400">{project.id}</span>
              </div>

              <h3
                onClick={() => navigate(`/industry/project/${project.id}`)}
                className="font-heading font-bold text-navy text-base hover:text-teal cursor-pointer transition-colors leading-snug"
              >
                {project.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* University Card Info */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                <Building2 className="w-4 h-4 text-teal shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-navy">{project.assignedUniversityName || 'University Lab'}</span>
                  {project.facultyMentor && (
                    <span className="text-slate-500 text-[11px] block truncate">
                      Lead: {project.facultyMentor}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {project.needsFunding && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    <DollarSign className="w-3 h-3 text-amber" /> Seeking CSR Grant
                  </span>
                )}
                {project.readyForDeployment && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                    <Rocket className="w-3 h-3 text-emerald-600" /> Pilot Ready
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => navigate(`/industry/project/${project.id}`)}
                className="text-xs font-semibold text-slate-600 hover:text-navy"
              >
                View Full Dossier &rarr;
              </button>

              <button
                onClick={() => handleOpenInterestModal(project, activeTab === 'mentorship' ? 'Mentorship' : 'Funding')}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Handshake className="w-3.5 h-3.5" />
                Express Interest
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Express Interest Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Express Corporate Interest in Campus Innovation"
        subtitle={selectedProject?.title}
      >
        <form onSubmit={handleConfirmInterest} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 uppercase tracking-wide text-[10px] font-bold">Research Institution:</span>
            <p className="font-bold text-navy text-xs">{selectedProject?.assignedUniversityName}</p>
            <p className="text-slate-600 text-xs">Location: {selectedProject?.location || selectedProject?.district}</p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Type of Corporate Collaboration</label>
            <select
              value={interestType}
              onChange={(e) => setInterestType(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
            >
              <option value="Funding">CSR Grant Capital (Funding)</option>
              <option value="Deployment">Industrial Pilot & Field Deployment</option>
              <option value="Mentorship">Technical Engineering Mentorship</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Corporate Note / Offer to University</label>
            <textarea
              rows={3}
              value={interestNote}
              onChange={(e) => setInterestNote(e.target.value)}
              placeholder="e.g. Tata Steel Rural Development Society is interested in funding 10 filtration units for Dahigora school cluster..."
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
              className="px-5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Submit Expression of Interest
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
