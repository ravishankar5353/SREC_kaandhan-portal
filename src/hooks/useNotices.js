import { useState, useEffect, useCallback } from 'react';
import { noticeService } from '../services/noticeService';

export const useNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await noticeService.getAll();
    setNotices(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addNotice = async (data) => {
    const res = await noticeService.add(data);
    if (!res.error) setNotices((prev) => [res.data, ...prev]);
    return res;
  };

  const updateNotice = async (id, updates) => {
    const res = await noticeService.update(id, updates);
    if (!res.error) setNotices((prev) => prev.map((n) => (n.id === id ? res.data : n)));
    return res;
  };

  const deleteNotice = async (id) => {
    const res = await noticeService.delete(id);
    if (!res.error) setNotices((prev) => prev.filter((n) => n.id !== id));
    return res;
  };

  return { notices, loading, refetch: load, addNotice, updateNotice, deleteNotice };
};
