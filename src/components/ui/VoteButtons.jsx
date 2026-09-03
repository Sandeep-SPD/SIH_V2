import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function VoteButtons({ complaintId, upvotes = 0, downvotes = 0, layout = 'horizontal' }) {
  const { voteComplaint, votedComplaints } = useAuth();
  const currentVote = votedComplaints[complaintId];
  const netScore = upvotes - downvotes;

  const handleUpvote = (e) => {
    e.stopPropagation();
    voteComplaint(complaintId, 'up');
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    voteComplaint(complaintId, 'down');
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-lg ${
        layout === 'vertical' ? 'flex-col' : 'flex-row'
      }`}
    >
      <button
        onClick={handleUpvote}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
          currentVote === 'up'
            ? 'bg-seafoam text-white shadow-xs'
            : 'text-slate-600 hover:bg-slate-200 hover:text-navy'
        }`}
        title="Upvote: Priority Issue"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        <span>{upvotes}</span>
      </button>

      <div className={`text-[11px] font-bold px-1 ${netScore >= 0 ? 'text-teal' : 'text-rose-600'}`}>
        {netScore > 0 ? `+${netScore}` : netScore}
      </div>

      <button
        onClick={handleDownvote}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
          currentVote === 'down'
            ? 'bg-rose-600 text-white shadow-xs'
            : 'text-slate-600 hover:bg-slate-200 hover:text-navy'
        }`}
        title="Downvote / Incorrect"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
        {downvotes > 0 && <span>{downvotes}</span>}
      </button>
    </div>
  );
}
