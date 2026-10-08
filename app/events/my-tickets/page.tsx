'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Ticket as TicketIcon,
  QrCode,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  Printer,
  ArrowLeft,
  Clock,
  Sparkles,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { Ticket, INITIAL_TICKETS } from '../../../lib/data';
import { getStoredData, setStoredData, generateQrMatrix } from '../../../lib/store';

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getStoredData<Ticket[]>('tickets', INITIAL_TICKETS);
    setTickets(loaded);
    if (loaded.length > 0) {
      setActiveTicketId(loaded[0].ticketId);
    }
  }, []);

  const handleDeleteTicket = (ticketId: string) => {
    if (confirm(`Cancel RSVP for ticket ${ticketId}?`)) {
      const updated = tickets.filter((t) => t.ticketId !== ticketId);
      setTickets(updated);
      setStoredData('tickets', updated);
      if (activeTicketId === ticketId) {
        setActiveTicketId(updated.length > 0 ? updated[0].ticketId : null);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const activeTicket = tickets.find((t) => t.ticketId === activeTicketId) || tickets[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs text-[#dfc37a] hover:underline mb-1 font-serif"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campus Events Calendar</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Digital Event Pass Wallet
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Official gate boarding passes issued by City University. Present your dynamic QR code for barcode scanner verification at auditorium entry gates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/events/checkin"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>Test Gate Scanner</span>
            </Link>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-white/20 transition-all"
            >
              <Printer className="w-4 h-4 text-[#dfc37a]" />
              <span>Print All Passes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {tickets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 p-8">
            <TicketIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="font-serif text-xl font-bold text-slate-800">
              Your Pass Wallet is Empty
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
              You haven&apos;t registered for any upcoming events or hackathons yet. Visit the Event Engine to secure your pass.
            </p>
            <div className="mt-6">
              <Link
                href="/events"
                className="px-6 py-2.5 bg-[#002147] text-white text-xs font-bold rounded-lg hover:bg-[#002e63] inline-flex items-center gap-2"
              >
                <span>Browse Campus Events</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Ticket Selector Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold font-serif text-[#002147] uppercase tracking-wider">
                  Available Passes ({tickets.length})
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Select to expand pass</span>
              </div>

              {tickets.map((t) => {
                const isSelected = activeTicket?.ticketId === t.ticketId;
                return (
                  <div
                    key={t.ticketId}
                    onClick={() => setActiveTicketId(t.ticketId)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#002147] bg-[#f0f5fa] shadow-md ring-2 ring-[#002147]/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-[#002147] bg-white px-2 py-0.5 rounded border border-slate-200">
                        {t.ticketId}
                      </span>
                      {t.checkedIn ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Checked In
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                          Active Pass
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-sm text-slate-900 line-clamp-1">
                      {t.eventTitle}
                    </h3>

                    <div className="mt-2 text-xs text-slate-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#002147]" />
                        <span>{t.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#002147]" />
                        <span>{t.attendeeName} ({t.studentId})</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Pass Presentation Display */}
            {activeTicket && (
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border-2 border-[#002147] shadow-academic-lg overflow-hidden">
                  {/* Top Oxford Header */}
                  <div className="bg-[#002147] text-white p-6 border-b-4 border-[#c5a059] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] tracking-widest font-serif uppercase text-[#dfc37a] font-semibold">
                          City University • Official Event Pass
                        </span>
                      </div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                        {activeTicket.eventTitle}
                      </h2>
                      <p className="text-xs text-slate-300 mt-1">
                        {activeTicket.eventVenue}
                      </p>
                    </div>

                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] font-mono uppercase text-[#dfc37a]">Pass Status</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {activeTicket.checkedIn ? 'CHECKED IN' : 'VALID AT GATE'}
                      </div>
                    </div>
                  </div>

                  {/* Body with QR Code and Attendee details */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Dynamic Crisp QR Code */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div
                        className="w-44 h-44 flex items-center justify-center"
                        dangerouslySetInnerHTML={{
                          __html: generateQrMatrix(activeTicket.ticketId, 176)
                        }}
                      />
                      <div className="mt-3 text-center">
                        <span className="font-mono text-xs font-bold text-[#002147] tracking-wider block">
                          {activeTicket.ticketId}
                        </span>
                        <span className="text-[10px] text-slate-500">Scan at Entrance Scanner</span>
                      </div>
                    </div>

                    {/* Attendee & Gate Details */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 text-xs">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Attendee Name
                          </span>
                          <strong className="text-sm font-serif text-slate-900 block mt-0.5">
                            {activeTicket.attendeeName}
                          </strong>
                          <span className="text-[11px] text-slate-500 font-mono">
                            ID: {activeTicket.studentId}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Department
                          </span>
                          <strong className="text-sm text-slate-900 block mt-0.5 truncate">
                            {activeTicket.department}
                          </strong>
                          <span className="text-[11px] text-slate-500">
                            {activeTicket.batch}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Gate Access
                          </span>
                          <div className="font-bold text-[#002147] text-sm mt-0.5">
                            {activeTicket.gateNumber}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Seat / Zone
                          </span>
                          <div className="font-bold text-slate-900 text-sm mt-0.5">
                            {activeTicket.seatInfo}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#002147]" />
                          <span>Date: {activeTicket.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#002147]" />
                          <span>Registered: {activeTicket.registeredAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pass Barcode Line & Controls */}
                  <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/events/checkin?code=${activeTicket.ticketId}`}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Simulate Gate Check-in</span>
                      </Link>

                      <button
                        onClick={handlePrint}
                        className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium rounded-md flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteTicket(activeTicket.ticketId)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
