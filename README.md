# SPIC School CBT Examination Portal

Computer-Based Testing (CBT) and Examination Management System for SPIC Higher Secondary School.

---

## 🚀 Quick Start (Local Setup / Antigravity)

### 1. Prerequisites
- **Node.js**: Version 18.x or higher (Node 20+ recommended)
- **npm**: Version 9.x or higher

### 2. Install Dependencies
Run the following command in the root folder of the cloned repository:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch on:
👉 **`http://localhost:3000`**

### 4. Build for Production
```bash
npm run build
```
Build output will be generated in the `dist/` directory.

---

## 🔑 Default Credentials for Testing

| Role | Identifier / Email | Password / DOB | Purpose |
| :--- | :--- | :--- | :--- |
| **Master Admin** | `admin@spicschool.com` *(or `maharajan`)* | `SpicAdmin@2026` | Full exam deployment, roster management, live analytics |
| **Faculty / Teacher** | `maharajan@spicschool.com` | `Teacher@2026` | Class 10 A/B, 11 A, 12 A exam supervision |
| **Student** | Exam No: `EX1001` | DOB: `15/08/2010` | Student: S. Arun Kumar (Class 10 A) |

*Note: You can also use the 1-Click Quick Switch buttons on the login screen.*

---

## 📂 Project Architecture & Key Files

```text
├── firebase-applet-config.json     # Pre-configured Firestore & Auth credentials
├── package.json                    # Project scripts & dependencies
├── src/
│   ├── App.tsx                     # Main router, session persistence & real-time sync
│   ├── types.ts                    # Shared TypeScript interfaces & models
│   ├── constants/
│   │   └── schoolStructure.ts      # Class VI-X (A-D) & XI-XII (CS/BIO/CA/BM) definitions
│   ├── components/
│   │   ├── LoginView.tsx           # Multi-role authentication & Google SSO
│   │   ├── StudentDashboard.tsx    # Student exam kiosk, timer & auto-submit
│   │   ├── TeacherDashboard.tsx    # Teacher dashboard, active status toggles
│   │   ├── AdminDashboard.tsx      # Admin console & system controls
│   │   ├── ImportSheetModal.tsx    # TSV/CSV/Google Sheets importer & total marks entry
│   │   ├── RosterManagerModal.tsx  # Student & teacher roster manager with bulk import
│   │   ├── ClassSectionSelector.tsx# Reusable dropdown & custom class editor
│   │   ├── AnalyticsView.tsx       # Real-time score analytics & question analysis
│   │   ├── ExamResultView.tsx      # Instant student scorecards & review
│   │   └── HelpGuideModal.tsx      # Step-by-step examination user guide
│   └── services/
│       └── firebase.ts             # Firestore live listeners, submissions & Auth logic
```

---

## 🛠️ Features Included

1. **Persistent Session**: Browser reloads (F5/refresh) preserve your active dashboard and role without kicking you back to the login screen.
2. **Flexible Class Hierarchy**:
   - Classes **VI to X** with Sections **A, B, C, D**
   - Classes **XI & XII** with Streams **A-CS, B-CS, C-BIO, D-CA, D-BM**
   - **Edit / Custom Name** toggle on all selectors to enter custom class designations.
3. **Question Paper Importer**:
   - Import directly from Google Sheets / Excel / CSV / TSV
   - Configurable **Total Marks** field with auto-calculation from question points.
4. **Google SSO**: Role resolution based on the school's faculty and student roster.
