# 🔑 Global Routes

```
/
/login
/logout
/search?q=...
/settings
/profile
/help
```

* `/login` → Unified login, role-aware (student, teacher, admin, parent, etc.).
* `/search` → Global search (students, classes, notices, documents).
* `/profile` → User profile, editable.
* `/settings` → Personal preferences (language, theme, notifications).

---

# 🎓 Student Routes

```
/student
  /dashboard
  /classes
      /:classId
          /timetable
          /materials
          /assignments
          /attendance
  /grades
  /attendance
  /fees
      /pay
      /history
  /notices
  /documents
      /transcript
      /tc
  /messages
```

## Student Shortcuts:
* `/student/attendance/today`
* `/student/fees/pay`

---

# 👨‍🏫 Teacher Routes

```
/teacher
  /dashboard
  /classes
      /:classId
          /attendance
          /grades
          /assignments
          /materials
          /students
  /substitutions
  /notices
  /analytics
  /messages
```

## Teacher Shortcuts:
* `/teacher/attendance/today`
* `/teacher/grades/pending`

---

# 🏛️ Admin Routes

```
/admin
  /dashboard
  /students
      /add
      /:studentId
  /teachers
      /add
      /:teacherId
  /classes
      /add
      /:classId
  /timetables
  /exams
  /fees
  /notices
  /documents
      /generate
  /reports
  /analytics
  /audit
```

## Admin Shortcuts:
* `/admin/documents/generate/tc/:studentId`
* `/admin/reports/daily`

---

# ⚡ API Layer (for backend/frontend/bot)

```
/api/v1/student/*
/api/v1/teacher/*
/api/v1/admin/*
/api/v1/parent/*
```

* Mirrors frontend routes.
* Uses versioning (`v1`, `v2` later).
* Easier to maintain and upgrade without breaking apps.

---

# 🔒 Security Layers

* **Role Guards**: `/admin/*` blocked for non-admins.
* **Multi-role switching**: Same account can act as both *teacher* and *parent*.
* **Audit route `/admin/audit`**: every action logged (who, when, what).

---

# ✅ Why this is gold-standard

* **Consistent patterns**: `/classes/:id/...` works across roles.
* **Future-proof**: easy to add `/alumni/*`, `/examiner/*`, `/library/*`.
* **User-first**: shortcuts for daily actions reduce clicks.
* **Developer-ready**: versioned APIs, modular namespaces, clean separation.