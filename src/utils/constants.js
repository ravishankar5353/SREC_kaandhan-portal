// ─── Application Constants ───────────────────────────────────────────────────

export const ROLES = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
};

export const FEE_STATUS = {
  PAID: 'Paid',
  PENDING: 'Pending',
  PARTIAL: 'Partial',
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
};

export const EXAM_RESULT = {
  PASS: 'Pass',
  FAIL: 'Fail',
};

export const NOTICE_PRIORITY = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const PLACEMENT_STATUS = {
  PLACED: 'Placed',
  NOT_PLACED: 'Not Placed',
  IN_PROGRESS: 'In Progress',
};

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'CSE (AI & Machine Learning)',
  'CSE (Data Science)',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Master of Business Administration',
  'Master of Computer Applications',
  'Humanities & Sciences',
];

export const YEARS = ['I Year', 'II Year', 'III Year', 'IV Year'];

export const GENDERS = ['Male', 'Female', 'Other'];

export const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export const GRADES = {
  'O': { min: 90, gpa: 10 },
  'A+': { min: 80, gpa: 9 },
  'A': { min: 70, gpa: 8 },
  'B+': { min: 60, gpa: 7 },
  'B': { min: 50, gpa: 6 },
  'C': { min: 40, gpa: 5 },
  'F': { min: 0, gpa: 0 },
};

export const COLLEGE_INFO = {
  name: 'Santhiram Engineering College',
  shortName: 'SREC',
  tagline: 'Kaandhan College Management Portal 2026',
  address: 'NH-40, Nandyal, Andhra Pradesh - 518501',
  phone: '+91 8514 259 259',
  email: 'principal@srecnandyal.edu.in',
  website: 'https://www.srecnandyal.edu.in',
  established: 2007,
  naac: 'A+',
  university: 'JNTUA',
};

export const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/students', label: 'Students', icon: 'Users' },
  { to: '/faculty', label: 'Faculty', icon: 'GraduationCap' },
  { to: '/departments', label: 'Departments', icon: 'Building2' },
  { to: '/courses', label: 'Courses', icon: 'BookOpen' },
  { to: '/attendance', label: 'Attendance', icon: 'CalendarCheck' },
  { to: '/fees', label: 'Fees', icon: 'CreditCard' },
  { to: '/exams', label: 'Exams & Results', icon: 'FileText' },
  { to: '/placements', label: 'Placements', icon: 'Briefcase' },
  { to: '/notices', label: 'Notices', icon: 'Bell' },
  { to: '/college-profile', label: 'College Profile', icon: 'School' },
  { to: '/settings', label: 'Settings', icon: 'Settings' },
];
