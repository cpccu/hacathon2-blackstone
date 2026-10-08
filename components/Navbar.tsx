'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Calendar,
  BookOpen,
  HelpCircle,
  Search,
  Ticket as TicketIcon,
  User,
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Bus
} from 'lucide-react';
import { getStoredData, DEFAULT_STUDENT, StudentProfile } from '../lib/store';
import { INITIAL_TICKETS, Ticket } from '../lib/data';

interface NavbarProps {
  onOpenAiChat?: () => void;
  onOpenProfile?: () => void;
}

export default function Navbar({ onOpenAiChat, onOpenProfile }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);

  useEffect(() => {
    const loadedTickets = getStoredData<Ticket[]>('tickets', INITIAL_TICKETS);
    const loadedStudent = getStoredData<StudentProfile>('student', DEFAULT_STUDENT);
    setTickets(loadedTickets);
    setStudent(loadedStudent);

    const handleStorage = () => {
      setTickets(getStoredData<Ticket[]>('tickets', INITIAL_TICKETS));
      setStudent(getStoredData<StudentProfile>('student', DEFAULT_STUDENT));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: GraduationCap },
    { name: 'Events & Clubs', href: '/events', icon: Calendar },
    { name: 'Resource Hub', href: '/resources', icon: BookOpen },
    { name: 'Helpdesk & Transit', href: '/helpdesk', icon: HelpCircle },
    { name: 'Lost & Found', href: '/lost-and-found', icon: Search },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-200">
      {/* Top Academic Herald Bar */}
      <div className="bg-[#002147] text-slate-100 text-xs py-1.5 px-4 sm:px-8 border-b border-[#c5a059]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="font-serif tracking-widest text-[#dfc37a] font-semibold uppercase text-[11px]">
              Dominus Illuminatio Mea
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              City University Permanent Campus • Birulia, Savar, Dhaka
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Shuttle Bus Network: Active
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3 h-3 text-[#c5a059]" />
              Helpline: +880 2-9024294
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand & Oxford Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg bg-[#002147] border-2 border-[#c5a059] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-[#dfc37a]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-serif tracking-tight text-[#002147]">
                  CITY UNIVERSITY
                </span>
                <span className="bg-[#fcf8ee] text-[#85622e] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#dfc37a]">
                  CampusOS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans tracking-wide">
                Unified Academic & Student Services Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#002147] text-white shadow-sm font-semibold'
                      : 'text-slate-700 hover:text-[#002147] hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#dfc37a]' : 'text-slate-500'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* My Tickets Wallet CTA */}
            <Link
              href="/events/my-tickets"
              className="relative inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-[#002147] shadow-sm transition-all"
              title="View Digital Ticket Wallet"
            >
              <TicketIcon className="w-4 h-4 text-[#002147]" />
              <span>Tickets</span>
              {tickets.length > 0 && (
                <span className="bg-[#002147] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {tickets.length}
                </span>
              )}
            </Link>

            {/* Gate Check-in Simulator */}
            <Link
              href="/events/checkin"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors"
              title="Gate Marshal Scanner Simulator"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Gate Check-in</span>
            </Link>

            {/* AI Assistant Pill */}
            {onOpenAiChat && (
              <button
                onClick={onOpenAiChat}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md bg-gradient-to-r from-[#002147] to-[#143d73] text-white hover:brightness-110 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#dfc37a] animate-spin" />
                <span>AI Helpdesk</span>
              </button>
            )}

            {/* Student Profile Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-300 hover:border-[#002147] bg-slate-50 hover:bg-white transition-all text-left"
              title="Student Identity & Portal Settings"
            >
              <div className="w-7 h-7 rounded-full bg-[#002147] text-[#dfc37a] font-bold text-xs flex items-center justify-center font-serif">
                {student.avatarLetter || 'R'}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {student.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {student.studentId}
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenAiChat && (
              <button
                onClick={onOpenAiChat}
                className="p-2 rounded-md bg-[#002147] text-white text-xs flex items-center gap-1"
                aria-label="AI Helpdesk"
              >
                <Sparkles className="w-4 h-4 text-[#dfc37a]" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-sm text-slate-900">{student.name}</div>
              <div className="text-xs text-slate-500 font-mono">{student.studentId} • {student.department}</div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile?.();
              }}
              className="text-xs text-[#002147] font-semibold underline"
            >
              Change
            </button>
          </div>

          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-[#002147] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#dfc37a]' : 'text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              href="/events/my-tickets"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-slate-100 text-slate-800 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <TicketIcon className="w-4 h-4 text-[#002147]" />
                Digital Ticket Wallet
              </span>
              <span className="bg-[#002147] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {tickets.length}
              </span>
            </Link>

            <Link
              href="/events/checkin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Gate Check-in Verification Simulator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
