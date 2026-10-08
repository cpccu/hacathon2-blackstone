import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  ExternalLink,
  BookOpen,
  Bus,
  Award
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#002147] text-slate-300 text-sm border-t-4 border-[#c5a059]">
      {/* Top Academic Motto Banner */}
      <div className="border-b border-slate-700/60 bg-[#001733]/80 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#dfc37a]" />
            <span className="font-serif italic text-[#dfc37a] text-sm tracking-wide">
              &quot;Dominus Illuminatio Mea — The Lord is my Light&quot;
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Approved by University Grants Commission (UGC) of Bangladesh & Ministry of Education
          </p>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Crest & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-white text-[#002147] flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6 text-[#002147]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  CITY UNIVERSITY
                </h3>
                <p className="text-[11px] text-[#dfc37a] font-mono tracking-wider">
                  CAMPUSOS PLATFORM
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              City University provides modern academic disciplines, high-performance computing facilities, and an expansive permanent campus environment dedicated to transformative education and research.
            </p>
            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfc37a] shrink-0" />
                <span>Permanent Campus: Birulia, Savar, Dhaka-1216</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfc37a] shrink-0" />
                <span>PABX: +880 2-9024294-5, +880 1819-812345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#dfc37a] shrink-0" />
                <span>info@cityuniversity.edu.bd</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Faculties */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-3 border-b border-slate-700 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#dfc37a]" />
              Academic Divisions
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="hover:text-white transition-colors">
                <Link href="/resources?dept=CSE" className="hover:underline">Faculty of Science & Engineering (CSE / EEE / Civil)</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/resources?dept=BBA" className="hover:underline">Faculty of Business Administration (BBA / MBA)</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/resources?dept=Pharmacy" className="hover:underline">Department of Pharmacy & Health Sciences</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/resources?dept=English" className="hover:underline">Department of English & General Education</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/resources?dept=Law" className="hover:underline">Faculty of Law & Jurisprudence</Link>
              </li>
              <li className="hover:text-white transition-colors">
                <Link href="/resources" className="hover:underline">Institutional Quality Assurance Cell (IQAC)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Portals & Logistics */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-3 border-b border-slate-700 pb-2 flex items-center gap-2">
              <Bus className="w-4 h-4 text-[#dfc37a]" />
              Student Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/events" className="hover:text-white hover:underline flex items-center gap-1">
                  Club Events & Hackathon Calendar
                </Link>
              </li>
              <li>
                <Link href="/events/my-tickets" className="hover:text-white hover:underline flex items-center gap-1">
                  Digital Event Pass Wallet
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white hover:underline flex items-center gap-1">
                  Exam Vault & AI Revision Summaries
                </Link>
              </li>
              <li>
                <Link href="/helpdesk" className="hover:text-white hover:underline flex items-center gap-1">
                  Shuttle Bus Timetables & Stoppages
                </Link>
              </li>
              <li>
                <Link href="/helpdesk#exam-rules" className="hover:text-white hover:underline flex items-center gap-1">
                  Examination Conduct & Calculator Regulations
                </Link>
              </li>
              <li>
                <Link href="/lost-and-found" className="hover:text-white hover:underline flex items-center gap-1">
                  Lost & Found Registry & Complaints Cell
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Logistics & Emergency Hotline */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-3 border-b border-slate-700 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#dfc37a]" />
              Security & Working Hours
            </h4>
            <div className="bg-[#001c3d] p-3 rounded-lg border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#dfc37a] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-200">Library & Vault Hours:</span>
                  <p className="text-slate-400">Sat – Thu: 08:30 AM – 06:30 PM</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-700/60">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                  Campus Emergency Contacts
                </span>
                <p className="text-slate-300 mt-1">Proctorial Body: +880 1715-098711</p>
                <p className="text-slate-300">Campus Transport Desk: +880 1819-482019</p>
                <p className="text-slate-300">ICT Operations Cell: ext. 402</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} City University. All Academic Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Powered by Next.js 14 App Router</span>
            <span>•</span>
            <span className="text-[#dfc37a]">Oxford Academic Design Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
