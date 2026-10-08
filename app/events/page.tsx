'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Ticket as TicketIcon,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  User,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { INITIAL_EVENTS, EventItem, Ticket } from '../../lib/data';
import { getStoredData, setStoredData, DEFAULT_STUDENT, StudentProfile } from '../../lib/store';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);
  
  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    studentId: '',
    department: '',
    batch: '',
    email: '',
    phone: '',
    tshirtSize: 'L',
    dietary: 'Standard'
  });
  const [issuedTicketId, setIssuedTicketId] = useState<string | null>(null);

  useEffect(() => {
    const loadedEvents = getStoredData<EventItem[]>('events', INITIAL_EVENTS);
    const loadedStudent = getStoredData<StudentProfile>('student', DEFAULT_STUDENT);
    setEvents(loadedEvents);
    setStudent(loadedStudent);
    setRsvpForm({
      name: loadedStudent.name,
      studentId: loadedStudent.studentId,
      department: loadedStudent.department,
      batch: loadedStudent.batch,
      email: loadedStudent.email,
      phone: loadedStudent.phone,
      tshirtSize: 'L',
      dietary: 'Standard'
    });
  }, []);

  const categories = ['All', 'Hackathon', 'Sports', 'Cultural', 'Workshop', 'Seminar'];

  const filteredEvents = events.filter((e) => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenRsvp = (event: EventItem) => {
    setSelectedEvent(event);
    setIssuedTicketId(null);
  };

  const handleCompleteRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const ticketId = `CU-EVT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const existingTickets = getStoredData<Ticket[]>('tickets', []);

    const newTicket: Ticket = {
      ticketId,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventVenue: selectedEvent.venue,
      attendeeName: rsvpForm.name || student.name,
      studentId: rsvpForm.studentId || student.studentId,
      department: rsvpForm.department || student.department,
      batch: rsvpForm.batch || student.batch,
      email: rsvpForm.email || student.email,
      phone: rsvpForm.phone || student.phone,
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      checkedIn: false,
      gateNumber: selectedEvent.category === 'Hackathon' ? 'Gate A (Auditorium 1)' : 'Main Gate C',
      seatInfo: 'Zone Regular - General Entry'
    };

    const updatedTickets = [newTicket, ...existingTickets];
    setStoredData('tickets', updatedTickets);

    // Update registered count
    const updatedEvents = events.map((item) =>
      item.id === selectedEvent.id
        ? { ...item, registeredCount: item.registeredCount + 1 }
        : item
    );
    setEvents(updatedEvents);
    setStoredData('events', updatedEvents);

    setIssuedTicketId(ticketId);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001733] border border-[#c5a059]/50 text-xs font-serif text-[#dfc37a]">
              <span>City University Clubs &amp; Co-Curricular Board</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Club &amp; Event Engine
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Discover official university competitions, cultural galas, competitive programming camps, and generate verifiable digital QR event passes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/events/my-tickets"
              className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <TicketIcon className="w-4 h-4 text-[#002147]" />
              <span>Digital Ticket Wallet</span>
            </Link>
            <Link
              href="/events/checkin"
              className="px-4 py-2.5 bg-[#001733] hover:bg-slate-900 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Gate Marshal Check-in</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#002147] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search hackathons, sports, clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-slate-50"
            />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-academic flex flex-col justify-between hover:border-[#002147] transition-all group"
            >
              {/* Card Header & Badge */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[#002147] text-white font-mono">
                    {evt.category}
                  </span>
                  <span className="text-[11px] font-semibold text-[#85622e] bg-[#fcf8ee] border border-[#dfc37a] px-2 py-0.5 rounded">
                    {evt.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#002147] transition-colors leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-[#002147] font-semibold flex items-center gap-1.5">
                  <span>Organized by: {evt.club}</span>
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {evt.description}
                </p>

                {/* Logistics */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  {evt.prizes && (
                    <div className="flex items-center gap-2 text-amber-800 font-medium">
                      <Trophy className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span className="truncate">{evt.prizes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {evt.registeredCount} / {evt.capacity} Seats Filled
                  </div>
                  <div className="w-28 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-[#002147] h-full rounded-full"
                      style={{ width: `${Math.min(100, (evt.registeredCount / evt.capacity) * 100)}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleOpenRsvp(evt)}
                  className="px-4 py-2 bg-[#002147] hover:bg-[#002e63] text-white rounded-md text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <TicketIcon className="w-3.5 h-3.5 text-[#dfc37a]" />
                  <span>Register / RSVP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No events matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching categories or clearing search keywords.</p>
          </div>
        )}
      </section>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059] flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#dfc37a] uppercase tracking-wider">
                  Event Registration Pass
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedEvent.club} • {selectedEvent.venue}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-300 hover:text-white p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              {issuedTicketId ? (
                <div className="text-center py-6 space-y-4 bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-emerald-950">
                      RSVP Registration Confirmed!
                    </h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      Your digital event pass has been issued and stored in your wallet.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-emerald-300 font-mono text-center shadow-xs">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block">Pass Serial / Ticket ID</span>
                    <strong className="text-lg text-[#002147] tracking-wider font-bold">{issuedTicketId}</strong>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Link
                      href="/events/my-tickets"
                      className="px-5 py-2.5 bg-[#002147] text-white font-bold text-xs rounded-lg flex items-center gap-2 hover:bg-[#002e63]"
                    >
                      <TicketIcon className="w-4 h-4 text-[#dfc37a]" />
                      <span>View in Ticket Wallet</span>
                    </Link>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCompleteRsvp} className="space-y-4">
                  <div className="bg-[#f0f5fa] p-3.5 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-slate-500">Date &amp; Time:</span>
                      <p className="font-semibold text-slate-800">{selectedEvent.date} ({selectedEvent.time})</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500">Registration Fee:</span>
                      <p className="font-bold text-[#002147]">{selectedEvent.registrationFee}</p>
                    </div>
                  </div>

                  {/* Schedule items if present */}
                  {selectedEvent.scheduleItems && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-bold text-[#002147] uppercase block mb-1.5">
                        Event Schedule Highlights
                      </span>
                      <div className="space-y-1 text-xs text-slate-600">
                        {selectedEvent.scheduleItems.map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b border-slate-200/50 pb-1">
                            <span className="font-semibold text-slate-800">{s.time}</span>
                            <span>{s.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.name}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student ID
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.studentId}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, studentId: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.department}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, department: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Batch
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.batch}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, batch: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        University Email
                      </label>
                      <input
                        type="email"
                        required
                        value={rsvpForm.email}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.phone}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-[#002147] focus:outline-none"
                      />
                    </div>
                  </div>

                  {selectedEvent.category === 'Hackathon' && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          T-Shirt Size
                        </label>
                        <select
                          value={rsvpForm.tshirtSize}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, tshirtSize: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                        >
                          <option value="M">Medium (M)</option>
                          <option value="L">Large (L)</option>
                          <option value="XL">Extra Large (XL)</option>
                          <option value="XXL">XXL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Dietary Preference
                        </label>
                        <select
                          value={rsvpForm.dietary}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, dietary: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white"
                        >
                          <option value="Standard">Standard / Chicken</option>
                          <option value="Vegetarian">Vegetarian</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#002147] hover:bg-[#002e63] text-white rounded-md text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <TicketIcon className="w-4 h-4 text-[#dfc37a]" />
                      <span>Confirm &amp; Generate Pass</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
