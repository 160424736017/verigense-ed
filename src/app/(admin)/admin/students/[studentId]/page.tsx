export default function AdminStudentDetailPage({
  params,
}: {
  params: { studentId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <p>Student ID: {params.studentId}</p>
      {/* TODO: Implement admin student detail functionality */}
    </div>
  )
}