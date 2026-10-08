'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatDrawer from '../components/AIChatDrawer';
import AuthModal from '../components/AuthModal';
import { getStoredData, DEFAULT_STUDENT, StudentProfile } from '../lib/store';
import { Sparkles } from 'lucide-react';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);

  useEffect(() => {
    setStudent(getStoredData<StudentProfile>('student', DEFAULT_STUDENT));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      <Navbar
        onOpenAiChat={() => setIsAiOpen(true)}
        onOpenProfile={() => setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Floating AI Helper quick launcher */}
      <button
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#002147] hover:bg-[#002e63] text-white p-3.5 rounded-full shadow-2xl border-2 border-[#c5a059] flex items-center gap-2 group transition-all hover:scale-105"
        title="Open City University Grounded AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-[#dfc37a] group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold pr-1 hidden sm:inline text-slate-100">
          AI Helpdesk
        </span>
      </button>

      {/* Modals & Drawers */}
      <AIChatDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentStudent={student}
        onUpdateStudent={(updated) => setStudent(updated)}
      />
    </div>
  );
}
