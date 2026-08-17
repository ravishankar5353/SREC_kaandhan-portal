# 🎓 SREC Kaandhan College Management Portal 2026

> A premium, modern, full-stack College Management Portal built with React, Vite, Supabase and Vercel.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

---

## 📌 Project Overview

**SREC Kaandhan College Management Portal 2026** is a modern web-based College ERP application designed to digitally manage and organize important academic and administrative activities.

The system provides a centralized platform for managing:

* Students
* Faculty
* Departments
* Courses
* Attendance
* Fees
* Examinations
* Results
* Placements
* Notices
* User authentication
* College information

The project is designed as a professional real-world SaaS/ERP-style application suitable for academic demonstration and practical college management use.

---

## 🎯 Objectives

The main objectives of this project are:

1. Digitize college management activities.
2. Reduce manual paperwork.
3. Centralize student and faculty information.
4. Manage attendance digitally.
5. Track student fees and payments.
6. Manage examinations and results.
7. Manage placement information.
8. Provide role-based access.
9. Improve data accessibility.
10. Provide a modern and responsive user experience.

---

## ✨ Key Features

### 🔐 Authentication

* Secure user login
* Supabase Authentication
* Role-based access
* Admin role
* Faculty role
* Student role
* Protected routes

### 📊 Dashboard

* Total students
* Total faculty
* Departments
* Courses
* Attendance statistics
* Fee statistics
* Placement statistics
* Upcoming examinations
* Recent notices
* Recent activities
* Interactive charts

### 👨‍🎓 Student Management

* Add students
* View students
* Edit student details
* Delete students
* Search students
* Filter students
* Student profiles
* Department filtering
* Course filtering
* Year filtering

### 👨‍🏫 Faculty Management

* Add faculty
* View faculty
* Edit faculty
* Delete faculty
* Search faculty
* Department filtering
* Faculty profiles

### 🏢 Department Management

* Create departments
* View departments
* Edit departments
* Delete departments
* Department information

### 📚 Course Management

* Add courses
* View courses
* Edit courses
* Delete courses
* Department-wise courses

### 📅 Attendance Management

* Record attendance
* View attendance
* Present/Absent status
* Attendance percentage
* Date-wise attendance
* Student-wise attendance
* Department filtering
* Attendance statistics

### 💰 Fee Management

* Student fee records
* Paid amount
* Pending amount
* Payment history
* Fee status
* Paid / Pending / Partial status
* Fee statistics

### 📝 Examination & Results

* Examination management
* Subject information
* Student marks
* Grades
* Percentage
* Pass/Fail status
* Student result details

### 💼 Placement Management

* Company information
* Recruitment drives
* Placed students
* Placement statistics
* Package information
* Placement status

### 📢 Notice Management

* Create notices
* Edit notices
* Delete notices
* View notices
* Priority levels
* Notice dates

### 🎨 UI/UX

* Premium modern dashboard
* Responsive design
* Dark mode
* Light mode
* Glassmorphism elements
* Gradient UI
* Smooth animations
* Interactive cards
* Responsive tables
* Mobile-friendly layout

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* JSX
* React Router DOM
* CSS
* Framer Motion
* React Icons / Lucide Icons
* Recharts

## Backend / Database

* Supabase
* PostgreSQL
* Supabase Authentication
* Row Level Security

## Deployment

* GitHub
* Vercel

---

# 🏗️ System Architecture

```text
                    SREC KAANDHAN PORTAL
                            │
                            ▼
                    React + Vite Frontend
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       React Router                   UI Components
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                     Supabase Client
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       Supabase Auth                PostgreSQL
                                          │
             ┌────────────────────────────┼─────────────────────┐
             │             │              │          │           │
             ▼             ▼              ▼          ▼           ▼
         Students       Faculty       Attendance    Fees       Results
             │
             ▼
        Placements / Notices / Courses / Departments
                            │
                            ▼
                          Vercel
```

---

# 📁 Project Structure

