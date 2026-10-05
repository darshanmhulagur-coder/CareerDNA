import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserRole,
  TraineeProfile,
  VerificationClaim,
  TrainingProviderScorecard,
  PredictiveBridgeCourse,
  IndiaStateMetric,
  EmploymentType,
  LongitudinalMilestone,
} from '../types/sih';
import {
  INITIAL_TRAINEE,
  SAMPLE_TRAINEES,
  INITIAL_VERIFICATION_CLAIMS,
  TRAINING_PROVIDERS_SCORECARD,
  INDIA_STATES_DATA,
  PREDICTIVE_BRIDGE_COURSES,
  UNEMPLOYED_ROOT_CAUSES,
  SKILL_GAP_MATRIX,
} from '../data/sihMockData';

interface MahaTrackingContextType {
  // Navigation & Role
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  fontScale: 'normal' | 'large' | 'larger';
  setFontScale: (scale: 'normal' | 'large' | 'larger') => void;
  mobilePreviewMode: boolean;
  setMobilePreviewMode: (val: boolean) => void;

  // Trainee Management
  activeTrainee: TraineeProfile;
  allTrainees: TraineeProfile[];
  switchTrainee: (id: string) => void;
  toggleAadhaarConsent: () => void;
  updateEmploymentStatus: (data: {
    employmentType: EmploymentType;
    employerName?: string;
    jobRole?: string;
    workLocation?: string;
    salary?: number;
    uanNumber?: string;
    udyamOrGstin?: string;
    documentType: 'OFFER_LETTER' | 'PAYSLIP' | 'UDYAM_CERT' | 'BANK_STATEMENT';
    documentName: string;
  }) => void;
  submitUnemployedSurvey: (data: {
    rootCauses: string[];
    otherReason?: string;
    preferredLocations: string[];
    minExpectedSalary: number;
    requestedSupport: 'Bridge Course' | 'Job Fair' | 'Counseling';
  }) => void;

  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (val: boolean) => void;
  registerNewTrainee: (data: {
    fullName: string;
    phone: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    state: string;
    district: string;
    trainingCenterName: string;
    courseName: string;
    sector: string;
    certificationDate: string;
    aadhaarLast4?: string;
    baselineSalary?: number;
    employmentType?: EmploymentType;
    currentSalary?: number;
    employerName?: string;
    jobRole?: string;
  }) => TraineeProfile;

  // Verification Engine
  claims: VerificationClaim[];
  selectedClaim: VerificationClaim | null;
  setSelectedClaim: (claim: VerificationClaim | null) => void;
  isClaimModalOpen: boolean;
  setIsClaimModalOpen: (val: boolean) => void;
  verifyClaim: (claimId: string, status: 'APPROVED' | 'REJECTED' | 'FLAGGED', remarks?: string) => void;
  batchApproveHighTrustClaims: () => void;

  // TP Management
  scorecards: TrainingProviderScorecard[];
  releaseTpTranche: (tpId: string) => void;

  // AI & Bridge Upskilling
  predictiveCourses: PredictiveBridgeCourse[];
  enrolledCourses: string[];
  enrollInBridgeCourse: (courseId: string) => void;

  // Analytics Filters & State
  selectedState: IndiaStateMetric | null;
  setSelectedState: (state: IndiaStateMetric | null) => void;
  filterSector: string;
  setFilterSector: (s: string) => void;
  filterZone: string;
  setFilterZone: (z: string) => void;
  filterCohort: string;
  setFilterCohort: (c: string) => void;
  filterGender: string;
  setFilterGender: (g: string) => void;

  // Reset
  resetToDefaults: () => void;
  
  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const MahaTrackingContext = createContext<MahaTrackingContextType | undefined>(undefined);

export const MahaTrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('admin');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'larger'>('normal');
  const [mobilePreviewMode, setMobilePreviewMode] = useState<boolean>(false);

  const [allTrainees, setAllTrainees] = useState<TraineeProfile[]>(SAMPLE_TRAINEES);
  const [activeTrainee, setActiveTrainee] = useState<TraineeProfile>(INITIAL_TRAINEE);

