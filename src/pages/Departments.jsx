import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, FlaskConical, Award } from 'lucide-react';
import { mockDepartments } from '../data/mockDepts';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const Departments = () => (
  <motion.div className="page-container" variants={container} initial="hidden" animate="show">
    <div className="page-header">
      <div><h1 className="page-title">Departments</h1><p className="page-subtitle">{mockDepartments.length} active departments at SREC</p></div>
    </div>
    <motion.div className="dept-grid" variants={item}>
      {mockDepartments.map((dept) => (
        <motion.div key={dept.id} className="dept-card" variants={item} whileHover={{ translateY: -4 }}>
          <div className="dept-card-header">
            <div className="dept-card-icon"><Building2 size={20} /></div>
            <span className="dept-card-code">{dept.code}</span>
          </div>
          <h3 className="dept-card-name">{dept.name}</h3>
          <p className="dept-card-hod">HOD: {dept.hod}</p>
          <div className="dept-card-stats">
            <div className="dept-stat"><Users size={13} /> <span>{dept.students} Students</span></div>
            <div className="dept-stat"><GraduationCap size={13} /> <span>{dept.faculty} Faculty</span></div>
            <div className="dept-stat"><FlaskConical size={13} /> <span>{dept.labs} Labs</span></div>
            <div className="dept-stat"><Award size={13} /> <span>{dept.accredited}</span></div>
          </div>
          <div className="dept-card-footer">
            <span>Intake: {dept.intake}</span>
            <span>Est. {dept.established}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default Departments;
