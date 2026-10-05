import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  CheckCircle2,
  Calendar,
  Building,
  MapPin,
  TrendingUp,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  Lock,
  UserPlus,
} from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';
import { TraineeMilestoneTracker } from './TraineeMilestoneTracker';
import { EmploymentUpdateForm } from './EmploymentUpdateForm';
import { QrModal } from './QrModal';
import { MobileFrame } from './MobileFrame';
import { TraineeRegistrationModal } from './TraineeRegistrationModal';

export const TraineePortal: React.FC = () => {
  const {
    activeTrainee,
    toggleAadhaarConsent,
    predictiveCourses,
    enrolledCourses,
    enrollInBridgeCourse,
    setIsRegisterModalOpen,
    showToast,
  } = useMahaTracking();

  const [isQrOpen, setIsQrOpen] = useState(false);
  const [copiedUtid, setCopiedUtid] = useState(false);

  const handleCopyUtid = () => {
    navigator.clipboard?.writeText(activeTrainee.utid);
    setCopiedUtid(true);
    showToast(`Copied UTID: ${activeTrainee.utid}`);
    setTimeout(() => setCopiedUtid(false), 2000);
  };

  const relevantCourses = predictiveCourses.slice(0, 2);

  return (
    <MobileFrame>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Onboarding Invitation / Self-Registration Banner */}
        <div className="bg-gradient-to-r from-saffron-50 via-white to-emerald-50 border border-saffron-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-saffron-100 text-saffron-700 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-950">
                Want to add & track your own vocational training?
              </div>
              <div className="text-[11px] text-slate-500">
                Enter your course, institute, and state to generate your custom UTID & access your portal.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-navy-800 text-white font-bold text-xs hover:bg-navy-700 shadow-sm transition shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5 text-saffron-400" />
            <span>+ Add Your Training Data</span>
          </button>
        </div>

        {/* Trainee Profile & UTID Digital Identity Card */}
        <div className="gov-card p-4 sm:p-6 bg-gradient-to-br from-white via-white to-slate-50 relative overflow-hidden">
          {/* Subtle decorative watermark */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-saffron-100/40 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            {/* Left: Avatar & Personal Info */}
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 text-white flex items-center justify-center font-bold text-lg shadow-md border border-navy-700 shrink-0">
                {activeTrainee.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-navy-950">
                    {activeTrainee.fullName}
                  </h2>
                  <span className="gov-badge bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Certified Trainee
                  </span>
                </div>

                {/* Universal Trainee ID (UTID) Display */}
                <div className="mt-1 flex items-center gap-2 font-mono text-xs text-slate-700">
                  <span className="font-semibold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                    UTID: {activeTrainee.utid}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUtid}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
                    title="Copy UTID"
                  >
                    {copiedUtid ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQrOpen(true)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-navy-800 hover:text-navy-900 bg-slate-100 px-2 py-0.5 rounded border hover:bg-slate-200 transition"
                  >
                    <QrCode className="w-3 h-3 text-navy-700" />
                    View ID Card
                  </button>
                </div>

                {/* Course, Center, District */}
                <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium text-slate-900">
                    <Award className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                    <span>{activeTrainee.courseName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{activeTrainee.trainingCenterName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {activeTrainee.district}, {activeTrainee.state} • Certified {activeTrainee.certificationDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Aadhaar Consent Toggle & Trust Status */}
            <div className="sm:text-right flex flex-col sm:items-end justify-between gap-3 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">Aadhaar e-KYC Consent</span>
                <button
                  type="button"
                  onClick={toggleAadhaarConsent}
                  role="switch"
                  aria-checked={activeTrainee.aadhaarConsent}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    activeTrainee.aadhaarConsent ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      activeTrainee.aadhaarConsent ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="text-[11px] text-slate-500">
                {activeTrainee.aadhaarConsent ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1 sm:justify-end">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Linked ({activeTrainee.aadhaarMasked})
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium flex items-center gap-1 sm:justify-end">
                    <Lock className="w-3.5 h-3.5" />
                    Consent Off (Manual audit)
                  </span>
                )}
              </div>

              {/* Current Reported Wage Card */}
              <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-left sm:text-right shadow-sm">
                <div className="text-[10px] uppercase font-bold text-slate-400">Current Verified Wage</div>
                <div className="text-sm sm:text-base font-extrabold text-navy-900">
                  {activeTrainee.currentSalary > 0
                    ? `₹${activeTrainee.currentSalary.toLocaleString('en-IN')}/mo`
                    : 'Unplaced / Seeking'}
                </div>
                {activeTrainee.currentSalary > 0 && activeTrainee.baselineSalary > 0 && (
                  <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 sm:justify-end">
                    <TrendingUp className="w-3 h-3" />
                    +
                    {Math.round(
                      ((activeTrainee.currentSalary - activeTrainee.baselineSalary) /
                        activeTrainee.baselineSalary) *
                        100
                    )}
                    % post-training growth
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Longitudinal Milestone Timeline Tracker */}
        <div className="gov-card p-4 sm:p-6">
          <TraineeMilestoneTracker trainee={activeTrainee} />
        </div>

        {/* Dynamic Employment Status Update Form */}
        <EmploymentUpdateForm />

        {/* AI Predictive Bridge Course Recommendations */}
        <div className="gov-card p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy-900">
                  AI Recommended Upskilling Bridge Modules
                </h3>
                <p className="text-xs text-slate-500">
                  Matched with current national industrial hiring demand to boost placement & wages
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Skill India 100% Free
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {relevantCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <div
                  key={course.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                        {course.durationHours} Hours • {course.mode}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-navy-950 mt-1">{course.title}</h4>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                      {course.potentialWageBoost}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{course.nearestCenter}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500">
                      {course.availableSeats} seats remaining
                    </span>
                    <button
                      type="button"
                      onClick={() => enrollInBridgeCourse(course.id)}
                      disabled={isEnrolled}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        isEnrolled
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-default'
                          : 'bg-navy-800 text-white hover:bg-navy-700 shadow-sm'
                      }`}
                    >
                      {isEnrolled ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Enrolled (Voucher Issued)
                        </>
                      ) : (
                        <>
                          Claim Free Bridge Voucher <ArrowRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QR ID Card Modal */}
        <QrModal
          trainee={activeTrainee}
          isOpen={isQrOpen}
          onClose={() => setIsQrOpen(false)}
        />
      </div>
    </MobileFrame>
  );
};
