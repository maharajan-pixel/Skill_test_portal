import React, { useState } from 'react';
import { ExamDocument, SubmissionDocument } from '../types';
import { 
  fetchScoreboardFromSpreadsheet, 
  parseScoreboardRawText, 
  connectGoogleWorkspace, 
  isWorkspaceConnected 
} from '../services/googleWorkspace';
import { bulkSaveSubmissions } from '../services/firebase';
import { 
  X, 
  FileSpreadsheet, 
  ClipboardPaste, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  Award,
  Users,
  TrendingUp,
  Download
} from 'lucide-react';

interface SyncScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamDocument;
  onSyncSuccess: (newSubmissions: SubmissionDocument[]) => void;
}

export const SyncScoreboardModal: React.FC<SyncScoreboardModalProps> = ({
  isOpen,
  onClose,
  exam,
  onSyncSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'GOOGLE_SHEETS' | 'PASTE_TSV' | 'UPLOAD_CSV'>('GOOGLE_SHEETS');
  const [sheetUrl, setSheetUrl] = useState<string>(exam.targetUrl || '');
  const [selectedSheetTab, setSelectedSheetTab] = useState<string>('Scoreboard');
  const [availableSheets, setAvailableSheets] = useState<string[]>([]);
  const [pastedText, setPastedText] = useState<string>('');
  
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [parsedSubmissions, setParsedSubmissions] = useState<SubmissionDocument[]>([]);
  const [notice, setNotice] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  if (!isOpen) return null;

  // 1. Fetch from Google Sheets API / URL
  const handleFetchFromGoogleSheets = async () => {
    const url = sheetUrl.trim();
    if (!url) {
      setNotice({ type: 'error', message: 'Please provide the Google Spreadsheet URL (Teacher_Sheet_URL).' });
      return;
    }

    setIsFetching(true);
    setNotice(null);

    try {
      if (!isWorkspaceConnected()) {
        try {
          await connectGoogleWorkspace();
        } catch (authErr: any) {
          console.warn("Google Workspace connection prompt warning:", authErr);
        }
      }

      const result = await fetchScoreboardFromSpreadsheet(url, exam, selectedSheetTab);
      setParsedSubmissions(result.submissions);
      setAvailableSheets(result.availableSheets);
      setSelectedSheetTab(result.sheetTitle);
      setNotice({
        type: 'success',
        message: `Successfully loaded ${result.submissions.length} candidate scores from sheet tab "${result.sheetTitle}"!`
      });
    } catch (err: any) {
      console.error("Scoreboard fetch error:", err);
      setNotice({
        type: 'error',
        message: err.message || 'Failed to read scoreboard from Google Sheet. You can also paste the rows directly under the "Paste from Sheet" tab.'
      });
    } finally {
      setIsFetching(false);
    }
  };

  // 2. Parse Pasted TSV / CSV Content
  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      setNotice({ type: 'error', message: 'Please paste student score rows from Google Sheets or Excel.' });
      return;
    }

    try {
      const { submissions, errors } = parseScoreboardRawText(pastedText, exam);
      if (submissions.length === 0) {
        setNotice({ type: 'error', message: errors[0] || 'No valid student score rows detected in pasted text.' });
        return;
      }
      setParsedSubmissions(submissions);
      setNotice({
        type: 'success',
        message: `Parsed ${submissions.length} candidate scores successfully!`
      });
    } catch (err: any) {
      setNotice({ type: 'error', message: err.message || 'Failed to parse pasted text.' });
    }
  };

  // 3. Handle File Upload (CSV)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPastedText(content);
        try {
          const { submissions, errors } = parseScoreboardRawText(content, exam);
          if (submissions.length > 0) {
            setParsedSubmissions(submissions);
            setNotice({
              type: 'success',
              message: `Uploaded and parsed ${submissions.length} candidate scores from "${file.name}"!`
            });
          } else {
            setNotice({ type: 'error', message: errors[0] || 'No score data found in CSV.' });
          }
        } catch (err: any) {
          setNotice({ type: 'error', message: err.message || 'Failed to parse CSV file.' });
        }
      }
    };
    reader.readAsText(file);
  };

  // Sample data loader for demonstration/testing
  const handleLoadSampleScoreboard = () => {
    const sample = `Admn No\tStudent Name\tClass & Sec\tScore\tPercentage\tCorrect\tWrong\tTime Used\tProctor Status
P22162\tABINAYASRI M\t${exam.classSec}\t9 / ${exam.qCount}\t90%\t9\t1\t4m 20s\tCLEAN
P24096\tAKSHITHA S\t${exam.classSec}\t8 / ${exam.qCount}\t80%\t8\t2\t5m 12s\tCLEAN
P19066\tHARSHINI K\t${exam.classSec}\t10 / ${exam.qCount}\t100%\t10\t0\t3m 45s\tCLEAN
P25041\tINDHUMATHI I\t${exam.classSec}\t7 / ${exam.qCount}\t70%\t7\t3\t6m 05s\tCLEAN
26640\tJERFIKA J\t${exam.classSec}\t9 / ${exam.qCount}\t90%\t9\t1\t4m 50s\tCLEAN
26639\tJERISHA J\t${exam.classSec}\t8 / ${exam.qCount}\t80%\t8\t2\t5m 30s\tCLEAN
P19044\tJULIYA REEFA I\t${exam.classSec}\t10 / ${exam.qCount}\t100%\t10\t0\t4m 10s\tCLEAN
P19054\tKARTHIKA B\t${exam.classSec}\t9 / ${exam.qCount}\t90%\t9\t1\t5m 00s\tCLEAN
P19142\tKARTHIKEYANI M\t${exam.classSec}\t8 / ${exam.qCount}\t80%\t8\t2\t6m 15s\tCLEAN
26612\tLINCY D\t${exam.classSec}\t9 / ${exam.qCount}\t90%\t9\t1\t4m 40s\tCLEAN`;
    setPastedText(sample);
    const { submissions } = parseScoreboardRawText(sample, exam);
    setParsedSubmissions(submissions);
    setNotice({
      type: 'info',
      message: `Loaded template with ${submissions.length} candidates for Class ${exam.classSec}!`
    });
  };

  // 4. Save and Apply to Portal
  const handleSaveToPortal = async () => {
    if (parsedSubmissions.length === 0) return;
    setIsSaving(true);
    try {
      await bulkSaveSubmissions(exam.id, parsedSubmissions);
      onSyncSuccess(parsedSubmissions);
      onClose();
    } catch (err: any) {
      console.error("Error saving bulk submissions:", err);
      setNotice({ type: 'error', message: err.message || 'Failed to save submissions to portal database.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Stats computed from parsed preview
  const previewCount = parsedSubmissions.length;
  const previewAvg = previewCount > 0 
    ? Math.round((parsedSubmissions.reduce((acc, curr) => acc + curr.correct, 0) / previewCount) * 10) / 10 
    : 0;
  const previewTop = previewCount > 0 
    ? Math.max(...parsedSubmissions.map(s => s.correct)) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Fetch Scoreboard from Teacher Sheet
              </h2>
              <p className="text-xs text-emerald-200/90 font-medium">
                {exam.title} &bull; Class {exam.classSec} &bull; {exam.subject}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('GOOGLE_SHEETS')}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'GOOGLE_SHEETS'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>1. Google Sheets Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('PASTE_TSV')}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'PASTE_TSV'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ClipboardPaste className="w-4 h-4" />
            <span>2. Copy & Paste from Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('UPLOAD_CSV')}
            className={`pb-3 px-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'UPLOAD_CSV'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>3. Upload CSV File</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* Notice Banner */}
          {notice && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
              notice.type === 'success' 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                : notice.type === 'error'
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-indigo-50 text-indigo-900 border-indigo-200'
            }`}>
              {notice.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="flex-1">{notice.message}</span>
            </div>
          )}

          {/* TAB 1: GOOGLE SHEETS SYNC */}
          {activeTab === 'GOOGLE_SHEETS' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                  Teacher Sheet URL (Column D:D of Active_Exams)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="flex-1 border-2 border-slate-200 rounded-xl p-3 text-xs font-mono bg-slate-50 focus:border-emerald-600 focus:bg-white outline-none transition"
                  />
                  {sheetUrl && (
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center gap-1 text-xs font-bold shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open</span>
                    </a>
                  )}
                </div>
              </div>

              {availableSheets.length > 0 && (
                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                    Select Sheet Tab
                  </label>
                  <select
                    value={selectedSheetTab}
                    onChange={(e) => setSelectedSheetTab(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl p-3 text-xs font-bold bg-white focus:border-emerald-600 outline-none transition"
                  >
                    {availableSheets.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-slate-500 font-medium">
                  Reads candidate scores from the <strong>Scoreboard</strong> sheet tab in your Google Spreadsheet.
                </p>
                <button
                  onClick={handleFetchFromGoogleSheets}
                  disabled={isFetching}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                  <span>{isFetching ? 'FETCHING SCORES...' : 'FETCH SCORES FROM SHEET'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: COPY & PASTE FROM SHEET */}
          {activeTab === 'PASTE_TSV' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                  Paste Scores Directly from Google Sheets / Excel
                </label>
                <button
                  type="button"
                  onClick={handleLoadSampleScoreboard}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer underline"
                >
                  Load Sample Roster Scores
                </button>
              </div>

              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste copied cells from your Scoreboard sheet here (e.g. Admn No, Student Name, Score...)"
                className="w-full border-2 border-slate-200 rounded-2xl p-3 text-xs font-mono bg-slate-50 focus:border-emerald-600 focus:bg-white outline-none transition"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Tip: In Google Sheets, select your scoreboard table, press <strong>Ctrl+C</strong>, and paste here!
                </span>
                <button
                  type="button"
                  onClick={handleParsePastedText}
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
                >
                  Parse Pasted Rows
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: UPLOAD CSV */}
          {activeTab === 'UPLOAD_CSV' && (
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                Upload CSV File with Candidate Scores
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-8 text-center transition bg-slate-50 cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.tsv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="scoreboard-csv-upload"
                />
                <label htmlFor="scoreboard-csv-upload" className="cursor-pointer space-y-2 block">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag and drop your Scoreboard CSV file here
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports .csv and .tsv files exported from Google Sheets or Excel
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* PREVIEW OF CANDIDATE SCORES */}
          {parsedSubmissions.length > 0 && (
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/70 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-wide">
                    Candidate Scores Preview ({previewCount} Students)
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                    READY TO IMPORT
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1 text-indigo-900">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Avg: {previewAvg} / {exam.qCount}</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-900">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Top: {previewTop} / {exam.qCount}</span>
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-600 tracking-wider sticky top-0">
                    <tr>
                      <th className="p-2.5 border-b border-slate-200">Admn No</th>
                      <th className="p-2.5 border-b border-slate-200">Candidate Name</th>
                      <th className="p-2.5 border-b border-slate-200">Class</th>
                      <th className="p-2.5 border-b border-slate-200 text-center">Score</th>
                      <th className="p-2.5 border-b border-slate-200 text-center">Percentage</th>
                      <th className="p-2.5 border-b border-slate-200 text-center">Time Used</th>
                      <th className="p-2.5 border-b border-slate-200 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {parsedSubmissions.map((sub, idx) => (
                      <tr key={sub.id || idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono font-bold text-indigo-950">{sub.admnNo}</td>
                        <td className="p-2.5 font-bold">{sub.name}</td>
                        <td className="p-2.5 text-slate-500">{sub.classSec}</td>
                        <td className="p-2.5 text-center font-bold text-emerald-700 font-mono">{sub.score}</td>
                        <td className="p-2.5 text-center font-bold font-mono">
                          {exam.qCount > 0 ? Math.round((sub.correct / exam.qCount) * 100) : 0}%
                        </td>
                        <td className="p-2.5 text-center text-slate-500 text-[11px]">{sub.timeUsed}</td>
                        <td className="p-2.5 text-center">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {sub.proctorStatus || 'CLEAN'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium">
            {parsedSubmissions.length > 0 
              ? `Ready to update Real-Time Analysis with ${parsedSubmissions.length} student scores.`
              : 'Select your Google Sheet or paste scores to update the real-time scoreboard.'}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveToPortal}
              disabled={parsedSubmissions.length === 0 || isSaving}
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>APPLYING SCORES...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPLY {parsedSubmissions.length > 0 ? `${parsedSubmissions.length} ` : ''}SCORES TO PORTAL</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
