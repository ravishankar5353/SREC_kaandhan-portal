// ─── Mock Attendance Data ─────────────────────────────────────────────────────

export const mockAttendance = [
  { id: 'ATT-001', studentId: 'STU-001', studentName: 'Ananya Sharma', rollNo: '24X51A0501', department: 'Computer Science & Engineering', course: 'Machine Learning', date: '2026-08-16', status: 'Present', totalClasses: 80, attended: 76, percentage: 95.0 },
  { id: 'ATT-002', studentId: 'STU-002', studentName: 'Y. Ravi Shankar', rollNo: '24X51A05Y9', department: 'Computer Science & Engineering', course: 'Machine Learning', date: '2026-08-16', status: 'Present', totalClasses: 80, attended: 77, percentage: 96.25 },
  { id: 'ATT-003', studentId: 'STU-003', studentName: 'Priya Reddy', rollNo: '23X51A0502', department: 'CSE (AI & Machine Learning)', course: 'Deep Learning', date: '2026-08-16', status: 'Absent', totalClasses: 75, attended: 66, percentage: 88.0 },
  { id: 'ATT-004', studentId: 'STU-004', studentName: 'Kiran Kumar', rollNo: '23X51A0503', department: 'Electronics & Communication Engineering', course: 'VLSI Design', date: '2026-08-16', status: 'Present', totalClasses: 72, attended: 59, percentage: 81.9 },
  { id: 'ATT-005', studentId: 'STU-005', studentName: 'Sneha Patel', rollNo: '22X51A0504', department: 'Mechanical Engineering', course: 'Thermodynamics', date: '2026-08-16', status: 'Present', totalClasses: 68, attended: 62, percentage: 91.2 },
  { id: 'ATT-006', studentId: 'STU-006', studentName: 'Ramesh Nayak', rollNo: '22X51A0505', department: 'Electrical & Electronics Engineering', course: 'Power Systems', date: '2026-08-16', status: 'Absent', totalClasses: 70, attended: 55, percentage: 78.6 },
  { id: 'ATT-007', studentId: 'STU-007', studentName: 'Meghana Rao', rollNo: '21X51A0506', department: 'Civil Engineering', course: 'Structural Analysis', date: '2026-08-16', status: 'Present', totalClasses: 65, attended: 60, percentage: 92.3 },
  { id: 'ATT-008', studentId: 'STU-008', studentName: 'Arjun Verma', rollNo: '24X51A0507', department: 'CSE (Data Science)', course: 'Cloud Computing', date: '2026-08-16', status: 'Present', totalClasses: 78, attended: 70, percentage: 89.7 },
];

// Monthly attendance trend data for charts
export const monthlyAttendanceData = [
  { month: 'Jan', avg: 90.2 },
  { month: 'Feb', avg: 87.5 },
  { month: 'Mar', avg: 85.8 },
  { month: 'Apr', avg: 88.1 },
  { month: 'May', avg: 91.5 },
  { month: 'Jun', avg: 86.3 },
  { month: 'Jul', avg: 89.7 },
  { month: 'Aug', avg: 88.9 },
];
