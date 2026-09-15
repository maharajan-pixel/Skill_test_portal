import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Users, 
  UserPlus, 
  Upload, 
  Download, 
  Trash2, 
  Sparkles, 
  Search, 
  Mail, 
  KeyRound, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  FileSpreadsheet, 
  Info,
  Calendar
} from 'lucide-react';
import { StudentRecord, TeacherRecord } from '../types';
import { 
  getLocalStudents, 
  saveLocalStudents, 
  getLocalTeachers, 
  saveLocalTeachers,
  addStudentRecord,
  bulkAddStudents,
  deleteStudentRecord,
  addTeacherRecord,
  bulkAddTeachers,
  deleteTeacherRecord
} from '../services/firebase';

interface RosterManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRosterUpdated?: () => void;
}

export const RosterManagerModal: React.FC<RosterManagerModalProps> = ({
  isOpen,
  onClose,
  onRosterUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'TEACHERS' | 'GUIDE'>('STUDENTS');
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  // Single Student Form state
  const [stExamNo, setStExamNo] = useState('');
  const [stName, setStName] = useState('');
  const [stClassSec, setStClassSec] = useState('10 A');
  const [stAdmnNo, setStAdmnNo] = useState('');
  const [stDob, setStDob] = useState('');

  // Single Teacher Form state
  const [tcName, setTcName] = useState('');
  const [tcEmail, setTcEmail] = useState('');
  const [tcPass, setTcPass] = useState('Teacher@2026');
  const [tcAssigned, setTcAssigned] = useState('10 A, 10 B');

  // Bulk Import state
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'SUCCESS' | 'ERROR'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load roster
  const loadRosterData = () => {
    setStudents(getLocalStudents());
    setTeachers(getLocalTeachers());
  };

  useEffect(() => {
    if (isOpen) {
      loadRosterData();
      setFeedbackMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Add Single Student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stExamNo || !stName || !stDob) {
      setFeedbackMsg({ type: 'ERROR', text: 'Exam Number, Full Name, and DOB (DD/MM/YYYY) are required.' });
      return;
    }

    const newSt: StudentRecord = {
      examNo: stExamNo.trim().toUpperCase(),
      name: stName.trim(),
      classSec: stClassSec.trim(),
      admnNo: stAdmnNo.trim() || `SPIC-${Math.floor(1000 + Math.random() * 9000)}`,
      dob: stDob.trim()
    };

    await addStudentRecord(newSt);
    loadRosterData();
    setStExamNo('');
    setStName('');
    setStAdmnNo('');
    setStDob('');
    setFeedbackMsg({ type: 'SUCCESS', text: `Student ${newSt.name} (${newSt.examNo}) added to database!` });
    onRosterUpdated?.();
  };

  // Add Single Teacher
  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tcEmail || !tcName) {
      setFeedbackMsg({ type: 'ERROR', text: 'Teacher Name and Email are required.' });
      return;
    }

    const assigned = tcAssigned.split(',').map(s => s.trim()).filter(Boolean);
    const newTc: TeacherRecord = {
      email: tcEmail.trim().toLowerCase(),
      name: tcName.trim(),
      pass: tcPass.trim() || 'Teacher@2026',
      assigned: assigned.length > 0 ? assigned : ['10 A']
    };

    await addTeacherRecord(newTc);
    loadRosterData();
    setTcName('');
    setTcEmail('');
    setFeedbackMsg({ type: 'SUCCESS', text: `Teacher ${newTc.name} (${newTc.email}) registered in database!` });
    onRosterUpdated?.();
  };

  // Delete Student
  const handleDeleteStudent = async (examNo: string) => {
    if (window.confirm(`Are you sure you want to remove student ${examNo}?`)) {
      await deleteStudentRecord(examNo);
      loadRosterData();
      onRosterUpdated?.();
    }
  };

  // Delete Teacher
  const handleDeleteTeacher = async (email: string) => {
    if (window.confirm(`Are you sure you want to remove staff member ${email}?`)) {
      await deleteTeacherRecord(email);
      loadRosterData();
      onRosterUpdated?.();
    }
  };

  // Bulk Import handler
  const handleBulkImport = async () => {
    if (!bulkText.trim()) return;

    const lines = bulkText.split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length === 0) return;

    if (activeTab === 'STUDENTS') {
      const parsedStudents: StudentRecord[] = [];
      let startIndex = 0;

      // Check header
      const firstLine = lines[0].toLowerCase();
      if (firstLine.includes('exam') || firstLine.includes('name') || firstLine.includes('admn') || firstLine.includes('dob')) {
        startIndex = 1;
      }

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].includes('\t') ? lines[i].split('\t') : lines[i].split(',');
        if (parts.length >= 3) {
          // Flexible mapping: ExamNo, Name, ClassSec, AdmnNo, DOB
          const examNo = parts[0]?.trim() || '';
          const name = parts[1]?.trim() || '';
          const classSec = parts[2]?.trim() || '10 A';
          const admnNo = parts[3]?.trim() || `SPIC-${Math.floor(1000 + Math.random() * 9000)}`;
          const dob = parts[4]?.trim() || '15/08/2008';

          if (examNo && name) {
            parsedStudents.push({
              examNo: examNo.toUpperCase(),
              name,
              classSec,
              admnNo,
              dob
            });
          }
        }
      }

      if (parsedStudents.length > 0) {
        const count = await bulkAddStudents(parsedStudents);
        loadRosterData();
        setBulkText('');
        setBulkMode(false);
        setFeedbackMsg({ type: 'SUCCESS', text: `Successfully imported ${count} students into database!` });
        onRosterUpdated?.();
      } else {
        setFeedbackMsg({ type: 'ERROR', text: 'No valid student rows detected. Check headers and columns.' });
      }
    } else if (activeTab === 'TEACHERS') {
      const parsedTeachers: TeacherRecord[] = [];
      let startIndex = 0;

      const firstLine = lines[0].toLowerCase();
      if (firstLine.includes('email') || firstLine.includes('name') || firstLine.includes('pass')) {
        startIndex = 1;
      }

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].includes('\t') ? lines[i].split('\t') : lines[i].split(',');
        if (parts.length >= 2) {
          const email = parts[0]?.trim() || '';
          const name = parts[1]?.trim() || '';
          const pass = parts[2]?.trim() || 'Teacher@2026';
          const assignedRaw = parts[3]?.trim() || '10 A, 10 B';
          const assigned = assignedRaw.split(/[,;]/).map(s => s.trim()).filter(Boolean);

          if (email && name) {
            parsedTeachers.push({
              email: email.toLowerCase(),
              name,
              pass,
              assigned
            });
          }
        }
      }

      if (parsedTeachers.length > 0) {
        const count = await bulkAddTeachers(parsedTeachers);
        loadRosterData();
        setBulkText('');
        setBulkMode(false);
        setFeedbackMsg({ type: 'SUCCESS', text: `Successfully imported ${count} teachers into database!` });
        onRosterUpdated?.();
      } else {
        setFeedbackMsg({ type: 'ERROR', text: 'No valid teacher rows detected.' });
      }
    }
  };

  // Sample quick template for bulk student paste
  const handleLoadSampleStudents = () => {
    setBulkText(`Exam_No\tName\tClass_Sec\tAdmn_No\tDOB_Password
EX1006\tS. Balaji\t10 A\tSPIC-8806\t14/03/2008
EX1007\tT. Ananya\t10 A\tSPIC-8807\t25/07/2008
EX1008\tJ. Mohammed Farhan\t10 A\tSPIC-8808\t08/10/2008
EX1009\tV. Kausalya\t10 B\tSPIC-8809\t11/02/2008`);
  };

  // Sample quick template for bulk teacher paste
  const handleLoadSampleTeachers = () => {
    setBulkText(`Email\tName\tPassword\tAssigned_Classes
maharajan@spicschool.com\tMr. Maharajan (Senior Faculty)\tTeacher@2026\t10 A, 10 B, 11 A, 12 A
teacher.physics@spicschool.com\tDr. R. Ramachandran\tTeacher@2026\t11 A, 12 A
teacher.biology@spicschool.com\tMrs. P. Subbulakshmi\tTeacher@2026\t10 A, 10 B`);
  };

  // Download Student Template
  const handleDownloadStudentTemplate = () => {
    const content = "Exam_No\tName\tClass_Sec\tAdmn_No\tDOB_Password\nEX1001\tS. Arun Kumar\t10 A\tSPIC-8801\t15/08/2008\nEX1002\tP. Meenakshi\t10 A\tSPIC-8802\t22/11/2008\n";
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'SPIC_Students_Roster_Template.tsv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download Teacher Template
  const handleDownloadTeacherTemplate = () => {
    const content = "Email\tName\tPassword\tAssigned_Classes\nmaharajan@spicschool.com\tMr. Maharajan (Senior Faculty)\tTeacher@2026\t10 A, 10 B\nteacher.science@spicschool.com\tMrs. S. Jayashree (Science)\tTeacher@2026\t10 A, 10 B\n";
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'SPIC_Teachers_Roster_Template.tsv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesClass = selectedClass === 'ALL' || s.classSec === selectedClass;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.examNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admnNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Filter teachers
  const filteredTeachers = teachers.filter(t => {
    return (
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-300 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-indigo-950 text-white p-4 sm:p-5 flex justify-between items-center border-b-4 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-300 leading-none">
                SPIC School User & Roster Database
              </h3>
              <p className="text-xs text-indigo-200 font-bold mt-1">
                Manage Students, Faculty & Domain Email Credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-indigo-800 hover:bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2 gap-3 text-xs font-black">
          <button
            onClick={() => { setActiveTab('STUDENTS'); setBulkMode(false); }}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'STUDENTS'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Students Roster ({students.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('TEACHERS'); setBulkMode(false); }}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'TEACHERS'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>Teachers & Staff ({teachers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('GUIDE')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'GUIDE'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Info className="w-4 h-4 text-indigo-600" />
            <span>How Login & Passwords Work</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div className={`mx-6 mt-4 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            feedbackMsg.type === 'SUCCESS'
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border border-rose-300 text-rose-900'
          }`}>
            {feedbackMsg.type === 'SUCCESS' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ================= TAB 1: STUDENTS ================= */}
          {activeTab === 'STUDENTS' && (
            <div className="space-y-6">
              
              {/* Actions Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBulkMode(!bulkMode)}
                    className="bg-indigo-900 hover:bg-indigo-800 text-amber-300 text-xs font-black px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{bulkMode ? 'Hide Bulk Importer' : 'Bulk Import Students (Sheet/CSV)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadStudentTemplate}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download Roster Template</span>
                  </button>
                </div>

                {/* Filter and Search */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="border-2 border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold bg-slate-50 focus:border-indigo-600 outline-none"
                  >
                    <option value="ALL">All Classes</option>
                    <option value="10 A">Class 10 A</option>
                    <option value="10 B">Class 10 B</option>
                    <option value="11 A">Class 11 A</option>
                    <option value="12 A">Class 12 A</option>
                  </select>

                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 border-2 border-slate-200 rounded-xl text-xs font-bold bg-slate-50 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bulk Importer Section */}
              {bulkMode && (
                <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                      <span>Paste Multiple Students from Google Sheets / Excel</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleLoadSampleStudents}
                      className="text-[11px] font-black text-amber-900 bg-amber-200 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      Fill Sample Student Data
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={bulkText}
                    onChange={e => setBulkText(e.target.value)}
                    placeholder={`Exam_No\tName\tClass_Sec\tAdmn_No\tDOB_Password\nEX1006\tS. Balaji\t10 A\tSPIC-8806\t14/03/2008`}
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-mono text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  ></textarea>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">Columns required: Exam Number, Student Name, Class & Sec, Admission No, Password / DOB (DD/MM/YYYY).</span>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      className="bg-indigo-900 hover:bg-indigo-800 text-white font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Process & Add to Database</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Single Student Add Form */}
              <form onSubmit={handleAddStudent} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                  Add Individual Candidate
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Exam No (Login ID)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EX1006"
                      value={stExamNo}
                      onChange={e => setStExamNo(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none uppercase font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Candidate Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Balaji"
                      value={stName}
                      onChange={e => setStName(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Class & Section
                    </label>
                    <select
                      value={stClassSec}
                      onChange={e => setStClassSec(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    >
                      <option value="10 A">Class 10 A</option>
                      <option value="10 B">Class 10 B</option>
                      <option value="11 A">Class 11 A</option>
                      <option value="12 A">Class 12 A</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      DOB (Password)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="DD/MM/YYYY"
                      value={stDob}
                      onChange={e => setStDob(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-mono font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-[10px] text-slate-400">
                    Admission Number will auto-generate if left blank.
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-900 hover:bg-indigo-800 text-white font-black px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Save Student</span>
                  </button>
                </div>
              </form>

              {/* Students Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                      <th className="p-3">Exam No (Login)</th>
                      <th className="p-3">Candidate Name</th>
                      <th className="p-3">Class & Sec</th>
                      <th className="p-3">Admission No</th>
                      <th className="p-3">Password / DOB</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-400 font-bold">
                          No students matching your filter.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st, idx) => (
                        <tr key={`${st.examNo}-${idx}`} className="hover:bg-indigo-50/40 transition">
                          <td className="p-3 font-mono font-black text-indigo-700">{st.examNo}</td>
                          <td className="p-3 font-bold text-slate-900">{st.name}</td>
                          <td className="p-3 font-bold">Class {st.classSec}</td>
                          <td className="p-3 font-mono text-slate-500">{st.admnNo}</td>
                          <td className="p-3 font-mono text-slate-600">{st.dob}</td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteStudent(st.examNo)}
                              title="Delete Student"
                              className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= TAB 2: TEACHERS ================= */}
          {activeTab === 'TEACHERS' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBulkMode(!bulkMode)}
                    className="bg-indigo-900 hover:bg-indigo-800 text-amber-300 text-xs font-black px-3.5 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{bulkMode ? 'Hide Bulk Importer' : 'Bulk Import Faculty (Sheet/CSV)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadTeacherTemplate}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download Staff Template</span>
                  </button>
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border-2 border-slate-200 rounded-xl text-xs font-bold bg-slate-50 focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              {bulkMode && (
                <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                      <span>Paste Faculty Members from Spreadsheet</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleLoadSampleTeachers}
                      className="text-[11px] font-black text-amber-900 bg-amber-200 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition cursor-pointer"
                    >
                      Fill Sample Faculty Data
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={bulkText}
                    onChange={e => setBulkText(e.target.value)}
                    placeholder={`Email\tName\tPassword\tAssigned_Classes\nmaharajan@spicschool.com\tMr. Maharajan (Senior Faculty)\tTeacher@2026\t10 A, 10 B`}
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-mono text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  ></textarea>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500">Columns: Email, Full Name, Password, Assigned Classes.</span>
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      className="bg-indigo-900 hover:bg-indigo-800 text-white font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add Faculty to Database</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Add Single Teacher Form */}
              <form onSubmit={handleAddTeacher} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                  Add Single Faculty Member
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Faculty Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Maharajan"
                      value={tcName}
                      onChange={e => setTcName(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      School Email (@spicschool.com)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maharajan@spicschool.com"
                      value={tcEmail}
                      onChange={e => setTcEmail(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Assigned Classes (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="10 A, 10 B, 11 A"
                      value={tcAssigned}
                      onChange={e => setTcAssigned(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                      Password
                    </label>
                    <input
                      type="text"
                      value={tcPass}
                      onChange={e => setTcPass(e.target.value)}
                      placeholder="Teacher@2026"
                      className="w-full border-2 border-slate-200 rounded-xl p-2 bg-white font-mono font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-indigo-900 hover:bg-indigo-800 text-white font-black px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Register Faculty Member</span>
                  </button>
                </div>
              </form>

              {/* Teachers Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                      <th className="p-3">Staff Member</th>
                      <th className="p-3">School Domain Email</th>
                      <th className="p-3">Assigned Classes</th>
                      <th className="p-3">Password</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    {filteredTeachers.map((tc, idx) => (
                      <tr key={`${tc.email}-${idx}`} className="hover:bg-indigo-50/40 transition">
                        <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{tc.name}</span>
                        </td>
                        <td className="p-3 font-mono text-indigo-700 font-bold">{tc.email}</td>
                        <td className="p-3 font-bold text-slate-700">
                          {tc.assigned?.join(', ') || 'All Classes'}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{tc.pass}</td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteTeacher(tc.email)}
                            title="Delete Staff"
                            className="text-slate-400 hover:text-rose-600 transition p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= TAB 3: GUIDE ================= */}
          {activeTab === 'GUIDE' && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700">
              <h4 className="font-black text-indigo-950 text-sm flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-indigo-600" />
                <span>SPIC Nagar Higher Secondary School Authentication Protocol</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-slate-300 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 font-black text-xs uppercase">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>How Teachers with Same Domain Email Login</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    All faculty members possessing a school domain email ending in <code>@spicschool.com</code> (e.g. <code>maharajan@spicschool.com</code>) can log in via the <strong>Teacher Login</strong> tab.
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                    <li><strong>Username:</strong> Your full email address (e.g. <code>maharajan@spicschool.com</code>).</li>
                    <li><strong>Standard Staff Password:</strong> <code>Teacher@2026</code> (or your customized password).</li>
                    <li><strong>Automatic Provisioning:</strong> Any staff logging in with valid <code>@spicschool.com</code> credentials is authenticated and granted access to view their classes.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-300 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-indigo-900 font-black text-xs uppercase">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>How Students & Candidates Login</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Candidates access the secure assessment kiosk via the <strong>Student Login</strong> tab.
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 font-medium">
                    <li><strong>Login ID:</strong> Candidate Exam Number (e.g. <code>EX1001</code>, <code>EX1002</code>).</li>
                    <li><strong>Password:</strong> Date of Birth in strict <code>DD/MM/YYYY</code> format (e.g. <code>15/08/2008</code>).</li>
                    <li><strong>Bulk Import:</strong> Admins and teachers can import an entire section by pasting the class roster table from Google Sheets.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-100/70 border border-amber-300 p-3.5 rounded-xl text-amber-900 font-medium">
                <strong className="block mb-1 font-black uppercase text-[11px]">Administrator Access:</strong>
                Use <code>admin</code> or <code>maharajan@spicschool.com</code> with password <code>SpicAdmin@2026</code> to access the Executive Control Room.
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-between items-center text-xs">
          <div className="text-slate-500 font-bold">
            Total Enrolled: {students.length} Students • {teachers.length} Faculty Members
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-indigo-950 hover:bg-indigo-900 text-white rounded-xl font-black transition cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
