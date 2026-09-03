import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import KpiTile from '../../components/ui/KpiTile.jsx';
import {
  GraduationCap, CheckCircle2, Clock, Award, TrendingUp, Handshake, ArrowRight, Building2, Flame
} from 'lucide-react';

export default function UniversityDashboard() {
  const { currentUser, complaints, interests } = useAuth();
  const navigate = useNavigate();

  // University details (fallback to NIT Jamshedpur)
  const uni = currentUser?.role === 'university' ? currentUser : {
    name: 'National Institute of Technology (NIT) Jamshedpur',
    shortName: 'NIT Jamshedpur',
    rank: 1,
    points: 840,
    outcomes: { patents: 3, papers: 8, startups: 2 }
  };

  // Projects of this university
  const myProjects = complaints.filter(
    c => c.assignedUniversityName?.includes(uni.shortName) || c.assignedUniversityId === uni.id
  );

  const ongoingProjects = myProjects.filter(c => c.status === 'In Progress' || c.status === 'University Assigned' || c.status === 'Field Verified');
  const completedProjects = myProjects.filter(c => c.status === 'Completed');

  // Industry interests in this university's projects
  const myInterests = interests.filter(item =>
    myProjects.some(p => p.id === item.projectId)
  );

  // Recent activity: gather all milestones & timeline notes across my projects
  const recentMilestones = myProjects.flatMap(p =>
    (p.milestones || []).map(m => ({
      projectTitle: p.title,
      projectId: p.id,
      date: m.date,
      text: m.text
    }))
  ).slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy via-navy to-teal rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-mint/20 text-mint text-xs font-bold uppercase tracking-wider">
              Academic Innovation Hub
            </span>
            <span className="text-slate-300 text-xs">
              State Leaderboard Rank #{uni.rank || 1}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            {uni.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200">
            Assigned applied research grievances under the Jharkhand R&D Framework. Converting grassroots pain points into patents, papers, and startups.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/university/all-problems"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-mint text-navy hover:bg-white transition-colors shadow-xs text-center"
          >
            Browse Available Problems
          </Link>
          <Link
            to="/university/selected"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors text-center"
          >
            My Workspace ({myProjects.length})
          </Link>
        </div>
      </div>

      {/* KPI Tiles Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiTile
          title="Assigned Projects"
          value={myProjects.length}
          subtitle="Accepted from citizens"
          icon={GraduationCap}
          color="navy"
        />
        <KpiTile
          title="Ongoing Projects"
          value={ongoingProjects.length}
          subtitle="Active in engineering labs"
          icon={Clock}
          color="teal"
        />
        <KpiTile
          title="Completed"
          value={completedProjects.length}
          subtitle="Field deployed & verified"
          icon={CheckCircle2}
          color="mint"
        />
        <KpiTile
          title="Reputation Score"
          value={`${uni.points || 840} pts`}
          subtitle="Governed by citizen rating"
          icon={TrendingUp}
          color="amber"
          trend="+100 pts per verified project"
        />
        <KpiTile
          title="State Rank"
          value={`#${uni.rank || 1}`}
          subtitle="Across 12 JH institutions"
          icon={Award}
          color="teal"
        />
      </div>

      {/* Main 2-Column Content: Recent Activity & Industry Interest Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Milestone Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-heading font-bold text-navy text-base">
                Recent Project Milestones
              </h3>
              <p className="text-xs text-slate-500">
                Live field progress submitted by your research fellows
              </p>
            </div>
            <Link
              to="/university/selected"
              className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
            >
              Go to Workspace &rarr;
            </Link>
          </div>

          {recentMilestones.length > 0 ? (
            <div className="space-y-3">
              {recentMilestones.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/university/workspace/${m.projectId}`)}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 hover:border-teal/30 cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-navy truncate">
                      {m.projectTitle}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono shrink-0">
                      {m.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No milestones logged yet. Accept a problem to start milestone tracking.
            </div>
          )}
        </div>

        {/* Industry Interest Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 text-amber">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-navy text-base">
                  Industry Interest
                </h3>
                <span className="text-xs text-slate-500">CSR & Funding Watching</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-center space-y-1">
              <div className="text-3xl font-extrabold font-heading text-amber">
                {myInterests.length || 3}
              </div>
              <p className="text-xs font-semibold text-navy">
                Corporate Partners Watching Your Projects
              </p>
              <p className="text-[11px] text-slate-500">
                Tata Steel, BCCL Dhanbad, and UCIL express active interest in sponsoring deployment.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Innovation Patents:</span>
                <span className="font-bold text-navy">{uni.outcomes?.patents || 3} Filed</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Research Papers:</span>
                <span className="font-bold text-navy">{uni.outcomes?.papers || 8} Published</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Startups Incubated:</span>
                <span className="font-bold text-navy">{uni.outcomes?.startups || 2} Formed</span>
              </div>
            </div>
          </div>

          <Link
            to="/university/industry-collab"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal hover:bg-navy transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>View Industry Collaboration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
