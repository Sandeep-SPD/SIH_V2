import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { User, GraduationCap, Building2, Landmark, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';
  const [activeTab, setActiveTab] = useState(initialRole);

  const { login, universities, industries } = useAuth();
  const navigate = useNavigate();

  // Citizen form state
  const [phone, setPhone] = useState('9835124501');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('2468');

  // University / Industry form state
  const [selectedUniId, setSelectedUniId] = useState('nit-jsr');
  const [selectedIndId, setSelectedIndId] = useState('tata-steel');
  const [orgEmail, setOrgEmail] = useState('director@nitjsr.ac.in');
  const [orgPassword, setOrgPassword] = useState('••••••••');

  // Government form state
  const [govEmail, setGovEmail] = useState('secy.higheredu@jharkhand.gov.in');
  const [govPassword, setGovPassword] = useState('••••••••');

  const handleCitizenSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    // mock any OTP verification
    login('citizen', { phone, name: 'Pooja Soren (Citizen)', district: 'East Singhbhum (Jamshedpur)' });
    navigate('/citizen/complaints');
  };

  const handleUniSubmit = (e) => {
    e.preventDefault();
    login('university', { universityId: selectedUniId });
    navigate('/university/dashboard');
  };

  const handleIndSubmit = (e) => {
    e.preventDefault();
    login('industry', { industryId: selectedIndId });
    navigate('/industry/dashboard');
  };

  const handleGovSubmit = (e) => {
    e.preventDefault();
    login('government');
    navigate('/government/dashboard');
  };

  // Quick 1-click demo access for judges
  const quickDemoLogin = (targetRole, extra = {}) => {
    login(targetRole, extra);
    if (targetRole === 'citizen') navigate('/citizen/complaints');
    if (targetRole === 'university') navigate('/university/dashboard');
    if (targetRole === 'industry') navigate('/industry/dashboard');
    if (targetRole === 'government') navigate('/government/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold">
          <Sparkles className="w-3 h-3" />
          Role-Based Access Control
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
          Select Your Portal to Sign In
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Access the specialized portal for citizens, research universities, CSR industry partners, or government officials.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('citizen')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'citizen'
              ? 'bg-white text-navy shadow-xs font-bold'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <User className="w-4 h-4 text-teal" />
          <span>Citizen</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('university')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'university'
              ? 'bg-white text-navy shadow-xs font-bold'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-teal" />
          <span>University</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('industry')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'industry'
              ? 'bg-white text-navy shadow-xs font-bold'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <Building2 className="w-4 h-4 text-teal" />
          <span>Industry</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('government')}
          className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
            activeTab === 'government'
              ? 'bg-white text-navy shadow-xs font-bold'
              : 'text-slate-600 hover:text-navy'
          }`}
        >
          <Landmark className="w-4 h-4 text-teal" />
          <span>Govt</span>
        </button>
      </div>

      {/* Card Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Citizen Form */}
        {activeTab === 'citizen' && (
          <form onSubmit={handleCitizenSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-heading font-bold text-navy text-lg">Citizen Login via Mobile OTP</h2>
              <p className="text-xs text-slate-500">
                Log local civic grievances and track student research solutions in real-time.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Mobile Number (10 Digits)</label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded-lg">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone"
                  className="flex-1 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                  required
                />
              </div>
            </div>

            {otpSent && (
              <div className="space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">Enter 4-digit OTP</label>
                  <span className="text-emerald-700 font-medium">Mock OTP: 2468</span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="2468"
                  className="w-full px-3 py-2 text-center tracking-widest text-lg font-mono font-bold bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal hover:bg-navy transition-colors shadow-xs"
            >
              {otpSent ? 'Verify OTP & Enter Citizen Portal' : 'Send One-Time Password (OTP)'}
            </button>
          </form>
        )}

        {/* University Form */}
        {activeTab === 'university' && (
          <form onSubmit={handleUniSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-heading font-bold text-navy text-lg">University Research Cell Sign In</h2>
              <p className="text-xs text-slate-500">
                Browse matched local problems, assign faculty and student teams, and apply for CSR grants.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Select Academic Institution</label>
              <select
                value={selectedUniId}
                onChange={(e) => setSelectedUniId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal font-medium text-navy"
              >
                {universities.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} (Rank #{u.rank})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Official Faculty / Dean Email</label>
              <input
                type="email"
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <input
                type="password"
                value={orgPassword}
                onChange={(e) => setOrgPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber shrink-0 mt-0.5" />
              <span>
                Note: New academic signups are verified by the State Higher Education Department before grant clearance.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-navy hover:bg-teal transition-colors shadow-xs"
            >
              Sign In to University Workspace
            </button>
          </form>
        )}

        {/* Industry Form */}
        {activeTab === 'industry' && (
          <form onSubmit={handleIndSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-heading font-bold text-navy text-lg">Industry Partner & CSR Sign In</h2>
              <p className="text-xs text-slate-500">
                Browse university prototypes ready for deployment and fund high-impact grassroots innovations.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Select Corporate / PSU Partner</label>
              <select
                value={selectedIndId}
                onChange={(e) => setSelectedIndId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal font-medium text-navy"
              >
                {industries.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">CSR Officer Work Email</label>
              <input
                type="email"
                defaultValue="csr.head@tatasteel.com"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber shrink-0 mt-0.5" />
              <span>
                Note: Industry CSR accounts undergo MCA Form CSR-1 verification in the Government queue.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-navy hover:bg-teal transition-colors shadow-xs"
            >
              Sign In to Industry CSR Dashboard
            </button>
          </form>
        )}

        {/* Government Form */}
        {activeTab === 'government' && (
          <form onSubmit={handleGovSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-heading font-bold text-navy text-lg">Govt of Jharkhand Oversight Sign In</h2>
              <p className="text-xs text-slate-500">
                Department of Higher, Technical Education & Skill Development administrative console.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Official Government Email (@jharkhand.gov.in)</label>
              <input
                type="email"
                value={govEmail}
                onChange={(e) => setGovEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Official Password</label>
              <input
                type="password"
                value={govPassword}
                onChange={(e) => setGovPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                required
              />
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber shrink-0" />
              <span>Authorized State Secretarial Access with tender issuance authority.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-navy hover:bg-teal transition-colors shadow-xs"
            >
              Sign In to Government Console
            </button>
          </form>
        )}
      </div>

      {/* 1-Click Judge Quick Launch Box */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            ⚡ 1-Click Instant Demo Launch (Judge Fast-Track)
          </span>
          <span className="text-[10px] text-teal font-semibold">No typing required</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => quickDemoLogin('citizen')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-left transition-all group"
          >
            <div className="text-[11px] font-bold text-navy group-hover:text-teal">1. Citizen</div>
            <div className="text-[10px] text-slate-500">Grievance & Review</div>
          </button>

          <button
            onClick={() => quickDemoLogin('university', { universityId: 'nit-jsr' })}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-left transition-all group"
          >
            <div className="text-[11px] font-bold text-navy group-hover:text-teal">2. University</div>
            <div className="text-[10px] text-slate-500">NIT Jamshedpur R&D</div>
          </button>

          <button
            onClick={() => quickDemoLogin('industry', { industryId: 'tata-steel' })}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-left transition-all group"
          >
            <div className="text-[11px] font-bold text-navy group-hover:text-teal">3. Industry</div>
            <div className="text-[10px] text-slate-500">Tata Steel CSR</div>
          </button>

          <button
            onClick={() => quickDemoLogin('government')}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal hover:bg-teal/5 text-left transition-all group"
          >
            <div className="text-[11px] font-bold text-navy group-hover:text-teal">4. Govt Oversight</div>
            <div className="text-[10px] text-slate-500">State Secretary View</div>
          </button>
        </div>
      </div>
    </div>
  );
}
