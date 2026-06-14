"use client";

import { useState } from 'react';
import { services, doctors } from '../data/mockData';

export default function BookingWizard({ onBookingComplete, initialDoctorId }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    doctor: doctors.find(d => d.id === initialDoctorId) || null,
    service: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      return alert("Please fill in all required fields.");
    }
    
    const appointmentNumber = "DEN-" + Math.floor(100000 + Math.random() * 900000);
    onBookingComplete({ ...formData, appointmentNumber });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] backdrop-blur-md relative z-20 transition-all duration-500">
      
      {/* Tracker Header */}
      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-bold text-blue-600 mb-2.5 uppercase tracking-[0.15em]">
          <span>Step {step} of 3</span>
          <span className="text-slate-400">
            {step === 1 ? "Select Doctor & Treatment" : step === 2 ? "Schedule Session" : "Patient Contact"}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-sky-500 h-1 transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Doctor & Service Choice */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">1. Choose Your Dentist</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {doctors.map((doc) => {
                const isSelected = formData.doctor?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, doctor: doc, time: '' })}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 text-blue-900 shadow-sm shadow-blue-500/5'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{doc.name}</h4>
                        <p className="text-[11px] font-semibold text-blue-600 mt-0.5">{doc.specialty}</p>
                      </div>
                      <p className="text-[10px] font-mono tracking-wide text-slate-400 mt-4 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
                        {doc.availability}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">2. Select Dental Treatment</label>
            <div className="grid gap-2.5">
              {services.map((service) => {
                const isSelected = formData.service?.id === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, service })}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 text-blue-900 shadow-sm shadow-blue-500/5'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/40'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors duration-200">{service.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Duration spectrum: {service.duration}</p>
                    </div>
                    <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                      {service.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              disabled={!formData.doctor || !formData.service}
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-30 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Adaptive Schedule Matching */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-200/60 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Selected Practitioner</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">{formData.doctor?.name}</p>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
              {formData.doctor?.availability}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5">Select Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5">Available Patient Slots</label>
              <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {formData.doctor?.slots.map((slot) => {
                  const isSelected = formData.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: slot })}
                      className={`p-3 text-xs font-bold rounded-xl text-center border transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button onClick={prevStep} className="px-4 py-2 text-slate-400 hover:text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors">
              Back
            </button>
            <button
              disabled={!formData.date || !formData.time}
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-30 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Secure Details Submission */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Patient Records Integration</h2>
            <p className="text-xs text-slate-400 mt-0.5">Please fill in your primary details to complete your verification.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Patient Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                placeholder="Maryam Ilyas"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                  placeholder="name@domain.com"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button type="button" onClick={prevStep} className="px-4 py-2 text-slate-400 hover:text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors">
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/10 hover:opacity-95 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Finalize & Secure Token
            </button>
          </div>
        </form>
      )}
    </div>
  );
}