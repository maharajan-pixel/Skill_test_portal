import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Check, 
  Sparkles, 
  Plus, 
  HelpCircle, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  BookOpen,
  FileText
} from 'lucide-react';
import { ExamDocument, QuestionItem } from '../types';

interface ImportSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportExam: (newExam: ExamDocument) => Promise<void>;
  currentTeacherEmail?: string;
}

export const ImportSheetModal: React.FC<ImportSheetModalProps> = ({
  isOpen,
  onClose,
  onImportExam,
  currentTeacherEmail
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Science (Physical & Biological)');
  const [classSec, setClassSec] = useState('10 A');
  const [examMins, setExamMins] = useState(10);
  const [allowedTeachersInput, setAllowedTeachersInput] = useState(
    currentTeacherEmail || 'maharajan@spicschool.com, teacher.science@spicschool.com'
  );
  const [sheetUrl, setSheetUrl] = useState('');
  const [rawQuestionsText, setRawQuestionsText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState<QuestionItem[]>([]);
  const [parseError, setParseError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'PASTE' | 'PREVIEW' | 'GUIDE'>('PASTE');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exact header format requested by user:
  // "ID	SUBJECT	Question_Text	Option_A	Option_B	Option_C	Option_D	Correct_Answer	Points"

  // Load sample template matching user's exact headers
  const handleLoadSampleTemplate = () => {
    setTitle('Class 10 A - Science Mid-Term Review 2026');
    setSubject('Science (Physical & Biological)');
    setClassSec('10 A');
    setExamMins(10);
    setSheetUrl('https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit');
    
    // Exact user header format in tab-separated format (as copied directly from Google Sheets / Excel)
    const sample = `ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints
1\tPHYSICAL SCIENCE\tWhat is the SI unit of electric potential difference (Voltage)?\tAmpere (A)\tVolt (V)\tOhm (Ω)\tJoule (J)\tOption_B\t1
2\tPHYSICAL SCIENCE\tAccording to Ohm's Law, current flowing through a conductor is:\tInversely proportional to voltage\tDirectly proportional to potential difference\tDirectly proportional to square of resistance\tIndependent of applied voltage\tOption_B\t1
3\tPHYSICAL SCIENCE\tWhich mirror is primarily utilized as a rear-view mirror in automobiles?\tConcave mirror\tPlane mirror\tConvex mirror\tParabolic mirror\tOption_C\t1
4\tBIOLOGICAL SCIENCE\tIn human circulatory physiology, which blood vessel carries oxygenated blood to left atrium?\tPulmonary artery\tPulmonary vein\tSuperior vena cava\tSystemic aorta\tOption_B\t1
5\tBIOLOGICAL SCIENCE\tThe site of complete digestion of carbohydrates and fats in alimentary canal is:\tStomach\tSmall Intestine (Ileum)\tLarge Intestine\tEsophagus\tOption_B\t1
6\tBIOLOGICAL SCIENCE\tWhich plant hormone promotes cell division in growing fruits and seeds?\tAbscisic Acid (ABA)\tCytokinin\tGibberellin\tEthylene\tOption_B\t1`;

    setRawQuestionsText(sample);
  };

  // Helper to resolve answer key
  const resolveCorrectIndex = (
    rawKey: string,
    optA: string,
    optB: string,
    optC: string,
    optD: string
  ): number => {
    const clean = (rawKey || '').trim().toUpperCase();
    if (clean === 'OPTION_A' || clean === 'OPTION A' || clean === 'A' || clean === '0') return 0;
    if (clean === 'OPTION_B' || clean === 'OPTION B' || clean === 'B' || clean === '1') return 1;
    if (clean === 'OPTION_C' || clean === 'OPTION C' || clean === 'C' || clean === '2') return 2;
    if (clean === 'OPTION_D' || clean === 'OPTION D' || clean === 'D' || clean === '3') return 3;
    
    // Numeric 1-4 fallback
    if (clean === '1') return 0;
    if (clean === '2') return 1;
    if (clean === '3') return 2;
    if (clean === '4') return 3;

    // Check textual match
    const lowerKey = (rawKey || '').trim().toLowerCase();
    if (lowerKey && optA.trim().toLowerCase() === lowerKey) return 0;
    if (lowerKey && optB.trim().toLowerCase() === lowerKey) return 1;
    if (lowerKey && optC.trim().toLowerCase() === lowerKey) return 2;
    if (lowerKey && optD.trim().toLowerCase() === lowerKey) return 3;

    return 0;
  };

  // Robust CSV / TSV parser supporting quotes and delimiters
  const parseDelimitedText = (text: string): string[][] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    const result: string[][] = [];

    lines.forEach(line => {
      // Determine separator: Tab takes precedence if present
      if (line.includes('\t')) {
        const parts = line.split('\t').map(p => p.trim());
        result.push(parts);
      } else {
        // Standard CSV parsing with quote handling
        const row: string[] = [];
        let cur = '';
        let insideQuote = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' || char === "'") {
            insideQuote = !insideQuote;
          } else if (char === ',' && !insideQuote) {
            row.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        row.push(cur.trim());
        result.push(row);
      }
    });

    return result;
  };

  // Auto-parse when rawQuestionsText changes
  useEffect(() => {
    if (!rawQuestionsText.trim()) {
      setParsedQuestions([]);
      setParseError('');
      return;
    }

    try {
      const rows = parseDelimitedText(rawQuestionsText);
      if (rows.length === 0) {
        setParsedQuestions([]);
        return;
      }

      // Check for Header Row
      let startIndex = 0;
      let colMap = {
        id: 0,
        subject: 1,
        question: 2,
        optA: 3,
        optB: 4,
        optC: 5,
        optD: 6,
        correct: 7,
        points: 8
      };

      const firstRow = rows[0].map(c => c.toUpperCase().replace(/[\s_-]+/g, ''));
      const hasHeader = firstRow.some(c => 
        c.includes('ID') || 
        c.includes('SUBJECT') || 
        c.includes('QUESTION') || 
        c.includes('OPTIONA') || 
        c.includes('CORRECT')
      );

      if (hasHeader) {
        startIndex = 1;
        firstRow.forEach((col, idx) => {
          if (col === 'ID' || col === 'QID' || col === 'SLNO') colMap.id = idx;
          else if (col.includes('SUBJECT') || col.includes('CATEGORY')) colMap.subject = idx;
          else if (col.includes('QUESTION') || col.includes('TEXT')) colMap.question = idx;
          else if (col.includes('OPTIONA') || col === 'OPTA' || col === 'A') colMap.optA = idx;
          else if (col.includes('OPTIONB') || col === 'OPTB' || col === 'B') colMap.optB = idx;
          else if (col.includes('OPTIONC') || col === 'OPTC' || col === 'C') colMap.optC = idx;
          else if (col.includes('OPTIOND') || col === 'OPTD' || col === 'D') colMap.optD = idx;
          else if (col.includes('CORRECT') || col.includes('ANSWER') || col.includes('KEY')) colMap.correct = idx;
          else if (col.includes('POINT') || col.includes('MARK')) colMap.points = idx;
        });
      }

      const qItems: QuestionItem[] = [];

      for (let i = startIndex; i < rows.length; i++) {
        const row = rows[i];
        if (!row || row.length < 4) continue;

        const qId = row[colMap.id] || `Q${qItems.length + 1}`;
        const cat = row[colMap.subject] || 'GENERAL';
        const qText = row[colMap.question] || '';
        const optA = row[colMap.optA] || 'Option A';
        const optB = row[colMap.optB] || 'Option B';
        const optC = row[colMap.optC] || 'Option C';
        const optD = row[colMap.optD] || 'Option D';
        const rawAns = row[colMap.correct] || '0';
        const points = parseFloat(row[colMap.points]) || 1;

        if (qText.trim()) {
          const correctIdx = resolveCorrectIndex(rawAns, optA, optB, optC, optD);
          qItems.push({
            id: qId,
            category: cat.toUpperCase(),
            text: qText,
            options: [
              { t: optA, o: 0 },
              { t: optB, o: 1 },
              { t: optC, o: 2 },
              { t: optD, o: 3 }
            ],
            correctAnswer: correctIdx,
            points: points
          });
        }
      }

      setParsedQuestions(qItems);
      if (qItems.length > 0) {
        setParseError('');
      } else {
        setParseError('Could not identify valid questions. Please ensure rows have Question Text and Options.');
      }
    } catch (err: any) {
      setParseError(`Parsing error: ${err.message}`);
    }
  }, [rawQuestionsText]);

  // Handle file upload (.csv or .tsv)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawQuestionsText(content);
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
        }
      }
    };
    reader.readAsText(file);
  };

  // Download Sample CSV template
  const handleDownloadSampleCsv = () => {
    const headers = "ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints\n";
    const sampleRow1 = "1\tPHYSICAL SCIENCE\tWhat is the SI unit of Electric Potential?\tAmpere\tVolt\tOhm\tJoule\tOption_B\t1\n";
    const sampleRow2 = "2\tBIOLOGICAL SCIENCE\tPowerhouse of the animal cell is:\tRibosome\tMitochondria\tLysosome\tGolgi Body\tOption_B\t1\n";
    const content = headers + sampleRow1 + sampleRow2;
    
    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SPIC_Question_Paper_Template.tsv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit and save exam
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setParseError('');

    if (!title.trim()) {
      setParseError('Please provide an examination title.');
      return;
    }

    if (parsedQuestions.length === 0) {
      setParseError('Please paste or upload question paper data before deploying.');
      return;
    }

    setIsProcessing(true);

    try {
      const allowed = allowedTeachersInput
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(e => e.length > 0);

      const newExam: ExamDocument = {
        id: `exam-${Date.now()}`,
        title: title.trim(),
        subject: subject.trim(),
        classSec: classSec.trim(),
        allowedTeachers: allowed.length > 0 ? allowed : ['maharajan@spicschool.com', 'teacher.science@spicschool.com'],
        status: 'ACTIVE',
        scoreStatus: 'AUTO',
        examMins: Number(examMins) || 10,
        qCount: parsedQuestions.length,
        targetUrl: sheetUrl.trim() || 'https://docs.google.com/spreadsheets/d/custom_db/edit',
        questions: parsedQuestions
      };

      await onImportExam(newExam);
      onClose();
    } catch (err: any) {
      setParseError(err.message || 'Failed to import exam.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  // Category counts
  const categorySummary: Record<string, number> = {};
  parsedQuestions.forEach(q => {
    const cat = q.category || 'GENERAL';
    categorySummary[cat] = (categorySummary[cat] || 0) + 1;
  });

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-300 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-indigo-950 text-white p-4 sm:p-5 flex justify-between items-center border-b-4 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-300 leading-none">
                SPIC Question Paper Importer
              </h3>
              <p className="text-xs text-indigo-200 font-bold mt-1">
                Direct Google Sheets TSV / CSV Import with Custom Headers
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

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2 gap-2 text-xs font-black">
          <button
            type="button"
            onClick={() => setActiveTab('PASTE')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'PASTE'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Paper Details & Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('PREVIEW')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'PREVIEW'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>2. Live Preview & Validation ({parsedQuestions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('GUIDE')}
            className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center gap-1.5 ${
              activeTab === 'GUIDE'
                ? 'border-indigo-600 text-indigo-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Header Specification</span>
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleCreate} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-bold text-slate-700 flex-1">
          
          {/* TAB 1: PASTE & CONFIGURE */}
          {activeTab === 'PASTE' && (
            <>
              {/* Quick Template Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-amber-50/90 p-3 sm:p-3.5 rounded-2xl border border-amber-200 gap-2">
                <div className="text-amber-950 text-xs font-black flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Your Previous Headers Format Supported:</span>
                  <code className="bg-amber-200/80 px-2 py-0.5 rounded text-[11px] font-mono text-amber-900">
                    ID | SUBJECT | Question_Text | Option_A-D | Correct_Answer | Points
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadSampleCsv}
                    className="bg-white hover:bg-slate-100 text-indigo-950 border border-slate-300 px-3 py-1.5 rounded-xl text-[11px] font-black shadow-2xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Download Template</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadSampleTemplate}
                    className="bg-indigo-950 hover:bg-indigo-900 text-amber-300 border border-amber-400/40 px-3 py-1.5 rounded-xl text-[11px] font-black shadow-2xs transition cursor-pointer"
                  >
                    Auto-Fill Sample
                  </button>
                </div>
              </div>

              {/* Exam Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Examination Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. 10 A - Term 1 Science Mid-Term"
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Subject / Discipline
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Science / Mathematics"
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Target Class & Section
                  </label>
                  <select
                    value={classSec}
                    onChange={e => setClassSec(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 outline-none"
                  >
                    <option value="10 A">Class 10 A</option>
                    <option value="10 B">Class 10 B</option>
                    <option value="11 A">Class 11 A</option>
                    <option value="11 B">Class 11 B</option>
                    <option value="12 A">Class 12 A</option>
                    <option value="12 B">Class 12 B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Total Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="180"
                    value={examMins}
                    onChange={e => setExamMins(parseInt(e.target.value) || 10)}
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-bold text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                    Assigned Teacher Emails (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={allowedTeachersInput}
                    onChange={e => setAllowedTeachersInput(e.target.value)}
                    placeholder="teacher.science@spicschool.com, maharajan@spicschool.com"
                    className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-mono text-xs text-slate-900 focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              {/* Data Import Section */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] uppercase tracking-wider text-slate-500">
                    Paste Google Sheets Rows / TSV / CSV Data
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".csv,.tsv,.txt"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] text-indigo-700 hover:text-indigo-900 font-black flex items-center gap-1 cursor-pointer bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload .CSV / .TSV File</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={7}
                  value={rawQuestionsText}
                  onChange={e => setRawQuestionsText(e.target.value)}
                  placeholder={`ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints\n1\tPHYSICAL SCIENCE\tWhat is the SI unit of voltage?\tAmpere\tVolt\tOhm\tJoule\tOption_B\t1`}
                  className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 font-mono text-xs text-slate-900 focus:border-indigo-600 focus:bg-white outline-none leading-relaxed"
                ></textarea>

                <div className="flex justify-between items-center mt-1 text-[11px] text-slate-500">
                  <span>💡 Tip: Select your table in Google Sheets or Excel, press Ctrl+C (Copy), and Ctrl+V (Paste) directly here.</span>
                  {parsedQuestions.length > 0 && (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {parsedQuestions.length} Questions Detected
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1">
                  Optional Google Spreadsheet URL
                </label>
                <input
                  type="url"
                  value={sheetUrl}
                  onChange={e => setSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/your_sheet_id/edit"
                  className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-slate-50 font-mono text-xs text-slate-800 focus:border-indigo-600 outline-none"
                />
              </div>
            </>
          )}

          {/* TAB 2: LIVE PREVIEW & VALIDATION */}
          {activeTab === 'PREVIEW' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3">
                <div>
                  <h4 className="font-black text-indigo-950 text-sm">
                    {title || 'Untitled Assessment Paper'} ({classSec})
                  </h4>
                  <p className="text-xs text-indigo-700 font-medium">
                    Duration: {examMins} Mins • Total Questions: {parsedQuestions.length}
                  </p>
                </div>

                {/* Category tags */}
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(categorySummary).map(([cat, count]) => (
                    <span key={cat} className="bg-white border border-indigo-300 text-indigo-900 px-2.5 py-1 rounded-xl text-[11px] font-black font-mono shadow-2xs">
                      {cat}: {count} Qs
                    </span>
                  ))}
                </div>
              </div>

              {parsedQuestions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold">
                  No questions parsed yet. Return to the "Details & Data" tab and paste or upload question paper rows.
                </div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {parsedQuestions.map((q, idx) => (
                    <div key={q.id + idx} className="bg-white border border-slate-300 rounded-2xl p-4 shadow-2xs">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-900 text-amber-300 px-2.5 py-0.5 rounded-lg text-xs font-black font-mono">
                            {q.id}
                          </span>
                          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">
                            {q.category}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 font-bold">
                          {q.points || 1} Point(s)
                        </span>
                      </div>

                      <p className="font-bold text-slate-900 text-xs sm:text-sm mb-3">
                        {q.text}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctAnswer === optIdx;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-black shadow-2xs'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt.t}</span>
                              </div>
                              {isCorrect && (
                                <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  CORRECT KEY
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: HEADER SPECIFICATION GUIDE */}
          {activeTab === 'GUIDE' && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <h4 className="font-black text-indigo-950 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>How to Format Your Question Paper Spreadsheet</span>
              </h4>

              <p className="text-slate-600 leading-relaxed font-normal">
                Your spreadsheet can have the following columns in row 1:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 bg-white rounded-xl text-[11px]">
                  <thead>
                    <tr className="bg-indigo-950 text-amber-300 font-mono">
                      <th className="p-2 border border-slate-300">Header</th>
                      <th className="p-2 border border-slate-300">Description</th>
                      <th className="p-2 border border-slate-300">Example Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">ID</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Question Identifier / Serial No</td>
                      <td className="p-2 font-mono text-slate-800 border border-slate-200">1, 2, Q101</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">SUBJECT</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Syllabus Section / Topic</td>
                      <td className="p-2 font-mono text-slate-800 border border-slate-200">PHYSICAL SCIENCE, BIOLOGICAL SCIENCE</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Question_Text</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Question stem (supports text & drive URLs)</td>
                      <td className="p-2 text-slate-800 border border-slate-200">What is the SI unit of voltage?</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Option_A</td>
                      <td className="p-2 text-slate-600 border border-slate-200">First multiple choice option</td>
                      <td className="p-2 text-slate-800 border border-slate-200">Ampere</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Option_B</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Second multiple choice option</td>
                      <td className="p-2 text-slate-800 border border-slate-200">Volt</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Option_C</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Third multiple choice option</td>
                      <td className="p-2 text-slate-800 border border-slate-200">Ohm</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Option_D</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Fourth multiple choice option</td>
                      <td className="p-2 text-slate-800 border border-slate-200">Joule</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-emerald-700 border border-slate-200">Correct_Answer</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Answer key. Accepts Option_A, Option_B, A, B, C, D, or exact text</td>
                      <td className="p-2 font-mono text-emerald-800 border border-slate-200">Option_B or B</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-indigo-700 border border-slate-200">Points</td>
                      <td className="p-2 text-slate-600 border border-slate-200">Weightage in marks</td>
                      <td className="p-2 font-mono text-slate-800 border border-slate-200">1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-100/60 border border-amber-300 p-3 rounded-xl text-[11px] text-amber-900 font-medium">
                <strong>Copy-Paste from Google Sheets:</strong> Simply highlight rows in Google Sheets including the header, press <code>Ctrl+C</code>, and paste into the textarea on the first tab. It will parse and highlight the correct keys automatically!
              </div>
            </div>
          )}

          {/* Error message */}
          {parseError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Action footer */}
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center gap-2">
            <div className="text-xs text-slate-500 font-bold">
              {parsedQuestions.length > 0 ? (
                <span className="text-emerald-700 font-black">
                  Ready to deploy {parsedQuestions.length} questions to Class {classSec}
                </span>
              ) : (
                <span>Paste or load data to preview</span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || parsedQuestions.length === 0}
                className="px-6 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl font-black transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>{isProcessing ? 'Deploying...' : 'Deploy to Firestore & Active Kiosk'}</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
