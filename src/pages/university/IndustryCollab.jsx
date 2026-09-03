import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Modal from '../../components/ui/Modal.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import {
  Building2, Handshake, DollarSign, Send, CheckCircle2, ShieldCheck, Sparkles, Award, ArrowUpRight
} from 'lucide-react';

export default function IndustryCollab() {
  const { currentUser, complaints, requests, interests, addRequest, industries } = useAuth();

  const uni = currentUser?.role === 'university' ? currentUser : {
    id: 'nit-jsr',
    name: 'National Institute of Technology (NIT) Jamshedpur',
    shortName: 'NIT Jamshedpur',
    departments: ['Civil & Environmental Engineering', 'Mechanical Engineering', 'Metallurgical Engineering', 'Computer Science'],
    facultySpecializations: ['Heavy Metals Water Remediation', 'Blast Furnace Slag Geopolymer', 'Low-cost Rural Filtration'],
    hasIncubationCentre: true,
    isVerified: true
  };

  // Projects of this university
  const myProjects = complaints.filter(
    c => c.assignedUniversityName?.toLowerCase().includes(uni.shortName?.toLowerCase() || 'nit') ||
         c.assignedUniversityId === uni.id
  );

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndustryId, setSelectedIndustryId] = useState(industries[0]?.id || 'tata-steel');
  const [requestType, setRequestType] = useState('Funding');
  const [amountRequested, setAmountRequested] = useState('₹4,50,000');
  const [requestNote, setRequestNote] = useState('');
  const [successToast, setSuccessToast] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    const ind = industries.find(i => i.id === selectedIndustryId);

    addRequest({
      universityId: uni.id,
      universityName: uni.name,
      industryId: ind?.id || 'tata-steel',
      industryName: ind?.name || 'Tata Steel Foundation',
      projectId: selectedProject.id,
      projectTitle: selectedProject.title,
      type: requestType,
      amount: requestType === 'Funding' ? amountRequested : 'Mentorship / Industrial Testing',
      note: requestNote || `Requesting ${requestType.toLowerCase()} to accelerate prototype deployment in Jharkhand.`
    });

    setShowModal(false);
    setRequestNote('');
    setSuccessToast(`CSR Request successfully transmitted to ${ind?.name || 'Industry'}!`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Read-only University Profile Block */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-navy text-white">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-heading text-navy">{uni.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> State Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official R&D Profile for Industry CSR Grants & Incubation Alliances
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-semibold text-slate-500">Technology Incubation:</span>
            <div className="text-sm font-bold text-emerald-700">
              {uni.hasIncubationCentre ? '✓ Active Incubator (MSME / DST Recognized)' : 'Standard Lab'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">
              Engaged Academic Departments:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(uni.departments || ['Environmental Engg', 'Civil', 'Computer Science']).map(d => (
                <span key={d} className="bg-slate-100 text-navy px-2.5 py-1 rounded-lg font-medium">
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">
              Core Faculty Specializations:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(uni.facultySpecializations || ['Arsenic Removal', 'Geopolymer Slag', 'Remote Tele-Health']).map(s => (
                <span key={s} className="bg-teal/10 text-teal px-2.5 py-1 rounded-lg font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Projects with Industry Collaboration Asks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading text-navy">
              Campus Innovation Projects & Industry Sponsorship
            </h2>
            <p className="text-xs text-slate-500">
              Initiate requests for corporate CSR funding or expert industry engineering mentorship.
            </p>
          </div>
        </div>

        {myProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProjects.map(project => {
              // requests already sent for this project
              const sentRequests = requests.filter(r => r.projectId === project.id);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <DomainTag domain={project.domain} />
                      <StatusPill status={project.status} />
                    </div>

                    <h3 className="font-heading font-bold text-navy text-base">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Funding and Deployment status */}
                    <div className="flex items-center gap-2 pt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        project.needsFunding ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {project.needsFunding ? '⚡ Needs CSR Funding' : 'Self-Funded'}
                      </span>
                      {project.readyForDeployment && (
                        <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          🚀 Ready for Deployment
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Existing requests or Send Button */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {sentRequests.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Active Corporate Requests:
                        </span>
                        {sentRequests.map(r => (
                          <div key={r.id} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
                            <div>
                              <span className="font-semibold text-navy">{r.industryName}</span>
                              <span className="text-slate-500 text-[11px] ml-1">({r.type} • {r.amount})</span>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {r.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenModal(project)}
                      className="w-full py-2 px-3 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Request to Industry Partner</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No projects available yet. Accept a problem to enable industry collaboration.
          </div>
        )}
      </div>

      {/* Send Request Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Submit Industry CSR / Mentorship Request"
        subtitle={selectedProject?.title}
      >
        <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Target Industry Partner</label>
            <select
              value={selectedIndustryId}
              onChange={(e) => setSelectedIndustryId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-medium text-navy text-xs"
            >
              {industries.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {ind.name} ({ind.type} • CSR Fund: {ind.csrBudget})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Collaboration Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRequestType('Funding')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold ${
                  requestType === 'Funding'
                    ? 'bg-amber text-white border-amber shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                💵 CSR Grant Funding
              </button>
              <button
                type="button"
                onClick={() => setRequestType('Mentorship')}
                className={`py-2 px-3 rounded-lg border text-xs font-bold ${
                  requestType === 'Mentorship'
                    ? 'bg-teal text-white border-teal shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                🎓 Industrial Mentorship
              </button>
            </div>
          </div>

          {requestType === 'Funding' && (
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Grant Amount Requested</label>
              <input
                type="text"
                value={amountRequested}
                onChange={(e) => setAmountRequested(e.target.value)}
                placeholder="e.g. ₹4,50,000"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-navy"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Proposal Summary & Rationale</label>
            <textarea
              rows={3}
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
              placeholder="Explain how this grant or technical mentorship will help deploy the prototype in Jharkhand villages..."
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
              Send Formal Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
