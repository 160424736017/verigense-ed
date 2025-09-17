export default function TeacherClassGradesPage({
  params,
}: {
  params: { classId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Class Grades</h1>
      <p>Class ID: {params.classId}</p>
      {/* TODO: Implement teacher class grades functionality */}
    </div>
  )
}