import React from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Download, Share2 } from 'lucide-react';
import { TraineeProfile } from '../../types/sih';

interface QrModalProps {
  trainee: TraineeProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ trainee, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-elevated border border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Card Header with State Branding */}
        <div className="text-center pb-4 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-800 text-[11px] font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-saffron-600" />
            Government of India • Skill India Mission
          </div>
          <h3 className="text-base font-bold text-navy-900">Universal Trainee Digital ID</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">UTID: {trainee.utid}</p>
        </div>

        {/* QR Code Container */}
        <div className="my-5 flex flex-col items-center">
          <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 shadow-inner flex flex-col items-center">
            {/* SVG simulated high-density QR code */}
            <div className="relative w-44 h-44 bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-navy-900 fill-current">
                {/* 3 Position Detection Patterns */}
                <rect x="5" y="5" width="26" height="26" fill="#0f172a" rx="4" />
                <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="#0f172a" rx="2" />

                <rect x="69" y="5" width="26" height="26" fill="#0f172a" rx="4" />
                <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="#0f172a" rx="2" />

                <rect x="5" y="69" width="26" height="26" fill="#0f172a" rx="4" />
                <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="#0f172a" rx="2" />

                {/* Data Matrix Dots */}
                <rect x="36" y="8" width="6" height="6" fill="#ea580c" />
                <rect x="46" y="8" width="6" height="6" fill="#0f172a" />
                <rect x="56" y="8" width="6" height="6" fill="#059669" />
                <rect x="36" y="18" width="6" height="6" fill="#0f172a" />
                <rect x="46" y="18" width="6" height="6" fill="#0f172a" />
                <rect x="56" y="18" width="6" height="6" fill="#0f172a" />

                <rect x="8" y="36" width="6" height="6" fill="#0f172a" />
                <rect x="18" y="36" width="6" height="6" fill="#0f172a" />
                <rect x="8" y="46" width="6" height="6" fill="#0f172a" />
                <rect x="18" y="46" width="6" height="6" fill="#ea580c" />
                <rect x="8" y="56" width="6" height="6" fill="#0f172a" />
                <rect x="18" y="56" width="6" height="6" fill="#0f172a" />

                <rect x="36" y="36" width="28" height="28" fill="#f8fafc" rx="4" />
                <circle cx="50" cy="50" r="10" fill="#ea580c" />
                <circle cx="50" cy="50" r="5" fill="#ffffff" />

                <rect x="68" y="36" width="6" height="6" fill="#059669" />
                <rect x="78" y="36" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="36" width="6" height="6" fill="#0f172a" />
                <rect x="68" y="46" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="46" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="46" width="6" height="6" fill="#ea580c" />

                <rect x="36" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="46" y="68" width="6" height="6" fill="#059669" />
                <rect x="56" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="36" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="46" y="78" width="6" height="6" fill="#ea580c" />
                <rect x="56" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="36" y="88" width="6" height="6" fill="#0f172a" />
                <rect x="46" y="88" width="6" height="6" fill="#0f172a" />
                <rect x="56" y="88" width="6" height="6" fill="#059669" />

                <rect x="68" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="68" width="6" height="6" fill="#0f172a" />
                <rect x="68" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="78" width="6" height="6" fill="#0f172a" />
                <rect x="68" y="88" width="6" height="6" fill="#0f172a" />
                <rect x="78" y="88" width="6" height="6" fill="#0f172a" />
                <rect x="88" y="88" width="6" height="6" fill="#0f172a" />
              </svg>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              DigiLocker & Aadhaar e-KYC Linked
            </div>
          </div>
        </div>

        {/* Trainee Details */}
        <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl text-xs text-slate-700 mb-4 border border-slate-200">
          <div className="flex justify-between">
            <span className="text-slate-400">Trainee Name:</span>
            <span className="font-semibold text-slate-900">{trainee.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Trade:</span>
            <span className="font-medium truncate max-w-[170px]">{trainee.courseName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">District:</span>
            <span className="font-medium">{trainee.district}, {trainee.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Certified On:</span>
            <span className="font-medium">{trainee.certificationDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(trainee.utid);
              alert(`UTID ${trainee.utid} copied to clipboard!`);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-navy-800 text-white font-medium text-xs hover:bg-navy-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Copy UTID
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