  const [claims, setClaims] = useState<VerificationClaim[]>(INITIAL_VERIFICATION_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState<VerificationClaim | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  const [scorecards, setScorecards] = useState<TrainingProviderScorecard[]>(TRAINING_PROVIDERS_SCORECARD);
  const [predictiveCourses, setPredictiveCourses] = useState<PredictiveBridgeCourse[]>(PREDICTIVE_BRIDGE_COURSES);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState<IndiaStateMetric | null>(INDIA_STATES_DATA[0]);
  const [filterSector, setFilterSector] = useState<string>('ALL');
  const [filterZone, setFilterZone] = useState<string>('ALL');
  const [filterCohort, setFilterCohort] = useState<string>('ALL');
  const [filterGender, setFilterGender] = useState<string>('ALL');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync body classes for accessibility
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.remove('font-large', 'font-larger');
    if (fontScale === 'large') document.body.classList.add('font-large');
    if (fontScale === 'larger') document.body.classList.add('font-larger');
  }, [fontScale]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const switchTrainee = (id: string) => {
    const found = allTrainees.find((t) => t.id === id);
    if (found) {
      setActiveTrainee(found);
      showToast(`Switched active profile to: ${found.fullName} (${found.utid})`);
    }
  };

  const toggleAadhaarConsent = () => {
    setActiveTrainee((prev) => {
      const nextConsent = !prev.aadhaarConsent;
      const updated = { ...prev, aadhaarConsent: nextConsent };
      showToast(
        nextConsent
          ? 'Aadhaar e-KYC consent enabled. Real-time EPFO & DBT linking active.'
          : 'Aadhaar consent revoked. Offline verification required.'
      );
      return updated;
    });
  };

