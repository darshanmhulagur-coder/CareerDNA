import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  BadgeCheck,
  Building,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LongitudinalMilestone, TraineeProfile } from '../../types/sih';

interface TraineeMilestoneTrackerProps {
  trainee: TraineeProfile;
  onSelectMilestone?: (milestone: LongitudinalMilestone) => void;
}

export const TraineeMilestoneTracker: React.FC<TraineeMilestoneTrackerProps> = ({
  trainee,
  onSelectMilestone,
}) => {
  const getStatusBadge = (status: LongitudinalMilestone['status'], trustScore: LongitudinalMilestone['trustScore']) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified {trustScore === 'HIGH' ? '(High Trust)' : '(OCR)'}
          </span>
        );
      case 'ACTION_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-saffron-50 px-2 py-0.5 text-[11px] font-semibold text-saffron-700 border border-saffron-200 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-saffron-600" />
            Action Due
          </span>
        );
      case 'PENDING_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            Under Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 border border-slate-200">
            Upcoming
          </span>
        );
    }
  };

  const getVerificationChannelBadge = (channel: LongitudinalMilestone['verificationChannel']) => {
    switch (channel) {
      case 'EPFO_API':
        return (
          <span className="text-[10px] bg-emerald-100/70 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200">
            EPFO API Synced
          </span>
        );
      case 'GSTIN_API':
        return (
          <span className="text-[10px] bg-emerald-100/70 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200">
            GSTIN / Udyam Verified
          </span>
        );
      case 'DOCUMENT_OCR':
        return (
          <span className="text-[10px] bg-amber-100/70 text-amber-800 font-medium px-2 py-0.5 rounded border border-amber-200">
            Paystub OCR Verified
          </span>
        );
      default:
        return (
          <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded border border-slate-200">
            Self-Reported
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Longitudinal Progress Summary */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-saffron-600" />
            Longitudinal Tracking Milestones (24-Month Track)
          </h3>
          <p className="text-xs text-slate-500">
            Periodic employment & wage verification post-certification (3, 6, 12, and 24 months)
          </p>
        </div>

        {/* DBT Stipend Status Chip */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <div className="font-semibold text-emerald-900 leading-tight">
              Post-Placement DBT Support: ₹{trainee.dbtAmountPerMonth}/mo
            </div>
            <div className="text-[11px] text-emerald-700">
              {trainee.dbtDisbursedMonths} of 3 disbursements credited via PFMS
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline Stepper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {trainee.milestones.map((milestone, idx) => {
          const isDone = milestone.status === 'VERIFIED';
          const isCurrent = milestone.status === 'ACTION_REQUIRED' || milestone.status === 'PENDING_REVIEW';

          return (
            <div
              key={milestone.id}
              onClick={() => onSelectMilestone?.(milestone)}
              className={`relative rounded-xl p-3.5 border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-amber-50/40 border-saffron-400 shadow-sm ring-1 ring-saffron-400/40'
                  : isDone
                  ? 'bg-white border-emerald-200 hover:border-emerald-300'
                  : 'bg-slate-50/80 border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Top Row: Milestone Label + Status */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-navy-800 bg-slate-100 px-2 py-0.5 rounded">
                  {milestone.id}
                </span>
                {getStatusBadge(milestone.status, milestone.trustScore)}
              </div>

              {/* Title & Date */}
              <div className="font-semibold text-xs text-slate-900">{milestone.label}</div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                Target: {milestone.targetDate}
              </div>

              {/* Reported Employment & Wage if Verified */}
              {isDone && milestone.salaryReported ? (
                <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Verified Wage:</span>
                    <span className="font-bold text-emerald-800">
                      ₹{milestone.salaryReported.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <div className="truncate text-[11px] text-slate-600" title={milestone.employerOrEnterprise}>
                    {milestone.employerOrEnterprise}
                  </div>
                  <div className="pt-1">{getVerificationChannelBadge(milestone.verificationChannel)}</div>
                </div>
              ) : isCurrent ? (
                <div className="mt-2.5 pt-2 border-t border-saffron-200 text-xs">
                  <p className="text-[11px] text-saffron-900 line-clamp-2">
                    {milestone.notes || 'Please submit updated employment status or paystub proof below.'}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-saffron-700">
                    Submit Verification Below <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ) : (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                  {milestone.notes || 'Long-term retention milestone'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
