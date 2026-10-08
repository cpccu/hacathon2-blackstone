'use client';

import React, { useState } from 'react';
import { X, User, Check, ShieldCheck, Sparkles, Building, IdCard } from 'lucide-react';
import { StudentProfile, setStoredData } from '../lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentStudent,
  onUpdateStudent
}: AuthModalProps) {
  const [formData, setFormData] = useState<StudentProfile>(currentStudent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      avatarLetter: formData.name ? formData.name.charAt(0).toUpperCase() : 'U'
    };
    setStoredData('student', updated);
    onUpdateStudent(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const presetProfiles = [
    {
      name: 'Rafiqul Islam',
      studentId: '211-15-4890',
      department: 'Computer Science & Engineering',
      batch: 'Batch 54',
      email: 'rafiqul.cse54@cityuniversity.edu.bd',
      phone: '+880 1712-345678',
      campus: 'Permanent Campus (Birulia, Savar)',
      avatarLetter: 'R'
    },
    {
      name: 'Nusrat Jahan',
      studentId: '222-11-7312',
      department: 'Business Administration (BBA)',
      batch: 'Batch 56',
      email: 'nusrat.bba56@cityuniversity.edu.bd',
      phone: '+880 1819-554433',
      campus: 'Permanent Campus (Birulia, Savar)',
      avatarLetter: 'N'
    },
    {
      name: 'Tanvir Hossain',
      studentId: '231-14-6105',
      department: 'Electrical & Electronic Engineering',
      batch: 'Batch 57',
      email: 'tanvir.eee57@cityuniversity.edu.bd',
      phone: '+880 1912-998877',
      campus: 'Permanent Campus (Birulia, Savar)',
      avatarLetter: 'T'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dfc37a] text-[#002147] flex items-center justify-center font-bold font-serif text-lg">
              {formData.avatarLetter || 'S'}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Student Authentication Vault</h3>
              <p className="text-xs text-[#dfc37a]">City University Integrated Identity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          {/* Quick preset selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Quick Test Personas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presetProfiles.map((p) => (
                <button
                  key={p.studentId}
                  type="button"
                  onClick={() => setFormData(p)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    formData.studentId === p.studentId
                      ? 'border-[#002147] bg-[#f0f5fa] font-semibold ring-1 ring-[#002147]'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-slate-900 truncate">{p.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{p.studentId}</div>
                  <div className="text-[10px] text-[#002147] truncate">{p.department.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student ID Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 211-15-4890"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#002147]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batch
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch 54"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering (EEE)</option>
                <option value="Business Administration (BBA)">Business Administration (BBA)</option>
                <option value="Civil Engineering">Civil Engineering (CE)</option>
                <option value="Department of Pharmacy">Department of Pharmacy</option>
                <option value="Department of English">Department of English</option>
                <option value="Department of Law">Faculty of Law</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  University Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Mobile
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#002147]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#002147] hover:bg-[#002e63] text-white rounded-md text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Profile Updated!</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#dfc37a]" />
                    <span>Save Identity</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
