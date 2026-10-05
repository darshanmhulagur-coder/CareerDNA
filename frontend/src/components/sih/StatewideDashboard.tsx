import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Building2,
  MapPin,
  Award,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Download,
  IndianRupee,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';
import {
  INDIA_STATES_DATA,
  RETENTION_DECAY_CURVE,
  SECTOR_PLACEMENT_STATS,
  GENDER_BREAKDOWN,
} from '../../data/sihMockData';
import { VerificationQueue } from './VerificationQueue';
import { SkillGapAnalytics } from './SkillGapAnalytics';

export const StatewideDashboard: React.FC = () => {
  const {
    scorecards,
    releaseTpTranche,
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
    showToast,
  } = useMahaTracking();

  const [activeTab, setActiveTab] = useState<'overview' | 'states' | 'verification' | 'skillgap' | 'scorecard'>('overview');
  const [tpSearchQuery, setTpSearchQuery] = useState('');
  const [tpGradeFilter, setTpGradeFilter] = useState<'ALL' | 'A+' | 'A' | 'B' | 'C'>('ALL');

  const filteredStates = INDIA_STATES_DATA.filter((s) => {
    return filterZone === 'ALL' || s.zone === filterZone;
  });

  const filteredScorecards = scorecards.filter((tp) => {
    const matchesSearch =
      tp.name.toLowerCase().includes(tpSearchQuery.toLowerCase()) ||
      tp.state.toLowerCase().includes(tpSearchQuery.toLowerCase()) ||
      tp.district.toLowerCase().includes(tpSearchQuery.toLowerCase()) ||
      tp.sector.toLowerCase().includes(tpSearchQuery.toLowerCase()) ||
      tp.code.toLowerCase().includes(tpSearchQuery.toLowerCase());
    const matchesGrade = tpGradeFilter === 'ALL' || tp.grade === tpGradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleExportCsv = () => {
    showToast('Exporting All-India National Longitudinal Outcome Report (CSV)...');
  };

  return (
    <div className="space-y-6">
      {/* Sub-Tabs Navigation & Demographic Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* Main Module Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            {[
              { id: 'overview', label: '1. National Overview & KPIs', icon: TrendingUp },
              { id: 'states', label: '2. All-India State & UT Map', icon: MapPin },
              { id: 'verification', label: '3. Verification Engine Queue', icon: ShieldCheck },
              { id: 'skillgap', label: '4. AI Skill Gap & Diagnostics', icon: Sparkles },
              { id: 'scorecard', label: '5. TP Scorecard & Fund Grants', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition ${
                    isActive
                      ? 'bg-navy-800 text-white shadow-sm ring-1 ring-navy-900'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-saffron-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Export Report Action */}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export National Report
          </button>
        </div>

        {/* Global Demographic Filters Bar */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-400" /> Filters:
          </span>

          {/* Cohort Year Filter */}
          <select
            value={filterCohort}
            onChange={(e) => setFilterCohort(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 shadow-sm"
          >
            <option value="ALL">All Cohorts (2023–2026)</option>
            <option value="2024-25">Cohort 2024-25 (Current)</option>
            <option value="2023-24">Cohort 2023-24 (12M Audited)</option>
            <option value="2022-23">Cohort 2022-23 (24M Tracked)</option>
          </select>

          {/* Sector Filter */}
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 shadow-sm"
          >
            <option value="ALL">All Sectors</option>
            <option value="Automotive">Automotive & Capital Goods</option>
            <option value="IT">IT & ITeS</option>
            <option value="Renewable">Renewable Energy & Solar</option>
            <option value="Healthcare">Healthcare & Life Sciences</option>
            <option value="Logistics">Logistics & Supply Chain</option>
            <option value="Textile">Textile & Apparel</option>
          </select>

          {/* Geographic Zone Filter */}
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 shadow-sm"
          >
            <option value="ALL">All India (28 States & 8 UTs)</option>
            <option value="South">South Zone (Karnataka, TN, Kerala, TS, AP)</option>
            <option value="West">West Zone (Maharashtra, Gujarat, Goa)</option>
            <option value="North">North Zone (Delhi NCR, UP, Haryana, Punjab, Rajasthan)</option>
            <option value="East">East Zone (West Bengal, Odisha, Bihar)</option>
            <option value="Central">Central Zone (Madhya Pradesh, Chhattisgarh)</option>
          </select>

          {/* Gender Filter */}
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 shadow-sm"
          >
            <option value="ALL">All Genders</option>
            <option value="Female">Female Candidates Only</option>
            <option value="Male">Male Candidates Only</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: Executive Overview & KPIs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* High-Level 6 Core KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                label: 'National Placement Rate',
                value: '75.4%',
                change: '+5.8% YoY',
                sub: 'Across 28 States & 8 UTs',
                color: 'text-emerald-700',
                border: 'border-emerald-200',
                bg: 'bg-emerald-50/50',
              },
              {
                label: '12-Month Retention Rate',
                value: '69.2%',
                change: 'Benchmark >65%',
                sub: 'Continuous employment',
                color: 'text-navy-900',
                border: 'border-slate-200',
                bg: 'bg-white',
              },
              {
                label: 'Average Wage Growth',
                value: '+42.5%',
                change: '₹11.8k ➔ ₹16.8k/mo',
                sub: 'National median growth',
                color: 'text-emerald-700',
                border: 'border-emerald-200',
                bg: 'bg-emerald-50/50',
              },
              {
                label: 'Self-Employment Ratio',
                value: '19.1%',
                change: 'Udyam MSME Verified',
                sub: 'Micro-entrepreneurs',
                color: 'text-saffron-700',
                border: 'border-saffron-200',
                bg: 'bg-saffron-50/50',
              },
              {
                label: 'Trainees Tracked in India',
                value: '42,85,000',
                change: 'Pan-India Coverage',
                sub: 'Active longitudinal cohorts',
                color: 'text-navy-900',
                border: 'border-slate-200',
                bg: 'bg-white',
              },
              {
                label: 'High-Trust Verification',
                value: '87.5%',
                change: 'EPFO & GSTIN Synced',
                sub: 'Automated digital signals',
                color: 'text-emerald-700',
                border: 'border-emerald-200',
                bg: 'bg-emerald-50/50',
              },
            ].map((kpi, idx) => (
              <div key={idx} className={`gov-card p-3.5 border ${kpi.border} ${kpi.bg} space-y-1`}>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide leading-tight line-clamp-1">
                  {kpi.label}
                </div>
                <div className={`text-xl sm:text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-[10px] font-bold text-slate-700">{kpi.change}</div>
                <div className="text-[10px] text-slate-400">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Longitudinal Retention Decay Curve */}
          <div className="gov-card p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy-900">
                  National Longitudinal Retention Decay Curve (3M ➔ 6M ➔ 12M ➔ 24M)
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking workforce retention drop-off over 24 months post-certification under Skill India Mission
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                National Target: &gt; 65% at 12M
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={RETENTION_DECAY_CURVE} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="milestone" stroke="#64748b" fontSize={11} />
                  <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12, borderColor: '#cbd5e1' }}
                    formatter={(val: any, name: any) => [`${val}% of Trainees`, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area
                    type="monotone"
                    dataKey="corporateEmployed"
                    name="Full-Time Corporate"
                    stackId="1"
                    stroke="#0f172a"
                    fill="#1e293b"
                  />
                  <Area
                    type="monotone"
                    dataKey="selfEmployed"
                    name="Self-Employed / Entrepreneur"
                    stackId="1"
                    stroke="#ea580c"
                    fill="#f97316"
                  />
                  <Area
                    type="monotone"
                    dataKey="unemployed"
                    name="Unplaced / Drop-out"
                    stackId="1"
                    stroke="#f43f5e"
                    fill="#fda4af"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector Outcomes & Gender Equity Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sector Placement Bar Graph */}
            <div className="gov-card p-4 sm:p-6 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-navy-900">
                  Placement Rate & Starting Salaries by Priority National Sector
                </h4>
                <p className="text-xs text-slate-500">Comparative outcomes across India's key industrial clusters</p>
              </div>

              <div className="h-60 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SECTOR_PLACEMENT_STATS} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="sector"
                      stroke="#64748b"
                      fontSize={10}
                      tickFormatter={(val) => (val.includes(' ') ? val.split(' ')[0] : val)}
                    />
                    <YAxis unit="%" stroke="#64748b" fontSize={10} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, fontSize: 12, borderColor: '#cbd5e1' }}
                      formatter={(val: any, name: any) => [
                        name === 'Placement Rate' ? `${val}%` : `${val}%`,
                        name,
                      ]}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="placementRate" name="Placement Rate" fill="#059669" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="retention12m" name="12M Retention" fill="#0f172a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Equity & Wage Parity Card */}
            <div className="gov-card p-4 sm:p-6 space-y-3">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="text-sm font-bold text-navy-900">
                  National Gender Parity & Wage Equity Tracker
                </h4>
                <p className="text-xs text-slate-500">Monitoring female inclusion in technical and engineering trades</p>
              </div>

              <div className="space-y-3 pt-1">
                {GENDER_BREAKDOWN.map((g) => (
                  <div key={g.gender} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{g.gender} Trainees</span>
                      <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border">
                        {g.share}% of Total Enrollment
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Placement Rate</span>
                        <span className="font-extrabold text-emerald-800 text-sm">{g.placementRate}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">12M Retention</span>
                        <span className="font-bold text-navy-900 text-sm">{g.retention12m}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Avg Starting Wage</span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{g.avgSalary.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: All-India State & UT Outcome Heatmap */}
      {activeTab === 'states' && (
        <div className="space-y-6">
          <div className="gov-card p-4 sm:p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-saffron-600" />
                  All-India State & Union Territory Outcomes Heatmap
                </h3>
                <p className="text-xs text-slate-500">
                  Select a state to inspect regional placement rates, average wages, leading vocational centers, and local skill deficits
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                28 States • 8 Union Territories
              </span>
            </div>

            {/* State Selector Heatmap Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {filteredStates.map((s) => {
                const isSelected = selectedState?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedState(s)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-navy-900 bg-navy-900 text-white shadow-md ring-2 ring-navy-800'
                        : s.colorGrade === 'emerald'
                        ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300 text-slate-900'
                        : s.colorGrade === 'blue'
                        ? 'bg-blue-50/60 border-blue-200 hover:border-blue-300 text-slate-900'
                        : 'bg-amber-50/60 border-amber-200 hover:border-amber-300 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {s.state}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          s.colorGrade === 'emerald'
                            ? 'bg-emerald-500'
                            : s.colorGrade === 'blue'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'} mt-0.5`}>
                      {s.zone} Zone
                    </div>
                    <div className={`mt-2 text-sm font-extrabold ${isSelected ? 'text-saffron-300' : 'text-navy-900'}`}>
                      {s.placementRate}% <span className="text-[10px] font-normal">Placement</span>
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      ₹{(s.avgStartingSalary / 1000).toFixed(1)}k avg wage
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected State Profile Spotlight Card */}
            {selectedState && (
              <div className="mt-4 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-navy-950">
                        {selectedState.state} Profile
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-navy-100 text-navy-800">
                        {selectedState.zone} Zone, India
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Total Certified: <strong>{selectedState.certifiedTrainees.toLocaleString('en-IN')}</strong> •
                      12-Month Retention: <strong>{selectedState.retention12mRate}%</strong> • Self-Employed:{' '}
                      <strong>{selectedState.selfEmployedRate}%</strong>
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-left sm:text-right shadow-sm">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Average Starting Wage</span>
                    <span className="text-base font-extrabold text-emerald-800">
                      ₹{selectedState.avgStartingSalary.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Top Sectors in State */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      Leading Employment Sectors
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {selectedState.topSectors.map((sec, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium text-[11px]">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Leading TP in State */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                      Top Rated Center of Excellence
                    </span>
                    <div className="font-bold text-navy-900 pt-0.5">{selectedState.leadingTrainingProvider}</div>
                    <span className="text-[10px] text-emerald-700 font-medium">Grade A+ Institution • High Trust</span>
                  </div>

                  {/* Critical Skill Gap Alert for State */}
                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-amber-800 block font-semibold text-[10px] uppercase flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Priority Skill Deficit in Region
                    </span>
                    <div className="font-bold text-amber-950 pt-0.5">{selectedState.criticalSkillGap}</div>
                    <span className="text-[10px] text-amber-800">
                      National Bridge Upskilling voucher recommended.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: Verification Engine & Fraud Detection */}
      {activeTab === 'verification' && <VerificationQueue />}

      {/* VIEW 4: AI Skill Gap & Curricula Diagnostics */}
      {activeTab === 'skillgap' && <SkillGapAnalytics />}

      {/* VIEW 5: Training Provider (TP) Performance Scorecard & Grants */}
      {activeTab === 'scorecard' && (
        <div className="space-y-4">
          <div className="gov-card p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-saffron-600" />
                  National Training Provider (TP) Performance Scorecard & Central Grants
                </h3>
                <p className="text-xs text-slate-500">
                  Tiering training institutes across India by placement rate, 12-month retention, and trust score to govern central fund releases
                </p>
              </div>

              {/* TP Grade Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {(['ALL', 'A+', 'A', 'B', 'C'] as const).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setTpGradeFilter(grade)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      tpGradeFilter === grade ? 'bg-navy-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {grade === 'ALL' ? 'All Tiers' : `Grade ${grade}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Scorecard Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-3">Training Provider & Center Code</th>
                    <th className="py-3 px-3">State & Sector</th>
                    <th className="py-3 px-2 text-center">Certified</th>
                    <th className="py-3 px-2 text-center">Placement %</th>
                    <th className="py-3 px-2 text-center">12M Retention %</th>
                    <th className="py-3 px-2 text-center">High Trust %</th>
                    <th className="py-3 px-2 text-center">Grade Tier</th>
                    <th className="py-3 px-3 text-right">Central Grant Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredScorecards.map((tp) => (
                    <tr key={tp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{tp.name}</div>
                        <div className="font-mono text-[11px] text-slate-400">{tp.code}</div>
                        <div className="text-[10px] text-slate-500">{tp.activeBatches} Active Batches</div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{tp.state}</div>
                        <div className="text-[11px] text-slate-500">{tp.sector}</div>
                      </td>

                      <td className="py-3 px-2 text-center font-mono font-bold text-slate-700">
                        {tp.totalCertified.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3 px-2 text-center">
                        <span
                          className={`font-mono font-extrabold ${
                            tp.verifiedPlacementRate >= 80
                              ? 'text-emerald-700'
                              : tp.verifiedPlacementRate >= 70
                              ? 'text-navy-900'
                              : 'text-rose-600'
                          }`}
                        >
                          {tp.verifiedPlacementRate}%
                        </span>
                      </td>

                      <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800">
                        {tp.retention12mRate}%
                      </td>

                      <td className="py-3 px-2 text-center font-mono text-emerald-800 font-semibold">
                        {tp.highTrustScore}%
                      </td>

                      {/* Performance Tiering Badge */}
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                            tp.grade === 'A+'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : tp.grade === 'A'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : tp.grade === 'B'
                              ? 'bg-slate-100 text-slate-800 border-slate-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          Grade {tp.grade}
                        </span>
                      </td>

                      {/* Grant Disbursement Action */}
                      <td className="py-3 px-3 text-right">
                        {tp.fundDisbursementStatus === 'TRANCHE_RELEASED' ? (
                          <div className="text-right">
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Tranche Released
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ₹{(tp.currentTrancheAmount / 100000).toFixed(2)} Lakhs (Phase 3)
                            </span>
                          </div>
                        ) : tp.fundDisbursementStatus === 'HELD_FOR_AUDIT' ? (
                          <div className="text-right">
                            <span className="text-[11px] font-bold text-rose-700 flex items-center justify-end gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              Audit Mandated
                            </span>
                            <span className="text-[10px] text-rose-500">Funds Held (Low Retention)</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => releaseTpTranche(tp.id)}
                            className="px-2.5 py-1 rounded-lg bg-navy-800 text-white font-bold text-[11px] hover:bg-navy-700 shadow-sm transition"
                          >
                            Authorize Tranche (₹{(tp.currentTrancheAmount / 100000).toFixed(1)}L)
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
