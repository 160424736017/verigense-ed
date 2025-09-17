export default function AdminGenerateTCPage({
  params,
}: {
  params: { studentId: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Generate Transfer Certificate</h1>
      <p>Student ID: {params.studentId}</p>
      {/* TODO: Implement admin generate TC functionality */}
    </div>
  )
}