  const registerNewTrainee = (data: {
    fullName: string;
    phone: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    state: string;
    district: string;
    trainingCenterName: string;
    courseName: string;
    sector: string;
    certificationDate: string;
    aadhaarLast4?: string;
    baselineSalary?: number;
    employmentType?: EmploymentType;
    currentSalary?: number;
    employerName?: string;
    jobRole?: string;
  }): TraineeProfile => {
    const year = new Date().getFullYear();
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const newUtid = `IN-MSDE-${year}-${randomId}`;

    const newProfile: TraineeProfile = {
      id: `tr-${Date.now()}`,
      utid: newUtid,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || `${data.fullName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      aadhaarMasked: data.aadhaarLast4 ? `XXXX-XXXX-${data.aadhaarLast4}` : 'XXXX-XXXX-8921',
      aadhaarConsent: true,
      gender: data.gender,
      state: data.state,
      district: data.district,
      zone: 'South',
      trainingCenterId: `TP-IN-${data.district.slice(0, 3).toUpperCase()}-001`,
      trainingCenterName: data.trainingCenterName,
      courseCode: `SKILL-${Math.floor(100 + Math.random() * 900)}`,
      courseName: data.courseName,
      sector: data.sector || 'Technical & Engineering Trades',
      cohortYear: `${year - 1}-${String(year).slice(2)}`,
      certificationDate: data.certificationDate || 'January 2025',
      employmentType: data.employmentType || 'UNEMPLOYED',
      employerName: data.employerName || '',
      jobRole: data.jobRole || '',
      workLocation: data.district,
      currentSalary: data.currentSalary || 0,
      baselineSalary: data.baselineSalary || 0,
      dbtStipendStatus: data.currentSalary && data.currentSalary > 0 ? 'Active' : 'Pending Bank Validation',
      dbtAmountPerMonth: 1500,
      dbtDisbursedMonths: 0,
      milestones: [
        {
          id: '3M',
          label: '3-Month Check-in',
          monthOffset: 3,
          targetDate: '3 Months Post-Cert',
          status: data.currentSalary && data.currentSalary > 0 ? 'PENDING_REVIEW' : 'ACTION_REQUIRED',
          trustScore: 'UNVERIFIED',
          verificationChannel: 'SELF_DECLARATION',
          salaryReported: data.currentSalary || 0,
          employerOrEnterprise: data.employerName,
          notes: 'Initial milestone open for verification.',
          bonusEligible: true,
        },
        {
          id: '6M',
          label: '6-Month Verification',
          monthOffset: 6,
          targetDate: '6 Months Post-Cert',
          status: 'UPCOMING',
          trustScore: 'UNVERIFIED',
          verificationChannel: 'SELF_DECLARATION',
          notes: 'Wage continuity check.',
          bonusEligible: true,
        },
        {
          id: '12M',
          label: '12-Month Audit',
          monthOffset: 12,
          targetDate: '12 Months Post-Cert',
          status: 'UPCOMING',
          trustScore: 'UNVERIFIED',
          verificationChannel: 'SELF_DECLARATION',
          notes: 'Annual retention audit.',
          bonusEligible: false,
        },
        {
          id: '24M',
          label: '24-Month Long-Term Track',
          monthOffset: 24,
          targetDate: '24 Months Post-Cert',
          status: 'UPCOMING',
          trustScore: 'UNVERIFIED',
          verificationChannel: 'SELF_DECLARATION',
          notes: 'Long-term livelihood progression tracking.',
          bonusEligible: false,
        },
      ],
    };

    setAllTrainees((prev) => [newProfile, ...prev]);
    setActiveTrainee(newProfile);
    setActiveRole('trainee');
    showToast(`Universal Trainee ID Generated: ${newUtid}! Welcome to your Trainee Portal, ${data.fullName}`);
    return newProfile;
  };

  const updateEmploymentStatus = (data: {
    employmentType: EmploymentType;
    employerName?: string;
    jobRole?: string;
    workLocation?: string;
    salary?: number;
    uanNumber?: string;
    udyamOrGstin?: string;
    documentType: 'OFFER_LETTER' | 'PAYSLIP' | 'UDYAM_CERT' | 'BANK_STATEMENT';
    documentName: string;
  }) => {
    const hasUan = Boolean(data.uanNumber && data.uanNumber.length >= 10);
    const hasUdyam = Boolean(data.udyamOrGstin && data.udyamOrGstin.length >= 8);
    const isHighTrust = hasUan || hasUdyam;
    const isMediumTrust = !isHighTrust && Boolean(data.documentName);

    // Update the active 12M milestone of the trainee
    const updatedMilestones: LongitudinalMilestone[] = activeTrainee.milestones.map((m) => {
      if (m.id === '12M') {
        return {
          ...m,
          status: 'PENDING_REVIEW',
          trustScore: isHighTrust ? 'HIGH' : isMediumTrust ? 'MEDIUM' : 'UNVERIFIED',
          verificationChannel: hasUan ? 'EPFO_API' : hasUdyam ? 'GSTIN_API' : 'DOCUMENT_OCR',
          salaryReported: data.salary || 23500,
          employerOrEnterprise: data.employerName || data.udyamOrGstin,
          documentName: data.documentName,
          notes: isHighTrust
            ? 'EPFO/GSTIN validation query queued. Confidence score: 98%.'
            : 'Document OCR processed. Awaiting Central Verifier review.',
        };
      }
      return m;
    });

    const updatedProfile: TraineeProfile = {
      ...activeTrainee,
      employmentType: data.employmentType,
      employerName: data.employerName || (data.employmentType === 'SELF_EMPLOYED' ? 'Proprietor / Micro-Enterprise' : ''),
      jobRole: data.jobRole || '',
      workLocation: data.workLocation || activeTrainee.district,
      currentSalary: data.salary || activeTrainee.currentSalary,
      uanNumber: data.uanNumber || activeTrainee.uanNumber,
      udyamOrGstin: data.udyamOrGstin || activeTrainee.udyamOrGstin,
      milestones: updatedMilestones,
    };

    setActiveTrainee(updatedProfile);
    setAllTrainees((prev) => prev.map((t) => (t.id === updatedProfile.id ? updatedProfile : t)));

    // Create a new claim in the Admin Verification Queue
    const newClaim: VerificationClaim = {
      id: `CLM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      utid: activeTrainee.utid,
      candidateName: activeTrainee.fullName,
      candidatePhone: activeTrainee.phone,
      state: activeTrainee.state,
      district: activeTrainee.district,
      trainingProvider: activeTrainee.trainingCenterName,
      course: activeTrainee.courseName,
      sector: activeTrainee.sector,
      milestone: '12M',
      employmentType: data.employmentType,
      employerName: data.employerName || 'Self-Employed Venture',
      jobRole: data.jobRole || 'Technician Specialist',
      salary: data.salary || 23500,
      location: data.workLocation || activeTrainee.district,
      uan: data.uanNumber,
      udyamOrGstin: data.udyamOrGstin,
      documentType: data.documentType,
      documentUrl: data.documentName,
      submissionDate: new Date().toISOString().split('T')[0],
      trustScore: isHighTrust ? 'HIGH' : isMediumTrust ? 'MEDIUM' : 'UNVERIFIED',
      trustReason: isHighTrust
        ? 'Active EPFO UAN detected with regular matching PF contributions.'
        : 'Uploaded document OCR scanned with 95.4% confidence match.',
      epfoVerification: {
        matched: isHighTrust,
        establishmentCode: isHighTrust ? 'KN/BNG/0048291/000' : undefined,
        establishmentName: isHighTrust ? (data.employerName?.toUpperCase() || 'REGISTERED ESTABLISHMENT') : undefined,
        lastContributedMonth: isHighTrust ? 'Current Cycle' : undefined,
        confidence: isHighTrust ? 98.8 : 0,
      },
      ocrConfidence: {
        overallScore: isHighTrust ? 98 : 95.2,
        detectedEmployer: data.employerName || 'Business Unit',
        detectedSalary: data.salary || 23500,
        detectedDate: new Date().toLocaleDateString('en-GB'),
        fieldsMatched: ['Trainee Name', 'Monthly Wages', 'Company Stamp'],
      },
      status: 'PENDING',
    };

    setClaims((prev) => [newClaim, ...prev]);

    showToast(
      `Employment claim submitted successfully! Milestone 12M marked for verification (${newClaim.trustScore} Trust).`
    );
  };

