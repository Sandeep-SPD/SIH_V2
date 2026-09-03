import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import KpiTile from '../../components/ui/KpiTile.jsx';
import {
  Building2, DollarSign, Briefcase, CheckCircle2, Award, Clock, ArrowRight, ShieldCheck, Sparkles, TrendingUp
} from 'lucide-react';

export default function IndustryDashboard() {
  const { currentUser, complaints, requests } = useAuth();

  // Industry profile (defaults to Tata Steel)
  const industry = currentUser?.role === 'industry' ? currentUser : {
    name: 'Tata Steel Limited (CSR Division)',
    shortName: 'Tata Steel CSR',
    totalFundedAmt: 14500000,
    csrBudget: '₹2.50 Cr',
    fundedProjectsCount: 8,
    ongoingCount: 5,
    completedCount: 3,
    mentorshipsCount: 4,
    domainAllocation: [
      { domain: 'Water', amount: '₹65,00,000', count: 4, pct: 45 },
      { domain: 'Healthcare', amount: '₹40,00,000', count: 2, pct: 28 },
      { domain: 'Agriculture', amount: '₹25,00,000', count: 1, pct: 17 },
      { domain: 'Energy', amount: '₹15,00,000', count: 1, pct: 10 }
    ]
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy via-navy to-teal rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-mint/20 text-mint text-xs font-bold uppercase tracking-wider">
              Corporate CSR & Impact Portal
            </span>
            <span className="text-slate-300 text-xs">
              Annual CSR Budget: {industry.csrBudget}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {industry.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200">
            Co-sponsoring academic innovations that solve Jharkhand's toughest industrial, tribal, and rural civic problems under MCA Section 135.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/industry/browse"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber text-white hover:bg-amber/90 transition-colors shadow-xs text-center"
          >
            Browse Projects to Fund
          </Link>
          <Link
            to="/industry/requests"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors text-center"
          >
            Review Requests ({pendingRequests.length} Pending)
          </Link>
        </div>
      </div>

      {/* KPI Tiles Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiTile
          title="Total CSR Disbursed"
          value={`₹${((industry.totalFundedAmt || 14500000) / 10000000).toFixed(2)} Cr`}
          subtitle="Direct to Campus Research"
          icon={DollarSign}
          color="amber"
          trend="100% Tax Deductible (80G)"
        />
        <KpiTile
          title="Projects Sponsored"
          value={industry.fundedProjectsCount || 8}
          subtitle="Applied R&D Initiatives"
          icon={Briefcase}
          color="navy"
        />
        <KpiTile
          title="Ongoing Deployment"
          value={industry.ongoingCount || 5}
          subtitle="Lab & Field Pilot Stage"
          icon={Clock}
          color="teal"
        />
        <KpiTile
          title="Fully Deployed"
          value={industry.completedCount || 3}
          subtitle="Civic solutions active"
          icon={CheckCircle2}
          color="mint"
        />
        <KpiTile
          title="Mentorships Given"
          value={industry.mentorshipsCount || 4}
          subtitle="Corporate engineers paired"
          icon={Award}
          color="teal"
        />
      </div>

      {/* Domain Allocation & Impact Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-navy text-base">
              CSR Grant Capital Allocation by Domain
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of company funding across critical Jharkhand state sectors
            </p>
          </div>
          <Link
            to="/industry/browse"
            className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
          >
            Explore Projects &rarr;
          </Link>
        </div>

        {/* Visual Progress Bars */}
        <div className="space-y-4">
          {(industry.domainAllocation || []).map((item) => (
            <div key={item.domain} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-navy">{item.domain} Innovation</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-medium">{item.count} Projects</span>
                  <span className="font-bold text-teal font-mono">{item.amount}</span>
                  <span className="text-slate-400 w-10 text-right">{item.pct}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.pct}%`,
                    backgroundColor: item.domain === 'Water' ? '#028090' : item.domain === 'Healthcare' ? '#00A896' : '#E07A1F'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom MCA & Government Compliance Stamp */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal shrink-0" />
            <span>Ministry of Corporate Affairs (MCA) Schedule VII Compliant CSR Channel</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Ref: MCA-CSR-JH-2025</span>
        </div>
      </div>
    </div>
  );
}
