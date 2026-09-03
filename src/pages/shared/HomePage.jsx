import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import JharkhandMap from '../../components/ui/JharkhandMap.jsx';
import ComplaintCard from '../../components/ui/ComplaintCard.jsx';
import { DOMAIN_CATEGORIES } from '../../data/jharkhandDistrics.js';
import { AlertCircle, Search, Filter, PlusCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { complaints, districts, role } = useAuth();
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter complaints based on district, domain, and search
  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesDistrict = !selectedDistrict || c.district.toLowerCase().includes(selectedDistrict.toLowerCase());
      const matchesDomain = selectedDomain === 'All' || c.domain === selectedDomain;
      const matchesSearch = !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDistrict && matchesDomain && matchesSearch;
    });
  }, [complaints, selectedDistrict, selectedDomain, searchQuery]);

  const handleReportProblemClick = () => {
    if (role === 'citizen') {
      navigate('/citizen/complaints');
    } else {
      navigate('/login?role=citizen');
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold border border-teal/20">
            <Sparkles className="w-3.5 h-3.5" />
            Smart India Hackathon 2024–25 | Problem Statement 26043
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-navy tracking-tight leading-tight">
            Bridging Citizen Problems with Campus Research & Industry Capital
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            A unified governance pipeline for the Government of Jharkhand. Real local challenges reported by citizens become funded research projects for top universities and CSR partners.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleReportProblemClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-amber hover:bg-amber/90 transition-all shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Report a Problem
            </button>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-navy bg-white hover:bg-slate-100 border border-slate-300 transition-colors"
            >
              Explore Portals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Subtle background decorative shapes */}
        <div className="absolute right-0 top-0 -bottom-10 w-96 bg-gradient-to-l from-mint/10 to-transparent pointer-events-none rounded-r-3xl" />
      </section>

      {/* Interactive Map Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy">
            Jharkhand District Grievance & Research Map
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Click any district pin to inspect regional problems
          </span>
        </div>

        <JharkhandMap
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
        />
      </section>

      {/* Filter Bar & Problems Feed */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-navy flex items-center gap-2">
              <span>Verified Problems Feed</span>
              <span className="text-xs font-normal bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                {filteredComplaints.length} problems
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live issues submitted by citizens and panchayats across Jharkhand
            </p>
          </div>

          {/* Simple One-Row Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search input */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search issues..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-teal"
              />
            </div>

            {/* Domain Dropdown */}
            <div className="relative">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="text-xs bg-white border border-slate-200 py-1.5 px-3 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal"
              >
                <option value="All">All Domains</option>
                {DOMAIN_CATEGORIES.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div className="relative">
              <select
                value={selectedDistrict || ''}
                onChange={(e) => setSelectedDistrict(e.target.value || null)}
                className="text-xs bg-white border border-slate-200 py-1.5 px-3 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-teal"
              >
                <option value="">All Districts ({districts.length})</option>
                {districts.map(dist => (
                  <option key={dist.id} value={dist.name}>{dist.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feed Cards Grid */}
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredComplaints.map(complaint => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onClick={() => navigate(`/citizen/complaint/${complaint.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-heading font-bold text-navy text-base">No matching problems found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your district or domain filter, or submit a new grievance for this area.
            </p>
            <button
              onClick={() => {
                setSelectedDistrict(null);
                setSelectedDomain('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-teal hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
