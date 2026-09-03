import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LogOut, UserCheck, Shield, ChevronDown } from 'lucide-react';

export default function Header() {
  const { role, currentUser, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Role navigation tabs
  const getNavLinks = () => {
    if (!role) {
      return [
        { label: 'Home & Map', path: '/' },
        { label: 'Login / Switch Role', path: '/login' }
      ];
    }

    if (role === 'citizen') {
      return [
        { label: 'Home Map', path: '/' },
        { label: 'Post & Track Complaints', path: '/citizen/complaints' },
        { label: 'Nearby Problems & Vote', path: '/citizen/nearby' }
      ];
    }

    if (role === 'university') {
      return [
        { label: 'My Dashboard', path: '/university/dashboard' },
        { label: 'All Problems', path: '/university/all-problems' },
        { label: 'My Selected Problems', path: '/university/selected' },
        { label: 'Industry Collaboration', path: '/university/industry-collab' }
      ];
    }

    if (role === 'industry') {
      return [
        { label: 'My Dashboard', path: '/industry/dashboard' },
        { label: 'Browse Problems to Fund', path: '/industry/browse' },
        { label: 'My Requests', path: '/industry/requests' }
      ];
    }

    if (role === 'government') {
      return [
        { label: 'Gov Dashboard', path: '/government/dashboard' },
        { label: 'Verification Queue', path: '/government/verification' },
        { label: 'Systemic Alerts', path: '/government/systemic-alerts' }
      ];
    }

    return [];
  };

  const navLinks = getNavLinks();

  const handleRoleQuickSwitch = (e) => {
    const newRole = e.target.value;
    if (newRole === 'logout') {
      logout();
      navigate('/');
    } else if (newRole) {
      login(newRole);
      if (newRole === 'citizen') navigate('/citizen/complaints');
      if (newRole === 'university') navigate('/university/dashboard');
      if (newRole === 'industry') navigate('/industry/dashboard');
      if (newRole === 'government') navigate('/government/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Gov Banner Strip */}
      <div className="bg-navy text-white text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between border-b border-navy/20">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-mint tracking-wider uppercase">Govt. of Jharkhand</span>
          <span className="text-slate-300 hidden sm:inline">| Higher, Technical Education & Skill Development Dept.</span>
          <span className="text-amber hidden md:inline">| PS ID 26043</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-300">Smart India Hackathon Prototype</span>
          <span className="bg-amber text-white px-2 py-0.2 rounded font-bold text-[10px]">v2 SPEC</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20 gap-4">
        {/* Brand & Connected Dots Motif */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          {/* Custom Connected Dots Motif SVG */}
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center p-1.5 shadow-sm group-hover:bg-teal transition-colors">
            <svg viewBox="0 0 40 40" className="w-full h-full text-white fill-current">
              {/* Central Hub */}
              <circle cx="20" cy="20" r="4.5" fill="#02C39A" />
              {/* Four surrounding nodes (Citizen, Uni, Industry, Gov) */}
              <circle cx="9" cy="20" r="3" fill="#ffffff" />
              <circle cx="31" cy="20" r="3" fill="#E07A1F" />
              <circle cx="20" cy="9" r="3" fill="#00A896" />
              <circle cx="20" cy="31" r="3" fill="#028090" />
              {/* Connecting link lines */}
              <line x1="9" y1="20" x2="15.5" y2="20" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="24.5" y1="20" x2="31" y2="20" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="20" y1="9" x2="20" y2="15.5" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="20" y1="24.5" x2="20" y2="31" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl sm:text-2xl font-bold text-navy tracking-tight group-hover:text-teal transition-colors">
                SamadhanSetu
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal/10 text-teal uppercase tracking-wider hidden sm:inline">
                समाधान सेतु
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              From Citizen Complaint to Campus Innovation
            </p>
          </div>
        </Link>

        {/* Right Action: Role Quick Selector & Login/Logout */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <select
              value={role || ''}
              onChange={handleRoleQuickSwitch}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 text-navy py-1.5 px-2.5 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal cursor-pointer pr-7 appearance-none"
              title="Demo Role Switcher"
            >
              <option value="">Switch Demo Role...</option>
              <option value="citizen">👤 Citizen Portal (Pooja)</option>
              <option value="university">🎓 University Portal (NIT JSR)</option>
              <option value="industry">🏭 Industry Portal (Tata Steel)</option>
              <option value="government">🏛️ Government Portal (Secy)</option>
              {role && <option value="logout">🚪 Sign Out</option>}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {role ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-navy truncate max-w-[150px]">
                  {currentUser?.shortName || currentUser?.name || 'Logged In'}
                </span>
                <span className="text-[10px] uppercase font-semibold text-teal tracking-wide">
                  {role}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-navy hover:bg-teal rounded-lg transition-colors shadow-xs"
            >
              Login / Demo
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          {navLinks.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}

          {/* Quick link to Home map when in portal */}
          {role && location.pathname !== '/' && (
            <Link
              to="/"
              className="ml-auto text-xs text-slate-500 hover:text-teal font-medium px-2 py-1 rounded transition-colors hidden sm:inline"
            >
              ← Public State Map
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
