'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  ArrowLeft,
  FileText,
  CheckCircle2,
  Sparkles,
  BookOpen,
  FolderPlus
} from 'lucide-react';
import { ResourceItem, INITIAL_RESOURCES } from '../../../lib/data';
import { getStoredData, setStoredData } from '../../../lib/store';

export default function ResourceUploadPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    courseCode: '',
    title: '',
    department: 'CSE' as 'CSE' | 'EEE' | 'BBA' | 'Civil' | 'Pharmacy' | 'English' | 'Law',
    semester: '3rd Semester',
    category: 'Lecture Notes' as 'Lecture Notes' | 'Past Exam Questions' | 'Lab Manuals' | 'Notices',
    faculty: '',
    overview: '',
    fileName: 'lecture_handout_spring2026.pdf',
    fileSize: '3.6 MB'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const existing = getStoredData<ResourceItem[]>('resources', INITIAL_RESOURCES);
    const newId = `res-upload-${Date.now()}`;

    const newResource: ResourceItem = {
      id: newId,
      courseCode: form.courseCode.toUpperCase(),
      title: form.title,
      department: form.department,
      semester: form.semester,
      category: form.category,
      faculty: form.faculty || 'Departmental Course Faculty',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: form.fileSize,
      downloadsCount: 1,
      aiSummary: {
        overview: form.overview || `Official ${form.courseCode} study resource uploaded to City University Vault. Covers fundamental course components, lecture modules, and exam preparation items.`,
        keyFormulas: [
          `${form.courseCode} Core Formulation & Analytical Derivations`,
          'Standard Examination Rubrics and Evaluation Criteria'
        ],
        highYieldQuestions: [
          {
            question: `Explain the foundational concept covered in ${form.courseCode}.`,
            answer: 'Detailed analytical problem solving derived from departmental syllabus and practical laboratory evaluations.'
          }
        ],
        quickRevisionNotes: [
          'Review all faculty problem sets prior to mid-term assessments.',
          'Verify notations against standard departmental textbook benchmarks.'
        ]
      }
    };

    const updated = [newResource, ...existing];
    setStoredData('resources', updated);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessId(newId);
    }, 700);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-4xl mx-auto space-y-2">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs text-[#dfc37a] hover:underline mb-1 font-serif"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Resource Hub</span>
          </Link>
          <h1 className="text-3xl font-bold font-serif text-white">
            Upload Academic Resource
          </h1>
          <p className="text-sm text-slate-300">
            Contribute peer lecture notes, laboratory manual guides, or past question banks to the permanent academic vault.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-academic">
          {successId ? (
            <div className="text-center py-12 space-y-4 bg-emerald-50 rounded-xl border border-emerald-200 p-6">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-emerald-950">
                Resource Uploaded Successfully!
              </h2>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                &quot;{form.title}&quot; has been indexed into the City University Academic Vault. AI summary digest generated automatically.
              </p>
              <div className="pt-4 flex items-center justify-center gap-4">
                <Link
                  href="/resources"
                  className="px-6 py-2.5 bg-[#002147] hover:bg-[#002e63] text-white text-xs font-bold rounded-lg shadow"
                >
                  View in Resource Hub
                </Link>
                <button
                  onClick={() => {
                    setSuccessId(null);
                    setForm({
                      courseCode: '',
                      title: '',
                      department: 'CSE',
                      semester: '3rd Semester',
                      category: 'Lecture Notes',
                      faculty: '',
                      overview: '',
                      fileName: 'lecture_handout.pdf',
                      fileSize: '3.6 MB'
                    });
                  }}
                  className="px-4 py-2.5 border border-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50"
                >
                  Upload Another File
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE-323, EEE-211, BBA-301"
                    value={form.courseCode}
                    onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono uppercase focus:ring-2 focus:ring-[#002147] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department *
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  >
                    <option value="CSE">Computer Science &amp; Engineering (CSE)</option>
                    <option value="EEE">Electrical &amp; Electronic Engineering (EEE)</option>
                    <option value="BBA">Business Administration (BBA)</option>
                    <option value="Civil">Civil Engineering (CE)</option>
                    <option value="Pharmacy">Department of Pharmacy</option>
                    <option value="English">Department of English</option>
                    <option value="Law">Faculty of Law</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microprocessors 8086 Assembly Language Lab Protocol"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Semester
                  </label>
                  <select
                    value={form.semester}
                    onChange={(e) => setForm({ ...form, semester: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none bg-white"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Past Exam Questions">Past Exam Questions</option>
                    <option value="Lab Manuals">Lab Manuals</option>
                    <option value="Notices">Notices</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Faculty In-Charge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. M. Rahman"
                    value={form.faculty}
                    onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Executive Abstract / AI Study Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize key topics, chapters, and lab experiments covered in this document..."
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#002147] focus:outline-none"
                />
              </div>

              {/* Drag and Drop Simulator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Document File (PDF / DOCX)
                </label>
                <div className="border-2 border-dashed border-[#002147]/30 hover:border-[#002147] bg-[#f0f5fa]/50 rounded-xl p-8 text-center cursor-pointer transition-colors">
                  <FileText className="w-10 h-10 text-[#002147] mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-800">
                    Selected File: {form.fileName} ({form.fileSize})
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Drag and drop file here or click to browse (Max 25MB). Verified by IQAC.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-4">
                <Link
                  href="/resources"
                  className="px-5 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#002147] hover:bg-[#002e63] text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Upload className="w-4 h-4 text-[#dfc37a]" />
                  <span>{isSubmitting ? 'Indexing into Vault...' : 'Publish to Vault'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
