import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import FileUploadInput from '../../components/forms/FileUploadInput.jsx';
import ComplaintCard from '../../components/ui/ComplaintCard.jsx';
import { DOMAIN_CATEGORIES } from '../../data/jharkhandDistrics.js';
import { PlusCircle, ListFilter, Sparkles, MapPin, CheckCircle2, AlertCircle, Phone, User } from 'lucide-react';

export default function PostProblem() {
  const { currentUser, addComplaint, complaints, districts } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sub-tab: 'new' | 'my'
  const [view, setView] = useState(searchParams.get('tab') === 'new' ? 'new' : 'my');
  const [successMessage, setSuccessMessage] = useState(null);

  // Form State
  const [submitterType, setSubmitterType] = useState('Citizen');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Water');
  const [district, setDistrict] = useState(currentUser?.district || 'East Singhbhum (Jamshedpur)');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '9835124501');
  const [photoUrl, setPhotoUrl] = useState(null);

  // Auto AI suggestion hint based on title
  const getAiSuggestion = () => {
    const text = (title + ' ' + description).toLowerCase();
    if (text.includes('water') || text.includes('well') || text.includes('drinking') || text.includes('arsenic') || text.includes('drain')) return 'Water';
    if (text.includes('health') || text.includes('cough') || text.includes('pulmonary') || text.includes('hospital') || text.includes('smoke')) return 'Healthcare';
    if (text.includes('crop') || text.includes('farm') || text.includes('cold storage') || text.includes('lac') || text.includes('paddy')) return 'Agriculture';
    if (text.includes('school') || text.includes('education') || text.includes('student') || text.includes('teacher')) return 'Education';
    if (text.includes('solar') || text.includes('power') || text.includes('hydro') || text.includes('electricity')) return 'Energy';
    if (text.includes('road') || text.includes('pothole') || text.includes('traffic') || text.includes('garbage')) return 'Urban Development';
    return 'Water';
  };

  const aiDomainHint = getAiSuggestion();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const created = addComplaint({
      title,
      description,
      submitterType,
      domain,
      district,
      location,
      phone,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80'
    });

    setSuccessMessage(`Grievance #${created.id} registered successfully! Dispatched to Jharkhand University R&D matcher.`);
    setTitle('');
    setDescription('');
    setLocation('');
    setPhotoUrl(null);
    setView('my');

    setTimeout(() => {
      setSuccessMessage(null);
    }, 6000);
  };

  // Filter complaints logged by this citizen or default demonstration citizen
  const myComplaints = complaints.filter(c => {
    if (currentUser?.phone) {
      return c.phone === currentUser.phone || c.submitterName?.toLowerCase().includes('pooja') || c.id === 'CMP-JH-2025-001';
    }
    return true; // show demo complaints
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
            Citizen Grievance & Research Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Logged in as <span className="font-semibold text-navy">{currentUser?.name || 'Citizen'}</span> (+91 {currentUser?.phone || '9835124501'})
          </p>
        </div>

        {/* Sub-tabs: New Complaint / My Complaints */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setView('new')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              view === 'new'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-teal" />
            New Complaint Form
          </button>
          <button
            onClick={() => setView('my')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              view === 'my'
                ? 'bg-white text-navy shadow-xs font-bold'
                : 'text-slate-600 hover:text-navy'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 text-teal" />
            My Complaints ({myComplaints.length})
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Submission Confirmed: </span>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* VIEW 1: New Complaint Form */}
      {view === 'new' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-heading font-bold text-navy text-lg">
                Submit Local Community Problem
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Provide rich details, exact locality, and optional photos. Jharkhand university engineering labs will review genuine problems for active research.
              </p>
            </div>

            {/* Submitter Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Submitter Representation
                </label>
                <select
                  value={submitterType}
                  onChange={(e) => setSubmitterType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal font-medium"
                >
                  <option value="Citizen">Individual Citizen</option>
                  <option value="Community Organization">Community Organization / NGO</option>
                  <option value="Panchayat or ULB">Panchayat / Gram Pradhan / ULB</option>
                  <option value="Government Department">Government Department / Field Officer</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Contact Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Problem Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Problem Title (Short & Descriptive)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Extreme Arsenic Contamination in Dahigora Primary School Borewell"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            {/* Domain Category with AI Hint */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">
                  Domain Category
                </label>
                {title.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setDomain(aiDomainHint)}
                    className="text-[11px] text-teal font-semibold flex items-center gap-1 bg-teal/10 hover:bg-teal/20 px-2 py-0.5 rounded transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-teal" />
                    AI Suggested: {aiDomainHint} (Click to apply)
                  </button>
                )}
              </div>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal font-medium"
              >
                {DOMAIN_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Problem Description */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Detailed Problem Statement & Impact
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the root issue, how long it has persisted, who is affected (number of households, schools, farms), and what failed in previous standard remedies."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal leading-relaxed"
                required
              />
            </div>

            {/* Geotag & Location Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Jharkhand District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                >
                  {districts.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Specific Town / Panchayat / Landmark Address
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-teal absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Moubhandar Panchayat, Ghatshila Block"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Photo / Evidence Upload */}
            <FileUploadInput
              label="Site Photo / Verification Evidence"
              onFileSelect={(dataUrl) => setPhotoUrl(dataUrl)}
            />

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setView('my')}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-amber hover:bg-amber/90 rounded-xl transition-all shadow-xs"
              >
                Submit Grievance to Research Pipeline
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: My Complaints List */}
      {view === 'my' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-heading text-navy">
              Active Grievances Tracked by You
            </h2>
            <button
              onClick={() => setView('new')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:text-navy bg-teal/10 hover:bg-teal/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post Another Problem
            </button>
          </div>

          {myComplaints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myComplaints.map(complaint => (
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
              <h3 className="font-heading font-bold text-navy text-base">No grievances logged yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submit a new local problem from your village or ward to mobilize engineering research teams.
              </p>
              <button
                onClick={() => setView('new')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal px-4 py-2 rounded-xl"
              >
                <PlusCircle className="w-4 h-4" /> Create First Complaint
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
