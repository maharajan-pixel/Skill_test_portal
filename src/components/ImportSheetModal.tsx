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
  FileText,
  HardDrive,
  RefreshCw,
  Trash2,
  Edit3,
  Eye,
  Layers,
  ArrowRight,
  CheckCircle,
  Copy,
  ChevronDown,
  Info
} from 'lucide-react';
import { ExamDocument, QuestionItem, QuestionOption } from '../types';
import { ClassSectionSelector } from './ClassSectionSelector';
import { 
  isWorkspaceConnected, 
  connectGoogleWorkspace, 
  fetchSpreadsheetMetadata, 
  fetchSheetValues, 
  parseSheetRowsToQuestions,
  listGoogleDriveFiles,
  DriveFileItem
} from '../services/googleWorkspace';

interface ImportSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportExam: (newExam: ExamDocument) => Promise<void>;
  currentTeacherEmail?: string;
}

type InputFormatMode = 'TABLE' | 'TEXT' | 'FILE' | 'DRIVE';

export const ImportSheetModal: React.FC<ImportSheetModalProps> = ({
  isOpen,
  onClose,
  onImportExam,
  currentTeacherEmail
}) => {
  // Exam metadata state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Science (Physical & Biological)');
  const [classSec, setClassSec] = useState('10 A');
  const [examMins, setExamMins] = useState(10);
  const [totalMarks, setTotalMarks] = useState<number | string>(6);
  const [isManualMarks, setIsManualMarks] = useState(false);
  const [allowedTeachersInput, setAllowedTeachersInput] = useState(
    currentTeacherEmail || 'maharajan@spicschool.com, teacher.science@spicschool.com'
  );

  // Tab & Input mode
  const [activeTab, setActiveTab] = useState<'SETUP' | 'EDITOR' | 'PREVIEW' | 'GUIDE'>('SETUP');
  const [inputMode, setInputMode] = useState<InputFormatMode>('TABLE');

  // Input Data state
  const [rawText, setRawText] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState<QuestionItem[]>([]);
  const [parseNotice, setParseNotice] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Google Workspace Integration State
  const [isFetchingSheet, setIsFetchingSheet] = useState(false);
  const [driveSpreadsheets, setDriveSpreadsheets] = useState<DriveFileItem[]>([]);
  const [showDrivePicker, setShowDrivePicker] = useState(false);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 1. SMART DUAL-MODE PARSER ENGINE
  // ==========================================

  // Resolve correct option index from diverse key formats
  const resolveCorrectIndex = (
    rawKey: string,
    options: string[]
  ): number => {
    const clean = (rawKey || '').trim().toUpperCase();
    
    // Direct Option letter patterns
    if (clean === 'A' || clean === 'OPTION_A' || clean === 'OPTION A' || clean === '0' || clean === 'OPT A' || clean === 'CHOICE A') return 0;
    if (clean === 'B' || clean === 'OPTION_B' || clean === 'OPTION B' || clean === '1' || clean === 'OPT B' || clean === 'CHOICE B') return 1;
    if (clean === 'C' || clean === 'OPTION_C' || clean === 'OPTION C' || clean === '2' || clean === 'OPT C' || clean === 'CHOICE C') return 2;
    if (clean === 'D' || clean === 'OPTION_D' || clean === 'OPTION D' || clean === '3' || clean === 'OPT D' || clean === 'CHOICE D') return 3;

    // 1-based index (1 -> 0, 2 -> 1, 3 -> 2, 4 -> 3)
    if (clean === '1') return 0;
    if (clean === '2') return 1;
    if (clean === '3') return 2;
    if (clean === '4') return 3;

    // Check textual match against options
    const lowerKey = (rawKey || '').trim().toLowerCase();
    if (lowerKey) {
      for (let i = 0; i < options.length; i++) {
        if (options[i] && options[i].trim().toLowerCase() === lowerKey) {
          return i;
        }
      }
    }

    return 0; // Default to Option A if unspecified
  };

  // Robust Table Parser (TSV from Google Sheets/Excel or CSV)
  const parseTableRows = (text: string): QuestionItem[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length === 0) return [];

    const isTsv = lines[0].includes('\t');
    const rows: string[][] = [];

    lines.forEach(line => {
      if (isTsv) {
        rows.push(line.split('\t').map(c => c.trim()));
      } else {
        // Safe CSV parser
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
        rows.push(row);
      }
    });

    if (rows.length === 0) return [];

    // Analyze first row for headers
    let startIndex = 0;
    let colMap = {
      id: -1,
      subject: -1,
      question: -1,
      optA: -1,
      optB: -1,
      optC: -1,
      optD: -1,
      correct: -1,
      points: -1
    };

    const firstRowNormalized = rows[0].map(c => c.toUpperCase().replace(/[\s_.-]+/g, ''));
    const hasHeader = firstRowNormalized.some(c => 
      c.includes('ID') || 
      c.includes('SUBJECT') || 
      c.includes('QUESTION') || 
      c.includes('OPTION') || 
      c.includes('CORRECT') ||
      c.includes('ANSWER')
    );

    if (hasHeader) {
      startIndex = 1;
      firstRowNormalized.forEach((col, idx) => {
        if (col === 'ID' || col === 'QID' || col === 'SLNO' || col === 'NO') colMap.id = idx;
        else if (col.includes('SUBJECT') || col.includes('CATEGORY') || col.includes('TOPIC')) colMap.subject = idx;
        else if (col.includes('QUESTION') || col.includes('TEXT') || col.includes('STEM')) colMap.question = idx;
        else if (col.includes('OPTIONA') || col === 'OPTA' || col === 'A' || col === 'CHOICEA') colMap.optA = idx;
        else if (col.includes('OPTIONB') || col === 'OPTB' || col === 'B' || col === 'CHOICEB') colMap.optB = idx;
        else if (col.includes('OPTIONC') || col === 'OPTC' || col === 'C' || col === 'CHOICEC') colMap.optC = idx;
        else if (col.includes('OPTIOND') || col === 'OPTD' || col === 'D' || col === 'CHOICED') colMap.optD = idx;
        else if (col.includes('CORRECT') || col.includes('ANSWER') || col.includes('KEY')) colMap.correct = idx;
        else if (col.includes('POINT') || col.includes('MARK')) colMap.points = idx;
      });
    }

    // Fallbacks if columns weren't explicitly named
    const sampleCols = rows[startIndex] ? rows[startIndex].length : 9;
    if (colMap.question === -1) {
      colMap.question = sampleCols >= 8 ? 2 : 0;
    }
    if (colMap.optA === -1) {
      colMap.optA = colMap.question + 1;
      colMap.optB = colMap.question + 2;
      colMap.optC = colMap.question + 3;
      colMap.optD = colMap.question + 4;
    }
    if (colMap.correct === -1) {
      colMap.correct = colMap.optD !== -1 ? colMap.optD + 1 : (sampleCols >= 8 ? 7 : 5);
    }
    if (colMap.points === -1 && sampleCols >= 9) {
      colMap.points = colMap.correct + 1;
    }

    const questions: QuestionItem[] = [];

    for (let i = startIndex; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 3) continue;

      const qText = (row[colMap.question] || '').trim();
      if (!qText) continue;

      const qId = (colMap.id >= 0 && row[colMap.id]) ? row[colMap.id].trim() : `Q${questions.length + 1}`;
      const category = (colMap.subject >= 0 && row[colMap.subject]) ? row[colMap.subject].trim().toUpperCase() : 'GENERAL';
      const optA = (colMap.optA >= 0 && row[colMap.optA]) ? row[colMap.optA].trim() : 'Option A';
      const optB = (colMap.optB >= 0 && row[colMap.optB]) ? row[colMap.optB].trim() : 'Option B';
      const optC = (colMap.optC >= 0 && row[colMap.optC]) ? row[colMap.optC].trim() : 'Option C';
      const optD = (colMap.optD >= 0 && row[colMap.optD]) ? row[colMap.optD].trim() : 'Option D';
      const rawAns = (colMap.correct >= 0 && row[colMap.correct]) ? row[colMap.correct].trim() : 'A';
      const points = (colMap.points >= 0 && parseFloat(row[colMap.points])) ? parseFloat(row[colMap.points]) : 1;

      const options = [optA, optB, optC, optD];
      const correctIdx = resolveCorrectIndex(rawAns, options);

      questions.push({
        id: qId,
        category: category || 'GENERAL',
        text: qText,
        options: [
          { t: optA, o: 0 },
          { t: optB, o: 1 },
          { t: optC, o: 2 },
          { t: optD, o: 3 }
        ],
        correctAnswer: correctIdx,
        points: points || 1
      });
    }

    return questions;
  };

  // Natural Text / Word / Google Docs Formatted Q&A Parser
  const parseDocumentText = (text: string): QuestionItem[] => {
    const questions: QuestionItem[] = [];
    const lines = text.split(/\r?\n/);
    
    let currentCategory = 'GENERAL';
    let currentQ: Partial<QuestionItem> & { rawOptions: string[]; rawAnswer?: string } | null = null;

    const commitCurrent = () => {
      if (currentQ && currentQ.text && currentQ.text.trim()) {
        const opts = currentQ.rawOptions && currentQ.rawOptions.length > 0 ? currentQ.rawOptions : [
          'Option A', 'Option B', 'Option C', 'Option D'
        ];
        
        // Pad to at least 4 options if fewer were provided
        while (opts.length < 4) {
          opts.push(`Option ${String.fromCharCode(65 + opts.length)}`);
        }

        const correctIdx = resolveCorrectIndex(currentQ.rawAnswer || 'A', opts);

        questions.push({
          id: currentQ.id || `Q${questions.length + 1}`,
          category: currentQ.category || currentCategory || 'GENERAL',
          text: currentQ.text.trim(),
          options: opts.slice(0, 4).map((t, idx) => ({ t: t.trim(), o: idx })),
          correctAnswer: correctIdx,
          points: currentQ.points || 1
        });
      }
      currentQ = null;
    };

    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) return;

      // Section or Category Header like: [PHYSICAL SCIENCE] or === Biology === or Section A: Physics
      const catMatch = line.match(/^(?:\[|===|\*\*\*|Section\s+[A-Z]:?)\s*([^\]=*]+)(?:\]|===|\*\*\*)?$/i);
      if (catMatch && catMatch[1] && !line.includes('?') && line.length < 50) {
        currentCategory = catMatch[1].replace(/[:\-]/g, '').trim().toUpperCase();
        return;
      }

      // Check for Question start: "1. ", "1) ", "Q1. ", "Question 1: "
      const qStartMatch = line.match(/^(?:(?:Q|Question)\s*(\d+)[:.]?|(\d+)[\.\)\-\:]\s+)(.*)$/i);
      if (qStartMatch) {
        commitCurrent();
        const num = qStartMatch[1] || qStartMatch[2];
        const textPart = qStartMatch[3] || '';
        
        // Check if marks are embedded e.g. [1 Mark] or (2 Points)
        let pts = 1;
        const markMatch = textPart.match(/\[(\d+)\s*(?:mark|point|m|pt)s?\]|\((\d+)\s*(?:mark|point|m|pt)s?\)/i);
        if (markMatch) {
          pts = parseInt(markMatch[1] || markMatch[2], 10) || 1;
        }

        currentQ = {
          id: `Q${num || questions.length + 1}`,
          category: currentCategory,
          text: textPart.replace(/\[\d+\s*(?:mark|point|m|pt)s?\]|\(\d+\s*(?:mark|point|m|pt)s?\)/gi, '').trim(),
          rawOptions: [],
          points: pts
        };
        return;
      }

      // Check for Option lines: "A) ...", "A. ...", "(A) ...", "a) ..."
      const optMatch = line.match(/^(?:\(?([A-Da-d1-4])\)?[\.\:\-\)]\s*|\s*([A-Da-d])\s*=\s*)(.*)$/);
      if (optMatch && currentQ) {
        const optText = optMatch[3].trim();
        currentQ.rawOptions.push(optText);
        return;
      }

      // Check for Answer key line: "Answer: B", "Ans: B", "Correct: Option_B", "Key: A"
      const ansMatch = line.match(/^(?:Answer|Ans|Correct\s*Answer|Key|Correct\s*Option)[\s\:\-\=]+(.*)$/i);
      if (ansMatch && currentQ) {
        currentQ.rawAnswer = ansMatch[1].trim();
        return;
      }

      // If already inside question and line doesn't match above, append to question text
      if (currentQ && currentQ.rawOptions.length === 0) {
        currentQ.text += ' ' + line;
      }
    });

    commitCurrent();
    return questions;
  };

  // Master auto-parser when raw text changes
  useEffect(() => {
    if (!rawText.trim()) {
      setParsedQuestions([]);
      setParseNotice(null);
      return;
    }

    try {
      // Automatic format detection:
      // If it contains tabs or starts with structured comma-separated tokens, try table parser first
      let qs: QuestionItem[] = [];
      const hasTabs = rawText.includes('\t');
      const lines = rawText.split('\n').filter(l => l.trim().length > 0);
      const isLikelyTable = hasTabs || (lines[0] && lines[0].split(',').length >= 4);

      if (isLikelyTable) {
        qs = parseTableRows(rawText);
      }
      
      // If table parsing yielded 0 questions, fallback to natural doc parser
      if (qs.length === 0) {
        qs = parseDocumentText(rawText);
      }

      setParsedQuestions(qs);

      if (qs.length > 0) {
        setParseNotice({
          type: 'success',
          message: `Successfully parsed ${qs.length} question(s)! Review cards below or click 'Edit in Studio'.`
        });

        // Auto-sync total marks
        if (!isManualMarks) {
          const sumPoints = qs.reduce((acc, q) => acc + (q.points || 1), 0);
          setTotalMarks(sumPoints || qs.length);
        }
      } else {
        setParseNotice({
          type: 'warning',
          message: 'No questions detected. Use the sample buttons above or check formatting guidelines.'
        });
      }
    } catch (err: any) {
      setParseNotice({
        type: 'error',
        message: `Parse error: ${err.message}`
      });
    }
  }, [rawText]);

  // ==========================================
  // 2. ONE-CLICK SAMPLES & TEMPLATES
  // ==========================================

  // Load rich science test paper sample
  const handleLoadSample = (sampleType: 'TABLE' | 'TEXT') => {
    setTitle('Class 10 A - Term 1 Science Mid-Term 2026');
    setSubject('Science (Physical & Biological)');
    setClassSec('10 A');
    setExamMins(10);
    setTotalMarks(6);

    if (sampleType === 'TABLE') {
      setInputMode('TABLE');
      const tableSample = `ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints
1\tPHYSICAL SCIENCE\tWhat is the SI unit of electric potential difference (Voltage)?\tAmpere (A)\tVolt (V)\tOhm (Ω)\tJoule (J)\tOption_B\t1
2\tPHYSICAL SCIENCE\tAccording to Ohm's Law, current flowing through a conductor is:\tInversely proportional to voltage\tDirectly proportional to potential difference\tDirectly proportional to square of resistance\tIndependent of applied voltage\tOption_B\t1
3\tPHYSICAL SCIENCE\tWhich mirror is primarily utilized as a rear-view mirror in automobiles?\tConcave mirror\tPlane mirror\tConvex mirror\tParabolic mirror\tOption_C\t1
4\tBIOLOGICAL SCIENCE\tIn human circulatory physiology, which blood vessel carries oxygenated blood to the left atrium?\tPulmonary artery\tPulmonary vein\tSuperior vena cava\tSystemic aorta\tOption_B\t1
5\tBIOLOGICAL SCIENCE\tThe principal site of complete chemical digestion of carbohydrates and fats in the alimentary canal is:\tStomach\tSmall Intestine (Ileum)\tLarge Intestine\tEsophagus\tOption_B\t1
6\tBIOLOGICAL SCIENCE\tWhich plant phytohormone actively promotes rapid cell division in growing fruits and seeds?\tAbscisic Acid (ABA)\tCytokinin\tGibberellin\tEthylene\tOption_B\t1`;
      setRawText(tableSample);
    } else {
      setInputMode('TEXT');
      const docSample = `[PHYSICAL SCIENCE]
1. What is the SI unit of electric potential difference (Voltage)? [1 Mark]
A) Ampere (A)
B) Volt (V)
C) Ohm (Ω)
D) Joule (J)
Answer: B

2. According to Ohm's Law, current flowing through a conductor is: [1 Mark]
A) Inversely proportional to voltage
B) Directly proportional to potential difference
C) Directly proportional to square of resistance
D) Independent of applied voltage
Answer: B

3. Which mirror is primarily utilized as a rear-view mirror in automobiles? [1 Mark]
A) Concave mirror
B) Plane mirror
C) Convex mirror
D) Parabolic mirror
Answer: C

[BIOLOGICAL SCIENCE]
4. In human circulatory physiology, which blood vessel carries oxygenated blood to the left atrium? [1 Mark]
A) Pulmonary artery
B) Pulmonary vein
C) Superior vena cava
D) Systemic aorta
Answer: B

5. The principal site of complete chemical digestion of carbohydrates and fats in the alimentary canal is: [1 Mark]
A) Stomach
B) Small Intestine (Ileum)
C) Large Intestine
D) Esophagus
Answer: B

6. Which plant phytohormone actively promotes rapid cell division in growing fruits and seeds? [1 Mark]
A) Abscisic Acid (ABA)
B) Cytokinin
C) Gibberellin
D) Ethylene
Answer: B`;
      setRawText(docSample);
    }
  };

  // Download TSV template
  const handleDownloadTemplate = () => {
    const headers = "ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints\n";
    const row1 = "1\tPHYSICAL SCIENCE\tWhat is the SI unit of electric potential difference?\tAmpere\tVolt\tOhm\tJoule\tOption_B\t1\n";
    const row2 = "2\tBIOLOGICAL SCIENCE\tPowerhouse of the eukaryotic animal cell is:\tRibosome\tMitochondria\tLysosome\tGolgi Body\tOption_B\t1\n";
    const content = headers + row1 + row2;

    const blob = new Blob([content], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SPIC_Question_Paper_Template.tsv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file upload (.csv, .tsv, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        if (!title) {
          setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));
        }
      }
    };
    reader.readAsText(file);
  };

  // Google Sheets Fetch
  const handleFetchFromGoogleSheets = async (targetUrl?: string) => {
    const urlToFetch = targetUrl || sheetUrl;
    if (!urlToFetch.trim()) {
      setParseNotice({ type: 'error', message: 'Please enter a valid Google Spreadsheet URL.' });
      return;
    }

    setIsFetchingSheet(true);
    setParseNotice(null);

    try {
      if (!isWorkspaceConnected()) {
        await connectGoogleWorkspace();
      }

      const meta = await fetchSpreadsheetMetadata(urlToFetch.trim());
      if (!meta.sheets.length) {
        throw new Error('No sheets found in this Google Spreadsheet.');
      }

      const firstSheet = meta.sheets[0].title;
      const rows = await fetchSheetValues(meta.id, `${firstSheet}!A1:Z150`);
      const { questions, detectedSubject } = parseSheetRowsToQuestions(rows);

      if (questions.length === 0) {
        throw new Error('No valid questions found in sheet rows. Ensure headers match ID | SUBJECT | Question_Text | Options | Correct_Answer.');
      }

      setParsedQuestions(questions);
      if (!title) {
        setTitle(meta.title.replace(/template/i, '').trim() || `Class ${classSec} - ${detectedSubject || 'Assessment'}`);
      }
      if (detectedSubject) {
        setSubject(detectedSubject);
      }
      setTotalMarks(questions.length);
      setSheetUrl(urlToFetch);
      setActiveTab('EDITOR');
      setParseNotice({ type: 'success', message: `Imported ${questions.length} questions from Google Sheet "${meta.title}"!` });
    } catch (err: any) {
      console.error('Google Sheets fetch error:', err);
      setParseNotice({ type: 'error', message: err.message || 'Failed to read questions from Google Sheets.' });
    } finally {
      setIsFetchingSheet(false);
    }
  };

  const handleOpenDrivePicker = async () => {
    setShowDrivePicker(true);
    setIsLoadingDrive(true);
    try {
      if (!isWorkspaceConnected()) {
        await connectGoogleWorkspace();
      }
      const files = await listGoogleDriveFiles('spreadsheets');
      setDriveSpreadsheets(files);
    } catch (err: any) {
      console.error('Drive listing error:', err);
      setParseNotice({ type: 'error', message: err.message || 'Failed to load Google Drive spreadsheets.' });
    } finally {
      setIsLoadingDrive(false);
    }
  };

  // ==========================================
  // 3. INTERACTIVE QUESTION EDITOR ACTIONS
  // ==========================================

  const handleUpdateQuestionText = (index: number, newText: string) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text: newText };
      return copy;
    });
  };

  const handleUpdateOptionText = (qIndex: number, optIndex: number, newText: string) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIndex];
      const newOpts = [...q.options];
      newOpts[optIndex] = { ...newOpts[optIndex], t: newText };
      copy[qIndex] = { ...q, options: newOpts };
      return copy;
    });
  };

  const handleSetCorrectAnswer = (qIndex: number, optIndex: number) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], correctAnswer: optIndex };
      return copy;
    });
  };

  const handleUpdateCategory = (qIndex: number, newCat: string) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], category: newCat.toUpperCase() };
      return copy;
    });
  };

  const handleUpdatePoints = (qIndex: number, points: number) => {
    setParsedQuestions(prev => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], points: Math.max(1, points) };
      if (!isManualMarks) {
        const sumPoints = copy.reduce((acc, q) => acc + (q.points || 1), 0);
        setTotalMarks(sumPoints);
      }
      return copy;
    });
  };

  const handleDeleteQuestion = (index: number) => {
    setParsedQuestions(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (!isManualMarks) {
        const sumPoints = updated.reduce((acc, q) => acc + (q.points || 1), 0);
        setTotalMarks(sumPoints || updated.length);
      }
      return updated;
    });
  };

  const handleAddQuestionManually = () => {
    const newQ: QuestionItem = {
      id: `Q${parsedQuestions.length + 1}`,
      category: subject.toUpperCase().includes('PHYS') ? 'PHYSICAL SCIENCE' : 'GENERAL',
      text: 'Enter your new multiple choice question here...',
      options: [
        { t: 'First Option', o: 0 },
        { t: 'Second Option', o: 1 },
        { t: 'Third Option', o: 2 },
        { t: 'Fourth Option', o: 3 }
      ],
      correctAnswer: 0,
      points: 1
    };

    setParsedQuestions(prev => {
      const updated = [...prev, newQ];
      if (!isManualMarks) {
        setTotalMarks(updated.reduce((acc, q) => acc + (q.points || 1), 0));
      }
      return updated;
    });

    setActiveTab('EDITOR');
  };

  // ==========================================
  // 4. SUBMIT & DEPLOY EXAM
  // ==========================================

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setParseNotice({ type: 'error', message: 'Please provide an examination title.' });
      setActiveTab('SETUP');
      return;
    }

    if (parsedQuestions.length === 0) {
      setParseNotice({ type: 'error', message: 'Please add or parse question paper data before deploying.' });
      setActiveTab('SETUP');
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
        code: `SPIC-${Math.floor(1000 + Math.random() * 9000)}`,
        title: title.trim(),
        subject: subject.trim(),
        classSec: classSec.trim(),
        allowedTeachers: allowed.length > 0 ? allowed : ['maharajan@spicschool.com', 'teacher.science@spicschool.com'],
        status: 'ACTIVE',
        scoreStatus: 'AUTO',
        examMins: Number(examMins) || 10,
        qCount: parsedQuestions.length,
        totalMarks: Number(totalMarks) || parsedQuestions.length,
        targetUrl: sheetUrl.trim() || 'https://docs.google.com/spreadsheets/d/custom_db/edit',
        questions: parsedQuestions
      };

      await onImportExam(newExam);
      onClose();
    } catch (err: any) {
      setParseNotice({ type: 'error', message: err.message || 'Failed to deploy examination.' });
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden border border-slate-300 flex flex-col max-h-[94vh]">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white px-5 py-4 flex justify-between items-center border-b-4 border-amber-400 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-300 leading-none">
                  Question Paper Studio & Importer
                </h3>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold hidden sm:inline-block">
                  Universal Parser
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-semibold mt-1">
                Import from Google Sheets, Excel, Word Docs, or build questions interactively
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="bg-indigo-900/80 hover:bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs transition cursor-pointer shadow-md"
            title="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guided Step Navigation Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('SETUP')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'SETUP'
                  ? 'bg-indigo-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Exam Setup & Data Source</span>
            </button>

            <span className="text-slate-400">/</span>

            <button
              type="button"
              onClick={() => setActiveTab('EDITOR')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer relative ${
                activeTab === 'EDITOR'
                  ? 'bg-indigo-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>2. Question Editor</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                parsedQuestions.length > 0 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-300 text-slate-700'
              }`}>
                {parsedQuestions.length}
              </span>
            </button>

            <span className="text-slate-400">/</span>

            <button
              type="button"
              onClick={() => setActiveTab('PREVIEW')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'PREVIEW'
                  ? 'bg-indigo-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>3. Student Kiosk Preview</span>
            </button>

            <span className="text-slate-400">/</span>

            <button
              type="button"
              onClick={() => setActiveTab('GUIDE')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'GUIDE'
                  ? 'bg-indigo-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Format Guide</span>
            </button>
          </div>

          {/* Quick status pill */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold">
            <span className="text-slate-500">Target:</span>
            <span className="bg-indigo-100 text-indigo-950 px-2 py-0.5 rounded-lg border border-indigo-200">
              Class {classSec}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              {parsedQuestions.length} Qs ({totalMarks} Marks)
            </span>
          </div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleCreate} className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-700 flex-1">
          
          {/* ==========================================
              TAB 1: SETUP & DATA SOURCE
             ========================================== */}
          {activeTab === 'SETUP' && (
            <div className="space-y-5">
              
              {/* One-Click Quick Fill & Download Bar */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100/60 p-3 sm:p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-amber-950 text-xs sm:text-sm">
                      Need a quick test or clean template?
                    </h4>
                    <p className="text-[11px] text-amber-800 font-medium">
                      Load a ready-to-use 6-question Science paper or download the official template
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleLoadSample('TABLE')}
                    className="bg-indigo-950 hover:bg-indigo-900 text-amber-300 border border-amber-400/50 px-3 py-1.5 rounded-xl text-xs font-black shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto-Fill Science Sample</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadSample('TEXT')}
                    className="bg-white hover:bg-slate-50 text-indigo-950 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-black shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Load Word Text Sample</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download Template</span>
                  </button>
                </div>
              </div>

              {/* Exam Metadata Grid */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  <span>Exam Details & Candidate Assignment</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                      Examination Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Class 10 A - Term 1 Science Mid-Term"
                      className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-bold text-slate-900 focus:border-indigo-600 outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                      Subject / Discipline *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="e.g. Science (Physical & Biological)"
                      className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-bold text-slate-900 focus:border-indigo-600 outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <ClassSectionSelector
                      id="import-target-class-sec"
                      value={classSec}
                      onChange={setClassSec}
                      label="Target Class & Section"
                      helpText="Classes VI-X (Sec A-D) or XI-XII (CS/BIO/CA/BM)"
                    />
                  </div>

                  <div>
                    <label htmlFor="import-exam-mins" className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1 font-bold">
                      Exam Duration (Minutes) *
                    </label>
                    <div className="relative">
                      <input
                        id="import-exam-mins"
                        type="number"
                        min="2"
                        max="180"
                        value={examMins}
                        onChange={e => setExamMins(parseInt(e.target.value) || 10)}
                        className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none pl-8"
                      />
                      <Clock className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="import-total-marks" className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        Total Marks *
                      </label>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {parsedQuestions.length > 0 ? `(${parsedQuestions.length} Qs)` : 'Auto-calculated'}
                      </span>
                    </div>
                    <input
                      id="import-total-marks"
                      type="number"
                      min="1"
                      max="1000"
                      required
                      value={totalMarks}
                      onChange={e => {
                        setTotalMarks(e.target.value);
                        setIsManualMarks(true);
                      }}
                      className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-bold text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="import-teachers-input" className="block text-[11px] uppercase tracking-wider text-slate-500 mb-1 font-bold">
                      Assigned Proctor Emails
                    </label>
                    <input
                      id="import-teachers-input"
                      type="text"
                      value={allowedTeachersInput}
                      onChange={e => setAllowedTeachersInput(e.target.value)}
                      placeholder="maharajan@spicschool.com"
                      className="w-full border-2 border-slate-200 rounded-xl p-2.5 bg-white font-mono text-xs text-slate-900 focus:border-indigo-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Data Import Tabs: Table Paste vs Document Text vs Google Sheets */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-200 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setInputMode('TABLE')}
                      className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                        inputMode === 'TABLE'
                          ? 'bg-white text-indigo-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Table / Spreadsheet (TSV/CSV)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInputMode('TEXT')}
                      className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                        inputMode === 'TEXT'
                          ? 'bg-white text-indigo-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Word / Formatted Text Q&A</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInputMode('DRIVE')}
                      className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                        inputMode === 'DRIVE'
                          ? 'bg-white text-indigo-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>Google Sheets & Drive</span>
                    </button>
                  </div>

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
                      className="text-xs text-indigo-800 hover:text-indigo-950 font-bold flex items-center gap-1.5 cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 transition shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Upload .CSV / .TSV / .TXT</span>
                    </button>
                  </div>
                </div>

                {/* MODE 1 & 2: PASTE BOX */}
                {(inputMode === 'TABLE' || inputMode === 'TEXT') && (
                  <div className="space-y-2">
                    <div className="relative">
                      <textarea
                        rows={8}
                        value={rawText}
                        onChange={e => setRawText(e.target.value)}
                        placeholder={
                          inputMode === 'TABLE'
                            ? `ID\tSUBJECT\tQuestion_Text\tOption_A\tOption_B\tOption_C\tOption_D\tCorrect_Answer\tPoints\n1\tPHYSICAL SCIENCE\tWhat is the SI unit of voltage?\tAmpere\tVolt\tOhm\tJoule\tOption_B\t1\n2\tBIOLOGICAL SCIENCE\tPowerhouse of the cell is:\tRibosome\tMitochondria\tLysosome\tGolgi\tOption_B\t1`
                            : `1. What is the SI unit of electric potential difference (Voltage)?\nA) Ampere (A)\nB) Volt (V)\nC) Ohm (Ω)\nD) Joule (J)\nAnswer: B\n\n2. Powerhouse of the eukaryotic animal cell is:\nA) Ribosome\nB) Mitochondria\nC) Lysosome\nD) Golgi Body\nAnswer: B`
                        }
                        className="w-full border-2 border-slate-300 rounded-2xl p-3.5 bg-slate-50 font-mono text-xs text-slate-900 focus:border-indigo-600 focus:bg-white outline-none leading-relaxed transition shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <p className="text-slate-500 font-medium">
                        {inputMode === 'TABLE' ? (
                          <span>💡 <strong>Tip:</strong> Copy your table in Google Sheets or Excel, then press <code>Ctrl+V</code> directly here.</span>
                        ) : (
                          <span>💡 <strong>Tip:</strong> Copy questions straight from a Word or PDF file with <code>1. Question</code>, options <code>A), B), C), D)</code>, and <code>Answer: B</code>.</span>
                        )}
                      </p>

                      {parsedQuestions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab('EDITOR')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1.5 transition shadow-2xs cursor-pointer shrink-0"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Review & Edit {parsedQuestions.length} Questions →</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* MODE 3: GOOGLE SHEETS & DRIVE DIRECT INTEGRATION */}
                {inputMode === 'DRIVE' && (
                  <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                            Connect Direct Google Sheet
                          </h4>
                          <p className="text-[11px] text-emerald-800">
                            Provide your Google Sheets URL or select an existing sheet from Google Drive
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenDrivePicker}
                        className="bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer self-start sm:self-auto"
                      >
                        <HardDrive className="w-4 h-4 text-emerald-700" />
                        <span>Browse Google Drive</span>
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={sheetUrl}
                        onChange={e => setSheetUrl(e.target.value)}
                        placeholder="https://docs.google.com/spreadsheets/d/your_sheet_id/edit"
                        className="flex-1 border-2 border-emerald-300 rounded-xl p-2.5 bg-white font-mono text-xs text-slate-800 focus:border-emerald-600 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleFetchFromGoogleSheets()}
                        disabled={isFetchingSheet}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isFetchingSheet ? 'animate-spin' : ''}`} />
                        <span>{isFetchingSheet ? 'Reading Sheet...' : 'Fetch Questions'}</span>
                      </button>
                    </div>

                    {/* Drive Picker Dropdown */}
                    {showDrivePicker && (
                      <div className="bg-white border border-emerald-300 rounded-xl p-3 shadow-md space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Select a Spreadsheet from your Google Drive:</span>
                          <button
                            type="button"
                            onClick={() => setShowDrivePicker(false)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {isLoadingDrive ? (
                          <p className="text-xs text-slate-500 py-3 flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                            <span>Connecting and scanning Google Drive files...</span>
                          </p>
                        ) : driveSpreadsheets.length === 0 ? (
                          <p className="text-xs text-slate-500 py-2">
                            No spreadsheets found in Drive root. You can paste a direct Google Sheets URL above.
                          </p>
                        ) : (
                          <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 text-xs">
                            {driveSpreadsheets.map(file => (
                              <div
                                key={file.id}
                                onClick={() => {
                                  const url = `https://docs.google.com/spreadsheets/d/${file.id}/edit`;
                                  setSheetUrl(url);
                                  setShowDrivePicker(false);
                                  handleFetchFromGoogleSheets(url);
                                }}
                                className="p-2.5 hover:bg-emerald-50 flex items-center justify-between cursor-pointer rounded-lg transition"
                              >
                                <span className="font-bold text-slate-800 truncate">{file.name}</span>
                                <span className="text-[11px] text-emerald-700 font-bold shrink-0 ml-2">Select & Read →</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status Notice */}
              {parseNotice && (
                <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 ${
                  parseNotice.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                    : parseNotice.type === 'warning'
                    ? 'bg-amber-50 text-amber-900 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {parseNotice.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {parseNotice.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />}
                    {parseNotice.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    <span>{parseNotice.message}</span>
                  </div>

                  {parseNotice.type === 'success' && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('EDITOR')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-xl text-xs font-black transition shrink-0 cursor-pointer"
                    >
                      Open Editor
                    </button>
                  )}
                </div>
              )}

              {/* Quick Navigation Footer for Step 1 */}
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-500 font-medium">
                  {parsedQuestions.length > 0 ? (
                    <span className="text-emerald-700 font-bold">
                      ✓ {parsedQuestions.length} Questions ready for Class {classSec}
                    </span>
                  ) : (
                    <span>Add questions above to proceed</span>
                  )}
                </span>

                <button
                  type="button"
                  onClick={() => setActiveTab('EDITOR')}
                  className="bg-indigo-950 hover:bg-indigo-900 text-amber-300 px-5 py-2 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Step 2: Review & Edit Questions</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ==========================================
              TAB 2: QUESTION EDITOR & VALIDATION
             ========================================== */}
          {activeTab === 'EDITOR' && (
            <div className="space-y-4">
              
              {/* Studio Header Bar */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 text-amber-300 flex items-center justify-center font-black">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">
                      Question Editor Studio ({parsedQuestions.length} Total)
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Click any option letter (A/B/C/D) to select the correct answer key. Edit text inline.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddQuestionManually}
                    className="bg-indigo-950 hover:bg-indigo-900 text-amber-300 border border-amber-400/50 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-2xs transition flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Question</span>
                  </button>
                </div>
              </div>

              {/* Subject Breakdown Badges */}
              {Object.keys(categorySummary).length > 0 && (
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="font-bold text-slate-500 uppercase">Categories:</span>
                  {Object.entries(categorySummary).map(([cat, count]) => (
                    <span 
                      key={cat} 
                      className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-2.5 py-0.5 rounded-lg font-bold font-mono"
                    >
                      {cat}: {count} Qs
                    </span>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {parsedQuestions.length === 0 ? (
                <div className="p-10 text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl space-y-3">
                  <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-slate-600 font-bold text-sm">
                    No questions in this paper yet!
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Return to Step 1 to paste your spreadsheet or document questions, or click below to build one manually.
                  </p>
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSample('TABLE')}
                      className="bg-indigo-950 text-amber-300 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                    >
                      Load Sample Science Paper
                    </button>
                    <button
                      type="button"
                      onClick={handleAddQuestionManually}
                      className="bg-white border border-slate-300 text-slate-800 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                    >
                      + Add Question Manually
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Question Cards */
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {parsedQuestions.map((q, qIdx) => {
                    const isAnswerSelected = q.correctAnswer !== undefined && q.correctAnswer >= 0 && q.correctAnswer < 4;
                    return (
                      <div 
                        key={q.id + qIdx} 
                        className={`bg-white rounded-2xl p-4 sm:p-5 border-2 transition shadow-xs ${
                          !isAnswerSelected 
                            ? 'border-amber-400 bg-amber-50/20' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Card Top Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="bg-indigo-950 text-amber-300 px-2.5 py-0.5 rounded-lg text-xs font-black font-mono">
                              #{qIdx + 1} ({q.id})
                            </span>
                            
                            {/* Inline Category Editor */}
                            <input
                              type="text"
                              value={q.category}
                              onChange={e => handleUpdateCategory(qIdx, e.target.value)}
                              placeholder="CATEGORY (e.g. PHYSICAL SCIENCE)"
                              className="bg-slate-100 hover:bg-slate-200 focus:bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-wider outline-none focus:border-indigo-600 transition"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold">
                              <span>Points:</span>
                              <input
                                type="number"
                                min="1"
                                max="20"
                                value={q.points || 1}
                                onChange={e => handleUpdatePoints(qIdx, parseInt(e.target.value) || 1)}
                                className="w-12 bg-slate-100 border border-slate-200 rounded-md px-1.5 py-0.5 text-center font-bold text-slate-900 outline-none focus:border-indigo-600"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(qIdx)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Question Text Textarea */}
                        <div className="mb-3">
                          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                            Question Stem / Text
                          </label>
                          <textarea
                            rows={2}
                            value={q.text}
                            onChange={e => handleUpdateQuestionText(qIdx, e.target.value)}
                            placeholder="Type question stem..."
                            className="w-full border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:border-indigo-600 outline-none leading-relaxed transition"
                          />
                        </div>

                        {/* Interactive Options A-D Grid */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                            <span>Select the Radio Button to designate the Correct Answer Key:</span>
                            {!isAnswerSelected && (
                              <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
                                ⚠️ Missing Answer Key - Please click an option
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = q.correctAnswer === optIdx;
                              const letter = String.fromCharCode(65 + optIdx);
                              return (
                                <div
                                  key={optIdx}
                                  onClick={() => handleSetCorrectAnswer(qIdx, optIdx)}
                                  className={`p-2.5 rounded-xl border-2 transition flex items-center gap-2.5 cursor-pointer ${
                                    isCorrect
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs'
                                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                                  }`}
                                >
                                  {/* Radio indicator */}
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition ${
                                    isCorrect 
                                      ? 'bg-emerald-600 text-white shadow-xs' 
                                      : 'bg-white border-2 border-slate-300 text-slate-600'
                                  }`}>
                                    {letter}
                                  </div>

                                  {/* Option text input */}
                                  <input
                                    type="text"
                                    value={opt.t}
                                    onChange={e => {
                                      e.stopPropagation();
                                      handleUpdateOptionText(qIdx, optIdx, e.target.value);
                                    }}
                                    onClick={e => e.stopPropagation()}
                                    placeholder={`Option ${letter}`}
                                    className={`flex-1 bg-transparent text-xs font-bold outline-none ${
                                      isCorrect ? 'text-emerald-950' : 'text-slate-800'
                                    }`}
                                  />

                                  {/* Correct Key Badge */}
                                  {isCorrect && (
                                    <span className="text-[10px] uppercase font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1 border border-emerald-200">
                                      <Check className="w-3 h-3 text-emerald-700" />
                                      <span>KEY</span>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Add & Navigation Row */}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('SETUP')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer text-xs"
                >
                  ← Back to Setup
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddQuestionManually}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 rounded-xl font-bold transition cursor-pointer text-xs border border-indigo-200"
                  >
                    + Add Another Question
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('PREVIEW')}
                    className="px-5 py-2 bg-indigo-950 hover:bg-indigo-900 text-amber-300 rounded-xl font-black transition flex items-center gap-1.5 shadow-md cursor-pointer text-xs"
                  >
                    <span>Preview Student Kiosk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ==========================================
              TAB 3: STUDENT KIOSK PREVIEW
             ========================================== */}
          {activeTab === 'PREVIEW' && (
            <div className="space-y-4">
              <div className="bg-indigo-950 text-white p-4 rounded-2xl flex flex-wrap justify-between items-center gap-3 border-2 border-amber-400 shadow-md">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                    Live Student View Simulation
                  </span>
                  <h4 className="font-black text-white text-base mt-1">
                    {title || 'Untitled Assessment Paper'} ({classSec})
                  </h4>
                  <p className="text-xs text-indigo-200 font-semibold">
                    {subject} • Duration: {examMins} Mins • Total Questions: {parsedQuestions.length} • Total Marks: {totalMarks}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-slate-900/90 border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl font-mono text-xs font-black flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{examMins}:00 REMAINING</span>
                  </div>
                </div>
              </div>

              {parsedQuestions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold">
                  No questions available to preview. Return to Step 1 or Step 2 to add questions.
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {parsedQuestions.map((q, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-900 text-amber-300 px-2.5 py-0.5 rounded-lg text-xs font-black font-mono">
                            Question {idx + 1}
                          </span>
                          <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">
                            {q.category}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          {q.points || 1} Mark(s)
                        </span>
                      </div>

                      <p className="font-bold text-slate-900 text-sm mb-4 leading-relaxed">
                        {q.text}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctAnswer === optIdx;
                          const letter = String.fromCharCode(65 + optIdx);
                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-between transition ${
                                isCorrect
                                  ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-black'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {letter}
                                </span>
                                <span>{opt.t}</span>
                              </div>

                              {isCorrect && (
                                <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                                  KEY ✓
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

          {/* ==========================================
              TAB 4: FORMATTING GUIDE & HELP
             ========================================== */}
          {activeTab === 'GUIDE' && (
            <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                <BookOpen className="w-5 h-5 text-indigo-700" />
                <span>SPIC Universal Question Importer Guide</span>
              </div>

              <p className="text-slate-600 leading-relaxed font-normal">
                You can import questions using any of the two popular formats:
              </p>

              {/* Format 1: Spreadsheet Table */}
              <div className="bg-white border border-slate-300 rounded-xl p-3.5 space-y-2">
                <h5 className="font-black text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                  <span>Format A: Spreadsheet Table Columns (Google Sheets / Excel)</span>
                </h5>
                <p className="text-slate-600 text-[11px]">
                  Copy table rows directly into the paste box. Headers are auto-mapped:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-slate-200 text-[11px]">
                    <thead>
                      <tr className="bg-indigo-950 text-amber-300 font-mono">
                        <th className="p-2 border border-slate-300">Column Header</th>
                        <th className="p-2 border border-slate-300">Description</th>
                        <th className="p-2 border border-slate-300">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                      <tr>
                        <td className="p-2 font-mono font-bold text-indigo-700">ID</td>
                        <td className="p-2">Question ID / Sl No</td>
                        <td className="p-2 font-mono">1, 2, Q101</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-indigo-700">SUBJECT</td>
                        <td className="p-2">Category / Syllabus discipline</td>
                        <td className="p-2 font-mono">PHYSICAL SCIENCE</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-indigo-700">Question_Text</td>
                        <td className="p-2">The question prompt / stem</td>
                        <td className="p-2">What is the SI unit of voltage?</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-indigo-700">Option_A to Option_D</td>
                        <td className="p-2">Four multiple choice options</td>
                        <td className="p-2">Ampere, Volt, Ohm, Joule</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-emerald-700">Correct_Answer</td>
                        <td className="p-2">Key letter or exact option text</td>
                        <td className="p-2 font-mono text-emerald-800">Option_B, B, or Volt</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-indigo-700">Points</td>
                        <td className="p-2">Marks weightage (default 1)</td>
                        <td className="p-2 font-mono">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Format 2: Natural Text Document */}
              <div className="bg-white border border-slate-300 rounded-xl p-3.5 space-y-2">
                <h5 className="font-black text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Format B: Standard Word / PDF Question Paper Text</span>
                </h5>
                <p className="text-slate-600 text-[11px]">
                  Copy-paste directly from Microsoft Word, PDF, or Google Docs without table conversion:
                </p>
                <pre className="bg-slate-100 p-3 rounded-lg font-mono text-[11px] text-slate-800 leading-relaxed overflow-x-auto border border-slate-200">
{`1. What is the SI unit of electric potential difference (Voltage)?
A) Ampere (A)
B) Volt (V)
C) Ohm (Ω)
D) Joule (J)
Answer: B

2. Which blood vessel carries oxygenated blood to the left atrium?
A) Pulmonary artery
B) Pulmonary vein
C) Superior vena cava
D) Systemic aorta
Answer: B`}
                </pre>
              </div>
            </div>
          )}

          {/* Sticky Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
            <div className="text-xs text-slate-600 font-bold flex items-center gap-2">
              {parsedQuestions.length > 0 ? (
                <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ready to deploy {parsedQuestions.length} Questions ({totalMarks} Marks) to Class {classSec}</span>
                </span>
              ) : (
                <span className="text-slate-500">
                  ⚠️ No questions added yet. Use Step 1 or auto-fill a sample.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || parsedQuestions.length === 0}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-950 to-indigo-900 hover:from-indigo-900 hover:to-indigo-800 text-amber-300 rounded-xl font-black transition flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 text-xs border border-amber-400/40"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Deploying Exam Paper...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Deploy Exam to Active Kiosk</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
