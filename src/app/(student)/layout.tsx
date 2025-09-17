// Student role layout
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1>Student Portal</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>Student Portal Footer</p>
      </footer>
    </div>
  )
}