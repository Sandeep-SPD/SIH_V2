import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import StatusPill from '../../components/ui/StatusPill.jsx';
import DomainTag from '../../components/ui/DomainTag.jsx';
import VoteButtons from '../../components/ui/VoteButtons.jsx';
import {
  MapPin, Calendar, Building2, User, Users, Flame, Star, CheckCircle, ArrowLeft, Award, Sparkles, Send
} from 'lucide-react';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints, addReview } = useAuth();

  const complaint = complaints.find(c => c.id === id);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!complaint) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-navy font-heading">Complaint not found</h2>
        <p className="text-xs text-slate-500">The grievance ID {id} does not exist in the mock registry.</p>
        <Link to="/" className="text-xs text-teal font-semibold hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview(complaint.id, { rating, comment });
    setReviewSubmitted(true);
    setComment('');
  };

  const steps = [
    { label: 'Submitted', key: 'Submitted' },
    { label: 'University Assigned', key: 'University Assigned' },
    { label: 'Field Verified', key: 'Field Verified' },
    { label: 'In Progress', key: 'In Progress' },
    { label: 'Completed', key: 'Completed' }
  ];

  const getStepStatus = (stepKey) => {
    const order = ['Submitted', 'University Assigned', 'Field Verified', 'In Progress', 'Completed'];
    const currentIndex = order.indexOf(complaint.status);
    const stepIndex = order.indexOf(stepKey);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      {/* Main Details Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <DomainTag domain={complaint.domain} size="md" />
            <StatusPill status={complaint.status} />
            {complaint.outcomeTag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                <Award className="w-3.5 h-3.5 text-amber" />
                {complaint.outcomeTag}
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">{complaint.id}</span>
        </div>

        {/* Title & Submitter Info */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-navy leading-tight">
            {complaint.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-teal" />
              {complaint.location || complaint.district}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Updated {complaint.lastUpdateDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Logged by: {complaint.submitterName} ({complaint.submitterType})
            </span>
          </div>
        </div>

        {/* Photo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Problem Statement
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {complaint.description}
            </p>

            <div className="pt-3 flex items-center gap-4">
              <VoteButtons
                complaintId={complaint.id}
                upvotes={complaint.upvotes}
                downvotes={complaint.downvotes}
              />
              <span className="text-xs text-slate-500">
                Upvote to indicate high community urgency
              </span>
            </div>
          </div>

          {complaint.photoUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 max-h-60">
              <img
                src={complaint.photoUrl}
                alt={complaint.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Interactive Lifecycle Stepper */}
        <div className="border-t border-slate-100 pt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Resolution Pipeline Status
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((step, idx) => {
              const state = getStepStatus(step.key);
              return (
                <div
                  key={step.key}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center gap-1 ${
                    state === 'completed'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : state === 'current'
                      ? 'bg-teal/10 border-teal text-navy font-bold ring-1 ring-teal'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      state === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : state === 'current'
                        ? 'bg-teal text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {state === 'completed' ? '✓' : idx + 1}
                  </div>
                  <span className="text-xs leading-tight">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned University Team Block */}
        {complaint.assignedUniversityName && (
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assigned Academic Research Team
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> University Matched
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-teal shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm sm:text-base">
                  {complaint.assignedUniversityName}
                </h4>
                {complaint.facultyMentor && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    Faculty Mentor: <span className="font-medium text-navy">{complaint.facultyMentor}</span>
                  </p>
                )}
                {complaint.studentTeam && complaint.studentTeam.length > 0 && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    Student Researchers: {complaint.studentTeam.map(s => `${s.name} (${s.dept})`).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Timeline Log */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Activity & Verification Timeline
            </h3>

            <div className="space-y-2.5">
              {complaint.timeline.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-teal mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-navy">{entry.status}</span>
                      <span className="text-[11px] text-slate-400">{entry.date}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{entry.note}</p>
                    <span className="text-[10px] text-teal font-medium mt-1 inline-block">By: {entry.by}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Citizen Review Section if Completed */}
        {complaint.status === 'Completed' && (
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <h3 className="text-sm font-bold font-heading text-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber" />
              Citizen Ground Feedback & Review
            </h3>

            {complaint.review || reviewSubmitted ? (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-1 text-amber">
                  {[...Array(complaint.review?.rating || rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber" />
                  ))}
                  <span className="text-xs font-bold text-emerald-900 ml-2">
                    Verified Citizen Rating ({complaint.review?.rating || rating}/5)
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  "{complaint.review?.comment || comment || 'Solution verified on-site. Problem resolved!'}"
                </p>
                <div className="text-[10px] text-emerald-800 font-semibold">
                  ✓ Recorded into University Leaderboard Reputation Points
                </div>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <p className="text-xs text-slate-600">
                  This project was marked completed by the university team. Please rate how effectively the intervention resolved your local problem:
                </p>

                {/* Star rating selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            num <= rating ? 'text-amber fill-amber' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-navy">({rating} of 5 Stars)</span>
                </div>

                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how the solution impacted your village or ward..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal"
                  required
                />

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-teal hover:bg-navy rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Citizen Review
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
