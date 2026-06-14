"use client";

import { useRef, useState } from 'react';
// If you switched to html2canvas-pro to fix the lab() color error:
import html2canvas from 'html2canvas-pro'; 

export default function SuccessView({ bookingDetails, onReset }) {
  // 1. Create a specific ref just for the downloadable ticket section
  const slipOnlyRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInstantDownload = async () => {
    if (!slipOnlyRef.current || isDownloading) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(slipOnlyRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: '#ffffff', 
        logging: false,
        windowWidth: 400, 
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `VerdantDental-Slip-${bookingDetails?.appointmentNumber || 'Receipt'}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Instant image extraction interface error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className="w-full max-w-md mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-100 animate-fade-in relative z-20"
    >
      {/* Header Segment - This will now be completely EXCLUDED from the download */}
      <div className="bg-gradient-to-r from-blue-50 to-white p-6 text-center border-b border-slate-100">
        <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-extrabold text-slate-900">Appointment Registered!</h2>
        <p className="text-xs text-blue-600 font-medium mt-1">Please show the digital slip below on arrival.</p>
      </div>

      {/* 3. Attach 'slipOnlyRef' to this inner wrapper block instead */}
      <div ref={slipOnlyRef} className="p-6 space-y-4 bg-white relative">
        
        {/* Token Number Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Appointment Number</p>
          <p className="text-xl font-mono font-black text-blue-600 tracking-wider mt-0.5">
            {bookingDetails?.appointmentNumber}
          </p>
        </div>

        {/* Data Fields */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Assigned Doctor</span>
            <span className="font-bold text-slate-800">{bookingDetails?.doctor?.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Treatment</span>
            <span className="font-bold text-slate-800">{bookingDetails?.service?.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Scheduled Date</span>
            <span className="font-bold text-slate-700">{bookingDetails?.date}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Allocated Time</span>
            <span className="font-extrabold text-blue-600">{bookingDetails?.time}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-slate-400 font-medium">Patient</span>
            <span className="font-bold text-slate-700">{bookingDetails?.name}</span>
          </div>
        </div>

        {/* 4. Added custom 'no-print' class utility wrapper to exclude action buttons organically */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4" data-html2canvas-ignore="true">
          <button
            onClick={handleInstantDownload}
            disabled={isDownloading}
            className={`flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/10 active:scale-[0.98] ${
              isDownloading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {isDownloading ? 'Generating...' : 'Download Slip'}
          </button>
          
          <button
            onClick={onReset}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all uppercase tracking-wide border border-slate-200/60 active:scale-[0.98]"
          >
            Return to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}