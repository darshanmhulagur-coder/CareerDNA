import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ShieldCheck,
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';
import { EmploymentType } from '../../types/sih';

export const TraineeRegistrationModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, registerNewTrainee } = useMahaTracking();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [state, setState] = useState('Karnataka');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [trainingCenterName, setTrainingCenterName] = useState('Government ITI / NSTI Bengaluru');
  const [courseName, setCourseName] = useState('CNC Machine Operator & Programmer');
  const [sector, setSector] = useState('Capital Goods & Precision Engineering');
  const [certificationDate, setCertificationDate] = useState('January 2025');
  const [aadhaarLast4, setAadhaarLast4] = useState('4819');
  const [baselineSalary, setBaselineSalary] = useState(0);

  // Initial employment state
  const [employmentType, setEmploymentType] = useState<EmploymentType>('UNEMPLOYED');
  const [employerName, setEmployerName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [currentSalary, setCurrentSalary] = useState(0);

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    registerNewTrainee({
      fullName,
      phone: phone || '+91 98765 43210',
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      gender,
      state,
      district,
      trainingCenterName: trainingCenterName || 'National Skill Training Institute',
      courseName: courseName || 'Vocational Trade Specialist',
      sector: sector || 'Technical & Engineering Trades',
      certificationDate: certificationDate || 'January 2025',
      aadhaarLast4: aadhaarLast4 || '8921',
      baselineSalary,
      employmentType,
      currentSalary: employmentType !== 'UNEMPLOYED' ? currentSalary : 0,
      employerName: employmentType !== 'UNEMPLOYED' ? employerName : '',
      jobRole: employmentType !== 'UNEMPLOYED' ? jobRole : '',
    });

    setIsRegisterModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-5 sm:p-6 shadow-elevated border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-800 text-xs font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-saffron-600" />
              Skill India Digital Hub • MSDE
            </div>
            <h2 className="text-base sm:text-lg font-bold text-navy-950 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-navy-800" />
              Register As Trainee / Add Your Training Data
            </h2>
            <p className="text-xs text-slate-500">
              Enter your certified course details to generate a unique Universal Trainee ID (UTID) and access your personalized tracking portal.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
          {/* Section 1: Candidate Personal Info */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span>1. Trainee Personal Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Darshan Kumar / Ananya Rao"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Mobile Number (Linked with Aadhaar) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98450 12345"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Email ID</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. darshan.k@gmail.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Gender</label>
                <div className="flex gap-2 pt-1">
                  {(['Male', 'Female', 'Other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border font-medium text-xs transition ${
                        gender === g
                          ? 'bg-navy-800 text-white border-navy-900 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Training & Course Certification Details */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-saffron-600" />
              <span>2. Completed Training & Institute Info</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">State *</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Bihar">Bihar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">District / City *</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Bengaluru Urban, Mysuru, Pune, etc."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Training Institute / ITI / Center Name *</label>
                <input
                  type="text"
                  required
                  value={trainingCenterName}
                  onChange={(e) => setTrainingCenterName(e.target.value)}
                  placeholder="e.g. Govt ITI Peenya / NSTI / Apex Skill Center"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Course / Certified Trade *</label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. CNC Machine Operator / Solar PV Installer / Web Developer"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Industrial Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                >
                  <option value="Capital Goods & Precision Engineering">Capital Goods & Automotive</option>
                  <option value="IT & ITeS">IT & Software Development</option>
                  <option value="Renewable Energy & Solar">Renewable Energy & Green Tech</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Paramedical</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                  <option value="Textile & Apparel">Textile & Apparel</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Certification Month & Year</label>
                <input
                  type="text"
                  value={certificationDate}
                  onChange={(e) => setCertificationDate(e.target.value)}
                  placeholder="e.g. January 2025"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Aadhaar Consent & Baseline Salary */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>3. Identity Verification & Current Status</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Last 4 Digits of Aadhaar</label>
                <input
                  type="text"
                  maxLength={4}
                  value={aadhaarLast4}
                  onChange={(e) => setAadhaarLast4(e.target.value)}
                  placeholder="e.g. 4819"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Pre-Training Monthly Income (₹)</label>
                <input
                  type="number"
                  min={0}
                  value={baselineSalary}
                  onChange={(e) => setBaselineSalary(Number(e.target.value))}
                  placeholder="e.g. 0 or 8000"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Current Placement Status</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                >
                  <option value="UNEMPLOYED">Seeking Job / Unemployed</option>
                  <option value="FULL_TIME">Employed in Company (Corporate)</option>
                  <option value="SELF_EMPLOYED">Self-Employed / Entrepreneur</option>
                  <option value="APPRENTICESHIP">Apprenticeship (NAPS)</option>
                </select>
              </div>
            </div>

            {/* If already employed, ask for quick employer & salary */}
            {employmentType !== 'UNEMPLOYED' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Current Employer / Shop Name</label>
                  <input
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="e.g. Titan Engineering / Self Shop"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Job Role</label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g. Junior CNC Technician"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Current Monthly Salary (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(Number(e.target.value))}
                    placeholder="e.g. 22000"
                    className="w-full px-3 py-2 text-xs font-mono font-bold text-emerald-800 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-navy-600 shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Your Universal Trainee ID will be generated upon submission.
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-navy-800 text-white font-bold text-xs hover:bg-navy-700 shadow-sm transition flex items-center gap-2"
              >
                <span>Generate UTID & Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5 text-saffron-400" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
