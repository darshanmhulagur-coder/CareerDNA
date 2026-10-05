export type UserRole = 'trainee' | 'tp' | 'admin';

export type EmploymentType =
  | 'FULL_TIME'
  | 'SELF_EMPLOYED'
  | 'APPRENTICESHIP'
  | 'UNEMPLOYED';

export type MilestoneId = '3M' | '6M' | '12M' | '24M';

export type MilestoneStatus =
  | 'VERIFIED'
  | 'PENDING_REVIEW'
  | 'UPCOMING'
  | 'ACTION_REQUIRED'
  | 'FLAGGED';

export type TrustScore = 'HIGH' | 'MEDIUM' | 'UNVERIFIED';

export type VerificationChannel =
  | 'EPFO_API'
  | 'GSTIN_API'
  | 'DOCUMENT_OCR'
  | 'SELF_DECLARATION';

export interface LongitudinalMilestone {
  id: MilestoneId;
  label: string; // e.g. "3-Month Check-in"
  monthOffset: number; // 3, 6, 12, 24
  targetDate: string; // e.g. "Nov 2024"
  status: MilestoneStatus;
  trustScore: TrustScore;
  verificationChannel: VerificationChannel;
  verifiedAt?: string;
  salaryReported?: number;
  employerOrEnterprise?: string;
  documentName?: string;
  notes?: string;
  bonusEligible?: boolean;
}

export interface TraineeProfile {
  id: string;
  utid: string; // e.g. "IN-MSDE-2024-884920"
  fullName: string;
  phone: string;
  email: string;
  aadhaarMasked: string; // "XXXX-XXXX-4819"
  aadhaarConsent: boolean;
  gender: 'Male' | 'Female' | 'Other';
  state: string; // e.g. "Karnataka", "Maharashtra", "Tamil Nadu"
  district: string; // e.g. "Bengaluru Urban", "Pune", "Chennai"
  zone: 'South' | 'West' | 'North' | 'East' | 'Central';
  trainingCenterId: string;
  trainingCenterName: string;
  courseCode: string;
  courseName: string; // e.g. "CNC Machine Operator & Programmer"
  sector: string; // e.g. "Capital Goods & Automotive", "IT & ITeS"
  cohortYear: string; // "2024-25"
  certificationDate: string;
  
  // Current employment state
  employmentType: EmploymentType;
  employerName: string;
  jobRole: string;
  workLocation: string; // City / State
  currentSalary: number; // Monthly in INR
  baselineSalary: number; // Pre-training monthly wage in INR
  uanNumber?: string; // 12-digit EPFO UAN
  udyamOrGstin?: string; // Udyam or GSTIN for entrepreneur
  
  // Direct Benefit Transfer (DBT) post-placement support
  dbtStipendStatus: 'Active' | 'Disbursed' | 'Pending Bank Validation';
  dbtAmountPerMonth: number;
  dbtDisbursedMonths: number;
  
  // Longitudinal Track
  milestones: LongitudinalMilestone[];
  
  // Unemployed survey feedback if currently unplaced
  unemployedSurvey?: {
    rootCauses: string[];
    otherReason?: string;
    preferredLocations: string[];
    minExpectedSalary: number;
    requestedSupport: 'Bridge Course' | 'Job Fair' | 'Counseling';
    submittedAt: string;
  };
}

export interface VerificationClaim {
  id: string;
  utid: string;
  candidateName: string;
  candidatePhone: string;
  state: string;
  district: string;
  trainingProvider: string;
  course: string;
  sector: string;
  milestone: MilestoneId;
  employmentType: EmploymentType;
  employerName: string;
  jobRole: string;
  salary: number;
  location: string;
  uan?: string;
  udyamOrGstin?: string;
  documentType: 'OFFER_LETTER' | 'PAYSLIP' | 'UDYAM_CERT' | 'BANK_STATEMENT';
  documentUrl: string;
  submissionDate: string;
  
  // Trust & Automated Signal Scoring
  trustScore: TrustScore;
  trustReason: string;
  epfoVerification: {
    matched: boolean;
    establishmentCode?: string;
    establishmentName?: string;
    lastContributedMonth?: string;
    memberId?: string;
    confidence: number;
  };
  ocrConfidence: {
    overallScore: number; // percentage, e.g. 96
    detectedEmployer: string;
    detectedSalary: number;
    detectedDate: string;
    fieldsMatched: string[];
  };
  
  // Verification action
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
  reviewerRemarks?: string;
  reviewedAt?: string;
}

export interface UnemployedRootCause {
  id: string;
  label: string;
  category: 'TECHNICAL' | 'GEOGRAPHIC' | 'FINANCIAL' | 'SOFT_SKILL' | 'SOCIO_PERSONAL';
  percentage: number;
  count: number;
  description: string;
  suggestedStateIntervention: string;
}

export interface SkillGapMatrixItem {
  id: string;
  courseName: string;
  sector: string;
  industrySkill: string;
  curriculumCoverage: number; // 0-100%
  industryDemandScore: number; // 0-100%
  deficitSeverity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'ALIGNED';
  avgSalaryImpact: number; // e.g. +35% if addressed
  sampleEmployersDemanding: string[];
  recommendedBridgeModule: string;
  bridgeDurationHours: number;
}

export interface PredictiveBridgeCourse {
  id: string;
  title: string;
  trade: string;
  sector: string;
  durationHours: number;
  mode: 'Hybrid Blended' | 'Hands-on ITI Lab' | 'Virtual Simulation';
  nearestCenter: string;
  potentialWageBoost: string;
  enrolledTrainees: number;
  availableSeats: number;
  fundingScheme: 'Skill India Mission 100% Free' | 'CSR Co-funded';
  keyModules: string[];
}

export interface TrainingProviderScorecard {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  sector: string;
  totalCertified: number;
  trackingComplianceRate: number; // %
  verifiedPlacementRate: number; // %
  retention12mRate: number; // %
  highTrustScore: number; // %
  avgMonthlySalary: number; // INR
  grade: 'A+' | 'A' | 'B' | 'C';
  fundDisbursementStatus: 'TRANCHE_RELEASED' | 'PENDING_APPROVAL' | 'HELD_FOR_AUDIT' | 'ACTION_REQUIRED';
  currentTrancheAmount: number; // INR
  activeBatches: number;
}

export interface IndiaStateMetric {
  id: string;
  state: string;
  zone: 'South' | 'West' | 'North' | 'East' | 'Central';
  certifiedTrainees: number;
  placementRate: number; // %
  retention12mRate: number; // %
  avgStartingSalary: number; // INR
  selfEmployedRate: number; // %
  topSectors: string[];
  leadingTrainingProvider: string;
  criticalSkillGap: string;
  colorGrade: 'emerald' | 'amber' | 'blue';
}
