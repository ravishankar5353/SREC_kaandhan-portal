// ─── Mock Placements Data ────────────────────────────────────────────────────

export const mockCompanies = [
  { id: 'CMP-001', name: 'Microsoft', logo: '🔷', sector: 'Technology', visits: 2, offers: 12, avgPackage: 2400000, maxPackage: 3600000, roles: ['Software Engineer', 'Cloud Architect'] },
  { id: 'CMP-002', name: 'Amazon', logo: '📦', sector: 'E-Commerce / Cloud', visits: 3, offers: 18, avgPackage: 2200000, maxPackage: 3200000, roles: ['SDE I', 'SDE II', 'Cloud Support'] },
  { id: 'CMP-003', name: 'TCS', logo: '🔵', sector: 'IT Services', visits: 5, offers: 145, avgPackage: 700000, maxPackage: 900000, roles: ['System Engineer', 'Associate Software Engineer'] },
  { id: 'CMP-004', name: 'Infosys', logo: '🟠', sector: 'IT Services', visits: 4, offers: 110, avgPackage: 650000, maxPackage: 800000, roles: ['Systems Engineer', 'Senior Systems Engineer'] },
  { id: 'CMP-005', name: 'Wipro', logo: '🟡', sector: 'IT Services', visits: 4, offers: 90, avgPackage: 600000, maxPackage: 750000, roles: ['Project Engineer', 'Technical Analyst'] },
  { id: 'CMP-006', name: 'Cognizant', logo: '🔶', sector: 'IT Services', visits: 3, offers: 80, avgPackage: 580000, maxPackage: 700000, roles: ['Programmer Analyst', 'Technical Lead'] },
  { id: 'CMP-007', name: 'Accenture', logo: '🔺', sector: 'Consulting', visits: 3, offers: 75, avgPackage: 620000, maxPackage: 780000, roles: ['Application Developer', 'Business Analyst'] },
  { id: 'CMP-008', name: 'Capgemini', logo: '🔷', sector: 'IT Services', visits: 2, offers: 55, avgPackage: 560000, maxPackage: 680000, roles: ['Software Analyst'] },
  { id: 'CMP-009', name: 'IBM', logo: '🔹', sector: 'Technology', visits: 2, offers: 40, avgPackage: 900000, maxPackage: 1200000, roles: ['Associate Software Engineer', 'Data Analyst'] },
  { id: 'CMP-010', name: 'Oracle', logo: '🔴', sector: 'Technology', visits: 2, offers: 25, avgPackage: 1100000, maxPackage: 1800000, roles: ['Applications Developer', 'DBA'] },
];

export const mockPlacements = [
  { id: 'PLC-001', studentId: 'STU-002', studentName: 'Y. Ravi Shankar', rollNo: '24X51A05Y9', department: 'CSE', company: 'Microsoft', role: 'Software Engineer', package: 2400000, offerDate: '2026-02-14', joiningDate: '2026-07-01', status: 'Placed' },
  { id: 'PLC-002', studentId: 'STU-001', studentName: 'Ananya Sharma', rollNo: '24X51A0501', department: 'CSE', company: 'Amazon', role: 'SDE I', package: 2200000, offerDate: '2026-02-20', joiningDate: '2026-07-15', status: 'Placed' },
  { id: 'PLC-003', studentId: 'STU-008', studentName: 'Arjun Verma', rollNo: '24X51A0507', department: 'CSD', company: 'IBM', role: 'Data Analyst', package: 900000, offerDate: '2026-03-01', joiningDate: '2026-08-01', status: 'Placed' },
  { id: 'PLC-004', studentId: 'STU-011', studentName: 'Kavitha Narayan', rollNo: '24X51A0510', department: 'CSE', company: 'TCS', role: 'System Engineer', package: 700000, offerDate: '2026-03-10', joiningDate: '2026-07-20', status: 'Placed' },
  { id: 'PLC-005', studentId: 'STU-004', studentName: 'Kiran Kumar', rollNo: '23X51A0503', department: 'ECE', company: 'Infosys', role: 'Systems Engineer', package: 650000, offerDate: '2026-01-25', joiningDate: '2026-06-01', status: 'Placed' },
];

export const yearlyPlacementData = [
  { year: '2023', placed: 412, total: 520, percentage: 79.2 },
  { year: '2024', placed: 468, total: 540, percentage: 86.7 },
  { year: '2025', placed: 495, total: 560, percentage: 88.4 },
  { year: '2026', placed: 185, total: 580, percentage: 31.9 },
];
