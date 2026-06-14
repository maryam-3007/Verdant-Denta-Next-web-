"use client";

import { useState } from 'react';
import { doctors, services } from '../data/mockData';
import BookingWizard from '../components/BookingWizard';
import SuccessView from '../components/SuccessView';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      text: "The integration of custom timings based on the direct doctor slots saved me hours. Dr. Sarah Ahmed was absolutely fantastic during the orthodontic checkout session.",
      author: "Maleeha Shah, Karachi"
    },
    {
      id: 2,
      text: "Stunning clinic interior interface matched perfectly with a brilliant booking flow. Got my token instantly and walked right into the Root Canal operation block on schedule.",
      author: "Hamza Malik, Karachi"
    }
  ]);

  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('Karachi');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLaunchBooking = (doctorId = null) => {
    setPreselectedDoctor(doctorId);
    setActiveTab('book');
    setIsMenuOpen(false); 
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); 
  };

  // 2. Form Submission Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !reviewerName.trim()) return;

    const newReview = {
      id: Date.now(),
      text: reviewText.trim(),
      author: `${reviewerName.trim()}, ${reviewerCity.trim()}`
    };

    setTestimonials([newReview, ...testimonials]);
    
    setReviewText('');
    setReviewerName('');
    setFormSubmitted(true);

    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const renderAnimatedWord = (word, startDelayOffset = 0) => {
    return (
      <span className="inline-block whitespace-nowrap">
        {word.split("").map((char, index) => (
          <span
            key={index}
            className="animate-letter text-slate-900"
            style={{ 
              animationDelay: `${startDelayOffset + (index * 25)}ms`
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between relative overflow-hidden selection:bg-blue-500/20 selection:text-blue-900">
      
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-100/40 blur-[140px] pointer-events-none animate-ambient-slow z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-100/30 blur-[130px] pointer-events-none animate-ambient-slow z-0" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-blue-50/40 blur-[120px] pointer-events-none animate-ambient-slow z-0" style={{ animationDelay: '4s' }} />

      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pointer-events-none no-print">
        <header className="max-w-6xl mx-auto bg-white/75 backdrop-blur-xl border border-slate-200/50 rounded-2xl transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.02)] px-4 sm:px-6 py-3 flex justify-between items-center pointer-events-auto relative overflow-hidden">
          
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          <div 
            className="flex items-center space-x-3 cursor-pointer group relative py-1" 
            onClick={() => handleTabChange('home')}
          >
            <div className="relative w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all duration-300">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300 z-10" />
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs tracking-[0.25em] text-slate-900">
                VERDANT<span className="text-blue-600 font-light tracking-[0.15em]">DENTAL</span>
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ORAL STUDIO</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 text-xs font-bold tracking-wider uppercase">
            <button 
              onClick={() => handleTabChange('home')} 
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 group ${
                activeTab === 'home' 
                  ? 'text-blue-600 font-extrabold bg-blue-50/40' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
              }`}
            >
              <span className="relative z-10">Overview</span>
              {activeTab === 'home' && (
                <div className="absolute inset-0 border border-blue-500/10 rounded-xl bg-gradient-to-b from-blue-500/[0.02] to-transparent shadow-inner" />
              )}
            </button>
            
            <button 
              onClick={() => handleTabChange('doctors')} 
              className={`relative px-4 py-2 rounded-xl transition-all duration-300 group ${
                activeTab === 'doctors' 
                  ? 'text-blue-600 font-extrabold bg-blue-50/40' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
              }`}
            >
              <span className="relative z-10">Specialists</span>
              {activeTab === 'doctors' && (
                <div className="absolute inset-0 border border-blue-500/10 rounded-xl bg-gradient-to-b from-blue-500/[0.02] to-transparent shadow-inner" />
              )}
            </button>

            <div className="pl-2">
              <button 
                onClick={() => handleLaunchBooking(null)}
                className="relative bg-gradient-to-r from-blue-600 to-sky-500 text-white font-extrabold normal-case tracking-normal px-5 py-2.5 rounded-xl text-xs transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(37,99,235,0.3)] hover:scale-[1.03] active:scale-[0.98] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-1.5">
                  Book Seat
                  <span className="text-[10px] opacity-80 group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </span>
              </button>
            </div>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1 active:bg-slate-100 transition-all duration-200"
            aria-label="Toggle Menu"
          >
            <span className={`w-4 h-0.5 bg-slate-700 transition-transform duration-300 rounded-full ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-4 h-0.5 bg-slate-700 transition-opacity duration-200 rounded-full ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-slate-700 transition-transform duration-300 rounded-full ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </header>
      </div>

      <div className={`fixed inset-x-4 top-24 z-40 md:hidden transition-all duration-300 ease-out transform ${
        isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-4 shadow-xl flex flex-col space-y-2">
          <button
            onClick={() => handleTabChange('home')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabChange('doctors')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'doctors' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Specialists
          </button>
          <hr className="border-slate-100 my-1" />
          <button
            onClick={() => handleLaunchBooking(null)}
            className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-extrabold text-xs text-center py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            Book Seat Now
          </button>
        </div>
      </div>

      <main className="flex-grow z-10 flex flex-col items-center justify-center w-full">
        
        {activeTab === 'home' && (
          <div className="w-full space-y-24 py-12 md:py-20">
            
            {/* 1. HERO SECTION */}
            <section className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 flex justify-center items-center order-2 md:order-1 animate-fade-in-up relative z-20" style={{ animationDelay: '100ms' }}>
                <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-lg relative group p-4 sm:p-6 bg-slate-50 border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src="/dental.jpg" 
                    alt="Aesthetic Dental Studio" 
                    className="w-full h-auto aspect-[4/3] object-cover rounded-2xl filter drop-shadow-[0_10px_20px_rgba(37,99,235,0.08)] transform group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-500 relative z-30"
                  />
                </div>
              </div>

              <div className="md:col-span-6 space-y-6 text-center md:text-left order-1 md:order-2 relative z-20">
                <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm animate-fade-in-up">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] tracking-widest uppercase font-bold text-blue-600">
                    Elite Restorative Oral Studio
                  </span>
                </div>
                
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.2] select-none flex flex-wrap gap-x-3 gap-y-1 justify-center md:justify-start"
                  style={{ perspective: "1000px" }}
                >
                  {renderAnimatedWord("Crafting", 0)}
                  {renderAnimatedWord("smiles", 200)}
                  {renderAnimatedWord("that", 380)}
                  {renderAnimatedWord("radiate", 500)}
                  
                  <span className="inline-block whitespace-nowrap">
                    {"confidence.".split("").map((char, index) => (
                      <span
                        key={`conf-${index}`}
                        className="animate-letter font-normal text-blue-600 hover:text-sky-500 transition-colors duration-300 cursor-default"
                        style={{ 
                          fontFamily: "'Lobster', cursive",
                          animationDelay: `${700 + (index * 35)}ms`
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </h1>
                
                <p 
                  className="text-sm md:text-base text-slate-550 max-w-xl mx-auto md:mx-0 leading-relaxed font-light animate-fade-in-up"
                  style={{ animationDelay: '1100ms' }}
                >
                  Welcome to a luxury dental dynamic ecosystem. Match your custom treatments seamlessly with our assigned dental surgeons based on synchronized scheduling patterns.
                </p>
                
                <div 
                  className="pt-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-fade-in-up"
                  style={{ animationDelay: '1250ms' }}
                >
                  <button
                    onClick={() => handleLaunchBooking(null)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Instant Secure Booking
                  </button>
                  <button
                    onClick={() => handleTabChange('doctors')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-200"
                  >
                    Explore Medical Panel
                  </button>
                </div>
              </div>
            </section>

            {/* 2. CLINICAL INSIGHT STATS */}
            <section className="max-w-5xl mx-auto px-4 w-full animate-fade-in-up relative z-20" style={{ animationDelay: '1400ms' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100">
                <div className="text-center group">
                  <p className="text-3xl font-extrabold text-blue-600 tracking-tight group-hover:scale-110 transition-transform duration-300">99.4%</p>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Satisfaction Score</p>
                </div>
                <div className="text-center border-l border-slate-200 group">
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">12k+</p>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Successful Procedures</p>
                </div>
                <div className="text-center md:border-l border-slate-200 group">
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight group-hover:scale-110 transition-transform duration-300">15+</p>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Elite Practitioners</p>
                </div>
                <div className="text-center border-l border-slate-200 group">
                  <p className="text-3xl font-extrabold text-blue-600 tracking-tight group-hover:scale-110 transition-transform duration-300">Zero</p>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Waitlist Overhead</p>
                </div>
              </div>
            </section>

            {/* 3. CORE SERVICES GRID */}
            <section className="max-w-5xl mx-auto px-4 w-full space-y-10 relative z-20">
              <div className="text-center space-y-2 animate-fade-in-up" style={{ animationDelay: '1500ms' }}>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Specialized Surgical Treatments</h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Explore our {services.length} core clinical operations handled with premium technology frameworks.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((ser, idx) => (
                  <div 
                    key={ser.id} 
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500/40 hover:bg-slate-50/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group animate-fade-in-up shadow-sm shadow-slate-100"
                    style={{ animationDelay: `${1550 + idx * 75}ms` }}
                  >
                    <div className="space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        ✓
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 pt-2 group-hover:text-blue-600 transition-colors duration-200">{ser.name}</h3>
                      <p className="text-xs text-slate-500">Duration spectrum: {ser.duration}</p>
                    </div>
                    <p className="text-sm font-extrabold text-blue-600 mt-4">{ser.price}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. CLINICAL REVIEWS SECTION */}
            <section className="max-w-5xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-20 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Patient Testimonials</h2>
                  <p className="text-xs text-slate-400">Authentic operational updates shared by our dental studio community members.</p>
                </div>
                
                <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                  {testimonials.map((review) => (
                    <div 
                      key={review.id} 
                      className="p-5 bg-slate-50/40 border border-slate-200 rounded-2xl space-y-3 hover:border-blue-200 hover:bg-white transition-all duration-300 shadow-sm animate-fade-in"
                    >
                      <p className="text-xs text-slate-600 italic leading-relaxed">
                        {review.text}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="w-1 h-1 rounded-full bg-blue-500" />
                        <p className="text-[11px] font-bold text-blue-600 tracking-wider">— {review.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-100/80 sticky top-24">
                <div className="space-y-1 mb-4">
                  <h3 className="text-sm font-black tracking-wider uppercase text-slate-900">Share Your Experience</h3>
                  <p className="text-[11px] text-slate-400">Your professional metrics help us continuously scale our workflows.</p>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">Your Review</label>
                    <textarea
                      required
                      rows="3"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="How was your procedure layout context? Mention your assigned doctor slot..."
                      className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-700 bg-slate-50/50 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="Your name..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-700 bg-slate-50/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">Location / City</label>
                      <input
                        type="text"
                        value={reviewerCity}
                        onChange={(e) => setReviewerCity(e.target.value)}
                        placeholder="Your city..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-slate-700 bg-slate-50/50 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-blue-600 hover:bg-blue-400 text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wider active:scale-[0.98]"
                  >
                    Submit Studio Feedback
                  </button>

                  {formSubmitted && (
                    <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-center animate-fade-in">
                      <p className="text-[10px] text-emerald-600 font-bold">Review processed and live-synced successfully!</p>
                    </div>
                  )}
                </form>
              </div>

            </section>

          </div>
        )}

        {/* VIEW 2: SPECIALIST DOCTORS PANEL */}
        {activeTab === 'doctors' && (
          <div className="w-full max-w-3xl px-4 py-12 space-y-6 animate-fade-in-up relative z-20">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900">Medical Associates Panel</h2>
              <p className="text-xs text-slate-400">Select a specialist below to initialize a booking context inside their shift duration framework.</p>
            </div>
            <div className="grid gap-4 pt-4">
              {doctors.map((doc, idx) => (
                <div 
                  key={doc.id} 
                  className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-50/30 shadow-sm shadow-slate-100 animate-fade-in-up"
                  style={{ animationDelay: `${150 + idx * 100}ms` }}
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold tracking-wide mt-0.5">{doc.specialty}</p>
                    <div className="flex items-center space-x-2 mt-3 text-slate-500">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[11px] font-mono tracking-wider">{doc.availability}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLaunchBooking(doc.id)}
                    className="w-full md:w-auto px-5 py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-bold text-slate-700 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    Select & Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SYSTEM ACTION BOOKING WIZARD */}
        {activeTab === 'book' && (
          <div className="w-full px-4 py-12 animate-fade-in relative z-20">
            {!confirmedBooking ? (
              <BookingWizard 
                initialDoctorId={preselectedDoctor} 
                onBookingComplete={async (data) => {
                  setConfirmedBooking(data);

                  const templateParams = {
                    patient_email: data?.email || '', 
                    patient_name: data?.name || 'Valued Patient',
                    appointment_number: data?.appointmentNumber || 'N/A',
                    doctor_name: data?.doctor?.name || 'Assigned Specialist',
                    treatment_name: data?.service?.name || 'General Dental Treatment',
                    scheduled_date: data?.date || '',
                    allocated_time: data?.time || '',
                    patient_phone: data?.phone || ''
                  };

                  const SERVICE_ID = 'service_bm3sclf';
                  const TEMPLATE_ID = 'template_9xyt8ni';
                  const PUBLIC_KEY = 'keyR_CFj8nrSM53ho'; 

                  try {
                    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
                    console.log('Digital receipt sent successfully!', result.text);
                  } catch (error) {
                    console.warn('EmailJS background transmission failed cleanly:', error);
                  }
                }} 
              />
            ) : (
              <SuccessView 
                bookingDetails={confirmedBooking} 
                onReset={() => {
                  setConfirmedBooking(null);
                  handleTabChange('home');
                }} 
              />
            )}
          </div>
        )}

      </main>

      <footer className="text-center py-6 border-t border-slate-200 text-[10px] text-slate-400 font-bold tracking-widest uppercase bg-slate-50 relative z-20 no-print">
        &copy; {new Date().getFullYear()} VERDANT DENTAL MEDICAL CLINIC INC. CLINICAL AUTOMATED INTERFACES.
      </footer>
    </div>
  );
}