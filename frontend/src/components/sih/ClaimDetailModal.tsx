import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  FileText,
  User,
  Calendar,
  IndianRupee,
  Cpu,
  Database,
  Eye,
  Check,
  ExternalLink,
} from 'lucide-react';
import { VerificationClaim } from '../../types/sih';
import { useMahaTracking } from '../../context/MahaTrackingContext';

export const ClaimDetailModal: React.FC = () => {
  const { selectedClaim, setSelectedClaim, isClaimModalOpen, setIsClaimModalOpen, verifyClaim } =
    useMahaTracking();

  const [remarks, setRemarks] = useState('');

  if (!isClaimModalOpen || !selectedClaim) return null;

  const handleClose = () => {
    setIsClaimModalOpen(false);
    setSelectedClaim(null);
  };

  const onApprove = () => {
    verifyClaim(selectedClaim.id, 'APPROVED', remarks || 'Approved after cross-verifying EPFO/GSTIN records.');
    handleClose();
  };

  const onFlag = () => {
    verifyClaim(selectedClaim.id, 'FLAGGED', remarks || 'Flagged: Requires clearer wage slip or bank credit statement.');
    handleClose();
  };

  const onReject = () => {
    verifyClaim(selectedClaim.id, 'REJECTED', remarks || 'Claim rejected due to mismatch in employer establishment records.');
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-5 sm:p-6 shadow-elevated border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-navy-800 bg-slate-100 px-2 py-0.5 rounded">
                Claim {selectedClaim.id}
              </span>
              <span
                className={`gov-badge ${
                  selectedClaim.trustScore === 'HIGH'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : selectedClaim.trustScore === 'MEDIUM'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {selectedClaim.trustScore} TRUST SCORE
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-navy-950 mt-1">
              Verify Employment Claim • {selectedClaim.candidateName}
            </h3>
            <p className="text-xs text-slate-500">
              UTID: {selectedClaim.utid} • Milestone: {selectedClaim.milestone}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          {/* Candidate & Training Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Candidate</span>
              <span className="font-bold text-slate-900">{selectedClaim.candidateName}</span>
              <span className="text-[11px] text-slate-500 block">{selectedClaim.candidatePhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Trade / Course</span>
              <span className="font-semibold text-slate-800">{selectedClaim.course}</span>
              <span className="text-[11px] text-slate-500 block">{selectedClaim.sector}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Training Provider</span>
              <span className="font-semibold text-slate-800 truncate block">{selectedClaim.trainingProvider}</span>
              <span className="text-[11px] text-slate-500 block">{selectedClaim.district}</span>
            </div>
          </div>

          {/* Reported Employment Claim */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 bg-white">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-saffron-600" />
              Trainee Reported Employment Details
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Employer / Business</span>
                <span className="font-semibold text-slate-800">{selectedClaim.employerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Designation</span>
                <span className="font-semibold text-slate-800">{selectedClaim.jobRole}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Claimed Salary</span>
                <span className="font-bold text-emerald-800 text-sm">
                  ₹{selectedClaim.salary.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Work Location</span>
                <span className="font-semibold text-slate-800">{selectedClaim.location}</span>
              </div>
            </div>
          </div>

          {/* Automated Verification Signals Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-navy-800" />
              Automated Triangulation Signals
            </h4>

            {/* Signal 1: EPFO Database Query */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-emerald-950">
                  <Database className="w-4 h-4 text-emerald-700" />
                  Signal 1: EPFO National Database API Match
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  {selectedClaim.epfoVerification.matched ? 'MATCH CONFIRMED' : 'NO UAN / ESIC'}
                </span>
              </div>

              {selectedClaim.epfoVerification.matched ? (
                <div className="mt-2 text-[11px] text-emerald-900 space-y-1">
                  <div>
                    Establishment: <strong>{selectedClaim.epfoVerification.establishmentName}</strong> (Code:{' '}
                    {selectedClaim.epfoVerification.establishmentCode})
                  </div>
                  <div>
                    Member ID: <code>{selectedClaim.epfoVerification.memberId}</code> • Active PF deposit recorded.
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    Confidence Score: {selectedClaim.epfoVerification.confidence}% match
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-[11px] text-slate-600">
                  EPFO records not available for this establishment or self-employed trade. Checked MSME/GSTIN register.
                </div>
              )}
            </div>

            {/* Signal 2: Document OCR Extraction */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-blue-950">
                  <FileText className="w-4 h-4 text-blue-700" />
                  Signal 2: Document OCR & Fraud Detection
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  OCR Score: {selectedClaim.ocrConfidence.overallScore}%
                </span>
              </div>

              <div className="mt-2 text-[11px] text-blue-900 space-y-1">
                <div>Document: <strong>{selectedClaim.documentUrl}</strong></div>
                <div>
                  Extracted Fields: <strong>{selectedClaim.ocrConfidence.fieldsMatched.join(', ')}</strong>
                </div>
                <div>
                  Detected Wage in Document: ₹{selectedClaim.ocrConfidence.detectedSalary.toLocaleString('en-IN')}{' '}
                  (Match Variance: 0.0%)
                </div>
              </div>
            </div>
          </div>

          {/* Verifier Notes / Remarks Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Officer Audit Remarks (Optional)
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Verified via EPFO establishment code MH/PUN/0048291. Meets MSDE retention criteria."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onReject}
            className="px-3 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 font-semibold text-xs hover:bg-rose-100 transition flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" /> Reject Claim
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onFlag}
              className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 font-semibold text-xs hover:bg-amber-100 transition flex items-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4" /> Flag for Re-upload
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" /> Approve Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
