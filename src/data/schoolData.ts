// SPIC Nagar Higher Secondary School - School Data & Completed Exams
// Auto-generated from official school rosters and completed exam sheets

import { StudentRecord, TeacherRecord, ExamDocument, QuestionItem } from '../types';

export interface SchoolStudent {
  admissionNo: string;
  name: string;
  gender: string;
  dob: string;
  classLevel: string;
  section: string;
  classSec: string;
  examNumber: string;
  password: string;
}

export interface SchoolTeacher {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'admin';
  department: string;
  classes: string[];
}

export interface SchoolExam {
  id: string;
  code: string;
  title: string;
  subject: string;
  classSec: string;
  allowedTeachers: string[];
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  scoreStatus: 'RELEASED' | 'AUTO' | 'PENDING';
  examMins: number;
  qCount: number;
  totalMarks: number;
  targetUrl: string;
  questions: Array<{
    id: string;
    category: string;
    text: string;
    options: Array<{ t: string; o: number }>;
    points: number;
  }>;
}

export const SCHOOL_STUDENTS: SchoolStudent[] = [
  {
    "admissionNo": "P22162",
    "name": "ABINAYASRI M",
    "gender": "Female",
    "dob": "12/07/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6105",
    "password": "12/07/2015"
  },
  {
    "admissionNo": "P24096",
    "name": "AKSHITHA S",
    "gender": "Female",
    "dob": "19/05/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6106",
    "password": "19/05/2015"
  },
  {
    "admissionNo": "P19066",
    "name": "HARSHINI K",
    "gender": "Female",
    "dob": "12/08/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6107",
    "password": "12/08/2015"
  },
  {
    "admissionNo": "P25041",
    "name": "INDHUMATHI I",
    "gender": "Female",
    "dob": "05/05/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6108",
    "password": "05/05/2016"
  },
  {
    "admissionNo": "26640",
    "name": "JERFIKA J",
    "gender": "Female",
    "dob": "17/11/2014",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6109",
    "password": "17/11/2014"
  },
  {
    "admissionNo": "26639",
    "name": "JERISHA J",
    "gender": "Female",
    "dob": "17/11/2014",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6110",
    "password": "17/11/2014"
  },
  {
    "admissionNo": "P19044",
    "name": "JULIYA REEFA I",
    "gender": "Female",
    "dob": "29/05/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6111",
    "password": "29/05/2015"
  },
  {
    "admissionNo": "P19054",
    "name": "KARTHIKA B",
    "gender": "Female",
    "dob": "05/01/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6112",
    "password": "05/01/2015"
  },
  {
    "admissionNo": "P19142",
    "name": "KARTHIKEYANI M",
    "gender": "Female",
    "dob": "20/10/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6113",
    "password": "20/10/2015"
  },
  {
    "admissionNo": "26612",
    "name": "LINCY D",
    "gender": "Female",
    "dob": "26/09/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6101",
    "password": "26/09/2015"
  },
  {
    "admissionNo": "P19078",
    "name": "MAHALAKSHMI M",
    "gender": "Female",
    "dob": "05/01/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6114",
    "password": "05/01/2016"
  },
  {
    "admissionNo": "P19137",
    "name": "MAHASRI L",
    "gender": "Female",
    "dob": "09/12/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6115",
    "password": "09/12/2015"
  },
  {
    "admissionNo": "26620",
    "name": "PAVITHRAKAMATCHI M",
    "gender": "Female",
    "dob": "18/01/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6130",
    "password": "18/01/2015"
  },
  {
    "admissionNo": "P19036",
    "name": "PRANAYA R",
    "gender": "Female",
    "dob": "16/05/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6116",
    "password": "16/05/2016"
  },
  {
    "admissionNo": "26603",
    "name": "RAHINI P",
    "gender": "Female",
    "dob": "07/07/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6102",
    "password": "07/07/2015"
  },
  {
    "admissionNo": "P19131",
    "name": "RAKSHITHA M",
    "gender": "Female",
    "dob": "21/09/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6117",
    "password": "21/09/2015"
  },
  {
    "admissionNo": "P23074",
    "name": "RIYA TENISHA P R",
    "gender": "Female",
    "dob": "05/02/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6118",
    "password": "05/02/2016"
  },
  {
    "admissionNo": "P19015",
    "name": "SAMYUKTA JERUSHA M S",
    "gender": "Female",
    "dob": "17/04/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6119",
    "password": "17/04/2015"
  },
  {
    "admissionNo": "P21112",
    "name": "SAYANTHIKA B",
    "gender": "Female",
    "dob": "07/09/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6120",
    "password": "07/09/2015"
  },
  {
    "admissionNo": "P19105",
    "name": "SHRI VAISHNAVEE S",
    "gender": "Female",
    "dob": "31/05/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6121",
    "password": "31/05/2016"
  },
  {
    "admissionNo": "P19136",
    "name": "SIVANI S",
    "gender": "Female",
    "dob": "04/05/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6122",
    "password": "04/05/2016"
  },
  {
    "admissionNo": "P19118",
    "name": "SRI ANJANAA R",
    "gender": "Female",
    "dob": "26/06/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6123",
    "password": "26/06/2015"
  },
  {
    "admissionNo": "26609",
    "name": "SUBASHINI N P",
    "gender": "Female",
    "dob": "13/08/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6103",
    "password": "13/08/2015"
  },
  {
    "admissionNo": "P19038",
    "name": "ANANDA PRAVITH R",
    "gender": "Male",
    "dob": "19/08/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6124",
    "password": "19/08/2015"
  },
  {
    "admissionNo": "P19011",
    "name": "HANISH FREGIN M",
    "gender": "Male",
    "dob": "03/11/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6125",
    "password": "03/11/2015"
  },
  {
    "admissionNo": "26645",
    "name": "LAKSHAN M",
    "gender": "Male",
    "dob": "10/07/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6126",
    "password": "10/07/2015"
  },
  {
    "admissionNo": "P19104",
    "name": "LUBIN T",
    "gender": "Male",
    "dob": "16/04/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6127",
    "password": "16/04/2015"
  },
  {
    "admissionNo": "P21113",
    "name": "MITHRESH VARUN J",
    "gender": "Male",
    "dob": "22/02/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6128",
    "password": "22/02/2016"
  },
  {
    "admissionNo": "P23109",
    "name": "MOHAMED FAIZAL M",
    "gender": "Male",
    "dob": "20/06/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6129",
    "password": "20/06/2015"
  },
  {
    "admissionNo": "P23098",
    "name": "PRAJISH S",
    "gender": "Male",
    "dob": "07/09/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6131",
    "password": "07/09/2015"
  },
  {
    "admissionNo": "P19070",
    "name": "PRAVEEN KUMAR M",
    "gender": "Male",
    "dob": "23/09/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6132",
    "password": "23/09/2015"
  },
  {
    "admissionNo": "26628",
    "name": "PRITHISH P",
    "gender": "Male",
    "dob": "04/03/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6133",
    "password": "04/03/2016"
  },
  {
    "admissionNo": "P19051",
    "name": "SAJIV B",
    "gender": "Male",
    "dob": "16/01/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6134",
    "password": "16/01/2016"
  },
  {
    "admissionNo": "26617",
    "name": "SAMRUTHVEL S",
    "gender": "Male",
    "dob": "31/10/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6135",
    "password": "31/10/2015"
  },
  {
    "admissionNo": "P19001",
    "name": "SARAVANA KARTHICK S",
    "gender": "Male",
    "dob": "19/05/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6136",
    "password": "19/05/2016"
  },
  {
    "admissionNo": "P25012",
    "name": "SIVA KARTHIKEYAN V",
    "gender": "Male",
    "dob": "01/12/2014",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6137",
    "password": "01/12/2014"
  },
  {
    "admissionNo": "26601",
    "name": "SIVASEMBIAN T",
    "gender": "Male",
    "dob": "02/01/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6138",
    "password": "02/01/2016"
  },
  {
    "admissionNo": "P19050",
    "name": "SIVASURIYAKUMARAN V",
    "gender": "Male",
    "dob": "21/04/2016",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6139",
    "password": "21/04/2016"
  },
  {
    "admissionNo": "P19005",
    "name": "VIJAYA KRISHNA K",
    "gender": "Male",
    "dob": "08/08/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6140",
    "password": "08/08/2015"
  },
  {
    "admissionNo": "26615",
    "name": "YASVANTH R",
    "gender": "Male",
    "dob": "17/10/2015",
    "classLevel": "VI",
    "section": "A",
    "classSec": "VI A",
    "examNumber": "6104",
    "password": "17/10/2015"
  },
  {
    "admissionNo": "P22161",
    "name": "ABINAYA DESAI M",
    "gender": "Female",
    "dob": "15/05/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6203",
    "password": "15/05/2015"
  },
  {
    "admissionNo": "26607",
    "name": "AMIRTHAVARSHINI S",
    "gender": "Female",
    "dob": "24/07/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6201",
    "password": "24/07/2016"
  },
  {
    "admissionNo": "P19018",
    "name": "ANUSREE K",
    "gender": "Female",
    "dob": "07/04/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6204",
    "password": "07/04/2016"
  },
  {
    "admissionNo": "P19004",
    "name": "HEAVENCY D",
    "gender": "Female",
    "dob": "15/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6205",
    "password": "15/08/2015"
  },
  {
    "admissionNo": "P19034",
    "name": "JANANI MUTHU SRI G",
    "gender": "Female",
    "dob": "05/07/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6206",
    "password": "05/07/2015"
  },
  {
    "admissionNo": "P19009",
    "name": "JESSICA A",
    "gender": "Female",
    "dob": "27/11/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6207",
    "password": "27/11/2015"
  },
  {
    "admissionNo": "26618",
    "name": "JESSICA AYANA M",
    "gender": "Female",
    "dob": "26/09/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6208",
    "password": "26/09/2015"
  },
  {
    "admissionNo": "26633",
    "name": "KANNIYAMMAL S",
    "gender": "Female",
    "dob": "15/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6209",
    "password": "15/08/2015"
  },
  {
    "admissionNo": "P19014",
    "name": "KATHERINE SWEETLEY P",
    "gender": "Female",
    "dob": "10/06/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6210",
    "password": "10/06/2015"
  },
  {
    "admissionNo": "P22159",
    "name": "LAKHTHIYA SHRI V",
    "gender": "Female",
    "dob": "14/02/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6211",
    "password": "14/02/2016"
  },
  {
    "admissionNo": "P19053",
    "name": "LOCHANA MALA B",
    "gender": "Female",
    "dob": "18/01/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6212",
    "password": "18/01/2016"
  },
  {
    "admissionNo": "P19016",
    "name": "MADHU SRI M",
    "gender": "Female",
    "dob": "12/11/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6213",
    "password": "12/11/2015"
  },
  {
    "admissionNo": "P23099",
    "name": "MADHUMITHA S",
    "gender": "Female",
    "dob": "08/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6214",
    "password": "08/08/2015"
  },
  {
    "admissionNo": "26604",
    "name": "MATHUSRI V",
    "gender": "Female",
    "dob": "08/07/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6202",
    "password": "08/07/2016"
  },
  {
    "admissionNo": "P19055",
    "name": "MUHSINA NAAFIA A",
    "gender": "Female",
    "dob": "04/07/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6215",
    "password": "04/07/2015"
  },
  {
    "admissionNo": "26621",
    "name": "NIROSHANA M",
    "gender": "Female",
    "dob": "29/06/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6216",
    "password": "29/06/2015"
  },
  {
    "admissionNo": "P19075",
    "name": "OVIYA S",
    "gender": "Female",
    "dob": "28/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6217",
    "password": "28/08/2015"
  },
  {
    "admissionNo": "P19138",
    "name": "RAKSHANA K",
    "gender": "Female",
    "dob": "19/05/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6218",
    "password": "19/05/2016"
  },
  {
    "admissionNo": "P25042",
    "name": "SAJANI S",
    "gender": "Female",
    "dob": "26/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6219",
    "password": "26/10/2015"
  },
  {
    "admissionNo": "P19123",
    "name": "SIVADHARSHINI S",
    "gender": "Female",
    "dob": "21/02/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6220",
    "password": "21/02/2016"
  },
  {
    "admissionNo": "26626",
    "name": "THIRUMANI E",
    "gender": "Female",
    "dob": "29/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6221",
    "password": "29/10/2015"
  },
  {
    "admissionNo": "P19074",
    "name": "VARALAKSHMI V",
    "gender": "Female",
    "dob": "03/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6222",
    "password": "03/10/2015"
  },
  {
    "admissionNo": "P20060",
    "name": "YAAMINI S",
    "gender": "Female",
    "dob": "04/02/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6223",
    "password": "04/02/2016"
  },
  {
    "admissionNo": "P19043",
    "name": "ALSTON JOEL B",
    "gender": "Male",
    "dob": "09/12/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6224",
    "password": "09/12/2015"
  },
  {
    "admissionNo": "26613",
    "name": "ANDERSON V",
    "gender": "Male",
    "dob": "11/06/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6225",
    "password": "11/06/2016"
  },
  {
    "admissionNo": "P19124",
    "name": "CALIX ANTONY GERALD C",
    "gender": "Male",
    "dob": "10/02/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6226",
    "password": "10/02/2016"
  },
  {
    "admissionNo": "P19035",
    "name": "DASHWIN S",
    "gender": "Male",
    "dob": "03/11/2014",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6227",
    "password": "03/11/2014"
  },
  {
    "admissionNo": "P19013",
    "name": "JASWIN SAMUEL S",
    "gender": "Male",
    "dob": "29/06/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6228",
    "password": "29/06/2015"
  },
  {
    "admissionNo": "P19128",
    "name": "JEBIN PAUL L",
    "gender": "Male",
    "dob": "10/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6229",
    "password": "10/10/2015"
  },
  {
    "admissionNo": "26637",
    "name": "JEYA PON JOSHUA J",
    "gender": "Male",
    "dob": "18/02/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6230",
    "password": "18/02/2016"
  },
  {
    "admissionNo": "P19101",
    "name": "KIRTHICK RANJAN R",
    "gender": "Male",
    "dob": "02/04/2016",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6231",
    "password": "02/04/2016"
  },
  {
    "admissionNo": "P19006",
    "name": "MANOJ M",
    "gender": "Male",
    "dob": "08/07/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6232",
    "password": "08/07/2015"
  },
  {
    "admissionNo": "26631",
    "name": "MUKESH B",
    "gender": "Male",
    "dob": "09/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6233",
    "password": "09/10/2015"
  },
  {
    "admissionNo": "P25040",
    "name": "NAVINKARTHICK P S",
    "gender": "Male",
    "dob": "09/07/2014",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6234",
    "password": "09/07/2014"
  },
  {
    "admissionNo": "P25010",
    "name": "PRATYUSH K",
    "gender": "Male",
    "dob": "19/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6235",
    "password": "19/10/2015"
  },
  {
    "admissionNo": "P25011",
    "name": "SAKTHI KATHIRVEL C",
    "gender": "Male",
    "dob": "27/11/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6236",
    "password": "27/11/2015"
  },
  {
    "admissionNo": "26644",
    "name": "SANJITH S",
    "gender": "Male",
    "dob": "26/10/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6237",
    "password": "26/10/2015"
  },
  {
    "admissionNo": "P19028",
    "name": "SENDHAN S",
    "gender": "Male",
    "dob": "04/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6238",
    "password": "04/08/2015"
  },
  {
    "admissionNo": "P19107",
    "name": "SUJAY SUBRAMANIAN M",
    "gender": "Male",
    "dob": "05/08/2015",
    "classLevel": "VI",
    "section": "B",
    "classSec": "VI B",
    "examNumber": "6239",
    "password": "05/08/2015"
  },
  {
    "admissionNo": "P19106",
    "name": "AKSHAYINEY P",
    "gender": "Female",
    "dob": "14/03/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6306",
    "password": "14/03/2016"
  },
  {
    "admissionNo": "P19067",
    "name": "BHUVISHYA R S",
    "gender": "Female",
    "dob": "17/05/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6307",
    "password": "17/05/2016"
  },
  {
    "admissionNo": "P23073",
    "name": "ESHA SANKARI K",
    "gender": "Female",
    "dob": "31/05/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6308",
    "password": "31/05/2015"
  },
  {
    "admissionNo": "P25039",
    "name": "GANIESHGKA M",
    "gender": "Female",
    "dob": "20/05/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6309",
    "password": "20/05/2015"
  },
  {
    "admissionNo": "P25048",
    "name": "JENISHA Y",
    "gender": "Female",
    "dob": "21/07/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6310",
    "password": "21/07/2016"
  },
  {
    "admissionNo": "26627",
    "name": "JISHA SERAPHINE J",
    "gender": "Female",
    "dob": "20/02/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6311",
    "password": "20/02/2016"
  },
  {
    "admissionNo": "P19003",
    "name": "JOE RELFIA FERNANDO R",
    "gender": "Female",
    "dob": "04/12/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6312",
    "password": "04/12/2015"
  },
  {
    "admissionNo": "P19049",
    "name": "KATE DANITTA J",
    "gender": "Female",
    "dob": "04/07/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6313",
    "password": "04/07/2015"
  },
  {
    "admissionNo": "P19010",
    "name": "LAKSHANA M",
    "gender": "Female",
    "dob": "06/05/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6314",
    "password": "06/05/2016"
  },
  {
    "admissionNo": "26608",
    "name": "MABIKSHA M",
    "gender": "Female",
    "dob": "27/04/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6301",
    "password": "27/04/2016"
  },
  {
    "admissionNo": "P21125",
    "name": "MADHU NISHA M",
    "gender": "Female",
    "dob": "17/04/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6315",
    "password": "17/04/2016"
  },
  {
    "admissionNo": "P19089",
    "name": "MADHUMITHA M",
    "gender": "Female",
    "dob": "15/09/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6316",
    "password": "15/09/2015"
  },
  {
    "admissionNo": "P19017",
    "name": "MUTHU KEERTHANA S",
    "gender": "Female",
    "dob": "21/10/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6317",
    "password": "21/10/2015"
  },
  {
    "admissionNo": "P24139",
    "name": "NIRALYA KRISHNA",
    "gender": "Female",
    "dob": "08/10/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6318",
    "password": "08/10/2015"
  },
  {
    "admissionNo": "26605",
    "name": "PADMA PRIYA U",
    "gender": "Female",
    "dob": "03/10/2014",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6302",
    "password": "03/10/2014"
  },
  {
    "admissionNo": "26616",
    "name": "PON HASHINI V",
    "gender": "Female",
    "dob": "19/08/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6319",
    "password": "19/08/2015"
  },
  {
    "admissionNo": "P19084",
    "name": "SHALINI C",
    "gender": "Female",
    "dob": "06/12/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6320",
    "password": "06/12/2015"
  },
  {
    "admissionNo": "P22164",
    "name": "SHASHINI SHREE G R",
    "gender": "Female",
    "dob": "31/08/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6321",
    "password": "31/08/2015"
  },
  {
    "admissionNo": "P19111",
    "name": "SHERLIN JESSICA E",
    "gender": "Female",
    "dob": "26/10/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6322",
    "password": "26/10/2015"
  },
  {
    "admissionNo": "P19132",
    "name": "SNO GENSIA P",
    "gender": "Female",
    "dob": "26/03/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6323",
    "password": "26/03/2016"
  },
  {
    "admissionNo": "26602",
    "name": "SUBA SANJANA RANI E",
    "gender": "Female",
    "dob": "12/01/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6303",
    "password": "12/01/2016"
  },
  {
    "admissionNo": "26610",
    "name": "VARUNIKA S",
    "gender": "Female",
    "dob": "30/10/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6304",
    "password": "30/10/2015"
  },
  {
    "admissionNo": "P19126",
    "name": "YASHMITHA V",
    "gender": "Female",
    "dob": "24/08/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6324",
    "password": "24/08/2015"
  },
  {
    "admissionNo": "P25049",
    "name": "BALA MUGUNTHAN S",
    "gender": "Male",
    "dob": "30/09/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6325",
    "password": "30/09/2015"
  },
  {
    "admissionNo": "P25047",
    "name": "DHARISH M",
    "gender": "Male",
    "dob": "02/08/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6326",
    "password": "02/08/2015"
  },
  {
    "admissionNo": "P24128",
    "name": "EFREN A",
    "gender": "Male",
    "dob": "05/12/2014",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6327",
    "password": "05/12/2014"
  },
  {
    "admissionNo": "26614",
    "name": "HARI VIGNESH M",
    "gender": "Male",
    "dob": "20/12/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6305",
    "password": "20/12/2015"
  },
  {
    "admissionNo": "26619",
    "name": "HARIEHARA PRABHU C.S",
    "gender": "Male",
    "dob": "24/07/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6328",
    "password": "24/07/2015"
  },
  {
    "admissionNo": "P21104",
    "name": "JOHNSON R",
    "gender": "Male",
    "dob": "13/04/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6329",
    "password": "13/04/2015"
  },
  {
    "admissionNo": "P22157",
    "name": "KAVIN M",
    "gender": "Male",
    "dob": "03/05/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6330",
    "password": "03/05/2016"
  },
  {
    "admissionNo": "P19059",
    "name": "PAVAN SHRI S",
    "gender": "Male",
    "dob": "07/07/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6331",
    "password": "07/07/2015"
  },
  {
    "admissionNo": "P19002",
    "name": "PRATHISH G",
    "gender": "Male",
    "dob": "01/01/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6332",
    "password": "01/01/2016"
  },
  {
    "admissionNo": "P19027",
    "name": "SAJITH AHAMED M A",
    "gender": "Male",
    "dob": "04/03/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6333",
    "password": "04/03/2015"
  },
  {
    "admissionNo": "P19057",
    "name": "SELVA NIRANJAN B",
    "gender": "Male",
    "dob": "30/03/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6334",
    "password": "30/03/2016"
  },
  {
    "admissionNo": "P19033",
    "name": "SREESANTH V K",
    "gender": "Male",
    "dob": "17/01/2016",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6335",
    "password": "17/01/2016"
  },
  {
    "admissionNo": "P19030",
    "name": "SUJAN G M",
    "gender": "Male",
    "dob": "11/01/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6336",
    "password": "11/01/2015"
  },
  {
    "admissionNo": "26623",
    "name": "VISHNU RISHANTH C",
    "gender": "Male",
    "dob": "31/05/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6337",
    "password": "31/05/2015"
  },
  {
    "admissionNo": "P21128",
    "name": "YASHVIN RAJA J",
    "gender": "Male",
    "dob": "24/08/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6338",
    "password": "24/08/2015"
  },
  {
    "admissionNo": "P19031",
    "name": "YUVAN S",
    "gender": "Male",
    "dob": "12/12/2015",
    "classLevel": "VI",
    "section": "C",
    "classSec": "VI C",
    "examNumber": "6339",
    "password": "12/12/2015"
  },
  {
    "admissionNo": "S25004",
    "name": "AKILA M R",
    "gender": "Female",
    "dob": "27/06/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7101",
    "password": "27/06/2014"
  },
  {
    "admissionNo": "S25147",
    "name": "ANUSREE A",
    "gender": "Female",
    "dob": "18/08/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7102",
    "password": "18/08/2014"
  },
  {
    "admissionNo": "S25098",
    "name": "ARTHIKA M",
    "gender": "Female",
    "dob": "14/07/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7103",
    "password": "14/07/2014"
  },
  {
    "admissionNo": "S25011",
    "name": "BERNICE RISHA R J",
    "gender": "Female",
    "dob": "10/03/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7104",
    "password": "10/03/2015"
  },
  {
    "admissionNo": "S25076",
    "name": "FATHIMA AASHIFA T",
    "gender": "Female",
    "dob": "17/01/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7105",
    "password": "17/01/2015"
  },
  {
    "admissionNo": "S25017",
    "name": "HARINI PREETHI S",
    "gender": "Female",
    "dob": "26/07/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7106",
    "password": "26/07/2014"
  },
  {
    "admissionNo": "S25078",
    "name": "JESSICA RUBY R",
    "gender": "Female",
    "dob": "28/03/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7107",
    "password": "28/03/2015"
  },
  {
    "admissionNo": "S25024",
    "name": "KALANTHIKA B",
    "gender": "Female",
    "dob": "21/05/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7108",
    "password": "21/05/2014"
  },
  {
    "admissionNo": "S25091",
    "name": "MATHUNISHA M",
    "gender": "Female",
    "dob": "25/05/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7109",
    "password": "25/05/2015"
  },
  {
    "admissionNo": "S25093",
    "name": "MUZHU MATHI K",
    "gender": "Female",
    "dob": "28/03/2013",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7110",
    "password": "28/03/2013"
  },
  {
    "admissionNo": "S25042",
    "name": "RITHIKA C",
    "gender": "Female",
    "dob": "24/10/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7111",
    "password": "24/10/2014"
  },
  {
    "admissionNo": "S25043",
    "name": "RITHIKA M",
    "gender": "Female",
    "dob": "02/03/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7112",
    "password": "02/03/2015"
  },
  {
    "admissionNo": "S25044",
    "name": "SAIRAKAVI S",
    "gender": "Female",
    "dob": "28/05/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7113",
    "password": "28/05/2014"
  },
  {
    "admissionNo": "S25049",
    "name": "SHREE SAATHANAA K",
    "gender": "Female",
    "dob": "04/06/2019",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7114",
    "password": "04/06/2019"
  },
  {
    "admissionNo": "S25055",
    "name": "SUJI KAMALACINI J",
    "gender": "Female",
    "dob": "09/08/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7115",
    "password": "09/08/2014"
  },
  {
    "admissionNo": "S25061",
    "name": "TRIFINO FERNANDO S",
    "gender": "Female",
    "dob": "21/09/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7116",
    "password": "21/09/2014"
  },
  {
    "admissionNo": "S25064",
    "name": "VARSHA S",
    "gender": "Female",
    "dob": "30/05/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7117",
    "password": "30/05/2014"
  },
  {
    "admissionNo": "S25081",
    "name": "VENU BHARATHI D",
    "gender": "Female",
    "dob": "18/12/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7118",
    "password": "18/12/2014"
  },
  {
    "admissionNo": "S25068",
    "name": "YASHMITHA M",
    "gender": "Female",
    "dob": "03/06/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7119",
    "password": "03/06/2015"
  },
  {
    "admissionNo": "S25003",
    "name": "ABHIRAM G",
    "gender": "Male",
    "dob": "13/06/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7120",
    "password": "13/06/2015"
  },
  {
    "admissionNo": "S25006",
    "name": "AKILESH S",
    "gender": "Male",
    "dob": "25/02/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7121",
    "password": "25/02/2015"
  },
  {
    "admissionNo": "S25007",
    "name": "ANIRUDH VARSHAN A",
    "gender": "Male",
    "dob": "11/12/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7122",
    "password": "11/12/2014"
  },
  {
    "admissionNo": "S25012",
    "name": "CHANDRA HASWANTH B",
    "gender": "Male",
    "dob": "11/09/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7123",
    "password": "11/09/2014"
  },
  {
    "admissionNo": "S25014",
    "name": "CHIRANJIV DEV KUMAR K",
    "gender": "Male",
    "dob": "22/02/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7124",
    "password": "22/02/2015"
  },
  {
    "admissionNo": "S25113",
    "name": "DHIRAJ PANDIAN S",
    "gender": "Male",
    "dob": "21/02/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7125",
    "password": "21/02/2014"
  },
  {
    "admissionNo": "S25123",
    "name": "GLADIN K",
    "gender": "Male",
    "dob": "26/05/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7126",
    "password": "26/05/2014"
  },
  {
    "admissionNo": "S25016",
    "name": "GOKUL K",
    "gender": "Male",
    "dob": "23/01/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7127",
    "password": "23/01/2015"
  },
  {
    "admissionNo": "S25141",
    "name": "HARI BALA B",
    "gender": "Male",
    "dob": "27/06/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7128",
    "password": "27/06/2014"
  },
  {
    "admissionNo": "S25088",
    "name": "JOSHUA ANDERSON J",
    "gender": "Male",
    "dob": "28/08/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7129",
    "password": "28/08/2014"
  },
  {
    "admissionNo": "S25025",
    "name": "KARTHICK BALA S",
    "gender": "Male",
    "dob": "02/05/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7130",
    "password": "02/05/2015"
  },
  {
    "admissionNo": "S25028",
    "name": "KRITHISH R",
    "gender": "Male",
    "dob": "13/11/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7131",
    "password": "13/11/2014"
  },
  {
    "admissionNo": "S25033",
    "name": "NARAIN KARTHIK M",
    "gender": "Male",
    "dob": "15/05/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7132",
    "password": "15/05/2014"
  },
  {
    "admissionNo": "S25109",
    "name": "PON HARISH V",
    "gender": "Male",
    "dob": "06/04/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7133",
    "password": "06/04/2014"
  },
  {
    "admissionNo": "S25039",
    "name": "PON RAKSHAN A",
    "gender": "Male",
    "dob": "10/02/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7134",
    "password": "10/02/2015"
  },
  {
    "admissionNo": "S25037",
    "name": "PRINSO M",
    "gender": "Male",
    "dob": "13/04/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7135",
    "password": "13/04/2014"
  },
  {
    "admissionNo": "26702",
    "name": "SHREE HARSH S",
    "gender": "Male",
    "dob": "04/01/2015",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7136",
    "password": "04/01/2015"
  },
  {
    "admissionNo": "S25052",
    "name": "SRI HARISHIVA V",
    "gender": "Male",
    "dob": "01/12/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7137",
    "password": "01/12/2014"
  },
  {
    "admissionNo": "S25116",
    "name": "SUDEEP YOGESHWARAN R",
    "gender": "Male",
    "dob": "04/09/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7138",
    "password": "04/09/2014"
  },
  {
    "admissionNo": "S25058",
    "name": "TARUNESH S",
    "gender": "Male",
    "dob": "14/12/2014",
    "classLevel": "VII",
    "section": "A",
    "classSec": "VII A",
    "examNumber": "7139",
    "password": "14/12/2014"
  },
  {
    "admissionNo": "S25001",
    "name": "ABI KRITHIKA S",
    "gender": "Female",
    "dob": "25/10/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7201",
    "password": "25/10/2014"
  },
  {
    "admissionNo": "S25009",
    "name": "AKSHAYA J",
    "gender": "Female",
    "dob": "29/05/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7202",
    "password": "29/05/2015"
  },
  {
    "admissionNo": "S25008",
    "name": "AKSHAYA LAKSHMI R",
    "gender": "Female",
    "dob": "19/02/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7203",
    "password": "19/02/2015"
  },
  {
    "admissionNo": "S25086",
    "name": "DHANYAAH S U",
    "gender": "Female",
    "dob": "17/07/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7204",
    "password": "17/07/2014"
  },
  {
    "admissionNo": "S25018",
    "name": "HEMA VARSHINI S",
    "gender": "Female",
    "dob": "19/09/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7205",
    "password": "19/09/2014"
  },
  {
    "admissionNo": "S25019",
    "name": "JENISHA B",
    "gender": "Female",
    "dob": "03/12/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7206",
    "password": "03/12/2014"
  },
  {
    "admissionNo": "S25020",
    "name": "JESSICA J",
    "gender": "Female",
    "dob": "07/09/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7207",
    "password": "07/09/2014"
  },
  {
    "admissionNo": "S25095",
    "name": "MAHA SAKTHI R",
    "gender": "Female",
    "dob": "21/10/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7208",
    "password": "21/10/2014"
  },
  {
    "admissionNo": "S25092",
    "name": "PRIYA DARSHINI S",
    "gender": "Female",
    "dob": "16/12/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7209",
    "password": "16/12/2014"
  },
  {
    "admissionNo": "S25097",
    "name": "RAGAVI J",
    "gender": "Female",
    "dob": "21/06/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7210",
    "password": "21/06/2014"
  },
  {
    "admissionNo": "S25046",
    "name": "SANJANA S",
    "gender": "Female",
    "dob": "08/10/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7211",
    "password": "08/10/2014"
  },
  {
    "admissionNo": "S25047",
    "name": "SATHANA M",
    "gender": "Female",
    "dob": "05/11/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7212",
    "password": "05/11/2014"
  },
  {
    "admissionNo": "S25117",
    "name": "SELVA SHIVANI V",
    "gender": "Female",
    "dob": "12/09/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7213",
    "password": "12/09/2014"
  },
  {
    "admissionNo": "S25053",
    "name": "SRI KARPAGA RAKSHITHA K E",
    "gender": "Female",
    "dob": "21/11/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7214",
    "password": "21/11/2014"
  },
  {
    "admissionNo": "S25056",
    "name": "SWANEE JIYA L",
    "gender": "Female",
    "dob": "29/11/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7215",
    "password": "29/11/2014"
  },
  {
    "admissionNo": "S25059",
    "name": "THADI HARINI",
    "gender": "Female",
    "dob": "05/01/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7216",
    "password": "05/01/2015"
  },
  {
    "admissionNo": "S25069",
    "name": "YAZHINI S R",
    "gender": "Female",
    "dob": "06/10/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7217",
    "password": "06/10/2014"
  },
  {
    "admissionNo": "S25072",
    "name": "YUVA SHREE GOPIKA L",
    "gender": "Female",
    "dob": "10/07/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7218",
    "password": "10/07/2014"
  },
  {
    "admissionNo": "S25071",
    "name": "YUVNA T",
    "gender": "Female",
    "dob": "06/05/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7219",
    "password": "06/05/2015"
  },
  {
    "admissionNo": "S25089",
    "name": "ABINESH M",
    "gender": "Male",
    "dob": "15/10/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7220",
    "password": "15/10/2014"
  },
  {
    "admissionNo": "S25094",
    "name": "AKASH SANJAY S",
    "gender": "Male",
    "dob": "03/09/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7221",
    "password": "03/09/2014"
  },
  {
    "admissionNo": "S25090",
    "name": "ASHERREOD A",
    "gender": "Male",
    "dob": "28/04/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7222",
    "password": "28/04/2014"
  },
  {
    "admissionNo": "S25108",
    "name": "DHARSHAN J",
    "gender": "Male",
    "dob": "19/04/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7223",
    "password": "19/04/2014"
  },
  {
    "admissionNo": "S25121",
    "name": "KAVIN ANTO P",
    "gender": "Male",
    "dob": "15/07/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7224",
    "password": "15/07/2014"
  },
  {
    "admissionNo": "S25027",
    "name": "KAVIN RAJ R",
    "gender": "Male",
    "dob": "05/04/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7225",
    "password": "05/04/2014"
  },
  {
    "admissionNo": "S25145",
    "name": "LOMASH M",
    "gender": "Male",
    "dob": "27/05/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7226",
    "password": "27/05/2014"
  },
  {
    "admissionNo": "S25031",
    "name": "MOHAMED NAFEES R",
    "gender": "Male",
    "dob": "21/03/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7227",
    "password": "21/03/2015"
  },
  {
    "admissionNo": "S25034",
    "name": "NIHAD HAMZA S",
    "gender": "Male",
    "dob": "21/10/2013",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7228",
    "password": "21/10/2013"
  },
  {
    "admissionNo": "S25080",
    "name": "NISHANTH F",
    "gender": "Male",
    "dob": "27/09/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7229",
    "password": "27/09/2014"
  },
  {
    "admissionNo": "S25038",
    "name": "PON MAHIT S",
    "gender": "Male",
    "dob": "01/04/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7230",
    "password": "01/04/2015"
  },
  {
    "admissionNo": "S25036",
    "name": "PRAVIN SATHYA M",
    "gender": "Male",
    "dob": "15/07/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7231",
    "password": "15/07/2015"
  },
  {
    "admissionNo": "S25041",
    "name": "RITHEESH V K",
    "gender": "Male",
    "dob": "16/01/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7232",
    "password": "16/01/2015"
  },
  {
    "admissionNo": "S25048",
    "name": "SHARON S",
    "gender": "Male",
    "dob": "14/04/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7233",
    "password": "14/04/2015"
  },
  {
    "admissionNo": "S25096",
    "name": "SHRAVANTHVEL S",
    "gender": "Male",
    "dob": "19/06/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7234",
    "password": "19/06/2014"
  },
  {
    "admissionNo": "S25050",
    "name": "SIVAKISHAN N",
    "gender": "Male",
    "dob": "09/11/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7235",
    "password": "09/11/2014"
  },
  {
    "admissionNo": "S25057",
    "name": "SWAROOP S",
    "gender": "Male",
    "dob": "23/03/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7236",
    "password": "23/03/2014"
  },
  {
    "admissionNo": "S25119",
    "name": "VIYANESH S",
    "gender": "Male",
    "dob": "29/08/2014",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7237",
    "password": "29/08/2014"
  },
  {
    "admissionNo": "S25070",
    "name": "YUVAN KRISHNA P",
    "gender": "Male",
    "dob": "05/07/2015",
    "classLevel": "VII",
    "section": "B",
    "classSec": "VII B",
    "examNumber": "7238",
    "password": "05/07/2015"
  },
  {
    "admissionNo": "S25002",
    "name": "ABINAYA CHELLA S",
    "gender": "Female",
    "dob": "20/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7301",
    "password": "20/10/2014"
  },
  {
    "admissionNo": "S25074",
    "name": "ARCHAYA SRI J",
    "gender": "Female",
    "dob": "11/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7302",
    "password": "11/10/2014"
  },
  {
    "admissionNo": "S25075",
    "name": "AVENTHIKA R",
    "gender": "Female",
    "dob": "10/12/2013",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7303",
    "password": "10/12/2013"
  },
  {
    "admissionNo": "S25015",
    "name": "DHANYA SHREE B",
    "gender": "Female",
    "dob": "29/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7304",
    "password": "29/10/2014"
  },
  {
    "admissionNo": "S25082",
    "name": "JANAVI M K",
    "gender": "Female",
    "dob": "13/04/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7305",
    "password": "13/04/2015"
  },
  {
    "admissionNo": "S25022",
    "name": "JOANNA STEFANIE S",
    "gender": "Female",
    "dob": "10/12/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7306",
    "password": "10/12/2014"
  },
  {
    "admissionNo": "S25083",
    "name": "JYOSHNA SRI R",
    "gender": "Female",
    "dob": "31/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7307",
    "password": "31/10/2014"
  },
  {
    "admissionNo": "S25030",
    "name": "MISHALINI B",
    "gender": "Female",
    "dob": "12/12/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7308",
    "password": "12/12/2014"
  },
  {
    "admissionNo": "S25111",
    "name": "MONISHA S",
    "gender": "Female",
    "dob": "30/07/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7309",
    "password": "30/07/2014"
  },
  {
    "admissionNo": "S25032",
    "name": "MUGASHINI S",
    "gender": "Female",
    "dob": "10/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7310",
    "password": "10/10/2014"
  },
  {
    "admissionNo": "S25045",
    "name": "SAMEERA SULTANA M S",
    "gender": "Female",
    "dob": "08/05/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7311",
    "password": "08/05/2014"
  },
  {
    "admissionNo": "S25115",
    "name": "SEVAKA ADHITRI N",
    "gender": "Female",
    "dob": "17/05/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7312",
    "password": "17/05/2015"
  },
  {
    "admissionNo": "S25084",
    "name": "SHERIN P",
    "gender": "Female",
    "dob": "06/04/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7313",
    "password": "06/04/2015"
  },
  {
    "admissionNo": "S25054",
    "name": "SUBIKSHA S",
    "gender": "Female",
    "dob": "03/03/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7314",
    "password": "03/03/2014"
  },
  {
    "admissionNo": "S25060",
    "name": "THANYA P",
    "gender": "Female",
    "dob": "03/10/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7315",
    "password": "03/10/2015"
  },
  {
    "admissionNo": "S25062",
    "name": "UMA SUPRIYA A",
    "gender": "Female",
    "dob": "28/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7316",
    "password": "28/11/2014"
  },
  {
    "admissionNo": "S25087",
    "name": "VANI SRI J",
    "gender": "Female",
    "dob": "26/03/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7317",
    "password": "26/03/2014"
  },
  {
    "admissionNo": "S25065",
    "name": "VARUNIKA V",
    "gender": "Female",
    "dob": "28/10/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7318",
    "password": "28/10/2014"
  },
  {
    "admissionNo": "S25073",
    "name": "AJAY M",
    "gender": "Male",
    "dob": "21/09/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7319",
    "password": "21/09/2014"
  },
  {
    "admissionNo": "S25005",
    "name": "AKILAN M R",
    "gender": "Male",
    "dob": "27/06/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7320",
    "password": "27/06/2014"
  },
  {
    "admissionNo": "S25010",
    "name": "ASHWIN S",
    "gender": "Male",
    "dob": "01/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7321",
    "password": "01/11/2014"
  },
  {
    "admissionNo": "26703",
    "name": "BENITO V",
    "gender": "Male",
    "dob": "29/04/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7322",
    "password": "29/04/2015"
  },
  {
    "admissionNo": "S25013",
    "name": "CHENTHURRAJA R",
    "gender": "Male",
    "dob": "18/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7323",
    "password": "18/11/2014"
  },
  {
    "admissionNo": "S25077",
    "name": "GODWIN PRABHU P",
    "gender": "Male",
    "dob": "25/09/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7324",
    "password": "25/09/2014"
  },
  {
    "admissionNo": "S25122",
    "name": "HARIHARA SUDHAN T",
    "gender": "Male",
    "dob": "22/03/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7325",
    "password": "22/03/2015"
  },
  {
    "admissionNo": "S25021",
    "name": "JEYARAMAN T",
    "gender": "Male",
    "dob": "16/08/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7326",
    "password": "16/08/2014"
  },
  {
    "admissionNo": "S25023",
    "name": "JOSEPH SWITHIN V",
    "gender": "Male",
    "dob": "02/07/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7327",
    "password": "02/07/2014"
  },
  {
    "admissionNo": "S25026",
    "name": "KAVIN I",
    "gender": "Male",
    "dob": "07/12/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7328",
    "password": "07/12/2014"
  },
  {
    "admissionNo": "S25029",
    "name": "MAHILESH S",
    "gender": "Male",
    "dob": "14/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7329",
    "password": "14/11/2014"
  },
  {
    "admissionNo": "S25112",
    "name": "MASS SUDHAN M",
    "gender": "Male",
    "dob": "01/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7330",
    "password": "01/11/2014"
  },
  {
    "admissionNo": "S25079",
    "name": "MONISH V",
    "gender": "Male",
    "dob": "26/08/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7331",
    "password": "26/08/2014"
  },
  {
    "admissionNo": "S25035",
    "name": "NIKHILESH M",
    "gender": "Male",
    "dob": "16/01/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7332",
    "password": "16/01/2015"
  },
  {
    "admissionNo": "S25110",
    "name": "PRAGATHEESH M",
    "gender": "Male",
    "dob": "11/01/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7333",
    "password": "11/01/2015"
  },
  {
    "admissionNo": "S25085",
    "name": "PUGALENTHI K",
    "gender": "Male",
    "dob": "25/11/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7334",
    "password": "25/11/2014"
  },
  {
    "admissionNo": "S25114",
    "name": "SIDHARTH I A",
    "gender": "Male",
    "dob": "24/01/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7335",
    "password": "24/01/2015"
  },
  {
    "admissionNo": "S25051",
    "name": "SRINATH S",
    "gender": "Male",
    "dob": "21/02/2015",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7336",
    "password": "21/02/2015"
  },
  {
    "admissionNo": "S25066",
    "name": "VINAYAGA MOORTHI M",
    "gender": "Male",
    "dob": "29/08/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7337",
    "password": "29/08/2014"
  },
  {
    "admissionNo": "S25067",
    "name": "VIVIN M",
    "gender": "Male",
    "dob": "28/08/2014",
    "classLevel": "VII",
    "section": "C",
    "classSec": "VII C",
    "examNumber": "7338",
    "password": "28/08/2014"
  },
  {
    "admissionNo": "S24048",
    "name": "ADELINE LIZA S",
    "gender": "Female",
    "dob": "24/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24048",
    "password": "24/09/2013"
  },
  {
    "admissionNo": "S24054",
    "name": "JERUSHA G PAULIN I",
    "gender": "Female",
    "dob": "15/04/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24054",
    "password": "15/04/2014"
  },
  {
    "admissionNo": "S24083",
    "name": "AKSHAYA SHRI N P",
    "gender": "Female",
    "dob": "29/08/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24083",
    "password": "29/08/2013"
  },
  {
    "admissionNo": "S24116",
    "name": "ANGEL A",
    "gender": "Female",
    "dob": "29/04/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24116",
    "password": "29/04/2014"
  },
  {
    "admissionNo": "S24102",
    "name": "ANUSHA P",
    "gender": "Female",
    "dob": "22/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24102",
    "password": "22/09/2013"
  },
  {
    "admissionNo": "S24033",
    "name": "DHARSIYA A",
    "gender": "Female",
    "dob": "17/10/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24033",
    "password": "17/10/2013"
  },
  {
    "admissionNo": "26801",
    "name": "HARANIKAA K.S",
    "gender": "Female",
    "dob": "14/11/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "26801",
    "password": "14/11/2013"
  },
  {
    "admissionNo": "S24096",
    "name": "JESIKHAROSSY M S",
    "gender": "Female",
    "dob": "13/12/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24096",
    "password": "13/12/2013"
  },
  {
    "admissionNo": "S25144",
    "name": "JEYALAKSHMI M",
    "gender": "Female",
    "dob": "08/11/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S25144",
    "password": "08/11/2013"
  },
  {
    "admissionNo": "S24072",
    "name": "JOVITA BLESSY A",
    "gender": "Female",
    "dob": "07/08/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24072",
    "password": "07/08/2013"
  },
  {
    "admissionNo": "26806",
    "name": "MONICA VINCEY M",
    "gender": "Female",
    "dob": "18/01/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "26806",
    "password": "18/01/2014"
  },
  {
    "admissionNo": "S24084",
    "name": "NATTAR DEVI S",
    "gender": "Female",
    "dob": "31/07/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24084",
    "password": "31/07/2014"
  },
  {
    "admissionNo": "S24107",
    "name": "NILA DEVI M",
    "gender": "Female",
    "dob": "30/12/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24107",
    "password": "30/12/2013"
  },
  {
    "admissionNo": "S24010",
    "name": "POOJA T",
    "gender": "Female",
    "dob": "16/04/2019",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24010",
    "password": "16/04/2019"
  },
  {
    "admissionNo": "S24016",
    "name": "RIZVANA S",
    "gender": "Female",
    "dob": "26/07/2012",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24016",
    "password": "26/07/2012"
  },
  {
    "admissionNo": "S24060",
    "name": "RUTHIKA K",
    "gender": "Female",
    "dob": "16/07/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24060",
    "password": "16/07/2013"
  },
  {
    "admissionNo": "S24055",
    "name": "SELVA ISHWARYA M",
    "gender": "Female",
    "dob": "14/10/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24055",
    "password": "14/10/2013"
  },
  {
    "admissionNo": "S25125",
    "name": "SELVA RAMYA S",
    "gender": "Female",
    "dob": "02/02/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S25125",
    "password": "02/02/2014"
  },
  {
    "admissionNo": "26810",
    "name": "AHILESH M",
    "gender": "Male",
    "dob": "13/05/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "26810",
    "password": "13/05/2013"
  },
  {
    "admissionNo": "S24066",
    "name": "ASVANTH P S",
    "gender": "Male",
    "dob": "24/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24066",
    "password": "24/09/2013"
  },
  {
    "admissionNo": "S24067",
    "name": "DIVANESH S",
    "gender": "Male",
    "dob": "17/05/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24067",
    "password": "17/05/2013"
  },
  {
    "admissionNo": "S24106",
    "name": "HARISH C",
    "gender": "Male",
    "dob": "01/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24106",
    "password": "01/09/2013"
  },
  {
    "admissionNo": "S24004",
    "name": "HEMANTH A",
    "gender": "Male",
    "dob": "29/06/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24004",
    "password": "29/06/2013"
  },
  {
    "admissionNo": "S24015",
    "name": "JAISHIK A",
    "gender": "Male",
    "dob": "27/03/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24015",
    "password": "27/03/2013"
  },
  {
    "admissionNo": "S25127",
    "name": "JESHWIN C",
    "gender": "Male",
    "dob": "17/12/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S25127",
    "password": "17/12/2013"
  },
  {
    "admissionNo": "S24035",
    "name": "JOS STEFAAN P",
    "gender": "Male",
    "dob": "13/11/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24035",
    "password": "13/11/2013"
  },
  {
    "admissionNo": "S24003",
    "name": "MARVIN JOEL R",
    "gender": "Male",
    "dob": "27/03/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24003",
    "password": "27/03/2014"
  },
  {
    "admissionNo": "S24028",
    "name": "MOHAMED RAZEEN M",
    "gender": "Male",
    "dob": "25/05/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24028",
    "password": "25/05/2013"
  },
  {
    "admissionNo": "S24056",
    "name": "MOHAMMED ALTHAF K",
    "gender": "Male",
    "dob": "16/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24056",
    "password": "16/09/2013"
  },
  {
    "admissionNo": "S24020",
    "name": "MUKUND JAGATHEESH M",
    "gender": "Male",
    "dob": "03/07/2014",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24020",
    "password": "03/07/2014"
  },
  {
    "admissionNo": "S24031",
    "name": "PAUL JADON J",
    "gender": "Male",
    "dob": "04/07/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24031",
    "password": "04/07/2013"
  },
  {
    "admissionNo": "S24019",
    "name": "SAIRAM R",
    "gender": "Male",
    "dob": "23/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24019",
    "password": "23/09/2013"
  },
  {
    "admissionNo": "S24032",
    "name": "SRIJAN K",
    "gender": "Male",
    "dob": "09/12/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24032",
    "password": "09/12/2013"
  },
  {
    "admissionNo": "S24086",
    "name": "VARSHAN V",
    "gender": "Male",
    "dob": "30/09/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24086",
    "password": "30/09/2013"
  },
  {
    "admissionNo": "S24001",
    "name": "VIMAL SRINATH B S",
    "gender": "Male",
    "dob": "19/11/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S24001",
    "password": "19/11/2013"
  },
  {
    "admissionNo": "S25101",
    "name": "VISHNU PRASADH N",
    "gender": "Male",
    "dob": "07/08/2013",
    "classLevel": "VIII",
    "section": "A",
    "classSec": "VIII A",
    "examNumber": "S25101",
    "password": "07/08/2013"
  },
  {
    "admissionNo": "S24009",
    "name": "ALAGU MENAKA S",
    "gender": "Female",
    "dob": "19/09/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24009",
    "password": "19/09/2013"
  },
  {
    "admissionNo": "S24037",
    "name": "DELAKSHANA R",
    "gender": "Female",
    "dob": "21/12/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24037",
    "password": "21/12/2013"
  },
  {
    "admissionNo": "S24057",
    "name": "FATHIMA ALSHIFA S",
    "gender": "Female",
    "dob": "04/05/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24057",
    "password": "04/05/2013"
  },
  {
    "admissionNo": "26803",
    "name": "GLADIS JERUSHLIN SELVI S",
    "gender": "Female",
    "dob": "06/09/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "26803",
    "password": "06/09/2013"
  },
  {
    "admissionNo": "S24014",
    "name": "JAYA HARINI P",
    "gender": "Female",
    "dob": "08/03/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24014",
    "password": "08/03/2014"
  },
  {
    "admissionNo": "26805",
    "name": "KARTHIKA S",
    "gender": "Female",
    "dob": "10/11/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "26805",
    "password": "10/11/2013"
  },
  {
    "admissionNo": "S24074",
    "name": "KIRUTHIKA NATHASRI M",
    "gender": "Female",
    "dob": "09/03/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24074",
    "password": "09/03/2014"
  },
  {
    "admissionNo": "S24103",
    "name": "MADHANKI M",
    "gender": "Female",
    "dob": "26/06/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24103",
    "password": "26/06/2013"
  },
  {
    "admissionNo": "S24041",
    "name": "MAHI DHARSHINI M",
    "gender": "Female",
    "dob": "15/06/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24041",
    "password": "15/06/2014"
  },
  {
    "admissionNo": "S24013",
    "name": "NAJEEMA SULTHANA G",
    "gender": "Female",
    "dob": "07/03/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24013",
    "password": "07/03/2013"
  },
  {
    "admissionNo": "S24005",
    "name": "NAKULA S",
    "gender": "Female",
    "dob": "16/04/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24005",
    "password": "16/04/2013"
  },
  {
    "admissionNo": "S24081",
    "name": "NITHARSHA M",
    "gender": "Female",
    "dob": "09/10/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24081",
    "password": "09/10/2013"
  },
  {
    "admissionNo": "S24061",
    "name": "PON ROHINI R",
    "gender": "Female",
    "dob": "25/06/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24061",
    "password": "25/06/2013"
  },
  {
    "admissionNo": "S24097",
    "name": "RAJA DIVYA G",
    "gender": "Female",
    "dob": "17/05/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24097",
    "password": "17/05/2013"
  },
  {
    "admissionNo": "S24040",
    "name": "SRI HARINI E S",
    "gender": "Female",
    "dob": "24/12/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24040",
    "password": "24/12/2013"
  },
  {
    "admissionNo": "S24050",
    "name": "SRI HARINI M",
    "gender": "Female",
    "dob": "02/04/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24050",
    "password": "02/04/2014"
  },
  {
    "admissionNo": "S25124",
    "name": "THIRAVIA ANCY P",
    "gender": "Female",
    "dob": "23/03/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S25124",
    "password": "23/03/2013"
  },
  {
    "admissionNo": "S25126",
    "name": "ABINESH S",
    "gender": "Male",
    "dob": "25/01/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S25126",
    "password": "25/01/2013"
  },
  {
    "admissionNo": "S24080",
    "name": "AKASH RAJ J",
    "gender": "Male",
    "dob": "31/10/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24080",
    "password": "31/10/2013"
  },
  {
    "admissionNo": "S24091",
    "name": "ALWIN PAUL J",
    "gender": "Male",
    "dob": "07/01/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24091",
    "password": "07/01/2014"
  },
  {
    "admissionNo": "S24002",
    "name": "BALA DARSHAN M",
    "gender": "Male",
    "dob": "09/03/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24002",
    "password": "09/03/2013"
  },
  {
    "admissionNo": "S24049",
    "name": "JANUS JEFFRY J",
    "gender": "Male",
    "dob": "07/07/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24049",
    "password": "07/07/2013"
  },
  {
    "admissionNo": "S24030",
    "name": "JOEL OBED VINCENT J",
    "gender": "Male",
    "dob": "10/04/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24030",
    "password": "10/04/2013"
  },
  {
    "admissionNo": "S24070",
    "name": "KRISHANTH V",
    "gender": "Male",
    "dob": "20/04/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24070",
    "password": "20/04/2014"
  },
  {
    "admissionNo": "S26116",
    "name": "MAHAA RAJA S.R",
    "gender": "Male",
    "dob": "14/06/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S26116",
    "password": "14/06/2013"
  },
  {
    "admissionNo": "S24038",
    "name": "MANISH N",
    "gender": "Male",
    "dob": "05/09/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24038",
    "password": "05/09/2013"
  },
  {
    "admissionNo": "S24043",
    "name": "MOHAIDEEN AASIF M",
    "gender": "Male",
    "dob": "26/08/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24043",
    "password": "26/08/2013"
  },
  {
    "admissionNo": "S24011",
    "name": "MUTHU ALAGAN S",
    "gender": "Male",
    "dob": "26/05/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24011",
    "password": "26/05/2013"
  },
  {
    "admissionNo": "S24027",
    "name": "NIRANJAN M",
    "gender": "Male",
    "dob": "05/11/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24027",
    "password": "05/11/2013"
  },
  {
    "admissionNo": "S24052",
    "name": "PON MANOJ B",
    "gender": "Male",
    "dob": "04/05/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24052",
    "password": "04/05/2013"
  },
  {
    "admissionNo": "S24073",
    "name": "SANTHOSH KUMAR B",
    "gender": "Male",
    "dob": "30/03/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24073",
    "password": "30/03/2014"
  },
  {
    "admissionNo": "S24082",
    "name": "SHRI RAM MV",
    "gender": "Male",
    "dob": "02/06/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24082",
    "password": "02/06/2013"
  },
  {
    "admissionNo": "S24008",
    "name": "SRIGEN G",
    "gender": "Male",
    "dob": "23/09/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24008",
    "password": "23/09/2013"
  },
  {
    "admissionNo": "S24034",
    "name": "SUDEEP S",
    "gender": "Male",
    "dob": "28/04/2014",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24034",
    "password": "28/04/2014"
  },
  {
    "admissionNo": "S24071",
    "name": "SUDHARSAN P",
    "gender": "Male",
    "dob": "08/11/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S24071",
    "password": "08/11/2013"
  },
  {
    "admissionNo": "S25099",
    "name": "VINEK KUMAR RT",
    "gender": "Male",
    "dob": "11/10/2013",
    "classLevel": "VIII",
    "section": "B",
    "classSec": "VIII B",
    "examNumber": "S25099",
    "password": "11/10/2013"
  },
  {
    "admissionNo": "S24022",
    "name": "AISHWARYA R",
    "gender": "Female",
    "dob": "01/09/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24022",
    "password": "01/09/2014"
  },
  {
    "admissionNo": "S24065",
    "name": "BIRUNDHA M",
    "gender": "Female",
    "dob": "17/08/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24065",
    "password": "17/08/2013"
  },
  {
    "admissionNo": "S25100",
    "name": "DHAKSANA J",
    "gender": "Female",
    "dob": "05/12/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S25100",
    "password": "05/12/2013"
  },
  {
    "admissionNo": "S25128",
    "name": "GIFTY K",
    "gender": "Female",
    "dob": "17/03/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S25128",
    "password": "17/03/2014"
  },
  {
    "admissionNo": "S24012",
    "name": "HARINI M P",
    "gender": "Female",
    "dob": "18/05/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24012",
    "password": "18/05/2014"
  },
  {
    "admissionNo": "S24025",
    "name": "HARSHITA M",
    "gender": "Female",
    "dob": "05/08/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24025",
    "password": "05/08/2013"
  },
  {
    "admissionNo": "S24099",
    "name": "KEERTHANA R",
    "gender": "Female",
    "dob": "23/07/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24099",
    "password": "23/07/2014"
  },
  {
    "admissionNo": "S24064",
    "name": "NANDHITHA SRI P",
    "gender": "Female",
    "dob": "26/01/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24064",
    "password": "26/01/2014"
  },
  {
    "admissionNo": "S24047",
    "name": "PRAJITHAA SREE M",
    "gender": "Female",
    "dob": "10/08/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24047",
    "password": "10/08/2013"
  },
  {
    "admissionNo": "S24036",
    "name": "PRATHIKSHA REDDY S",
    "gender": "Female",
    "dob": "24/02/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24036",
    "password": "24/02/2014"
  },
  {
    "admissionNo": "S24023",
    "name": "RATHI DEVI R",
    "gender": "Female",
    "dob": "15/04/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24023",
    "password": "15/04/2014"
  },
  {
    "admissionNo": "S24058",
    "name": "RENI M",
    "gender": "Female",
    "dob": "03/05/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24058",
    "password": "03/05/2014"
  },
  {
    "admissionNo": "S24029",
    "name": "ROHITA MAGATHI S",
    "gender": "Female",
    "dob": "12/04/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24029",
    "password": "12/04/2013"
  },
  {
    "admissionNo": "S24045",
    "name": "SAKTHI M S NANDHANA",
    "gender": "Female",
    "dob": "23/12/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24045",
    "password": "23/12/2013"
  },
  {
    "admissionNo": "S24068",
    "name": "SHIFA FATHIMA Y",
    "gender": "Female",
    "dob": "28/06/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24068",
    "password": "28/06/2013"
  },
  {
    "admissionNo": "S24062",
    "name": "SIVA SANKARI I",
    "gender": "Female",
    "dob": "22/05/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24062",
    "password": "22/05/2013"
  },
  {
    "admissionNo": "S24089",
    "name": "UDHISHNI B",
    "gender": "Female",
    "dob": "13/09/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24089",
    "password": "13/09/2013"
  },
  {
    "admissionNo": "S25146",
    "name": "YASMITHA C",
    "gender": "Female",
    "dob": "28/04/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S25146",
    "password": "28/04/2013"
  },
  {
    "admissionNo": "S24108",
    "name": "BALA KRISHNAN S",
    "gender": "Male",
    "dob": "03/05/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24108",
    "password": "03/05/2014"
  },
  {
    "admissionNo": "S24063",
    "name": "DEEBATHARAN P",
    "gender": "Male",
    "dob": "17/10/2012",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24063",
    "password": "17/10/2012"
  },
  {
    "admissionNo": "S24026",
    "name": "HARI PRASATH S",
    "gender": "Male",
    "dob": "11/08/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24026",
    "password": "11/08/2013"
  },
  {
    "admissionNo": "S24101",
    "name": "HASEEN ISHAQ H R",
    "gender": "Male",
    "dob": "18/01/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24101",
    "password": "18/01/2014"
  },
  {
    "admissionNo": "S24039",
    "name": "ILAMAARAN R",
    "gender": "Male",
    "dob": "26/04/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24039",
    "password": "26/04/2013"
  },
  {
    "admissionNo": "S24087",
    "name": "KEVIN NICKEL A",
    "gender": "Male",
    "dob": "10/02/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24087",
    "password": "10/02/2014"
  },
  {
    "admissionNo": "S24053",
    "name": "KISHORE A P",
    "gender": "Male",
    "dob": "19/11/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24053",
    "password": "19/11/2013"
  },
  {
    "admissionNo": "S24021",
    "name": "MATHESH S",
    "gender": "Male",
    "dob": "15/08/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24021",
    "password": "15/08/2013"
  },
  {
    "admissionNo": "26809",
    "name": "NITHEESH V",
    "gender": "Male",
    "dob": "06/06/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "26809",
    "password": "06/06/2014"
  },
  {
    "admissionNo": "S24112",
    "name": "PRANSU",
    "gender": "Male",
    "dob": "28/08/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24112",
    "password": "28/08/2014"
  },
  {
    "admissionNo": "S24046",
    "name": "SAI HARISH R",
    "gender": "Male",
    "dob": "05/01/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24046",
    "password": "05/01/2014"
  },
  {
    "admissionNo": "S24098",
    "name": "NIGIL JOEVIN P",
    "gender": "Male",
    "dob": "04/03/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24098",
    "password": "04/03/2013"
  },
  {
    "admissionNo": "S24100",
    "name": "SANJEETH A M",
    "gender": "Male",
    "dob": "15/03/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24100",
    "password": "15/03/2013"
  },
  {
    "admissionNo": "26802",
    "name": "SRI ABISHEK P",
    "gender": "Male",
    "dob": "18/11/2023",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "26802",
    "password": "18/11/2023"
  },
  {
    "admissionNo": "S24051",
    "name": "SUDHAN S",
    "gender": "Male",
    "dob": "31/07/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24051",
    "password": "31/07/2013"
  },
  {
    "admissionNo": "S25102",
    "name": "SUGIRTHAN RAJAMANICKAM B",
    "gender": "Male",
    "dob": "16/10/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S25102",
    "password": "16/10/2013"
  },
  {
    "admissionNo": "S24044",
    "name": "SUJITH RAHUL V",
    "gender": "Male",
    "dob": "10/04/2013",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S24044",
    "password": "10/04/2013"
  },
  {
    "admissionNo": "S25103",
    "name": "SUVEERA B",
    "gender": "Male",
    "dob": "11/02/2014",
    "classLevel": "VIII",
    "section": "C",
    "classSec": "VIII C",
    "examNumber": "S25103",
    "password": "11/02/2014"
  },
  {
    "admissionNo": "S24105",
    "name": "ROBIN PAUL C",
    "gender": "Male",
    "dob": "14/06/2013",
    "classLevel": "VIII",
    "section": "N",
    "classSec": "VIII N",
    "examNumber": "S24105",
    "password": "14/06/2013"
  },
  {
    "admissionNo": "26811",
    "name": "AKIRA A",
    "gender": "Female",
    "dob": "04/04/2013",
    "classLevel": "VIII",
    "section": "N",
    "classSec": "VIII N",
    "examNumber": "26811",
    "password": "04/04/2013"
  },
  {
    "admissionNo": "S23002",
    "name": "ANISHA A",
    "gender": "Female",
    "dob": "02/01/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23002",
    "password": "02/01/2013"
  },
  {
    "admissionNo": "S23003",
    "name": "ANNE SHARON S",
    "gender": "Female",
    "dob": "01/09/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23003",
    "password": "01/09/2013"
  },
  {
    "admissionNo": "S23126",
    "name": "ANUSHA H V",
    "gender": "Female",
    "dob": "19/04/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23126",
    "password": "19/04/2013"
  },
  {
    "admissionNo": "S23006",
    "name": "DHANUKSHA T",
    "gender": "Female",
    "dob": "23/03/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23006",
    "password": "23/03/2013"
  },
  {
    "admissionNo": "S23007",
    "name": "DHANYA SRI T",
    "gender": "Female",
    "dob": "17/10/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23007",
    "password": "17/10/2012"
  },
  {
    "admissionNo": "S23089",
    "name": "DHARSHINI R",
    "gender": "Female",
    "dob": "08/04/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23089",
    "password": "08/04/2012"
  },
  {
    "admissionNo": "S23119",
    "name": "DIVYA DHARSHINI M",
    "gender": "Female",
    "dob": "27/05/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23119",
    "password": "27/05/2013"
  },
  {
    "admissionNo": "S23010",
    "name": "HARI SANKARI A",
    "gender": "Female",
    "dob": "24/01/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23010",
    "password": "24/01/2013"
  },
  {
    "admissionNo": "S23121",
    "name": "HARSHINI S",
    "gender": "Female",
    "dob": "23/10/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23121",
    "password": "23/10/2013"
  },
  {
    "admissionNo": "S23109",
    "name": "ILAMATHI P",
    "gender": "Female",
    "dob": "04/10/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23109",
    "password": "04/10/2012"
  },
  {
    "admissionNo": "S23014",
    "name": "KAVYA NISHA K",
    "gender": "Female",
    "dob": "06/03/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23014",
    "password": "06/03/2012"
  },
  {
    "admissionNo": "S23114",
    "name": "KRISHNA P V",
    "gender": "Female",
    "dob": "24/10/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23114",
    "password": "24/10/2012"
  },
  {
    "admissionNo": "26904",
    "name": "LIBINAYA KANNIKA M",
    "gender": "Female",
    "dob": "20/01/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "26904",
    "password": "20/01/2013"
  },
  {
    "admissionNo": "S23019",
    "name": "NIRALYA S",
    "gender": "Female",
    "dob": "08/03/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23019",
    "password": "08/03/2013"
  },
  {
    "admissionNo": "S23091",
    "name": "PEARLIN SHERINITHI P R",
    "gender": "Female",
    "dob": "09/09/2011",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23091",
    "password": "09/09/2011"
  },
  {
    "admissionNo": "S23024",
    "name": "SHREE MITHRA S R",
    "gender": "Female",
    "dob": "05/07/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23024",
    "password": "05/07/2012"
  },
  {
    "admissionNo": "S23027",
    "name": "SRI VARSHINI S",
    "gender": "Female",
    "dob": "20/02/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23027",
    "password": "20/02/2013"
  },
  {
    "admissionNo": "S23028",
    "name": "SUBASRI S",
    "gender": "Female",
    "dob": "25/02/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23028",
    "password": "25/02/2013"
  },
  {
    "admissionNo": "S25129",
    "name": "VIJAYA VANATHY S",
    "gender": "Female",
    "dob": "05/09/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S25129",
    "password": "05/09/2012"
  },
  {
    "admissionNo": "S23031",
    "name": "YOMIDHA K",
    "gender": "Female",
    "dob": "20/07/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23031",
    "password": "20/07/2013"
  },
  {
    "admissionNo": "S23107",
    "name": "ATHI VEERA RAM P",
    "gender": "Male",
    "dob": "15/11/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23107",
    "password": "15/11/2012"
  },
  {
    "admissionNo": "26901",
    "name": "DEVKRISH R",
    "gender": "Male",
    "dob": "03/12/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "26901",
    "password": "03/12/2012"
  },
  {
    "admissionNo": "S23040",
    "name": "FELIXON V",
    "gender": "Male",
    "dob": "18/12/2011",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23040",
    "password": "18/12/2011"
  },
  {
    "admissionNo": "S23041",
    "name": "GEO RITTIN D",
    "gender": "Male",
    "dob": "22/05/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23041",
    "password": "22/05/2013"
  },
  {
    "admissionNo": "S23042",
    "name": "GOKUL SRIRAM K",
    "gender": "Male",
    "dob": "19/01/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23042",
    "password": "19/01/2013"
  },
  {
    "admissionNo": "S24093",
    "name": "JEEVA T",
    "gender": "Male",
    "dob": "19/11/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S24093",
    "password": "19/11/2012"
  },
  {
    "admissionNo": "S23085",
    "name": "JEFFIN VINISH R",
    "gender": "Male",
    "dob": "30/11/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23085",
    "password": "30/11/2012"
  },
  {
    "admissionNo": "S23086",
    "name": "JEREM PAUL J",
    "gender": "Male",
    "dob": "06/04/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23086",
    "password": "06/04/2012"
  },
  {
    "admissionNo": "S23046",
    "name": "JERUSH G PAUL I",
    "gender": "Male",
    "dob": "09/10/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23046",
    "password": "09/10/2012"
  },
  {
    "admissionNo": "S23047",
    "name": "JERUSH RUBAN R",
    "gender": "Male",
    "dob": "09/03/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23047",
    "password": "09/03/2013"
  },
  {
    "admissionNo": "S23048",
    "name": "JOHITH ROSHAN J",
    "gender": "Male",
    "dob": "26/11/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23048",
    "password": "26/11/2012"
  },
  {
    "admissionNo": "S23051",
    "name": "KATHIRVEL K",
    "gender": "Male",
    "dob": "14/08/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23051",
    "password": "14/08/2012"
  },
  {
    "admissionNo": "S23056",
    "name": "MATHESH A",
    "gender": "Male",
    "dob": "17/05/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23056",
    "password": "17/05/2012"
  },
  {
    "admissionNo": "S23057",
    "name": "MITHILESH R",
    "gender": "Male",
    "dob": "25/02/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23057",
    "password": "25/02/2013"
  },
  {
    "admissionNo": "S23058",
    "name": "MOHAMMED ABDUL BASITH S",
    "gender": "Male",
    "dob": "10/09/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23058",
    "password": "10/09/2012"
  },
  {
    "admissionNo": "S23060",
    "name": "MUTHU SANKAR G",
    "gender": "Male",
    "dob": "02/05/2013",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23060",
    "password": "02/05/2013"
  },
  {
    "admissionNo": "S23062",
    "name": "PRANESH P",
    "gender": "Male",
    "dob": "08/05/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23062",
    "password": "08/05/2012"
  },
  {
    "admissionNo": "S23063",
    "name": "PRAVEEN S",
    "gender": "Male",
    "dob": "28/04/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23063",
    "password": "28/04/2012"
  },
  {
    "admissionNo": "S23118",
    "name": "RATTHISH V",
    "gender": "Male",
    "dob": "28/05/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23118",
    "password": "28/05/2012"
  },
  {
    "admissionNo": "S23082",
    "name": "SIVAKANNAN N",
    "gender": "Male",
    "dob": "22/11/2012",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23082",
    "password": "22/11/2012"
  },
  {
    "admissionNo": "S23073",
    "name": "SIVARAM C",
    "gender": "Male",
    "dob": "12/10/2011",
    "classLevel": "IX",
    "section": "A",
    "classSec": "IX A",
    "examNumber": "S23073",
    "password": "12/10/2011"
  },
  {
    "admissionNo": "S23001",
    "name": "AGNAS REETA V",
    "gender": "Female",
    "dob": "04/10/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23001",
    "password": "04/10/2012"
  },
  {
    "admissionNo": "S23083",
    "name": "AKSHARA K",
    "gender": "Female",
    "dob": "31/10/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23083",
    "password": "31/10/2012"
  },
  {
    "admissionNo": "S23096",
    "name": "ALDERIN RIO B",
    "gender": "Female",
    "dob": "07/11/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23096",
    "password": "07/11/2012"
  },
  {
    "admissionNo": "S23004",
    "name": "ASLIN Y",
    "gender": "Female",
    "dob": "07/04/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23004",
    "password": "07/04/2012"
  },
  {
    "admissionNo": "26903",
    "name": "BALA SARNITHAA K",
    "gender": "Female",
    "dob": "16/05/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "26903",
    "password": "16/05/2013"
  },
  {
    "admissionNo": "S23005",
    "name": "CRISPINA R M",
    "gender": "Female",
    "dob": "05/12/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23005",
    "password": "05/12/2012"
  },
  {
    "admissionNo": "S23100",
    "name": "DHARMA KARSHINI B",
    "gender": "Female",
    "dob": "24/09/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23100",
    "password": "24/09/2012"
  },
  {
    "admissionNo": "S25134",
    "name": "JEYA SHREE V",
    "gender": "Female",
    "dob": "14/09/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S25134",
    "password": "14/09/2012"
  },
  {
    "admissionNo": "S23011",
    "name": "JOSEPHINE WINSHA E",
    "gender": "Female",
    "dob": "25/12/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23011",
    "password": "25/12/2012"
  },
  {
    "admissionNo": "S23015",
    "name": "KISHANA SHABARISHWARI S",
    "gender": "Female",
    "dob": "16/12/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23015",
    "password": "16/12/2012"
  },
  {
    "admissionNo": "S23016",
    "name": "LAKSHAYA M",
    "gender": "Female",
    "dob": "15/03/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23016",
    "password": "15/03/2013"
  },
  {
    "admissionNo": "S25104",
    "name": "MAHA SHIVANI S",
    "gender": "Female",
    "dob": "22/02/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S25104",
    "password": "22/02/2013"
  },
  {
    "admissionNo": "S23018",
    "name": "NARAYANI I",
    "gender": "Female",
    "dob": "21/05/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23018",
    "password": "21/05/2012"
  },
  {
    "admissionNo": "S23021",
    "name": "NIYA AMINA S",
    "gender": "Female",
    "dob": "01/12/2011",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23021",
    "password": "01/12/2011"
  },
  {
    "admissionNo": "S23104",
    "name": "SAABARI HARINI V D",
    "gender": "Female",
    "dob": "09/01/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23104",
    "password": "09/01/2013"
  },
  {
    "admissionNo": "S23022",
    "name": "SANJANA K",
    "gender": "Female",
    "dob": "16/05/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23022",
    "password": "16/05/2013"
  },
  {
    "admissionNo": "S23080",
    "name": "SHARON ROSE PAUL W",
    "gender": "Female",
    "dob": "17/07/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23080",
    "password": "17/07/2012"
  },
  {
    "admissionNo": "S23030",
    "name": "THEIVASENAA S",
    "gender": "Female",
    "dob": "07/05/2015",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23030",
    "password": "07/05/2015"
  },
  {
    "admissionNo": "S23105",
    "name": "VISHNU PRIYA S",
    "gender": "Female",
    "dob": "30/03/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23105",
    "password": "30/03/2013"
  },
  {
    "admissionNo": "S23033",
    "name": "AADHITHYA K",
    "gender": "Male",
    "dob": "13/04/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23033",
    "password": "13/04/2013"
  },
  {
    "admissionNo": "S23034",
    "name": "ARJUN J",
    "gender": "Male",
    "dob": "13/06/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23034",
    "password": "13/06/2012"
  },
  {
    "admissionNo": "S23087",
    "name": "DHARUN B",
    "gender": "Male",
    "dob": "13/06/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23087",
    "password": "13/06/2013"
  },
  {
    "admissionNo": "S23038",
    "name": "EMIL JOSIAH A",
    "gender": "Male",
    "dob": "17/01/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23038",
    "password": "17/01/2013"
  },
  {
    "admissionNo": "26906",
    "name": "HAMESH J",
    "gender": "Male",
    "dob": "21/06/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "26906",
    "password": "21/06/2012"
  },
  {
    "admissionNo": "S23044",
    "name": "IGNESH A",
    "gender": "Male",
    "dob": "28/07/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23044",
    "password": "28/07/2012"
  },
  {
    "admissionNo": "S23090",
    "name": "ISAAC SAMUEL J",
    "gender": "Male",
    "dob": "22/08/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23090",
    "password": "22/08/2012"
  },
  {
    "admissionNo": "S23045",
    "name": "JELIN SAMUEL L",
    "gender": "Male",
    "dob": "09/10/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23045",
    "password": "09/10/2012"
  },
  {
    "admissionNo": "S23049",
    "name": "JONES WESLEY V",
    "gender": "Male",
    "dob": "20/04/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23049",
    "password": "20/04/2013"
  },
  {
    "admissionNo": "S23050",
    "name": "JUSTIN ANTO S",
    "gender": "Male",
    "dob": "06/01/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23050",
    "password": "06/01/2012"
  },
  {
    "admissionNo": "S23115",
    "name": "KAILESH KUMARAN V",
    "gender": "Male",
    "dob": "20/06/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23115",
    "password": "20/06/2012"
  },
  {
    "admissionNo": "S23098",
    "name": "KARTHICK KAILASH R",
    "gender": "Male",
    "dob": "09/04/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23098",
    "password": "09/04/2012"
  },
  {
    "admissionNo": "S23052",
    "name": "KEERTHAN S S",
    "gender": "Male",
    "dob": "13/08/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23052",
    "password": "13/08/2013"
  },
  {
    "admissionNo": "S23053",
    "name": "KEVIN FINNLEY P",
    "gender": "Male",
    "dob": "20/09/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23053",
    "password": "20/09/2012"
  },
  {
    "admissionNo": "S23059",
    "name": "MUTHU HARISH A S",
    "gender": "Male",
    "dob": "05/02/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23059",
    "password": "05/02/2012"
  },
  {
    "admissionNo": "S23068",
    "name": "ROHITH M",
    "gender": "Male",
    "dob": "26/09/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23068",
    "password": "26/09/2012"
  },
  {
    "admissionNo": "S23069",
    "name": "RUPENDRA R",
    "gender": "Male",
    "dob": "06/01/2013",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23069",
    "password": "06/01/2013"
  },
  {
    "admissionNo": "S23110",
    "name": "SANTHOSH EPHRAIM E",
    "gender": "Male",
    "dob": "03/10/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23110",
    "password": "03/10/2012"
  },
  {
    "admissionNo": "S23102",
    "name": "SASHVIN A",
    "gender": "Male",
    "dob": "28/06/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23102",
    "password": "28/06/2012"
  },
  {
    "admissionNo": "S25131",
    "name": "SHANMUGAM M",
    "gender": "Male",
    "dob": "06/04/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S25131",
    "password": "06/04/2012"
  },
  {
    "admissionNo": "S23072",
    "name": "SHIVANESH S",
    "gender": "Male",
    "dob": "15/10/2012",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23072",
    "password": "15/10/2012"
  },
  {
    "admissionNo": "S23077",
    "name": "VAGEESH K",
    "gender": "Male",
    "dob": "20/04/2019",
    "classLevel": "IX",
    "section": "B",
    "classSec": "IX B",
    "examNumber": "S23077",
    "password": "20/04/2019"
  },
  {
    "admissionNo": "S23035",
    "name": "BEVIN G",
    "gender": "Male",
    "dob": "21/05/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23035",
    "password": "21/05/2013"
  },
  {
    "admissionNo": "S24095",
    "name": "ABISHA GRACIYA S",
    "gender": "Female",
    "dob": "02/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S24095",
    "password": "02/12/2012"
  },
  {
    "admissionNo": "S23009",
    "name": "HARINIKA R",
    "gender": "Female",
    "dob": "28/05/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23009",
    "password": "28/05/2013"
  },
  {
    "admissionNo": "26902",
    "name": "JERIN PRASANNA M",
    "gender": "Female",
    "dob": "25/08/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "26902",
    "password": "25/08/2012"
  },
  {
    "admissionNo": "S23013",
    "name": "KAVI VARSHA Y",
    "gender": "Female",
    "dob": "20/03/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23013",
    "password": "20/03/2012"
  },
  {
    "admissionNo": "S23116",
    "name": "KEERTHI M",
    "gender": "Female",
    "dob": "27/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23116",
    "password": "27/12/2012"
  },
  {
    "admissionNo": "S24078",
    "name": "LAKSHIKA JANAKI",
    "gender": "Female",
    "dob": "15/07/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S24078",
    "password": "15/07/2012"
  },
  {
    "admissionNo": "S24088",
    "name": "MUTHU BHARATHI D",
    "gender": "Female",
    "dob": "16/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S24088",
    "password": "16/12/2012"
  },
  {
    "admissionNo": "S23025",
    "name": "SRI PRATHIKA N",
    "gender": "Female",
    "dob": "09/04/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23025",
    "password": "09/04/2013"
  },
  {
    "admissionNo": "S23103",
    "name": "CHINNATHAMBI C S",
    "gender": "Male",
    "dob": "04/10/2011",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23103",
    "password": "04/10/2011"
  },
  {
    "admissionNo": "S23039",
    "name": "EVAN P",
    "gender": "Male",
    "dob": "15/10/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23039",
    "password": "15/10/2012"
  },
  {
    "admissionNo": "S25130",
    "name": "HARISARAN T",
    "gender": "Male",
    "dob": "06/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S25130",
    "password": "06/12/2012"
  },
  {
    "admissionNo": "S23043",
    "name": "HIRTHICK SARAN S",
    "gender": "Male",
    "dob": "11/06/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23043",
    "password": "11/06/2012"
  },
  {
    "admissionNo": "S23117",
    "name": "ILAMARAN M",
    "gender": "Male",
    "dob": "25/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23117",
    "password": "25/12/2012"
  },
  {
    "admissionNo": "S25143",
    "name": "JEYA RAM M",
    "gender": "Male",
    "dob": "04/07/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S25143",
    "password": "04/07/2012"
  },
  {
    "admissionNo": "S23108",
    "name": "KIRTHICK ROSHAN S",
    "gender": "Male",
    "dob": "02/05/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23108",
    "password": "02/05/2013"
  },
  {
    "admissionNo": "S23054",
    "name": "MADESH SABARI VASAN I",
    "gender": "Male",
    "dob": "20/03/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23054",
    "password": "20/03/2013"
  },
  {
    "admissionNo": "S23055",
    "name": "MAHARVIN M",
    "gender": "Male",
    "dob": "21/09/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23055",
    "password": "21/09/2012"
  },
  {
    "admissionNo": "S23061",
    "name": "PATHIRINATH K",
    "gender": "Male",
    "dob": "06/09/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23061",
    "password": "06/09/2012"
  },
  {
    "admissionNo": "S23064",
    "name": "RAMANATHAN R",
    "gender": "Male",
    "dob": "21/08/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23064",
    "password": "21/08/2012"
  },
  {
    "admissionNo": "S23065",
    "name": "RASOOL AHAMAD S",
    "gender": "Male",
    "dob": "10/05/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23065",
    "password": "10/05/2012"
  },
  {
    "admissionNo": "S23066",
    "name": "RITESH KANNAN B",
    "gender": "Male",
    "dob": "23/05/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23066",
    "password": "23/05/2013"
  },
  {
    "admissionNo": "S23067",
    "name": "RITHIYK S",
    "gender": "Male",
    "dob": "25/07/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23067",
    "password": "25/07/2012"
  },
  {
    "admissionNo": "S25132",
    "name": "SARAVANA RAJ N S",
    "gender": "Male",
    "dob": "01/09/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S25132",
    "password": "01/09/2012"
  },
  {
    "admissionNo": "S23071",
    "name": "SENTHIL KUMAR M",
    "gender": "Male",
    "dob": "13/08/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23071",
    "password": "13/08/2012"
  },
  {
    "admissionNo": "S23074",
    "name": "SREE PRANAV G",
    "gender": "Male",
    "dob": "07/09/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23074",
    "password": "07/09/2012"
  },
  {
    "admissionNo": "S23075",
    "name": "SREE SHANTH U",
    "gender": "Male",
    "dob": "25/10/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23075",
    "password": "25/10/2012"
  },
  {
    "admissionNo": "26908",
    "name": "SURESH L",
    "gender": "Male",
    "dob": "06/11/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "26908",
    "password": "06/11/2012"
  },
  {
    "admissionNo": "S23076",
    "name": "UTTHIN SANKAR R",
    "gender": "Male",
    "dob": "02/04/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23076",
    "password": "02/04/2013"
  },
  {
    "admissionNo": "S25133",
    "name": "VARSHAR P J",
    "gender": "Male",
    "dob": "11/10/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S25133",
    "password": "11/10/2012"
  },
  {
    "admissionNo": "S23078",
    "name": "VIGNESH KUMAR T",
    "gender": "Male",
    "dob": "09/08/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23078",
    "password": "09/08/2012"
  },
  {
    "admissionNo": "S23079",
    "name": "VISHNU R",
    "gender": "Male",
    "dob": "06/08/2013",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23079",
    "password": "06/08/2013"
  },
  {
    "admissionNo": "S23081",
    "name": "VISHVA A",
    "gender": "Male",
    "dob": "26/12/2012",
    "classLevel": "IX",
    "section": "C",
    "classSec": "IX C",
    "examNumber": "S23081",
    "password": "26/12/2012"
  },
  {
    "admissionNo": "261001",
    "name": "ABHINANDHAN P",
    "gender": "Male",
    "dob": "12/03/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10101",
    "password": "12/03/2011"
  },
  {
    "admissionNo": "261002",
    "name": "BHARATH S",
    "gender": "Male",
    "dob": "15/05/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10102",
    "password": "15/05/2011"
  },
  {
    "admissionNo": "261003",
    "name": "CHARAN RAJ M",
    "gender": "Male",
    "dob": "08/09/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10103",
    "password": "08/09/2011"
  },
  {
    "admissionNo": "261004",
    "name": "DHANUSH K",
    "gender": "Male",
    "dob": "19/07/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10104",
    "password": "19/07/2011"
  },
  {
    "admissionNo": "261005",
    "name": "HARISHWARAN S",
    "gender": "Male",
    "dob": "22/11/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10105",
    "password": "22/11/2011"
  },
  {
    "admissionNo": "261006",
    "name": "KAVIN M",
    "gender": "Male",
    "dob": "04/01/2012",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10106",
    "password": "04/01/2012"
  },
  {
    "admissionNo": "261007",
    "name": "MITHUN V",
    "gender": "Male",
    "dob": "14/06/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10107",
    "password": "14/06/2011"
  },
  {
    "admissionNo": "261008",
    "name": "NAVEEN S",
    "gender": "Male",
    "dob": "28/02/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10108",
    "password": "28/02/2011"
  },
  {
    "admissionNo": "261009",
    "name": "PRANAV M",
    "gender": "Male",
    "dob": "03/04/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10109",
    "password": "03/04/2011"
  },
  {
    "admissionNo": "261010",
    "name": "ROSHAN R",
    "gender": "Male",
    "dob": "11/10/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10110",
    "password": "11/10/2011"
  },
  {
    "admissionNo": "261011",
    "name": "AADHIRA S",
    "gender": "Female",
    "dob": "17/08/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10111",
    "password": "17/08/2011"
  },
  {
    "admissionNo": "261012",
    "name": "DEEPIKA M",
    "gender": "Female",
    "dob": "25/12/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10112",
    "password": "25/12/2011"
  },
  {
    "admissionNo": "261013",
    "name": "DIVYA BHARATHI K",
    "gender": "Female",
    "dob": "09/03/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10113",
    "password": "09/03/2011"
  },
  {
    "admissionNo": "261014",
    "name": "GOWRI S",
    "gender": "Female",
    "dob": "16/09/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10114",
    "password": "16/09/2011"
  },
  {
    "admissionNo": "261015",
    "name": "JANANI R",
    "gender": "Female",
    "dob": "02/05/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10115",
    "password": "02/05/2011"
  },
  {
    "admissionNo": "261016",
    "name": "KEERTHANA S",
    "gender": "Female",
    "dob": "18/11/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10116",
    "password": "18/11/2011"
  },
  {
    "admissionNo": "261017",
    "name": "LAVANYA M",
    "gender": "Female",
    "dob": "07/07/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10117",
    "password": "07/07/2011"
  },
  {
    "admissionNo": "261018",
    "name": "MADHUMITHA T",
    "gender": "Female",
    "dob": "29/01/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10118",
    "password": "29/01/2011"
  },
  {
    "admissionNo": "261019",
    "name": "NIVETHA P",
    "gender": "Female",
    "dob": "12/04/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10119",
    "password": "12/04/2011"
  },
  {
    "admissionNo": "261020",
    "name": "SNEHA K",
    "gender": "Female",
    "dob": "20/10/2011",
    "classLevel": "X",
    "section": "A",
    "classSec": "X A",
    "examNumber": "10120",
    "password": "20/10/2011"
  },
  {
    "admissionNo": "261021",
    "name": "ANAND K",
    "gender": "Male",
    "dob": "14/02/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10201",
    "password": "14/02/2011"
  },
  {
    "admissionNo": "261022",
    "name": "BALAJI R",
    "gender": "Male",
    "dob": "05/06/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10202",
    "password": "05/06/2011"
  },
  {
    "admissionNo": "261023",
    "name": "DINESH S",
    "gender": "Male",
    "dob": "18/08/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10203",
    "password": "18/08/2011"
  },
  {
    "admissionNo": "261024",
    "name": "GOKUL P",
    "gender": "Male",
    "dob": "23/11/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10204",
    "password": "23/11/2011"
  },
  {
    "admissionNo": "261025",
    "name": "HEMANTH M",
    "gender": "Male",
    "dob": "09/01/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10205",
    "password": "09/01/2011"
  },
  {
    "admissionNo": "261026",
    "name": "KISHORE T",
    "gender": "Male",
    "dob": "30/03/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10206",
    "password": "30/03/2011"
  },
  {
    "admissionNo": "261027",
    "name": "MUKESH V",
    "gender": "Male",
    "dob": "16/07/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10207",
    "password": "16/07/2011"
  },
  {
    "admissionNo": "261028",
    "name": "PRAVEEN S",
    "gender": "Male",
    "dob": "21/09/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10208",
    "password": "21/09/2011"
  },
  {
    "admissionNo": "261029",
    "name": "SANTHOSH K",
    "gender": "Male",
    "dob": "11/12/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10209",
    "password": "11/12/2011"
  },
  {
    "admissionNo": "261030",
    "name": "VIJAY R",
    "gender": "Male",
    "dob": "04/05/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10210",
    "password": "04/05/2011"
  },
  {
    "admissionNo": "261031",
    "name": "ANITHA M",
    "gender": "Female",
    "dob": "19/04/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10211",
    "password": "19/04/2011"
  },
  {
    "admissionNo": "261032",
    "name": "BHUVANA S",
    "gender": "Female",
    "dob": "28/06/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10212",
    "password": "28/06/2011"
  },
  {
    "admissionNo": "261033",
    "name": "DHARINI P",
    "gender": "Female",
    "dob": "15/09/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10213",
    "password": "15/09/2011"
  },
  {
    "admissionNo": "261034",
    "name": "HARINI R",
    "gender": "Female",
    "dob": "08/12/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10214",
    "password": "08/12/2011"
  },
  {
    "admissionNo": "261035",
    "name": "KAVITHA T",
    "gender": "Female",
    "dob": "17/02/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10215",
    "password": "17/02/2011"
  },
  {
    "admissionNo": "261036",
    "name": "MONISHA V",
    "gender": "Female",
    "dob": "24/05/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10216",
    "password": "24/05/2011"
  },
  {
    "admissionNo": "261037",
    "name": "NANDHINI S",
    "gender": "Female",
    "dob": "03/08/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10217",
    "password": "03/08/2011"
  },
  {
    "admissionNo": "261038",
    "name": "PRIYA K",
    "gender": "Female",
    "dob": "12/10/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10218",
    "password": "12/10/2011"
  },
  {
    "admissionNo": "261039",
    "name": "SARANYA M",
    "gender": "Female",
    "dob": "06/01/2012",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10219",
    "password": "06/01/2012"
  },
  {
    "admissionNo": "261040",
    "name": "VARSHA R",
    "gender": "Female",
    "dob": "22/03/2011",
    "classLevel": "X",
    "section": "B",
    "classSec": "X B",
    "examNumber": "10220",
    "password": "22/03/2011"
  },
  {
    "admissionNo": "261041",
    "name": "ARUL M",
    "gender": "Male",
    "dob": "10/01/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10301",
    "password": "10/01/2011"
  },
  {
    "admissionNo": "261042",
    "name": "CHANDRU S",
    "gender": "Male",
    "dob": "25/03/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10302",
    "password": "25/03/2011"
  },
  {
    "admissionNo": "261043",
    "name": "DEEPAK R",
    "gender": "Male",
    "dob": "14/06/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10303",
    "password": "14/06/2011"
  },
  {
    "admissionNo": "261044",
    "name": "GURURAJ P",
    "gender": "Male",
    "dob": "19/08/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10304",
    "password": "19/08/2011"
  },
  {
    "admissionNo": "261045",
    "name": "KARTHIK T",
    "gender": "Male",
    "dob": "02/11/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10305",
    "password": "02/11/2011"
  },
  {
    "admissionNo": "261046",
    "name": "MANIKANDAN V",
    "gender": "Male",
    "dob": "11/12/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10306",
    "password": "11/12/2011"
  },
  {
    "admissionNo": "261047",
    "name": "PRADEEP S",
    "gender": "Male",
    "dob": "05/02/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10307",
    "password": "05/02/2011"
  },
  {
    "admissionNo": "261048",
    "name": "RANJITH K",
    "gender": "Male",
    "dob": "29/04/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10308",
    "password": "29/04/2011"
  },
  {
    "admissionNo": "261049",
    "name": "SARAVANAN M",
    "gender": "Male",
    "dob": "17/07/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10309",
    "password": "17/07/2011"
  },
  {
    "admissionNo": "261050",
    "name": "VIGNESH R",
    "gender": "Male",
    "dob": "21/09/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10310",
    "password": "21/09/2011"
  },
  {
    "admissionNo": "261051",
    "name": "AARTHI S",
    "gender": "Female",
    "dob": "13/02/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10311",
    "password": "13/02/2011"
  },
  {
    "admissionNo": "261052",
    "name": "DEVIKA P",
    "gender": "Female",
    "dob": "27/04/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10312",
    "password": "27/04/2011"
  },
  {
    "admissionNo": "261053",
    "name": "GAYATHRI M",
    "gender": "Female",
    "dob": "08/07/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10313",
    "password": "08/07/2011"
  },
  {
    "admissionNo": "261054",
    "name": "ISHWARYA R",
    "gender": "Female",
    "dob": "15/09/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10314",
    "password": "15/09/2011"
  },
  {
    "admissionNo": "261055",
    "name": "KALYANI T",
    "gender": "Female",
    "dob": "30/11/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10315",
    "password": "30/11/2011"
  },
  {
    "admissionNo": "261056",
    "name": "MEENA V",
    "gender": "Female",
    "dob": "18/01/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10316",
    "password": "18/01/2011"
  },
  {
    "admissionNo": "261057",
    "name": "NIVEDITHA S",
    "gender": "Female",
    "dob": "22/03/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10317",
    "password": "22/03/2011"
  },
  {
    "admissionNo": "261058",
    "name": "PAVITHRA K",
    "gender": "Female",
    "dob": "09/06/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10318",
    "password": "09/06/2011"
  },
  {
    "admissionNo": "261059",
    "name": "SANGEETHA M",
    "gender": "Female",
    "dob": "14/08/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10319",
    "password": "14/08/2011"
  },
  {
    "admissionNo": "261060",
    "name": "VINODHINI R",
    "gender": "Female",
    "dob": "03/12/2011",
    "classLevel": "X",
    "section": "C",
    "classSec": "X C",
    "examNumber": "10320",
    "password": "03/12/2011"
  },
  {
    "admissionNo": "261061",
    "name": "AJITH KUMAR S",
    "gender": "Male",
    "dob": "12/02/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10401",
    "password": "12/02/2011"
  },
  {
    "admissionNo": "261062",
    "name": "BHUVANESH M",
    "gender": "Male",
    "dob": "28/05/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10402",
    "password": "28/05/2011"
  },
  {
    "admissionNo": "261063",
    "name": "DILIP R",
    "gender": "Male",
    "dob": "19/08/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10403",
    "password": "19/08/2011"
  },
  {
    "admissionNo": "261064",
    "name": "HARIPRASAD T",
    "gender": "Male",
    "dob": "04/11/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10404",
    "password": "04/11/2011"
  },
  {
    "admissionNo": "261065",
    "name": "LOGESH P",
    "gender": "Male",
    "dob": "16/01/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10405",
    "password": "16/01/2011"
  },
  {
    "admissionNo": "261066",
    "name": "NITHIN K",
    "gender": "Male",
    "dob": "23/04/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10406",
    "password": "23/04/2011"
  },
  {
    "admissionNo": "261067",
    "name": "RAGHAVAN S",
    "gender": "Male",
    "dob": "10/07/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10407",
    "password": "10/07/2011"
  },
  {
    "admissionNo": "261068",
    "name": "SANTHOSH RAJ V",
    "gender": "Male",
    "dob": "15/09/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10408",
    "password": "15/09/2011"
  },
  {
    "admissionNo": "261069",
    "name": "SURIYA M",
    "gender": "Male",
    "dob": "01/12/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10409",
    "password": "01/12/2011"
  },
  {
    "admissionNo": "261070",
    "name": "YOGESH R",
    "gender": "Male",
    "dob": "20/03/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10410",
    "password": "20/03/2011"
  },
  {
    "admissionNo": "261071",
    "name": "ARCHANA S",
    "gender": "Female",
    "dob": "11/04/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10411",
    "password": "11/04/2011"
  },
  {
    "admissionNo": "261072",
    "name": "DHANYA P",
    "gender": "Female",
    "dob": "26/06/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10412",
    "password": "26/06/2011"
  },
  {
    "admissionNo": "261073",
    "name": "HEMALATHA M",
    "gender": "Female",
    "dob": "17/09/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10413",
    "password": "17/09/2011"
  },
  {
    "admissionNo": "261074",
    "name": "KEERTHI R",
    "gender": "Female",
    "dob": "08/11/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10414",
    "password": "08/11/2011"
  },
  {
    "admissionNo": "261075",
    "name": "MALATHI T",
    "gender": "Female",
    "dob": "24/01/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10415",
    "password": "24/01/2011"
  },
  {
    "admissionNo": "261076",
    "name": "NANDITA V",
    "gender": "Female",
    "dob": "19/05/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10416",
    "password": "19/05/2011"
  },
  {
    "admissionNo": "261077",
    "name": "POOJA S",
    "gender": "Female",
    "dob": "14/08/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10417",
    "password": "14/08/2011"
  },
  {
    "admissionNo": "261078",
    "name": "RAMYA K",
    "gender": "Female",
    "dob": "29/10/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10418",
    "password": "29/10/2011"
  },
  {
    "admissionNo": "261079",
    "name": "SNEHAPRIYA M",
    "gender": "Female",
    "dob": "05/12/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10419",
    "password": "05/12/2011"
  },
  {
    "admissionNo": "261080",
    "name": "VAISHNAVI R",
    "gender": "Female",
    "dob": "18/02/2011",
    "classLevel": "X",
    "section": "D",
    "classSec": "X D",
    "examNumber": "10420",
    "password": "18/02/2011"
  },
  {
    "admissionNo": "261101",
    "name": "AKASH S",
    "gender": "Male",
    "dob": "14/03/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11101",
    "password": "14/03/2010"
  },
  {
    "admissionNo": "261102",
    "name": "BHARANIDHARAN M",
    "gender": "Male",
    "dob": "20/06/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11102",
    "password": "20/06/2010"
  },
  {
    "admissionNo": "261103",
    "name": "CHANDRASHEKAR R",
    "gender": "Male",
    "dob": "11/09/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11103",
    "password": "11/09/2010"
  },
  {
    "admissionNo": "261104",
    "name": "DINESH KUMAR P",
    "gender": "Male",
    "dob": "25/11/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11104",
    "password": "25/11/2010"
  },
  {
    "admissionNo": "261105",
    "name": "HARIHARAN T",
    "gender": "Male",
    "dob": "08/02/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11105",
    "password": "08/02/2010"
  },
  {
    "admissionNo": "261106",
    "name": "KISHORE KUMAR V",
    "gender": "Male",
    "dob": "19/04/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11106",
    "password": "19/04/2010"
  },
  {
    "admissionNo": "261107",
    "name": "MANOJ KUMAR S",
    "gender": "Male",
    "dob": "30/07/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11107",
    "password": "30/07/2010"
  },
  {
    "admissionNo": "261108",
    "name": "PRAKASH K",
    "gender": "Male",
    "dob": "12/10/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11108",
    "password": "12/10/2010"
  },
  {
    "admissionNo": "261109",
    "name": "SARAVANAN M",
    "gender": "Male",
    "dob": "23/12/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11109",
    "password": "23/12/2010"
  },
  {
    "admissionNo": "261110",
    "name": "VIGNESHWARAN R",
    "gender": "Male",
    "dob": "05/05/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11110",
    "password": "05/05/2010"
  },
  {
    "admissionNo": "261111",
    "name": "ANANYA S",
    "gender": "Female",
    "dob": "16/01/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11111",
    "password": "16/01/2010"
  },
  {
    "admissionNo": "261112",
    "name": "BHUVANESHWARI P",
    "gender": "Female",
    "dob": "28/03/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11112",
    "password": "28/03/2010"
  },
  {
    "admissionNo": "261113",
    "name": "DEVI M",
    "gender": "Female",
    "dob": "09/07/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11113",
    "password": "09/07/2010"
  },
  {
    "admissionNo": "261114",
    "name": "HARITHA R",
    "gender": "Female",
    "dob": "22/09/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11114",
    "password": "22/09/2010"
  },
  {
    "admissionNo": "261115",
    "name": "KALAISELVI T",
    "gender": "Female",
    "dob": "14/11/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11115",
    "password": "14/11/2010"
  },
  {
    "admissionNo": "261116",
    "name": "MADHUMITHA V",
    "gender": "Female",
    "dob": "03/02/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11116",
    "password": "03/02/2010"
  },
  {
    "admissionNo": "261117",
    "name": "NANDHINI S",
    "gender": "Female",
    "dob": "17/05/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11117",
    "password": "17/05/2010"
  },
  {
    "admissionNo": "261118",
    "name": "PRIYANKA K",
    "gender": "Female",
    "dob": "29/08/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11118",
    "password": "29/08/2010"
  },
  {
    "admissionNo": "261119",
    "name": "SANDHYA M",
    "gender": "Female",
    "dob": "10/11/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11119",
    "password": "10/11/2010"
  },
  {
    "admissionNo": "261120",
    "name": "VINITHA R",
    "gender": "Female",
    "dob": "24/12/2010",
    "classLevel": "XI",
    "section": "A",
    "classSec": "XI A",
    "examNumber": "11120",
    "password": "24/12/2010"
  },
  {
    "admissionNo": "261121",
    "name": "AJAY P",
    "gender": "Male",
    "dob": "15/02/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11201",
    "password": "15/02/2010"
  },
  {
    "admissionNo": "261122",
    "name": "BALAKRISHNAN S",
    "gender": "Male",
    "dob": "26/04/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11202",
    "password": "26/04/2010"
  },
  {
    "admissionNo": "261123",
    "name": "DHILIP M",
    "gender": "Male",
    "dob": "08/08/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11203",
    "password": "08/08/2010"
  },
  {
    "admissionNo": "261124",
    "name": "GOWTHAM R",
    "gender": "Male",
    "dob": "19/10/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11204",
    "password": "19/10/2010"
  },
  {
    "admissionNo": "261125",
    "name": "JAGAN T",
    "gender": "Male",
    "dob": "04/01/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11205",
    "password": "04/01/2010"
  },
  {
    "admissionNo": "261126",
    "name": "KARTHIKEYAN V",
    "gender": "Male",
    "dob": "18/03/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11206",
    "password": "18/03/2010"
  },
  {
    "admissionNo": "261127",
    "name": "MOHAN S",
    "gender": "Male",
    "dob": "29/06/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11207",
    "password": "29/06/2010"
  },
  {
    "admissionNo": "261128",
    "name": "PRASANTH K",
    "gender": "Male",
    "dob": "11/09/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11208",
    "password": "11/09/2010"
  },
  {
    "admissionNo": "261129",
    "name": "SANJAY M",
    "gender": "Male",
    "dob": "22/11/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11209",
    "password": "22/11/2010"
  },
  {
    "admissionNo": "261130",
    "name": "YUVARAJ R",
    "gender": "Male",
    "dob": "07/12/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11210",
    "password": "07/12/2010"
  },
  {
    "admissionNo": "261131",
    "name": "AISHWARYA S",
    "gender": "Female",
    "dob": "13/03/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11211",
    "password": "13/03/2010"
  },
  {
    "admissionNo": "261132",
    "name": "CHARULATHA P",
    "gender": "Female",
    "dob": "25/05/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11212",
    "password": "25/05/2010"
  },
  {
    "admissionNo": "261133",
    "name": "DIVYASREE M",
    "gender": "Female",
    "dob": "06/09/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11213",
    "password": "06/09/2010"
  },
  {
    "admissionNo": "261134",
    "name": "HEMAPRIYA R",
    "gender": "Female",
    "dob": "18/11/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11214",
    "password": "18/11/2010"
  },
  {
    "admissionNo": "261135",
    "name": "KAVIPRIYA T",
    "gender": "Female",
    "dob": "02/01/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11215",
    "password": "02/01/2010"
  },
  {
    "admissionNo": "261136",
    "name": "MONIKA V",
    "gender": "Female",
    "dob": "15/04/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11216",
    "password": "15/04/2010"
  },
  {
    "admissionNo": "261137",
    "name": "NITHYA S",
    "gender": "Female",
    "dob": "27/07/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11217",
    "password": "27/07/2010"
  },
  {
    "admissionNo": "261138",
    "name": "RITHIKA K",
    "gender": "Female",
    "dob": "09/10/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11218",
    "password": "09/10/2010"
  },
  {
    "admissionNo": "261139",
    "name": "SWETHA M",
    "gender": "Female",
    "dob": "20/12/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11219",
    "password": "20/12/2010"
  },
  {
    "admissionNo": "261140",
    "name": "YAMUNA R",
    "gender": "Female",
    "dob": "31/12/2010",
    "classLevel": "XI",
    "section": "B",
    "classSec": "XI B",
    "examNumber": "11220",
    "password": "31/12/2010"
  },
  {
    "admissionNo": "261141",
    "name": "ARUN KUMAR S",
    "gender": "Male",
    "dob": "17/01/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11301",
    "password": "17/01/2010"
  },
  {
    "admissionNo": "261142",
    "name": "BOOPATHI P",
    "gender": "Male",
    "dob": "29/03/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11302",
    "password": "29/03/2010"
  },
  {
    "admissionNo": "261143",
    "name": "DHINESH M",
    "gender": "Male",
    "dob": "10/06/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11303",
    "password": "10/06/2010"
  },
  {
    "admissionNo": "261144",
    "name": "HEMANT R",
    "gender": "Male",
    "dob": "22/08/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11304",
    "password": "22/08/2010"
  },
  {
    "admissionNo": "261145",
    "name": "KABILAN T",
    "gender": "Male",
    "dob": "03/11/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11305",
    "password": "03/11/2010"
  },
  {
    "admissionNo": "261146",
    "name": "LOKESH V",
    "gender": "Male",
    "dob": "16/12/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11306",
    "password": "16/12/2010"
  },
  {
    "admissionNo": "261147",
    "name": "NAVEEN RAJ S",
    "gender": "Male",
    "dob": "28/02/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11307",
    "password": "28/02/2010"
  },
  {
    "admissionNo": "261148",
    "name": "PRAVEEN RAJ K",
    "gender": "Male",
    "dob": "12/05/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11308",
    "password": "12/05/2010"
  },
  {
    "admissionNo": "261149",
    "name": "SARATH M",
    "gender": "Male",
    "dob": "24/07/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11309",
    "password": "24/07/2010"
  },
  {
    "admissionNo": "261150",
    "name": "VIKRAM R",
    "gender": "Male",
    "dob": "06/10/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11310",
    "password": "06/10/2010"
  },
  {
    "admissionNo": "261151",
    "name": "ANUSHKA S",
    "gender": "Female",
    "dob": "19/02/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11311",
    "password": "19/02/2010"
  },
  {
    "admissionNo": "261152",
    "name": "DEEPALAKSHMI P",
    "gender": "Female",
    "dob": "30/04/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11312",
    "password": "30/04/2010"
  },
  {
    "admissionNo": "261153",
    "name": "GAYATHRI DEVI M",
    "gender": "Female",
    "dob": "12/08/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11313",
    "password": "12/08/2010"
  },
  {
    "admissionNo": "261154",
    "name": "JANANI SREE R",
    "gender": "Female",
    "dob": "23/10/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11314",
    "password": "23/10/2010"
  },
  {
    "admissionNo": "261155",
    "name": "KEERTHI VASAN T",
    "gender": "Female",
    "dob": "05/12/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11315",
    "password": "05/12/2010"
  },
  {
    "admissionNo": "261156",
    "name": "MEENAKSHI V",
    "gender": "Female",
    "dob": "18/03/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11316",
    "password": "18/03/2010"
  },
  {
    "admissionNo": "261157",
    "name": "NIVEDHA S",
    "gender": "Female",
    "dob": "29/06/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11317",
    "password": "29/06/2010"
  },
  {
    "admissionNo": "261158",
    "name": "PRIYADHARSHINI K",
    "gender": "Female",
    "dob": "11/09/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11318",
    "password": "11/09/2010"
  },
  {
    "admissionNo": "261159",
    "name": "SHANMUGAPRIYA M",
    "gender": "Female",
    "dob": "23/11/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11319",
    "password": "23/11/2010"
  },
  {
    "admissionNo": "261160",
    "name": "VARSHINI R",
    "gender": "Female",
    "dob": "04/12/2010",
    "classLevel": "XI",
    "section": "C",
    "classSec": "XI C",
    "examNumber": "11320",
    "password": "04/12/2010"
  },
  {
    "admissionNo": "261161",
    "name": "ANBU S",
    "gender": "Male",
    "dob": "15/01/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11401",
    "password": "15/01/2010"
  },
  {
    "admissionNo": "261162",
    "name": "CHETAN P",
    "gender": "Male",
    "dob": "26/03/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11402",
    "password": "26/03/2010"
  },
  {
    "admissionNo": "261163",
    "name": "GOKULRAJ M",
    "gender": "Male",
    "dob": "08/07/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11403",
    "password": "08/07/2010"
  },
  {
    "admissionNo": "261164",
    "name": "JEEVA ANAND R",
    "gender": "Male",
    "dob": "20/09/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11404",
    "password": "20/09/2010"
  },
  {
    "admissionNo": "261165",
    "name": "KIRUBAKARAN T",
    "gender": "Male",
    "dob": "01/12/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11405",
    "password": "01/12/2010"
  },
  {
    "admissionNo": "261166",
    "name": "MADHAVAN V",
    "gender": "Male",
    "dob": "14/02/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11406",
    "password": "14/02/2010"
  },
  {
    "admissionNo": "261167",
    "name": "NITHISH S",
    "gender": "Male",
    "dob": "27/05/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11407",
    "password": "27/05/2010"
  },
  {
    "admissionNo": "261168",
    "name": "RAGUL K",
    "gender": "Male",
    "dob": "09/08/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11408",
    "password": "09/08/2010"
  },
  {
    "admissionNo": "261169",
    "name": "SATHISH M",
    "gender": "Male",
    "dob": "21/10/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11409",
    "password": "21/10/2010"
  },
  {
    "admissionNo": "261170",
    "name": "VIJAYAKUMAR R",
    "gender": "Male",
    "dob": "03/12/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11410",
    "password": "03/12/2010"
  },
  {
    "admissionNo": "261171",
    "name": "ABIRAMI S",
    "gender": "Female",
    "dob": "16/04/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11411",
    "password": "16/04/2010"
  },
  {
    "admissionNo": "261172",
    "name": "DHARSHINI P",
    "gender": "Female",
    "dob": "28/06/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11412",
    "password": "28/06/2010"
  },
  {
    "admissionNo": "261173",
    "name": "HARINI DEVI M",
    "gender": "Female",
    "dob": "10/09/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11413",
    "password": "10/09/2010"
  },
  {
    "admissionNo": "261174",
    "name": "KALAIVANI R",
    "gender": "Female",
    "dob": "22/11/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11414",
    "password": "22/11/2010"
  },
  {
    "admissionNo": "261175",
    "name": "LAVANYA SREE T",
    "gender": "Female",
    "dob": "03/01/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11415",
    "password": "03/01/2010"
  },
  {
    "admissionNo": "261176",
    "name": "MONISHA DEVI V",
    "gender": "Female",
    "dob": "17/03/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11416",
    "password": "17/03/2010"
  },
  {
    "admissionNo": "261177",
    "name": "PAVITHRA S",
    "gender": "Female",
    "dob": "29/05/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11417",
    "password": "29/05/2010"
  },
  {
    "admissionNo": "261178",
    "name": "RAMYA KRISHNAN K",
    "gender": "Female",
    "dob": "11/08/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11418",
    "password": "11/08/2010"
  },
  {
    "admissionNo": "261179",
    "name": "SUBASHREE M",
    "gender": "Female",
    "dob": "24/10/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11419",
    "password": "24/10/2010"
  },
  {
    "admissionNo": "261180",
    "name": "YUVASHREE R",
    "gender": "Female",
    "dob": "05/12/2010",
    "classLevel": "XI",
    "section": "D",
    "classSec": "XI D",
    "examNumber": "11420",
    "password": "05/12/2010"
  },
  {
    "admissionNo": "261201",
    "name": "ASHWIN S",
    "gender": "Male",
    "dob": "12/02/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12101",
    "password": "12/02/2009"
  },
  {
    "admissionNo": "261202",
    "name": "BHARATHWAJ M",
    "gender": "Male",
    "dob": "24/04/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12102",
    "password": "24/04/2009"
  },
  {
    "admissionNo": "261203",
    "name": "DILIPAN R",
    "gender": "Male",
    "dob": "06/07/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12103",
    "password": "06/07/2009"
  },
  {
    "admissionNo": "261204",
    "name": "GOKULNATH P",
    "gender": "Male",
    "dob": "18/09/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12104",
    "password": "18/09/2009"
  },
  {
    "admissionNo": "261205",
    "name": "HEMANTH KUMAR T",
    "gender": "Male",
    "dob": "30/11/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12105",
    "password": "30/11/2009"
  },
  {
    "admissionNo": "261206",
    "name": "KISHORE RAJ V",
    "gender": "Male",
    "dob": "11/01/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12106",
    "password": "11/01/2009"
  },
  {
    "admissionNo": "261207",
    "name": "MANOJ S",
    "gender": "Male",
    "dob": "23/03/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12107",
    "password": "23/03/2009"
  },
  {
    "admissionNo": "261208",
    "name": "PRASANNA K",
    "gender": "Male",
    "dob": "05/06/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12108",
    "password": "05/06/2009"
  },
  {
    "admissionNo": "261209",
    "name": "SANTHOSHKUMAR M",
    "gender": "Male",
    "dob": "17/08/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12109",
    "password": "17/08/2009"
  },
  {
    "admissionNo": "261210",
    "name": "VIGNESHKUMAR R",
    "gender": "Male",
    "dob": "29/10/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12110",
    "password": "29/10/2009"
  },
  {
    "admissionNo": "261211",
    "name": "AKSHAYA S",
    "gender": "Female",
    "dob": "10/01/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12111",
    "password": "10/01/2009"
  },
  {
    "admissionNo": "261212",
    "name": "BHUVANA DEVI P",
    "gender": "Female",
    "dob": "22/03/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12112",
    "password": "22/03/2009"
  },
  {
    "admissionNo": "261213",
    "name": "DIVYA DHARSHINI M",
    "gender": "Female",
    "dob": "04/06/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12113",
    "password": "04/06/2009"
  },
  {
    "admissionNo": "261214",
    "name": "HARINI SREE R",
    "gender": "Female",
    "dob": "16/08/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12114",
    "password": "16/08/2009"
  },
  {
    "admissionNo": "261215",
    "name": "KAVYA T",
    "gender": "Female",
    "dob": "28/10/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12115",
    "password": "28/10/2009"
  },
  {
    "admissionNo": "261216",
    "name": "MADHUMITHA SREE V",
    "gender": "Female",
    "dob": "10/12/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12116",
    "password": "10/12/2009"
  },
  {
    "admissionNo": "261217",
    "name": "NANDITHA S",
    "gender": "Female",
    "dob": "21/02/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12117",
    "password": "21/02/2009"
  },
  {
    "admissionNo": "261218",
    "name": "PRIYANKA DEVI K",
    "gender": "Female",
    "dob": "04/05/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12118",
    "password": "04/05/2009"
  },
  {
    "admissionNo": "261219",
    "name": "SARANYA DEVI M",
    "gender": "Female",
    "dob": "16/07/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12119",
    "password": "16/07/2009"
  },
  {
    "admissionNo": "261220",
    "name": "VARSHA SREE R",
    "gender": "Female",
    "dob": "28/09/2009",
    "classLevel": "XII",
    "section": "A",
    "classSec": "XII A",
    "examNumber": "12120",
    "password": "28/09/2009"
  },
  {
    "admissionNo": "261221",
    "name": "AJAY KUMAR S",
    "gender": "Male",
    "dob": "13/01/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12201",
    "password": "13/01/2009"
  },
  {
    "admissionNo": "261222",
    "name": "CHANDRAMOULI P",
    "gender": "Male",
    "dob": "25/03/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12202",
    "password": "25/03/2009"
  },
  {
    "admissionNo": "261223",
    "name": "DINESH RAJ M",
    "gender": "Male",
    "dob": "07/06/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12203",
    "password": "07/06/2009"
  },
  {
    "admissionNo": "261224",
    "name": "HARI PRASATH R",
    "gender": "Male",
    "dob": "19/08/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12204",
    "password": "19/08/2009"
  },
  {
    "admissionNo": "261225",
    "name": "KABILESH T",
    "gender": "Male",
    "dob": "01/11/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12205",
    "password": "01/11/2009"
  },
  {
    "admissionNo": "261226",
    "name": "LOKESHKUMAR V",
    "gender": "Male",
    "dob": "14/12/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12206",
    "password": "14/12/2009"
  },
  {
    "admissionNo": "261227",
    "name": "NAVIN S",
    "gender": "Male",
    "dob": "26/02/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12207",
    "password": "26/02/2009"
  },
  {
    "admissionNo": "261228",
    "name": "PRAVEENKUMAR K",
    "gender": "Male",
    "dob": "10/05/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12208",
    "password": "10/05/2009"
  },
  {
    "admissionNo": "261229",
    "name": "SARAN M",
    "gender": "Male",
    "dob": "22/07/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12209",
    "password": "22/07/2009"
  },
  {
    "admissionNo": "261230",
    "name": "VIKRAMAN R",
    "gender": "Male",
    "dob": "03/10/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12210",
    "password": "03/10/2009"
  },
  {
    "admissionNo": "261231",
    "name": "ANJANA S",
    "gender": "Female",
    "dob": "15/02/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12211",
    "password": "15/02/2009"
  },
  {
    "admissionNo": "261232",
    "name": "DEVI PRIYA P",
    "gender": "Female",
    "dob": "27/04/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12212",
    "password": "27/04/2009"
  },
  {
    "admissionNo": "261233",
    "name": "GAYATHRI SREE M",
    "gender": "Female",
    "dob": "09/07/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12213",
    "password": "09/07/2009"
  },
  {
    "admissionNo": "261234",
    "name": "JANANI DEVI R",
    "gender": "Female",
    "dob": "21/09/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12214",
    "password": "21/09/2009"
  },
  {
    "admissionNo": "261235",
    "name": "KEERTHIKA T",
    "gender": "Female",
    "dob": "02/12/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12215",
    "password": "02/12/2009"
  },
  {
    "admissionNo": "261236",
    "name": "MEGHA V",
    "gender": "Female",
    "dob": "14/01/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12216",
    "password": "14/01/2009"
  },
  {
    "admissionNo": "261237",
    "name": "NIVEDITHA SREE S",
    "gender": "Female",
    "dob": "26/03/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12217",
    "password": "26/03/2009"
  },
  {
    "admissionNo": "261238",
    "name": "PRIYASREE K",
    "gender": "Female",
    "dob": "08/06/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12218",
    "password": "08/06/2009"
  },
  {
    "admissionNo": "261239",
    "name": "SHARMILA M",
    "gender": "Female",
    "dob": "20/08/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12219",
    "password": "20/08/2009"
  },
  {
    "admissionNo": "261240",
    "name": "VINODHINI SREE R",
    "gender": "Female",
    "dob": "01/11/2009",
    "classLevel": "XII",
    "section": "B",
    "classSec": "XII B",
    "examNumber": "12220",
    "password": "01/11/2009"
  },
  {
    "admissionNo": "261241",
    "name": "ARULSELVAN S",
    "gender": "Male",
    "dob": "16/01/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12301",
    "password": "16/01/2009"
  },
  {
    "admissionNo": "261242",
    "name": "DEEPAN P",
    "gender": "Male",
    "dob": "28/03/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12302",
    "password": "28/03/2009"
  },
  {
    "admissionNo": "261243",
    "name": "GIRIDHARAN M",
    "gender": "Male",
    "dob": "09/06/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12303",
    "password": "09/06/2009"
  },
  {
    "admissionNo": "261244",
    "name": "HEMCHANDAR R",
    "gender": "Male",
    "dob": "21/08/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12304",
    "password": "21/08/2009"
  },
  {
    "admissionNo": "261245",
    "name": "KARTHIK RAJ T",
    "gender": "Male",
    "dob": "02/11/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12305",
    "password": "02/11/2009"
  },
  {
    "admissionNo": "261246",
    "name": "MANIKANDAPRABHU V",
    "gender": "Male",
    "dob": "15/12/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12306",
    "password": "15/12/2009"
  },
  {
    "admissionNo": "261247",
    "name": "NITHEESH S",
    "gender": "Male",
    "dob": "27/02/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12307",
    "password": "27/02/2009"
  },
  {
    "admissionNo": "261248",
    "name": "RAGHURAM K",
    "gender": "Male",
    "dob": "11/05/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12308",
    "password": "11/05/2009"
  },
  {
    "admissionNo": "261249",
    "name": "SATHISHKUMAR M",
    "gender": "Male",
    "dob": "23/07/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12309",
    "password": "23/07/2009"
  },
  {
    "admissionNo": "261250",
    "name": "VIJAYARAGHAVAN R",
    "gender": "Male",
    "dob": "04/10/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12310",
    "password": "04/10/2009"
  },
  {
    "admissionNo": "261251",
    "name": "ABIRAMASUNDARI S",
    "gender": "Female",
    "dob": "18/02/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12311",
    "password": "18/02/2009"
  },
  {
    "admissionNo": "261252",
    "name": "DHARANIPRIYA P",
    "gender": "Female",
    "dob": "30/04/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12312",
    "password": "30/04/2009"
  },
  {
    "admissionNo": "261253",
    "name": "HARIPRIYA M",
    "gender": "Female",
    "dob": "12/07/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12313",
    "password": "12/07/2009"
  },
  {
    "admissionNo": "261254",
    "name": "KAVIYARASI R",
    "gender": "Female",
    "dob": "24/09/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12314",
    "password": "24/09/2009"
  },
  {
    "admissionNo": "261255",
    "name": "LALITHA T",
    "gender": "Female",
    "dob": "06/12/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12315",
    "password": "06/12/2009"
  },
  {
    "admissionNo": "261256",
    "name": "MONISHASREE V",
    "gender": "Female",
    "dob": "17/01/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12316",
    "password": "17/01/2009"
  },
  {
    "admissionNo": "261257",
    "name": "PAVITHRASREE S",
    "gender": "Female",
    "dob": "29/03/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12317",
    "password": "29/03/2009"
  },
  {
    "admissionNo": "261258",
    "name": "ROSHINI K",
    "gender": "Female",
    "dob": "10/06/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12318",
    "password": "10/06/2009"
  },
  {
    "admissionNo": "261259",
    "name": "SUGANYA M",
    "gender": "Female",
    "dob": "22/08/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12319",
    "password": "22/08/2009"
  },
  {
    "admissionNo": "261260",
    "name": "YUVARANI R",
    "gender": "Female",
    "dob": "03/11/2009",
    "classLevel": "XII",
    "section": "C",
    "classSec": "XII C",
    "examNumber": "12320",
    "password": "03/11/2009"
  },
  {
    "admissionNo": "261261",
    "name": "ANANDHAKUMAR S",
    "gender": "Male",
    "dob": "19/01/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12401",
    "password": "19/01/2009"
  },
  {
    "admissionNo": "261262",
    "name": "CHIDAMBARAM P",
    "gender": "Male",
    "dob": "31/03/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12402",
    "password": "31/03/2009"
  },
  {
    "admissionNo": "261263",
    "name": "GOWRISANKAR M",
    "gender": "Male",
    "dob": "12/06/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12403",
    "password": "12/06/2009"
  },
  {
    "admissionNo": "261264",
    "name": "JAYASURIYA R",
    "gender": "Male",
    "dob": "24/08/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12404",
    "password": "24/08/2009"
  },
  {
    "admissionNo": "261265",
    "name": "KISHOREKUMAR T",
    "gender": "Male",
    "dob": "05/11/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12405",
    "password": "05/11/2009"
  },
  {
    "admissionNo": "261266",
    "name": "MADHESHWARAN V",
    "gender": "Male",
    "dob": "18/12/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12406",
    "password": "18/12/2009"
  },
  {
    "admissionNo": "261267",
    "name": "PRAVEEN S",
    "gender": "Male",
    "dob": "02/03/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12407",
    "password": "02/03/2009"
  },
  {
    "admissionNo": "261268",
    "name": "RAMKUMAR K",
    "gender": "Male",
    "dob": "14/05/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12408",
    "password": "14/05/2009"
  },
  {
    "admissionNo": "261269",
    "name": "SENTHILKUMAR M",
    "gender": "Male",
    "dob": "26/07/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12409",
    "password": "26/07/2009"
  },
  {
    "admissionNo": "261270",
    "name": "YOGESHWARAN R",
    "gender": "Male",
    "dob": "07/10/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12410",
    "password": "07/10/2009"
  },
  {
    "admissionNo": "261271",
    "name": "AKSHAYASREE S",
    "gender": "Female",
    "dob": "20/02/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12411",
    "password": "20/02/2009"
  },
  {
    "admissionNo": "261272",
    "name": "DHIVYA P",
    "gender": "Female",
    "dob": "02/05/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12412",
    "password": "02/05/2009"
  },
  {
    "admissionNo": "261273",
    "name": "HEMALATHA SREE M",
    "gender": "Female",
    "dob": "14/07/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12413",
    "password": "14/07/2009"
  },
  {
    "admissionNo": "261274",
    "name": "KALAIMATHI R",
    "gender": "Female",
    "dob": "26/09/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12414",
    "password": "26/09/2009"
  },
  {
    "admissionNo": "261275",
    "name": "MAHALAKSHMI T",
    "gender": "Female",
    "dob": "08/12/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12415",
    "password": "08/12/2009"
  },
  {
    "admissionNo": "261276",
    "name": "NANDHINISREE V",
    "gender": "Female",
    "dob": "19/01/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12416",
    "password": "19/01/2009"
  },
  {
    "admissionNo": "261277",
    "name": "PRIYADHARSHINI SREE S",
    "gender": "Female",
    "dob": "31/03/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12417",
    "password": "31/03/2009"
  },
  {
    "admissionNo": "261278",
    "name": "SARANYASREE K",
    "gender": "Female",
    "dob": "12/06/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12418",
    "password": "12/06/2009"
  },
  {
    "admissionNo": "261279",
    "name": "THENMOZHI M",
    "gender": "Female",
    "dob": "24/08/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12419",
    "password": "24/08/2009"
  },
  {
    "admissionNo": "261280",
    "name": "VIDHYA R",
    "gender": "Female",
    "dob": "05/11/2009",
    "classLevel": "XII",
    "section": "D",
    "classSec": "XII D",
    "examNumber": "12420",
    "password": "05/11/2009"
  }
];

