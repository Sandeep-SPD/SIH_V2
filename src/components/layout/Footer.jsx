import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300 text-xs mt-auto border-t border-navy/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold text-white">SamadhanSetu</span>
              <span className="text-[10px] bg-mint/20 text-mint font-bold px-1.5 py-0.5 rounded">SIH 2024-25</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Problem Statement ID 26043 — Transforming citizen grievance redressal into actionable academic R&D,
              industrial CSR-funded technology deployment, and data-driven district governance in Jharkhand.
            </p>
            <p className="text-[11px] text-slate-500">
              Department of Higher, Technical Education & Skill Development, Govt. of Jharkhand, Ranchi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Platform Roles</h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><Link to="/login" className="hover:text-mint transition-colors">Citizen Grievance & Tracking</Link></li>
              <li><Link to="/login" className="hover:text-mint transition-colors">University R&D Workspace</Link></li>
              <li><Link to="/login" className="hover:text-mint transition-colors">Industry CSR & Funding Portal</Link></li>
              <li><Link to="/login" className="hover:text-mint transition-colors">State Governance & Tender Alerts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Key Highlights</h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Simplified 3-Core Nav per Role</li>
              <li>• 24 Districts Interactive Heatmap</li>
              <li>• Field Verification & Mentorship Loop</li>
              <li>• Clustered Systemic Tender Engine</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>© 2025 SamadhanSetu Prototype. Developed for Smart India Hackathon.</div>
          <div className="flex items-center gap-4">
            <span>Built with Vite + React + Tailwind CSS</span>
            <span className="text-mint font-semibold">Zero Real Backend (In-Memory Context)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
