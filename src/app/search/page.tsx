export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Global Search</h1>
      <p>Searching for: {query}</p>
      {/* TODO: Implement global search functionality */}
    </div>
  )
}