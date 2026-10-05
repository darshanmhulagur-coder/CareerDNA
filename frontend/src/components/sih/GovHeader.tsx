import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  UserPlus,
  Building2,
  BarChart3,
  Smartphone,
  Monitor,
  RotateCcw,
  Eye,
  ChevronDown,
} from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';
import { UserRole } from '../../types/sih';

export const GovHeader: React.FC = () => {
  const {
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
    setIsRegisterModalOpen,
    resetToDefaults,
  } = useMahaTracking();

  const [traineeDropdownOpen, setTraineeDropdownOpen] = useState(false);

  const roles: { id: UserRole; label: string; icon: any; badge?: string }[] = [
    {
      id: 'trainee',
      label: 'Trainee Portal',
      icon: User,
      badge: 'Mobile-First',
    },
    {
      id: 'tp',
      label: 'Training Provider (TP)',
      icon: Building2,
      badge: 'Grade A+',
    },
    {
      id: 'admin',
      label: 'National Analyst Dashboard',
      icon: BarChart3,
      badge: 'Admin',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Official Indian Tricolor Strip */}
      <div className="tricolor-stripe" aria-hidden="true" />

      {/* Top Utility & Accessibility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Government of India | भारत सरकार
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              Ministry of Skill Development & Entrepreneurship (MSDE) • Skill India Mission
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            {/* SIH Badge */}
            <span className="bg-saffron-600/30 text-saffron-300 border border-saffron-500/40 px-2 py-0.5 rounded font-mono font-medium">
              SIH26135 National Prototype
            </span>

            {/* Accessibility: Font Size */}
            <div className="flex items-center border border-slate-700 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => setFontScale('normal')}
                className={`px-1.5 py-0.5 ${fontScale === 'normal' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
                title="Default Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontScale('large')}
                className={`px-1.5 py-0.5 text-xs font-semibold ${fontScale === 'large' ? 'bg-slate-700 text-white' : 'hover:bg-slate-800'}`}
                title="Larger Font Size"
              >
                A+
              </button>
            </div>

            {/* Accessibility: High Contrast */}
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 transition ${
                highContrast ? 'bg-amber-400 text-slate-950 font-bold' : 'hover:bg-slate-800'
              }`}
              title="Toggle High Contrast"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Contrast</span>
            </button>

            {/* Reset Demo Data */}
            <button
              type="button"
              onClick={resetToDefaults}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main National Portal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Department Emblem */}
        <div className="flex items-center gap-3.5">
          {/* Ashoka / Emblem Badge */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 text-white shadow-md border border-navy-700 shrink-0">
            <ShieldCheck className="w-7 h-7 text-saffron-500" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-saffron-600 bg-saffron-50 border border-saffron-200 px-2 py-0.5 rounded">
                Skill India Digital Hub
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded hidden sm:inline">
                National Longitudinal Outcomes Engine
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-navy-800 leading-tight">
              Employment Outcomes & Skill Gap Tracking System
            </h1>
            <p className="text-xs text-slate-500">
              National Council for Vocational Education and Training (NCVET) • Directorate General of Training (DGT)
            </p>
          </div>
        </div>

        {/* Right Section: Role Switcher & View Simulator */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Trainee Selector (if on Trainee Portal) */}
          {activeRole === 'trainee' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setTraineeDropdownOpen(!traineeDropdownOpen)}
                className="flex items-center gap-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-2.5 py-1.5 rounded-lg transition"
              >
                <User className="w-3.5 h-3.5 text-navy-700" />
                <span className="truncate max-w-[120px]">{activeTrainee.fullName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {traineeDropdownOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-elevated z-50 py-1 text-xs">
                  <div className="px-3 py-1.5 font-semibold text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
                    Switch Demo Trainee Profile
                  </div>
                  {allTrainees.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        switchTrainee(t.id);
                        setTraineeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-slate-50 transition ${
                        t.id === activeTrainee.id ? 'bg-saffron-50/70 font-semibold text-saffron-900' : 'text-slate-700'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-navy-100 text-navy-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {t.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{t.fullName}</div>
                        <div className="text-[11px] text-slate-400 truncate">{t.state} • {t.employmentType}</div>
                      </div>
                    </button>
                  ))}

                  {/* Add New Trainee Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterModalOpen(true);
                      setTraineeDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-saffron-800 bg-saffron-50/90 hover:bg-saffron-100 border-t border-slate-100 flex items-center gap-1.5 transition"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-saffron-600" />
                    <span>+ Register New Trainee Data</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Add Trainee Button */}
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold bg-saffron-600 hover:bg-saffron-700 text-white px-2.5 py-1.5 rounded-lg shadow-sm transition"
            title="Register As Trainee / Add Your Training Data"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Register Trainee</span>
          </button>

          {/* Mobile Shell Mode Toggle for Trainee Role */}
          {activeRole === 'trainee' && (
            <button
              type="button"
              onClick={() => setMobilePreviewMode(!mobilePreviewMode)}
              className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition ${
                mobilePreviewMode
                  ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Toggle Mobile Simulator Frame"
            >
              {mobilePreviewMode ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-saffron-400" />
                  <span>Full Screen</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-saffron-600" />
                  <span>Mobile View</span>
                </>
              )}
            </button>
          )}

          {/* The Main Role Switcher */}
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl shadow-inner">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveRole(r.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-navy-800 text-white shadow-sm ring-1 ring-navy-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-saffron-400' : 'text-slate-500'}`} />
                  <span>{r.label}</span>
                  {r.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-normal hidden lg:inline ${
                        isActive ? 'bg-navy-700 text-saffron-300' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {r.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
