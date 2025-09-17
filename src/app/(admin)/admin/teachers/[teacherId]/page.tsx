export default function AdminTeacherDetailPage({
  params,
}: {
  params: { teacherId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Teacher Details</h1>
      <p>Teacher ID: {params.teacherId}</p>
      {/* TODO: Implement admin teacher detail functionality */}
    </div>
  )
}