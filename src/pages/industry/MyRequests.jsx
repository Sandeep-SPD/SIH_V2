import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Inbox, Check, X, Building2, DollarSign, Award, Clock, CheckCircle2, AlertCircle, Sparkles
} from 'lucide-react';

export default function MyRequests() {
  const { requests, updateRequestStatus, currentUser } = useAuth();
  const [successMsg, setSuccessMsg] = useState(null);

  const handleApprove = (req) => {
    updateRequestStatus(req.id, 'Approved');
    setSuccessMsg(`Approved request #${req.id} from ${req.universityName}! CSR grant allocated.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const handleDecline = (req) => {
    updateRequestStatus(req.id, 'Declined');
    setSuccessMsg(`Declined request #${req.id}.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            Incoming Academic Collaboration Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Direct requests from university engineering labs seeking CSR grant funding or technical mentorship.
          </p>
        </div>
        <span className="text-xs font-semibold bg-teal/10 text-teal px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {requests.filter(r => r.status === 'Pending').length} Pending Review
        </span>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Requests Feed */}
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map(req => {
            const isPending = req.status === 'Pending';
            const isApproved = req.status === 'Approved';

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-400">{req.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      req.type === 'Funding'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-teal/10 text-teal border border-teal/20'
                    }`}>
                      {req.type === 'Funding' ? '💵 CSR Grant Request' : '🎓 Technical Mentorship'}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'Declined'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                    {req.projectTitle}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-teal shrink-0" />
                    <span className="font-semibold text-navy">{req.universityName}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">Date: {req.date}</span>
                  </div>

                  {/* Amount / Note */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-slate-500">Capital / Support Requested:</span>
                      <span className="font-bold text-teal font-mono">{req.amount}</span>
                    </div>
                    <p className="text-slate-700 italic pt-1">"{req.note}"</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => handleDecline(req)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl border border-slate-200 transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleApprove(req)}
                        className="px-5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve & Disburse
                      </button>
                    </>
                  ) : (
                    <div className="text-xs text-slate-400 font-semibold px-3 py-1 bg-slate-50 rounded-lg">
                      {req.status === 'Approved' ? '✓ Disbursed into Project Account' : 'Action Resolved'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-navy text-base">No incoming requests</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Universities will send formal CSR sponsorship proposals here when their prototypes are verified.
          </p>
        </div>
      )}
    </div>
  );
}
