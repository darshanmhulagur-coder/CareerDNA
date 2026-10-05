import React, { useState } from 'react';
import {
  Briefcase,
  Store,
  GraduationCap,
  Search,
  Upload,
  CheckCircle2,
  FileCheck2,
  FileText,
  AlertCircle,
  HelpCircle,
  IndianRupee,
  Building2,
  MapPin,
  Sparkles,
  Send,
  Loader2,
  Check,
} from 'lucide-react';
import { EmploymentType } from '../../types/sih';
import { useMahaTracking } from '../../context/MahaTrackingContext';

export const EmploymentUpdateForm: React.FC = () => {
  const { activeTrainee, updateEmploymentStatus, submitUnemployedSurvey, showToast } = useMahaTracking();

  const [employmentType, setEmploymentType] = useState<EmploymentType>(activeTrainee.employmentType || 'FULL_TIME');
  const [employerName, setEmployerName] = useState<string>(activeTrainee.employerName || 'Tata Motors Precision Components Ltd');
  const [jobRole, setJobRole] = useState<string>(activeTrainee.jobRole || 'Senior CNC Operator');
  const [workLocation, setWorkLocation] = useState<string>(activeTrainee.workLocation || 'Bhosari MIDC, Pune');
  const [salary, setSalary] = useState<number>(activeTrainee.currentSalary || 23500);
  const [uanNumber, setUanNumber] = useState<string>(activeTrainee.uanNumber || '101928475630');
  const [udyamOrGstin, setUdyamOrGstin] = useState<string>(activeTrainee.udyamOrGstin || 'UDYAM-MH-26-0034182');

  // Document Upload & OCR Simulation State
  const [uploadedFile, setUploadedFile] = useState<string | null>('Salary_Slip_Latest_Q3.pdf');
  const [documentType, setDocumentType] = useState<'OFFER_LETTER' | 'PAYSLIP' | 'UDYAM_CERT' | 'BANK_STATEMENT'>('PAYSLIP');
  const [isScanningOcr, setIsScanningOcr] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<{
    confidence: number;
    detectedEmployer: string;
    detectedSalary: number;
    fieldsMatched: string[];
  } | null>({
    confidence: 96.8,
    detectedEmployer: 'Tata Motors Precision Components Ltd',
    detectedSalary: 23500,
    fieldsMatched: ['Employer Registered Name', 'Gross Pay ₹23,500', 'PF Deduction', 'UAN Number'],
  });

  // Unemployed Survey State
  const [selectedRootCauses, setSelectedRootCauses] = useState<string[]>([
    'Lack of practical technical skills / Hands-on machine lab',
  ]);
  const [unemployedOtherReason, setUnemployedOtherReason] = useState<string>('');
  const [preferredLocations, setPreferredLocations] = useState<string[]>([activeTrainee.district]);
  const [minExpectedSalary, setMinExpectedSalary] = useState<number>(18000);
  const [requestedSupport, setRequestedSupport] = useState<'Bridge Course' | 'Job Fair' | 'Counseling'>('Bridge Course');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-calculated wage growth percentage vs pre-training baseline
  const baseline = activeTrainee.baselineSalary || 11000;
  const wageGrowthPct = baseline > 0 && salary > 0 ? Math.round(((salary - baseline) / baseline) * 100) : 0;

  const handleSimulateFileUpload = (docName: string, docType: 'OFFER_LETTER' | 'PAYSLIP' | 'UDYAM_CERT') => {
    setUploadedFile(docName);
    setDocumentType(docType);
    setIsScanningOcr(true);
    setOcrResult(null);

    // Simulate OCR scanning delay
    setTimeout(() => {
      setIsScanningOcr(false);
      setOcrResult({
        confidence: 97.4,
        detectedEmployer: employerName || 'Automotive Enterprise India Ltd',
        detectedSalary: salary || 22000,
        fieldsMatched: ['Establishment Name', 'Gross Wages', 'PAN & UAN Match', 'Tax Deductions'],
      });
      showToast('Document scanned with State OCR Engine: 97.4% match confidence!');
    }, 1200);
  };

  const handleRootCauseToggle = (cause: string) => {
    setSelectedRootCauses((prev) =>
      prev.includes(cause) ? prev.filter((c) => c !== cause) : [...prev, cause]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (employmentType === 'UNEMPLOYED') {
        submitUnemployedSurvey({
          rootCauses: selectedRootCauses,
          otherReason: unemployedOtherReason,
          preferredLocations,
          minExpectedSalary,
          requestedSupport,
        });
      } else {
        updateEmploymentStatus({
          employmentType,
          employerName: employmentType === 'SELF_EMPLOYED' ? (employerName || 'Micro-Enterprise') : employerName,
          jobRole,
          workLocation,
          salary,
          uanNumber: employmentType === 'FULL_TIME' || employmentType === 'APPRENTICESHIP' ? uanNumber : undefined,
          udyamOrGstin: employmentType === 'SELF_EMPLOYED' ? udyamOrGstin : undefined,
          documentType,
          documentName: uploadedFile || 'Employment_Claim_Document.pdf',
        });
      }
    }, 800);
  };

  return (
    <div className="gov-card p-4 sm:p-6 space-y-6">
      {/* Title & Context */}
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-saffron-600 uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4" />
          Milestone Verification Form (12-Month Audit)
        </div>
        <h2 className="text-base sm:text-lg font-bold text-navy-900 mt-0.5">
          Submit Employment & Income Status Update
        </h2>
        <p className="text-xs text-slate-500">
          National audits verify active retention, real wage growth, and identify need for bridge upskilling.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Employment Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
            1. Select Current Employment Status
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              {
                id: 'FULL_TIME' as EmploymentType,
                title: 'Corporate / Formal',
                subtitle: 'Full-Time Payroll',
                icon: Briefcase,
                color: 'text-blue-600',
              },
              {
                id: 'SELF_EMPLOYED' as EmploymentType,
                title: 'Self-Employed',
                subtitle: 'Udyam / Micro-Enterprise',
                icon: Store,
                color: 'text-emerald-600',
              },
              {
                id: 'APPRENTICESHIP' as EmploymentType,
                title: 'Apprenticeship',
                subtitle: 'NAPS / NEEM Scheme',
                icon: GraduationCap,
                color: 'text-purple-600',
              },
              {
                id: 'UNEMPLOYED' as EmploymentType,
                title: 'Seeking Job',
                subtitle: 'Skill Gap Survey',
                icon: Search,
                color: 'text-rose-600',
              },
            ].map((type) => {
              const Icon = type.icon;
              const isSelected = employmentType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEmploymentType(type.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-navy-800 bg-navy-50/70 shadow-sm ring-2 ring-navy-800'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-navy-900' : type.color}`} />
                  <span className="text-xs font-bold text-slate-900">{type.title}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{type.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Fields for Corporate, Self-Employed, or Apprenticeship */}
        {employmentType !== 'UNEMPLOYED' ? (
          <div className="space-y-4 rounded-xl bg-slate-50/70 p-4 border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Employer / Enterprise Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {employmentType === 'SELF_EMPLOYED' ? 'Enterprise / Business Name *' : 'Employer / Company Name *'}
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder={
                      employmentType === 'SELF_EMPLOYED'
                        ? 'e.g. Deshmukh Precision Works'
                        : 'e.g. Tata Motors Ltd, Pune'
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                </div>
                {employmentType === 'FULL_TIME' && (
                  <div className="flex gap-1.5 mt-1.5 text-[10px] text-slate-500">
                    <span className="text-slate-400">Quick autofill:</span>
                    <button
                      type="button"
                      onClick={() => setEmployerName('Tata Motors Ltd, Pune')}
                      className="text-navy-700 underline hover:text-navy-900"
                    >
                      Tata Motors
                    </button>
                    •
                    <button
                      type="button"
                      onClick={() => setEmployerName('Bajaj Auto Chakan')}
                      className="text-navy-700 underline hover:text-navy-900"
                    >
                      Bajaj Auto
                    </button>
                    •
                    <button
                      type="button"
                      onClick={() => setEmployerName('Infosys Pune')}
                      className="text-navy-700 underline hover:text-navy-900"
                    >
                      Infosys
                    </button>
                  </div>
                )}
              </div>

              {/* Job Role / Trade Role */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {employmentType === 'SELF_EMPLOYED' ? 'Primary Business Activity *' : 'Designation / Job Role *'}
                </label>
                <input
                  type="text"
                  required
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Senior CNC Milling Operator"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              {/* Monthly Salary / Income */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700">
                    {employmentType === 'SELF_EMPLOYED' ? 'Average Net Monthly Profit (₹) *' : 'Monthly Gross Salary (₹) *'}
                  </label>
                  {wageGrowthPct > 0 && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      +{wageGrowthPct}% Wage Growth vs Baseline
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm font-semibold"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Pre-training baseline: ₹{baseline.toLocaleString('en-IN')}/month
                </span>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Work Location / MIDC Industrial Cluster *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    placeholder="e.g. Bhosari MIDC, Pune"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Verification Anchor: EPFO UAN or Udyam / GSTIN */}
            <div className="pt-3 border-t border-slate-200">
              {employmentType === 'SELF_EMPLOYED' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      Udyam Registration Number or GSTIN (For High-Trust Verification)
                    </label>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      GSTIN API Linked
                    </span>
                  </div>
                  <input
                    type="text"
                    value={udyamOrGstin}
                    onChange={(e) => setUdyamOrGstin(e.target.value)}
                    placeholder="e.g. UDYAM-MH-26-0034182 or 27AAAAA0000A1Z5"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Udyam registration automatically confirms self-employment legitimacy with MSME database.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      EPFO Universal Account Number (UAN) (12 Digits)
                    </label>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      Direct EPFO API Check
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={12}
                    value={uanNumber}
                    onChange={(e) => setUanNumber(e.target.value)}
                    placeholder="e.g. 101928475630"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Providing your UAN grants instant <strong>High-Trust</strong> status via automated EPFO contribution records.
                  </p>
                </div>
              )}
            </div>

            {/* Document Upload Zone with Simulated OCR Scanner */}
            <div className="pt-3 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                Document Evidence & Live OCR Scanner
              </label>

              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-4 hover:border-slate-400 transition text-center">
                {isScanningOcr ? (
                  <div className="py-4 flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="w-8 h-8 text-saffron-600 animate-spin" />
                    <div className="text-xs font-semibold text-slate-800">
                      Processing Document via National OCR Verification Engine...
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Extracting establishment name, wage slip breakdown, and digital signatures.
                    </div>
                  </div>
                ) : uploadedFile ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-900">{uploadedFile}</div>
                        <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Document Verified • OCR Confidence {ocrResult?.confidence || 96.8}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSimulateFileUpload('Payslip_August2025_Updated.pdf', 'PAYSLIP')}
                        className="text-xs text-navy-800 hover:underline font-medium"
                      >
                        Re-upload Proof
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 flex flex-col items-center">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <div className="text-xs font-medium text-slate-700">
                      Drag & drop your Offer Letter, Payslip, or Udyam Certificate
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG (Max 5MB)</div>

                    {/* Quick Demo Upload Triggers */}
                    <div className="mt-3 flex flex-wrap gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => handleSimulateFileUpload('TataMotors_Payslip_Q3.pdf', 'PAYSLIP')}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded border text-slate-700"
                      >
                        + Upload Demo Payslip
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSimulateFileUpload('Udyam_MSME_Certificate.pdf', 'UDYAM_CERT')}
                        className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded border text-slate-700"
                      >
                        + Upload Demo Udyam Certificate
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* OCR Match Summary Badge */}
              {ocrResult && (
                <div className="mt-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg p-2.5 text-xs">
                  <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    OCR Match Passed: {ocrResult.fieldsMatched.join(' • ')}
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">
                    Detected Employer: <strong>{ocrResult.detectedEmployer}</strong> | Scanned Gross Wage: <strong>₹{ocrResult.detectedSalary.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Unemployed Flow: Interactive Root Cause Survey */
          <div className="space-y-4 rounded-xl bg-rose-50/50 p-4 border border-rose-200">
            <div className="border-b border-rose-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Non-Placement & Skill Deficit Diagnostic Survey
              </div>
              <p className="text-xs text-rose-700 mt-0.5">
                Your feedback directly informs curriculum changes and unlocks free state bridge courses.
              </p>
            </div>

            {/* Checkbox Survey of Root Causes */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-2">
                Why have you not secured employment yet? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Lack of practical technical skills / Hands-on machine lab',
                  'Relocation constraints (Cannot move outside home district/taluka)',
                  'Offered entry wages below market living cost (< ₹12,000/mo)',
                  'English fluency & HR interview communication barrier',
                  'Family / Domestic caregiving obligations',
                  'Preparing for Government / Competitive examinations (UPSC / SSC / State PSC)',
                  'Lack of reliable public transportation to industrial area',
                ].map((reason) => {
                  const isChecked = selectedRootCauses.includes(reason);
                  return (
                    <label
                      key={reason}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition ${
                        isChecked
                          ? 'bg-rose-100/60 border-rose-400 text-rose-950 font-medium'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleRootCauseToggle(reason)}
                        className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="leading-tight">{reason}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Preferred Working District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Preferred Working Region in India
                </label>
                <select
                  value={preferredLocations[0] || 'Bengaluru'}
                  onChange={(e) => setPreferredLocations([e.target.value])}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="Bengaluru">Bengaluru & Hosur Tech Cluster</option>
                  <option value="Pune / Mumbai">Pune & Mumbai Industrial Belt</option>
                  <option value="Delhi NCR">Delhi NCR (Noida / Gurugram)</option>
                  <option value="Chennai">Chennai & Sriperumbudur</option>
                  <option value="Hyderabad">Hyderabad Genome Valley & IT Corridor</option>
                  <option value="Ahmedabad">Ahmedabad & Sanand GIDC</option>
                  <option value="Home District Only">Home District Only (Within 25km)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Minimum Acceptable Monthly Salary (₹)
                </label>
                <input
                  type="number"
                  min={8000}
                  step={1000}
                  value={minExpectedSalary}
                  onChange={(e) => setMinExpectedSalary(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Desired Remedial State Action */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide mb-1.5">
                Which State Government assistance do you need immediately?
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Bridge Course', 'Job Fair', 'Counseling'] as const).map((support) => (
                  <button
                    key={support}
                    type="button"
                    onClick={() => setRequestedSupport(support)}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition ${
                      requestedSupport === support
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {support === 'Bridge Course'
                      ? 'Free Bridge Course (30-60 Hrs)'
                      : support === 'Job Fair'
                      ? 'Local MahaRojgar Job Fair Pass'
                      : 'District Officer Counseling'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-400">
            Protected under Digital Personal Data Protection (DPDP) Act 2023 & MSDE Policy
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-navy-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-600 shadow-md transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Status...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-saffron-400" />
                {employmentType === 'UNEMPLOYED'
                  ? 'Submit Diagnostic & Request Bridge Course'
                  : 'Submit Employment Verification Claim'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
