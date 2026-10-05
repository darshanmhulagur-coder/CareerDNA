import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Cpu,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Building,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Filter,
  Check,
  Zap,
} from 'lucide-react';
import {
  UNEMPLOYED_ROOT_CAUSES,
  SKILL_GAP_MATRIX,
  PREDICTIVE_BRIDGE_COURSES,
} from '../../data/sihMockData';
import { useMahaTracking } from '../../context/MahaTrackingContext';

const ROOT_CAUSE_COLORS = ['#ea580c', '#3b82f6', '#8b5cf6', '#059669', '#ec4899', '#64748b'];

export const SkillGapAnalytics: React.FC = () => {
  const { predictiveCourses, enrolledCourses, enrollInBridgeCourse } = useMahaTracking();

  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredMatrix = SKILL_GAP_MATRIX.filter((item) => {
    const matchSector = selectedSector === 'ALL' || item.sector.includes(selectedSector);
    const matchSeverity = selectedSeverity === 'ALL' || item.deficitSeverity === selectedSeverity;
    return matchSector && matchSeverity;
  });

  const pieData = UNEMPLOYED_ROOT_CAUSES.map((rc) => ({
    name: rc.label,
    value: rc.percentage,
    count: rc.count,
  }));

  const barData = UNEMPLOYED_ROOT_CAUSES.map((rc) => ({
    name: rc.label.length > 20 ? rc.label.substring(0, 18) + '...' : rc.label,
    percentage: rc.percentage,
    candidates: rc.count,
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-2xl p-5 shadow-elevated border border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 text-xs font-semibold mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-saffron-400" />
            AI Competency Analytics Engine • National Policy Desk (MSDE)
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Non-Placement Root Causes & Skill Gap Matrix
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
            Machine learning synthesis of 42,85,000 trainee check-ins, employer rejection surveys, and active industrial vacancy data across India's key economic corridors.
          </p>
        </div>

        <div className="bg-navy-950/70 border border-navy-700 rounded-xl p-3 text-left sm:text-right shrink-0">
          <div className="text-[11px] text-slate-400">Total Unplaced Diagnosed</div>
          <div className="text-xl font-extrabold text-saffron-400">4,16,600 Trainees</div>
          <div className="text-[10px] text-emerald-400">100% Survey Triangulation</div>
        </div>
      </div>

      {/* Part 1: Non-Placement Root Cause Breakdown */}
      <div className="gov-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-saffron-600" />
              Non-Placement Root Cause Breakdown (All-India Cohorts)
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated trainee exit surveys diagnosing why certified candidates are not actively employed
            </p>
          </div>
        </div>

        {/* Charts Grid: Pie & Bar Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Pie / Donut Chart */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ROOT_CAUSE_COLORS[index % ROOT_CAUSE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% (${item.payload.count.toLocaleString('en-IN')} candidates)`,
                      name,
                    ]}
                    contentStyle={{ borderRadius: 8, fontSize: 12, borderColor: '#cbd5e1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 text-center">
              Share of Non-Placement Reasons
            </span>
          </div>

          {/* Bar Graph / Rank List */}
          <div className="lg:col-span-7 space-y-2.5">
            {UNEMPLOYED_ROOT_CAUSES.map((rc, idx) => (
              <div key={rc.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: ROOT_CAUSE_COLORS[idx % ROOT_CAUSE_COLORS.length] }}
                    />
                    <span>{rc.label}</span>
                  </div>
                  <span className="font-extrabold text-navy-900 font-mono">
                    {rc.percentage}% ({rc.count.toLocaleString('en-IN')})
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden my-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${rc.percentage}%`,
                      backgroundColor: ROOT_CAUSE_COLORS[idx % ROOT_CAUSE_COLORS.length],
                    }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 mt-1">{rc.description}</p>
                <div className="mt-1 text-[11px] text-saffron-800 font-medium bg-saffron-50/70 px-2 py-0.5 rounded border border-saffron-200 inline-block">
                  <strong>State Policy Action:</strong> {rc.suggestedStateIntervention}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Part 2: Skill Gap Heatmap (Course Curricula vs. Industry Required Skills) */}
      <div className="gov-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm sm:text-base font-bold text-navy-900">
                Skill Gap Heatmap: Course Curricula vs. Industry Demanded Skills
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Pinpointing missing competencies that trigger interview rejection & wage suppression
            </p>
          </div>

          {/* Heatmap Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white shadow-sm"
            >
              <option value="ALL">All Sectors</option>
              <option value="Automotive">Automotive & Capital Goods</option>
              <option value="IT">IT & ITeS</option>
              <option value="Renewable">Renewable Energy</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Soft Skills">Cross-Sector Soft Skills</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white shadow-sm"
            >
              <option value="ALL">All Gap Severities</option>
              <option value="CRITICAL">Critical Deficit</option>
              <option value="HIGH">High Deficit</option>
              <option value="MODERATE">Moderate Deficit</option>
            </select>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Course / Trade</th>
                <th className="py-2.5 px-3">Industry Required Competency</th>
                <th className="py-2.5 px-3 text-center">Curricula Coverage</th>
                <th className="py-2.5 px-3 text-center">Market Demand</th>
                <th className="py-2.5 px-3">Deficit Severity</th>
                <th className="py-2.5 px-3">Wage Uplift Impact</th>
                <th className="py-2.5 px-3">Remedial Bridge Module</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMatrix.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{item.courseName}</div>
                    <div className="text-[10px] text-slate-400">{item.sector}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{item.industrySkill}</div>
                    <div className="text-[10px] text-slate-500">
                      Hiring: {item.sampleEmployersDemanding.join(', ')}
                    </div>
                  </td>

                  {/* Curricula Coverage Bar */}
                  <td className="py-3 px-3 text-center">
                    <div className="inline-block w-20">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.curriculumCoverage < 35
                              ? 'bg-rose-500'
                              : item.curriculumCoverage < 60
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.curriculumCoverage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-600 block mt-0.5">
                        {item.curriculumCoverage}% coverage
                      </span>
                    </div>
                  </td>

                  {/* Industry Demand Score */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-mono font-bold text-navy-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {item.industryDemandScore}% Index
                    </span>
                  </td>

                  {/* Deficit Severity */}
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        item.deficitSeverity === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : item.deficitSeverity === 'HIGH'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {item.deficitSeverity}
                    </span>
                  </td>

                  {/* Wage Impact */}
                  <td className="py-3 px-3">
                    <span className="font-extrabold text-emerald-700 flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{item.avgSalaryImpact}% Wage Boost
                    </span>
                  </td>

                  {/* Recommended Bridge Module */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800 line-clamp-1 max-w-[170px]" title={item.recommendedBridgeModule}>
                      {item.recommendedBridgeModule}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.bridgeDurationHours} Hours Micro-Module
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 3: Predictive Bridge Course Recommendations Panel */}
      <div className="gov-card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-saffron-600" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-navy-900">
                Predictive Bridge Course Upskilling Catalog (Government Funded)
              </h3>
              <p className="text-xs text-slate-500">
                Fast-track remedial modules recommended by the National AI engine to convert unplaced alumni into job-ready candidates
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-saffron-800 bg-saffron-50 border border-saffron-200 px-2.5 py-1 rounded-lg">
            100% Skill India Direct Subsidy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictiveCourses.map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div
                key={course.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 hover:border-slate-300 shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                      {course.trade} • {course.durationHours} Hours • {course.mode}
                    </span>
                    <h4 className="font-bold text-sm text-navy-950 mt-1">{course.title}</h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 shrink-0">
                    {course.potentialWageBoost}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{course.nearestCenter}</span>
                </div>

                {/* Key Curricular Topics */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1">
                  <span className="font-semibold text-slate-700 block">Bridge Curriculum Focus:</span>
                  <div className="grid grid-cols-2 gap-1 text-slate-600">
                    {course.keyModules.map((m, i) => (
                      <div key={i} className="flex items-center gap-1 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron-500 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500">
                    <strong>{course.enrolledTrainees}</strong> enrolled • <strong>{course.availableSeats}</strong> seats open
                  </div>
                  <button
                    type="button"
                    onClick={() => enrollInBridgeCourse(course.id)}
                    disabled={isEnrolled}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                      isEnrolled
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-navy-800 text-white hover:bg-navy-700 shadow-sm'
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Voucher Issued
                      </>
                    ) : (
                      <>
                        Issue Bridge Voucher <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
