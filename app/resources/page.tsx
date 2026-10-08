'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  X,
  GraduationCap,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  Printer
} from 'lucide-react';
import { INITIAL_RESOURCES, ResourceItem } from '../../lib/data';
import { getStoredData, setStoredData } from '../../lib/store';

function ResourcesContent() {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // AI Summary Drawer State
  const [aiSummaryResource, setAiSummaryResource] = useState<ResourceItem | null>(null);
  // Downloaded feedback notification
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getStoredData<ResourceItem[]>('resources', INITIAL_RESOURCES);
    setResources(loaded);

    // Initial query params
    const q = searchParams.get('query');
    const dept = searchParams.get('dept');
    if (q) setSearchQuery(q);
    if (dept) setSelectedDept(dept);
  }, [searchParams]);

  const departments = ['All', 'CSE', 'EEE', 'BBA', 'Civil', 'Pharmacy', 'English', 'Law'];
  const semesters = ['All', '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  const categories = ['All', 'Lecture Notes', 'Past Exam Questions', 'Lab Manuals', 'Notices'];

  const filteredResources = resources.filter((item) => {
    const matchesDept = selectedDept === 'All' || item.department === selectedDept;
    const matchesSemester = selectedSemester === 'All' || item.semester === selectedSemester;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.faculty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSemester && matchesCategory && matchesSearch;
  });

  const handleDownload = (item: ResourceItem) => {
    // Increment download count in local storage
    const updated = resources.map((r) =>
      r.id === item.id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r
    );
    setResources(updated);
    setStoredData('resources', updated);

    // Trigger printable academic document window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${item.courseCode} - ${item.title}</title>
          <style>
            body { font-family: Georgia, serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            .header { border-bottom: 3px solid #002147; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .badge { background: #f0f5fa; color: #002147; border: 1px solid #002147; padding: 4px 10px; font-size: 12px; font-weight: bold; border-radius: 4px; }
            h1 { color: #002147; margin: 0 0 10px 0; font-size: 24px; }
            .meta { font-size: 13px; color: #64748b; font-family: sans-serif; }
            .content { margin-top: 20px; font-size: 14px; }
            .section { margin-bottom: 24px; }
            .section h3 { color: #002147; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; font-size: 16px; }
            .watermark { position: fixed; top: 40%; left: 20%; transform: rotate(-30deg); font-size: 70px; color: rgba(0, 33, 71, 0.04); font-weight: bold; pointer-events: none; }
            .footer { margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div class="watermark">CITY UNIVERSITY DHAKA</div>
          <div class="header">
            <div>
              <div class="badge">OFFICIAL ACADEMIC VAULT • CITY UNIVERSITY</div>
              <h1>${item.courseCode}: ${item.title}</h1>
              <div class="meta">Department: ${item.department} | ${item.semester} | Faculty: ${item.faculty}</div>
            </div>
            <div style="text-align: right; font-family: sans-serif; font-size: 12px;">
              <strong>Category:</strong> ${item.category}<br/>
              <strong>Date:</strong> ${item.uploadDate}
            </div>
          </div>

          <div class="content">
            <div class="section">
              <h3>Academic Overview</h3>
              <p>${item.aiSummary.overview}</p>
            </div>

            <div class="section">
              <h3>Core Mathematical Formulations & Theorems</h3>
              <ul>
                ${item.aiSummary.keyFormulas.map((f) => `<li><strong>${f}</strong></li>`).join('')}
              </ul>
            </div>

            <div class="section">
              <h3>High-Yield Examination Questions</h3>
              ${item.aiSummary.highYieldQuestions.map((q) => `
                <div style="margin-bottom: 15px;">
                  <strong style="color: #002147;">${q.question}</strong>
                  <p style="margin: 4px 0 0 15px;">${q.answer}</p>
                </div>
              `).join('')}
            </div>

            <div class="section">
              <h3>Final Examination Revision Directives</h3>
              <ul>
                ${item.aiSummary.quickRevisionNotes.map((n) => `<li>${n}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="footer">
            Certified Academic Resource Document • City University Permanent Campus, Birulia, Savar • Verified by IQAC Cell
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }

    setDownloadSuccess(item.courseCode);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001733] border border-[#c5a059]/50 text-xs font-serif text-[#dfc37a]">
              <span>Central Library &amp; Examination Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Academic Resource Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Access peer-reviewed lecture notes, previous 5 semesters of solved exam question banks, certified lab manuals, and instant AI revision digests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/resources/upload"
              className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] rounded-lg font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Upload className="w-4 h-4 text-[#002147]" />
              <span>Contribute / Upload Notes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Vault Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document PDF opened for printing &amp; downloading for <strong>{downloadSuccess}</strong>! Download count updated.</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search course code (e.g. CSE-211, Algorithms, Database, Circuits)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-slate-50"
              />
            </div>

            {/* Department Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white font-medium text-slate-700"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Departments' : `Dept. of ${d}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Dropdown */}
            <div className="w-full md:w-52">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white font-medium text-slate-700"
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Semesters' : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#002147] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic hover:border-[#002147] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#002147] bg-[#f0f5fa] border border-[#94bcdf] px-2.5 py-1 rounded">
                      {item.courseCode}
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-0.5 rounded">
                      {item.semester}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#85622e] bg-[#fcf8ee] border border-[#dfc37a] px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#002147] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Faculty details */}
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Faculty:</strong> {item.faculty}
                </p>

                {/* AI Summary Teaser */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-[#002147] text-[11px] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>AI Exam Digest Preview:</span>
                  </div>
                  <p className="line-clamp-2 italic">
                    &quot;{item.aiSummary.overview}&quot;
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Size: {item.fileSize} • Uploaded {item.uploadDate}</span>
                  <span className="font-mono">{item.downloadsCount} Downloads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setAiSummaryResource(item)}
                  className="px-3.5 py-2 rounded-lg border border-[#002147] bg-[#f0f5fa] text-[#002147] hover:bg-[#e1ebf5] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>AI Summary Drawer</span>
                </button>

                <button
                  onClick={() => handleDownload(item)}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#002e63] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfc37a]" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No courseware found matching query</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting department filters or search keywords.</p>
          </div>
        )}
      </section>

      {/* AI Summary Slide-Out Drawer */}
      {aiSummaryResource && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l-2 border-[#002147] overflow-hidden">
            {/* Drawer Header */}
            <div className="bg-[#002147] text-white p-6 border-b-2 border-[#c5a059] flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#dfc37a] bg-[#001733] px-2 py-0.5 rounded border border-[#c5a059]/40">
                    {aiSummaryResource.courseCode}
                  </span>
                  <span className="text-xs text-slate-300">
                    {aiSummaryResource.semester} • {aiSummaryResource.department}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {aiSummaryResource.title}
                </h3>
                <p className="text-xs text-slate-400">
                  AI Academic Digest • Grounded on Faculty Handouts
                </p>
              </div>
              <button
                onClick={() => setAiSummaryResource(null)}
                className="text-slate-300 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {/* Executive Overview */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase tracking-wider font-serif">
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>Executive Curriculum Overview</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {aiSummaryResource.aiSummary.overview}
                </p>
              </div>

              {/* Key Formulas & Equations */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase tracking-wider font-serif">
                  <Layers className="w-4 h-4 text-[#c5a059]" />
                  <span>Key Formulas &amp; Theoretical Theorems</span>
                </div>
                <div className="space-y-2">
                  {aiSummaryResource.aiSummary.keyFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#f0f5fa] border border-slate-200 font-mono text-xs text-[#002147] font-semibold"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* High Yield Exam Questions */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase tracking-wider font-serif">
                  <HelpCircle className="w-4 h-4 text-[#c5a059]" />
                  <span>High-Yield Examination Questions &amp; Model Answers</span>
                </div>
                <div className="space-y-4">
                  {aiSummaryResource.aiSummary.highYieldQuestions.map((qa, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="font-bold text-slate-900 font-serif">
                        {qa.question}
                      </div>
                      <div className="text-slate-700 pl-3 border-l-2 border-[#c5a059] leading-relaxed">
                        {qa.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Revision Notes */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#002147] uppercase tracking-wider font-serif">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>10-Minute Rapid Revision Checkpoints</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {aiSummaryResource.aiSummary.quickRevisionNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002147] mt-1.5 shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official City University Academic Archive
              </span>
              <button
                onClick={() => handleDownload(aiSummaryResource)}
                className="px-5 py-2.5 bg-[#002147] hover:bg-[#002e63] text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4 text-[#dfc37a]" />
                <span>Print Official PDF Handout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-slate-500 text-xs">
          <BookOpen className="w-8 h-8 text-[#002147] animate-pulse mx-auto mb-2" />
          <span>Accessing City University Resource Vault...</span>
        </div>
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