export const SCHOOL_TEACHERS: SchoolTeacher[] = [
  {
    "id": "teacher-maharajan",
    "name": "Mr. Maharajan",
    "email": "maharajan@spicschool.com",
    "role": "admin",
    "department": "Administration & Examination Head",
    "classes": [
      "VI A",
      "VI B",
      "VI C",
      "VII A",
      "VII B",
      "VII C",
      "VIII A",
      "VIII B",
      "VIII C",
      "IX A",
      "IX B",
      "IX C",
      "X A",
      "X B",
      "X C",
      "X D",
      "XI A",
      "XI B",
      "XI C",
      "XI D",
      "XII A",
      "XII B",
      "XII C",
      "XII D"
    ]
  },
  {
    "id": "teacher-dharani",
    "name": "Dharani",
    "email": "dharani@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VI A"
    ]
  },
  {
    "id": "teacher-thayammal",
    "name": "Thayammal",
    "email": "thayammal@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VI B",
      "IX A",
      "IX B",
      "IX C"
    ]
  },
  {
    "id": "teacher-priyadharshini",
    "name": "Priyadharshini",
    "email": "priyadharshini@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VI C"
    ]
  },
  {
    "id": "teacher-hepziba",
    "name": "Hepziba",
    "email": "hepziba@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI A"
    ]
  },
  {
    "id": "teacher-esakkiammal",
    "name": "Esakkiammal",
    "email": "esakkiammal@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI A"
    ]
  },
  {
    "id": "teacher-evangaline",
    "name": "Evangaline",
    "email": "evangaline@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI B"
    ]
  },
  {
    "id": "teacher-ramyajuliet",
    "name": "Ramyajuliet",
    "email": "ramyajuliet@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI B"
    ]
  },
  {
    "id": "teacher-heartlin",
    "name": "Heartlin",
    "email": "heartlin@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI C"
    ]
  },
  {
    "id": "teacher-ramalalitha",
    "name": "Ramalalitha",
    "email": "ramalalitha@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VI C"
    ]
  },
  {
    "id": "teacher-uginimmaculate",
    "name": "Uginimmaculate",
    "email": "uginimmaculate@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VII A"
    ]
  },
  {
    "id": "teacher-muneeswari",
    "name": "Muneeswari",
    "email": "muneeswari@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VII B"
    ]
  },
  {
    "id": "teacher-ponselvi-c",
    "name": "Ponselvi C",
    "email": "ponselvi.c@spicschool.com",
    "role": "teacher",
    "department": "Maths",
    "classes": [
      "VII C"
    ]
  },
  {
    "id": "teacher-flowerista",
    "name": "Flowerista",
    "email": "flowerista@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII A"
    ]
  },
  {
    "id": "teacher-deivanayaki",
    "name": "Deivanayaki",
    "email": "deivanayaki@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII A"
    ]
  },
  {
    "id": "teacher-soumiya",
    "name": "Soumiya",
    "email": "soumiya@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII B"
    ]
  },
  {
    "id": "teacher-rajeswari-l",
    "name": "Rajeswari L",
    "email": "rajeswari.l@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII B"
    ]
  },
  {
    "id": "teacher-arun",
    "name": "Arun",
    "email": "arun@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII C"
    ]
  },
  {
    "id": "teacher-cecilynsubha",
    "name": "Cecilynsubha",
    "email": "cecilynsubha@spicschool.com",
    "role": "teacher",
    "department": "Science",
    "classes": [
      "VII C",
      "VI A",
      "VI B",
      "VI C",
      "VII A",
      "VII B",
      "VIII A",
      "VIII B",
      "VIII C",
      "IX A",
      "IX B",
      "IX C",
      "X A",
      "X B",
      "X C",
      "X D",
      "XI A",
      "XI B",
      "XI C",
      "XI D",
      "XII A",
      "XII B",
      "XII C",
      "XII D"
    ]
  },
  {
    "id": "teacher-kalavathy",
    "name": "Kalavathy",
    "email": "kalavathy@spicschool.com",
    "role": "teacher",
    "department": "THULIR QUIZ",
    "classes": [
      "VI A",
      "VI B",
      "VI C",
      "VII A",
      "VII B",
      "VII C",
      "VIII A",
      "VIII B",
      "VIII C",
      "IX A",
      "IX B",
      "IX C",
      "X A",
      "X B",
      "X C",
      "X D",
      "XI A",
      "XI B",
      "XI C",
      "XI D",
      "XII A",
      "XII B",
      "XII C",
      "XII D"
    ]
  }
];

