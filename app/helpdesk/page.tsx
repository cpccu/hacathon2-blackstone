'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bus,
  Search,
  Phone,
  Clock,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  FileText,
  ShieldAlert,
  Send,
  Building,
  Calendar
} from 'lucide-react';
import { SHUTTLE_BUS_ROUTES, EXAM_FAQS, BusRoute, FAQItem } from '../../lib/data';

export default function HelpdeskPage() {
  const [busSearch, setBusSearch] = useState('');
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  
  // Embedded Grounded AI Assistant State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<{ query: string; answer: string; source: string } | null>(null);

  const filteredRoutes = SHUTTLE_BUS_ROUTES.filter((route) => {
    const matchesFilter = selectedRouteFilter === 'All' || route.id.includes(selectedRouteFilter.toLowerCase());
    const matchesSearch =
      route.routeName.toLowerCase().includes(busSearch.toLowerCase()) ||
      route.routeCode.toLowerCase().includes(busSearch.toLowerCase()) ||
      route.stoppages.some((s) => s.toLowerCase().includes(busSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleAskAi = (presetQuestion?: string) => {
    const q = (presetQuestion || aiQuestion).trim();
    if (!q) return;

    const lower = q.toLowerCase();
    let ans = '';
    let src = '';

    if (lower.includes('calculator') || lower.includes('991ex') || lower.includes('991es') || lower.includes('calc')) {
      ans = 'Casio fx-991EX ClassWiz and fx-991ES Plus are officially permitted by the Controller of Examinations. Graphic calculators with alphanumeric text storage (fx-9860G, TI-84) and Bluetooth-enabled smart devices are strictly prohibited and liable for exam cancellation.';
      src = 'City University Exam Controller Notice CE/2026/04';
    } else if (lower.includes('mirpur') || lower.includes('bus 02')) {
      ans = 'Mirpur-10 Route (BUS-02) departs Mirpur-10 Roundabout at 07:15 AM sharp. Return departures from Savar Permanent Campus are scheduled at 04:30 PM and 06:30 PM. Stoppages include Mirpur-1 Fire Service, Mazar Road, Beribadh, and Birulia.';
      src = 'Transport Department Operational Bulletin 2026';
    } else if (lower.includes('admit') || lower.includes('due') || lower.includes('fees')) {
      ans = 'To generate and print your Mid-Term Admit Card, students must clear at least 75% of total semester installment fees. For Final Exams, 100% dues clearance is mandatory. The printable Admit Card is available on your Student Portal 72 hours prior to examination dates.';
      src = 'Registrar & Accounts Directive Fall 2026';
    } else if (lower.includes('retake') || lower.includes('improvement')) {
      ans = 'Improvement exams are permitted for courses with grades below B (Grade Point < 3.00), eligible within the next 2 regular semesters. An F grade requires a mandatory Retake. The higher grade earned replaces the former in CGPA calculation.';
      src = 'Academic Council Bylaws, Section 6.4';
    } else if (lower.includes('hall') || lower.includes('dress') || lower.includes('mobile')) {
      ans = 'Mandatory ID card lanyard must be worn around your neck. Mobile phones, smartwatches, and headphones must be powered down and kept on the front bag rack. Keeping active digital devices at your exam desk leads to immediate expulsion under Code 10.2.';
      src = 'Student Disciplinary Board Directives 2026';
    } else {
      ans = `Inquiries regarding "${q}" are governed by City University Permanent Campus administrative protocols. For specific transactional approvals, contact the Registrar Office or Proctorial Cell at Birulia Campus.`;
      src = 'City University Student Services Handbook';
    }

    setAiResponse({ query: q, answer: ans, source: src });
    setAiQuestion('');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001733] border border-[#c5a059]/50 text-xs font-serif text-[#dfc37a]">
            <span>Logistics &amp; Student Welfare Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Smart Helpdesk &amp; Transport Hub
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Real-time City University shuttle bus schedules, examination hall conduct rules, calculator models whitelist, and grounded AI regulation query desk.
          </p>
        </div>
      </section>

      {/* 1. Shuttle Bus Schedule Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-[#002147]" />
              <h2 className="text-2xl font-bold font-serif text-[#002147]">
                City University Shuttle Bus Timetable
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Connecting Savar Permanent Campus with Mirpur, Uttara, Dhanmondi, and Gazipur.
            </p>
          </div>

          {/* Search Stoppages */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search stoppage (e.g. Mirpur, Azampur, C&B)..."
              value={busSearch}
              onChange={(e) => setBusSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-white"
            />
          </div>
        </div>

        {/* Bus Routes Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-academic overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#002147] text-white border-b-2 border-[#c5a059]">
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px]">Route &amp; Code</th>
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px]">Morning Departure</th>
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px]">Return from Campus</th>
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px]">Stoppage Trajectory</th>
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px]">Supervisor Contact</th>
                  <th className="p-4 font-serif font-bold uppercase tracking-wider text-[11px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-xs font-bold text-[#002147] bg-[#f0f5fa] px-2 py-0.5 rounded border border-[#94bcdf] block w-fit mb-1">
                        {route.routeCode}
                      </span>
                      <strong className="text-slate-900 text-sm font-serif block">
                        {route.routeName}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {route.busNumber}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-[#002147]" />
                        <span>{route.morningDeparture}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{route.activeDays}</span>
                    </td>

                    <td className="p-4 font-medium text-slate-800">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                        <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{route.returnDeparture}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Campus Gate Terminal</span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {route.stoppages.map((stop, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200"
                          >
                            {stop}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{route.supervisorName}</div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                        <Phone className="w-3 h-3 text-[#002147]" />
                        <span className="font-mono">{route.contactPhone}</span>
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {route.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. Exam Logistics & Conduct Rules Accordion */}
      <section id="exam-rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#002147]" />
            <h2 className="text-2xl font-bold font-serif text-[#002147]">
              Examination Logistics &amp; Conduct Rules
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official guidelines approved by the Controller of Examinations and Academic Council.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Collapsible Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {EXAM_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#f0f5fa] text-[#002147] border border-[#94bcdf]">
                        {faq.category}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-slate-900">
                        {faq.question}
                      </h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#002147] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-700 border-t border-slate-100 space-y-3 leading-relaxed">
                      <p>{faq.answer}</p>
                      {faq.importantNotice && (
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>Mandatory Directive:</strong> {faq.importantNotice}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Permitted Calculators Quick Visual Reference Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif font-bold text-sm text-slate-900">
                  Approved Exam Calculators
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>OFFICIALLY PERMITTED</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] space-y-1 text-emerald-800 pt-1">
                    <li>Casio fx-991EX (ClassWiz)</li>
                    <li>Casio fx-991ES Plus</li>
                    <li>Casio fx-100MS / fx-570MS</li>
                    <li>Casio fx-82MS</li>
                  </ul>
                </div>

                <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>STRICTLY BANNED</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] space-y-1 text-rose-800 pt-1">
                    <li>Casio fx-9860G / fx-CG50 Graphic</li>
                    <li>TI-84 / Texas Instruments</li>
                    <li>Any programmable or formula-storing devices</li>
                    <li>Smartwatches &amp; Smartphones</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Grounded AI Regulatory Assistant Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#002147] text-white rounded-2xl p-8 border-2 border-[#c5a059] shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#dfc37a]" />
              <span className="text-xs font-bold font-serif uppercase tracking-widest text-[#dfc37a]">
                Grounded University AI Assistant
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Instant Answers on Timings, Fines &amp; Academic Policies
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Type any question below or click a frequent question chip for an authoritative answer referenced against the official handbook.
            </p>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'When does the Mirpur 10 bus leave?',
                'Is Casio 991EX allowed in exam?',
                'Admit card clearance fee percentage?',
                'Retake vs Improvement CGPA rules'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskAi(chip)}
                  className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-slate-200 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskAi();
              }}
              className="flex gap-2 pt-2"
            >
              <input
                type="text"
                placeholder="Ask about bus schedules, fees, hall rules..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-slate-900/80 border border-slate-600 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#dfc37a]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] font-bold text-xs rounded-lg flex items-center gap-2 shadow"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* AI Grounded Answer Box */}
            {aiResponse && (
              <div className="mt-4 p-5 bg-white text-slate-900 rounded-xl border border-slate-200 space-y-2 shadow-lg animate-fadeIn text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold font-serif text-[#002147]">Query: &quot;{aiResponse.query}&quot;</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Grounded Answer</span>
                </div>
                <p className="leading-relaxed whitespace-pre-line text-slate-800">
                  {aiResponse.answer}
                </p>
                <div className="pt-2 text-[10px] text-slate-500 italic">
                  Verification Source: {aiResponse.source}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
