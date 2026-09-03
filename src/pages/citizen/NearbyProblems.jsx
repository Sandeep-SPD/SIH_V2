import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import ComplaintCard from '../../components/ui/ComplaintCard.jsx';
import { Search, MapPin, Compass, ThumbsUp, AlertCircle } from 'lucide-react';

export default function NearbyProblems() {
  const { complaints, districts } = useAuth();
  const navigate = useNavigate();

  // Search input & matched district
  const [addressInput, setAddressInput] = useState('Sakchi, Jamshedpur');
  const [matchedDistrict, setMatchedDistrict] = useState('East Singhbhum (Jamshedpur)');
  const [hasSearched, setHasSearched] = useState(true);

  // Address search matcher
  const handleSearch = (e) => {
    e?.preventDefault();
    if (!addressInput.trim()) return;

    const query = addressInput.toLowerCase();
    // find match in district names or hqs
    const found = districts.find(d =>
      query.includes(d.name.toLowerCase()) ||
      query.includes(d.hq.toLowerCase()) ||
      (d.id === 'east-singhbhum' && (query.includes('jamshedpur') || query.includes('sakchi') || query.includes('bistupur') || query.includes('ghatshila') || query.includes('jadugora'))) ||
      (d.id === 'ranchi' && (query.includes('ranchi') || query.includes('doranda') || query.includes('hatia') || query.includes('morabadi') || query.includes('mesra'))) ||
      (d.id === 'dhanbad' && (query.includes('dhanbad') || query.includes('jharia') || query.includes('katras'))) ||
      (d.id === 'bokaro' && (query.includes('bokaro') || query.includes('chas') || query.includes('bermo')))
    );

    if (found) {
      setMatchedDistrict(found.name);
    } else {
      setMatchedDistrict('East Singhbhum (Jamshedpur)');
    }
    setHasSearched(true);
  };

  // Nearby complaints: matching district + immediate neighbors
  const nearbyComplaints = useMemo(() => {
    const currentDistrictObj = districts.find(d => d.name === matchedDistrict);
    const neighborIds = currentDistrictObj?.neighbors || [];

    return complaints
      .filter(c => {
        const isPrimary = c.district.toLowerCase().includes(matchedDistrict.toLowerCase());
        const isNeighbor = neighborIds.some(nId => {
          const neighborObj = districts.find(d => d.id === nId);
          return neighborObj && c.district.toLowerCase().includes(neighborObj.name.toLowerCase());
        });
        return isPrimary || isNeighbor;
      })
      .sort((a, b) => b.upvotes - a.upvotes); // sorted by community urgency / votes
  }, [complaints, matchedDistrict, districts]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-navy">
          Nearby Problems & Citizen Upvoting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Find localized problems in your ward or neighboring blocks. Upvoting helps prioritize funding and campus match.
        </p>
      </div>

      {/* Search and Geolocation bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 text-teal absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Enter your street, ward, or town (e.g. Sakchi Jamshedpur, Doranda Ranchi, Chas Bokaro)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal font-medium"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
          >
            <Compass className="w-4 h-4" /> Locate Nearby Issues
          </button>
        </form>

        {/* District Dropdown Fallback */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Or use district fallback:</span>
            <select
              value={matchedDistrict}
              onChange={(e) => {
                setMatchedDistrict(e.target.value);
                setAddressInput(e.target.value);
              }}
              className="text-xs font-semibold bg-slate-100 text-navy py-1 px-2.5 rounded-lg border border-slate-200"
            >
              {districts.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="text-teal font-semibold flex items-center gap-1">
            <span>Matched to: </span>
            <span className="bg-teal/10 px-2 py-0.5 rounded text-navy">{matchedDistrict}</span>
            <span className="text-slate-400">& adjacent blocks</span>
          </div>
        </div>
      </div>

      {/* Problem Cards Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-heading text-navy flex items-center gap-2">
            <span>Problems Ranked by Community Upvotes</span>
            <span className="text-xs font-normal bg-teal/10 text-teal px-2.5 py-0.5 rounded-full font-semibold">
              {nearbyComplaints.length} in area
            </span>
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Click upvote on critical problems to elevate priority
          </span>
        </div>

        {nearbyComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyComplaints.map(complaint => (
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
            <h3 className="font-heading font-bold text-navy text-base">No nearby grievances recorded</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to log a community problem in this district.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
