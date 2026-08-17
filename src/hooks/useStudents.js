import { useState, useEffect, useCallback } from 'react';
import { studentService } from '../services/studentService';

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await studentService.getAll();
    if (err) setError(err);
    else setStudents(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addStudent = async (studentData) => {
    const { data, error: err } = await studentService.add(studentData);
    if (!err) setStudents((prev) => [data, ...prev]);
    return { data, error: err };
  };

  const updateStudent = async (id, updates) => {
    const { data, error: err } = await studentService.update(id, updates);
    if (!err) setStudents((prev) => prev.map((s) => (s.id === id ? data : s)));
    return { data, error: err };
  };

  const deleteStudent = async (id) => {
    const { error: err } = await studentService.delete(id);
    if (!err) setStudents((prev) => prev.filter((s) => s.id !== id));
    return { error: err };
  };

  return { students, loading, error, refetch: load, addStudent, updateStudent, deleteStudent };
};
