import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, BookOpen, CalendarCheck, CreditCard, Briefcase, FileText, Bell, TrendingUp } from 'lucide-react';
import { DashboardCard } from '../components/ui/DashboardCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { AttendanceChart, StudentStatsChart, PlacementChart, FeeChart } from '../components/charts/Charts';
import { mockStudents } from '../data/mockStudents';
import { mockFaculty } from '../data/mockFaculty';
import { mockDepartments, mockCourses } from '../data/mockDepts';
import { mockFees } from '../data/mockFees';
import { mockNotices } from '../data/mockNotices';
import { monthlyAttendanceData } from '../data/mockAttendance';
import { yearlyPlacementData, mockPlacements } from '../data/mockPlacements';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Dashboard = () => {
  const { user } = useAuth();

  const totalStudents = mockStudents.length;
  const totalFaculty = mockFaculty.length;
  const totalDepts = mockDepartments.length;
  const totalCourses = mockCourses.length;
  const avgAttendance = (mockStudents.reduce((s, st) => s + st.attendance, 0) / totalStudents).toFixed(1);
  const pendingFees = mockFees.filter((f) => f.status !== 'Paid').reduce((s, f) => s + f.pendingAmount, 0);
  const placedPct = ((mockPlacements.length / totalStudents) * 100).toFixed(1);
  const upcomingExams = 3;

  const deptChartData = mockDepartments.filter((d) => d.students > 0).map((d) => ({ code: d.code, students: d.students }));
  const feeChartData = [
    { name: 'Paid', value: mockFees.filter((f) => f.status === 'Paid').length },
    { name: 'Partial', value: mockFees.filter((f) => f.status === 'Partial').length },
    { name: 'Pending', value: mockFees.filter((f) => f.status === 'Pending').length },
  ];

  const recentNotices = mockNotices.slice(0, 4);
  const recentStudents = mockStudents.slice(0, 5);

  return (
    <motion.div className="page-container" variants={container} initial="hidden" animate="show">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name || 'Administrator'} 👋</h1>
          <p className="page-subtitle">Here's an overview of SREC Kaandhan College ERP</p>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div className="dashboard-grid" variants={item}>
        <DashboardCard title="Total Students" value={totalStudents} subtitle="Active enrollments" icon={Users} color="blue" trend="up" trendValue="+12 this semester" />
        <DashboardCard title="Total Faculty" value={totalFaculty} subtitle="Teaching staff" icon={GraduationCap} color="purple" trend="flat" trendValue="No change" />
        <DashboardCard title="Departments" value={totalDepts} subtitle="Including H&S" icon={Building2} color="cyan" />
        <DashboardCard title="Courses" value={totalCourses} subtitle="R23 curriculum" icon={BookOpen} color="green" />
        <DashboardCard title="Avg. Attendance" value={`${avgAttendance}%`} subtitle="All departments" icon={CalendarCheck} color="amber" trend="up" trendValue="+2.1% this month" />
        <DashboardCard title="Pending Fees" value={formatCurrency(pendingFees)} subtitle="Requires follow-up" icon={CreditCard} color="red" trend="down" trendValue="-15% vs. last month" />
        <DashboardCard title="Placement Rate" value={`${placedPct}%`} subtitle="2026 batch" icon={Briefcase} color="green" trend="up" trendValue="+8.5% vs. 2025" />
        <DashboardCard title="Upcoming Exams" value={upcomingExams} subtitle="Next 30 days" icon={FileText} color="indigo" />
      </motion.div>

      {/* Charts Row */}
      <motion.div className="charts-grid" variants={item}>
        <AttendanceChart data={monthlyAttendanceData} />
        <StudentStatsChart data={deptChartData} />
      </motion.div>

      <motion.div className="charts-grid" variants={item}>
        <PlacementChart data={yearlyPlacementData} />
        <FeeChart data={feeChartData} />
      </motion.div>

      {/* Bottom Panels */}
      <motion.div className="dashboard-bottom-grid" variants={item}>
        {/* Recent Notices */}
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title"><Bell size={16} /> Recent Notices</h3>
          </div>
          <div className="panel-body">
            {recentNotices.map((n) => (
              <div key={n.id} className="notice-row">
                <div className="notice-row-left">
                  <StatusBadge status={n.priority} size="xs" />
                  <span className="notice-row-title">{n.title}</span>
                </div>
                <span className="notice-row-date">{formatDate(n.publishedAt)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title"><Users size={16} /> Recent Students</h3>
          </div>
          <div className="panel-body">
            {recentStudents.map((s) => (
              <div key={s.id} className="student-row">
                <div className="student-row-avatar">{s.name.charAt(0)}</div>
                <div className="student-row-info">
                  <span className="student-row-name">{s.name}</span>
                  <span className="student-row-dept">{s.rollNo} · {s.department}</span>
                </div>
                <StatusBadge status={s.status} size="xs" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
