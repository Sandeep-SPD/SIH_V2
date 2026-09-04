import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import KpiTile from '../../components/ui/KpiTile.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import {
  Landmark, AlertTriangle, CheckCircle2, Clock, Users, Building2, Award, DollarSign,
  TrendingUp, ArrowRight, ShieldCheck, FileSpreadsheet, Sparkles, ExternalLink
} from 'lucide-react';

export default function GovDashboard() {
  const { complaints, universities, industries, systemicIssues } = useAuth();
  const navigate = useNavigate();

  // Aggregate Metrics
  const totalSubmissions = complaints.length + 184; // mock total historical volume
  const pendingCases = complaints.filter(c => c.status === 'Submitted').length;
  const completedCases = complaints.filter(c => c.status === 'Completed').length;
  const activeProjects = complaints.filter(c => c.status === 'In Progress' || c.status === 'University Assigned' || c.status === 'Field Verified').length;

  const totalPatents = universities.reduce((acc, u) => acc + (u.outcomes?.patents || 0), 0);
  const totalPapers = universities.reduce((acc, u) => acc + (u.outcomes?.papers || 0), 0);
  const totalStartups = universities.reduce((acc, u) => acc + (u.outcomes?.startups || 0), 0);
  const totalInnovations = totalPatents + totalPapers + totalStartups;

  // Domain Distribution
  const domainCounts = [
    { domain: 'Water', count: 48, pct: 36 },
    { domain: 'Healthcare', count: 32, pct: 24 },
    { domain: 'Agriculture', count: 24, pct: 18 },
    { domain: 'Urban Development', count: 16, pct: 12 },
    { domain: 'Energy', count: 14, pct: 10 }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* State Authority Banner */}
      <div className="bg-gradient-to-r from-navy via-navy to-teal rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-mint/20 text-mint text-xs font-bold uppercase tracking-wider">
              State Administrative Console
            </span>
            <span className="text-slate-300 text-xs">
              Department of Higher & Technical Education
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Govt. of Jharkhand R&D & Grievance Oversight
          </h1>

          <p className="text-xs sm:text-sm text-slate-200">
            Real-time state dashboard monitoring citizen complaint conversion, university research outcomes, and CSR co-investment across all 24 districts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/government/systemic-alerts"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber text-white hover:bg-amber/90 transition-colors shadow-xs text-center flex items-center justify-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" /> Systemic Alerts ({systemicIssues.length})
          </Link>
          <Link
            to="/government/verification"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors text-center"
          >
            Verification Queue
          </Link>
        </div>
      </div>

      {/* Primary KPI Tiles Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          title="Total Submissions"
          value={totalSubmissions}
          subtitle="Across 24 Districts"
          icon={Users}
          color="navy"
          trend="+18 this week"
        />
        <KpiTile
          title="Active Projects"
          value={activeProjects}
          subtitle="In University Labs"
          icon={Clock}
          color="teal"
        />
        <KpiTile
          title="Solutions Deployed"
          value={completedCases}
          subtitle="Citizen Verified"
          icon={CheckCircle2}
          color="mint"
        />
        <KpiTile
          title="State Innovations"
          value={totalInnovations}
          subtitle={`${totalPatents} Patents • ${totalPapers} Papers • ${totalStartups} Startups`}
          icon={Award}
          color="amber"
        />
      </div>

      {/* Secondary KPI Bar: Institutional Onboarding */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
        <div>
          <span className="text-slate-500 block">Pending Grievances:</span>
          <span className="text-base font-bold text-rose-700">{pendingCases} Cases</span>
        </div>
        <div>
          <span className="text-slate-500 block">Universities Onboarded:</span>
          <span className="text-base font-bold text-navy">{universities.length} Institutions</span>
        </div>
        <div>
          <span className="text-slate-500 block">Industry Partners:</span>
          <span className="text-base font-bold text-teal">{industries.length} Corporates / PSUs</span>
        </div>
        <div>
          <span className="text-slate-500 block">Total CSR Committed:</span>
          <span className="text-base font-bold text-emerald-700">₹4.85 Crore</span>
        </div>
      </div>

      {/* Systemic Alerts Alert Box (Top 2 Preview) */}
      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber text-white">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-navy text-base">
                Systemic Cluster Alerts Flagged for District Tender
              </h3>
              <p className="text-xs text-slate-600">
                Aggregated grievances indicating widespread infrastructure failures requiring departmental procurement.
              </p>
            </div>
          </div>

          <Link
            to="/government/systemic-alerts"
            className="text-xs font-bold text-amber-900 hover:text-navy flex items-center gap-1"
          >
            <span>Open Tender Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {systemicIssues.slice(0, 2).map(issue => (
            <div key={issue.id} className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                  {issue.reportsCount} Reports Across {issue.affectedDistricts?.length || 0} Districts
                </span>
                <span className="text-xs font-mono font-bold text-teal">{issue.recommendedTenderBudget}</span>
              </div>
              <h4 className="font-bold text-navy text-xs sm:text-sm">{issue.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{issue.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* University Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-amber" />
              Jharkhand Higher Education Innovation Leaderboard
            </h3>
            <p className="text-xs text-slate-500">
              Ranked dynamically by verified citizen problem resolution, patents filed, and research impact.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Updated Daily
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                <th className="py-2.5 px-3 font-semibold">Rank</th>
                <th className="py-2.5 px-3 font-semibold">University / Institution</th>
                <th className="py-2.5 px-3 font-semibold">Ongoing</th>
                <th className="py-2.5 px-3 font-semibold">Completed</th>
                <th className="py-2.5 px-3 font-semibold">Patents</th>
                <th className="py-2.5 px-3 font-semibold">Papers</th>
                <th className="py-2.5 px-3 font-semibold">Startups</th>
                <th className="py-2.5 px-3 font-semibold text-right">Reputation Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {universities.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                      u.rank === 1 ? 'bg-amber text-white' : u.rank === 2 ? 'bg-slate-300 text-slate-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{u.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-navy">{u.name}</span>
                    <span className="text-slate-400 block text-[11px]">{u.district}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-teal">{u.ongoingProjectsCount}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">{u.completedProjectsCount}</td>
                  <td className="py-3 px-3 font-mono">{u.outcomes?.patents || 0}</td>
                  <td className="py-3 px-3 font-mono">{u.outcomes?.papers || 0}</td>
                  <td className="py-3 px-3 font-mono">{u.outcomes?.startups || 0}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-bold text-navy font-mono text-sm bg-slate-100 px-2 py-0.5 rounded">
                      {u.points} pts
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry CSR Investment Overview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-navy text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal" />
              Corporate CSR Co-Investment Registry
            </h3>
            <p className="text-xs text-slate-500">
              Private and Public Sector enterprises co-funding state university engineering solutions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                <th className="py-2.5 px-3 font-semibold">Industry Partner</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Total Disbursed</th>
                <th className="py-2.5 px-3 font-semibold">Active Projects</th>
                <th className="py-2.5 px-3 font-semibold">Preferred Domain Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {industries.map(ind => (
                <tr key={ind.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-bold text-navy">
                    {ind.name}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium">
                      {ind.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-teal font-mono">
                    ₹{((ind.totalFundedAmt || 10000000) / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {ind.fundedProjectsCount} Projects
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1 flex-wrap">
                      {(ind.focusDomains || ['Water', 'Environment']).map(d => (
                        <span key={d} className="bg-teal/10 text-teal px-2 py-0.5 rounded text-[10px] font-semibold">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
