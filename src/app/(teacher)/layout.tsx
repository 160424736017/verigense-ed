// Teacher role layout
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white p-4">
        <h1>Teacher Portal</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>Teacher Portal Footer</p>
      </footer>
    </div>
  )
}