import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Modal from '../../components/ui/Modal.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import {
  AlertTriangle, FileText, CheckCircle2, DollarSign, MapPin, Users, Send, Building2, Landmark, Check
} from 'lucide-react';

export default function SystemicAlerts() {
  const { systemicIssues, issueTender } = useAuth();

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tenderTitle, setTenderTitle] = useState('');
  const [tenderBudget, setTenderBudget] = useState('₹1,50,00,000');
  const [successToast, setSuccessToast] = useState(null);

  const handleOpenTenderModal = (issue) => {
    setSelectedIssue(issue);
    setTenderTitle(`State Public Works Tender: ${issue.title}`);
    setTenderBudget(issue.recommendedTenderBudget || '₹1,50,00,000');
    setShowModal(true);
  };

  const handleConfirmTender = (e) => {
    e.preventDefault();
    if (!selectedIssue) return;

    issueTender(selectedIssue.id, {
      tenderTitle,
      tenderBudget,
      date: new Date().toISOString().split('T')[0]
    });

    setShowModal(false);
    setSuccessToast(`Official State Tender issued for ${selectedIssue.title}! Published to Jharkhand e-Procurement.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            Systemic Cluster Alerts & District Tenders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cross-district grievance clustering. When recurring problems exceed campus scale, issue centralized state public works tenders.
          </p>
        </div>
        <span className="text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {systemicIssues.length} Active Systemic Hotspots
        </span>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Systemic Issues List */}
      <div className="space-y-4">
        {systemicIssues.map(issue => {
          const isTenderIssued = issue.status === 'Tender Issued';

          return (
            <div
              key={issue.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all"
            >
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400">{issue.id}</span>
                  <DomainTag domain={issue.domain} />
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Users className="w-3 h-3 text-amber" />
                    {issue.reportsCount} Aggregated Reports
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                    isTenderIssued
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-navy text-lg">
                  {issue.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {issue.description}
                </p>

                {/* Affected Districts & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                    <span>Districts: </span>
                    <span className="font-semibold text-navy">
                      {issue.affectedDistricts.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-700">
                    <DollarSign className="w-3.5 h-3.5 text-amber shrink-0" />
                    <span>Recommended Budget: </span>
                    <span className="font-bold text-teal font-mono">
                      {issue.recommendedTenderBudget}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end md:self-center">
                {isTenderIssued ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>State Tender Active</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenTenderModal(issue)}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-amber hover:bg-amber/90 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Landmark className="w-4 h-4" />
                    Issue District Tender
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tender Issuance Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Issue State District Public Works Tender"
        subtitle={selectedIssue?.title}
      >
        <form onSubmit={handleConfirmTender} className="space-y-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-slate-500 uppercase tracking-wide text-[10px] font-bold">
              Affected Geographical Scope:
            </span>
            <p className="font-bold text-navy text-xs">
              {selectedIssue?.affectedDistricts?.join(' • ')} ({selectedIssue?.reportsCount} citizen reports)
            </p>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Official Tender Title</label>
            <input
              type="text"
              value={tenderTitle}
              onChange={(e) => setTenderTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Estimated Capital Outlay / Budget</label>
            <input
              type="text"
              value={tenderBudget}
              onChange={(e) => setTenderBudget(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-navy"
              required
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1 text-[11px]">
            <span className="font-bold">Authorizing Official:</span> Principal Secretary, Higher & Technical Education, Govt. of Jharkhand.
            <p className="text-slate-600 mt-0.5">
              Tender document will link the university field verification data and citizen grievance cluster as public tender appendices.
            </p>
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
              className="px-5 py-2 text-xs font-bold text-white bg-amber hover:bg-amber/90 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Confirm & Issue Tender
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
