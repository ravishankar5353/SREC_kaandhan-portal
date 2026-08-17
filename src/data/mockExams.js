// ─── Mock Exams & Results ─────────────────────────────────────────────────────

export const mockExams = [
  { id: 'EXM-001', name: 'Mid-Term I (2025-26)', department: 'Computer Science & Engineering', course: 'Machine Learning', date: '2026-09-15', time: '10:00 AM', duration: '3 Hours', venue: 'Block A - Hall 1', totalMarks: 100, status: 'Upcoming' },
  { id: 'EXM-002', name: 'Mid-Term I (2025-26)', department: 'CSE (AI & Machine Learning)', course: 'Deep Learning', date: '2026-09-16', time: '10:00 AM', duration: '3 Hours', venue: 'Block B - Hall 2', totalMarks: 100, status: 'Upcoming' },
  { id: 'EXM-003', name: 'Mid-Term I (2025-26)', department: 'Electronics & Communication Engineering', course: 'VLSI Design', date: '2026-09-17', time: '10:00 AM', duration: '3 Hours', venue: 'Block C - Hall 3', totalMarks: 100, status: 'Upcoming' },
  { id: 'EXM-004', name: 'Internal Assessment I', department: 'Computer Science & Engineering', course: 'DBMS', date: '2026-08-22', time: '2:00 PM', duration: '1 Hour', venue: 'CSE Lab 1', totalMarks: 30, status: 'Upcoming' },
  { id: 'EXM-005', name: 'Semester Final (2024-25)', department: 'Computer Science & Engineering', course: 'Data Structures', date: '2025-11-20', time: '10:00 AM', duration: '3 Hours', venue: 'Block A', totalMarks: 100, status: 'Completed' },
];

export const mockResults = [
  { id: 'RES-001', studentId: 'STU-001', studentName: 'Ananya Sharma', rollNo: '24X51A0501', course: 'Data Structures', examId: 'EXM-005', marksObtained: 87, totalMarks: 100, percentage: 87.0, grade: 'A+', result: 'Pass', semester: 'III', academicYear: '2024-25' },
  { id: 'RES-002', studentId: 'STU-002', studentName: 'Y. Ravi Shankar', rollNo: '24X51A05Y9', course: 'Data Structures', examId: 'EXM-005', marksObtained: 94, totalMarks: 100, percentage: 94.0, grade: 'O', result: 'Pass', semester: 'III', academicYear: '2024-25' },
  { id: 'RES-003', studentId: 'STU-003', studentName: 'Priya Reddy', rollNo: '23X51A0502', course: 'Data Structures', examId: 'EXM-005', marksObtained: 75, totalMarks: 100, percentage: 75.0, grade: 'A', result: 'Pass', semester: 'III', academicYear: '2024-25' },
  { id: 'RES-004', studentId: 'STU-004', studentName: 'Kiran Kumar', rollNo: '23X51A0503', course: 'Data Structures', examId: 'EXM-005', marksObtained: 62, totalMarks: 100, percentage: 62.0, grade: 'B+', result: 'Pass', semester: 'III', academicYear: '2024-25' },
  { id: 'RES-005', studentId: 'STU-005', studentName: 'Sneha Patel', rollNo: '22X51A0504', course: 'Data Structures', examId: 'EXM-005', marksObtained: 38, totalMarks: 100, percentage: 38.0, grade: 'F', result: 'Fail', semester: 'III', academicYear: '2024-25' },
];
