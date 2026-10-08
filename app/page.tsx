'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Calendar,
  BookOpen,
  HelpCircle,
  Search,
  Ticket as TicketIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bus,
  Clock,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  MapPin,
  Flame,
  FileText
} from 'lucide-react';
import { INITIAL_EVENTS, INITIAL_RESOURCES, SHUTTLE_BUS_ROUTES, EventItem } from '../lib/data';
import { getStoredData, setStoredData, DEFAULT_STUDENT, StudentProfile } from '../lib/store';

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getStoredData<EventItem[]>('events', INITIAL_EVENTS));
    setStudent(getStoredData<StudentProfile>('student', DEFAULT_STUDENT));
  }, []);

  const handleQuickRsvp = (event: EventItem) => {
    // Generate new ticket
    const ticketId = `CU-EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const existingTickets = getStoredData<any[]>('tickets', []);
    
    const newTicket = {
      ticketId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      attendeeName: student.name,
      studentId: student.studentId,
      department: student.department,
      batch: student.batch,
      email: student.email,
      phone: student.phone,
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      checkedIn: false,
      gateNumber: 'Main Entrance - Gate 1',
      seatInfo: 'General Admission / Unreserved'
    };

    const updatedTickets = [newTicket, ...existingTickets];
    setStoredData('tickets', updatedTickets);

    // Update event registered count
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, registeredCount: e.registeredCount + 1 } : e
    );
    setEvents(updatedEvents);
    setStoredData('events', updatedEvents);

    setRsvpSuccess(ticketId);
    setTimeout(() => {
      setRsvpSuccess(null);
      setRsvpModalEvent(null);
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Academic Oxford Hero Section */}
      <section className="relative bg-[#002147] text-white overflow-hidden border-b-4 border-[#c5a059]">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#c5a059 1px, transparent 1px), radial-gradient(#ffffff 1px, #002147 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Oxford Academic Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001733] border border-[#c5a059]/60 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#dfc37a]"></span>
                <span className="text-xs font-serif text-[#dfc37a] tracking-wider uppercase font-semibold">
                  City University • Permanent Campus Savar
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-300 font-sans">
                  Fall Semester 2026 Active
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight text-white tracking-tight">
                Excellence in Pedagogy, Innovation &amp; Campus Life.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
                Welcome to <span className="text-white font-semibold">CampusOS</span>, City University&apos;s unified portal. Manage club hackathons, download verified past exam papers, check real-time shuttle buses, and access instant AI-guided regulations.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/events"
                  className="px-6 py-3.5 rounded-lg bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-[#002147]" />
                  <span>Events &amp; Hackathons</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/resources"
                  className="px-6 py-3.5 rounded-lg bg-[#002e63] hover:bg-[#003d82] text-white border border-slate-500 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#dfc37a]" />
                  <span>Academic Vault</span>
                </Link>

                <Link
                  href="/helpdesk"
                  className="px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <Bus className="w-4 h-4 text-emerald-300" />
                  <span>Bus Schedule</span>
                </Link>
              </div>

              {/* Student identity quick reminder */}
              <div className="pt-4 text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dfc37a]" />
                <span>Logged in as: <strong className="text-slate-200">{student.name}</strong> ({student.studentId} • {student.department})</span>
              </div>
            </div>

            {/* Right Academic Crest Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#001733]/90 border-2 border-[#c5a059] rounded-2xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059] flex items-center justify-center text-[#002147]">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-base text-white">Academic Bulletin</h2>
                      <p className="text-[11px] text-[#dfc37a]">UGC Bangladesh Accreditations</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-mono">
                    LIVE
                  </span>
                </div>

                <div className="space-y-4 py-4 text-xs">
                  <div className="p-3 rounded-lg bg-[#002147]/80 border border-slate-700">
                    <span className="text-[10px] font-bold uppercase text-[#dfc37a] tracking-wider block mb-1">
                      Upcoming Major Event
                    </span>
                    <h3 className="font-bold text-white text-sm">
                      CPCCU Programming Camp &amp; Hackathon 2026
                    </h3>
                    <p className="text-slate-300 mt-1">Oct 24–26 • 50,000 BDT Prize Pool • Auditorium 1</p>
                    <Link
                      href="/events"
                      className="inline-flex items-center gap-1 text-[11px] text-[#dfc37a] hover:underline font-semibold mt-2"
                    >
                      <span>View details &amp; RSVP</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-3 rounded-lg bg-[#002147]/80 border border-slate-700">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider block mb-1">
                      Transport Status
                    </span>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Mirpur, Savar &amp; Uttara Buses:</span>
                      <span className="text-emerald-400 font-semibold">On Schedule</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Departure 04:30 PM &amp; 06:15 PM from Campus Gate</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Helpline: +880 2-9024294</span>
                  <Link href="/helpdesk" className="text-[#dfc37a] hover:underline">
                    Transport Desk →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Campus News & High-Priority Notice Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-l-4 border-[#002147] rounded-r-lg shadow-sm p-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="bg-[#002147] text-white text-xs font-bold px-2.5 py-1 rounded tracking-wide uppercase font-serif shrink-0">
              Campus Notice
            </span>
            <p className="text-xs text-slate-800 font-medium">
              Mid-term examinations for Fall 2026 commence next month. Ensure clearance of at least 75% tuition fees to generate your official printed Admit Card.
            </p>
          </div>
          <Link
            href="/helpdesk#exam-rules"
            className="text-xs font-bold text-[#002147] hover:text-[#002e63] shrink-0 hover:underline flex items-center gap-1"
          >
            <span>Review Exam Guidelines</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* 3. Core University Portals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#85622e] uppercase font-serif">
            Unified Navigation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#002147]">
            Core Academic &amp; Student Modules
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered to streamline collegiate life, coursework vaults, inter-district commute, and campus safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Events */}
          <Link
            href="/events"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic hover:shadow-academic-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#f0f5fa] text-[#002147] flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#002147]">
                Club &amp; Event Engine
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programming camps, sports meets, cultural nights, digital ticket passes with QR codes, and gate marshal check-in.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#002147]">
              <span>5 Active Events</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Resources */}
          <Link
            href="/resources"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic hover:shadow-academic-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#fcf8ee] text-[#85622e] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#002147]">
                Academic Resource Hub
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Departmental repository of verified lecture notes, solved past exams, laboratory manuals, and AI revision notes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#85622e]">
              <span>8 Course Items</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Helpdesk */}
          <Link
            href="/helpdesk"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic hover:shadow-academic-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#002147]">
                Smart Helpdesk &amp; Transit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full 5-route shuttle bus timetable, exam logistics, calculator approvals, and grounded AI regulation assistant.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
              <span>5 Routes • Savar / Mirpur</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Lost & Found */}
          <Link
            href="/lost-and-found"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic hover:shadow-academic-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-colors">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#002147]">
                Lost &amp; Found / Grievances
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Report and claim lost ID cards, calculators, or bags; lodge formal grievances with real-time status tracking.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800">
              <span>Claims &amp; Tracking</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Featured Events Showcase with Instant RSVP Modal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#85622e] uppercase font-serif">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Campus Calendar Highlights</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#002147] mt-1">
              Upcoming Club Gatherings &amp; Hackathons
            </h2>
          </div>
          <Link
            href="/events"
            className="text-xs font-bold text-[#002147] hover:underline flex items-center gap-1"
          >
            <span>View All Campus Events</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-academic flex flex-col justify-between hover:border-[#002147] transition-all"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[#002147] text-white">
                    {event.category}
                  </span>
                  <span className="text-[11px] text-[#85622e] font-semibold bg-[#fcf8ee] border border-[#dfc37a] px-2 py-0.5 rounded">
                    {event.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900 line-clamp-2">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#002147]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#002147]" />
                    <span className="truncate">{event.venue.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {event.registeredCount}/{event.capacity} Registered
                  </div>
                  <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-[#002147] h-full rounded-full"
                      style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setRsvpModalEvent(event)}
                  className="px-3.5 py-1.5 bg-[#002147] hover:bg-[#002e63] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <TicketIcon className="w-3.5 h-3.5 text-[#dfc37a]" />
                  <span>Register / RSVP</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Academic Resource Vault Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#85622e] uppercase font-serif">
              <BookOpen className="w-4 h-4 text-[#85622e]" />
              <span>City University Vault</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#002147] mt-1">
              Featured Courseware &amp; Past Exam Solutions
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-xs font-bold text-[#002147] hover:underline flex items-center gap-1"
          >
            <span>Search All 8 Courses &amp; Notes</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_RESOURCES.slice(0, 4).map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-[#002147] transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#002147] text-white flex flex-col items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#dfc37a]" />
                <span className="text-[9px] font-mono font-bold mt-0.5">{res.fileSize}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#002147] bg-[#f0f5fa] px-1.5 py-0.5 rounded border border-slate-200">
                    {res.courseCode}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-sm text-slate-900 truncate">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 truncate">
                  {res.faculty} • {res.department}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs">
                  <Link
                    href={`/resources?query=${res.courseCode}`}
                    className="text-[#002147] font-semibold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Inspect AI Summary</span>
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Quick RSVP Modal if triggered from Home */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest text-[#dfc37a] uppercase">
                  Instant RSVP Pass
                </span>
                <button
                  onClick={() => setRsvpModalEvent(null)}
                  className="text-slate-300 hover:text-white text-xs"
                >
                  ✕ Close
                </button>
              </div>
              <h3 className="font-serif text-lg font-bold mt-1 text-white">
                {rsvpModalEvent.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {rsvpModalEvent.date} • {rsvpModalEvent.venue}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-[#f0f5fa] p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900">Attendee Identity:</div>
                <div className="text-slate-700">{student.name} ({student.studentId})</div>
                <div className="text-slate-500">{student.department} • {student.email}</div>
              </div>

              {rsvpSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2 text-emerald-800">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Pass Successfully Issued!</div>
                  <div className="text-xs font-mono">Ticket ID: {rsvpSuccess}</div>
                  <p className="text-xs text-emerald-700">Pass stored in your Digital Wallet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Click confirm below to generate your official pass QR code for entry verification at gate marshals.
                  </p>
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setRsvpModalEvent(null)}
                      className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleQuickRsvp(rsvpModalEvent)}
                      className="px-5 py-2 bg-[#002147] hover:bg-[#002e63] text-white rounded-md text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <TicketIcon className="w-4 h-4 text-[#dfc37a]" />
                      <span>Confirm &amp; Generate Ticket</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
