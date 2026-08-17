-- SREC Kaandhan College Portal 2026 Database Schema Setup
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- ─── 1. Profiles Table (Linked to Supabase Auth Users) ──────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('admin', 'faculty', 'student')),
  name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ─── 2. Departments Table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  hod TEXT,
  intake INTEGER DEFAULT 60,
  faculty INTEGER DEFAULT 10,
  students INTEGER DEFAULT 0,
  established INTEGER DEFAULT 2007,
  accredited TEXT DEFAULT 'AICTE',
  labs INTEGER DEFAULT 2
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- ─── 3. Students Table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY,
  roll_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  gender TEXT,
  dob DATE,
  blood_group TEXT,
  department TEXT,
  course TEXT,
  year TEXT,
  admission_year INTEGER,
  cgpa NUMERIC DEFAULT 0,
  attendance NUMERIC DEFAULT 0,
  address TEXT,
  status TEXT DEFAULT 'Active',
  avatar TEXT
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- ─── 4. Faculty Table ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.faculty (
  id TEXT PRIMARY KEY,
  faculty_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  gender TEXT,
  department TEXT,
  designation TEXT,
  qualification TEXT,
  experience INTEGER DEFAULT 0,
  joining_date DATE,
  specialization TEXT,
  status TEXT DEFAULT 'Active',
  avatar TEXT
);

ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

-- ─── 5. Courses Table ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT,
  year TEXT,
  semester TEXT,
  credits INTEGER DEFAULT 3,
  type TEXT DEFAULT 'Core',
  faculty TEXT,
  enrolled INTEGER DEFAULT 0
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- ─── 6. Attendance Table ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.attendance (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT,
  roll_no TEXT,
  department TEXT,
  course TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Present' CHECK (status IN ('Present', 'Absent')),
  total_classes INTEGER DEFAULT 1,
  attended INTEGER DEFAULT 1,
  percentage NUMERIC DEFAULT 100
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- ─── 7. Fees Table ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.fees (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT,
  roll_no TEXT,
  department TEXT,
  year TEXT,
  total_fee NUMERIC DEFAULT 0,
  paid_amount NUMERIC DEFAULT 0,
  pending_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Partial')),
  last_payment_date DATE,
  payment_mode TEXT,
  receipt_no TEXT
);

ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;

-- ─── 8. Exams Table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.exams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  course TEXT,
  date DATE,
  time TEXT,
  duration TEXT,
  venue TEXT,
  total_marks INTEGER DEFAULT 100,
  status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Completed'))
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

-- ─── 9. Results Table ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.results (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT,
  roll_no TEXT,
  course TEXT,
  exam_id TEXT REFERENCES public.exams(id) ON DELETE CASCADE,
  marks_obtained INTEGER DEFAULT 0,
  total_marks INTEGER DEFAULT 100,
  percentage NUMERIC DEFAULT 0,
  grade TEXT,
  result TEXT DEFAULT 'Pass' CHECK (result IN ('Pass', 'Fail')),
  semester TEXT,
  academic_year TEXT
);

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

-- ─── 10. Companies Table ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  sector TEXT,
  visits INTEGER DEFAULT 1,
  offers INTEGER DEFAULT 0,
  avg_package NUMERIC DEFAULT 0,
  max_package NUMERIC DEFAULT 0,
  roles TEXT[]
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- ─── 11. Placements Table ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.placements (
  id TEXT PRIMARY KEY,
  student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT,
  roll_no TEXT,
  department TEXT,
  company TEXT,
  role TEXT,
  package NUMERIC DEFAULT 0,
  offer_date DATE,
  joining_date DATE,
  status TEXT DEFAULT 'Placed' CHECK (status IN ('Placed', 'Not Placed', 'In Progress'))
);

ALTER TABLE public.placements ENABLE ROW LEVEL SECURITY;

-- ─── 12. Notices Table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'General',
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('High', 'Medium', 'Low')),
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  target_audience TEXT DEFAULT 'All Students',
  pinned BOOLEAN DEFAULT false
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;


-- ─── Row Level Security (RLS) Policies Setup ────────────────────────────────

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Students Policies
CREATE POLICY "Students are viewable by logged-in users" ON public.students
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Faculty can manage students" ON public.students
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role IN ('admin', 'faculty')
    )
  );

-- 3. Faculty Policies
CREATE POLICY "Faculty list is viewable by authenticated users" ON public.faculty
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage faculty" ON public.faculty
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role = 'admin'
    )
  );

-- 4. Departments Policies
CREATE POLICY "Departments are viewable by all authenticated users" ON public.departments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage departments" ON public.departments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role = 'admin'
    )
  );

-- 5. Courses Policies
CREATE POLICY "Courses are viewable by authenticated users" ON public.courses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Faculty can manage courses" ON public.courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role IN ('admin', 'faculty')
    )
  );

-- 6. Notices Policies
CREATE POLICY "Notices are viewable by all authenticated users" ON public.notices
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins and Faculty can manage notices" ON public.notices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE public.profiles.id = auth.uid()
      AND public.profiles.role IN ('admin', 'faculty')
    )
  );
