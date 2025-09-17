export default function TeacherClassMaterialsPage({
  params,
}: {
  params: { classId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Class Materials</h1>
      <p>Class ID: {params.classId}</p>
      {/* TODO: Implement teacher class materials functionality */}
    </div>
  )
}