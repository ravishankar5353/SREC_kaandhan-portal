import { isMockMode, supabase } from '../lib/supabaseClient';
import { mockFaculty } from '../data/mockFaculty';
import { generateId } from '../utils/formatters';

let _faculty = [...mockFaculty];

export const facultyService = {
  async getAll() {
    if (isMockMode) return { data: [..._faculty], error: null };
    const { data, error } = await supabase.from('faculty').select('*').order('name');
    return { data, error };
  },

  async add(facultyData) {
    if (isMockMode) {
      const newFaculty = { ...facultyData, id: generateId('FAC'), status: 'Active' };
      _faculty = [newFaculty, ..._faculty];
      return { data: newFaculty, error: null };
    }
    const { data, error } = await supabase.from('faculty').insert([facultyData]).select().single();
    return { data, error };
  },

  async update(id, updates) {
    if (isMockMode) {
      _faculty = _faculty.map((f) => (f.id === id ? { ...f, ...updates } : f));
      const updated = _faculty.find((f) => f.id === id);
      return { data: updated, error: null };
    }
    const { data, error } = await supabase.from('faculty').update(updates).eq('id', id).select().single();
    return { data, error };
  },

  async delete(id) {
    if (isMockMode) {
      _faculty = _faculty.filter((f) => f.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('faculty').delete().eq('id', id);
    return { error };
  },
};
