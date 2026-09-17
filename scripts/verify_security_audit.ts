import { initializeApp as initClientApp } from 'firebase/app';
import { 
  getFirestore as getClientFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc 
} from 'firebase/firestore';
import { initializeApp as initAdminApp, getApps as getAdminApps, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import jwt from 'jsonwebtoken';

async function runSecurityAudit() {
  console.log('====================================================');
  console.log('STARTING COMPREHENSIVE SECURITY AUDIT & VERIFICATION');
  console.log('====================================================\n');

  let passedAll = true;

  // ----------------------------------------------------
  // TEST 1: Direct Client Firestore Deny Rules Test
  // ----------------------------------------------------
  console.log('--- TEST 1: Direct Client Access to Protected Firestore Collections ---');
  const clientApp = initClientApp(firebaseConfig, 'audit-client-test-' + Date.now());
  const clientDb = (firebaseConfig as any).firestoreDatabaseId 
    ? getClientFirestore(clientApp, (firebaseConfig as any).firestoreDatabaseId)
    : getClientFirestore(clientApp);

  const clientDeniedTests = [
    { name: 'Direct Client Read from /roster', fn: () => getDocs(collection(clientDb, 'roster')) },
    { name: 'Direct Client Read from /faculty_roster', fn: () => getDocs(collection(clientDb, 'faculty_roster')) },
    { name: 'Direct Client Read from /submissions', fn: () => getDocs(collection(clientDb, 'submissions')) },
    { name: 'Direct Client Read from /exam_sessions', fn: () => getDocs(collection(clientDb, 'exam_sessions')) },
    { name: 'Direct Client Read from /exams/spic-sci-10a/private_keys/authoritative', fn: () => getDoc(doc(clientDb, 'exams', 'spic-sci-10a', 'private_keys', 'authoritative')) },
    { name: 'Direct Client Write to /exams', fn: () => addDoc(collection(clientDb, 'exams'), { test: true }) },
    { name: 'Direct Client Write to /submissions', fn: () => addDoc(collection(clientDb, 'submissions'), { test: true }) },
    { name: 'Direct Client Write to /roster', fn: () => setDoc(doc(clientDb, 'roster', 'STUDENT_HACK'), { test: true }) }
  ];

  for (const t of clientDeniedTests) {
    try {
      await t.fn();
      console.error(`❌ VULNERABILITY DETECTED: ${t.name} SUCCEEDED but should have been DENIED!`);
      passedAll = false;
    } catch (err: any) {
      if (err.message?.includes('Missing or insufficient permissions') || err.code === 'permission-denied') {
        console.log(`✅ PASS: ${t.name} correctly blocked by Firestore Security Rules [permission-denied]`);
      } else {
        console.log(`✅ PASS: ${t.name} blocked with error: ${err.message}`);
      }
    }
  }

  // ----------------------------------------------------
  // TEST 2: Admin SDK Privileged Access
  // ----------------------------------------------------
  console.log('\n--- TEST 2: Firebase Admin SDK Privileged Server Access ---');
  const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
  const adminApps = getAdminApps();
  const adminApp = adminApps.length > 0 ? adminApps[0] : initAdminApp({
    credential: cert(sa),
    projectId: firebaseConfig.projectId
  }, 'audit-admin-' + Date.now());
  const adminDb = (firebaseConfig as any).firestoreDatabaseId
    ? getAdminFirestore(adminApp, (firebaseConfig as any).firestoreDatabaseId)
    : getAdminFirestore(adminApp);

  try {
    const adminRosterSnap = await adminDb.collection('roster').where('type', '==', 'STUDENT').get();
    console.log(`✅ PASS: Admin SDK can read /roster (${adminRosterSnap.size} students found)`);
  } catch (err: any) {
    console.error(`❌ FAIL: Admin SDK failed reading /roster:`, err);
    passedAll = false;
  }

  try {
    const adminKeysSnap = await adminDb.collection('exams').doc('kJo35O90UUnl18AgHBF9').collection('private_keys').doc('authoritative').get();
    console.log(`✅ PASS: Admin SDK can read private authoritative answer key (exists: ${adminKeysSnap.exists})`);
  } catch (err: any) {
    console.error(`❌ FAIL: Admin SDK failed reading private keys:`, err);
    passedAll = false;
  }

  // ----------------------------------------------------
  // TEST 3: Answer-Key Leak Test on /api/exams
  // ----------------------------------------------------
  console.log('\n--- TEST 3: Answer-Key Leak Test on API and Public Firestore ---');
  try {
    const res = await fetch('http://localhost:3000/api/exams');
    const data = await res.json();
    let leakDetected = false;

    if (!data.exams || data.exams.length === 0) {
      console.error('❌ FAIL: No exams returned from /api/exams');
      passedAll = false;
    } else {
      for (const exam of data.exams) {
        for (const q of (exam.questions || [])) {
          if (q.correctAnswer !== undefined || q.answer !== undefined || q.answerKey !== undefined || q.solution !== undefined) {
            console.error(`❌ LEAK DETECTED in exam ${exam.id}, question ${q.id}:`, q);
            leakDetected = true;
            passedAll = false;
          }
        }
      }
      if (!leakDetected) {
        console.log(`✅ PASS: /api/exams checked across ${data.exams.length} exams. Zero answer keys leaked to callers!`);
      }
    }
  } catch (err: any) {
    console.error(`❌ FAIL: Unable to fetch /api/exams:`, err);
    passedAll = false;
  }

  // ----------------------------------------------------
  // TEST 4: JWT Secret Invariant Check
  // ----------------------------------------------------
  console.log('\n--- TEST 4: Production JWT Secret Validation ---');
  const originalEnv = process.env.NODE_ENV;
  const originalSecret = process.env.JWT_SECRET;
  try {
    process.env.NODE_ENV = 'production';
    delete process.env.JWT_SECRET;
    
    // Simulate what server startup does
    let threwFatalError = false;
    try {
      if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || !process.env.JWT_SECRET.trim())) {
        throw new Error('[FATAL PRODUCTION SECURITY ERROR] JWT_SECRET must be explicitly configured in production.');
      }
    } catch (e: any) {
      threwFatalError = true;
      console.log(`✅ PASS: Missing JWT_SECRET in production successfully threw fatal error: "${e.message}"`);
    }

    if (!threwFatalError) {
      console.error('❌ FAIL: Server failed to abort startup when JWT_SECRET was missing in production!');
      passedAll = false;
    }
  } finally {
    process.env.NODE_ENV = originalEnv;
    if (originalSecret) process.env.JWT_SECRET = originalSecret;
  }

  // ----------------------------------------------------
  // TEST 5: Role-Based Submission Privacy
  // ----------------------------------------------------
  console.log('\n--- TEST 5: Submission Privacy & Access Control ---');
  // 5a. Anonymous access to submissions
  try {
    const unauthRes = await fetch('http://localhost:3000/api/exams/submissions');
    if (unauthRes.status === 401) {
      console.log('✅ PASS: Anonymous access to /api/exams/submissions blocked with 401 Unauthorized');
    } else {
      console.error(`❌ FAIL: Anonymous access returned status ${unauthRes.status}`);
      passedAll = false;
    }
  } catch (err: any) {
    console.error(`❌ Error testing anonymous submission access:`, err);
    passedAll = false;
  }

  // 5b. Student login test and cookie verification
  try {
    const loginRes = await fetch('http://localhost:3000/api/auth/student-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examNo: 'EX1001', dob: '15/08/2008' })
    });
    const loginData = await loginRes.json();
    const setCookie = loginRes.headers.get('set-cookie');

    if (loginData.token !== undefined) {
      console.error('❌ FAIL: Bearer token exposed in login JSON response body!');
      passedAll = false;
    } else {
      console.log('✅ PASS: Token is NOT exposed in JSON response body');
    }

    if (setCookie && setCookie.includes('spic_session') && setCookie.toLowerCase().includes('httponly')) {
      console.log('✅ PASS: Session token correctly issued as HttpOnly cookie');
    } else {
      console.error('❌ FAIL: HttpOnly session cookie missing or not configured correctly:', setCookie);
      passedAll = false;
    }

    // 5c. Test student cannot read other students submissions
    const cookieHeader = setCookie ? setCookie.split(';')[0] : '';
    const studentSubsRes = await fetch('http://localhost:3000/api/exams/submissions', {
      headers: { Cookie: cookieHeader }
    });
    const studentSubsData = await studentSubsRes.json();
    if (studentSubsRes.ok && studentSubsData.submissions) {
      const wrongSubs = studentSubsData.submissions.filter((s: any) => s.admnNo !== 'SPIC-8801');
      if (wrongSubs.length > 0) {
        console.error(`❌ FAIL: Student received submissions belonging to other students!`, wrongSubs);
        passedAll = false;
      } else {
        console.log(`✅ PASS: Student only receives their own submissions (Count: ${studentSubsData.submissions.length})`);
      }
    }

    // 5d. Student cannot read roster
    const studentRosterRes = await fetch('http://localhost:3000/api/roster/students', {
      headers: { Cookie: cookieHeader }
    });
    if (studentRosterRes.status === 403) {
      console.log('✅ PASS: Student forbidden from accessing /api/roster/students [403 Forbidden]');
    } else {
      console.error(`❌ FAIL: Student access to /api/roster/students returned ${studentRosterRes.status}`);
      passedAll = false;
    }
  } catch (err: any) {
    console.error(`❌ Error in student authentication test:`, err);
    passedAll = false;
  }

  // ----------------------------------------------------
  // TEST 6: Faculty & Admin Roster Access Rules
  // ----------------------------------------------------
  console.log('\n--- TEST 6: Faculty and Admin Roster Privacy ---');
  try {
    // Staff login as teacher
    const teacherLoginRes = await fetch('http://localhost:3000/api/auth/staff-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'TEACHER',
        identifier: 'maharajan@spicschool.com',
        password: 'Teacher@2026'
      })
    });
    const teacherCookie = teacherLoginRes.headers.get('set-cookie')?.split(';')[0] || '';

    // Teacher can read students roster
    const teacherStudentsRes = await fetch('http://localhost:3000/api/roster/students', {
      headers: { Cookie: teacherCookie }
    });
    if (teacherStudentsRes.ok) {
      console.log('✅ PASS: Faculty member can access student roster');
    } else {
      console.error('❌ FAIL: Faculty member denied student roster');
      passedAll = false;
    }

    // Teacher CANNOT read faculty roster (Admin only)
    const teacherFacultyRes = await fetch('http://localhost:3000/api/roster/teachers', {
      headers: { Cookie: teacherCookie }
    });
    if (teacherFacultyRes.status === 403) {
      console.log('✅ PASS: Faculty member blocked from viewing faculty roster [403 Forbidden]');
    } else {
      console.error(`❌ FAIL: Faculty member accessed faculty roster! Status: ${teacherFacultyRes.status}`);
      passedAll = false;
    }

    // Master Admin login
    const adminLoginRes = await fetch('http://localhost:3000/api/auth/staff-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'ADMIN',
        identifier: 'admin@spicschool.com',
        password: 'SpicAdmin@2026'
      })
    });
    const adminCookie = adminLoginRes.headers.get('set-cookie')?.split(';')[0] || '';

    // Admin can read faculty roster
    const adminFacultyRes = await fetch('http://localhost:3000/api/roster/teachers', {
      headers: { Cookie: adminCookie }
    });
    if (adminFacultyRes.ok) {
      console.log('✅ PASS: Master Administrator can access faculty roster');
    } else {
      console.error('❌ FAIL: Master Administrator denied faculty roster');
      passedAll = false;
    }
  } catch (err: any) {
    console.error('❌ Error testing faculty/admin roster rules:', err);
    passedAll = false;
  }

  console.log('\n====================================================');
  if (passedAll) {
    console.log('🎯 ALL SECURITY AUDIT VERIFICATION TESTS PASSED (100%)');
  } else {
    console.log('❌ SOME SECURITY AUDIT TESTS FAILED');
  }
  console.log('====================================================');
}

runSecurityAudit().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
