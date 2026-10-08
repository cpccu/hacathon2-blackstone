'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Tag,
  Shield,
  MessageSquare,
  FileText,
  User,
  X,
  Send,
  Sparkles,
  Inbox
} from 'lucide-react';
import {
  INITIAL_LOST_FOUND,
  INITIAL_COMPLAINTS,
  LostFoundItem,
  ComplaintItem
} from '../../lib/data';
import {
  getStoredData,
  setStoredData,
  DEFAULT_STUDENT,
  StudentProfile
} from '../../lib/store';

export default function LostAndFoundPage() {
  const [activeTab, setActiveTab] = useState<'lostfound' | 'complaints'>('lostfound');
  
  // Lost & Found State
  const [items, setItems] = useState<LostFoundItem[]>(INITIAL_LOST_FOUND);
  const [lfSearch, setLfSearch] = useState('');
  const [lfFilter, setLfFilter] = useState<'All' | 'lost' | 'found' | 'Claimed'>('All');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [claimModalItem, setClaimModalItem] = useState<LostFoundItem | null>(null);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  // Complaints State
  const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_COMPLAINTS);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);
  const [complaintSearch, setComplaintSearch] = useState('');
  const [student, setStudent] = useState<StudentProfile>(DEFAULT_STUDENT);

  // New Item Form
  const [newItemForm, setNewItemForm] = useState({
    title: '',
    type: 'found' as 'lost' | 'found',
    category: 'Electronics' as 'ID Card' | 'Electronics' | 'Bags' | 'Accessories' | 'Documents',
    location: '',
    description: '',
    contactPerson: '',
    phone: '',
    studentId: ''
  });

  // New Complaint Form
  const [newComplaintForm, setNewComplaintForm] = useState({
    category: 'WiFi & IT' as 'Academic' | 'Transport' | 'WiFi & IT' | 'Canteen' | 'Cleanliness' | 'Library',
    subject: '',
    description: ''
  });

  useEffect(() => {
    setItems(getStoredData<LostFoundItem[]>('lostfound_items', INITIAL_LOST_FOUND));
    setComplaints(getStoredData<ComplaintItem[]>('complaints', INITIAL_COMPLAINTS));
    const loadedStudent = getStoredData<StudentProfile>('student', DEFAULT_STUDENT);
    setStudent(loadedStudent);
    setNewItemForm((prev) => ({
      ...prev,
      contactPerson: loadedStudent.name,
      phone: loadedStudent.phone,
      studentId: loadedStudent.studentId
    }));
  }, []);

  // Filtered Lost & Found
  const filteredItems = items.filter((item) => {
    const matchesFilter =
      lfFilter === 'All'
        ? true
        : lfFilter === 'Claimed'
        ? item.status === 'Claimed'
        : item.type === lfFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(lfSearch.toLowerCase()) ||
      item.location.toLowerCase().includes(lfSearch.toLowerCase()) ||
      item.referenceCode.toLowerCase().includes(lfSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(lfSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Filtered Complaints
  const filteredComplaints = complaints.filter((c) =>
    c.subject.toLowerCase().includes(complaintSearch.toLowerCase()) ||
    c.trackingNumber.toLowerCase().includes(complaintSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(complaintSearch.toLowerCase())
  );

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `LF-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: LostFoundItem = {
      id: `lf-${Date.now()}`,
      referenceCode: ref,
      title: newItemForm.title,
      type: newItemForm.type,
      category: newItemForm.category,
      location: newItemForm.location,
      dateReported: new Date().toISOString().split('T')[0],
      status: 'Pending',
      contactPerson: newItemForm.contactPerson || student.name,
      studentId: newItemForm.studentId || student.studentId,
      phone: newItemForm.phone || student.phone,
      description: newItemForm.description
    };

    const updated = [newItem, ...items];
    setItems(updated);
    setStoredData('lostfound_items', updated);
    setReportModalOpen(false);
    setNewItemForm({
      title: '',
      type: 'found',
      category: 'Electronics',
      location: '',
      description: '',
      contactPerson: student.name,
      phone: student.phone,
      studentId: student.studentId
    });
  };

  const handleClaimItem = (item: LostFoundItem) => {
    const updated = items.map((i) =>
      i.id === item.id ? { ...i, status: 'Claimed' as const } : i
    );
    setItems(updated);
    setStoredData('lostfound_items', updated);
    setClaimSuccess(item.referenceCode);
    setTimeout(() => {
      setClaimSuccess(null);
      setClaimModalItem(null);
    }, 1500);
  };

  const handleCreateComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = `CU-TKT-${Math.floor(8000 + Math.random() * 2000)}`;
    const newComp: ComplaintItem = {
      id: `cmp-${Date.now()}`,
      trackingNumber: tracking,
      category: newComplaintForm.category,
      subject: newComplaintForm.subject,
      description: newComplaintForm.description,
      complainantName: student.name,
      studentId: student.studentId,
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Pending',
      officialRemark: 'Grievance lodged in the official queue. Assigned to Campus Cell Officer for review.',
      updatedDate: new Date().toISOString().split('T')[0]
    };

    const updated = [newComp, ...complaints];
    setComplaints(updated);
    setStoredData('complaints', updated);
    setComplaintModalOpen(false);
    setNewComplaintForm({
      category: 'WiFi & IT',
      subject: '',
      description: ''
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="bg-[#002147] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#c5a059]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001733] border border-[#c5a059]/50 text-xs font-serif text-[#dfc37a]">
              <span>Proctor Office &amp; Student Grievance Cell</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              Lost &amp; Found / Campus Grievances
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Report misplaced student ID cards, calculators, and baggage, or submit confidential campus complaints regarding transport, canteen, or digital facilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'lostfound' ? (
              <button
                onClick={() => setReportModalOpen(true)}
                className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#b38e48] text-[#002147] rounded-lg font-bold text-xs flex items-center gap-2 shadow transition-all"
              >
                <PlusCircle className="w-4 h-4 text-[#002147]" />
                <span>Report Item</span>
              </button>
            ) : (
              <button
                onClick={() => setComplaintModalOpen(true)}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lodge Formal Grievance</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Dual Tab Switcher */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('lostfound')}
            className={`px-6 py-3 font-serif text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'lostfound'
                ? 'border-[#002147] text-[#002147] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Lost &amp; Found Registry ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-6 py-3 font-serif text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'complaints'
                ? 'border-[#002147] text-[#002147] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Campus Complaints Cell ({complaints.length})</span>
          </button>
        </div>
      </section>

      {/* TAB 1: LOST & FOUND ITEMS */}
      {activeTab === 'lostfound' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-thin">
              {(['All', 'found', 'lost', 'Claimed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setLfFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    lfFilter === filter
                      ? 'bg-[#002147] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter === 'All' ? 'All Items' : filter === 'found' ? 'Found Items' : filter === 'lost' ? 'Lost Reports' : 'Claimed / Returned'}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search items, calculators, ID cards..."
                value={lfSearch}
                onChange={(e) => setLfSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-slate-50"
              />
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-academic flex flex-col justify-between hover:border-[#002147] transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.referenceCode}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          item.type === 'found'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.type}
                      </span>
                      {item.status === 'Claimed' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          Claimed
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                      <span>Reported: {item.dateReported}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#002147] shrink-0" />
                      <span className="truncate">Custodian: {item.contactPerson} ({item.studentId})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{item.phone}</span>
                  </span>

                  {item.status !== 'Claimed' ? (
                    <button
                      onClick={() => setClaimModalItem(item)}
                      className="px-3.5 py-1.5 bg-[#002147] hover:bg-[#002e63] text-white text-xs font-bold rounded-md shadow-xs transition-colors"
                    >
                      Claim Item
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Returned</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 p-8">
              <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">No items found</h3>
              <p className="text-xs text-slate-500 mt-1">Check back later or report a new lost/found item.</p>
            </div>
          )}
        </section>
      )}

      {/* TAB 2: COMPLAINTS / GRIEVANCE CELL */}
      {activeTab === 'complaints' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Complaints logged here are monitored directly by the Proctor Office and Administrative Operations Desk.
            </div>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search ticket # or subject..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147] bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredComplaints.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-academic space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#002147] bg-[#f0f5fa] px-2.5 py-1 rounded border border-[#94bcdf]">
                      {comp.trackingNumber}
                    </span>
                    <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                      {comp.category}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      comp.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : comp.status === 'Under Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {comp.status}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900">
                  {comp.subject}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {comp.description}
                </p>

                {comp.officialRemark && (
                  <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-[#002147] text-xs text-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#002147] block">
                      Administrative Action / Resolution:
                    </span>
                    <p>{comp.officialRemark}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>Submitted by: {comp.complainantName} ({comp.studentId})</span>
                  <span>Date: {comp.dateSubmitted}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Report Lost/Found Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Report Lost or Found Item</h3>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateReport} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status Type</label>
                  <select
                    value={newItemForm.type}
                    onChange={(e) => setNewItemForm({ ...newItemForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white"
                  >
                    <option value="found">I Found An Item</option>
                    <option value="lost">I Lost An Item</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white"
                  >
                    <option value="ID Card">ID Card</option>
                    <option value="Electronics">Electronics / Calculator</option>
                    <option value="Bags">Bags / Backpacks</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Documents">Documents / Wallet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Casio fx-991EX Calculator with yellow sticker"
                  value={newItemForm.title}
                  onChange={(e) => setNewItemForm({ ...newItemForm, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Room 402, Engineering Bldg or Library 2nd Floor"
                  value={newItemForm.location}
                  onChange={(e) => setNewItemForm({ ...newItemForm, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide distinguishing features, colors, batch, marks..."
                  value={newItemForm.description}
                  onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={newItemForm.phone}
                    onChange={(e) => setNewItemForm({ ...newItemForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID / Staff</label>
                  <input
                    type="text"
                    required
                    value={newItemForm.studentId}
                    onChange={(e) => setNewItemForm({ ...newItemForm, studentId: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#002147] hover:bg-[#002e63] text-white text-xs font-bold rounded-md shadow"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {claimModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#dfc37a] uppercase font-mono">{claimModalItem.referenceCode}</span>
                <h3 className="font-serif text-lg font-bold">Ownership Claim Request</h3>
              </div>
              <button onClick={() => setClaimModalItem(null)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {claimSuccess ? (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-lg text-center space-y-2 border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Item Marked as Claimed!</div>
                  <p className="text-xs text-emerald-700">
                    Handover verified. Registry updated successfully.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                    <strong className="text-slate-900 block">{claimModalItem.title}</strong>
                    <div className="text-slate-600">Location: {claimModalItem.location}</div>
                    <div className="text-slate-500">{claimModalItem.description}</div>
                  </div>

                  <p className="text-xs text-slate-600">
                    Are you claiming this item as the rightful student owner or authorized custodian?
                  </p>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      onClick={() => setClaimModalItem(null)}
                      className="px-4 py-2 border border-slate-300 rounded-md text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleClaimItem(claimModalItem)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold shadow"
                    >
                      Confirm Ownership &amp; Claim
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lodge Complaint Modal */}
      {complaintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
            <div className="bg-[#002147] text-white p-5 border-b-2 border-[#c5a059] flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Lodge Campus Grievance</h3>
              <button onClick={() => setComplaintModalOpen(false)} className="text-slate-300 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateComplaint} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Grievance Category</label>
                <select
                  value={newComplaintForm.category}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white"
                >
                  <option value="Academic">Academic / Class Schedule</option>
                  <option value="Transport">Transport / Shuttle Bus</option>
                  <option value="WiFi & IT">Wi-Fi &amp; Computer Labs</option>
                  <option value="Canteen">Canteen &amp; Cleanliness</option>
                  <option value="Library">Library Facilities</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wi-Fi AP 3rd Floor frequent disconnection"
                  value={newComplaintForm.subject}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Explanation</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the issue, location, and desired corrective measures..."
                  value={newComplaintForm.description}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md"
                />
              </div>

              <div className="bg-[#f0f5fa] p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                Lodged on behalf of: <strong>{student.name}</strong> ({student.studentId} • {student.department})
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setComplaintModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-md shadow"
                >
                  Submit Formal Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
