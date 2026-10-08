'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  HelpCircle,
  Bus,
  FileCheck,
  Building,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { SHUTTLE_BUS_ROUTES, EXAM_FAQS } from '../lib/data';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
  badge?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'assistant',
    text: 'Greetings! I am the City University Grounded AI Assistant. I have indexed the official 2026 Academic Regulations, Shuttle Bus Timetables, Examination Hall Directives, and Campus Services. How may I assist your studies today?',
    timestamp: 'Just now',
    badge: 'Official Campus Knowledge'
  }
];

export default function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Mirpur 10 bus schedule & stoppages',
    'Casio 991EX calculator allowed in exams?',
    'Admit card clearance minimum payment',
    'Grade improvement & retake policy',
    'Where is the Lost & Found office?'
  ];

  // Grounded answer generator
  const getGroundedAnswer = (query: string): { text: string; source: string } => {
    const q = query.toLowerCase();

    if (q.includes('bus') || q.includes('shuttle') || q.includes('mirpur') || q.includes('savar') || q.includes('uttara') || q.includes('dhanmondi') || q.includes('gazipur')) {
      if (q.includes('mirpur')) {
        const route = SHUTTLE_BUS_ROUTES.find((r) => r.id === 'route-mirpur');
        return {
          text: `**Mirpur-10 & Technical Metro Route (BUS-02)**:\n- **Morning Departure**: 07:15 AM from Mirpur-10 Roundabout.\n- **Campus Return**: 04:30 PM & 06:30 PM from Birulia Campus.\n- **Key Stoppages**: Mirpur-10 -> Mirpur-1 Fire Service -> Mazar Road -> Beribadh -> Priyangon Abashik -> Birulia -> Permanent Campus.\n- **Supervisor**: Md. Kamal Uddin (${route?.contactPhone}).`,
          source: 'City University Transport Department Bulletin (Oct 2026)'
        };
      } else if (q.includes('uttara')) {
        const route = SHUTTLE_BUS_ROUTES.find((r) => r.id === 'route-uttara');
        return {
          text: `**Uttara House Building Route (BUS-03)**:\n- **Morning Departure**: 07:20 AM from Mascot Plaza / House Building.\n- **Campus Return**: 04:30 PM & 06:15 PM.\n- **Key Stoppages**: House Building -> Mascot Plaza -> Azampur -> Sector 10 -> Diabari Metro -> Campus.\n- **Supervisor**: Abdul Hannan (${route?.contactPhone}).`,
          source: 'City University Transport Department Bulletin (Oct 2026)'
        };
      } else if (q.includes('savar')) {
        const route = SHUTTLE_BUS_ROUTES.find((r) => r.id === 'route-savar');
        return {
          text: `**Savar Thana & Nabinagar Route (BUS-01)**:\n- **Morning Departure**: 07:45 AM from Savar Thana Bus Stand.\n- **Campus Return**: 04:30 PM & 06:15 PM.\n- **Key Stoppages**: Radio Colony -> Savar Thana -> C&B More -> JU Dairy Gate -> Ashulia -> Campus.\n- **Supervisor**: Md. Monir Hossain (${route?.contactPhone}).`,
          source: 'City University Transport Department Bulletin (Oct 2026)'
        };
      } else {
        return {
          text: `City University operates 5 active shuttle routes daily (Sat–Thu):\n1. **Savar Route (BUS-01)**: Departs 07:45 AM\n2. **Mirpur-10 Route (BUS-02)**: Departs 07:15 AM\n3. **Uttara Route (BUS-03)**: Departs 07:20 AM\n4. **Dhanmondi Route (BUS-04)**: Departs 07:00 AM\n5. **Gazipur Route (BUS-05)**: Departs 06:50 AM\nAll return trips depart Permanent Campus at 04:30 PM and 06:15/06:30 PM.`,
          source: 'City University Transport Office'
        };
      }
    }

    if (q.includes('calculator') || q.includes('991ex') || q.includes('991es') || q.includes('calc')) {
      return {
        text: `**Official Calculator Regulation**:\n- **PERMITTED**: Non-programmable scientific calculators including **Casio fx-991EX ClassWiz**, **Casio fx-991ES Plus**, fx-100MS, fx-570MS, and fx-82MS.\n- **PROHIBITED**: Programmable calculators, graphic calculators with alphanumeric matrix storage (e.g., Casio fx-9860G, fx-CG50, TI-84), and any device with wireless/Bluetooth connectivity.\n- *Note*: Calculator lids/cases with hand-written scribbles will be immediately confiscated as unfair means.`,
        source: 'Office of the Controller of Examinations, Notice Ref: CE/2026/04'
      };
    }

    if (q.includes('admit') || q.includes('clearance') || q.includes('exam card') || q.includes('tuition')) {
      return {
        text: `**Admit Card Issuance Requirements**:\n1. Students must clear at least **75% of semester tuition installments** before Mid-Terms, and **100% dues** before Final Examinations.\n2. Once Accounts clearance is recorded in the ERP, the Admit Card PDF is unlocked for printing 72 hours before exams.\n3. **Physical Printed Copy Mandatory**: You must bring a physical hardcopy with your student photograph to the exam hall. Soft copies on mobile phones are strictly prohibited.`,
        source: 'City University Registrar & Accounts Directive 2026'
      };
    }

    if (q.includes('retake') || q.includes('improvement') || q.includes('grade') || q.includes('cgpa')) {
      return {
        text: `**Grade Retake & Improvement Policy**:\n- **Improvement**: Permitted for any course where you received a grade below **B (Grade Point < 3.00)**. Must be taken within the next two regular semesters.\n- **Retake**: Mandatory for any **F grade** to earn graduation degree.\n- **Computation**: The newly earned higher grade replaces the previous attempt in the CGPA calculation, while the transcript will reflect the improvement code.`,
        source: 'Academic Council Regulations, Section 6.4 (City University)'
      };
    }

    if (q.includes('lost') || q.includes('found') || q.includes('id card') || q.includes('claim')) {
      return {
        text: `**Lost & Found Protocol**:\n- Physical Lost & Found items are held at the **Proctor Office / Security Reception Desk** on the Ground Floor of the Administrative Building.\n- To claim an item (like student ID cards, calculators, or bags), present your student ID or verifiable proof of ownership.\n- You can also report or track items digitally via the **Lost & Found tab** on CampusOS.`,
        source: 'Office of the Proctor & Campus Security Desk'
      };
    }

    if (q.includes('library') || q.includes('book') || q.includes('borrow')) {
      return {
        text: `**Central Library Directives**:\n- **Hours**: Saturday to Thursday, 08:30 AM to 06:30 PM (Closed on Fridays and Public Holidays).\n- **Borrowing Limit**: Undergraduate students may borrow up to 3 textbooks for 14 days with standard renewal.\n- **Digital Vault**: Course lecture notes, past exam questions, and lab manuals are accessible 24/7 on CampusOS Resource Hub.`,
        source: 'Central Library Regulations, City University'
      };
    }

    // Default academic response
    return {
      text: `Regarding your query on "${query}": At City University Permanent Campus, all academic operations follow the UGC semester curriculum guidelines. For administrative formalities, visit the Registrar Office (Administrative Bldg 2nd Floor), or use the CampusOS Resource Hub and Smart Helpdesk for real-time services.`,
      source: 'City University Campus Information Desk'
    };
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getGroundedAnswer(messageText);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        source: response.source
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="bg-[#002147] text-white p-4 border-b-2 border-[#c5a059] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#dfc37a] text-[#002147] flex items-center justify-center font-bold shadow">
              <Sparkles className="w-5 h-5 text-[#002147]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base">City University AI</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded border border-emerald-400/40 font-mono">
                  Grounded v2.4
                </span>
              </div>
              <p className="text-[11px] text-[#dfc37a]">Academic Regulations & Transport Bot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-md"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-thin">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#002147] hover:text-[#002147] shadow-2xs transition-colors shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#002147] text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Assistant badge */}
                {m.badge && (
                  <div className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#c5a059]" />
                    {m.badge}
                  </div>
                )}

                <div className="whitespace-pre-line space-y-1">
                  {m.text}
                </div>

                {m.source && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 italic flex items-center gap-1">
                    <span>Source: {m.source}</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-500 text-xs pl-2">
              <Bot className="w-4 h-4 text-[#002147] animate-bounce" />
              <span>Checking City University directives...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about buses, calculators, exams..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-slate-50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-[#002147] text-white rounded-lg hover:bg-[#002e63] disabled:opacity-40 transition-colors shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-[#dfc37a]" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            Responses grounded in Official City University Handbook 2026.
          </div>
        </div>
      </div>
    </div>
  );
}
