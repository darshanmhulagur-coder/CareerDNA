import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';
import { useMahaTracking } from '../../context/MahaTrackingContext';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { mobilePreviewMode, setMobilePreviewMode } = useMahaTracking();

  if (!mobilePreviewMode) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2 min-h-[calc(100vh-120px)] bg-slate-100/80">
      {/* Top Banner Indicator */}
      <div className="mb-3 flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-slate-500">
        <span className="font-semibold text-navy-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Mobile-First Trainee View Simulator
        </span>
        <button
          type="button"
          onClick={() => setMobilePreviewMode(false)}
          className="text-saffron-700 hover:underline font-medium text-[11px]"
        >
          Exit Simulator
        </button>
      </div>

      {/* Phone Hardware Mockup */}
      <div className="relative w-full max-w-[410px] rounded-[44px] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-800 border-4 border-slate-700">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute left-1/2 top-5 -translate-x-1/2 z-30 h-4 w-28 rounded-full bg-slate-950 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
          <div className="w-2 h-2 rounded-full bg-slate-900" />
        </div>

        {/* Screen Bezel */}
        <div className="relative overflow-hidden rounded-[36px] bg-slate-50 min-h-[760px] max-h-[820px] flex flex-col border border-slate-300">
          {/* iOS / Android Status Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 pt-3 pb-2 bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-800 border-b border-slate-100">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* Phone Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {children}
          </div>

          {/* Home Bar Indicator */}
          <div className="py-2 flex justify-center bg-white border-t border-slate-100">
            <div className="w-32 h-1 rounded-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
