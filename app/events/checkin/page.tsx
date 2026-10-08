'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  Scan,
  RefreshCw,
  User,
  Calendar,
  Clock,
  Sparkles,
  Ticket as TicketIcon
} from 'lucide-react';
import { Ticket, INITIAL_TICKETS } from '../../../lib/data';
import { getStoredData, setStoredData } from '../../../lib/store';

function CheckinContent() {
  const searchParams = useSearchParams();
  const [ticketInput, setTicketInput] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [scanResult, setScanResult] = useState<{
    status: 'IDLE' | 'VALID' | 'ALREADY_CHECKED_IN' | 'INVALID';
    ticket?: Ticket;
    message?: string;
  }>({ status: 'IDLE' });
  const [isScanning, setIsScanning] = useState(false);
  const [auditLog, setAuditLog] = useState<{
    id: string;
    code: string;
    name: string;
    time: string;
    status: string;
  }[]>([]);

  useEffect(() => {
    const loaded = getStoredData<Ticket[]>('tickets', INITIAL_TICKETS);
    setTickets(loaded);

    // Initial check if query param provided
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setTicketInput(codeParam);
      verifyCode(codeParam, loaded);
    }
  }, [searchParams]);

  const verifyCode = (code: string, currentTickets?: Ticket[]) => {
    const list = currentTickets || tickets;
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    const matched = list.find((t) => t.ticketId.toUpperCase() === cleanCode);

    if (!matched) {
      setScanResult({
        status: 'INVALID',
        message: `Pass "${cleanCode}" not found in University Database. Reject entry and refer to Helpdesk Desk.`
      });
      setAuditLog((prev) => [
        {
          id: `log-${Date.now()}`,
          code: cleanCode,
          name: 'Unknown Attendee',
          time: new Date().toLocaleTimeString(),
          status: 'INVALID'
        },
        ...prev
      ]);
      return;
    }

    if (matched.checkedIn) {
      setScanResult({
        status: 'ALREADY_CHECKED_IN',
        ticket: matched,
        message: `WARNING: This pass was ALREADY validated at ${matched.checkedInAt || 'earlier session'}. Potential duplicate entry.`
      });
      setAuditLog((prev) => [
        {
          id: `log-${Date.now()}`,
          code: matched.ticketId,
          name: matched.attendeeName,
          time: new Date().toLocaleTimeString(),
          status: 'DUPLICATE'
        },
        ...prev
      ]);
      return;
    }

    // Successfully Check-in
    const checkinTime = new Date().toLocaleString();
    const updated = list.map((t) =>
      t.ticketId === matched.ticketId
        ? { ...t, checkedIn: true, checkedInAt: checkinTime }
        : t
    );
    setTickets(updated);
    setStoredData('tickets', updated);

    const updatedMatched = { ...matched, checkedIn: true, checkedInAt: checkinTime };

    setScanResult({
      status: 'VALID',
      ticket: updatedMatched,
      message: `VERIFIED: Admitted to ${matched.eventTitle}. Gate clearance approved.`
    });

    setAuditLog((prev) => [
      {
        id: `log-${Date.now()}`,
        code: matched.ticketId,
        name: matched.attendeeName,
        time: new Date().toLocaleTimeString(),
        status: 'ADMITTED'
      },
      ...prev
    ]);
  };

  const handleSimulateCameraScan = (codeToScan: string) => {
    setIsScanning(true);
    setTicketInput(codeToScan);
    setScanResult({ status: 'IDLE' });

    setTimeout(() => {
      setIsScanning(false);
      verifyCode(codeToScan);
    }, 900);
  };

  const handleReset = () => {
    setTicketInput('');
    setScanResult({ status: 'IDLE' });
  };

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
              <span>Back to Events Portal</span>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
                Gate Check-in Verification Simulator
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs px-2 py-0.5 rounded font-mono font-bold">
                GATE MARSHAL ACTIVE
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              Auditorium &amp; event gate terminal. Simulates optical laser barcode scanning, validates digital pass credentials against the central registry, and flags duplicate entry attempts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/events/my-tickets"
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] rounded-lg text-xs font-bold flex items-center gap-2 shadow"
            >
              <TicketIcon className="w-4 h-4 text-[#002147]" />
              <span>Open My Tickets</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Simulator Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scanner Interface */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic space-y-6">
              {/* Camera Scanner Simulation Visual */}
              <div className="relative bg-slate-900 rounded-xl p-6 text-center text-white overflow-hidden border-2 border-slate-700">
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none">
                    <div className="h-1 bg-emerald-400 w-full animate-bounce shadow-[0_0_15px_#10b981]" />
                  </div>
                )}

                <div className="w-24 h-24 border-2 border-dashed border-[#c5a059] rounded-xl mx-auto flex items-center justify-center relative mb-4">
                  <Scan className={`w-10 h-10 ${isScanning ? 'text-emerald-400 animate-pulse' : 'text-[#dfc37a]'}`} />
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400"></div>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-100">
                  {isScanning ? 'Optical Laser Scanning...' : 'Optical QR Sensor Ready'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Point handheld laser or simulate pass presentation below.
                </p>

                {/* Quick Simulation Clickers */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-[11px] text-slate-400 block w-full mb-1">
                    Quick Sample RFID / Pass Triggers:
                  </span>
                  <button
                    onClick={() => handleSimulateCameraScan('CU-EVT-2026-8841')}
                    className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-600 font-mono transition-colors"
                  >
                    CU-EVT-2026-8841 (Rafiqul - Hackathon)
                  </button>
                  <button
                    onClick={() => handleSimulateCameraScan('CU-EVT-2026-4019')}
                    className="px-2.5 py-1 text-xs bg-amber-950/60 hover:bg-amber-900/60 text-amber-200 rounded border border-amber-700 font-mono transition-colors"
                  >
                    CU-EVT-2026-4019 (Already Checked)
                  </button>
                  <button
                    onClick={() => handleSimulateCameraScan('CU-EVT-INVALID-99')}
                    className="px-2.5 py-1 text-xs bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 rounded border border-rose-700 font-mono transition-colors"
                  >
                    CU-EVT-INVALID-99 (Invalid)
                  </button>
                </div>
              </div>

              {/* Manual Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyCode(ticketInput);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Manual Ticket Serial / QR Code String
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. CU-EVT-2026-8841"
                      value={ticketInput}
                      onChange={(e) => setTicketInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono uppercase focus:ring-2 focus:ring-[#002147] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#002147] hover:bg-[#002e63] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#dfc37a]" />
                      <span>Verify Pass</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="p-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-xs"
                      title="Clear"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Verification Result Card */}
            {scanResult.status !== 'IDLE' && (
              <div
                className={`p-6 rounded-xl border shadow-md animate-fadeIn transition-all ${
                  scanResult.status === 'VALID'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : scanResult.status === 'ALREADY_CHECKED_IN'
                    ? 'bg-amber-50 border-amber-400 text-amber-950'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {scanResult.status === 'VALID' && (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    )}
                    {scanResult.status === 'ALREADY_CHECKED_IN' && (
                      <AlertTriangle className="w-8 h-8 text-amber-600" />
                    )}
                    {scanResult.status === 'INVALID' && (
                      <XCircle className="w-8 h-8 text-rose-600" />
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase block">
                        {scanResult.status === 'VALID' && 'ACCESS GRANTED • OFFICIAL PASS'}
                        {scanResult.status === 'ALREADY_CHECKED_IN' && 'ENTRY DENIED • DUPLICATE SCAN'}
                        {scanResult.status === 'INVALID' && 'ACCESS REJECTED • UNRECOGNIZED PASS'}
                      </span>
                      <p className="text-xs font-medium mt-1 leading-relaxed">
                        {scanResult.message}
                      </p>
                    </div>

                    {scanResult.ticket && (
                      <div className="bg-white/80 p-4 rounded-lg border border-slate-200/60 text-xs space-y-2">
                        <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Attendee</span>
                            <strong className="text-slate-900">{scanResult.ticket.attendeeName}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Student ID</span>
                            <span className="font-mono text-slate-800">{scanResult.ticket.studentId}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-slate-700">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Event</span>
                            <span className="truncate block font-semibold">{scanResult.ticket.eventTitle}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Allocated Gate</span>
                            <span className="font-semibold text-[#002147]">{scanResult.ticket.gateNumber}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Gate Check-in Activity Log */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-academic space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#002147]" />
                  <h3 className="font-serif font-bold text-sm text-slate-900">
                    Live Gate Marshal Stream
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {auditLog.length} Scans Logged
                </span>
              </div>

              {auditLog.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <span>No gate activity logged yet in this session.</span>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {auditLog.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{log.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">{log.code}</div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            log.status === 'ADMITTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.status === 'DUPLICATE'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {log.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">{log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CheckinPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-slate-500 text-xs">
          <ShieldCheck className="w-8 h-8 text-emerald-600 animate-pulse mx-auto mb-2" />
          <span>Initializing Gate Check-in Optical Scanner...</span>
        </div>
      </div>
    }>
      <CheckinContent />
    </Suspense>
  );
}