export const SCHOOL_COMPLETED_EXAMS: SchoolExam[] = [
  {
    "id": "exam-vi-a-june-month-vi-maths-skill-test-23-0-1",
    "code": "exam-vi-a-june-month-vi-maths-skill-test-23-0-1",
    "title": "JUNE MONTH VI MATHS SKILL TEST 23.06.2026",
    "subject": "Maths",
    "classSec": "VI A",
    "allowedTeachers": [
      "dharani@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-b-june-month-vi-maths-skill-test-23-0-2",
    "code": "exam-vi-b-june-month-vi-maths-skill-test-23-0-2",
    "title": "JUNE MONTH VI MATHS SKILL TEST 23.06.2026",
    "subject": "Maths",
    "classSec": "VI B",
    "allowedTeachers": [
      "thayammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-c-june-month-vi-maths-skill-test-23-0-3",
    "code": "exam-vi-c-june-month-vi-maths-skill-test-23-0-3",
    "title": "JUNE MONTH VI MATHS SKILL TEST 23.06.2026",
    "subject": "Maths",
    "classSec": "VI C",
    "allowedTeachers": [
      "priyadharshini@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1St-V09cDLDlms9VWK8aReqz8_j-QCziT58eBGBQdOvM/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-a-june-month-vi-science-skill-test-25-4",
    "code": "exam-vi-a-june-month-vi-science-skill-test-25-4",
    "title": "JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026",
    "subject": "Science",
    "classSec": "VI A",
    "allowedTeachers": [
      "hepziba@spicschool.com",
      "esakkiammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-b-june-month-vi-science-skill-test-25-5",
    "code": "exam-vi-b-june-month-vi-science-skill-test-25-5",
    "title": "JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026",
    "subject": "Science",
    "classSec": "VI B",
    "allowedTeachers": [
      "evangaline@spicschool.com",
      "ramyajuliet@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-c-june-month-vi-science-skill-test-25-6",
    "code": "exam-vi-c-june-month-vi-science-skill-test-25-6",
    "title": "JUNE MONTH VI - SCIENCE SKILL TEST -25.06.2026",
    "subject": "Science",
    "classSec": "VI C",
    "allowedTeachers": [
      "heartlin@spicschool.com",
      "ramalalitha@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1RXycY-p72hs82PkEdGT9Rvjq9-WCo2XEqD06iW22rTg/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-a-june-month-vii-maths-skill-test-24--7",
    "code": "exam-vii-a-june-month-vii-maths-skill-test-24--7",
    "title": "JUNE MONTH VII MATHS SKILL TEST 24.06.2026",
    "subject": "Maths",
    "classSec": "VII A",
    "allowedTeachers": [
      "uginimmaculate@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-b-june-month-vii-maths-skill-test-24--8",
    "code": "exam-vii-b-june-month-vii-maths-skill-test-24--8",
    "title": "JUNE MONTH VII MATHS SKILL TEST 24.06.2026",
    "subject": "Maths",
    "classSec": "VII B",
    "allowedTeachers": [
      "muneeswari@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-c-june-month-vii-maths-skill-test-24--9",
    "code": "exam-vii-c-june-month-vii-maths-skill-test-24--9",
    "title": "JUNE MONTH VII MATHS SKILL TEST 24.06.2026",
    "subject": "Maths",
    "classSec": "VII C",
    "allowedTeachers": [
      "ponselvi.c@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1nxGjSglI4nZpyE1zrP04UsAK82R5bR2BPYRsfGc7jCE/edit?gid=0#gid=0",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-a-june-month-vii-science-skill-test-2-10",
    "code": "exam-vii-a-june-month-vii-science-skill-test-2-10",
    "title": "JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026",
    "subject": "Science",
    "classSec": "VII A",
    "allowedTeachers": [
      "flowerista@spicschool.com",
      "deivanayaki@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-b-june-month-vii-science-skill-test-2-11",
    "code": "exam-vii-b-june-month-vii-science-skill-test-2-11",
    "title": "JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026",
    "subject": "Science",
    "classSec": "VII B",
    "allowedTeachers": [
      "soumiya@spicschool.com",
      "rajeswari.l@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-c-june-month-vii-science-skill-test-2-12",
    "code": "exam-vii-c-june-month-vii-science-skill-test-2-12",
    "title": "JUNE MONTH VII - SCIENCE SKILL TEST -29.06.2026",
    "subject": "Science",
    "classSec": "VII C",
    "allowedTeachers": [
      "arun@spicschool.com",
      "cecilynsubha@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/14-29_Y4Nwc2r0W8UUBRmOwt0HmUlsMAbGGoIFQoipXs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-a-thulir-quiz-competition-junior-23-0-13",
    "code": "exam-vi-a-thulir-quiz-competition-junior-23-0-13",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VI A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-b-thulir-quiz-competition-junior-23-0-14",
    "code": "exam-vi-b-thulir-quiz-competition-junior-23-0-14",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VI B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-c-thulir-quiz-competition-junior-23-0-15",
    "code": "exam-vi-c-thulir-quiz-competition-junior-23-0-15",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VI C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-a-thulir-quiz-competition-junior-23-0-16",
    "code": "exam-vii-a-thulir-quiz-competition-junior-23-0-16",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VII A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-b-thulir-quiz-competition-junior-23-0-17",
    "code": "exam-vii-b-thulir-quiz-competition-junior-23-0-17",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VII B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-c-thulir-quiz-competition-junior-23-0-18",
    "code": "exam-vii-c-thulir-quiz-competition-junior-23-0-18",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VII C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-viii-a-thulir-quiz-competition-junior-23-0-19",
    "code": "exam-viii-a-thulir-quiz-competition-junior-23-0-19",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VIII A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-viii-b-thulir-quiz-competition-junior-23-0-20",
    "code": "exam-viii-b-thulir-quiz-competition-junior-23-0-20",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VIII B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-viii-c-thulir-quiz-competition-junior-23-0-21",
    "code": "exam-viii-c-thulir-quiz-competition-junior-23-0-21",
    "title": "THULIR QUIZ COMPETITION JUNIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "VIII C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1CwKQB2XWzGwuBKueA1F29bGon7bJ8edtv68-IGRG-1o/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-a-thulir-quiz-competition-senior-23-0-22",
    "code": "exam-ix-a-thulir-quiz-competition-senior-23-0-22",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "IX A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-b-thulir-quiz-competition-senior-23-0-23",
    "code": "exam-ix-b-thulir-quiz-competition-senior-23-0-23",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "IX B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-c-thulir-quiz-competition-senior-23-0-24",
    "code": "exam-ix-c-thulir-quiz-competition-senior-23-0-24",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "IX C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-x-a-thulir-quiz-competition-senior-23-0-25",
    "code": "exam-x-a-thulir-quiz-competition-senior-23-0-25",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "X A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-x-b-thulir-quiz-competition-senior-23-0-26",
    "code": "exam-x-b-thulir-quiz-competition-senior-23-0-26",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "X B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-x-c-thulir-quiz-competition-senior-23-0-27",
    "code": "exam-x-c-thulir-quiz-competition-senior-23-0-27",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "X C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-x-d-thulir-quiz-competition-senior-23-0-28",
    "code": "exam-x-d-thulir-quiz-competition-senior-23-0-28",
    "title": "THULIR QUIZ COMPETITION SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "X D",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1_1A-Df9iqpNmrbjlPFQSBIbDICun1u9rtJyK_06nu4g/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xi-a-thulir-quiz-competition-super-senio-29",
    "code": "exam-xi-a-thulir-quiz-competition-super-senio-29",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XI A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xi-b-thulir-quiz-competition-super-senio-30",
    "code": "exam-xi-b-thulir-quiz-competition-super-senio-30",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XI B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xi-c-thulir-quiz-competition-super-senio-31",
    "code": "exam-xi-c-thulir-quiz-competition-super-senio-31",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XI C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xi-d-thulir-quiz-competition-super-senio-32",
    "code": "exam-xi-d-thulir-quiz-competition-super-senio-32",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XI D",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xii-a-thulir-quiz-competition-super-senio-33",
    "code": "exam-xii-a-thulir-quiz-competition-super-senio-33",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XII A",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xii-b-thulir-quiz-competition-super-senio-34",
    "code": "exam-xii-b-thulir-quiz-competition-super-senio-34",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XII B",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xii-c-thulir-quiz-competition-super-senio-35",
    "code": "exam-xii-c-thulir-quiz-competition-super-senio-35",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XII C",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-xii-d-thulir-quiz-competition-super-senio-36",
    "code": "exam-xii-d-thulir-quiz-competition-super-senio-36",
    "title": "THULIR QUIZ COMPETITION SUPER SENIOR - 23.07.2026",
    "subject": "THULIR QUIZ",
    "classSec": "XII D",
    "allowedTeachers": [
      "cecilynsubha@spicschool.com",
      "kalavathy@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 30,
    "totalMarks": 30,
    "targetUrl": "https://docs.google.com/spreadsheets/d/17Inx6IUJoI1hYupGUavIcGRkQ2Fq2slteSzIgPHVUAU/",
    "questions": [
      {
        "id": "Q1",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q21",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 21",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q22",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 22",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q23",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 23",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q24",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 24",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q25",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 25",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q26",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 26",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q27",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 27",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q28",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 28",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q29",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 29",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q30",
        "category": "THULIR QUIZ",
        "text": "THULIR QUIZ Question 30",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-a-august-month-vi-maths-skill-test-06-37",
    "code": "exam-vi-a-august-month-vi-maths-skill-test-06-37",
    "title": "AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026",
    "subject": "Maths",
    "classSec": "VI A",
    "allowedTeachers": [
      "dharani@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-b-august-month-vi-maths-skill-test-06-38",
    "code": "exam-vi-b-august-month-vi-maths-skill-test-06-38",
    "title": "AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026",
    "subject": "Maths",
    "classSec": "VI B",
    "allowedTeachers": [
      "thayammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-c-august-month-vi-maths-skill-test-06-39",
    "code": "exam-vi-c-august-month-vi-maths-skill-test-06-39",
    "title": "AUGUST  MONTH VI - MATHS  SKILL TEST -06.08.2026",
    "subject": "Maths",
    "classSec": "VI C",
    "allowedTeachers": [
      "priyadharshini@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zEq-pDUchmr_SbHwGKpgrEj_Rpf8zTBWG_KnDyLUfqw/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-a-august-month-vi-science-skill-test--40",
    "code": "exam-vi-a-august-month-vi-science-skill-test--40",
    "title": "AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026",
    "subject": "Science",
    "classSec": "VI A",
    "allowedTeachers": [
      "hepziba@spicschool.com",
      "esakkiammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 20,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-b-august-month-vi-science-skill-test--41",
    "code": "exam-vi-b-august-month-vi-science-skill-test--41",
    "title": "AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026",
    "subject": "Science",
    "classSec": "VI B",
    "allowedTeachers": [
      "evangaline@spicschool.com",
      "ramyajuliet@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 20,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vi-c-august-month-vi-science-skill-test--42",
    "code": "exam-vi-c-august-month-vi-science-skill-test--42",
    "title": "AUGUST MONTH VI - SCIENCE SKILL TEST -08.08.2026",
    "subject": "Science",
    "classSec": "VI C",
    "allowedTeachers": [
      "heartlin@spicschool.com",
      "ramalalitha@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 20,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1zsWl-gzxy1KF6urq11kEXzN_iz2e0kUDXudLPguoIFs/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-a-august-month-vii-maths-skill-test-1-43",
    "code": "exam-vii-a-august-month-vii-maths-skill-test-1-43",
    "title": "AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026",
    "subject": "Maths",
    "classSec": "VII A",
    "allowedTeachers": [
      "uginimmaculate@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-b-august-month-vii-maths-skill-test-1-44",
    "code": "exam-vii-b-august-month-vii-maths-skill-test-1-44",
    "title": "AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026",
    "subject": "Maths",
    "classSec": "VII B",
    "allowedTeachers": [
      "muneeswari@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-c-august-month-vii-maths-skill-test-1-45",
    "code": "exam-vii-c-august-month-vii-maths-skill-test-1-45",
    "title": "AUGUST  MONTH VII - MATHS  SKILL TEST -17.08.2026",
    "subject": "Maths",
    "classSec": "VII C",
    "allowedTeachers": [
      "ponselvi.c@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 10,
    "qCount": 10,
    "totalMarks": 10,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1rqevQb9EERsBm5B914t_PIY7y8lpwONEtErkcZ_GXCo/",
    "questions": [
      {
        "id": "Q1",
        "category": "MATHS",
        "text": "Maths Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "MATHS",
        "text": "Maths Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "MATHS",
        "text": "Maths Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "MATHS",
        "text": "Maths Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "MATHS",
        "text": "Maths Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "MATHS",
        "text": "Maths Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "MATHS",
        "text": "Maths Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "MATHS",
        "text": "Maths Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "MATHS",
        "text": "Maths Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "MATHS",
        "text": "Maths Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-a-august-month-vii-science-skill-test-46",
    "code": "exam-vii-a-august-month-vii-science-skill-test-46",
    "title": "AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026",
    "subject": "Science",
    "classSec": "VII A",
    "allowedTeachers": [
      "flowerista@spicschool.com",
      "deivanayaki@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-b-august-month-vii-science-skill-test-47",
    "code": "exam-vii-b-august-month-vii-science-skill-test-47",
    "title": "AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026",
    "subject": "Science",
    "classSec": "VII B",
    "allowedTeachers": [
      "soumiya@spicschool.com",
      "rajeswari.l@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-vii-c-august-month-vii-science-skill-test-48",
    "code": "exam-vii-c-august-month-vii-science-skill-test-48",
    "title": "AUGUST MONTH VII - SCIENCE SKILL TEST -21.08.2026",
    "subject": "Science",
    "classSec": "VII C",
    "allowedTeachers": [
      "arun@spicschool.com",
      "cecilynsubha@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 15,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/12V1ca9424NX9HfnseAZAWOBUvgrPwoGS1QGdDe4kMK4/",
    "questions": [
      {
        "id": "Q1",
        "category": "SCIENCE",
        "text": "Science Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "SCIENCE",
        "text": "Science Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "SCIENCE",
        "text": "Science Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "SCIENCE",
        "text": "Science Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "SCIENCE",
        "text": "Science Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "SCIENCE",
        "text": "Science Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "SCIENCE",
        "text": "Science Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "SCIENCE",
        "text": "Science Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "SCIENCE",
        "text": "Science Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "SCIENCE",
        "text": "Science Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "SCIENCE",
        "text": "Science Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "SCIENCE",
        "text": "Science Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "SCIENCE",
        "text": "Science Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "SCIENCE",
        "text": "Science Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "SCIENCE",
        "text": "Science Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "SCIENCE",
        "text": "Science Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "SCIENCE",
        "text": "Science Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "SCIENCE",
        "text": "Science Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "SCIENCE",
        "text": "Science Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "SCIENCE",
        "text": "Science Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-a-psg-preliminary-exam-28-08-2026-49",
    "code": "exam-ix-a-psg-preliminary-exam-28-08-2026-49",
    "title": "PSG PRELIMINARY EXAM-28.08.2026",
    "subject": "PSG PRELIMINARY EXAM",
    "classSec": "IX A",
    "allowedTeachers": [
      "thayammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/",
    "questions": [
      {
        "id": "Q1",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-b-psg-preliminary-exam-28-08-2026-50",
    "code": "exam-ix-b-psg-preliminary-exam-28-08-2026-50",
    "title": "PSG PRELIMINARY EXAM-28.08.2026",
    "subject": "PSG PRELIMINARY EXAM",
    "classSec": "IX B",
    "allowedTeachers": [
      "thayammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/",
    "questions": [
      {
        "id": "Q1",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  },
  {
    "id": "exam-ix-c-psg-preliminary-exam-28-08-2026-51",
    "code": "exam-ix-c-psg-preliminary-exam-28-08-2026-51",
    "title": "PSG PRELIMINARY EXAM-28.08.2026",
    "subject": "PSG PRELIMINARY EXAM",
    "classSec": "IX C",
    "allowedTeachers": [
      "thayammal@spicschool.com"
    ],
    "status": "CLOSED",
    "scoreStatus": "RELEASED",
    "examMins": 30,
    "qCount": 20,
    "totalMarks": 20,
    "targetUrl": "https://docs.google.com/spreadsheets/d/1E4ctubQNhjN8HftfqQ41Rj5CaJIC7wJ0scxdyGZeyrA/",
    "questions": [
      {
        "id": "Q1",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 1",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q2",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 2",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q3",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 3",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q4",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 4",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q5",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 5",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q6",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 6",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q7",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 7",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q8",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 8",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q9",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 9",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q10",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 10",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q11",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 11",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q12",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 12",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q13",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 13",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q14",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 14",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q15",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 15",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q16",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 16",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q17",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 17",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q18",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 18",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q19",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 19",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      },
      {
        "id": "Q20",
        "category": "PSG PRELIMINARY EXAM",
        "text": "PSG PRELIMINARY EXAM Question 20",
        "options": [
          {
            "t": "Option A",
            "o": 0
          },
          {
            "t": "Option B",
            "o": 1
          },
          {
            "t": "Option C",
            "o": 2
          },
          {
            "t": "Option D",
            "o": 3
          }
        ],
        "points": 1
      }
    ]
  }
];

export const SCHOOL_ROSTER_STUDENTS: StudentRecord[] = SCHOOL_STUDENTS.map(s => ({
  examNo: s.examNumber,
  dob: s.dob,
  name: s.name,
  classSec: s.classSec,
  admnNo: s.admissionNo
}));

export const SCHOOL_ROSTER_TEACHERS: TeacherRecord[] = SCHOOL_TEACHERS.map(t => ({
  email: t.email,
  pass: 'Teacher@2026',
  name: t.name,
  assigned: t.classes
}));

export const SCHOOL_EXAM_DOCUMENTS: ExamDocument[] = SCHOOL_COMPLETED_EXAMS as ExamDocument[];
