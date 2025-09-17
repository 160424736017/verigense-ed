# Complete Route Map

## Global Routes
- `/` → Redirects to `/student/dashboard`
- `/login` → Unified login page
- `/logout` → Logout page
- `/search?q=...` → Global search
- `/profile` → User profile
- `/settings` → Personal preferences
- `/help` → Help center
- `/unauthorized` → Access denied page

## Student Routes
- `/student/dashboard` → Student dashboard
- `/student/classes` → Student classes
- `/student/classes/:classId` → Specific class details
- `/student/classes/:classId/timetable` → Class timetable
- `/student/classes/:classId/materials` → Class materials
- `/student/classes/:classId/assignments` → Class assignments
- `/student/classes/:classId/attendance` → Class attendance
- `/student/grades` → Student grades
- `/student/attendance` → Student attendance overview
- `/student/attendance/today` → Today's attendance (shortcut)
- `/student/fees` → Student fees overview
- `/student/fees/pay` → Pay fees (shortcut)
- `/student/fees/history` → Fees payment history
- `/student/notices` → Student notices
- `/student/documents` → Student documents
- `/student/documents/transcript` → Academic transcript
- `/student/documents/tc` → Transfer certificate
- `/student/messages` → Student messages

## Teacher Routes
- `/teacher/dashboard` → Teacher dashboard
- `/teacher/classes` → Teacher classes overview
- `/teacher/classes/:classId` → Specific class details
- `/teacher/classes/:classId/attendance` → Class attendance management
- `/teacher/classes/:classId/grades` → Class grades management
- `/teacher/classes/:classId/assignments` → Class assignments management
- `/teacher/classes/:classId/materials` → Class materials management
- `/teacher/classes/:classId/students` → Class students list
- `/teacher/substitutions` → Substitutions management
- `/teacher/notices` → Teacher notices
- `/teacher/analytics` → Teacher analytics
- `/teacher/messages` → Teacher messages
- `/teacher/attendance/today` → Today's attendance (shortcut)
- `/teacher/grades/pending` → Pending grades (shortcut)

## Admin Routes
- `/admin/dashboard` → Admin dashboard
- `/admin/students` → Students management
- `/admin/students/add` → Add new student
- `/admin/students/:studentId` → Specific student details
- `/admin/teachers` → Teachers management
- `/admin/teachers/add` → Add new teacher
- `/admin/teachers/:teacherId` → Specific teacher details
- `/admin/classes` → Classes management
- `/admin/classes/add` → Add new class
- `/admin/classes/:classId` → Specific class details
- `/admin/timetables` → Timetables management
- `/admin/exams` → Exams management
- `/admin/fees` → Fees management
- `/admin/notices` → Notices management
- `/admin/documents` → Documents management
- `/admin/documents/generate` → Generate documents
- `/admin/documents/generate/tc/:studentId` → Generate TC (shortcut)
- `/admin/reports` → Reports overview
- `/admin/reports/daily` → Daily reports (shortcut)
- `/admin/analytics` → System analytics
- `/admin/audit` → Audit trail

## API Routes
- `/api/v1/student/*` → Student API endpoints
- `/api/v1/teacher/*` → Teacher API endpoints
- `/api/v1/admin/*` → Admin API endpoints
- `/api/v1/parent/*` → Parent API endpoints

## Security Implementation
- Role-based access control via middleware
- Route protection for admin, teacher, and parent areas
- Unauthorized access redirects to `/unauthorized`