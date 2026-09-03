import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import {
  FolderKanban, MapPin, Calendar, Users, ArrowRight, CheckCircle2, AlertCircle, PlusCircle, Handshake, Rocket
} from 'lucide-react';

export default function MySelectedProblems() {
  const { complaints, currentUser } = useAuth();
  const navigate = useNavigate();

  const uniName = currentUser?.shortName || currentUser?.name || 'NIT Jamshedpur';

  // Filter problems assigned to this university
  const myProjects = complaints.filter(
    c => c.assignedUniversityName?.toLowerCase().includes(uniName.toLowerCase()) ||
         c.assignedUniversityId === currentUser?.id ||
         c.status !== 'Submitted'
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            My Selected Problems & Research Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Active applied research and prototype engineering projects assigned to {uniName}.
          </p>
        </div>

        <Link
          to="/university/all-problems"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Pick More Problems
        </Link>
      </div>

      {/* Projects Grid */}
      {myProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProjects.map(project => (
            <div
              key={project.id}
              onClick={() => navigate(`/university/workspace/${project.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-teal/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <DomainTag domain={project.domain} />
                    <StatusPill status={project.status} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{project.id}</span>
                </div>

                <h3 className="font-heading font-bold text-navy text-base group-hover:text-teal transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {project.description}
                </p>

                {/* Badges for Funding and Deployment */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {project.needsFunding && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      <Handshake className="w-3 h-3 text-amber" /> Needs CSR Funding
                    </span>
                  )}
                  {project.readyForDeployment && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                      <Rocket className="w-3 h-3 text-emerald-600" /> Ready for Field Deployment
                    </span>
                  )}
                  {project.isGenuine && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" /> Field Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal" /> {project.district}
                </span>

                <span className="text-teal font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-navy text-base">No active projects assigned yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Review grievances submitted by citizens across Jharkhand and accept them into your laboratory queue.
          </p>
          <Link
            to="/university/all-problems"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal rounded-xl"
          >
            Browse Available Problems
          </Link>
        </div>
      )}
    </div>
  );
}
