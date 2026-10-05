import React, { useState } from 'react';
import {
  Building2,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  AlertTriangle,
  FileCheck2,
  IndianRupee,
  Calendar,
  Briefcase,
  TrendingUp,
  Search,
  Check,
} from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';

export const TpPortalView: React.FC = () => {
  const { allTrainees, scorecards, showToast } = useMahaTracking();

  const currentTp = scorecards[0]; // MahaSkill Tech Institute, Pune
  const [reminderSentBatches, setReminderSentBatches] = useState<string[]>([]);
  const [traineeSearch, setTraineeSearch] = useState('');

  const batches = [
    {
      id: 'BATCH-2024-CNC-01',
      trade: 'CNC Machine Operator & Programmer (NSQF 4)',
      completionDate: 'Aug 2024',
      totalTrainees: 40,
      m3Rate: 100,
      m6Rate: 97.5,
      m12Rate: 85.0,
      pendingCount: 6,
    },
    {
      id: 'BATCH-2024-AUTO-03',
      trade: 'Industrial Automation & PLC Specialist',
      completionDate: 'Sep 2024',
      totalTrainees: 35,
      m3Rate: 97.1,
      m6Rate: 91.4,
      m12Rate: 77.1,
      pendingCount: 8,
    },
    {
      id: 'BATCH-2024-ROBO-02',
      trade: 'Robotics Welding & Mechatronics',
      completionDate: 'Oct 2024',
      totalTrainees: 30,
      m3Rate: 100,
      m6Rate: 93.3,
      m12Rate: 80.0,
      pendingCount: 6,
    },
    {
      id: 'BATCH-2024-EV-04',
      trade: 'Electric Vehicle Powertrain Maintenance',
      completionDate: 'Nov 2024',
      totalTrainees: 38,
      m3Rate: 94.7,
      m6Rate: 86.8,
      m12Rate: 68.4,
      pendingCount: 12,
    },
  ];

  const handleSendReminder = (batchId: string) => {
    setReminderSentBatches((prev) => [...prev, batchId]);
    showToast(`Automated WhatsApp & SMS check-in links sent to batch ${batchId}!`);
  };

  const filteredTrainees = allTrainees.filter(
    (t) =>
      t.fullName.toLowerCase().includes(traineeSearch.toLowerCase()) ||
      t.utid.toLowerCase().includes(traineeSearch.toLowerCase()) ||
      t.courseName.toLowerCase().includes(traineeSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* TP Header & Performance Tier Banner */}
      <div className="gov-card p-4 sm:p-6 bg-gradient-to-br from-white via-white to-slate-50 border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 text-white flex items-center justify-center shadow-md shrink-0">
              <Building2 className="w-6 h-6 text-saffron-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-navy-950">{currentTp.name}</h2>
                <span className="gov-badge bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold">
                  Grade {currentTp.grade} (Top Tier)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Center Code: {currentTp.code} • {currentTp.district}, {currentTp.state}
              </p>
              <div className="text-xs text-slate-600 mt-1">
                Primary Trade Cluster: <strong>Automotive, CNC Machining & Mechatronics</strong>
              </div>
            </div>
          </div>

          {/* Fund Disbursement Tranche Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-left md:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              National MSDE Fund Disbursement
            </span>
            <div className="text-base sm:text-lg font-extrabold text-emerald-800">
              ₹{(currentTp.currentTrancheAmount / 100000).toFixed(2)} Lakhs Released
            </div>
            <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 md:justify-end">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Phase 3 Longitudinal Retention Tranche Paid
            </div>
          </div>
        </div>

        {/* 4 TP Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Total Trainees Certified</span>
            <span className="text-lg font-extrabold text-navy-950 font-mono">
              {currentTp.totalCertified.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-500 block">Across 8 Active Batches</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Longitudinal Compliance</span>
            <span className="text-lg font-extrabold text-emerald-700 font-mono">
              {currentTp.trackingComplianceRate}%
            </span>
            <span className="text-[10px] text-emerald-700 block">Alumni response rate</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Verified Placement Rate</span>
            <span className="text-lg font-extrabold text-navy-950 font-mono">
              {currentTp.verifiedPlacementRate}%
            </span>
            <span className="text-[10px] text-emerald-700 block">Audit passed</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">12-Month Retention Rate</span>
            <span className="text-lg font-extrabold text-emerald-800 font-mono">
              {currentTp.retention12mRate}%
            </span>
            <span className="text-[10px] text-slate-500 block">Benchmark: &gt; 70%</span>
          </div>
        </div>
      </div>

      {/* Longitudinal Batch Tracking & Automated Reminders */}
      <div className="gov-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-saffron-600" />
              Batch Longitudinal Milestones & Compliance Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Track 3M, 6M, and 12M check-in status for each certified cohort and trigger reminders
            </p>
          </div>
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Batch ID & Trade</th>
                <th className="py-2.5 px-2 text-center">Certified</th>
                <th className="py-2.5 px-2 text-center">3M Check-in</th>
                <th className="py-2.5 px-2 text-center">6M Check-in</th>
                <th className="py-2.5 px-2 text-center">12M Audit</th>
                <th className="py-2.5 px-3 text-right">Automated Reminder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.map((b) => {
                const isSent = reminderSentBatches.includes(b.id);
                return (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{b.id}</div>
                      <div className="text-[11px] text-slate-600 line-clamp-1">{b.trade}</div>
                      <div className="text-[10px] text-slate-400">Certified {b.completionDate}</div>
                    </td>

                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-700">
                      {b.totalTrainees}
                    </td>

                    <td className="py-3 px-2 text-center font-mono text-emerald-800 font-semibold">
                      {b.m3Rate}%
                    </td>

                    <td className="py-3 px-2 text-center font-mono text-emerald-800 font-semibold">
                      {b.m6Rate}%
                    </td>

                    <td className="py-3 px-2 text-center font-mono font-bold text-navy-950">
                      {b.m12Rate}%
                    </td>

                    <td className="py-3 px-3 text-right">
                      {isSent ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <Check className="w-3.5 h-3.5" /> Sent (WhatsApp & SMS)
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendReminder(b.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 text-white font-semibold text-xs hover:bg-navy-700 shadow-sm transition"
                        >
                          <Send className="w-3 h-3 text-saffron-400" />
                          Remind ({b.pendingCount} Pending)
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainee Roster & Status Table */}
      <div className="gov-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-navy-800" />
              Trainee Longitudinal Placement Roster
            </h3>
            <p className="text-xs text-slate-500">
              Live status of enrolled alumni across industrial manufacturing clusters
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={traineeSearch}
              onChange={(e) => setTraineeSearch(e.target.value)}
              placeholder="Search by name, UTID, trade..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Trainee & UTID</th>
                <th className="py-2.5 px-3">Trade</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Employer / Venture</th>
                <th className="py-2.5 px-3 text-right">Reported Wage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrainees.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{t.fullName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{t.utid}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800 line-clamp-1 max-w-[200px]">
                      {t.courseName}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.employmentType === 'FULL_TIME'
                          ? 'bg-emerald-100 text-emerald-900'
                          : t.employmentType === 'SELF_EMPLOYED'
                          ? 'bg-blue-100 text-blue-900'
                          : t.employmentType === 'APPRENTICESHIP'
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {t.employmentType}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 line-clamp-1">
                      {t.employerName || 'Seeking Employment'}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.workLocation || t.district}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {t.currentSalary > 0 ? `₹${t.currentSalary.toLocaleString('en-IN')}/mo` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
