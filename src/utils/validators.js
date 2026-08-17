// ─── Field Validators ────────────────────────────────────────────────────────

export const isRequired = (val) => !!val && String(val).trim().length > 0;

export const isEmail = (val) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val?.trim() || '');

export const isPhone = (val) =>
  /^[6-9]\d{9}$/.test((val || '').replace(/[\s\-+]/g, ''));

export const isRollNo = (val) =>
  /^[0-9A-Z]{10}$/.test((val || '').trim().toUpperCase());

export const minLength = (min) => (val) =>
  String(val || '').trim().length >= min;

export const maxLength = (max) => (val) =>
  String(val || '').trim().length <= max;

export const isPositiveNumber = (val) => !isNaN(val) && Number(val) > 0;

export const validateStudent = (data) => {
  const errors = {};
  if (!isRequired(data.name)) errors.name = 'Full name is required';
  if (!isEmail(data.email)) errors.email = 'Valid email is required';
  if (!isPhone(data.phone)) errors.phone = 'Valid 10-digit phone is required';
  if (!isRequired(data.department)) errors.department = 'Department is required';
  if (!isRequired(data.year)) errors.year = 'Year is required';
  if (!isRequired(data.gender)) errors.gender = 'Gender is required';
  return errors;
};

export const validateFaculty = (data) => {
  const errors = {};
  if (!isRequired(data.name)) errors.name = 'Full name is required';
  if (!isEmail(data.email)) errors.email = 'Valid email is required';
  if (!isPhone(data.phone)) errors.phone = 'Valid 10-digit phone is required';
  if (!isRequired(data.department)) errors.department = 'Department is required';
  if (!isRequired(data.designation)) errors.designation = 'Designation is required';
  return errors;
};

export const validateNotice = (data) => {
  const errors = {};
  if (!isRequired(data.title)) errors.title = 'Title is required';
  if (!isRequired(data.content)) errors.content = 'Content is required';
  if (!isRequired(data.priority)) errors.priority = 'Priority is required';
  return errors;
};