  const submitUnemployedSurvey = (data: {
    rootCauses: string[];
    otherReason?: string;
    preferredLocations: string[];
    minExpectedSalary: number;
    requestedSupport: 'Bridge Course' | 'Job Fair' | 'Counseling';
  }) => {
    const updatedMilestones: LongitudinalMilestone[] = activeTrainee.milestones.map((m) => {
      if (m.id === '12M') {
        return {
          ...m,
          status: 'PENDING_REVIEW',
          trustScore: 'UNVERIFIED',
          verificationChannel: 'SELF_DECLARATION',
          salaryReported: 0,
          notes: `Unemployed survey recorded (${data.rootCauses.length} root causes cited). Assigned to National Remedial Desk.`,
        };
      }
      return m;
    });

    const updatedProfile: TraineeProfile = {
      ...activeTrainee,
      employmentType: 'UNEMPLOYED',
      employerName: '',
      jobRole: '',
      currentSalary: 0,
      milestones: updatedMilestones,
      unemployedSurvey: {
        ...data,
        submittedAt: new Date().toLocaleDateString('en-GB'),
      },
    };

    setActiveTrainee(updatedProfile);
    setAllTrainees((prev) => prev.map((t) => (t.id === updatedProfile.id ? updatedProfile : t)));

    showToast(
      'Skill deficit survey submitted. AI bridge course recommendations have been generated for you.'
    );
  };

