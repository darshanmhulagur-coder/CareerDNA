import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  CheckCheck,
  Eye,
  Building,
  User,
  ArrowUpRight,
  Database,
  FileText,
  BadgeAlert,
} from 'lucide-react';
import { VerificationClaim, TrustScore } from '../../types/sih';
import { useMahaTracking } from '../../context/MahaTrackingContext';
import { ClaimDetailModal } from './ClaimDetailModal';

export const VerificationQueue: React.FC = () => {
  const {
    claims,
    setSelectedClaim,
    setIsClaimModalOpen,
    verifyClaim,
    batchApproveHighTrustClaims,
  } = useMahaTracking();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'FLAGGED'>('ALL');
  const [trustFilter, setTrustFilter] = useState<'ALL' | TrustScore>('ALL');

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.utid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.trainingProvider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.employerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || claim.status === statusFilter;
    const matchesTrust = trustFilter === 'ALL' || claim.trustScore === trustFilter;

    return matchesSearch && matchesStatus && matchesTrust;
  });

  const pendingHighTrustCount = claims.filter((c) => c.status === 'PENDING' && c.trustScore === 'HIGH').length;

  const handleOpenDetail = (claim: VerificationClaim) => {
    setSelectedClaim(claim);
    setIsClaimModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Batch Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base sm:text-lg font-bold text-navy-950">
              Employment Verification Engine & Trust Queue
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Triangulating Trainee Self-declarations with EPFO UAN, GSTIN, and Document OCR APIs
          </p>
        </div>

        {/* Batch Action */}
        <div className="flex items-center gap-2">
          {pendingHighTrustCount > 0 && (
            <button
              type="button"
              onClick={batchApproveHighTrustClaims}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm transition"
            >
              <CheckCheck className="w-4 h-4" />
              Batch Approve ({pendingHighTrustCount} High-Trust EPFO)
            </button>
          )}
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by UTID, Candidate, Employer, District..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['ALL', 'PENDING', 'APPROVED', 'FLAGGED'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`flex-1 py-1.5 rounded-lg transition text-center ${
                statusFilter === st
                  ? 'bg-white text-navy-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Trust Score Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['ALL', 'HIGH', 'MEDIUM', 'UNVERIFIED'] as const).map((tr) => (
            <button
              key={tr}
              type="button"
              onClick={() => setTrustFilter(tr)}
              className={`flex-1 py-1.5 rounded-lg transition text-center ${
                trustFilter === tr
                  ? 'bg-navy-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tr === 'ALL' ? 'All Trust' : tr}
            </button>
          ))}
        </div>
      </div>

      {/* Claims Table / List */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Claim ID & Trainee</th>
                <th className="py-3 px-3">Milestone & Trade</th>
                <th className="py-3 px-3">Employer & Reported Wage</th>
                <th className="py-3 px-3">Verification Signal</th>
                <th className="py-3 px-3">Trust Tier</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No employment claims match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50/70 transition">
                    {/* Trainee & UTID */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{claim.candidateName}</div>
                      <div className="font-mono text-[11px] text-slate-500">{claim.utid}</div>
                      <div className="text-[10px] text-slate-400">{claim.district}, Maharashtra</div>
                    </td>

                    {/* Milestone & Trade */}
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {claim.milestone}
                      </span>
                      <div className="font-medium text-slate-800 text-[11px] mt-0.5 line-clamp-1 max-w-[150px]">
                        {claim.course}
                      </div>
                    </td>

                    {/* Employer & Wage */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800 line-clamp-1 max-w-[170px]" title={claim.employerName}>
                        {claim.employerName}
                      </div>
                      <div className="font-extrabold text-emerald-800">
                        ₹{claim.salary.toLocaleString('en-IN')}/mo
                      </div>
                      <div className="text-[10px] text-slate-400">{claim.jobRole}</div>
                    </td>

                    {/* Verification Signals */}
                    <td className="py-3 px-3">
                      {claim.epfoVerification.matched ? (
                        <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                          <Database className="w-3.5 h-3.5 text-emerald-600" />
                          EPFO API Live Match ({claim.epfoVerification.confidence}%)
                        </div>
                      ) : claim.ocrConfidence.overallScore > 80 ? (
                        <div className="text-[11px] text-blue-800 flex items-center gap-1 font-medium">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          Document OCR ({claim.ocrConfidence.overallScore}%)
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500">Self-Declared</div>
                      )}
                    </td>

                    {/* Trust Scoring Badges */}
                    <td className="py-3 px-3">
                      {claim.trustScore === 'HIGH' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          High Trust
                        </span>
                      ) : claim.trustScore === 'MEDIUM' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Medium Trust
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700 border border-rose-200">
                          <BadgeAlert className="w-3 h-3 text-rose-600" />
                          Unverified
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          claim.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-900'
                            : claim.status === 'FLAGGED'
                            ? 'bg-amber-100 text-amber-900'
                            : claim.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-900'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {claim.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(claim)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                          title="Inspect Evidence"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {claim.status === 'PENDING' && (
                          <>
                            <button
                              type="button"
                              onClick={() => verifyClaim(claim.id, 'APPROVED')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 shadow-sm transition"
                              title="Quick Approve"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => verifyClaim(claim.id, 'FLAGGED')}
                              className="px-2 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 font-semibold text-[11px] hover:bg-amber-100 transition"
                              title="Flag for Proof"
                            >
                              Flag
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Detail Inspection Modal */}
      <ClaimDetailModal />
    </div>
  );
};
