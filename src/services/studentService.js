// ─── Student Service ─────────────────────────────────────────────────────────
// Uses Supabase when credentials are configured, mock data otherwise.

import { isMockMode, supabase } from '../lib/supabaseClient';
import { mockStudents } from '../data/mockStudents';
import { generateId } from '../utils/formatters';

// In-memory store so edits persist within the session in mock mode
let _students = [...mockStudents];

export const studentService = {
  async getAll() {
    if (isMockMode) return { data: [..._students], error: null };
    const { data, error } = await supabase.from('students').select('*').order('name');
    return { data, error };
  },

  async getById(id) {
    if (isMockMode) {
      const student = _students.find((s) => s.id === id) || null;
      return { data: student, error: student ? null : 'Not found' };
    }
    const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
    return { data, error };
  },

  async add(studentData) {
    if (isMockMode) {
      const newStudent = { ...studentData, id: generateId('STU'), cgpa: 0, attendance: 0, status: 'Active' };
      _students = [newStudent, ..._students];
      return { data: newStudent, error: null };
    }
    const { data, error } = await supabase.from('students').insert([studentData]).select().single();
    return { data, error };
  },

  async update(id, updates) {
    if (isMockMode) {
      _students = _students.map((s) => (s.id === id ? { ...s, ...updates } : s));
      const updated = _students.find((s) => s.id === id);
      return { data: updated, error: null };
    }
    const { data, error } = await supabase.from('students').update(updates).eq('id', id).select().single();
    return { data, error };
  },

  async delete(id) {
    if (isMockMode) {
      _students = _students.filter((s) => s.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('students').delete().eq('id', id);
    return { error };
  },
};
