// ─── Mock Departments ────────────────────────────────────────────────────────

export const mockDepartments = [
  { id: 'DEPT-01', code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. K. Srinivasa Rao', intake: 180, faculty: 28, students: 720, established: 2007, accredited: 'NBA', labs: 8 },
  { id: 'DEPT-02', code: 'CSM', name: 'CSE (AI & Machine Learning)', hod: 'Dr. K. Srinivasa Rao', intake: 60, faculty: 12, students: 240, established: 2021, accredited: 'AICTE', labs: 4 },
  { id: 'DEPT-03', code: 'CSD', name: 'CSE (Data Science)', hod: 'Dr. K. Srinivasa Rao', intake: 60, faculty: 10, students: 180, established: 2022, accredited: 'AICTE', labs: 3 },
  { id: 'DEPT-04', code: 'ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. P. Anuradha', intake: 120, faculty: 22, students: 480, established: 2007, accredited: 'NBA', labs: 7 },
  { id: 'DEPT-05', code: 'EEE', name: 'Electrical & Electronics Engineering', hod: 'Dr. Nagarjuna Reddy', intake: 60, faculty: 14, students: 240, established: 2007, accredited: 'NBA', labs: 5 },
  { id: 'DEPT-06', code: 'ME', name: 'Mechanical Engineering', hod: 'Dr. G. Venkata Reddy', intake: 120, faculty: 20, students: 480, established: 2007, accredited: 'NBA', labs: 9 },
  { id: 'DEPT-07', code: 'CE', name: 'Civil Engineering', hod: 'Dr. V. Rama Krishna', intake: 60, faculty: 14, students: 240, established: 2010, accredited: 'AICTE', labs: 6 },
  { id: 'DEPT-08', code: 'MBA', name: 'Master of Business Administration', hod: 'Dr. Radha Krishna', intake: 60, faculty: 10, students: 120, established: 2009, accredited: 'AICTE', labs: 2 },
  { id: 'DEPT-09', code: 'MCA', name: 'Master of Computer Applications', hod: 'Dr. K. Srinivasa Rao', intake: 30, faculty: 8, students: 60, established: 2012, accredited: 'AICTE', labs: 3 },
  { id: 'DEPT-10', code: 'HS', name: 'Humanities & Sciences', hod: 'Mrs. Padmavathi Devi', intake: 0, faculty: 18, students: 0, established: 2007, accredited: 'AICTE', labs: 2 },
];

// ─── Mock Courses ────────────────────────────────────────────────────────────

export const mockCourses = [
  { id: 'CRS-01', code: 'CS401', name: 'Machine Learning', department: 'Computer Science & Engineering', year: 'IV Year', semester: 'VII', credits: 4, type: 'Core', faculty: 'Dr. K. Srinivasa Rao', enrolled: 120 },
  { id: 'CRS-02', code: 'CS302', name: 'Database Management Systems', department: 'Computer Science & Engineering', year: 'III Year', semester: 'V', credits: 4, type: 'Core', faculty: 'Mr. Mahesh Kumar', enrolled: 135 },
  { id: 'CRS-03', code: 'CS201', name: 'Data Structures & Algorithms', department: 'Computer Science & Engineering', year: 'II Year', semester: 'III', credits: 4, type: 'Core', faculty: 'Mr. Mahesh Kumar', enrolled: 168 },
  { id: 'CRS-04', code: 'EC401', name: 'VLSI Design', department: 'Electronics & Communication Engineering', year: 'IV Year', semester: 'VII', credits: 4, type: 'Core', faculty: 'Dr. P. Anuradha', enrolled: 95 },
  { id: 'CRS-05', code: 'ME301', name: 'Thermodynamics', department: 'Mechanical Engineering', year: 'III Year', semester: 'V', credits: 3, type: 'Core', faculty: 'Dr. G. Venkata Reddy', enrolled: 110 },
  { id: 'CRS-06', code: 'CS403', name: 'Cloud Computing', department: 'Computer Science & Engineering', year: 'IV Year', semester: 'VII', credits: 3, type: 'Elective', faculty: 'Dr. M. V. Subramanyam', enrolled: 78 },
  { id: 'CRS-07', code: 'AI301', name: 'Deep Learning', department: 'CSE (AI & Machine Learning)', year: 'III Year', semester: 'V', credits: 4, type: 'Core', faculty: 'Mrs. Sunitha Lakshmi', enrolled: 56 },
  { id: 'CRS-08', code: 'EE201', name: 'Power Systems', department: 'Electrical & Electronics Engineering', year: 'II Year', semester: 'IV', credits: 4, type: 'Core', faculty: 'Dr. Nagarjuna Reddy', enrolled: 60 },
];
