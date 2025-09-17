// Admin role layout
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-red-600 text-white p-4">
        <h1>Admin Portal</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>Admin Portal Footer</p>
      </footer>
    </div>
  )
}