  const verifyClaim = (
    claimId: string,
    status: 'APPROVED' | 'REJECTED' | 'FLAGGED',
    remarks?: string
  ) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          return {
            ...c,
            status,
            reviewerRemarks: remarks || (status === 'APPROVED' ? 'Approved by Verification Officer' : 'Flagged for re-verification'),
            reviewedAt: new Date().toLocaleDateString('en-GB'),
          };
        }
        return c;
      })
    );

    const targetClaim = claims.find((c) => c.id === claimId);
    if (targetClaim && targetClaim.utid === activeTrainee.utid) {
      setActiveTrainee((prev) => ({
        ...prev,
        milestones: prev.milestones.map((m) => {
          if (m.id === targetClaim.milestone) {
            return {
              ...m,
              status: status === 'APPROVED' ? 'VERIFIED' : status === 'REJECTED' ? 'FLAGGED' : 'ACTION_REQUIRED',
            };
          }
          return m;
        }),
      }));
    }

    showToast(
      status === 'APPROVED'
        ? `Claim ${claimId} successfully verified & approved.`
        : status === 'FLAGGED'
        ? `Claim ${claimId} flagged. SMS notification sent to candidate.`
        : `Claim ${claimId} rejected.`
    );
  };

  const batchApproveHighTrustClaims = () => {
    const pendingHighTrust = claims.filter((c) => c.status === 'PENDING' && c.trustScore === 'HIGH');
    if (pendingHighTrust.length === 0) {
      showToast('No pending High-Trust claims found.');
      return;
    }

    setClaims((prev) =>
      prev.map((c) => {
        if (c.status === 'PENDING' && c.trustScore === 'HIGH') {
          return {
            ...c,
            status: 'APPROVED',
            reviewerRemarks: 'Auto-approved via Automated EPFO/GSTIN High Trust Engine',
            reviewedAt: new Date().toLocaleDateString('en-GB'),
          };
        }
        return c;
      })
    );

    showToast(`Batch approved ${pendingHighTrust.length} High-Trust EPFO/GSTIN claims across India!`);
  };

  const releaseTpTranche = (tpId: string) => {
    setScorecards((prev) =>
      prev.map((tp) => {
        if (tp.id === tpId) {
          return {
            ...tp,
            fundDisbursementStatus: 'TRANCHE_RELEASED',
          };
        }
        return tp;
      })
    );
    const tp = scorecards.find((t) => t.id === tpId);
    showToast(
      `Central fund tranche of ₹${(tp?.currentTrancheAmount || 0).toLocaleString('en-IN')} approved & released for ${tp?.name}!`
    );
  };

  const enrollInBridgeCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses((prev) => [...prev, courseId]);
      setPredictiveCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, enrolledTrainees: c.enrolledTrainees + 1, availableSeats: Math.max(0, c.availableSeats - 1) } : c))
      );
      const course = predictiveCourses.find((c) => c.id === courseId);
      showToast(`National Bridge Course Voucher generated! Enrolled in: ${course?.title}`);
    } else {
      showToast('You are already enrolled in this bridge course.');
    }
  };

  const resetToDefaults = () => {
    setActiveTrainee(INITIAL_TRAINEE);
    setAllTrainees(SAMPLE_TRAINEES);
    setClaims(INITIAL_VERIFICATION_CLAIMS);
    setScorecards(TRAINING_PROVIDERS_SCORECARD);
    setPredictiveCourses(PREDICTIVE_BRIDGE_COURSES);
    setEnrolledCourses([]);
    setSelectedState(INDIA_STATES_DATA[0]);
    showToast('Platform reset to national All-India demonstration dataset.');
  };

  const value = useMemo(
    () => ({
      activeRole,
      setActiveRole,
      highContrast,
      setHighContrast,
      fontScale,
      setFontScale,
      mobilePreviewMode,
      setMobilePreviewMode,
      activeTrainee,
      allTrainees,
      switchTrainee,
      toggleAadhaarConsent,
      updateEmploymentStatus,
      submitUnemployedSurvey,
      claims,
      selectedClaim,
      setSelectedClaim,
      isClaimModalOpen,
      setIsClaimModalOpen,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      registerNewTrainee,
      verifyClaim,
      batchApproveHighTrustClaims,
      scorecards,
      releaseTpTranche,
      predictiveCourses,
      enrolledCourses,
      enrollInBridgeCourse,
      selectedState,
      setSelectedState,
      filterSector,
      setFilterSector,
      filterZone,
      setFilterZone,
      filterCohort,
      setFilterCohort,
      filterGender,
      setFilterGender,
      resetToDefaults,
      toastMessage,
      showToast,
    }),
    [
      activeRole,
      highContrast,
      fontScale,
      mobilePreviewMode,
      activeTrainee,
      allTrainees,
      claims,
      selectedClaim,
      isClaimModalOpen,
      isRegisterModalOpen,
      scorecards,
      predictiveCourses,
      enrolledCourses,
      selectedState,
      filterSector,
      filterZone,
      filterCohort,
      filterGender,
      toastMessage,
    ]
  );

  return (
    <MahaTrackingContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex max-w-md items-center gap-3 rounded-xl border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white shadow-elevated transition-all"
        >
          <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-saffron-500 animate-ping" />
          <span className="flex-1 font-medium">{toastMessage}</span>
        </div>
      )}
    </MahaTrackingContext.Provider>
  );
};

export const useMahaTracking = () => {
  const context = useContext(MahaTrackingContext);
  if (!context) {
    throw new Error('useMahaTracking must be used within a MahaTrackingProvider');
  }
  return context;
};
