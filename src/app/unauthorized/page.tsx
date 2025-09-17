export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Go back to home</a>
    </div>
  )
}