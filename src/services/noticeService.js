import { isMockMode, supabase } from '../lib/supabaseClient';
import { mockNotices } from '../data/mockNotices';
import { generateId } from '../utils/formatters';

let _notices = [...mockNotices];

export const noticeService = {
  async getAll() {
    if (isMockMode) return { data: [..._notices].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)), error: null };
    const { data, error } = await supabase.from('notices').select('*').order('publishedAt', { ascending: false });
    return { data, error };
  },

  async add(noticeData) {
    if (isMockMode) {
      const newNotice = { ...noticeData, id: generateId('NOT'), publishedAt: new Date().toISOString() };
      _notices = [newNotice, ..._notices];
      return { data: newNotice, error: null };
    }
    const { data, error } = await supabase.from('notices').insert([{ ...noticeData, publishedAt: new Date().toISOString() }]).select().single();
    return { data, error };
  },

  async update(id, updates) {
    if (isMockMode) {
      _notices = _notices.map((n) => (n.id === id ? { ...n, ...updates } : n));
      const updated = _notices.find((n) => n.id === id);
      return { data: updated, error: null };
    }
    const { data, error } = await supabase.from('notices').update(updates).eq('id', id).select().single();
    return { data, error };
  },

  async delete(id) {
    if (isMockMode) {
      _notices = _notices.filter((n) => n.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('notices').delete().eq('id', id);
    return { error };
  },
};
