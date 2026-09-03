import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ShieldCheck, Check, X, Building2, GraduationCap, MapPin, Mail, Phone, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function VerificationQueue() {
  const { verificationQueue, updateVerificationStatus } = useAuth();
  const [successMsg, setSuccessMsg] = useState(null);

  const handleAction = (id, status, orgName) => {
    updateVerificationStatus(id, status);
    setSuccessMsg(`${orgName} has been ${status.toLowerCase()}ed.`);
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const pendingItems = verificationQueue.filter(item => item.status === 'Pending');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            Institutional Onboarding Verification Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit and approve credentials of new universities and CSR corporate partners before platform authorization.
          </p>
        </div>
        <span className="text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {pendingItems.length} Awaiting Approval
        </span>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Queue Items */}
      <div className="space-y-4">
        {verificationQueue.map(item => {
          const isPending = item.status === 'Pending';
          const isApproved = item.status === 'Approved';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400">{item.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                    item.type === 'University'
                      ? 'bg-teal/10 text-teal border border-teal/20'
                      : 'bg-navy/10 text-navy border border-navy/20'
                  }`}>
                    {item.type === 'University' ? <GraduationCap className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                    {item.type}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    isApproved
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-navy text-base sm:text-lg">
                  {item.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal shrink-0" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {item.contactEmail}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Submitted: {item.submittedDate}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    Doc Ref: {item.docRef}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {isPending ? (
                  <>
                    <button
                      onClick={() => handleAction(item.id, 'Rejected', item.name)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-xl border border-slate-200 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'Approved', item.name)}
                      className="px-5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve Credential
                    </button>
                  </>
                ) : (
                  <div className="text-xs text-slate-400 font-semibold px-3 py-1 bg-slate-50 rounded-lg">
                    {isApproved ? '✓ Authorized in State Registry' : 'Application Rejected'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
