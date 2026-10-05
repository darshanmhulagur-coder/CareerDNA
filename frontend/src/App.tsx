import React from 'react';
import { MahaTrackingProvider, useMahaTracking } from './context/MahaTrackingContext';
import { GovHeader } from './components/sih/GovHeader';
import { TraineePortal } from './components/sih/TraineePortal';
import { TpPortalView } from './components/sih/TpPortalView';
import { StatewideDashboard } from './components/sih/StatewideDashboard';
import { TraineeRegistrationModal } from './components/sih/TraineeRegistrationModal';
import { ShieldCheck, HeartHandshake, Phone, Globe, ExternalLink } from 'lucide-react';

export function homeFor(role: string) {
  if (role === "STUDENT") return "/student";
  if (role === "FACULTY" || role === "VERIFIER") return "/verifier/queue";
  if (role === "DEPARTMENT") return "/department";
  if (role === "COMPANY") return "/company";
  return "/tpo";
}

const MahaKaushalyaApp: React.FC = () => {
  const { activeRole } = useMahaTracking();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Official State Header & Role Switcher */}
      <GovHeader />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeRole === 'trainee' && <TraineePortal />}
        {activeRole === 'tp' && <TpPortalView />}
        {activeRole === 'admin' && <StatewideDashboard />}
      </main>

      {/* Trainee Self-Registration Modal (Accessible globally) */}
      <TraineeRegistrationModal />

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-saffron-500" />
              KaushalSetu Track (National)
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              National Longitudinal Employment Outcomes & Skill Gap Tracking System for the Ministry of Skill Development and Entrepreneurship (MSDE).
              Built for Smart India Hackathon (SIH) Problem Statement SIH26135.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-1.5 text-[11px]">
            <div className="text-white font-semibold mb-2">Integrated Portals</div>
            <div>• Skill India Digital Hub (SIDH / MSDE)</div>
            <div>• Directorate General of Training (DGT & NCVET)</div>
            <div>• Employees' Provident Fund Organisation (EPFO UAN API)</div>
            <div>• Ministry of MSME Udyam Registration Database</div>
          </div>

          {/* Col 3 */}
          <div className="space-y-1.5 text-[11px]">
            <div className="text-white font-semibold mb-2">Longitudinal Milestones</div>
            <div>• 3-Month Initial Placement Verification</div>
            <div>• 6-Month Wage Continuity & ESIC Audit</div>
            <div>• 12-Month Annual Retention & Attrition Tracker</div>
            <div>• 24-Month Long-Term Career Progression Assessment</div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2 text-[11px]">
            <div className="text-white font-semibold mb-2">National Helpdesk & Grievance</div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-saffron-400" />
              National Toll-Free Helpline: 1800-120-8040
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              msde.gov.in • skillindiadigital.gov.in
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              Data complies with the Digital Personal Data Protection (DPDP) Act 2023.
            </p>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-slate-800 py-3 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Government of India. All rights reserved. Developed for Smart India Hackathon Prototype SIH26135.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <MahaTrackingProvider>
      <MahaKaushalyaApp />
    </MahaTrackingProvider>
  );
}
