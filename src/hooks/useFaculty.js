import { useState, useEffect, useCallback } from 'react';
import { facultyService } from '../services/facultyService';

export const useFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: err } = await facultyService.getAll();
    if (err) setError(err);
    else setFaculty(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addFaculty = async (data) => {
    const res = await facultyService.add(data);
    if (!res.error) setFaculty((prev) => [res.data, ...prev]);
    return res;
  };

  const updateFaculty = async (id, updates) => {
    const res = await facultyService.update(id, updates);
    if (!res.error) setFaculty((prev) => prev.map((f) => (f.id === id ? res.data : f)));
    return res;
  };

  const deleteFaculty = async (id) => {
    const res = await facultyService.delete(id);
    if (!res.error) setFaculty((prev) => prev.filter((f) => f.id !== id));
    return res;
  };

  return { faculty, loading, error, refetch: load, addFaculty, updateFaculty, deleteFaculty };
};
