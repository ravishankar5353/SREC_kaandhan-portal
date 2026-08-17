import React from 'react';
import { motion } from 'framer-motion';
import { School, Award, MapPin, Calendar, Globe, Phone, Mail, Building2, ShieldAlert } from 'lucide-react';
import { COLLEGE_INFO } from '../utils/constants';

const CollegeProfile = () => {
  return (
    <motion.div className="page-container text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">College Profile & statutory Info</h1>
          <p className="page-subtitle">Santhiram Engineering College (SREC), Nandyal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: General Profile Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl font-['Outfit'] shadow-lg">
                S
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">{COLLEGE_INFO.name}</h2>
                <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">{COLLEGE_INFO.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-indigo-400" />
                <span>Established: <strong>{COLLEGE_INFO.established}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-indigo-400" />
                <span>Accreditation: <strong className="text-cyan-400">NAAC '{COLLEGE_INFO.naac}' (Highest Grade)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-indigo-400" />
                <span>Affiliation: <strong className="text-amber-400">{COLLEGE_INFO.university}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-indigo-400" />
                <a href={COLLEGE_INFO.website} target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline font-bold">
                  {COLLEGE_INFO.website}
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Santhiram Engineering College (SREC) is a premier engineering institution located in Nandyal, Andhra Pradesh.
              Accredited with NAAC 'A+' and affiliated to JNTU Anantapur, the college has been imparting high-quality technical education
              since 2007, under the vision of founder Dr. M. Santhiramudu.
            </p>
          </div>

          {/* Core Vision & Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Our Vision</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To be a centre of excellence in education and research, producing globally competent, ethically strong, and socially responsible engineers.
              </p>
            </div>
            <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Our Mission</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Provide student-centric training, cutting-edge labs, collaborations with corporate partners, and encourage active research to address societal needs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Directory & Campus Address */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Official Helpline
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-rose-400 mt-0.5 shrink-0" />
                <span>{COLLEGE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>{COLLEGE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-cyan-400 shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center mx-auto">
              <ShieldAlert size={20} />
            </div>
            <h4 className="text-xs font-bold text-white">EAPCET Counselling Code</h4>
            <div className="text-2xl font-black text-white font-['Outfit'] tracking-widest uppercase">
              SREC
            </div>
            <p className="text-[10px] text-slate-400">Apply using code "SREC" for admissions</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollegeProfile;