```text
SREC_kaandhan-portal/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

---

# 🗄️ Database

The application uses **Supabase PostgreSQL** as the primary database.

## Main Tables

```text
profiles
students
faculty
departments
courses
attendance
fees
exams
results
companies
placements
notices
```

## Database Relationships

```text
Departments
     │
     ├── Courses
     │      │
     │      └── Students
     │              │
     │              ├── Attendance
     │              ├── Fees
     │              ├── Exams
     │              ├── Results
     │              └── Placements
     │
     └── Faculty
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **Never commit `.env` files or private credentials to GitHub.**

The repository should only contain:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

inside `.env.example`.

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/ravishankar5353/SREC_kaandhan-portal.git
```

## 2. Enter Project Directory

```bash
cd SREC_kaandhan-portal
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Start Development Server

```bash
npm run dev
```

Application will run on the local development server.

---

# 🏭 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

# ☁️ Deployment

The application is designed for deployment using **Vercel**.

### Deployment Flow

```text
GitHub Repository
        │
        ▼
      Vercel
        │
        ▼
 React Production Build
        │
        ▼
    Live Website
        │
        ▼
Supabase PostgreSQL
```

### Vercel Configuration

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Install Command:

```bash
npm install
```

Required Vercel environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

# 🔒 Security

Security features include:

* Supabase Authentication
* Protected routes
* Role-based access
* Row Level Security
* Environment variables
* No database passwords in frontend code
* No service-role key in frontend
* Input validation
* Delete confirmation

---

# 📱 Responsive Design

The application supports:

* 💻 Desktop
* 🖥️ Laptop
* 📱 Mobile
* 📲 Tablet

The dashboard, tables, forms and navigation automatically adapt to different screen sizes.

---

# 👥 User Roles

| Role    | Access                                                  |
| ------- | ------------------------------------------------------- |
| Admin   | Full system access                                      |
| Faculty | Students, Attendance, Exams, Results, Notices           |
| Student | Profile, Attendance, Fees, Results, Notices, Placements |

---

# 🔄 CRUD Operations

The application supports:

```text
CREATE
   ↓
READ
   ↓
UPDATE
   ↓
DELETE
```

for major management modules.

---

# 📊 Dashboard Analytics

The dashboard provides visual analytics for:

* Student statistics
* Attendance
* Fees
* Placements
* Examination performance
* Department statistics

Charts are implemented using **Recharts**.

---

# 🎨 Design Inspiration

The UI follows a modern SaaS/ERP design philosophy inspired by:

* Modern admin dashboards
* Apple-inspired minimalism
* Material Design principles
* Glassmorphism
* Gradient interfaces
* Modern enterprise applications

The application focuses on usability, accessibility, responsiveness and professional presentation.

---

# 🧪 Testing Checklist

Before production deployment, verify:

* [ ] Login works
* [ ] Logout works
* [ ] Dashboard loads
* [ ] Students CRUD works
* [ ] Faculty CRUD works
* [ ] Departments CRUD works
* [ ] Courses CRUD works
* [ ] Attendance works
* [ ] Fees work
* [ ] Exams work
* [ ] Results work
* [ ] Placements work
* [ ] Notices work
* [ ] Database data persists
* [ ] Refresh does not lose data
* [ ] Protected routes work
* [ ] Mobile layout works
* [ ] Dark mode works
* [ ] Production build works
* [ ] Vercel deployment works

---

# 🎓 Academic Project

**Project Name:**
SREC Kaandhan College Management Portal 2026

**Project Type:**
College Management / ERP Web Application

**Development Approach:**
Full-Stack Web Application

**Frontend:**
React + Vite

**Database:**
Supabase PostgreSQL

**Authentication:**
Supabase Auth

**Deployment:**
Vercel

**Version Control:**
GitHub

---

# 👨‍💻 Developer

**Ravi Shankar**

GitHub:

https://github.com/ravishankar5353

Repository:

https://github.com/ravishankar5353/SREC_kaandhan-portal.git

---

# 📜 License

This project is developed for educational and academic purposes.

---

# ⭐ Project Status

**Status:** 🚀 Active Development

The project is continuously being improved with additional features, database integration, security improvements and UI enhancements.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**SREC Kaandhan College Management Portal 2026 — Modernizing College Management Through Technology.**
