// src/components/ui/StatusPill.jsx
//
// Single reusable status-pill style, used across Citizen tracker,
// University queue/workspace, Government dashboards, etc.
// Accepts any string from STATUSES in mockComplaints.js, plus the
// two verification statuses ("Pending" / "Verified") so the same
// component can be reused on University/Industry signup rows.

const STYLES = {
  Submitted: "bg-gray-100 text-gray-700 border border-gray-300",
  "University Assigned": "bg-teal/10 text-teal border border-teal/30",
  "In Progress": "bg-amber/10 text-amber border border-amber/30",
  "Field Verified": "bg-seafoam/10 text-seafoam border border-seafoam/30",
  Completed: "bg-mint/10 text-mint border border-mint/40",
  Pending: "bg-amber/10 text-amber border border-amber/30",
  Verified: "bg-mint/10 text-mint border border-mint/40",
  Rejected: "bg-red-50 text-red-600 border border-red-200",
};

const FALLBACK_STYLE = "bg-gray-100 text-gray-700 border border-gray-300";

export default function StatusPill({ status }) {
  const style = STYLES[status] || FALLBACK_STYLE;

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-body font-medium ${style}`}
    >
      {status}
    </span>
  );
}